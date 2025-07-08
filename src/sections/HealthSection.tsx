import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
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
    updateCharacterField?: (field: keyof DaggerheartCharacter, value: any) => void;
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

const HealthSection: React.FC<HealthSectionProps> = ({ currentCharacter, calculateThreshold, toggleCircles, updateCharacterField }) => {
    if (!currentCharacter) return null;
    const classDetail = CLASS_DETAILS[currentCharacter.characterClass] || null;
    const baseEvasion = classDetail ? classDetail.startingEvasion : 10;
    const armorMod = getArmorEvasionMod(currentCharacter.activeArmor || []);
    const totalEvasion = baseEvasion + armorMod;
    const totalHP = currentCharacter.hp.length;

    const handleHpChange = (delta: number) => {
        if (!updateCharacterField) return;
        let newHp = [...currentCharacter.hp];
        if (delta > 0) {
            newHp.push(false);
        } else if (delta < 0 && newHp.length > 1) {
            newHp.pop();
        }
        updateCharacterField('hp', newHp);
    };

    return (
        <Paper elevation={2} sx={{ p: 2, mb: 2, width: '100%' }}>
            <Typography variant="h5" gutterBottom>DAMAGE & HEALTH</Typography>
            <Box className="thresholds" sx={{ mb: 2 }}>
                <Typography variant="subtitle1">DAMAGE THRESHOLDS (Add your level)</Typography>
                <Typography>MINOR: {calculateThreshold(10)} (Mark 1 HP)</Typography>
                <Typography>MAJOR: {calculateThreshold(15)} (Mark 2 HP)</Typography>
                <Typography>SEVERE: {calculateThreshold(20)} (Mark 3 HP)</Typography>
            </Box>
            <Box className="resource-tracker">
                <Box display="flex" alignItems="center" mb={1}>
                    <Typography fontWeight={600} mr={1}>HP:</Typography>
                    <IconButton size="small" onClick={() => handleHpChange(-1)}><RemoveIcon fontSize="small" /></IconButton>
                    <Typography mx={1}>{totalHP}</Typography>
                    <IconButton size="small" onClick={() => handleHpChange(1)}><AddIcon fontSize="small" /></IconButton>
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
            </Box>
        </Paper>
    );
};

export default HealthSection; 