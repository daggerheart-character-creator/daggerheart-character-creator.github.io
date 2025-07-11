import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useCharacter } from '../CharacterContext';
import { CLASS_DETAILS } from '../constants/classDetails';

interface FeaturesSectionProps {
    // currentCharacter: DaggerheartCharacter; // Removed as per edit hint
}

const FeaturesSection: React.FC<FeaturesSectionProps> = () => {
    const { currentCharacter } = useCharacter();
    const classDetail = currentCharacter?.characterClass ? CLASS_DETAILS[currentCharacter.characterClass] : null;

    return (
        <Paper elevation={2} sx={{ p: 2, mb: 2, boxSizing: 'border-box' }}>
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