import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
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
    handleApplySuggestions?: () => void;
    setTraitAssignment: React.Dispatch<React.SetStateAction<Record<TraitName, TraitValue | null>>>;
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
    handleApplySuggestions,
    setTraitAssignment,
}) => (
    <Paper elevation={2} sx={{ py: 2, px: 2, mb: 2, width: '100%' }}>
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
            <Stack spacing={2} direction="column">
                {/* AGILITY */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography sx={{ minWidth: 90, fontWeight: 600, textAlign: 'right' }}>AGILITY:</Typography>
                    <FormControl size="small">
                        <Select
                            value={traitAssignment['agility'] !== null ? String(traitAssignment['agility']) : ''}
                            onChange={e => {
                                const val = e.target.value === '' ? '' : Number(e.target.value);
                                handleTraitChange('agility', val === '' ? '' : ([-1, 0, 1, 2].includes(val) ? (val as TraitValue) : ''));
                            }}
                            displayEmpty
                        >
                            <MenuItem value="">--</MenuItem>
                            {getAvailableValues('agility').map(val => (
                                <MenuItem key={val} value={String(val)}>{val >= 0 ? `+${val}` : val}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    {traitIssues['agility'] === 'duplicate' && <Typography color="error" fontSize={12}>Duplicate</Typography>}
                    {traitIssues['agility'] === 'unassigned' && <Typography sx={{ color: '#b59a00', fontSize: 12 }}>Unassigned</Typography>}
                </Box>
                {/* STRENGTH */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography sx={{ minWidth: 90, fontWeight: 600, textAlign: 'right' }}>STRENGTH:</Typography>
                    <FormControl size="small">
                        <Select
                            value={traitAssignment['strength'] !== null ? String(traitAssignment['strength']) : ''}
                            onChange={e => {
                                const val = e.target.value === '' ? '' : Number(e.target.value);
                                handleTraitChange('strength', val === '' ? '' : ([-1, 0, 1, 2].includes(val) ? (val as TraitValue) : ''));
                            }}
                            displayEmpty
                        >
                            <MenuItem value="">--</MenuItem>
                            {getAvailableValues('strength').map(val => (
                                <MenuItem key={val} value={String(val)}>{val >= 0 ? `+${val}` : val}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    {traitIssues['strength'] === 'duplicate' && <Typography color="error" fontSize={12}>Duplicate</Typography>}
                    {traitIssues['strength'] === 'unassigned' && <Typography sx={{ color: '#b59a00', fontSize: 12 }}>Unassigned</Typography>}
                </Box>
                {/* FINESSE */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography sx={{ minWidth: 90, fontWeight: 600, textAlign: 'right' }}>FINESSE:</Typography>
                    <FormControl size="small">
                        <Select
                            value={traitAssignment['finesse'] !== null ? String(traitAssignment['finesse']) : ''}
                            onChange={e => {
                                const val = e.target.value === '' ? '' : Number(e.target.value);
                                handleTraitChange('finesse', val === '' ? '' : ([-1, 0, 1, 2].includes(val) ? (val as TraitValue) : ''));
                            }}
                            displayEmpty
                        >
                            <MenuItem value="">--</MenuItem>
                            {getAvailableValues('finesse').map(val => (
                                <MenuItem key={val} value={String(val)}>{val >= 0 ? `+${val}` : val}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    {traitIssues['finesse'] === 'duplicate' && <Typography color="error" fontSize={12}>Duplicate</Typography>}
                    {traitIssues['finesse'] === 'unassigned' && <Typography sx={{ color: '#b59a00', fontSize: 12 }}>Unassigned</Typography>}
                </Box>
                {/* INSTINCT */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography sx={{ minWidth: 90, fontWeight: 600, textAlign: 'right' }}>INSTINCT:</Typography>
                    <FormControl size="small">
                        <Select
                            value={traitAssignment['instinct'] !== null ? String(traitAssignment['instinct']) : ''}
                            onChange={e => {
                                const val = e.target.value === '' ? '' : Number(e.target.value);
                                handleTraitChange('instinct', val === '' ? '' : ([-1, 0, 1, 2].includes(val) ? (val as TraitValue) : ''));
                            }}
                            displayEmpty
                        >
                            <MenuItem value="">--</MenuItem>
                            {getAvailableValues('instinct').map(val => (
                                <MenuItem key={val} value={String(val)}>{val >= 0 ? `+${val}` : val}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    {traitIssues['instinct'] === 'duplicate' && <Typography color="error" fontSize={12}>Duplicate</Typography>}
                    {traitIssues['instinct'] === 'unassigned' && <Typography sx={{ color: '#b59a00', fontSize: 12 }}>Unassigned</Typography>}
                </Box>
                {/* PRESENCE */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography sx={{ minWidth: 90, fontWeight: 600, textAlign: 'right' }}>PRESENCE:</Typography>
                    <FormControl size="small">
                        <Select
                            value={traitAssignment['presence'] !== null ? String(traitAssignment['presence']) : ''}
                            onChange={e => {
                                const val = e.target.value === '' ? '' : Number(e.target.value);
                                handleTraitChange('presence', val === '' ? '' : ([-1, 0, 1, 2].includes(val) ? (val as TraitValue) : ''));
                            }}
                            displayEmpty
                        >
                            <MenuItem value="">--</MenuItem>
                            {getAvailableValues('presence').map(val => (
                                <MenuItem key={val} value={String(val)}>{val >= 0 ? `+${val}` : val}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    {traitIssues['presence'] === 'duplicate' && <Typography color="error" fontSize={12}>Duplicate</Typography>}
                    {traitIssues['presence'] === 'unassigned' && <Typography sx={{ color: '#b59a00', fontSize: 12 }}>Unassigned</Typography>}
                </Box>
                {/* KNOWLEDGE */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography sx={{ minWidth: 90, fontWeight: 600, textAlign: 'right' }}>KNOWLEDGE:</Typography>
                    <FormControl size="small">
                        <Select
                            value={traitAssignment['knowledge'] !== null ? String(traitAssignment['knowledge']) : ''}
                            onChange={e => {
                                const val = e.target.value === '' ? '' : Number(e.target.value);
                                handleTraitChange('knowledge', val === '' ? '' : ([-1, 0, 1, 2].includes(val) ? (val as TraitValue) : ''));
                            }}
                            displayEmpty
                        >
                            <MenuItem value="">--</MenuItem>
                            {getAvailableValues('knowledge').map(val => (
                                <MenuItem key={val} value={String(val)}>{val >= 0 ? `+${val}` : val}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    {traitIssues['knowledge'] === 'duplicate' && <Typography color="error" fontSize={12}>Duplicate</Typography>}
                    {traitIssues['knowledge'] === 'unassigned' && <Typography sx={{ color: '#b59a00', fontSize: 12 }}>Unassigned</Typography>}
                </Box>
            </Stack>
        </form>
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
    </Paper>
);

export default TraitsSection; 