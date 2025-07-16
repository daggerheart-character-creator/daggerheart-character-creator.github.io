import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Collapse from '@mui/material/Collapse';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { useCharacter } from '../CharacterContext';
import { getAvailableDomainCards, type DomainCard } from '../constants/domainCards';

interface DomainCardsSectionProps {
    // currentCharacter: DaggerheartCharacter; // Removed as per edit hint
    // updateCharacterField: (field: keyof DaggerheartCharacter, value: any) => void; // Removed as per edit hint
}

const DomainCardsSection: React.FC<DomainCardsSectionProps> = () => {
    const { currentCharacter, updateCharacterField } = useCharacter();
    const availableCards = getAvailableDomainCards(currentCharacter.characterClass, currentCharacter.level);
    const [selectedCardForDetails, setSelectedCardForDetails] = useState<string>('');
    const [expandedCards, setExpandedCards] = useState<{ [name: string]: boolean }>({});

    // Handle transition from old string format to new array format
    let selectedCards: DomainCard[] = [];
    if (Array.isArray(currentCharacter.domainCards)) {
        selectedCards = currentCharacter.domainCards;
    } else if (typeof currentCharacter.domainCards === 'string' && (currentCharacter.domainCards as string).trim() !== '') {
        // If it's a string, clear it and start fresh
        updateCharacterField('domainCards', []);
    }

    const handleCardSelection = (card: DomainCard) => {
        const isSelected = selectedCards.some(selected => selected.name === card.name);
        let newCards: DomainCard[];

        if (isSelected) {
            // Remove card
            newCards = selectedCards.filter(selected => selected.name !== card.name);
        } else {
            // Add card
            newCards = [...selectedCards, card];
        }

        updateCharacterField('domainCards', newCards);
    };

    const toggleExpandCard = (name: string) => {
        setExpandedCards(prev => ({ ...prev, [name]: !prev[name] }));
    };

    const getCardTypeColor = (type: string) => {
        switch (type) {
            case 'spell': return 'primary';
            case 'ability': return 'secondary';
            case 'grimoire': return 'success';
            default: return 'default';
        }
    };

    const selectedCardDetails = availableCards.find(card => card.name === selectedCardForDetails);

    return (
        <Paper elevation={2} sx={{ p: 2, mb: 2, boxSizing: 'border-box' }}>
            <Typography variant="h5" gutterBottom>DOMAIN CARDS</Typography>

            {!currentCharacter.characterClass ? (
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Select a class to view available domain cards.
                </Typography>
            ) : (
                <Stack spacing={2}>
                    <Typography variant="body2" color="text.secondary">
                        Available cards from your class domains (Level {currentCharacter.level} and below):
                    </Typography>

                    {/* Card Selection Dropdown */}
                    <FormControl fullWidth>
                        <InputLabel id="domain-card-select-label">Select a card to view details</InputLabel>
                        <Select
                            labelId="domain-card-select-label"
                            value={selectedCardForDetails}
                            label="Select a card to view details"
                            onChange={e => setSelectedCardForDetails(e.target.value)}
                        >
                            <MenuItem value=""><em>Choose a card...</em></MenuItem>
                            {availableCards.map(card => (
                                <MenuItem key={card.name} value={card.name}>
                                    {card.name} (Level {card.level} {card.domain})
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {/* Card Details */}
                    {selectedCardDetails && (
                        <Paper elevation={1} sx={{ p: 2 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                                <Typography variant="h6" fontWeight={600}>
                                    {selectedCardDetails.name}
                                </Typography>
                                <Chip
                                    label={selectedCardDetails.type}
                                    size="small"
                                    color={getCardTypeColor(selectedCardDetails.type)}
                                />
                            </Box>
                            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                                Level {selectedCardDetails.level} • {selectedCardDetails.domain} • Recall Cost: {selectedCardDetails.recallCost}
                            </Typography>
                            <Box sx={{ mb: 2 }}>
                                {Array.isArray(selectedCardDetails.description)
                                    ? (
                                        <ul style={{ margin: 0, paddingLeft: '1.2em' }}>
                                            {selectedCardDetails.description.map((desc, i) => (
                                                <li key={i}>
                                                    <Typography variant="body2">{desc}</Typography>
                                                </li>
                                            ))}
                                        </ul>
                                    )
                                    : <Typography variant="body2">{selectedCardDetails.description}</Typography>
                                }
                            </Box>
                            {selectedCards.some(selected => selected.name === selectedCardDetails.name) ? (
                                <Button
                                    variant="outlined"
                                    color="error"
                                    size="small"
                                    onClick={() => handleCardSelection(selectedCardDetails)}
                                >
                                    Remove from Loadout
                                </Button>
                            ) : (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    onClick={() => handleCardSelection(selectedCardDetails)}
                                >
                                    Add to Loadout
                                </Button>
                            )}
                        </Paper>
                    )}

                    {/* Selected Cards */}
                    {selectedCards.length > 0 && (
                        <Box>
                            <Typography variant="subtitle1" gutterBottom>
                                Selected Cards:
                            </Typography>
                            <Stack spacing={1}>
                                {selectedCards.map((card, idx) => (
                                    <Paper key={idx} elevation={1} sx={{ p: 1 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1 }}>
                                            <IconButton
                                                size="small"
                                                onClick={() => toggleExpandCard(card.name)}
                                                sx={{
                                                    width: '20px',
                                                    height: '20px',
                                                    p: '0 !important',
                                                    m: 0,
                                                    borderRadius: '0 !important',
                                                    background: 'none !important',
                                                    border: 'none !important',
                                                    minWidth: '0 !important',
                                                    minHeight: '0 !important',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    boxShadow: 'none',
                                                }}
                                                aria-label={expandedCards[card.name] ? 'Collapse' : 'Expand'}
                                            >
                                                <Box sx={{ fontSize: '1.1rem', lineHeight: 1 }}>
                                                    {expandedCards[card.name] ? '–' : '+'}
                                                </Box>
                                            </IconButton>
                                            <Typography variant="subtitle2" fontWeight={600} sx={{ flexGrow: 1, ml: 1, mr: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                {card.name} – {card.level}
                                            </Typography>
                                            <Chip
                                                label="Remove"
                                                size="small"
                                                color="error"
                                                variant="outlined"
                                                onClick={() => handleCardSelection(card)}
                                                sx={{ cursor: 'pointer', ml: 1 }}
                                            />
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5, mb: 0.5, gap: 1, flexWrap: 'wrap' }}>
                                            <Typography variant="caption" color="text.secondary" sx={{ mr: 1 }}>
                                                {card.domain} • {card.type} • Recall Cost: {card.recallCost}
                                            </Typography>
                                        </Box>
                                        <Collapse in={!!expandedCards[card.name]} timeout="auto" unmountOnExit>
                                            <Box sx={{ mt: 0.5 }}>
                                                {Array.isArray(card.description)
                                                    ? (
                                                        <ul style={{ margin: 0, paddingLeft: '1.2em' }}>
                                                            {card.description.map((desc, i) => (
                                                                <li key={i}>
                                                                    <Typography variant="body2">{desc}</Typography>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    )
                                                    : <Typography variant="body2">{card.description}</Typography>
                                                }
                                            </Box>
                                        </Collapse>
                                    </Paper>
                                ))}
                            </Stack>
                        </Box>
                    )}
                </Stack>
            )}
        </Paper>
    );
};

export default DomainCardsSection; 