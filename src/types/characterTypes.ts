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