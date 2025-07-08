export interface ArmorOption {
    name: string;
    baseThresholds: string;
    baseScore: number;
    feature: string;
}

export const ARMOR_OPTIONS: ArmorOption[] = [
    { name: 'Gambeson Armor', baseThresholds: '5 / 11', baseScore: 3, feature: 'Flexible: +1 to Evasion' },
    { name: 'Leather Armor', baseThresholds: '6 / 13', baseScore: 3, feature: '' },
    { name: 'Chainmail Armor', baseThresholds: '7 / 15', baseScore: 4, feature: 'Heavy: −1 to Evasion' },
    { name: 'Full Plate Armor', baseThresholds: '8 / 17', baseScore: 4, feature: 'Very Heavy: −2 to Evasion; −1 to Agility' },
]; 