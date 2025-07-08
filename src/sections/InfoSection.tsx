import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React from 'react';
import type { DaggerheartCharacter } from '../CharacterSheet';

interface InfoSectionProps {
    currentCharacter: DaggerheartCharacter;
    updateCharacterField: (field: keyof DaggerheartCharacter, value: any) => void;
    subclassOptions: string[];
    handleApplySuggestions: () => void;
    CLASS_OPTIONS: readonly string[];
    CLASS_SUGGESTIONS: any;
    ANCESTRY_OPTIONS: readonly string[];
    COMMUNITY_OPTIONS: readonly string[];
}

const InfoSection: React.FC<InfoSectionProps> = ({
    currentCharacter,
    updateCharacterField,
    subclassOptions,
    handleApplySuggestions,
    CLASS_OPTIONS,
    CLASS_SUGGESTIONS,
    ANCESTRY_OPTIONS,
    COMMUNITY_OPTIONS,
}) => (
    <Paper elevation={2} sx={{ p: 2, mb: 2, width: '100%' }}>
        <Typography variant="h5" gutterBottom>BASIC INFO</Typography>
        <Stack spacing={2}>
            <TextField
                label="Name"
                value={currentCharacter.name}
                onChange={e => updateCharacterField('name', e.target.value)}
                fullWidth
                variant="outlined"
            />
            <TextField
                label="Pronouns"
                value={currentCharacter.pronouns}
                onChange={e => updateCharacterField('pronouns', e.target.value)}
                fullWidth
                variant="outlined"
            />
            <FormControl fullWidth>
                <InputLabel id="class-select-label">Class</InputLabel>
                <Select
                    labelId="class-select-label"
                    value={currentCharacter.characterClass}
                    label="Class"
                    onChange={e => updateCharacterField('characterClass', e.target.value)}
                >
                    <MenuItem value=""><em>Select a class...</em></MenuItem>
                    {CLASS_OPTIONS.map(cls => (
                        <MenuItem key={cls} value={cls}>{cls}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl fullWidth disabled={!currentCharacter.characterClass}>
                <InputLabel id="subclass-select-label">Subclass</InputLabel>
                <Select
                    labelId="subclass-select-label"
                    value={currentCharacter.subclass}
                    label="Subclass"
                    onChange={e => updateCharacterField('subclass', e.target.value)}
                >
                    <MenuItem value=""><em>Select a subclass...</em></MenuItem>
                    {subclassOptions.map(sub => (
                        <MenuItem key={sub} value={sub}>{sub}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl fullWidth>
                <InputLabel id="ancestry-select-label">Ancestry</InputLabel>
                <Select
                    labelId="ancestry-select-label"
                    value={currentCharacter.heritage}
                    label="Ancestry"
                    onChange={e => updateCharacterField('heritage', e.target.value)}
                >
                    <MenuItem value=""><em>Select an ancestry...</em></MenuItem>
                    {ANCESTRY_OPTIONS.map(anc => (
                        <MenuItem key={anc} value={anc}>{anc}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl fullWidth>
                <InputLabel id="community-select-label">Community</InputLabel>
                <Select
                    labelId="community-select-label"
                    value={currentCharacter.community || ''}
                    label="Community"
                    onChange={e => updateCharacterField('community', e.target.value)}
                >
                    <MenuItem value=""><em>Select a community...</em></MenuItem>
                    {COMMUNITY_OPTIONS.map(com => (
                        <MenuItem key={com} value={com}>{com}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <TextField
                label="Level"
                type="number"
                value={currentCharacter.level}
                onChange={e => updateCharacterField('level', parseInt(e.target.value) || 0)}
                fullWidth
                variant="outlined"
                inputProps={{ min: 0 }}
            />
        </Stack>
    </Paper>
);

export default InfoSection; 