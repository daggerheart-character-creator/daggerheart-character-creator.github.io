import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import React from 'react';

interface ClassFeatureSectionProps {
    currentCharacter: any;
}

const ClassFeatureSection: React.FC<ClassFeatureSectionProps> = ({ currentCharacter }) => (
    <Paper elevation={2} sx={{ p: 2, mb: 2, width: '100%' }}>
        <Typography variant="h5" gutterBottom>CLASS FEATURE</Typography>
        <Typography>
            {/* Replace this with actual class feature content as needed */}
            {currentCharacter?.characterClass
                ? `Feature for class: ${currentCharacter.characterClass}`
                : 'No class selected.'}
        </Typography>
    </Paper>
);

export default ClassFeatureSection; 