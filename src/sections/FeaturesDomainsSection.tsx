import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React from 'react';
import type { DaggerheartCharacter } from '../types/characterTypes';

interface FeaturesDomainsSectionProps {
    currentCharacter: DaggerheartCharacter;
    updateCharacterField: (field: keyof DaggerheartCharacter, value: any) => void;
}

const FeaturesDomainsSection: React.FC<FeaturesDomainsSectionProps> = ({ currentCharacter, updateCharacterField }) => (
    <Paper elevation={2} sx={{ p: 2, mb: 2, width: '100%' }}>
        <Typography variant="h5" gutterBottom>CLASS FEATURES</Typography>
        <TextField
            label="Describe your class features here..."
            value={currentCharacter?.classFeatures}
            onChange={e => updateCharacterField('classFeatures', e.target.value)}
            fullWidth
            multiline
            minRows={4}
            sx={{ mb: 2 }}
        />
        <Typography variant="h5" gutterBottom>DOMAIN CARDS</Typography>
        <TextField
            label="List your domain cards and their features here..."
            value={currentCharacter?.domainCards}
            onChange={e => updateCharacterField('domainCards', e.target.value)}
            fullWidth
            multiline
            minRows={4}
        />
    </Paper>
);

export default FeaturesDomainsSection; 