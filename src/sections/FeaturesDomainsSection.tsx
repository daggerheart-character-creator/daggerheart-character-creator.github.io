import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import React from 'react';
import { CLASS_DETAILS } from '../constants/classDetails';
import type { DaggerheartCharacter } from '../types/characterTypes';

interface FeaturesSectionProps {
    currentCharacter: DaggerheartCharacter;
}

const FeaturesSection: React.FC<FeaturesSectionProps> = ({ currentCharacter }) => {
    const classDetail = currentCharacter?.characterClass ? CLASS_DETAILS[currentCharacter.characterClass] : null;

    return (
        <Paper elevation={2} sx={{ p: 2, mb: 2, width: '100%' }}>
            <Typography variant="h5" gutterBottom>CLASS FEATURES</Typography>
            {classDetail ? (
                <div style={{ marginBottom: 16 }}>
                    {classDetail.classFeatures.map((feature, idx) => (
                        <div key={idx} style={{ marginBottom: 12 }}>
                            <Typography variant="subtitle1" fontWeight={600}>{feature.name}</Typography>
                            <Typography variant="body2">{feature.description}</Typography>
                        </div>
                    ))}
                </div>
            ) : (
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>Select a class to view its features.</Typography>
            )}
        </Paper>
    );
};

export default FeaturesSection; 