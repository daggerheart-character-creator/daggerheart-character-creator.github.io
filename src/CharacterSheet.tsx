import AddIcon from '@mui/icons-material/Add';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FaBook, FaBoxOpen, FaDiceD20, FaHeartbeat, FaShieldAlt, FaStar, FaUser } from 'react-icons/fa';
import { useCharacter } from './CharacterContext';
import './CharacterSheet.css';
import { ARMOR_OPTIONS } from './constants/armor';
import type { CharacterClass } from './constants/characterOptions';
import {
    ANCESTRY_OPTIONS,
    CLASS_OPTIONS,
    CLASS_SUGGESTIONS,
    COMMUNITY_OPTIONS,
    SECTIONS,
    SUBCLASS_OPTIONS
} from './constants/characterOptions.tsx';
import { CLASS_DETAILS } from './constants/classDetails';
import { MAGIC_WEAPONS, PRIMARY_WEAPONS, SECONDARY_WEAPONS } from './constants/weapons';
import MainContent from './MainContent';
import DiceTab from './sections/DiceTab';
import type { DaggerheartCharacter } from './types/characterTypes';
import type { TraitName, TraitValue } from './types/traits.ts';
import { TRAIT_VALUES } from './types/traits.ts';

const PLAY_TABS = [
    { key: 'resources', label: 'Resources', icon: <FaHeartbeat /> },
    { key: 'traits', label: 'Traits', icon: <FaUser /> },
    { key: 'weapons', label: 'Weapons', icon: <FaShieldAlt /> },
    { key: 'features', label: 'Features', icon: <FaStar /> },
    { key: 'inventory', label: 'Inventory', icon: <FaBoxOpen /> },
    { key: 'quickref', label: 'Quick Ref', icon: <FaBook /> },
    { key: 'dice', label: 'Dice', icon: <FaDiceD20 /> }, // New Dice tab
];

const CharacterSheet: React.FC = () => {
    const { characters, currentCharacter, currentCharacterId, setCurrentCharacterId, addCharacter, deleteCharacter, updateCharacterField } = useCharacter();
    const [creationError, setCreationError] = useState<string | null>(null);
    const [activeSection, setActiveSection] = useState('info');
    const [playTab, setPlayTab] = useState('resources');

    const calculateThreshold = useCallback((base: number) => {
        return currentCharacter ? base + currentCharacter.level : base;
    }, [currentCharacter]);

    // Track last selected class to detect changes
    const [lastClass, setLastClass] = useState<CharacterClass | ''>('');

    // When class changes, offer to apply suggestions
    useEffect(() => {
        if (
            currentCharacter &&
            currentCharacter.characterClass &&
            currentCharacter.characterClass !== lastClass &&
            CLASS_SUGGESTIONS[currentCharacter.characterClass as CharacterClass]
        ) {
            setLastClass(currentCharacter.characterClass as CharacterClass);
        }
    }, [currentCharacter, lastClass]);

    // In CharacterSheet.tsx, update the effect that runs when class changes to also set traits
    React.useEffect(() => {
        if (!currentCharacter) return;
        const className = currentCharacter.characterClass;
        if (!className || !CLASS_DETAILS[className]) {
            // If no class, set HP to empty
            if (currentCharacter.hp.length !== 0) {
                updateCharacterField('hp', []);
            }
            // If no class, clear weapon and armor
            updateCharacterField('activeWeapons', [
                { name: '', traitRange: '', damageDiceType: '', feature: '' },
                { name: '', traitRange: '', damageDiceType: '', feature: '' }
            ]);
            updateCharacterField('activeArmor', [
                { name: '', feature: '' }
            ]);
            return;
        }
        const startingHP = CLASS_DETAILS[className].startingHP;
        if (currentCharacter.hp.length !== startingHP) {
            updateCharacterField('hp', Array(startingHP).fill(false));
        }
        // Set default weapon
        const suggestion = CLASS_SUGGESTIONS[className as CharacterClass];
        if (suggestion && suggestion.weapon) {
            // Extract weapon name (before ' - ')
            const weaponName = suggestion.weapon.split(' - ')[0].trim();
            // Try to find in all weapon lists
            const allWeapons = [...PRIMARY_WEAPONS, ...MAGIC_WEAPONS, ...SECONDARY_WEAPONS];
            const weaponObj = allWeapons.find(w => w.name === weaponName);
            if (weaponObj) {
                updateCharacterField('activeWeapons', [weaponObj, { name: '', traitRange: '', damageDiceType: '', feature: '' }]);
            }
        }
        // Set default armor (by class)
        let defaultArmor = 'Gambeson Armor';
        if (className === 'Guardian' || className === 'Warrior') defaultArmor = 'Chainmail Armor';
        if (className === 'Wizard' || className === 'Sorcerer') defaultArmor = 'Gambeson Armor';
        if (className === 'Rogue') defaultArmor = 'Leather Armor';
        if (className === 'Seraph') defaultArmor = 'Chainmail Armor';
        // You can add more class-specific logic here if needed
        const armorObj = ARMOR_OPTIONS.find(a => a.name === defaultArmor);
        if (armorObj) {
            updateCharacterField('activeArmor', [{ name: armorObj.name, feature: armorObj.feature }]);
        }
        // Set recommended traits
        if (suggestion && suggestion.traits) {
            Object.entries(suggestion.traits).forEach(([trait, value]) => {
                updateCharacterField(trait as keyof DaggerheartCharacter, value);
            });
        }
    }, [currentCharacter?.characterClass]);

    // Trait assignment state, initialized from currentCharacter
    const [traitAssignment, setTraitAssignment] = useState<Record<TraitName, TraitValue | null>>({
        agility: null,
        strength: null,
        finesse: null,
        instinct: null,
        presence: null,
        knowledge: null,
    });

    // Sync traitAssignment from currentCharacter when it changes
    React.useEffect(() => {
        if (currentCharacter) {
            setTraitAssignment({
                agility: (currentCharacter.agility ?? null) as TraitValue | null,
                strength: (currentCharacter.strength ?? null) as TraitValue | null,
                finesse: (currentCharacter.finesse ?? null) as TraitValue | null,
                instinct: (currentCharacter.instinct ?? null) as TraitValue | null,
                presence: (currentCharacter.presence ?? null) as TraitValue | null,
                knowledge: (currentCharacter.knowledge ?? null) as TraitValue | null,
            });
        }
    }, [currentCharacter]);

    // Compute remaining values
    const remainingTraitValues = useMemo(() => {
        const assigned = Object.values(traitAssignment).filter((v): v is TraitValue => v !== null);
        const counts: Record<TraitValue, number> = { '-1': 0, 0: 0, 1: 0, 2: 0 };
        assigned.forEach(v => { counts[v] = (counts[v] || 0) + 1; });
        const allCounts: Record<TraitValue, number> = { '-1': 1, 0: 2, 1: 2, 2: 1 };
        const remaining: TraitValue[] = [];
        (TRAIT_VALUES as readonly TraitValue[]).forEach(val => {
            for (let i = 0; i < (allCounts[val] - (counts[val] || 0)); i++) {
                remaining.push(val);
            }
        });
        return remaining;
    }, [traitAssignment]);

    // For each trait, get available values (not already assigned elsewhere, except for this trait's current value)
    const getAvailableValues = (trait: TraitName): TraitValue[] => {
        // Count how many times each value is used, including the current trait
        const allCounts: Record<TraitValue, number> = { '-1': 1, 0: 2, 1: 2, 2: 1 };
        const usedCounts: Record<TraitValue, number> = { '-1': 0, 0: 0, 1: 0, 2: 0 };
        Object.entries(traitAssignment).forEach(([t, v]) => {
            if (v !== null && t !== trait) {
                usedCounts[v as TraitValue] = (usedCounts[v as TraitValue] || 0) + 1;
            }
        });
        const current = traitAssignment[trait];
        // Only show values that have not been fully used elsewhere, or the current value for this trait
        return (TRAIT_VALUES as readonly TraitValue[]).filter(val => {
            if (current === val) return true;
            return usedCounts[val] < allCounts[val];
        });
    };

    // Validate trait assignment
    const isValidTraitAssignment = useMemo(() => {
        const values = Object.values(traitAssignment);
        if (values.some(v => v === null)) return false;
        const sorted = (values as TraitValue[]).slice().sort((a, b) => a - b);
        return JSON.stringify(sorted) === JSON.stringify([...TRAIT_VALUES].sort((a, b) => a - b));
    }, [traitAssignment]);

    // Highlight traits with duplicate or unassigned values
    const traitIssues = useMemo(() => {
        const issues: Record<TraitName, 'duplicate' | 'unassigned' | null> = {
            agility: null, strength: null, finesse: null, instinct: null, presence: null, knowledge: null
        };
        const valueCounts: Record<string, number> = {};
        Object.values(traitAssignment).forEach(v => {
            if (v !== null) valueCounts[v] = (valueCounts[v] || 0) + 1;
        });
        (Object.entries(traitAssignment) as [TraitName, TraitValue | null][]).forEach(([trait, value]) => {
            if (value === null) issues[trait] = 'unassigned';
            else if (valueCounts[value] > (value === 0 || value === 1 ? 2 : 1)) issues[trait] = 'duplicate';
        });
        return issues;
    }, [traitAssignment]);

    // Handler for trait value change
    const handleTraitChange = (trait: TraitName, value: TraitValue | '') => {
        setTraitAssignment(prev => ({ ...prev, [trait]: value === '' ? null : value }));
        if (value !== '') {
            updateCharacterField(trait, value);
        }
    };

    // No longer need applyTraitAssignment

    // Reset trait assignment
    const resetTraitAssignment = () => {
        setTraitAssignment({
            agility: null,
            strength: null,
            finesse: null,
            instinct: null,
            presence: null,
            knowledge: null,
        });
    };

    // Tooltip/help
    const [showTraitHelp, setShowTraitHelp] = useState(false);

    // Helper for subclass options
    const subclassOptions = currentCharacter?.characterClass && SUBCLASS_OPTIONS[currentCharacter.characterClass as CharacterClass] || [];

    // Validation for required fields
    const validateCreation = () => {
        if (!currentCharacter?.name.trim()) return 'Name is required.';
        if (!currentCharacter?.characterClass) return 'Class is required.';
        if (!currentCharacter?.heritage) return 'Ancestry is required.';
        if (!currentCharacter?.community) return 'Community is required.';
        if (!isValidTraitAssignment) return 'Traits must be assigned correctly.';
        // Add more validation as needed
        return null;
    };

    const handleCompleteCharacter = () => {
        const error = validateCreation();
        if (error) {
            setCreationError(error);
            return;
        }
        setCreationError(null);
        updateCharacterField('completed', true);
    };

    // Determine mode based on completion
    const isCompleted = !!currentCharacter?.completed;
    const mode = isCompleted ? 'play' : 'creation';

    // Determine which section to show based on mode
    const currentSection = mode === 'play' ? playTab : activeSection;

    if (!currentCharacter) {
        return <div className="character-sheet-container">Loading character...</div>;
    }

    // Menu anchor state for dropdown
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const characterMenuOpen = Boolean(anchorEl);
    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className="character-sheet-container">
            {/* Persistent Character Switcher Bar */}
            <Box sx={{ position: 'sticky', top: 0, left: 0, right: 0, zIndex: 1300, background: '#23272a', borderBottom: '1px solid #333', display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2, py: 1, minHeight: 56 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1 }}>
                    <button
                        onClick={handleMenuClick}
                        style={{ background: 'none', border: 'none', color: '#f3f3f3', fontSize: 18, display: 'flex', alignItems: 'center', cursor: 'pointer', padding: 0 }}
                        aria-label="Switch character"
                    >
                        <span style={{ fontWeight: 700, fontSize: 18, marginRight: 6 }}>
                            {currentCharacter?.name || 'Unnamed Character'}
                        </span>
                        <span style={{ fontWeight: 400, fontSize: 15, marginRight: 4, color: '#aaa' }}>
                            {currentCharacter?.characterClass ? `(${currentCharacter.characterClass})` : ''}
                        </span>
                        <ArrowDropDownIcon style={{ color: '#f3f3f3' }} />
                    </button>
                    <Menu anchorEl={anchorEl} open={characterMenuOpen} onClose={handleMenuClose}>
                        {characters.map(char => (
                            <MenuItem key={char.id} selected={char.id === currentCharacterId} onClick={() => { setCurrentCharacterId(char.id); handleMenuClose(); }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', minWidth: 200 }}>
                                <span>
                                    {char.name || 'Unnamed Character'} {char.characterClass ? `(${char.characterClass})` : ''}
                                </span>
                                {char.id !== currentCharacterId && (
                                    <button
                                        onClick={e => { e.stopPropagation(); deleteCharacter(char.id); }}
                                        style={{ background: 'none', border: 'none', color: '#f44336', marginLeft: 8, cursor: 'pointer', padding: 0 }}
                                        aria-label="Delete character"
                                    >
                                        <DeleteIcon fontSize="small" />
                                    </button>
                                )}
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>
                <Box sx={{ flex: 'none', ml: 2 }}>
                    <button
                        onClick={addCharacter}
                        style={{ background: 'none', border: 'none', color: '#4CAF50', fontSize: 22, display: 'flex', alignItems: 'center', cursor: 'pointer', padding: 0 }}
                        aria-label="Create new character"
                    >
                        <AddIcon style={{ color: '#4CAF50', fontSize: 28 }} />
                    </button>
                </Box>
            </Box>
            <Box sx={{ pt: mode === 'play' ? 8 : 0 }}>
                <h1 style={{ textAlign: 'center', marginTop: 0 }}>Daggerheart Character Sheet</h1>
                <MainContent
                    activeSection={currentSection}
                    currentCharacter={currentCharacter}
                    updateCharacterField={updateCharacterField}
                    subclassOptions={subclassOptions}
                    CLASS_OPTIONS={CLASS_OPTIONS}
                    ANCESTRY_OPTIONS={ANCESTRY_OPTIONS}
                    COMMUNITY_OPTIONS={COMMUNITY_OPTIONS}
                    traitAssignment={traitAssignment}
                    traitIssues={traitIssues}
                    remainingTraitValues={remainingTraitValues}
                    getAvailableValues={getAvailableValues}
                    handleTraitChange={handleTraitChange}
                    resetTraitAssignment={resetTraitAssignment}
                    showTraitHelp={showTraitHelp}
                    setShowTraitHelp={setShowTraitHelp}
                    calculateThreshold={calculateThreshold}
                />
                {/* Dice tab content */}
                {mode === 'play' && playTab === 'dice' && (
                    <DiceTab />
                )}
                <div className="complete-character-btn-container" style={{ marginTop: 24, textAlign: 'center' }}>
                    {mode === 'creation' && (
                        <button onClick={handleCompleteCharacter} style={{ fontSize: 18, padding: '8px 24px' }}>
                            Complete Character
                        </button>
                    )}
                    {creationError && <div style={{ color: 'red', marginTop: 8 }}>{creationError}</div>}
                </div>
                {/* Creation mode bottom nav */}
                <Box className="mobile-nav" sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1200, background: '#23272a', borderTop: '1px solid #333', display: 'flex', justifyContent: 'space-around', alignItems: 'center', height: 64 }}>
                    {SECTIONS.map(section => (
                        <button
                            key={section.key}
                            className={activeSection === section.key ? 'active' : ''}
                            onClick={() => setActiveSection(section.key)}
                            aria-label={section.label}
                            style={{ flex: 1, background: 'none', border: 'none', color: activeSection === section.key ? '#4CAF50' : '#f3f3f3', fontSize: 18, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}
                        >
                            {section.icon}
                            <span className="nav-label" style={{ fontSize: 12 }}>{section.label}</span>
                        </button>
                    ))}
                </Box>
            </Box>
            {/* Bottom Tab Bar for Play Mode */}
            {mode === 'play' && (
                <Box className="mobile-nav" sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1200, background: '#23272a', borderTop: '1px solid #333', display: 'flex', justifyContent: 'space-around', alignItems: 'center', height: 64 }}>
                    {PLAY_TABS.map(tab => (
                        <button
                            key={tab.key}
                            className={playTab === tab.key ? 'active' : ''}
                            onClick={() => setPlayTab(tab.key)}
                            aria-label={tab.label}
                            style={{ flex: 1, background: 'none', border: 'none', color: playTab === tab.key ? '#4CAF50' : '#f3f3f3', fontSize: 18, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}
                        >
                            {tab.icon}
                            <span className="nav-label" style={{ fontSize: 12 }}>{tab.label}</span>
                        </button>
                    ))}
                </Box>
            )}
        </div>
    );
};

export default CharacterSheet; 