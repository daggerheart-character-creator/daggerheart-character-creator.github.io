import type { DaggerheartCharacter } from '../types/characterTypes';

export const generateId = () => crypto.randomUUID();

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
    gold: '',
    inventory: '',
    experiences: '',
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
}); 