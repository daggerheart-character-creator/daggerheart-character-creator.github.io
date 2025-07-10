import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React from 'react';
import { ARMOR_OPTIONS } from '../constants/armor';
import { CLASS_DETAILS } from '../constants/classDetails';
import type { DaggerheartCharacter } from '../types/characterTypes';

interface HealthSectionProps {
    currentCharacter: DaggerheartCharacter;
    calculateThreshold: (base: number) => number;
    toggleCircles: (resourceType: 'hp' | 'stress' | 'hope' | 'proficiency', index: number) => void;
    isCreationMode: boolean;
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

const HealthSection: React.FC<HealthSectionProps> = ({ currentCharacter, calculateThreshold, toggleCircles, isCreationMode }) => {
    if (!currentCharacter) return null;
    const classDetail = CLASS_DETAILS[currentCharacter.characterClass] || null;
    const baseEvasion = classDetail ? classDetail.startingEvasion : 10;
    const armorMod = getArmorEvasionMod(currentCharacter.activeArmor || []);
    const totalEvasion = baseEvasion + armorMod;
    const totalHP = currentCharacter.hp.length;

    // Get selected armor thresholds
    let minorBase = 10, majorBase = 15, severeBase = 20, armorLabel = '';
    const selectedArmor = currentCharacter.activeArmor && currentCharacter.activeArmor[0]?.name
        ? ARMOR_OPTIONS.find(a => a.name === currentCharacter.activeArmor[0].name)
        : null;
    if (selectedArmor && selectedArmor.baseThresholds) {
        // baseThresholds is like '5 / 11' or '7 / 15' or '8 / 17'
        // We'll use the first number for Minor, second for Major, and Severe = Major + 5
        const [minor, major] = selectedArmor.baseThresholds.split('/').map(s => parseInt(s.trim(), 10));
        if (!isNaN(minor)) minorBase = minor;
        if (!isNaN(major)) majorBase = major;
        severeBase = !isNaN(major) ? major + 5 : 20;
        armorLabel = selectedArmor.name;
    }
    return (
        <Paper elevation={2} sx={{ p: 2, mb: 2, width: '100%' }}>
            <Typography variant="h5" gutterBottom>DAMAGE & HEALTH</Typography>
            <Box className="thresholds" sx={{ mb: 2 }}>
                <Typography variant="subtitle1">DAMAGE THRESHOLDS (Add your level){armorLabel && ` (Armor: ${armorLabel})`}</Typography>
                <Typography>MINOR: {calculateThreshold(minorBase)} (Mark 1 HP)</Typography>
                <Typography>MAJOR: {calculateThreshold(majorBase)} (Mark 2 HP)</Typography>
                <Typography>SEVERE: {calculateThreshold(severeBase)} (Mark 3 HP)</Typography>
            </Box>
            <Box className="resource-tracker">
                {currentCharacter.hp.length > 0 && (
                    <Box mb={1}>
                        <Typography fontWeight={600}>
                            HP <span style={{ fontWeight: 700 }}>({totalHP})</span>
                        </Typography>
                    </Box>
                )}
                {!isCreationMode && currentCharacter.hp.length > 0 && (
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
                )}
                {!isCreationMode && (
                    <>
                        <Box className="evasion" mb={2}>
                            <Typography fontWeight={600} display="inline">Evasion: </Typography>
                            <Typography display="inline" mx={1}>{totalEvasion}</Typography>
                            <Typography variant="body2" color="text.secondary" display="inline" ml={2}>
                                (Base: {baseEvasion}{armorMod !== 0 ? `, Armor: ${armorMod > 0 ? '+' : ''}${armorMod}` : ''})
                            </Typography>
                        </Box>
                        <Typography fontWeight={600}>STRESS:</Typography>
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
                        <Typography fontWeight={600}>HOPE:</Typography>
                        <Stack direction="row" spacing={1} mb={2}>
                            {currentCharacter?.hope.map((filled: boolean, index: number) => (
                                <Box
                                    key={index}
                                    className={`circle${filled ? ' filled' : ''}`}
                                    onClick={() => toggleCircles('hope', index)}
                                    sx={{ width: 24, height: 24, borderRadius: '50%', border: '2px solid #3498db', backgroundColor: filled ? '#3498db' : '#fff', cursor: 'pointer' }}
                                />
                            ))}
                        </Stack>
                        <Typography variant="body2" color="text.secondary" mb={2}>*Spend a Hope to use an experience or help an ally.</Typography>
                        <Typography fontWeight={600}>PROFICIENCY:</Typography>
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
                    </>
                )}
            </Box>
        </Paper>
    );
};

export default HealthSection; 