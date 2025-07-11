import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { useCharacter } from '../CharacterContext';
import { CLASS_BACKGROUND_QUESTIONS_AND_CONNECTIONS } from '../constants/backgroundQuestions';

const CUSTOM_BG_PREFIX = '__custom_bg__:';
const CUSTOM_CONN_PREFIX = '__custom_conn__:';

const BackgroundSection: React.FC = () => {
    const { currentCharacter, updateCharacterField } = useCharacter();
    const classKey = currentCharacter.characterClass || '';
    const classData = CLASS_BACKGROUND_QUESTIONS_AND_CONNECTIONS[classKey];
    const backgroundAnswers = currentCharacter.background || {};
    const connectionAnswers = currentCharacter.connections || {};

    // State for new custom questions
    const [newCustomBg, setNewCustomBg] = useState('');
    const [newCustomConn, setNewCustomConn] = useState('');

    // Extract custom questions from answers
    const customBgQuestions = Object.keys(backgroundAnswers).filter(q => q.startsWith(CUSTOM_BG_PREFIX));
    const customConnQuestions = Object.keys(connectionAnswers).filter(q => q.startsWith(CUSTOM_CONN_PREFIX));

    const handleBackgroundChange = (question: string, value: string) => {
        updateCharacterField('background', { ...backgroundAnswers, [question]: value });
    };
    const handleConnectionChange = (question: string, value: string) => {
        updateCharacterField('connections', { ...connectionAnswers, [question]: value });
    };
    const handleAddCustomBg = () => {
        if (newCustomBg.trim()) {
            const key = CUSTOM_BG_PREFIX + newCustomBg.trim();
            updateCharacterField('background', { ...backgroundAnswers, [key]: '' });
            setNewCustomBg('');
        }
    };
    const handleAddCustomConn = () => {
        if (newCustomConn.trim()) {
            const key = CUSTOM_CONN_PREFIX + newCustomConn.trim();
            updateCharacterField('connections', { ...connectionAnswers, [key]: '' });
            setNewCustomConn('');
        }
    };
    const handleRemoveCustomBg = (key: string) => {
        const updated = { ...backgroundAnswers };
        delete updated[key];
        updateCharacterField('background', updated);
    };
    const handleRemoveCustomConn = (key: string) => {
        const updated = { ...connectionAnswers };
        delete updated[key];
        updateCharacterField('connections', updated);
    };

    if (!classData) {
        return (
            <Paper elevation={2} sx={{ p: 2, mb: 2, boxSizing: 'border-box' }}>
                <Typography variant="h5" gutterBottom>Background & Connections</Typography>
                <Typography variant="body1">No background questions or connections found for this class.</Typography>
            </Paper>
        );
    }

    return (
        <Paper elevation={2} sx={{ p: 2, mb: 2, boxSizing: 'border-box' }}>
            <Typography variant="h5" gutterBottom>Background & Connections</Typography>
            <Typography variant="subtitle1" sx={{ mb: 2 }}>
                BACKGROUND QUESTIONS<br />
                Answer any of the following background questions. You can also create your own questions.
            </Typography>
            <Stack spacing={3} sx={{ mb: 4 }}>
                {classData.questions.map((q) => (
                    <div key={q}>
                        <Typography variant="subtitle1" sx={{ mb: 1 }}>{q}</Typography>
                        <TextField
                            value={backgroundAnswers[q] || ''}
                            onChange={e => handleBackgroundChange(q, e.target.value)}
                            fullWidth
                            multiline
                            minRows={2}
                            variant="outlined"
                            placeholder="Your answer..."
                        />
                    </div>
                ))}
                {/* Custom background questions */}
                {customBgQuestions.map(key => (
                    <div key={key} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                        <TextField
                            label="Custom Background Question"
                            value={key.replace(CUSTOM_BG_PREFIX, '')}
                            disabled
                            sx={{ flex: 2 }}
                        />
                        <TextField
                            value={backgroundAnswers[key] || ''}
                            onChange={e => handleBackgroundChange(key, e.target.value)}
                            fullWidth
                            multiline
                            minRows={2}
                            variant="outlined"
                            placeholder="Your answer..."
                            sx={{ flex: 3 }}
                        />
                        <IconButton aria-label="Remove" onClick={() => handleRemoveCustomBg(key)} size="small" sx={{ mt: 1 }}>
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </div>
                ))}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <TextField
                        label="Add custom background question"
                        value={newCustomBg}
                        onChange={e => setNewCustomBg(e.target.value)}
                        fullWidth
                        variant="outlined"
                        onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleAddCustomBg(); } }}
                    />
                    <Button onClick={handleAddCustomBg} variant="contained" color="primary" sx={{ minWidth: 40, height: 40 }}>Add</Button>
                </div>
            </Stack>
            <Typography variant="subtitle1" sx={{ mb: 2 }}>
                CONNECTIONS<br />
                Ask your fellow players one of the following questions for their character to answer, or create your own questions.
            </Typography>
            <Stack spacing={3}>
                {classData.connections.map((q) => (
                    <div key={q}>
                        <Typography variant="subtitle1" sx={{ mb: 1 }}>{q}</Typography>
                        <TextField
                            value={connectionAnswers[q] || ''}
                            onChange={e => handleConnectionChange(q, e.target.value)}
                            fullWidth
                            multiline
                            minRows={2}
                            variant="outlined"
                            placeholder="Their answer..."
                        />
                    </div>
                ))}
                {/* Custom connection questions */}
                {customConnQuestions.map(key => (
                    <div key={key} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                        <TextField
                            label="Custom Connection Question"
                            value={key.replace(CUSTOM_CONN_PREFIX, '')}
                            disabled
                            sx={{ flex: 2 }}
                        />
                        <TextField
                            value={connectionAnswers[key] || ''}
                            onChange={e => handleConnectionChange(key, e.target.value)}
                            fullWidth
                            multiline
                            minRows={2}
                            variant="outlined"
                            placeholder="Their answer..."
                            sx={{ flex: 3 }}
                        />
                        <IconButton aria-label="Remove" onClick={() => handleRemoveCustomConn(key)} size="small" sx={{ mt: 1 }}>
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </div>
                ))}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <TextField
                        label="Add custom connection question"
                        value={newCustomConn}
                        onChange={e => setNewCustomConn(e.target.value)}
                        fullWidth
                        variant="outlined"
                        onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleAddCustomConn(); } }}
                    />
                    <Button onClick={handleAddCustomConn} variant="contained" color="primary" sx={{ minWidth: 40, height: 40 }}>Add</Button>
                </div>
            </Stack>
        </Paper>
    );
};

export default BackgroundSection; 