import React, { useCallback, useEffect, useMemo, useState } from 'react';
import './CharacterSheet.css';

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
type Ancestry = typeof ANCESTRY_OPTIONS[number];

const COMMUNITY_OPTIONS = [
    'Highborne', 'Ridgeborne', 'Underborne', 'Loreborne', 'Seaborne', 'Wanderborne', 'Orderborne', 'Slyborne', 'Wildborne',
] as const;
type Community = typeof COMMUNITY_OPTIONS[number];

// Trait assignment options
const TRAIT_VALUES = [-1, 0, 0, 1, 1, 2] as const;
type TraitValue = typeof TRAIT_VALUES[number];
const TRAIT_NAMES = [
    'agility',
    'strength',
    'finesse',
    'instinct',
    'presence',
    'knowledge',
] as const;
type TraitName = typeof TRAIT_NAMES[number];

const CharacterSheet: React.FC = () => {
    const [characterList, setCharacterList] = useState<DaggerheartCharacter[]>([]);
    const [currentCharacterId, setCurrentCharacterId] = useState<string | null>(null);
    const [isCreationMode, setIsCreationMode] = useState(true);
    const [creationError, setCreationError] = useState<string | null>(null);

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

    const toggleTraitUpgrade = useCallback((traitField: keyof TraitUpgrades) => {
        setCharacterList(prevList =>
            prevList.map(char =>
                char.id === currentCharacterId
                    ? {
                        ...char,
                        traitUpgrades: {
                            ...char.traitUpgrades,
                            [traitField]: !char.traitUpgrades[traitField]
                        }
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

    const handleEditCharacter = () => {
        setIsCreationMode(true);
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
                {isCreationMode ? (
                    <>
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

                        {/* Class Selection Dropdown */}
                        <section className="info-section box">
                            <div className="input-group">
                                <label htmlFor="class-select">CLASS:</label>
                                <select
                                    id="class-select"
                                    value={currentCharacter.characterClass}
                                    onChange={e => updateCharacterField('characterClass', e.target.value as CharacterClass)}
                                >
                                    <option value="">Select a class...</option>
                                    {CLASS_OPTIONS.map(cls => (
                                        <option key={cls} value={cls}>{cls}</option>
                                    ))}
                                </select>
                            </div>
                            {/* Existing basic info fields, except CLASS */}
                            <div className="input-group">
                                <label>NAME:</label>
                                <input type="text" value={currentCharacter.name} onChange={(e) => updateCharacterField('name', e.target.value)} />
                            </div>
                            <div className="input-group">
                                <label>PRONOUNS:</label>
                                <input type="text" value={currentCharacter.pronouns} onChange={(e) => updateCharacterField('pronouns', e.target.value)} />
                            </div>
                            {/* Subclass Dropdown (depends on class) */}
                            <div className="input-group">
                                <label htmlFor="subclass-select">SUBCLASS:</label>
                                <select
                                    id="subclass-select"
                                    value={currentCharacter.subclass}
                                    onChange={e => updateCharacterField('subclass', e.target.value)}
                                    disabled={!currentCharacter.characterClass}
                                >
                                    <option value="">Select a subclass...</option>
                                    {subclassOptions.map(sub => (
                                        <option key={sub} value={sub}>{sub}</option>
                                    ))}
                                </select>
                            </div>
                            {/* Ancestry Dropdown */}
                            <div className="input-group">
                                <label htmlFor="ancestry-select">ANCESTRY:</label>
                                <select
                                    id="ancestry-select"
                                    value={currentCharacter.heritage}
                                    onChange={e => updateCharacterField('heritage', e.target.value as Ancestry)}
                                >
                                    <option value="">Select an ancestry...</option>
                                    {ANCESTRY_OPTIONS.map(anc => (
                                        <option key={anc} value={anc}>{anc}</option>
                                    ))}
                                </select>
                            </div>
                            {/* Community Dropdown */}
                            <div className="input-group">
                                <label htmlFor="community-select">COMMUNITY:</label>
                                <select
                                    id="community-select"
                                    value={currentCharacter.community || ''}
                                    onChange={e => updateCharacterField('community', e.target.value as Community)}
                                >
                                    <option value="">Select a community...</option>
                                    {COMMUNITY_OPTIONS.map(com => (
                                        <option key={com} value={com}>{com}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="input-group">
                                <label>LEVEL:</label>
                                <input type="number" value={currentCharacter.level} onChange={(e) => updateCharacterField('level', parseInt(e.target.value) || 0)} min="0" />
                            </div>
                            {/* Show apply suggestions button if class has suggestions */}
                            {currentCharacter.characterClass && CLASS_SUGGESTIONS[currentCharacter.characterClass as CharacterClass] && (
                                <div style={{ marginBottom: 10 }}>
                                    <button type="button" onClick={handleApplySuggestions}>
                                        Apply {currentCharacter.characterClass} Suggestions
                                    </button>
                                </div>
                            )}
                        </section>

                        <div className="main-layout">
                            {/* Traits & Evasion */}
                            {/* Trait Assignment UI */}
                            <section className="traits-section box">
                                <h2 style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    TRAITS
                                    <span
                                        style={{ cursor: 'pointer', fontSize: 18 }}
                                        onMouseEnter={() => setShowTraitHelp(true)}
                                        onMouseLeave={() => setShowTraitHelp(false)}
                                        tabIndex={0}
                                        aria-label="Trait assignment help"
                                    >
                                        ℹ️
                                    </span>
                                    {showTraitHelp && (
                                        <span style={{ background: '#fff', color: '#222', border: '1px solid #ccc', borderRadius: 4, padding: 8, position: 'absolute', zIndex: 10, marginLeft: 8, maxWidth: 320 }}>
                                            Assign the following values to the six traits: <b>−1, 0, 0, +1, +1, +2</b>. Each value must be used exactly once. Traits affect your character's abilities in different situations.
                                        </span>
                                    )}
                                </h2>
                                <form
                                    onSubmit={e => {
                                        e.preventDefault();
                                        applyTraitAssignment();
                                    }}
                                    style={{ marginBottom: 16 }}
                                >
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
                                        {TRAIT_NAMES.map(trait => (
                                            <div
                                                className="trait-row"
                                                key={trait}
                                                style={{
                                                    display: 'flex', alignItems: 'center', gap: 8,
                                                    background: traitIssues[trait] === 'duplicate' ? '#ffeaea' : traitIssues[trait] === 'unassigned' ? '#fffbe6' : undefined,
                                                    borderRadius: 4, padding: 4
                                                }}
                                            >
                                                <span className="trait-name" style={{ width: 90 }}>{trait.toUpperCase()}:</span>
                                                <select
                                                    value={traitAssignment[trait] ?? ''}
                                                    onChange={e => handleTraitChange(trait, e.target.value === '' ? '' : Number(e.target.value) as TraitValue)}
                                                >
                                                    <option value="">--</option>
                                                    {getAvailableValues(trait).map(val => (
                                                        <option key={val} value={val}>{val >= 0 ? `+${val}` : val}</option>
                                                    ))}
                                                </select>
                                                {traitIssues[trait] === 'duplicate' && <span style={{ color: 'red', fontSize: 12 }}>Duplicate</span>}
                                                {traitIssues[trait] === 'unassigned' && <span style={{ color: '#b59a00', fontSize: 12 }}>Unassigned</span>}
                                            </div>
                                        ))}
                                    </div>
                                    <div style={{ marginTop: 8, fontSize: 14 }}>
                                        <b>Remaining values:</b> {remainingTraitValues.length === 0 ? 'None' : remainingTraitValues.map(v => v >= 0 ? `+${v}` : v).join(', ')}
                                    </div>
                                    <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
                                        <button type="submit" disabled={!isValidTraitAssignment}>
                                            Apply Trait Assignment
                                        </button>
                                        <button type="button" onClick={resetTraitAssignment}>
                                            Reset
                                        </button>
                                    </div>
                                    {!isValidTraitAssignment && (
                                        <div style={{ color: 'red', marginTop: 8 }}>
                                            You must assign −1, 0, 0, +1, +1, +2 across the six traits. No duplicates.
                                        </div>
                                    )}
                                </form>
                            </section>
                            <div className="trait-row evasion">
                                <span className="trait-name">EVASION:</span>
                                <input type="number" value={currentCharacter?.evasion} onChange={(e) => updateCharacterField('evasion', parseInt(e.target.value) || 0)} className="evasion-input" min="0" />
                            </div>
                        </div>

                        {/* Damage & Health */}
                        <section className="health-section box">
                            <h2>DAMAGE & HEALTH</h2>
                            <div className="thresholds">
                                <h3>DAMAGE THRESHOLDS (Add your level)</h3>
                                <div className="threshold-row">
                                    <span>MINOR: {calculateThreshold(10)} (Mark 1 HP)</span>
                                </div>
                                <div className="threshold-row">
                                    <span>MAJOR: {calculateThreshold(15)} (Mark 2 HP)</span>
                                </div>
                                <div className="threshold-row">
                                    <span>SEVERE: {calculateThreshold(20)} (Mark 3 HP)</span>
                                </div>
                            </div>

                            <div className="resource-tracker">
                                <label>HP:</label>
                                <div className="circles">
                                    {currentCharacter?.hp.map((filled, index) => (
                                        <span key={index} className={`circle ${filled ? 'filled' : ''}`} onClick={() => toggleCircles('hp', index)}></span>
                                    ))}
                                </div>
                                <label>STRESS:</label>
                                <div className="circles">
                                    {currentCharacter?.stress.map((filled, index) => (
                                        <span key={index} className={`circle ${filled ? 'filled' : ''}`} onClick={() => toggleCircles('stress', index)}></span>
                                    ))}
                                </div>
                                <label>HOPE:</label>
                                <div className="circles">
                                    {currentCharacter?.hope.map((filled, index) => (
                                        <span key={index} className={`circle ${filled ? 'filled' : ''}`} onClick={() => toggleCircles('hope', index)}></span>
                                    ))}
                                </div>
                                <p className="hope-tip">*Spend a Hope to use an experience or help an ally.</p>
                                <label>PROFICIENCY:</label>
                                <div className="circles proficiency-circles">
                                    {currentCharacter?.proficiency.map((filled, index) => (
                                        <span key={index} className={`circle ${filled ? 'filled' : ''}`} onClick={() => toggleCircles('proficiency', index)}></span>
                                    ))}
                                </div>
                            </div>
                        </section>

                        {/* Active Weapons & Armor */}
                        <div className="layout-row">
                            <section className="weapons-armor-section box flex-half">
                                <h2>ACTIVE WEAPONS</h2>
                                {currentCharacter?.activeWeapons.map((weapon, index) => (
                                    <div className="weapon-entry" key={index}>
                                        <h3>Weapon {index + 1}:</h3>
                                        <input type="text" placeholder="Name" value={weapon.name} onChange={(e) => handleWeaponChange(index, 'name', e.target.value)} />
                                        <input type="text" placeholder="Trait & Range" value={weapon.traitRange} onChange={(e) => handleWeaponChange(index, 'traitRange', e.target.value)} />
                                        <input type="text" placeholder="Damage Dice & Type" value={weapon.damageDiceType} onChange={(e) => handleWeaponChange(index, 'damageDiceType', e.target.value)} />
                                        <textarea placeholder="Feature" value={weapon.feature} onChange={(e) => handleWeaponChange(index, 'feature', e.target.value)}></textarea>
                                    </div>
                                ))}

                                <h2>ACTIVE ARMOR</h2>
                                {currentCharacter?.activeArmor.map((armor, index) => (
                                    <div className="armor-entry" key={index}>
                                        <h3>Armor {index + 1}:</h3>
                                        <input type="text" placeholder="Name" value={armor.name} onChange={(e) => handleArmorChange(index, 'name', e.target.value)} />
                                        <textarea placeholder="Feature" value={armor.feature} onChange={(e) => handleArmorChange(index, 'feature', e.target.value)}></textarea>
                                    </div>
                                ))}
                            </section>

                            {/* Experiences */}
                            <section className="experiences-section box flex-half">
                                <h2>EXPERIENCES</h2>
                                <textarea placeholder="List your experiences here, one per line..." value={currentCharacter?.experiences} onChange={(e) => updateCharacterField('experiences', e.target.value)}></textarea>
                            </section>
                        </div>

                        {/* Class Features & Domain Cards */}
                        <div className="layout-row">
                            <section className="class-domain-section box flex-half">
                                <h2>CLASS FEATURES</h2>
                                <textarea placeholder="Describe your class features here..." value={currentCharacter?.classFeatures} onChange={(e) => updateCharacterField('classFeatures', e.target.value)}></textarea>

                                <h2>DOMAIN CARDS</h2>
                                <textarea placeholder="List your domain cards and their features here..." value={currentCharacter?.domainCards} onChange={(e) => updateCharacterField('domainCards', e.target.value)}></textarea>
                            </section>

                            {/* Inventory & Notes */}
                            <section className="inventory-notes-section box flex-half">
                                <h2>INVENTORY & NOTES</h2>
                                <div className="input-group">
                                    <label>GOLD:</label>
                                    <input type="text" placeholder="e.g., 5 Handfuls" value={currentCharacter?.gold} onChange={(e) => updateCharacterField('gold', e.target.value)} />
                                </div>
                                <textarea placeholder="List your inventory items and general notes here..." value={currentCharacter?.inventory} onChange={(e) => updateCharacterField('inventory', e.target.value)}></textarea>
                            </section>
                        </div>

                        {/* Rally Section - only for Bard */}
                        {currentCharacter?.characterClass === 'Bard' && (
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
                    </>
                ) : (
                    <>
                        {/* Playable Character Display (read-only except for in-play fields) */}
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

                        <div className="main-layout">
                            <section className="traits-section box">
                                {/* Display traits as read-only */}
                                <h2>TRAITS</h2>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
                                    {TRAIT_NAMES.map(trait => (
                                        <div className="trait-row" key={trait} style={{ display: 'flex', alignItems: 'center', gap: 8, borderRadius: 4, padding: 4 }}>
                                            <span className="trait-name" style={{ width: 90 }}>{trait.toUpperCase()}:</span>
                                            <span style={{ fontWeight: 600 }}>{currentCharacter?.[trait]}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                            <div className="trait-row evasion">
                                <span className="trait-name">EVASION:</span>
                                <input type="number" value={currentCharacter?.evasion} onChange={(e) => updateCharacterField('evasion', parseInt(e.target.value) || 0)} className="evasion-input" min="0" />
                            </div>
                        </div>
                        {/* Damage & Health (editable) */}
                        <section className="health-section box">
                            {/* ... health section ... */}
                        </section>
                        {/* Active Weapons & Armor (editable) */}
                        <div className="layout-row">
                            {/* ... weapons and armor ... */}
                        </div>
                        {/* Class Features & Domain Cards (read-only) */}
                        <div className="layout-row">
                            <section className="class-domain-section box flex-half">
                                <h2>CLASS FEATURES</h2>
                                <div style={{ whiteSpace: 'pre-line', background: '#f9fbe7', padding: 8, borderRadius: 4 }}>{currentCharacter?.classFeatures}</div>
                                <h2>DOMAIN CARDS</h2>
                                <div style={{ whiteSpace: 'pre-line', background: '#f9fbe7', padding: 8, borderRadius: 4 }}>{currentCharacter?.domainCards}</div>
                            </section>
                            <section className="inventory-notes-section box flex-half">
                                <h2>INVENTORY & NOTES</h2>
                                <div className="input-group">
                                    <label>GOLD:</label>
                                    <input type="text" placeholder="e.g., 5 Handfuls" value={currentCharacter?.gold} onChange={(e) => updateCharacterField('gold', e.target.value)} />
                                </div>
                                <textarea placeholder="List your inventory items and general notes here..." value={currentCharacter?.inventory} onChange={(e) => updateCharacterField('inventory', e.target.value)}></textarea>
                            </section>
                        </div>
                        {/* Rally Section - only for Bard */}
                        {currentCharacter?.characterClass === 'Bard' && (
                            <section className="rally-section box">
                                <h2>RALLY</h2>
                                <p>
                                    Once per session, describe how you rally the party and give yourself and each of your allies a Rally Die. At level 1, your Rally Die is a d6. A PC can spend their Rally Die to roll it, adding the result to their action roll, reaction roll, damage roll, or to clear a number of Stress equal to the result. Your Rally Die increases at higher levels.
                                </p>
                            </section>
                        )}
                        <div style={{ marginTop: 24, textAlign: 'center' }}>
                            <button onClick={handleEditCharacter} style={{ fontSize: 16, padding: '6px 18px' }}>
                                Edit Character
                            </button>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default CharacterSheet; 