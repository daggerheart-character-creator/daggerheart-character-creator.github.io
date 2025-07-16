import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useMediaQuery, useTheme } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useCharacter } from '../CharacterContext';
import { coreItems } from '../constants/items';
import type { InventoryItem } from '../types/characterTypes';

interface InventorySectionProps {
    // currentCharacter: DaggerheartCharacter; // Removed as per edit hint
    // updateCharacterField: (field: keyof DaggerheartCharacter, value: any) => void; // Removed as per edit hint
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

const InventorySection: React.FC<InventorySectionProps> = () => {
    const { currentCharacter, updateCharacterField } = useCharacter();
    const gold = parseGold(currentCharacter?.gold);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const handleGoldChange = (field: 'handfuls' | 'bags' | 'chests', value: string) => {
        const num = Math.max(0, parseInt(value.replace(/\D/g, '') || '0', 10));
        updateCharacterField('gold', { ...gold, [field]: num });
    };
    // Inventory migration: if inventory is a string, convert to array
    React.useEffect(() => {
        if (typeof currentCharacter.inventory === 'string') {
            const items = (currentCharacter.inventory as string)
                .split(',')
                .map((s: string) => s.trim())
                .filter((s: string) => Boolean(s))
                .map((name: string) => ({ name, source: 'custom' }));
            updateCharacterField('inventory', items);
        }
    }, [currentCharacter.inventory, updateCharacterField]);
    // Dialog state for add/edit
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [editIndex, setEditIndex] = React.useState<number | null>(null);
    const [itemDraft, setItemDraft] = React.useState<InventoryItem>({ name: '', source: 'custom', quantity: 1 });
    const [nameError, setNameError] = React.useState<string | null>(null);
    // Open add/edit dialog
    const openAddDialog = () => {
        setEditIndex(null);
        setItemDraft({ name: '', source: 'custom', quantity: 1 });
        setDialogOpen(true);
    };
    const openEditDialog = (item: InventoryItem, idx: number) => {
        setEditIndex(idx);
        setItemDraft(item);
        setDialogOpen(true);
    };
    // Save item (add or edit)
    const handleSaveItem = () => {
        if (!itemDraft.name || !itemDraft.name.trim()) {
            setNameError('Item name is required');
            return;
        }
        let newInventory = [...(currentCharacter.inventory as InventoryItem[])];
        if (editIndex !== null) {
            newInventory[editIndex] = itemDraft;
        } else {
            newInventory.push(itemDraft);
        }
        updateCharacterField('inventory', newInventory);
        setDialogOpen(false);
        setNameError(null);
    };
    // Remove item
    const handleRemoveItem = (idx: number) => {
        const newInventory = [...(currentCharacter.inventory as InventoryItem[])];
        newInventory.splice(idx, 1);
        updateCharacterField('inventory', newInventory);
    };
    // Inventory list rendering
    const inventoryList: InventoryItem[] = Array.isArray(currentCharacter.inventory)
        ? currentCharacter.inventory as InventoryItem[]
        : [];
    return (
        <Paper elevation={2} sx={{ p: 2, mb: 2, boxSizing: 'border-box' }}>
            <Typography variant="h5" gutterBottom>INVENTORY & NOTES</Typography>
            <Stack spacing={2}>
                {/* Gold controls (unchanged) */}
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
                {/* Inventory List */}
                <Stack spacing={1}>
                    {inventoryList.map((item, idx) => (
                        <Paper key={idx} sx={{ p: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                            <Box sx={{ flex: 1, minWidth: 0 }}>
                                <Typography fontWeight={600} sx={{ display: 'inline', mr: 1 }}>{item.name}</Typography>
                                {item.quantity && item.quantity > 1 && (
                                    <Chip label={`x${item.quantity}`} size="small" sx={{ ml: 0.5 }} />
                                )}
                                {item.notes && (
                                    <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>{item.notes}</Typography>
                                )}
                                {item.source && (
                                    <Chip label={item.source} size="small" sx={{ ml: 1 }} />
                                )}
                            </Box>
                            <Box>
                                <IconButton size="small" onClick={() => openEditDialog(item, idx)} aria-label="Edit item"><EditIcon fontSize="small" /></IconButton>
                                <IconButton size="small" onClick={() => handleRemoveItem(idx)} aria-label="Remove item"><DeleteIcon fontSize="small" /></IconButton>
                            </Box>
                        </Paper>
                    ))}
                </Stack>
                {/* Add Item Button */}
                <Button variant="contained" startIcon={<AddIcon />} onClick={openAddDialog} fullWidth={isMobile} sx={{ mt: 1 }}>
                    Add Item
                </Button>
                {/* Add/Edit Item Dialog */}
                <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullScreen={isMobile} maxWidth="xs" fullWidth>
                    <DialogTitle sx={{ fontWeight: 600, fontSize: '1.25rem' }}>{editIndex !== null ? 'Edit Item' : 'Add Item'}</DialogTitle>
                    <DialogContent sx={{ pt: 2 }}>
                        <Autocomplete
                            options={coreItems}
                            getOptionLabel={option => typeof option === 'string' ? option : option.name}
                            value={coreItems.find(i => i.name === itemDraft.name) || (itemDraft.name ? { name: itemDraft.name } : null)}
                            inputValue={itemDraft.name || ''}
                            onInputChange={(_, value) => {
                                setNameError(null);
                                setItemDraft(d => ({ ...d, name: value }));
                            }}
                            onChange={(_, value) => {
                                setNameError(null);
                                if (typeof value === 'string') {
                                    setItemDraft(d => ({ ...d, name: value, source: 'custom' }));
                                } else if (value) {
                                    setItemDraft(d => ({ ...d, ...value, source: value.source || 'core' }));
                                }
                            }}
                            freeSolo
                            renderInput={params => <TextField {...params} label="Item Name" fullWidth autoFocus variant="outlined" error={!!nameError} helperText={nameError || ''} sx={{ mt: 2 }} />}
                            sx={{ mb: 3 }}
                        />
                        <TextField
                            label="Quantity"
                            type="number"
                            value={itemDraft.quantity || 1}
                            onChange={e => setItemDraft(d => ({ ...d, quantity: Math.max(1, parseInt(e.target.value) || 1) }))}
                            fullWidth
                            variant="outlined"
                            sx={{ mb: 3 }}
                        />
                        <TextField
                            label="Notes"
                            value={itemDraft.notes || ''}
                            onChange={e => setItemDraft(d => ({ ...d, notes: e.target.value }))}
                            fullWidth
                            multiline
                            minRows={2}
                            variant="outlined"
                            sx={{ mb: 1 }}
                        />
                    </DialogContent>
                    <DialogActions sx={{ pr: 3, pb: 2, justifyContent: 'flex-end' }}>
                        <Button onClick={() => { setDialogOpen(false); setNameError(null); }} color="primary">Cancel</Button>
                        <Button onClick={handleSaveItem} variant="contained" color="primary" disabled={!itemDraft.name || !itemDraft.name.trim()}>{editIndex !== null ? 'Save' : 'Add'}</Button>
                    </DialogActions>
                </Dialog>
            </Stack>
        </Paper>
    );
};

export default InventorySection; 