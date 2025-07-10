import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import React from 'react';
import type { DaggerheartCharacter } from '../types/characterTypes';

interface ExperiencesSectionProps {
    currentCharacter: DaggerheartCharacter;
    updateCharacterField: (field: keyof DaggerheartCharacter, value: any) => void;
}

const ExperiencesSection: React.FC<ExperiencesSectionProps> = ({ currentCharacter, updateCharacterField }) => {
    const experiences = currentCharacter?.experiences || [];

    const handleExperienceChange = (idx: number, field: 'text' | 'bonus', value: string | number) => {
        const updated = experiences.map((exp, i) =>
            i === idx ? { ...exp, [field]: field === 'bonus' ? Number(value) : value } : exp
        );
        updateCharacterField('experiences', updated);
    };

    const handleAddExperience = () => {
        updateCharacterField('experiences', [...experiences, { text: '', bonus: 2 }]);
    };

    const handleRemoveExperience = (idx: number) => {
        const updated = experiences.filter((_, i) => i !== idx);
        updateCharacterField('experiences', updated);
    };

    return (
        <Paper elevation={2} sx={{ p: 2, mb: 2, boxSizing: 'border-box' }}>
            <Typography variant="h5" gutterBottom>EXPERIENCES</Typography>
            {experiences.map((exp, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
                    <input
                        type="text"
                        placeholder={`Experience ${idx + 1}`}
                        value={exp.text}
                        onChange={e => handleExperienceChange(idx, 'text', e.target.value)}
                        style={{ flex: 1, marginRight: 8, background: 'inherit', color: 'inherit', border: '1px solid #ccc', borderRadius: 4, height: 32 }}
                    />
                    <Button
                        onClick={() => handleExperienceChange(idx, 'bonus', Math.max(0, exp.bonus - 1))}
                        aria-label="Decrease bonus"
                        size="small"
                        variant="outlined"
                        sx={{ minWidth: 28, width: 28, height: 28, p: 0, mx: 0.5 }}
                    >
                        -
                    </Button>
                    <Typography
                        variant="body1"
                    >
                        {exp.bonus}
                    </Typography>
                    <Button
                        onClick={() => handleExperienceChange(idx, 'bonus', exp.bonus + 1)}
                        aria-label="Increase bonus"
                        size="small"
                        variant="outlined"
                        sx={{ minWidth: 28, width: 28, height: 28, p: 0, mx: 0.5 }}
                    >
                        +
                    </Button>
                    <IconButton onClick={() => handleRemoveExperience(idx)} aria-label="Delete experience" size="small">
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                </div>
            ))}
            <IconButton onClick={handleAddExperience} aria-label="Add experience" size="small" color="primary">
                <AddIcon />
            </IconButton>
        </Paper>
    );
};

export default ExperiencesSection; 