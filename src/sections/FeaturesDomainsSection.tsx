import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React from 'react';
import { CLASS_DETAILS } from '../constants/classDetails';
import type { DaggerheartCharacter } from '../types/characterTypes';

interface FeaturesDomainsSectionProps {
    currentCharacter: DaggerheartCharacter;
    updateCharacterField: (field: keyof DaggerheartCharacter, value: any) => void;
}

const FeaturesDomainsSection: React.FC<FeaturesDomainsSectionProps> = ({ currentCharacter, updateCharacterField }) => {
    const classDetail = currentCharacter?.characterClass ? CLASS_DETAILS[currentCharacter.characterClass] : null;
    return (
        <Paper elevation={2} sx={{ p: 2, mb: 2, width: '100%' }}>
            <Typography variant="h5" gutterBottom>CLASS FEATURES</Typography>
            {classDetail ? (
                <div style={{ marginBottom: 16 }}>
                    <Typography variant="subtitle1" fontWeight={600}>{classDetail.classFeature.name}</Typography>
                    <Typography variant="body2">{classDetail.classFeature.description}</Typography>
                </div>
            ) : (
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>Select a class to view its features.</Typography>
            )}
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
};

export default FeaturesDomainsSection; 