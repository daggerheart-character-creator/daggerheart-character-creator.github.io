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