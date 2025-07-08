import React from 'react';
import type { DaggerheartCharacter } from '../types/characterTypes';
import type { TraitValue, TraitName } from '../types/traits';
import { FaUser, FaDna, FaHeartbeat, FaShieldAlt, FaBook, FaStar, FaBoxOpen, FaMusic } from 'react-icons/fa';

export const CLASS_OPTIONS = [
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

export type CharacterClass = typeof CLASS_OPTIONS[number];

export const CLASS_SUGGESTIONS: Record<CharacterClass, {
    traits: Partial<Pick<DaggerheartCharacter, TraitName>>,
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
        traits: { agility: 2, strength: 1, finesse: 1, instinct: 0, presence: 0, knowledge: -1 },
        weapon: 'Longbow - Agility Very Far - d8+3 phy - Two-Handed',
        inventory: 'torch, 50 feet of rope, basic supplies, handful of gold, animal companion',
    },
    Rogue: {
        traits: { agility: 1, strength: 0, finesse: 2, instinct: 1, presence: -1, knowledge: 0 },
        weapon: 'Dagger - Finesse Melee - d6+3 phy - One-Handed',
        inventory: 'torch, 50 feet of rope, basic supplies, handful of gold, thieves’ tools',
    },
    Sorcerer: {
        traits: { agility: 0, strength: -1, finesse: 1, instinct: 2, presence: 1, knowledge: 0 },
        weapon: 'Dualstaff - Instinct Far - d6+3 mag - Two-Handed',
        inventory: 'torch, 50 feet of rope, basic supplies, handful of gold, whispering orb or family heirloom',
    },
    Wizard: {
        traits: { agility: -1, strength: 0, finesse: 0, instinct: 1, presence: 1, knowledge: 2 },
        weapon: 'Greatstaff - Knowledge Very Far - d6 mag - Two-Handed',
        inventory: 'torch, 50 feet of rope, basic supplies, handful of gold, book you’re trying to translate or a tiny harmless elemental pet',
    },
    Guardian: {
        traits: { agility: 1, strength: 2, finesse: -1, instinct: 0, presence: 1, knowledge: 0 },
        weapon: 'Battleaxe - Strength Melee - d10+3 phy - Two-Handed',
        inventory: 'torch, 50 feet of rope, basic supplies, handful of gold, shield',
    },
    Seraph: {
        traits: { agility: 0, strength: 2, finesse: -1, instinct: 1, presence: 1, knowledge: 0 },
        weapon: 'Spear - Strength Melee - d8+2 phy - One-Handed',
        inventory: 'torch, 50 feet of rope, basic supplies, handful of gold, bundle of offerings or sigil of your god',
    },
    Warrior: {
        traits: { agility: 1, strength: 2, finesse: 0, instinct: 0, presence: -1, knowledge: 0 },
        weapon: 'Broadsword - Strength Melee - d8+3 phy - One-Handed',
        inventory: 'torch, 50 feet of rope, basic supplies, handful of gold, trophy from a past victory',
    },
};

export const SUBCLASS_OPTIONS: Record<CharacterClass, string[]> = {
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

export const ANCESTRY_OPTIONS = [
    'Clank', 'Firbolg', 'Human', 'Drakona', 'Fungril', 'Infernis', 'Dwarf', 'Galapa', 'Katari',
    'Elf', 'Giant', 'Orc', 'Faerie', 'Goblin', 'Ribbet', 'Faun', 'Halfling', 'Simiah',
] as const;

export const COMMUNITY_OPTIONS = [
    'Highborne', 'Ridgeborne', 'Underborne', 'Loreborne', 'Seaborne', 'Wanderborne', 'Orderborne', 'Slyborne', 'Wildborne',
] as const;

export const SECTIONS: { key: string; label: string; icon: React.ReactNode }[] = [
    { key: 'info', label: 'Info', icon: <FaUser /> },
    { key: 'traits', label: 'Traits', icon: <FaDna /> },
    { key: 'health', label: 'Health', icon: <FaHeartbeat /> },
    { key: 'weapons', label: 'Weapons', icon: <FaShieldAlt /> },
    { key: 'experiences', label: 'Experiences', icon: <FaBook /> },
    { key: 'features', label: 'Features', icon: <FaStar /> },
    { key: 'inventory', label: 'Inventory', icon: <FaBoxOpen /> },
    // Rally only for Bard
]; 