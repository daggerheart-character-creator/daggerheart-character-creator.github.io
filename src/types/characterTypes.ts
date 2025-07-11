import type { DomainCard } from '../constants/domainCards';

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

export interface ArmorOption {
    name: string;
    baseThresholds: string;
    baseScore: number;
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

export interface SubclassDetail {
    name: string;
    description: string;
    spellcastTrait?: string;
    foundationFeature: { name: string; description: string };
    specializationFeature: { name: string; description: string };
    masteryFeature: { name: string; description: string };
}

export interface AncestryDetail {
    name: string;
    description: string;
    feature1: { name: string; description: string };
    feature2: { name: string; description: string };
}

export interface CommunityDetail {
    name: string;
    description: string;
    feature: { name: string; description: string };
}

export interface InventoryItem {
    name: string;
    source?: 'core' | 'class' | 'custom';
    notes?: string;
    quantity?: number;
    type?: string; // e.g., 'consumable', 'equipment', etc.
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
    gold: {
        handfuls: number;
        bags: number;
        chests: number;
    };
    inventory: InventoryItem[];
    experiences: { text: string; bonus: number }[];
    classFeatures: string;
    domainCards: DomainCard[];
    activeWeapons: Weapon[];
    activeArmor: Armor[];
    traitUpgrades: TraitUpgrades;
    armorSlots?: boolean[];
    completed?: boolean;
    background?: Record<string, string>;
    connections?: Record<string, string>;
} 