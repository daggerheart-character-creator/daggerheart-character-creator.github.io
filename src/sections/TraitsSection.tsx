import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React from 'react';
import type { DaggerheartCharacter, TraitName, TraitValue } from '../CharacterSheet';

interface TraitsSectionProps {
    currentCharacter: DaggerheartCharacter;
    traitAssignment: Record<TraitName, TraitValue | null>;
    traitIssues: Record<TraitName, 'duplicate' | 'unassigned' | null>;
    isValidTraitAssignment: boolean;
    remainingTraitValues: TraitValue[];
    TRAIT_NAMES: readonly TraitName[];
    getAvailableValues: (trait: TraitName) => TraitValue[];
    handleTraitChange: (trait: TraitName, value: TraitValue | '') => void;
    applyTraitAssignment: () => void;
    resetTraitAssignment: () => void;
    showTraitHelp: boolean;
    setShowTraitHelp: (show: boolean) => void;
    updateCharacterField: (field: keyof DaggerheartCharacter, value: any) => void;
}

const TraitsSection: React.FC<TraitsSectionProps> = ({
    currentCharacter,
    traitAssignment,
    traitIssues,
    isValidTraitAssignment,
    remainingTraitValues,
    TRAIT_NAMES,
    getAvailableValues,
    handleTraitChange,
    applyTraitAssignment,
    resetTraitAssignment,
    showTraitHelp,
    setShowTraitHelp,
    updateCharacterField,
}) => (
    <Paper elevation={2} sx={{ p: 2, mb: 2, width: '100%' }}>
        <Typography variant="h5" gutterBottom>TRAITS</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <Typography variant="body1">Assign the following values to the six traits: <b>−1, 0, 0, +1, +1, +2</b>. Each value must be used exactly once. Traits affect your character's abilities in different situations.</Typography>
            <Box
                component="span"
                sx={{ cursor: 'pointer', fontSize: 18 }}
                onMouseEnter={() => setShowTraitHelp(true)}
                onMouseLeave={() => setShowTraitHelp(false)}
                tabIndex={0}
                aria-label="Trait assignment help"
            >
                ℹ️
            </Box>
            {showTraitHelp && (
                <Box sx={{ background: '#fff', color: '#222', border: '1px solid #ccc', borderRadius: 1, p: 1, position: 'absolute', zIndex: 10, ml: 1, maxWidth: 320 }}>
                    Assign the following values to the six traits: <b>−1, 0, 0, +1, +1, +2</b>. Each value must be used exactly once. Traits affect your character's abilities in different situations.
                </Box>
            )}
        </Box>
        <form
            onSubmit={e => {
                e.preventDefault();
                applyTraitAssignment();
            }}
            style={{ marginBottom: 16 }}
        >
            <Stack spacing={2} direction="row" flexWrap="wrap">
                {TRAIT_NAMES.map(trait => (
                    <Box
                        key={trait}
                        sx={{
                            display: 'flex', alignItems: 'center', gap: 1,
                            background: traitIssues[trait] === 'duplicate' ? '#ffeaea' : traitIssues[trait] === 'unassigned' ? '#fffbe6' : undefined,
                            borderRadius: 1, p: 1,
                        }}
                    >
                        <Typography sx={{ width: 90, fontWeight: 600 }}>{trait.toUpperCase()}:</Typography>
                        <FormControl size="small">
                            <Select
                                value={traitAssignment[trait] !== null ? String(traitAssignment[trait]) : ''}
                                onChange={e => {
                                    const val = e.target.value === '' ? '' : Number(e.target.value);
                                    handleTraitChange(trait, val === '' ? '' : ([-1, 0, 1, 2].includes(val) ? (val as TraitValue) : ''));
                                }}
                                displayEmpty
                            >
                                <MenuItem value="">--</MenuItem>
                                {getAvailableValues(trait).map(val => (
                                    <MenuItem key={val} value={String(val)}>{val >= 0 ? `+${val}` : val}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        {traitIssues[trait] === 'duplicate' && <Typography color="error" fontSize={12}>Duplicate</Typography>}
                        {traitIssues[trait] === 'unassigned' && <Typography sx={{ color: '#b59a00', fontSize: 12 }}>Unassigned</Typography>}
                    </Box>
                ))}
            </Stack>
            <Typography sx={{ mt: 1, fontSize: 14 }}>
                <b>Remaining values:</b> {remainingTraitValues.length === 0 ? 'None' : remainingTraitValues.map(v => v >= 0 ? `+${v}` : v).join(', ')}
            </Typography>
            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                <Button type="submit" variant="contained" color="primary" disabled={!isValidTraitAssignment}>
                    Apply Trait Assignment
                </Button>
                <Button type="button" variant="outlined" onClick={resetTraitAssignment}>
                    Reset
                </Button>
            </Stack>
            {!isValidTraitAssignment && (
                <Typography color="error" sx={{ mt: 1 }}>
                    You must assign −1, 0, 0, +1, +1, +2 across the six traits. No duplicates.
                </Typography>
            )}
        </form>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
            <Typography sx={{ width: 90, fontWeight: 600 }}>EVASION:</Typography>
            <TextField
                type="number"
                value={currentCharacter?.evasion}
                onChange={e => updateCharacterField('evasion', parseInt(e.target.value) || 0)}
                size="small"
                sx={{ width: 100 }}
                inputProps={{ min: 0 }}
            />
        </Box>
    </Paper>
);

export default TraitsSection; 