import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useCharacter } from '../CharacterContext';
import { ARMOR_OPTIONS } from '../constants/armor';
import { MAGIC_WEAPONS, PRIMARY_WEAPONS, SECONDARY_WEAPONS } from '../constants/weapons';

interface WeaponsArmorSectionProps {
    // currentCharacter: any; // Removed as per edit hint
    // handleWeaponChange: (index: number, field: keyof Weapon, value: string) => void; // Removed as per edit hint
    // handleArmorChange: (index: number, field: keyof Armor, value: string) => void; // Removed as per edit hint
}

const WeaponsArmorSection: React.FC<WeaponsArmorSectionProps> = () => {
    const { currentCharacter, updateCharacterField } = useCharacter();

    // For simplicity, assume weapon 0 is primary, 1 is secondary
    const weaponOptions = [
        ...PRIMARY_WEAPONS,
        ...MAGIC_WEAPONS
    ];
    const secondaryOptions = SECONDARY_WEAPONS;

    const getWeaponByName = (name: string) => weaponOptions.concat(secondaryOptions).find(w => w.name === name);
    const getArmorByName = (name: string) => ARMOR_OPTIONS.find(a => a.name === name);

    return (
        <Box>
            <Paper elevation={2} sx={{ p: 3, mb: 2, boxSizing: 'border-box' }}>
                <Typography variant="h5" gutterBottom>ACTIVE WEAPONS</Typography>
                <Box>
                    {[0, 1].map((index) => {
                        const isPrimary = index === 0;
                        const options = isPrimary ? weaponOptions : secondaryOptions;
                        const weapon = currentCharacter?.activeWeapons[index] || { name: '', traitRange: '', damageDiceType: '', feature: '' };
                        const selected = getWeaponByName(weapon.name);
                        return (
                            <Paper key={index} elevation={1} sx={{ p: 2, mb: 1 }}>
                                <Typography variant="subtitle1">{isPrimary ? 'Primary Weapon' : 'Secondary Weapon'}:</Typography>
                                <FormControl fullWidth sx={{ mb: 1 }}>
                                    <InputLabel id={`weapon-select-label-${index}`}>{isPrimary ? 'Primary Weapon' : 'Secondary Weapon'}</InputLabel>
                                    <Select
                                        labelId={`weapon-select-label-${index}`}
                                        value={weapon.name}
                                        label={isPrimary ? 'Primary Weapon' : 'Secondary Weapon'}
                                        onChange={e => {
                                            const updatedWeapons = [...currentCharacter.activeWeapons];
                                            updatedWeapons[index] = {
                                                ...updatedWeapons[index],
                                                name: e.target.value
                                            };
                                            updateCharacterField('activeWeapons', updatedWeapons);
                                        }}
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
                </Box>
                <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>ACTIVE ARMOR</Typography>
                <Box>
                    {[0].map((index) => {
                        const armor = currentCharacter?.activeArmor[index] || { name: '', feature: '' };
                        const selected = getArmorByName(armor.name);
                        return (
                            <Paper key={index} elevation={1} sx={{ p: 2, mb: 1 }}>
                                <Typography variant="subtitle1">Armor:</Typography>
                                <FormControl fullWidth sx={{ mb: 1 }}>
                                    <InputLabel id={`armor-select-label-${index}`}>Armor</InputLabel>
                                    <Select
                                        labelId={`armor-select-label-${index}`}
                                        value={armor.name}
                                        label="Armor"
                                        onChange={e => {
                                            const updatedArmor = [...currentCharacter.activeArmor];
                                            updatedArmor[index] = {
                                                ...updatedArmor[index],
                                                name: e.target.value
                                            };
                                            updateCharacterField('activeArmor', updatedArmor);
                                        }}
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
                </Box>
            </Paper>
        </Box>
    );
};

export default WeaponsArmorSection; 