import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useCharacter } from '../CharacterContext';

const ClassFeatureSection: React.FC = () => {
    const { currentCharacter } = useCharacter();

    return (
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
};

export default ClassFeatureSection; 