import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React from 'react';
import type { DaggerheartCharacter } from '../types/characterTypes';

interface InventorySectionProps {
    currentCharacter: DaggerheartCharacter;
    updateCharacterField: (field: keyof DaggerheartCharacter, value: any) => void;
}

const parseGold = (gold: any) => {
    if (typeof gold === 'object' && gold !== null) {
        return {
            handfuls: gold.handfuls ?? 0,
            bags: gold.bags ?? 0,
            chests: gold.chests ?? 0,
        };
    }
    // fallback for legacy string value
    const match = /(?:(\d+)\s*Handfuls?)?\s*(?:(\d+)\s*Bags?)?\s*(?:(\d+)\s*Chests?)?/i.exec(gold || '');
    return {
        handfuls: parseInt(match?.[1] || '0', 10),
        bags: parseInt(match?.[2] || '0', 10),
        chests: parseInt(match?.[3] || '0', 10),
    };
};

const InventorySection: React.FC<InventorySectionProps> = ({ currentCharacter, updateCharacterField }) => {
    const gold = parseGold(currentCharacter?.gold);
    const handleGoldChange = (field: 'handfuls' | 'bags' | 'chests', value: string) => {
        const num = Math.max(0, parseInt(value.replace(/\D/g, '') || '0', 10));
        updateCharacterField('gold', { ...gold, [field]: num });
    };
    return (
        <Paper elevation={2} sx={{ p: 2, mb: 2, boxSizing: 'border-box' }}>
            <Typography variant="h5" gutterBottom>INVENTORY & NOTES</Typography>
            <Stack spacing={2}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
                    {/* Handfuls */}
                    <Stack alignItems="center" spacing={0.5} sx={{ minWidth: 100 }}>
                        <Typography align="center" fontWeight={600}>Handfuls</Typography>
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <Button size="small" variant="outlined" sx={{ minWidth: 28, width: 28, height: 28, p: 0 }} onClick={() => handleGoldChange('handfuls', String(Math.max(0, gold.handfuls - 1)))}>-</Button>
                            <Typography sx={{ minWidth: 32, textAlign: 'center', fontWeight: 600 }}>{gold.handfuls}</Typography>
                            <Button size="small" variant="outlined" sx={{ minWidth: 28, width: 28, height: 28, p: 0 }} onClick={() => handleGoldChange('handfuls', String(gold.handfuls + 1))}>+</Button>
                        </Stack>
                    </Stack>
                    {/* Bags */}
                    <Stack alignItems="center" spacing={0.5} sx={{ minWidth: 100 }}>
                        <Typography align="center" fontWeight={600}>Bags</Typography>
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <Button size="small" variant="outlined" sx={{ minWidth: 28, width: 28, height: 28, p: 0 }} onClick={() => handleGoldChange('bags', String(Math.max(0, gold.bags - 1)))}>-</Button>
                            <Typography sx={{ minWidth: 32, textAlign: 'center', fontWeight: 600 }}>{gold.bags}</Typography>
                            <Button size="small" variant="outlined" sx={{ minWidth: 28, width: 28, height: 28, p: 0 }} onClick={() => handleGoldChange('bags', String(gold.bags + 1))}>+</Button>
                        </Stack>
                    </Stack>
                    {/* Chests */}
                    <Stack alignItems="center" spacing={0.5} sx={{ minWidth: 100 }}>
                        <Typography align="center" fontWeight={600}>Chests</Typography>
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <Button size="small" variant="outlined" sx={{ minWidth: 28, width: 28, height: 28, p: 0 }} onClick={() => handleGoldChange('chests', String(Math.max(0, gold.chests - 1)))}>-</Button>
                            <Typography sx={{ minWidth: 32, textAlign: 'center', fontWeight: 600 }}>{gold.chests}</Typography>
                            <Button size="small" variant="outlined" sx={{ minWidth: 28, width: 28, height: 28, p: 0 }} onClick={() => handleGoldChange('chests', String(gold.chests + 1))}>+</Button>
                        </Stack>
                    </Stack>
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                        10 Handfuls = 1 Bag, 10 Bags = 1 Chest
                    </Typography>
                </Stack>
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
};

export default InventorySection; 