import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useCharacter } from '../CharacterContext';
import { ANCESTRY_DETAILS } from '../constants/ancestryDetails';
import type { ClassDetail } from '../constants/classDetails';
import { CLASS_DETAILS } from '../constants/classDetails';
import { COMMUNITY_DETAILS } from '../constants/communityDetails';
import { SUBCLASS_DETAILS } from '../constants/subclassDetails';
import type { AncestryDetail, CommunityDetail, SubclassDetail } from '../types/characterTypes';
import { parseStartingInventory } from '../utils/characterUtils';

interface InfoSectionProps {
    // currentCharacter: DaggerheartCharacter; // Removed
    // updateCharacterField: (field: keyof DaggerheartCharacter, value: any) => void; // Removed
    subclassOptions: string[];
    CLASS_OPTIONS: readonly string[];
    ANCESTRY_OPTIONS: readonly string[];
    COMMUNITY_OPTIONS: readonly string[];
}

const InfoSection: React.FC<InfoSectionProps> = ({
    subclassOptions,
    CLASS_OPTIONS,
    ANCESTRY_OPTIONS,
    COMMUNITY_OPTIONS,
}) => {
    const { currentCharacter, updateCharacterField } = useCharacter();
    const [mixedAncestry, setMixedAncestry] = React.useState(!!currentCharacter.secondaryHeritage);
    const classDetail: ClassDetail | undefined = currentCharacter.characterClass ? CLASS_DETAILS[currentCharacter.characterClass] : undefined;
    const prevClassRef = React.useRef(currentCharacter.characterClass);
    React.useEffect(() => {
        // Only update if class actually changes
        if (currentCharacter.characterClass && prevClassRef.current !== currentCharacter.characterClass) {
            // If inventory is empty or matches previous class's starting items, update it
            const prevItems = prevClassRef.current ? parseStartingInventory(prevClassRef.current) : [];
            const inv = currentCharacter.inventory;
            const isDefault = !inv || (Array.isArray(inv) && inv.length === 0) ||
                (Array.isArray(inv) && prevItems.length > 0 && inv.every((item, i) => prevItems[i] && item.name === prevItems[i].name));
            if (isDefault) {
                updateCharacterField('inventory', parseStartingInventory(currentCharacter.characterClass));
            }
            prevClassRef.current = currentCharacter.characterClass;
        }
    }, [currentCharacter.characterClass]);

    // Helper to get ancestry features
    const getFeatures = (ancestry: string) => {
        const detail = ANCESTRY_DETAILS[ancestry];
        return detail ? [detail.feature1, detail.feature2] : [];
    };
    // Handlers
    const handleMixedAncestryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMixedAncestry(e.target.checked);
        if (!e.target.checked) {
            updateCharacterField('secondaryHeritage', '');
            updateCharacterField('ancestryFeature2', '');
        }
    };

    return (
        <Paper elevation={2} sx={{ p: 2, mb: 2, boxSizing: 'border-box' }}>
            <Typography variant="h5" gutterBottom>BASIC INFO</Typography>
            <Stack spacing={2}>
                <TextField
                    label="Name"
                    value={currentCharacter.name}
                    onChange={e => updateCharacterField('name', e.target.value)}
                    fullWidth
                    variant="outlined"
                />
                <TextField
                    label="Pronouns"
                    value={currentCharacter.pronouns}
                    onChange={e => updateCharacterField('pronouns', e.target.value)}
                    fullWidth
                    variant="outlined"
                />
                <FormControl fullWidth>
                    <InputLabel id="class-select-label">Class</InputLabel>
                    <Select
                        labelId="class-select-label"
                        value={currentCharacter.characterClass}
                        label="Class"
                        onChange={e => updateCharacterField('characterClass', e.target.value)}
                    >
                        <MenuItem value=""><em>Select a class...</em></MenuItem>
                        {CLASS_OPTIONS.map(cls => (
                            <MenuItem key={cls} value={cls}>{cls}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                {/* Class Details Card */}
                {classDetail && (
                    <Paper elevation={3} sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>{classDetail.name || 'Unknown Class'}</Typography>
                        <Typography variant="subtitle1" gutterBottom><b>Domains:</b> {classDetail.domains?.join(' & ') || 'Unknown'}</Typography>
                        <Typography variant="body2" gutterBottom>{classDetail.description || 'No description available.'}</Typography>
                        <Stack direction="row" spacing={2} sx={{ mt: 1, mb: 1 }}>
                            <Typography variant="body2"><b>Evasion:</b> {classDetail.startingEvasion || 'Unknown'}</Typography>
                            <Typography variant="body2"><b>HP:</b> {classDetail.startingHP || 'Unknown'}</Typography>
                        </Stack>
                        {/* Class Features (can be multiple) */}
                        {classDetail.classFeatures && classDetail.classFeatures.length > 0 && (
                            <>
                                <Typography variant="body2" gutterBottom>
                                    <b>Class Feature{classDetail.classFeatures.length > 1 ? 's' : ''}:</b>
                                </Typography>
                                <Box sx={{ mt: 0, mb: 1, pl: 2 }}>
                                    {classDetail.classFeatures.map((feature, idx) => (
                                        <Typography key={idx} variant="body2" sx={{ display: 'list-item', pl: 1 }}>
                                            <i>{feature?.name || 'Unknown Feature'}</i> — {feature?.description || 'No description available.'}
                                        </Typography>
                                    ))}
                                </Box>
                            </>
                        )}
                        {classDetail.hopeFeature && (
                            <Typography variant="body2" gutterBottom>
                                <b>Hope Feature:</b> <i>{classDetail.hopeFeature.name || 'Unknown'}</i> — {classDetail.hopeFeature.description || 'No description available.'}
                            </Typography>
                        )}
                    </Paper>
                )}
                <FormControl fullWidth disabled={!currentCharacter.characterClass}>
                    <InputLabel id="subclass-select-label">Subclass</InputLabel>
                    <Select
                        labelId="subclass-select-label"
                        value={currentCharacter.subclass}
                        label="Subclass"
                        onChange={e => updateCharacterField('subclass', e.target.value)}
                    >
                        <MenuItem value=""><em>Select a subclass...</em></MenuItem>
                        {subclassOptions.map(sub => (
                            <MenuItem key={sub} value={sub}>{sub}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                {/* Subclass Details Card */}
                {currentCharacter.characterClass && currentCharacter.subclass &&
                    SUBCLASS_DETAILS[currentCharacter.characterClass] &&
                    SUBCLASS_DETAILS[currentCharacter.characterClass][currentCharacter.subclass] && (
                        (() => {
                            const subclassDetail: SubclassDetail = SUBCLASS_DETAILS[currentCharacter.characterClass][currentCharacter.subclass];
                            return (
                                <Paper elevation={3} sx={{ p: 2 }}>
                                    <Typography variant="h6" gutterBottom>{subclassDetail.name || 'Unknown Subclass'}</Typography>
                                    <Typography variant="body2" gutterBottom>{subclassDetail.description || 'No description available.'}</Typography>
                                    {subclassDetail.spellcastTrait && (
                                        <Typography variant="subtitle2" gutterBottom><b>Spellcast Trait:</b> {subclassDetail.spellcastTrait}</Typography>
                                    )}
                                    {subclassDetail.foundationFeature && (
                                        <Typography variant="body2" gutterBottom>
                                            <b>Foundation Feature:</b> <i>{subclassDetail.foundationFeature.name || 'Unknown'}</i> — {subclassDetail.foundationFeature.description || 'No description available.'}
                                        </Typography>
                                    )}
                                    {subclassDetail.specializationFeature && (
                                        <Typography variant="body2" gutterBottom>
                                            <b>Specialization Feature:</b> <i>{subclassDetail.specializationFeature.name || 'Unknown'}</i> — {subclassDetail.specializationFeature.description || 'No description available.'}
                                        </Typography>
                                    )}
                                    {subclassDetail.masteryFeature && (
                                        <Typography variant="body2" gutterBottom>
                                            <b>Mastery Feature:</b> <i>{subclassDetail.masteryFeature.name || 'Unknown'}</i> — {subclassDetail.masteryFeature.description || 'No description available.'}
                                        </Typography>
                                    )}
                                </Paper>
                            );
                        })()
                    )}
                {/* Ancestry Selection */}
                <FormControlLabel
                    control={<Checkbox checked={mixedAncestry} onChange={handleMixedAncestryChange} />}
                    label="Mixed Ancestry (choose features from two ancestries)"
                    sx={{ mb: 1 }}
                />
                {!mixedAncestry ? (
                    <>
                        <FormControl fullWidth>
                            <InputLabel id="ancestry-select-label">Ancestry</InputLabel>
                            <Select
                                labelId="ancestry-select-label"
                                value={currentCharacter.heritage}
                                label="Ancestry"
                                onChange={e => {
                                    updateCharacterField('heritage', e.target.value);
                                    updateCharacterField('ancestryFeature1', '');
                                }}
                            >
                                <MenuItem value=""><em>Select an ancestry...</em></MenuItem>
                                {ANCESTRY_OPTIONS.map(anc => (
                                    <MenuItem key={anc} value={anc}>{anc}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        {/* Feature Picker */}
                        {currentCharacter.heritage && (
                            <FormControl fullWidth sx={{ mt: 1 }}>
                                <InputLabel id="feature1-select-label">Ancestry Feature</InputLabel>
                                <Select
                                    labelId="feature1-select-label"
                                    value={currentCharacter.ancestryFeature1 || ''}
                                    label="Ancestry Feature"
                                    onChange={e => updateCharacterField('ancestryFeature1', e.target.value)}
                                >
                                    <MenuItem value=""><em>Select a feature...</em></MenuItem>
                                    {getFeatures(currentCharacter.heritage).map(f => (
                                        <MenuItem key={f.name} value={f.name}><b>{f.name}</b>: {f.description}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        )}
                    </>
                ) : (
                    <>
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                            <FormControl fullWidth>
                                <InputLabel id="ancestry1-select-label">Ancestry 1</InputLabel>
                                <Select
                                    labelId="ancestry1-select-label"
                                    value={currentCharacter.heritage}
                                    label="Ancestry 1"
                                    onChange={e => {
                                        updateCharacterField('heritage', e.target.value);
                                        updateCharacterField('ancestryFeature1', '');
                                    }}
                                >
                                    <MenuItem value=""><em>Select ancestry 1...</em></MenuItem>
                                    {ANCESTRY_OPTIONS.filter(anc => anc !== currentCharacter.secondaryHeritage).map(anc => (
                                        <MenuItem key={anc} value={anc}>{anc}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl fullWidth>
                                <InputLabel id="ancestry2-select-label">Ancestry 2</InputLabel>
                                <Select
                                    labelId="ancestry2-select-label"
                                    value={currentCharacter.secondaryHeritage || ''}
                                    label="Ancestry 2"
                                    onChange={e => {
                                        updateCharacterField('secondaryHeritage', e.target.value);
                                        updateCharacterField('ancestryFeature2', '');
                                    }}
                                >
                                    <MenuItem value=""><em>Select ancestry 2...</em></MenuItem>
                                    {ANCESTRY_OPTIONS.filter(anc => anc !== currentCharacter.heritage).map(anc => (
                                        <MenuItem key={anc} value={anc}>{anc}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Stack>
                        {/* Feature Pickers */}
                        {currentCharacter.heritage && (
                            <FormControl fullWidth sx={{ mt: 1 }}>
                                <InputLabel id="feature1-select-label">Feature from Ancestry 1</InputLabel>
                                <Select
                                    labelId="feature1-select-label"
                                    value={currentCharacter.ancestryFeature1 || ''}
                                    label="Feature from Ancestry 1"
                                    onChange={e => updateCharacterField('ancestryFeature1', e.target.value)}
                                    disabled={!currentCharacter.heritage}
                                >
                                    <MenuItem value=""><em>Select a feature...</em></MenuItem>
                                    {getFeatures(currentCharacter.heritage).map(f => (
                                        <MenuItem key={f.name} value={f.name}><b>{f.name}</b>: {f.description}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        )}
                        {currentCharacter.secondaryHeritage && (
                            <FormControl fullWidth sx={{ mt: 1 }}>
                                <InputLabel id="feature2-select-label">Feature from Ancestry 2</InputLabel>
                                <Select
                                    labelId="feature2-select-label"
                                    value={currentCharacter.ancestryFeature2 || ''}
                                    label="Feature from Ancestry 2"
                                    onChange={e => updateCharacterField('ancestryFeature2', e.target.value)}
                                    disabled={!currentCharacter.secondaryHeritage}
                                >
                                    <MenuItem value=""><em>Select a feature...</em></MenuItem>
                                    {getFeatures(currentCharacter.secondaryHeritage).map(f => (
                                        <MenuItem key={f.name} value={f.name}><b>{f.name}</b>: {f.description}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        )}
                    </>
                )}
                {/* Ancestry Details Card(s) */}
                {!mixedAncestry && currentCharacter.heritage && ANCESTRY_DETAILS[currentCharacter.heritage] && (
                    (() => {
                        const ancestryDetail: AncestryDetail = ANCESTRY_DETAILS[currentCharacter.heritage];
                        return (
                            <Paper elevation={3} sx={{ p: 2 }}>
                                <Typography variant="h6" gutterBottom>{ancestryDetail.name || 'Unknown Ancestry'}</Typography>
                                <Typography variant="body2" gutterBottom>{ancestryDetail.description || 'No description available.'}</Typography>
                                {[ancestryDetail.feature1, ancestryDetail.feature2].map((f, i) => (
                                    <Typography key={i} variant="body2" gutterBottom>
                                        <b>Feature:</b> <i>{f.name || 'Unknown'}</i> — {f.description || 'No description available.'}
                                    </Typography>
                                ))}
                            </Paper>
                        );
                    })()
                )}
                {mixedAncestry && (
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                        {currentCharacter.heritage && ANCESTRY_DETAILS[currentCharacter.heritage] && (
                            (() => {
                                const ancestryDetail: AncestryDetail = ANCESTRY_DETAILS[currentCharacter.heritage];
                                return (
                                    <Paper elevation={3} sx={{ p: 2, flex: 1 }}>
                                        <Typography variant="h6" gutterBottom>{ancestryDetail.name || 'Unknown Ancestry'}</Typography>
                                        <Typography variant="body2" gutterBottom>{ancestryDetail.description || 'No description available.'}</Typography>
                                        {[ancestryDetail.feature1, ancestryDetail.feature2].map((f, i) => (
                                            <Typography key={i} variant="body2" gutterBottom>
                                                <b>Feature:</b> <i>{f.name || 'Unknown'}</i> — {f.description || 'No description available.'}
                                            </Typography>
                                        ))}
                                    </Paper>
                                );
                            })()
                        )}
                        {currentCharacter.secondaryHeritage && ANCESTRY_DETAILS[currentCharacter.secondaryHeritage] && (
                            (() => {
                                const ancestryDetail: AncestryDetail = ANCESTRY_DETAILS[currentCharacter.secondaryHeritage];
                                return (
                                    <Paper elevation={3} sx={{ p: 2, flex: 1 }}>
                                        <Typography variant="h6" gutterBottom>{ancestryDetail.name || 'Unknown Ancestry'}</Typography>
                                        <Typography variant="body2" gutterBottom>{ancestryDetail.description || 'No description available.'}</Typography>
                                        {[ancestryDetail.feature1, ancestryDetail.feature2].map((f, i) => (
                                            <Typography key={i} variant="body2" gutterBottom>
                                                <b>Feature:</b> <i>{f.name || 'Unknown'}</i> — {f.description || 'No description available.'}
                                            </Typography>
                                        ))}
                                    </Paper>
                                );
                            })()
                        )}
                    </Stack>
                )}
                <FormControl fullWidth>
                    <InputLabel id="community-select-label">Community</InputLabel>
                    <Select
                        labelId="community-select-label"
                        value={currentCharacter.community || ''}
                        label="Community"
                        onChange={e => updateCharacterField('community', e.target.value)}
                    >
                        <MenuItem value=""><em>Select a community...</em></MenuItem>
                        {COMMUNITY_OPTIONS.map(com => (
                            <MenuItem key={com} value={com}>{com}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                {/* Community Details Card */}
                {currentCharacter.community && COMMUNITY_DETAILS[currentCharacter.community] && (
                    (() => {
                        const communityDetail: CommunityDetail = COMMUNITY_DETAILS[currentCharacter.community];
                        return (
                            <Paper elevation={3} sx={{ p: 2 }}>
                                <Typography variant="h6" gutterBottom>{communityDetail.name || 'Unknown Community'}</Typography>
                                <Typography variant="body2" gutterBottom>{communityDetail.description || 'No description available.'}</Typography>
                                {communityDetail.feature && (
                                    <Typography variant="body2" gutterBottom>
                                        <b>Feature:</b> <i>{communityDetail.feature.name || 'Unknown'}</i> — {communityDetail.feature.description || 'No description available.'}
                                    </Typography>
                                )}
                            </Paper>
                        );
                    })()
                )}
                <TextField
                    label="Level"
                    type="number"
                    value={currentCharacter.level}
                    onChange={e => updateCharacterField('level', parseInt(e.target.value) || 0)}
                    fullWidth
                    variant="outlined"
                    inputProps={{ min: 0 }}
                />
            </Stack>
        </Paper>
    );
};

export default InfoSection; 