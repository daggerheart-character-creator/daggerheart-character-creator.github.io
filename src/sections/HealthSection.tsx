import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useCharacter } from '../CharacterContext';
import { ARMOR_OPTIONS } from '../constants/armor';
import { CLASS_DETAILS } from '../constants/classDetails';

interface HealthSectionProps {
    calculateThreshold: (base: number) => number;
}

const getArmorEvasionMod = (activeArmor: any[]) => {
    let mod = 0;
    activeArmor.forEach((armor: any) => {
        const found = ARMOR_OPTIONS.find(a => a.name === armor.name);
        if (found && found.feature) {
            if (found.feature.includes('+1 to Evasion')) mod += 1;
            if (found.feature.includes('−1 to Evasion') || found.feature.includes('-1 to Evasion')) mod -= 1;
            if (found.feature.includes('−2 to Evasion') || found.feature.includes('-2 to Evasion')) mod -= 2;
        }
    });
    return mod;
};

const HealthSection: React.FC<HealthSectionProps> = ({ calculateThreshold }) => {
    const { currentCharacter, updateCharacterField } = useCharacter();
    if (!currentCharacter) return null;
    const classDetail = CLASS_DETAILS[currentCharacter.characterClass] || null;
    const baseEvasion = classDetail ? classDetail.startingEvasion : 10;
    const armorMod = getArmorEvasionMod(currentCharacter.activeArmor || []);
    const totalEvasion = baseEvasion + armorMod;
    const totalHP = currentCharacter.hp.length;

    // Get selected armor thresholds
    let majorBase = 15, severeBase = 20, armorLabel = '';
    const selectedArmor = currentCharacter.activeArmor && currentCharacter.activeArmor[0]?.name
        ? ARMOR_OPTIONS.find(a => a.name === currentCharacter.activeArmor[0].name)
        : null;
    if (selectedArmor && selectedArmor.baseThresholds) {
        const [major, severe] = selectedArmor.baseThresholds.split('/').map(s => parseInt(s.trim(), 10));
        if (!isNaN(major)) majorBase = major;
        if (!isNaN(severe)) severeBase = severe;
        armorLabel = selectedArmor.name;
    }

    // Determine armor slots (if not present, default to 0 slots)
    const armorSlots = Array.isArray(currentCharacter.armorSlots)
        ? currentCharacter.armorSlots
        : Array(0).fill(false);

    // Handler to toggle circles
    const toggleCircles = (resourceType: 'hp' | 'stress' | 'hope' | 'proficiency' | 'armorSlots', index: number) => {
        const arr = (currentCharacter[resourceType] as boolean[]) || [];
        const newArr = arr.map((val, i) => (i === index ? !val : val));
        updateCharacterField(resourceType as any, newArr);
    };
    // Handler to add/remove bubbles for a resource
    const handleBubbleChange = (resource: 'hp' | 'stress' | 'hope' | 'proficiency' | 'armorSlots', action: 'add' | 'remove') => {
        let arr = (currentCharacter[resource] as boolean[]) || [];
        if (resource === 'hope') {
            if (action === 'add' && arr.length < 10) {
                arr = [...arr, false];
            } else if (action === 'remove' && arr.length > 1) {
                arr = arr.slice(0, -1);
            }
        } else {
            if (action === 'add') {
                arr = [...arr, false];
            } else if (action === 'remove' && arr.length > 0) {
                arr = arr.slice(0, -1);
            }
        }
        updateCharacterField(resource as any, arr);
    };
    // Handler to increment/decrement evasion
    const handleEvasionChange = (delta: number) => {
        const newEvasion = (currentCharacter.evasion ?? totalEvasion) + delta;
        updateCharacterField('evasion', newEvasion);
    };

    React.useEffect(() => {
        if (currentCharacter && (!Array.isArray(currentCharacter.hope) || currentCharacter.hope.length === 0)) {
            updateCharacterField('hope', Array(6).fill(false));
        }
    }, [currentCharacter, updateCharacterField]);

    return (
        <Paper elevation={2} sx={{ p: 2, mb: 2, boxSizing: 'border-box', mt: 0 }}>
            <Typography variant="h5" gutterBottom>DAMAGE & HEALTH</Typography>
            <Box className="thresholds" sx={{ mb: 2 }}>
                <Typography variant="subtitle1">DAMAGE THRESHOLDS (Add your level){armorLabel && ` (Armor: ${armorLabel})`}</Typography>
                <Typography>MAJOR: {calculateThreshold(majorBase)} (Mark 2 HP)</Typography>
                <Typography>SEVERE: {calculateThreshold(severeBase)} (Mark 3 HP)</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Minor: damage less than Major threshold (Mark 1 HP)
                </Typography>
            </Box>
            <Box className="evasion" mb={2} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Typography fontWeight={700} sx={{ fontSize: 18, mr: 1 }}>Evasion:</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <IconButton
                        onClick={() => handleEvasionChange(-1)}
                        size="small"
                        sx={{ fontSize: 18, width: 28, height: 28, borderRadius: 1, border: '1px solid #ccc', p: 0, mr: 0.5 }}
                        aria-label="Decrease Evasion"
                    >
                        -
                    </IconButton>
                    <Typography fontWeight={700} sx={{ fontSize: 18, mx: 1 }}>{typeof currentCharacter.evasion === 'number' ? currentCharacter.evasion : totalEvasion}</Typography>
                    <IconButton
                        onClick={() => handleEvasionChange(1)}
                        size="small"
                        sx={{ fontSize: 18, width: 28, height: 28, borderRadius: 1, border: '1px solid #ccc', p: 0, ml: 0.5 }}
                        aria-label="Increase Evasion"
                    >
                        +
                    </IconButton>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
                    (Base: {baseEvasion}{armorMod !== 0 ? `, Armor: ${armorMod > 0 ? '+' : ''}${armorMod}` : ''})
                </Typography>
            </Box>
            <Box className="resource-tracker">
                <Box mb={1} display="flex" alignItems="center">
                    <Typography fontWeight={600} sx={{ mr: 1 }}>
                        HP: {totalHP}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
                        <IconButton
                            onClick={() => handleBubbleChange('hp', 'add')}
                            size="small"
                            sx={{ fontSize: 18, width: 28, height: 28, borderRadius: 1, border: '1px solid #ccc', p: 0 }}
                            aria-label="Add HP"
                        >
                            +
                        </IconButton>
                        <IconButton
                            onClick={() => handleBubbleChange('hp', 'remove')}
                            size="small"
                            sx={{ fontSize: 18, width: 28, height: 28, borderRadius: 1, border: '1px solid #ccc', p: 0, opacity: currentCharacter.hp.length <= 1 ? 0.5 : 1 }}
                            aria-label="Remove HP"
                            disabled={currentCharacter.hp.length <= 1}
                        >
                            -
                        </IconButton>
                    </Box>
                </Box>
                <Stack direction="row" spacing={1} mb={2}>
                    {currentCharacter?.hp.map((filled: boolean, index: number) => (
                        <Box
                            key={index}
                            onClick={() => toggleCircles('hp', index)}
                            sx={{ width: 24, height: 24, borderRadius: '50%', border: '2px solid #3498db', backgroundColor: filled ? '#3498db' : '#fff', cursor: 'pointer' }}
                        />
                    ))}
                </Stack>
                <Box mb={1} display="flex" alignItems="center">
                    <Typography fontWeight={600} sx={{ mr: 1 }}>ARMOR:</Typography>
                    <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
                        <IconButton
                            onClick={() => handleBubbleChange('armorSlots', 'add')}
                            size="small"
                            sx={{ fontSize: 18, width: 28, height: 28, borderRadius: 1, border: '1px solid #ccc', p: 0 }}
                            aria-label="Add Armor Slot"
                        >
                            +
                        </IconButton>
                        <IconButton
                            onClick={() => handleBubbleChange('armorSlots', 'remove')}
                            size="small"
                            sx={{ fontSize: 18, width: 28, height: 28, borderRadius: 1, border: '1px solid #ccc', p: 0, opacity: armorSlots.length <= 0 ? 0.5 : 1 }}
                            aria-label="Remove Armor Slot"
                            disabled={armorSlots.length <= 0}
                        >
                            -
                        </IconButton>
                    </Box>
                </Box>
                <Stack direction="row" spacing={1} mb={2}>
                    {armorSlots.map((filled: boolean, index: number) => (
                        <Box
                            key={index}
                            onClick={() => toggleCircles('armorSlots', index)}
                            sx={{ width: 24, height: 24, borderRadius: '50%', border: '2px solid #b59a00', backgroundColor: filled ? '#b59a00' : '#fff', cursor: 'pointer' }}
                        />
                    ))}
                </Stack>
                <Box mb={1} display="flex" alignItems="center">
                    <Typography fontWeight={600} sx={{ mr: 1 }}>STRESS:</Typography>
                    <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
                        <IconButton
                            onClick={() => handleBubbleChange('stress', 'add')}
                            size="small"
                            sx={{ fontSize: 18, width: 28, height: 28, borderRadius: 1, border: '1px solid #ccc', p: 0 }}
                            aria-label="Add Stress"
                        >
                            +
                        </IconButton>
                        <IconButton
                            onClick={() => handleBubbleChange('stress', 'remove')}
                            size="small"
                            sx={{ fontSize: 18, width: 28, height: 28, borderRadius: 1, border: '1px solid #ccc', p: 0, opacity: currentCharacter.stress.length <= 1 ? 0.5 : 1 }}
                            aria-label="Remove Stress"
                            disabled={currentCharacter.stress.length <= 1}
                        >
                            -
                        </IconButton>
                    </Box>
                </Box>
                <Stack direction="row" spacing={1} mb={2}>
                    {currentCharacter?.stress.map((filled: boolean, index: number) => (
                        <Box
                            key={index}
                            onClick={() => toggleCircles('stress', index)}
                            sx={{ width: 24, height: 24, borderRadius: '50%', border: '2px solid #3498db', backgroundColor: filled ? '#3498db' : '#fff', cursor: 'pointer' }}
                        />
                    ))}
                </Stack>
                <Box mb={1} display="flex" alignItems="center">
                    <Typography fontWeight={600} sx={{ mr: 1 }}>HOPE:</Typography>
                    <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
                        <IconButton
                            onClick={() => handleBubbleChange('hope', 'add')}
                            size="small"
                            sx={{ fontSize: 18, width: 28, height: 28, borderRadius: 1, border: '1px solid #ccc', p: 0 }}
                            aria-label="Add Hope"
                            disabled={currentCharacter.hope.length >= 10}
                        >
                            +
                        </IconButton>
                        <IconButton
                            onClick={() => handleBubbleChange('hope', 'remove')}
                            size="small"
                            sx={{ fontSize: 18, width: 28, height: 28, borderRadius: 1, border: '1px solid #ccc', p: 0, opacity: currentCharacter.hope.length <= 1 ? 0.5 : 1 }}
                            aria-label="Remove Hope"
                            disabled={currentCharacter.hope.length <= 1}
                        >
                            -
                        </IconButton>
                    </Box>
                </Box>
                <Stack direction="row" spacing={1} mb={2}>
                    {currentCharacter?.hope.map((filled: boolean, index: number) => (
                        <Box
                            key={index}
                            onClick={() => toggleCircles('hope', index)}
                            sx={{ width: 24, height: 24, borderRadius: '50%', border: '2px solid #3498db', backgroundColor: filled ? '#3498db' : '#fff', cursor: 'pointer' }}
                        />
                    ))}
                </Stack>
                <Typography variant="body2" color="text.secondary" mb={1}>*Spend a Hope to use an experience or help an ally.</Typography>
                {classDetail?.hopeFeature && (
                    <Box mb={2}>
                        <Typography variant="subtitle2" fontWeight={600} color="primary.main">{classDetail.hopeFeature.name}</Typography>
                        <Typography variant="body2" color="text.secondary">{classDetail.hopeFeature.description}</Typography>
                    </Box>
                )}
                <Box mb={1} display="flex" alignItems="center">
                    <Typography fontWeight={600} sx={{ mr: 1 }}>PROFICIENCY:</Typography>
                    <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
                        <IconButton
                            onClick={() => handleBubbleChange('proficiency', 'add')}
                            size="small"
                            sx={{ fontSize: 18, width: 28, height: 28, borderRadius: 1, border: '1px solid #ccc', p: 0 }}
                            aria-label="Add Proficiency"
                        >
                            +
                        </IconButton>
                        <IconButton
                            onClick={() => handleBubbleChange('proficiency', 'remove')}
                            size="small"
                            sx={{ fontSize: 18, width: 28, height: 28, borderRadius: 1, border: '1px solid #ccc', p: 0, opacity: currentCharacter.proficiency.length <= 1 ? 0.5 : 1 }}
                            aria-label="Remove Proficiency"
                            disabled={currentCharacter.proficiency.length <= 1}
                        >
                            -
                        </IconButton>
                    </Box>
                </Box>
                <Stack direction="row" spacing={1} mb={2}>
                    {currentCharacter?.proficiency.map((filled: boolean, index: number) => (
                        <Box
                            key={index}
                            onClick={() => toggleCircles('proficiency', index)}
                            sx={{ width: 24, height: 24, borderRadius: '50%', border: '2px solid #3498db', backgroundColor: filled ? '#3498db' : '#fff', cursor: 'pointer' }}
                        />
                    ))}
                </Stack>
            </Box>
        </Paper>
    );
};

export default HealthSection; 