import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React from 'react';
import type { DaggerheartCharacter } from '../CharacterSheet';

interface InventorySectionProps {
    currentCharacter: DaggerheartCharacter;
    updateCharacterField: (field: keyof DaggerheartCharacter, value: any) => void;
}

const InventorySection: React.FC<InventorySectionProps> = ({ currentCharacter, updateCharacterField }) => (
    <Paper elevation={2} sx={{ p: 2, mb: 2, width: '100%' }}>
        <Typography variant="h5" gutterBottom>INVENTORY & NOTES</Typography>
        <Stack spacing={2}>
            <TextField
                label="Gold (e.g., 5 Handfuls)"
                value={currentCharacter?.gold}
                onChange={e => updateCharacterField('gold', e.target.value)}
                fullWidth
            />
            <TextField
                label="List your inventory items and general notes here..."
                value={currentCharacter?.inventory}
                onChange={e => updateCharacterField('inventory', e.target.value)}
                fullWidth
                multiline
                minRows={4}
            />
        </Stack>
    </Paper>
);

export default InventorySection; 