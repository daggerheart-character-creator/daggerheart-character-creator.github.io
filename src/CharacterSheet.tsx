import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FaBook, FaBoxOpen, FaDna, FaHeartbeat, FaMusic, FaShieldAlt, FaStar, FaUser } from 'react-icons/fa';
import './CharacterSheet.css';
import ExperiencesSection from './sections/ExperiencesSection';
import FeaturesDomainsSection from './sections/FeaturesDomainsSection';
import HealthSection from './sections/HealthSection';
import InfoSection from './sections/InfoSection';
import InventorySection from './sections/InventorySection';
import TraitsSection from './sections/TraitsSection';
import WeaponsArmorSection from './sections/WeaponsArmorSection';

// TypeScript types for character state
export interface Weapon {
    name: string;
    traitRange: string;
    damageDiceType: string;
    feature: string;
}

export interface Armor {
    name: string;
    feature: string;
}

export interface TraitUpgrades {
    agility: boolean;
    strength: boolean;
    finesse: boolean;
    instinct: boolean;
    presence: boolean;
    knowledge: boolean;
}

export interface DaggerheartCharacter {
    id: string;
    name: string;
    pronouns: string;
    characterClass: string;
    heritage: string;
    community: string;
    subclass: string;
    level: number;
    hp: boolean[];
    stress: boolean[];
    hope: boolean[];
    proficiency: boolean[];
    agility: number;
    strength: number;
    finesse: number;
    instinct: number;
    presence: number;
    knowledge: number;
    evasion: number;
    gold: string;
    inventory: string;
    experiences: string;
    classFeatures: string;
    domainCards: string;
    activeWeapons: Weapon[];
    activeArmor: Armor[];
    traitUpgrades: TraitUpgrades;
}

const generateId = () => crypto.randomUUID();

const createNewCharacter = (): DaggerheartCharacter => ({
    id: generateId(),
    name: 'New Character',
    pronouns: '',
    characterClass: '',
    heritage: '',
    community: '',
    subclass: '',
    level: 1,
    hp: Array(10).fill(false),
    stress: Array(8).fill(false),
    hope: Array(8).fill(false),
    proficiency: Array(5).fill(false),
    agility: 0,
    strength: 0,
    finesse: 0,
    instinct: 0,
    presence: 0,
    knowledge: 0,
    evasion: 10,
    gold: '',
    inventory: '',
    experiences: '',
    classFeatures: '',
    domainCards: '',
    activeWeapons: [
        { name: '', traitRange: '', damageDiceType: '', feature: '' },
        { name: '', traitRange: '', damageDiceType: '', feature: '' }
    ],
    activeArmor: [
        { name: '', feature: '' }
    ],
    traitUpgrades: {
        agility: false,
        strength: false,
        finesse: false,
        instinct: false,
        presence: false,
        knowledge: false,
    },
});

// List of available classes
const CLASS_OPTIONS = [
    'Bard',
    'Druid',
    'Ranger',
    'Rogue',
    'Sorcerer',
    'Wizard',
    'Guardian',
    'Seraph',
    'Warrior',
] as const;

type CharacterClass = typeof CLASS_OPTIONS[number];

// Suggested traits and weapons for each class
const CLASS_SUGGESTIONS: Record<CharacterClass, {
    traits: Partial<Pick<DaggerheartCharacter, 'agility' | 'strength' | 'finesse' | 'instinct' | 'presence' | 'knowledge'>>,
    weapon: string,
    inventory: string,
}> = {
    Bard: {
        traits: { agility: 0, strength: -1, finesse: 1, instinct: 0, presence: 2, knowledge: 1 },
        weapon: 'Rapier - Presence Melee - d8 phy - One-Handed',
        inventory: 'torch, 50 feet of rope, basic supplies, handful of gold',
    },
    Druid: {
        traits: { agility: 1, strength: 0, finesse: 1, instinct: 2, presence: -1, knowledge: 0 },
        weapon: 'Shortstaff - Instinct Close - d8+1 mag - One-Handed',
        inventory: 'torch, 50 feet of rope, basic supplies, handful of gold',
    },
    Ranger: {
        traits: {}, weapon: '', inventory: ''
    },
    Rogue: {
        traits: {}, weapon: '', inventory: ''
    },
    Sorcerer: {
        traits: {}, weapon: '', inventory: ''
    },
    Wizard: {
        traits: {}, weapon: '', inventory: ''
    },
    Guardian: {
        traits: { agility: 1, strength: 2, finesse: -1, instinct: 0, presence: 1, knowledge: 0 },
        weapon: 'Battleaxe - Strength Melee - d10+3 phy - Two-Handed',
        inventory: '',
    },
    Seraph: {
        traits: {}, weapon: '', inventory: ''
    },
    Warrior: {
        traits: {}, weapon: '', inventory: ''
    },
};

// Subclass options by class
const SUBCLASS_OPTIONS: Record<CharacterClass, string[]> = {
    Bard: ['Troubadour', 'Wordsmith'],
    Druid: ['Warden of the Elements', 'Warden of Renewal'],
    Guardian: ['Stalwart', 'Vengeance'],
    Ranger: ['Beastbound', 'Wayfinder'],
    Rogue: ['Nightwalker', 'Syndicate'],
    Seraph: ['Divine Wielder', 'Winged Sentinel'],
    Sorcerer: ['Elemental Origin', 'Primal Origin'],
    Warrior: ['Call of the Brave', 'Call of the Slayer'],
    Wizard: ['School of Knowledge', 'School of War'],
};

const ANCESTRY_OPTIONS = [
    'Clank', 'Firbolg', 'Human', 'Drakona', 'Fungril', 'Infernis', 'Dwarf', 'Galapa', 'Katari',
    'Elf', 'Giant', 'Orc', 'Faerie', 'Goblin', 'Ribbet', 'Faun', 'Halfling', 'Simiah',
] as const;

const COMMUNITY_OPTIONS = [
    'Highborne', 'Ridgeborne', 'Underborne', 'Loreborne', 'Seaborne', 'Wanderborne', 'Orderborne', 'Slyborne', 'Wildborne',
] as const;

// Trait assignment options
const TRAIT_VALUES = [-1, 0, 0, 1, 1, 2] as const;
export type TraitValue = typeof TRAIT_VALUES[number];
const TRAIT_NAMES = [
    'agility',
    'strength',
    'finesse',
    'instinct',
    'presence',
    'knowledge',
] as const;
export type TraitName = typeof TRAIT_NAMES[number];

// Section keys and labels/icons
const SECTIONS = [
    { key: 'info', label: 'Info', icon: <FaUser /> },
    { key: 'traits', label: 'Traits', icon: <FaDna /> },
    { key: 'health', label: 'Health', icon: <FaHeartbeat /> },
    { key: 'weapons', label: 'Weapons', icon: <FaShieldAlt /> },
    { key: 'experiences', label: 'Experiences', icon: <FaBook /> },
    { key: 'features', label: 'Features', icon: <FaStar /> },
    { key: 'inventory', label: 'Inventory', icon: <FaBoxOpen /> },
    // Rally only for Bard
];

const isMobile = () => window.innerWidth <= 700;

const CharacterSheet: React.FC = () => {
    const [characterList, setCharacterList] = useState<DaggerheartCharacter[]>([]);
    const [currentCharacterId, setCurrentCharacterId] = useState<string | null>(null);
    const [isCreationMode, setIsCreationMode] = useState(true);
    const [creationError, setCreationError] = useState<string | null>(null);
    const [activeSection, setActiveSection] = useState('info');
    const [mobile, setMobile] = useState(isMobile());
    const currentCharacter = characterList.find(char => char.id === currentCharacterId);

    useEffect(() => {
        const savedCharacters = JSON.parse(localStorage.getItem('daggerheartCharacters') || '[]');
        if (savedCharacters.length > 0) {
            setCharacterList(savedCharacters);
            setCurrentCharacterId(savedCharacters[0].id);
        } else {
            const newChar = createNewCharacter();
            setCharacterList([newChar]);
            setCurrentCharacterId(newChar.id);
        }
    }, []);

    useEffect(() => {
        if (characterList.length > 0) {
            localStorage.setItem('daggerheartCharacters', JSON.stringify(characterList));
        }
    }, [characterList]);

    useEffect(() => {
        const onResize = () => setMobile(isMobile());
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    const updateCharacterField = useCallback((field: keyof DaggerheartCharacter, value: any) => {
        setCharacterList(prevList =>
            prevList.map(char =>
                char.id === currentCharacterId
                    ? { ...char, [field]: value }
                    : char
            )
        );
    }, [currentCharacterId]);

    const toggleCircles = useCallback((resourceType: 'hp' | 'stress' | 'hope' | 'proficiency', index: number) => {
        setCharacterList(prevList =>
            prevList.map(char =>
                char.id === currentCharacterId
                    ? {
                        ...char,
                        [resourceType]: char[resourceType].map((val: boolean, i: number) =>
                            i === index ? !val : val
                        )
                    }
                    : char
            )
        );
    }, [currentCharacterId]);

    const handleWeaponChange = useCallback((index: number, field: keyof Weapon, value: string) => {
        setCharacterList(prevList =>
            prevList.map(char =>
                char.id === currentCharacterId
                    ? {
                        ...char,
                        activeWeapons: char.activeWeapons.map((weapon, i) =>
                            i === index ? { ...weapon, [field]: value } : weapon
                        )
                    }
                    : char
            )
        );
    }, [currentCharacterId]);

    const handleArmorChange = useCallback((index: number, field: keyof Armor, value: string) => {
        setCharacterList(prevList =>
            prevList.map(char =>
                char.id === currentCharacterId
                    ? {
                        ...char,
                        activeArmor: char.activeArmor.map((armor, i) =>
                            i === index ? { ...armor, [field]: value } : armor
                        )
                    }
                    : char
            )
        );
    }, [currentCharacterId]);

    const handleSelectCharacter = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCurrentCharacterId(e.target.value);
    };

    const handleNewCharacter = () => {
        const newChar = createNewCharacter();
        setCharacterList(prevList => [...prevList, newChar]);
        setCurrentCharacterId(newChar.id);
    };

    const handleDeleteCharacter = () => {
        if (characterList.length <= 1) {
            const newChar = createNewCharacter();
            setCharacterList([newChar]);
            setCurrentCharacterId(newChar.id);
        } else {
            const updatedList = characterList.filter(char => char.id !== currentCharacterId);
            setCharacterList(updatedList);
            setCurrentCharacterId(updatedList[0].id);
        }
    };

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

    // Handler to apply class suggestions
    const handleApplySuggestions = () => {
        if (!currentCharacter || !currentCharacter.characterClass) return;
        const suggestions = CLASS_SUGGESTIONS[currentCharacter.characterClass as CharacterClass];
        if (!suggestions) return;
        updateCharacterField('agility', suggestions.traits.agility ?? currentCharacter.agility);
        updateCharacterField('strength', suggestions.traits.strength ?? currentCharacter.strength);
        updateCharacterField('finesse', suggestions.traits.finesse ?? currentCharacter.finesse);
        updateCharacterField('instinct', suggestions.traits.instinct ?? currentCharacter.instinct);
        updateCharacterField('presence', suggestions.traits.presence ?? currentCharacter.presence);
        updateCharacterField('knowledge', suggestions.traits.knowledge ?? currentCharacter.knowledge);
        // Pre-fill weapon (first weapon slot)
        if (suggestions.weapon) {
            handleWeaponChange(0, 'name', suggestions.weapon);
        }
        // Pre-fill inventory
        if (suggestions.inventory) {
            updateCharacterField('inventory', suggestions.inventory);
        }
    };

    // Trait assignment state
    const [traitAssignment, setTraitAssignment] = useState<Record<TraitName, TraitValue | null>>({
        agility: null,
        strength: null,
        finesse: null,
        instinct: null,
        presence: null,
        knowledge: null,
    });

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
        const assignedElsewhere: TraitValue[] = Object.entries(traitAssignment)
            .filter(([t, v]) => t !== trait && v !== null)
            .map(([, v]) => v as TraitValue);
        const allCounts: Record<TraitValue, number> = { '-1': 1, 0: 2, 1: 2, 2: 1 };
        const usedCounts: Record<TraitValue, number> = { '-1': 0, 0: 0, 1: 0, 2: 0 };
        assignedElsewhere.forEach(v => { usedCounts[v] = (usedCounts[v] || 0) + 1; });
        const current = traitAssignment[trait];
        return (TRAIT_VALUES as readonly TraitValue[]).filter(val => {
            // Always allow the current value for this trait
            const allowed = (usedCounts[val] < allCounts[val]) || (current === val);
            return allowed;
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
    };

    // Apply trait assignment to character
    const applyTraitAssignment = () => {
        if (!isValidTraitAssignment) return;
        TRAIT_NAMES.forEach(trait => {
            updateCharacterField(trait, traitAssignment[trait] as TraitValue);
        });
    };

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
        setIsCreationMode(false);
    };

    // Helper to show/hide sections
    const showSection = (key: string) => {
        if (mobile) return activeSection === key;
        return true;
    };

    if (!currentCharacter) {
        return <div className="character-sheet-container">Loading character...</div>;
    }

    return (
        <>
            <div className="character-sheet-container">
                <h1>Daggerheart Character Sheet</h1>
                <div style={{ marginBottom: 16 }}>
                    {isCreationMode ? (
                        <div className="creation-banner" style={{ background: '#e0f7fa', color: '#006064', padding: 8, borderRadius: 4, marginBottom: 8 }}>
                            <b>Character Creation Mode</b>
                        </div>
                    ) : (
                        <div className="play-banner" style={{ background: '#e8f5e9', color: '#1b5e20', padding: 8, borderRadius: 4, marginBottom: 8 }}>
                            <b>Playable Character Mode</b>
                        </div>
                    )}
                </div>
                <div className="character-controls box">
                    <label htmlFor="character-select">Select Character:</label>
                    <select id="character-select" value={currentCharacterId || ''} onChange={handleSelectCharacter}>
                        {characterList.map(char => (
                            <option key={char.id} value={char.id}>
                                {char.name || 'Unnamed Character'}
                            </option>
                        ))}
                    </select>
                    <button onClick={handleNewCharacter}>New Character</button>
                    <button onClick={handleDeleteCharacter} className="delete">Delete Current</button>
                </div>

                {/* Info Section */}
                {showSection('info') && (
                    <InfoSection
                        currentCharacter={currentCharacter}
                        updateCharacterField={updateCharacterField}
                        subclassOptions={subclassOptions}
                        handleApplySuggestions={handleApplySuggestions}
                        CLASS_OPTIONS={CLASS_OPTIONS}
                        CLASS_SUGGESTIONS={CLASS_SUGGESTIONS}
                        ANCESTRY_OPTIONS={ANCESTRY_OPTIONS}
                        COMMUNITY_OPTIONS={COMMUNITY_OPTIONS}
                    />
                )}

                {/* Traits Section */}
                {showSection('traits') && (
                    <TraitsSection
                        currentCharacter={currentCharacter}
                        traitAssignment={traitAssignment}
                        traitIssues={traitIssues}
                        isValidTraitAssignment={isValidTraitAssignment}
                        remainingTraitValues={remainingTraitValues}
                        TRAIT_NAMES={TRAIT_NAMES}
                        getAvailableValues={getAvailableValues}
                        handleTraitChange={handleTraitChange}
                        applyTraitAssignment={applyTraitAssignment}
                        resetTraitAssignment={resetTraitAssignment}
                        showTraitHelp={showTraitHelp}
                        setShowTraitHelp={setShowTraitHelp}
                        updateCharacterField={updateCharacterField}
                    />
                )}

                {/* Health Section */}
                {showSection('health') && (
                    <HealthSection
                        currentCharacter={currentCharacter}
                        calculateThreshold={calculateThreshold}
                        toggleCircles={toggleCircles}
                    />
                )}

                {/* Weapons & Armor Section */}
                {showSection('weapons') && (
                    <WeaponsArmorSection
                        currentCharacter={currentCharacter}
                        handleWeaponChange={handleWeaponChange}
                        handleArmorChange={handleArmorChange}
                    />
                )}

                {/* Experiences Section */}
                {showSection('experiences') && (
                    <ExperiencesSection
                        currentCharacter={currentCharacter}
                        updateCharacterField={updateCharacterField}
                    />
                )}

                {/* Features & Domains Section */}
                {showSection('features') && (
                    <FeaturesDomainsSection
                        currentCharacter={currentCharacter}
                        updateCharacterField={updateCharacterField}
                    />
                )}

                {/* Inventory Section */}
                {showSection('inventory') && (
                    <InventorySection
                        currentCharacter={currentCharacter}
                        updateCharacterField={updateCharacterField}
                    />
                )}

                {/* Rally Section (Bard only) */}
                {currentCharacter?.characterClass === 'Bard' && showSection('rally') && (
                    <section className="rally-section box">
                        <h2>RALLY</h2>
                        <p>
                            Once per session, describe how you rally the party and give yourself and each of your allies a Rally Die. At level 1, your Rally Die is a d6. A PC can spend their Rally Die to roll it, adding the result to their action roll, reaction roll, damage roll, or to clear a number of Stress equal to the result. Your Rally Die increases at higher levels.
                        </p>
                    </section>
                )}
                <div style={{ marginTop: 24, textAlign: 'center' }}>
                    <button onClick={handleCompleteCharacter} style={{ fontSize: 18, padding: '8px 24px' }}>
                        Complete Character
                    </button>
                    {creationError && <div style={{ color: 'red', marginTop: 8 }}>{creationError}</div>}
                </div>
            </div>
            {/* Mobile Bottom Navigation */}
            {mobile && (
                <nav className="mobile-nav">
                    {SECTIONS.map(section => (
                        <button
                            key={section.key}
                            className={activeSection === section.key ? 'active' : ''}
                            onClick={() => setActiveSection(section.key)}
                            aria-label={section.label}
                        >
                            {section.icon}
                            <span className="nav-label">{section.label}</span>
                        </button>
                    ))}
                    {/* Rally icon for Bard */}
                    {currentCharacter?.characterClass === 'Bard' && (
                        <button
                            key="rally"
                            className={activeSection === 'rally' ? 'active' : ''}
                            onClick={() => setActiveSection('rally')}
                            aria-label="Rally"
                        >
                            <FaMusic />
                            <span className="nav-label">Rally</span>
                        </button>
                    )}
                </nav>
            )}
        </>
    );
};

export default CharacterSheet; 