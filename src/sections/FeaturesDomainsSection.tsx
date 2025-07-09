import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { CLASS_DETAILS } from '../constants/classDetails';
import { getAvailableDomainCards, type DomainCard } from '../constants/domainCards';
import type { DaggerheartCharacter } from '../types/characterTypes';

interface FeaturesDomainsSectionProps {
    currentCharacter: DaggerheartCharacter;
    updateCharacterField: (field: keyof DaggerheartCharacter, value: any) => void;
}

const FeaturesDomainsSection: React.FC<FeaturesDomainsSectionProps> = ({ currentCharacter, updateCharacterField }) => {
    const classDetail = currentCharacter?.characterClass ? CLASS_DETAILS[currentCharacter.characterClass] : null;
    const availableCards = getAvailableDomainCards(currentCharacter.characterClass, currentCharacter.level);
    const [selectedCardForDetails, setSelectedCardForDetails] = useState<string>('');

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
                        <Paper elevation={1} sx={{ p: 2, background: '#f8f9fa' }}>
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
                            <Typography variant="body2" sx={{ mb: 2 }}>
                                {selectedCardDetails.description}
                            </Typography>

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
                                    <Paper key={idx} elevation={1} sx={{ p: 1.5, background: '#e8f5e8' }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Box>
                                                <Typography variant="subtitle2" fontWeight={600}>
                                                    {card.name} (Level {card.level})
                                                </Typography>
                                                <Typography variant="caption" color="text.secondary">
                                                    {card.domain} • {card.type} • Recall Cost: {card.recallCost}
                                                </Typography>
                                            </Box>
                                            <Chip
                                                label="Remove"
                                                size="small"
                                                color="error"
                                                variant="outlined"
                                                onClick={() => handleCardSelection(card)}
                                                sx={{ cursor: 'pointer' }}
                                            />
                                        </Box>
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

export default FeaturesDomainsSection; 