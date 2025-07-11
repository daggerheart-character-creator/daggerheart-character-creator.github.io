import { CLASS_SUGGESTIONS } from '../constants/characterOptions';
import { coreItems } from '../constants/items';
import type { DaggerheartCharacter, InventoryItem } from '../types/characterTypes';

export const generateId = () => crypto.randomUUID();

export function parseStartingInventory(className: string): InventoryItem[] {
    const classKey = (className && CLASS_SUGGESTIONS[className as keyof typeof CLASS_SUGGESTIONS]) ? className as keyof typeof CLASS_SUGGESTIONS : 'Bard';
    const invString = CLASS_SUGGESTIONS[classKey].inventory;
    return invString.split(',').map(s => s.trim()).filter(Boolean).map(name => {
        // Try to match to a core item (case-insensitive)
        const core = coreItems.find(item => item.name.toLowerCase() === name.toLowerCase());
        if (core) return { ...core };
        return { name, source: 'class' };
    });
}

export const createNewCharacter = (): DaggerheartCharacter => ({
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
    gold: { handfuls: 0, bags: 0, chests: 0 },
    inventory: parseStartingInventory('Bard'), // Default to Bard if class not set
    experiences: [],
    classFeatures: '',
    domainCards: [],
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
    armorSlots: Array(3).fill(false), // Default to 3 slots (Gambeson/Leather)
    completed: false,
}); 