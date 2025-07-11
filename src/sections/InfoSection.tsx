import FormControl from '@mui/material/FormControl';
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
    const classDetail: ClassDetail | undefined = currentCharacter.characterClass ? CLASS_DETAILS[currentCharacter.characterClass] : undefined;

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
                    <Paper elevation={3} sx={{ p: 2, background: '#f8f9fa', mb: 2 }}>
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
                                <ul style={{ marginTop: 0, marginBottom: 8, paddingLeft: 20 }}>
                                    {classDetail.classFeatures.map((feature, idx) => (
                                        <li key={idx}>
                                            <i>{feature?.name || 'Unknown Feature'}</i> — {feature?.description || 'No description available.'}
                                        </li>
                                    ))}
                                </ul>
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
                                <Paper elevation={3} sx={{ p: 2, background: '#f4f7fa', mb: 2 }}>
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
                <FormControl fullWidth>
                    <InputLabel id="ancestry-select-label">Ancestry</InputLabel>
                    <Select
                        labelId="ancestry-select-label"
                        value={currentCharacter.heritage}
                        label="Ancestry"
                        onChange={e => updateCharacterField('heritage', e.target.value)}
                    >
                        <MenuItem value=""><em>Select an ancestry...</em></MenuItem>
                        {ANCESTRY_OPTIONS.map(anc => (
                            <MenuItem key={anc} value={anc}>{anc}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                {/* Ancestry Details Card */}
                {currentCharacter.heritage && ANCESTRY_DETAILS[currentCharacter.heritage] && (
                    (() => {
                        const ancestryDetail: AncestryDetail = ANCESTRY_DETAILS[currentCharacter.heritage];
                        return (
                            <Paper elevation={3} sx={{ p: 2, background: '#f4f7fa', mb: 2 }}>
                                <Typography variant="h6" gutterBottom>{ancestryDetail.name || 'Unknown Ancestry'}</Typography>
                                <Typography variant="body2" gutterBottom>{ancestryDetail.description || 'No description available.'}</Typography>
                                {ancestryDetail.feature1 && (
                                    <Typography variant="body2" gutterBottom>
                                        <b>Feature:</b> <i>{ancestryDetail.feature1.name || 'Unknown'}</i> — {ancestryDetail.feature1.description || 'No description available.'}
                                    </Typography>
                                )}
                                {ancestryDetail.feature2 && (
                                    <Typography variant="body2" gutterBottom>
                                        <b>Feature:</b> <i>{ancestryDetail.feature2.name || 'Unknown'}</i> — {ancestryDetail.feature2.description || 'No description available.'}
                                    </Typography>
                                )}
                            </Paper>
                        );
                    })()
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
                            <Paper elevation={3} sx={{ p: 2, background: '#f4f7fa', mb: 2 }}>
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