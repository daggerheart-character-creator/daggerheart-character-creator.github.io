import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React from 'react';
import type { Armor, Weapon } from '../CharacterSheet';

interface WeaponsArmorSectionProps {
    currentCharacter: any;
    handleWeaponChange: (index: number, field: keyof Weapon, value: string) => void;
    handleArmorChange: (index: number, field: keyof Armor, value: string) => void;
}

const WeaponsArmorSection: React.FC<WeaponsArmorSectionProps> = ({ currentCharacter, handleWeaponChange, handleArmorChange }) => (
    <Paper elevation={2} sx={{ p: 2, mb: 2, width: '100%' }}>
        <Typography variant="h5" gutterBottom>ACTIVE WEAPONS</Typography>
        <Stack spacing={2}>
            {currentCharacter?.activeWeapons.map((weapon: any, index: number) => (
                <Paper key={index} sx={{ p: 2, mb: 1 }} variant="outlined">
                    <Typography variant="subtitle1">Weapon {index + 1}:</Typography>
                    <TextField label="Name" value={weapon.name} onChange={e => handleWeaponChange(index, 'name', e.target.value)} fullWidth sx={{ mb: 1 }} />
                    <TextField label="Trait & Range" value={weapon.traitRange} onChange={e => handleWeaponChange(index, 'traitRange', e.target.value)} fullWidth sx={{ mb: 1 }} />
                    <TextField label="Damage Dice & Type" value={weapon.damageDiceType} onChange={e => handleWeaponChange(index, 'damageDiceType', e.target.value)} fullWidth sx={{ mb: 1 }} />
                    <TextField label="Feature" value={weapon.feature} onChange={e => handleWeaponChange(index, 'feature', e.target.value)} fullWidth multiline minRows={2} />
                </Paper>
            ))}
        </Stack>
        <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>ACTIVE ARMOR</Typography>
        <Stack spacing={2}>
            {currentCharacter?.activeArmor.map((armor: any, index: number) => (
                <Paper key={index} sx={{ p: 2, mb: 1 }} variant="outlined">
                    <Typography variant="subtitle1">Armor {index + 1}:</Typography>
                    <TextField label="Name" value={armor.name} onChange={e => handleArmorChange(index, 'name', e.target.value)} fullWidth sx={{ mb: 1 }} />
                    <TextField label="Feature" value={armor.feature} onChange={e => handleArmorChange(index, 'feature', e.target.value)} fullWidth multiline minRows={2} />
                </Paper>
            ))}
        </Stack>
    </Paper>
);

export default WeaponsArmorSection; 