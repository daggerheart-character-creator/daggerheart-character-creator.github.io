import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React from 'react';
import { ARMOR_OPTIONS } from '../constants/armor';
import { MAGIC_WEAPONS, PRIMARY_WEAPONS, SECONDARY_WEAPONS } from '../constants/weapons';
import type { Armor, Weapon } from '../types/characterTypes';

interface WeaponsArmorSectionProps {
    currentCharacter: any;
    handleWeaponChange: (index: number, field: keyof Weapon, value: string) => void;
    handleArmorChange: (index: number, field: keyof Armor, value: string) => void;
}

const WeaponsArmorSection: React.FC<WeaponsArmorSectionProps> = ({ currentCharacter, handleWeaponChange, handleArmorChange }) => {
    // For simplicity, assume weapon 0 is primary, 1 is secondary
    const weaponOptions = [
        ...PRIMARY_WEAPONS,
        ...MAGIC_WEAPONS
    ];
    const secondaryOptions = SECONDARY_WEAPONS;

    const getWeaponByName = (name: string) => weaponOptions.concat(secondaryOptions).find(w => w.name === name);
    const getArmorByName = (name: string) => ARMOR_OPTIONS.find(a => a.name === name);

    return (
        <Paper elevation={2} sx={{ p: 2, mb: 2, width: '100%' }}>
            <Typography variant="h5" gutterBottom>ACTIVE WEAPONS</Typography>
            <Stack spacing={2}>
                {[0, 1].map((index) => {
                    const isPrimary = index === 0;
                    const options = isPrimary ? weaponOptions : secondaryOptions;
                    const weapon = currentCharacter?.activeWeapons[index] || { name: '', traitRange: '', damageDiceType: '', feature: '' };
                    const selected = getWeaponByName(weapon.name);
                    return (
                        <Paper key={index} sx={{ p: 2, mb: 1 }} variant="outlined">
                            <Typography variant="subtitle1">{isPrimary ? 'Primary Weapon' : 'Secondary Weapon'}:</Typography>
                            <FormControl fullWidth sx={{ mb: 1 }}>
                                <InputLabel id={`weapon-select-label-${index}`}>{isPrimary ? 'Primary Weapon' : 'Secondary Weapon'}</InputLabel>
                                <Select
                                    labelId={`weapon-select-label-${index}`}
                                    value={weapon.name}
                                    label={isPrimary ? 'Primary Weapon' : 'Secondary Weapon'}
                                    onChange={e => handleWeaponChange(index, 'name', e.target.value)}
                                >
                                    <MenuItem value=""><em>Select a weapon...</em></MenuItem>
                                    {options.map(opt => (
                                        <MenuItem key={opt.name} value={opt.name}>
                                            {opt.name} — {opt.traitRange} — {opt.damageDiceType}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            {selected && (
                                <>
                                    <Typography variant="body2"><b>Trait & Range:</b> {selected.traitRange}</Typography>
                                    <Typography variant="body2"><b>Damage Dice & Type:</b> {selected.damageDiceType}</Typography>
                                    {selected.feature && <Typography variant="body2"><b>Feature:</b> {selected.feature}</Typography>}
                                </>
                            )}
                        </Paper>
                    );
                })}
            </Stack>
            <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>ACTIVE ARMOR</Typography>
            <Stack spacing={2}>
                {[0].map((index) => {
                    const armor = currentCharacter?.activeArmor[index] || { name: '', feature: '' };
                    const selected = getArmorByName(armor.name);
                    return (
                        <Paper key={index} sx={{ p: 2, mb: 1 }} variant="outlined">
                            <Typography variant="subtitle1">Armor:</Typography>
                            <FormControl fullWidth sx={{ mb: 1 }}>
                                <InputLabel id={`armor-select-label-${index}`}>Armor</InputLabel>
                                <Select
                                    labelId={`armor-select-label-${index}`}
                                    value={armor.name}
                                    label="Armor"
                                    onChange={e => handleArmorChange(index, 'name', e.target.value)}
                                >
                                    <MenuItem value=""><em>Select armor...</em></MenuItem>
                                    {ARMOR_OPTIONS.map(opt => (
                                        <MenuItem key={opt.name} value={opt.name}>
                                            {opt.name} — {opt.baseThresholds}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            {selected && (
                                <>
                                    <Typography variant="body2"><b>Base Thresholds:</b> {selected.baseThresholds}</Typography>
                                    <Typography variant="body2"><b>Base Score:</b> {selected.baseScore}</Typography>
                                    {selected.feature && <Typography variant="body2"><b>Feature:</b> {selected.feature}</Typography>}
                                </>
                            )}
                        </Paper>
                    );
                })}
            </Stack>
        </Paper>
    );
};

export default WeaponsArmorSection; 