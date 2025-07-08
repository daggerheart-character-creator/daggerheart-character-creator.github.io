import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React from 'react';

interface HealthSectionProps {
    currentCharacter: any;
    calculateThreshold: (base: number) => number;
    toggleCircles: (resourceType: 'hp' | 'stress' | 'hope' | 'proficiency', index: number) => void;
}

const HealthSection: React.FC<HealthSectionProps> = ({ currentCharacter, calculateThreshold, toggleCircles }) => (
    <Paper elevation={2} sx={{ p: 2, mb: 2, width: '100%' }}>
        <Typography variant="h5" gutterBottom>DAMAGE & HEALTH</Typography>
        <Box className="thresholds" sx={{ mb: 2 }}>
            <Typography variant="subtitle1">DAMAGE THRESHOLDS (Add your level)</Typography>
            <Typography>MINOR: {calculateThreshold(10)} (Mark 1 HP)</Typography>
            <Typography>MAJOR: {calculateThreshold(15)} (Mark 2 HP)</Typography>
            <Typography>SEVERE: {calculateThreshold(20)} (Mark 3 HP)</Typography>
        </Box>
        <Box className="resource-tracker">
            <Typography fontWeight={600}>HP:</Typography>
            <Stack direction="row" spacing={1} mb={2}>
                {currentCharacter?.hp.map((filled: boolean, index: number) => (
                    <Box
                        key={index}
                        className={`circle${filled ? ' filled' : ''}`}
                        onClick={() => toggleCircles('hp', index)}
                        sx={{ width: 24, height: 24, borderRadius: '50%', border: '2px solid #3498db', backgroundColor: filled ? '#3498db' : '#fff', cursor: 'pointer' }}
                    />
                ))}
            </Stack>
            <Typography fontWeight={600}>STRESS:</Typography>
            <Stack direction="row" spacing={1} mb={2}>
                {currentCharacter?.stress.map((filled: boolean, index: number) => (
                    <Box
                        key={index}
                        className={`circle${filled ? ' filled' : ''}`}
                        onClick={() => toggleCircles('stress', index)}
                        sx={{ width: 24, height: 24, borderRadius: '50%', border: '2px solid #3498db', backgroundColor: filled ? '#3498db' : '#fff', cursor: 'pointer' }}
                    />
                ))}
            </Stack>
            <Typography fontWeight={600}>HOPE:</Typography>
            <Stack direction="row" spacing={1} mb={2}>
                {currentCharacter?.hope.map((filled: boolean, index: number) => (
                    <Box
                        key={index}
                        className={`circle${filled ? ' filled' : ''}`}
                        onClick={() => toggleCircles('hope', index)}
                        sx={{ width: 24, height: 24, borderRadius: '50%', border: '2px solid #3498db', backgroundColor: filled ? '#3498db' : '#fff', cursor: 'pointer' }}
                    />
                ))}
            </Stack>
            <Typography variant="body2" color="text.secondary" mb={2}>*Spend a Hope to use an experience or help an ally.</Typography>
            <Typography fontWeight={600}>PROFICIENCY:</Typography>
            <Stack direction="row" spacing={1} mb={2}>
                {currentCharacter?.proficiency.map((filled: boolean, index: number) => (
                    <Box
                        key={index}
                        className={`circle${filled ? ' filled' : ''}`}
                        onClick={() => toggleCircles('proficiency', index)}
                        sx={{ width: 24, height: 24, borderRadius: '50%', border: '2px solid #27ae60', backgroundColor: filled ? '#27ae60' : '#fff', cursor: 'pointer' }}
                    />
                ))}
            </Stack>
        </Box>
    </Paper>
);

export default HealthSection; 