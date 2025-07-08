import type { Weapon } from '../types/characterTypes';

export const PRIMARY_WEAPONS: Weapon[] = [
    { name: 'Broadsword', traitRange: 'Agility Melee', damageDiceType: 'd8 phy', feature: 'Reliable: +1 to attack rolls' },
    { name: 'Longsword', traitRange: 'Agility Melee', damageDiceType: 'd8+3 phy', feature: '' },
    { name: 'Battleaxe', traitRange: 'Strength Melee', damageDiceType: 'd10+3 phy', feature: '' },
    { name: 'Greatsword', traitRange: 'Strength Melee', damageDiceType: 'd10+3 phy', feature: 'Massive: −1 to Evasion; on a successful attack, roll an additional damage die and discard the lowest result.' },
    { name: 'Mace', traitRange: 'Strength Melee', damageDiceType: 'd8+1 phy', feature: '' },
    { name: 'Warhammer', traitRange: 'Strength Melee', damageDiceType: 'd12+3 phy', feature: 'Heavy: −1 to Evasion' },
    { name: 'Dagger', traitRange: 'Finesse Melee', damageDiceType: 'd8+1 phy', feature: '' },
    { name: 'Quarterstaff', traitRange: 'Instinct Melee', damageDiceType: 'd10+3 phy', feature: '' },
    { name: 'Cutlass', traitRange: 'Presence Melee', damageDiceType: 'd8+1 phy', feature: '' },
    { name: 'Rapier', traitRange: 'Presence Melee', damageDiceType: 'd8 phy', feature: 'Quick: When you make an attack, you can mark a Stress to target another creature within range.' },
    { name: 'Halberd', traitRange: 'Strength Very Close', damageDiceType: 'd10+2 phy', feature: 'Cumbersome: −1 to Finesse' },
    { name: 'Spear', traitRange: 'Finesse Very Close', damageDiceType: 'd10+2 phy', feature: 'Cumbersome: −1 to Finesse' },
    { name: 'Shortbow', traitRange: 'Agility Far', damageDiceType: 'd6+3 phy', feature: '' },
    { name: 'Crossbow', traitRange: 'Finesse Far', damageDiceType: 'd6+1 phy', feature: '' },
    { name: 'Longbow', traitRange: 'Agility Very Far', damageDiceType: 'd8+3 phy', feature: 'Cumbersome: −1 to Finesse' },
];

export const MAGIC_WEAPONS: Weapon[] = [
    { name: 'Arcane Gauntlets', traitRange: 'Strength Melee', damageDiceType: 'd10+3 mag', feature: '' },
    { name: 'Hallowed Axe', traitRange: 'Strength Melee', damageDiceType: 'd8+1 mag', feature: '' },
    { name: 'Glowing Rings', traitRange: 'Agility Very Close', damageDiceType: 'd10+1 mag', feature: '' },
    { name: 'Hand Runes', traitRange: 'Instinct Very Close', damageDiceType: 'd10 mag', feature: '' },
    { name: 'Returning Blade', traitRange: 'Finesse Close', damageDiceType: 'd8 mag', feature: 'Returning: When this weapon is thrown within its range, it appears in your hand immediately after the attack.' },
    { name: 'Shortstaff', traitRange: 'Instinct Close', damageDiceType: 'd8+1 mag', feature: '' },
    { name: 'Dualstaff', traitRange: 'Instinct Far', damageDiceType: 'd6+3 mag', feature: '' },
    { name: 'Scepter', traitRange: 'Presence Far', damageDiceType: 'd6 mag', feature: 'Versatile: This weapon can also be used with these statistics—Presence, Melee, d8.' },
    { name: 'Wand', traitRange: 'Knowledge Far', damageDiceType: 'd6+1 mag', feature: '' },
    { name: 'Greatstaff', traitRange: 'Knowledge Very Far', damageDiceType: 'd6 mag', feature: 'Powerful: On a successful attack, roll an additional damage die and discard the lowest result.' },
];

export const SECONDARY_WEAPONS: Weapon[] = [
    { name: 'Shortsword', traitRange: 'Agility Melee', damageDiceType: 'd8 phy', feature: 'Paired: +2 to primary weapon damage to targets within Melee range' },
    { name: 'Round Shield', traitRange: 'Strength Melee', damageDiceType: 'd4 phy', feature: 'Protective: +1 to Armor Score' },
    { name: 'Tower Shield', traitRange: 'Strength Melee', damageDiceType: 'd6 phy', feature: 'Barrier: +2 to Armor Score; −1 to Evasion' },
    { name: 'Small Dagger', traitRange: 'Finesse Melee', damageDiceType: 'd8 phy', feature: 'Paired: +2 to primary weapon damage to targets within Melee range' },
    { name: 'Whip', traitRange: 'Presence Very Close', damageDiceType: 'd6 phy', feature: 'Startling: Mark a Stress to crack the whip and force all adversaries within Melee range back to Close range.' },
    { name: 'Grappler', traitRange: 'Finesse Close', damageDiceType: 'd6 phy', feature: 'Hooked: On a successful attack, you can pull the target into Melee range.' },
    { name: 'Hand Crossbow', traitRange: 'Finesse Far', damageDiceType: 'd6+1 phy', feature: '' },
]; 