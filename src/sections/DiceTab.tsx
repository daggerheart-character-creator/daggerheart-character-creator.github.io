import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { useCharacter } from '../CharacterContext';
import { TRAIT_NAMES } from '../types/traits';

function rollDie(sides: number) {
    return Math.floor(Math.random() * sides) + 1;
}

const DiceTab: React.FC = () => {
    const { currentCharacter } = useCharacter();
    const [selectedTrait, setSelectedTrait] = useState<string>('agility');
    const [modifier, setModifier] = useState<string>('0');
    const [advantage, setAdvantage] = useState<boolean>(false);
    const [disadvantage, setDisadvantage] = useState<boolean>(false);
    const [result, setResult] = useState<any>(null);
    const [selectedWeaponIdx, setSelectedWeaponIdx] = useState<number>(0);
    const [damageResult, setDamageResult] = useState<any>(null);
    const [damageSource, setDamageSource] = useState<'weapon' | 'custom'>('weapon');
    const [customDiceCount, setCustomDiceCount] = useState<number>(1);
    const [customDiceType, setCustomDiceType] = useState<string>('d8');
    const [customModifier, setCustomModifier] = useState<string>('0');

    // Get trait value from character
    const traitValue = Number(currentCharacter[selectedTrait as keyof typeof currentCharacter]) || 0;
    const modifierNum = modifier === '' || isNaN(Number(modifier)) ? 0 : Number(modifier);

    // Get equipped weapons
    const equippedWeapons = currentCharacter.activeWeapons.filter(w => w && w.name);
    const selectedWeapon = equippedWeapons[selectedWeaponIdx] || null;
    // Only count filled (true) proficiency bubbles
    const proficiencyCount = Array.isArray(currentCharacter.proficiency)
        ? currentCharacter.proficiency.filter((v: boolean) => v).length
        : 0;

    function parseDamageDiceType(damageDiceType: string): { sides: number, modifier: number } {
        // e.g., 'd8 phy', '2d6 mag', 'd10', 'd8+3 phy', etc.
        const match = damageDiceType.match(/d(\d+)([+\-]\d+)?/);
        if (!match) return { sides: 6, modifier: 0 };
        const sides = parseInt(match[1], 10);
        const modifier = match[2] ? parseInt(match[2], 10) : 0;
        return { sides, modifier };
    }

    // When weapon or proficiency changes, update custom fields if in weapon mode
    React.useEffect(() => {
        if (damageSource === 'weapon' && selectedWeapon) {
            const { sides, modifier } = parseDamageDiceType(selectedWeapon.damageDiceType);
            setCustomDiceCount(proficiencyCount || 1);
            setCustomDiceType('d' + sides);
            setCustomModifier(String(modifier));
        }
    }, [damageSource, selectedWeapon, proficiencyCount]);

    const handleRoll = () => {
        // Roll two d12s
        const hope = rollDie(12);
        const fear = rollDie(12);
        let d6 = null;
        let advType = null;
        if (advantage && !disadvantage) {
            d6 = rollDie(6);
            advType = 'advantage';
        } else if (!advantage && disadvantage) {
            d6 = rollDie(6);
            advType = 'disadvantage';
        }
        // Total: trait + modifier + hope (if hope > fear) or fear (if fear > hope)
        const base = traitValue + modifierNum;
        let total: number;
        let usedDie: 'hope' | 'fear';
        if (hope > fear) {
            total = base + hope;
            usedDie = 'hope';
        } else if (fear > hope) {
            total = base + fear;
            usedDie = 'fear';
        } else {
            // Tie: use hope
            total = base + hope;
            usedDie = 'hope';
        }
        // Apply d6 for adv/disadvantage
        if (advType === 'advantage') total += d6!;
        if (advType === 'disadvantage') total -= d6!;
        setResult({ hope, fear, d6, advType, traitValue, modifier, total, usedDie });
    };

    const handleModifierBlur = () => {
        if (modifier === '' || isNaN(Number(modifier))) setModifier('0');
    };

    const handleDamageRoll = () => {
        const diceCount = customDiceCount;
        const sides = Number(customDiceType.replace('d', ''));
        const modifier = customModifier === '' || isNaN(Number(customModifier)) ? 0 : Number(customModifier);
        let sourceLabel = '';
        if (damageSource === 'weapon') {
            if (!selectedWeapon) return;
            sourceLabel = selectedWeapon.name;
        } else {
            sourceLabel = 'Custom';
        }
        const dice = Array.from({ length: diceCount }, () => rollDie(sides));
        const total = dice.reduce((a, b) => a + b, 0) + modifier;
        setDamageResult({ sourceLabel, dice, modifier, total, diceCount, sides });
    };

    return (
        <Box sx={{ p: 2, maxWidth: 480, mx: 'auto' }}>
            <Typography variant="h4" align="center" gutterBottom>Dice Roller</Typography>
            <Paper sx={{ p: 2, mb: 4 }}>
                <Typography variant="h6" gutterBottom>Duality Dice (Action Roll)</Typography>
                <Stack spacing={2} mb={2}>
                    <FormControl fullWidth>
                        <InputLabel id="trait-select-label">Trait</InputLabel>
                        <Select
                            labelId="trait-select-label"
                            value={selectedTrait}
                            label="Trait"
                            onChange={e => setSelectedTrait(e.target.value)}
                        >
                            {TRAIT_NAMES.map(trait => (
                                <MenuItem key={trait} value={trait}>
                                    {trait.charAt(0).toUpperCase() + trait.slice(1)} ({currentCharacter[trait] >= 0 ? '+' : ''}{currentCharacter[trait]})
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <Typography>Modifier:</Typography>
                        <Button size="small" variant="outlined" sx={{ minWidth: 28, width: 28, height: 28, p: 0 }} onClick={() => setModifier((prev) => String((Number(prev || '0') - 1)))}>-</Button>
                        <TextField
                            type="text"
                            inputProps={{ inputMode: 'numeric', pattern: '-?\d*', style: { textAlign: 'center' } }}
                            value={modifier}
                            onChange={e => setModifier(e.target.value.replace(/[^-\d]/g, ''))}
                            onBlur={handleModifierBlur}
                            sx={{ width: 56 }}
                            size="small"
                        />
                        <Button size="small" variant="outlined" sx={{ minWidth: 28, width: 28, height: 28, p: 0 }} onClick={() => setModifier((prev) => String((Number(prev || '0') + 1)))}>+</Button>
                    </Stack>
                    <Stack direction="row" spacing={2} alignItems="center">
                        <FormControl>
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <Checkbox
                                    checked={advantage}
                                    onChange={e => { setAdvantage(e.target.checked); if (e.target.checked) setDisadvantage(false); }}
                                    size="small"
                                />
                                <Typography>Advantage (add d6)</Typography>
                            </Stack>
                        </FormControl>
                        <FormControl>
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <Checkbox
                                    checked={disadvantage}
                                    onChange={e => { setDisadvantage(e.target.checked); if (e.target.checked) setAdvantage(false); }}
                                    size="small"
                                />
                                <Typography>Disadvantage (subtract d6)</Typography>
                            </Stack>
                        </FormControl>
                    </Stack>
                    <Button variant="contained" onClick={handleRoll} sx={{ mt: 1, fontSize: 16, alignSelf: 'flex-start' }}>Roll</Button>
                </Stack>
                {result && (
                    <Box sx={{ mt: 2, background: '#23272a', color: '#fff', borderRadius: 2, p: 2 }}>
                        <Typography>Trait: <b>{selectedTrait.charAt(0).toUpperCase() + selectedTrait.slice(1)} ({result.traitValue >= 0 ? '+' : ''}{result.traitValue})</b></Typography>
                        <Typography>Modifier: <b>{modifierNum >= 0 ? '+' : ''}{modifierNum}</b></Typography>
                        <Typography>Hope d12: <b>{result.hope}</b> {result.hope === 12 && '🎉 Critical!'} {result.hope === 1 && '💀 Fumble!'}</Typography>
                        <Typography>Fear d12: <b>{result.fear}</b> {result.fear === 12 && '🎉 Critical!'} {result.fear === 1 && '💀 Fumble!'}</Typography>
                        {result.advType && <Typography>{result.advType === 'advantage' ? 'Advantage' : 'Disadvantage'} d6: <b>{result.d6}</b></Typography>}
                        <Typography sx={{ fontSize: 18, mt: 1 }}>Total: <b>{result.total} with {result.usedDie}</b></Typography>
                    </Box>
                )}
            </Paper>
            <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>Damage Roll</Typography>
                <Stack spacing={2} mb={2}>
                    <FormControl fullWidth>
                        <InputLabel id="damage-source-label">Source</InputLabel>
                        <Select
                            labelId="damage-source-label"
                            value={damageSource}
                            label="Source"
                            onChange={e => setDamageSource(e.target.value as 'weapon' | 'custom')}
                        >
                            <MenuItem value="weapon">Equipped Weapon</MenuItem>
                            <MenuItem value="custom">Custom</MenuItem>
                        </Select>
                    </FormControl>
                    {damageSource === 'weapon' && (
                        <FormControl fullWidth>
                            <InputLabel id="weapon-select-label">Weapon</InputLabel>
                            <Select
                                labelId="weapon-select-label"
                                value={selectedWeaponIdx}
                                label="Weapon"
                                onChange={e => setSelectedWeaponIdx(Number(e.target.value))}
                            >
                                {equippedWeapons.length === 0 && <MenuItem value={-1}>No weapon equipped</MenuItem>}
                                {equippedWeapons.map((w, idx) => (
                                    <MenuItem key={w.name + idx} value={idx}>{w.name} ({w.damageDiceType})</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    )}
                    <Stack direction="row" spacing={2} alignItems="center">
                        <Typography>Number of Dice:</Typography>
                        <TextField
                            type="number"
                            inputProps={{ min: 1 }}
                            value={customDiceCount}
                            onChange={e => setCustomDiceCount(Math.max(1, Number(e.target.value)))}
                            sx={{ width: 56 }}
                            size="small"
                            disabled={damageSource === 'weapon'}
                        />
                    </Stack>
                    <Stack direction="row" spacing={2} alignItems="center">
                        <Typography>Dice Type:</Typography>
                        <FormControl sx={{ minWidth: 80 }} size="small">
                            <Select
                                value={customDiceType}
                                onChange={e => setCustomDiceType(e.target.value)}
                                disabled={damageSource === 'weapon'}
                            >
                                <MenuItem value="d4">d4</MenuItem>
                                <MenuItem value="d6">d6</MenuItem>
                                <MenuItem value="d8">d8</MenuItem>
                                <MenuItem value="d10">d10</MenuItem>
                                <MenuItem value="d12">d12</MenuItem>
                                <MenuItem value="d20">d20</MenuItem>
                            </Select>
                        </FormControl>
                    </Stack>
                    <Stack direction="row" spacing={2} alignItems="center">
                        <Typography>Modifier:</Typography>
                        <TextField
                            type="number"
                            value={customModifier}
                            onChange={e => setCustomModifier(e.target.value)}
                            sx={{ width: 56 }}
                            size="small"
                        />
                    </Stack>
                    <Button variant="contained" onClick={handleDamageRoll} sx={{ mt: 1, fontSize: 16, alignSelf: 'flex-start' }}>Roll Damage</Button>
                </Stack>
                {damageResult && (
                    <Box sx={{ mt: 2, background: '#23272a', color: '#fff', borderRadius: 2, p: 2 }}>
                        <Typography>Source: <b>{damageResult.sourceLabel}</b></Typography>
                        <Typography>Dice: <b>{damageResult.dice.join(', ')}</b></Typography>
                        <Typography>Modifier: <b>{damageResult.modifier >= 0 ? '+' : ''}{damageResult.modifier}</b></Typography>
                        <Typography sx={{ fontSize: 18, mt: 1 }}>Total: <b>{damageResult.total}</b></Typography>
                    </Box>
                )}
            </Paper>
        </Box>
    );
};

export default DiceTab; 