import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React from 'react';
import type { TraitName, TraitValue } from '../types/traits';
import { TRAIT_DESCRIPTORS } from '../types/traits';

interface TraitsSectionProps {
    traitAssignment: Record<TraitName, TraitValue | null>;
    traitIssues: Record<TraitName, 'duplicate' | 'unassigned' | null>;
    remainingTraitValues: TraitValue[];
    getAvailableValues: (trait: TraitName) => TraitValue[];
    handleTraitChange: (trait: TraitName, value: TraitValue | '') => void;
    resetTraitAssignment: () => void;
}

const traitLabels: Record<TraitName, string> = {
    agility: 'AGILITY',
    strength: 'STRENGTH',
    finesse: 'FINESSE',
    instinct: 'INSTINCT',
    presence: 'PRESENCE',
    knowledge: 'KNOWLEDGE',
};

const TraitsSection: React.FC<TraitsSectionProps> = ({
    traitAssignment,
    traitIssues,
    remainingTraitValues,
    getAvailableValues,
    handleTraitChange,
    resetTraitAssignment,
}) => (
    <Paper elevation={2} sx={{ p: 2, mb: 2, boxSizing: 'border-box' }}>
        <Typography variant="h5" gutterBottom>TRAITS</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <Typography variant="body1">Assign the following values to the six traits: <b>−1, 0, 0, +1, +1, +2</b>. Each value must be used exactly once. Traits affect your character's abilities in different situations.</Typography>
        </Box>
        <Box style={{ marginBottom: 16 }}>
            <Stack spacing={2} direction="column">
                {(Object.keys(traitLabels) as TraitName[]).map(trait => (
                    <Box key={trait} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography sx={{ minWidth: 90, fontWeight: 600, textAlign: 'right' }}>{traitLabels[trait]}:</Typography>
                        <Typography sx={{ fontSize: 13, fontStyle: 'italic', color: 'text.secondary', minWidth: 120 }}>
                            {TRAIT_DESCRIPTORS[trait].join(' • ')}
                        </Typography>
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
        </Box>
        <Typography sx={{ mt: 1, fontSize: 14 }}>
            <b>Remaining values:</b> {remainingTraitValues.length === 0 ? 'None' : remainingTraitValues.map(v => v >= 0 ? `+${v}` : v).join(', ')}
        </Typography>
        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <Button type="button" variant="outlined" onClick={resetTraitAssignment}>
                Reset
            </Button>
        </Stack>
    </Paper>
);

export default TraitsSection; 