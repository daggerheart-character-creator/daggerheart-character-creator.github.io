import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React from 'react';
import type { DaggerheartCharacter } from '../CharacterSheet';

interface ExperiencesSectionProps {
    currentCharacter: DaggerheartCharacter;
    updateCharacterField: (field: keyof DaggerheartCharacter, value: any) => void;
}

const ExperiencesSection: React.FC<ExperiencesSectionProps> = ({ currentCharacter, updateCharacterField }) => (
    <Paper elevation={2} sx={{ p: 2, mb: 2, width: '100%' }}>
        <Typography variant="h5" gutterBottom>EXPERIENCES</Typography>
        <TextField
            label="List your experiences here, one per line..."
            value={currentCharacter?.experiences}
            onChange={e => updateCharacterField('experiences', e.target.value)}
            fullWidth
            multiline
            minRows={6}
        />
    </Paper>
);

export default ExperiencesSection; 