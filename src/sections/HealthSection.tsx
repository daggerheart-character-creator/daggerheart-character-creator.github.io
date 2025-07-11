import Box from '@mui/material/Box';
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
        if (action === 'add') {
            arr = [...arr, false];
        } else if (action === 'remove' && arr.length > 0) {
            arr = arr.slice(0, -1);
        }
        updateCharacterField(resource as any, arr);
    };
    // Handler to increment/decrement evasion
    const handleEvasionChange = (delta: number) => {
        const newEvasion = (currentCharacter.evasion || 0) + delta;
        updateCharacterField('evasion', newEvasion);
    };

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
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <button
                        onClick={() => handleEvasionChange(-1)}
                        style={{ fontSize: 18, width: 28, height: 28, borderRadius: 4, border: '1px solid #ccc', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 6px', marginRight: 2 }}
                        aria-label="Decrease Evasion"
                    >-
                    </button>
                    <Typography fontWeight={700} sx={{ fontSize: 18, mx: 1 }}>{totalEvasion}</Typography>
                    <button
                        onClick={() => handleEvasionChange(1)}
                        style={{ fontSize: 18, width: 28, height: 28, borderRadius: 4, border: '1px solid #ccc', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 6px', marginLeft: 2 }}
                        aria-label="Increase Evasion"
                    >+
                    </button>
                </span>
                <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
                    (Base: {baseEvasion}{armorMod !== 0 ? `, Armor: ${armorMod > 0 ? '+' : ''}${armorMod}` : ''})
                </Typography>
            </Box>
            <Box className="resource-tracker">
                <Box mb={1} display="flex" alignItems="center">
                    <Typography fontWeight={600} sx={{ mr: 1 }}>
                        HP: {totalHP}
                    </Typography>
                    <span style={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                        <button
                            onClick={() => handleBubbleChange('hp', 'add')}
                            style={{ fontSize: 18, width: 28, height: 28, borderRadius: 4, border: '1px solid #ccc', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 6px' }}
                            aria-label="Add HP"
                        >+
                        </button>
                        <button
                            onClick={() => handleBubbleChange('hp', 'remove')}
                            disabled={currentCharacter.hp.length <= 1}
                            style={{ fontSize: 18, width: 28, height: 28, borderRadius: 4, border: '1px solid #ccc', cursor: 'pointer', opacity: currentCharacter.hp.length <= 1 ? 0.5 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 6px' }}
                            aria-label="Remove HP"
                        >-
                        </button>
                    </span>
                </Box>
                <Stack direction="row" spacing={1} mb={2}>
                    {currentCharacter?.hp.map((filled: boolean, index: number) => (
                        <Box
                            key={index}
                            className={`circle${filled ? ' filled' : ''}`}
                            onClick={() => toggleCircles('hp', index)}
                            sx={{ width: 24, height: 24, borderRadius: '50%', border: '2px solid #3498db', backgroundColor: filled ? '#3498db' : '#fff', cursor: 'pointer' }}
                        />
                    ))}
                </Stack>
                <Box mb={1} display="flex" alignItems="center">
                    <Typography fontWeight={600} sx={{ mr: 1 }}>ARMOR:</Typography>
                    <span style={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                        <button
                            onClick={() => handleBubbleChange('armorSlots', 'add')}
                            style={{ fontSize: 18, width: 28, height: 28, borderRadius: 4, border: '1px solid #ccc', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 6px' }}
                            aria-label="Add Armor Slot"
                        >+
                        </button>
                        <button
                            onClick={() => handleBubbleChange('armorSlots', 'remove')}
                            disabled={armorSlots.length <= 0}
                            style={{ fontSize: 18, width: 28, height: 28, borderRadius: 4, border: '1px solid #ccc', cursor: 'pointer', opacity: armorSlots.length <= 0 ? 0.5 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 6px' }}
                            aria-label="Remove Armor Slot"
                        >-
                        </button>
                    </span>
                </Box>
                <Stack direction="row" spacing={1} mb={2}>
                    {armorSlots.map((filled: boolean, index: number) => (
                        <Box
                            key={index}
                            className={`circle${filled ? ' filled' : ''}`}
                            onClick={() => toggleCircles('armorSlots', index)}
                            sx={{ width: 24, height: 24, borderRadius: '50%', border: '2px solid #b59a00', backgroundColor: filled ? '#b59a00' : '#fff', cursor: 'pointer' }}
                        />
                    ))}
                </Stack>
                <Box mb={1} display="flex" alignItems="center">
                    <Typography fontWeight={600} sx={{ mr: 1 }}>STRESS:</Typography>
                    <span style={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                        <button
                            onClick={() => handleBubbleChange('stress', 'add')}
                            style={{ fontSize: 18, width: 28, height: 28, borderRadius: 4, border: '1px solid #ccc', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 6px' }}
                            aria-label="Add Stress"
                        >+
                        </button>
                        <button
                            onClick={() => handleBubbleChange('stress', 'remove')}
                            disabled={currentCharacter.stress.length <= 1}
                            style={{ fontSize: 18, width: 28, height: 28, borderRadius: 4, border: '1px solid #ccc', cursor: 'pointer', opacity: currentCharacter.stress.length <= 1 ? 0.5 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 6px' }}
                            aria-label="Remove Stress"
                        >-
                        </button>
                    </span>
                </Box>
                <Stack direction="row" spacing={1} mb={2}>
                    {currentCharacter?.stress.map((filled: boolean, index: number) => (
                        <Box
                            key={index}
                            className={`circle${filled ? ' filled' : ''}`}
                            onClick={() => toggleCircles('stress', index)}
                            sx={{ width: 24, height: 24, borderRadius: '50%', border: '2px solid #3498db', backgroundColor: filled ? '#3498db' : '#fff', cursor: 'pointer' }}
                        />
                    ))}
                </Stack>
                <Box mb={1} display="flex" alignItems="center">
                    <Typography fontWeight={600} sx={{ mr: 1 }}>HOPE:</Typography>
                    <span style={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                        <button
                            onClick={() => handleBubbleChange('hope', 'add')}
                            style={{ fontSize: 18, width: 28, height: 28, borderRadius: 4, border: '1px solid #ccc', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 6px' }}
                            aria-label="Add Hope"
                        >+
                        </button>
                        <button
                            onClick={() => handleBubbleChange('hope', 'remove')}
                            disabled={currentCharacter.hope.length <= 1}
                            style={{ fontSize: 18, width: 28, height: 28, borderRadius: 4, border: '1px solid #ccc', cursor: 'pointer', opacity: currentCharacter.hope.length <= 1 ? 0.5 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 6px' }}
                            aria-label="Remove Hope"
                        >-
                        </button>
                    </span>
                </Box>
                <Stack direction="row" spacing={1} mb={2}>
                    {currentCharacter?.hope.slice(0, 6).map((filled: boolean, index: number) => (
                        <Box
                            key={index}
                            className={`circle${filled ? ' filled' : ''}`}
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
                    <span style={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                        <button
                            onClick={() => handleBubbleChange('proficiency', 'add')}
                            style={{ fontSize: 18, width: 28, height: 28, borderRadius: 4, border: '1px solid #ccc', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 6px' }}
                            aria-label="Add Proficiency"
                        >+
                        </button>
                        <button
                            onClick={() => handleBubbleChange('proficiency', 'remove')}
                            disabled={currentCharacter.proficiency.length <= 1}
                            style={{ fontSize: 18, width: 28, height: 28, borderRadius: 4, border: '1px solid #ccc', cursor: 'pointer', opacity: currentCharacter.proficiency.length <= 1 ? 0.5 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 6px' }}
                            aria-label="Remove Proficiency"
                        >-
                        </button>
                    </span>
                </Box>
                <Stack direction="row" spacing={1} mb={2}>
                    {currentCharacter?.proficiency.map((filled: boolean, index: number) => (
                        <Box
                            key={index}
                            className={`circle${filled ? ' filled' : ''}`}
                            onClick={() => toggleCircles('proficiency', index)}
                            sx={{ width: 24, height: 24, borderRadius: '50%', border: '2px solid #27ae60', backgroundColor: filled ? '#27ae60' : '#fff', cursor: 'pointer' }}
                        />
                    ))}
                </Stack>
            </Box>
        </Paper>
    );
};

export default HealthSection; 