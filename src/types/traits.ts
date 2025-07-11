export const TRAIT_VALUES = [-1, 0, 0, 1, 1, 2] as const;
export type TraitValue = typeof TRAIT_VALUES[number];

export const TRAIT_NAMES = [
    'agility',
    'strength',
    'finesse',
    'instinct',
    'presence',
    'knowledge',
] as const;
export type TraitName = typeof TRAIT_NAMES[number];

// Trait descriptors from the core rules
export const TRAIT_DESCRIPTORS: Record<TraitName, [string, string, string]> = {
    agility: ['Leap', 'Sprint', 'Maneuver'],
    strength: ['Lift', 'Smash', 'Endure'],
    finesse: ['Sneak', 'Pick', 'Tinker'],
    instinct: ['Notice', 'React', 'Survive'],
    presence: ['Charm', 'Command', 'Inspire'],
    knowledge: ['Recall', 'Analyze', 'Solve'],
}; 