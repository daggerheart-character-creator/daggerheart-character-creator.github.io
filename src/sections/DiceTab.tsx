import React, { useState } from 'react';
import { useCharacter } from '../CharacterContext';
import { TRAIT_NAMES } from '../types/traits';

function rollDie(sides: number) {
    return Math.floor(Math.random() * sides) + 1;
}

const DiceTab: React.FC = () => {
    const { currentCharacter } = useCharacter();
    const [selectedTrait, setSelectedTrait] = useState<string>('agility');
    const [modifier, setModifier] = useState<string>('0');
    const [advantage, setAdvantage] = useState<boolean>(false);
    const [disadvantage, setDisadvantage] = useState<boolean>(false);
    const [result, setResult] = useState<any>(null);
    const [selectedWeaponIdx, setSelectedWeaponIdx] = useState<number>(0);
    const [damageResult, setDamageResult] = useState<any>(null);
    const [damageSource, setDamageSource] = useState<'weapon' | 'custom'>('weapon');
    const [customDiceCount, setCustomDiceCount] = useState<number>(1);
    const [customDiceType, setCustomDiceType] = useState<string>('d8');
    const [customModifier, setCustomModifier] = useState<string>('0');

    // Get trait value from character
    const traitValue = Number(currentCharacter[selectedTrait as keyof typeof currentCharacter]) || 0;
    const modifierNum = modifier === '' || isNaN(Number(modifier)) ? 0 : Number(modifier);

    // Get equipped weapons
    const equippedWeapons = currentCharacter.activeWeapons.filter(w => w && w.name);
    const selectedWeapon = equippedWeapons[selectedWeaponIdx] || null;
    // Only count filled (true) proficiency bubbles
    const proficiencyCount = Array.isArray(currentCharacter.proficiency)
        ? currentCharacter.proficiency.filter((v: boolean) => v).length
        : 0;

    function parseDamageDiceType(damageDiceType: string): { sides: number, modifier: number } {
        // e.g., 'd8 phy', '2d6 mag', 'd10', 'd8+3 phy', etc.
        const match = damageDiceType.match(/d(\d+)([+\-]\d+)?/);
        if (!match) return { sides: 6, modifier: 0 };
        const sides = parseInt(match[1], 10);
        const modifier = match[2] ? parseInt(match[2], 10) : 0;
        return { sides, modifier };
    }

    // When weapon or proficiency changes, update custom fields if in weapon mode
    React.useEffect(() => {
        if (damageSource === 'weapon' && selectedWeapon) {
            const { sides, modifier } = parseDamageDiceType(selectedWeapon.damageDiceType);
            setCustomDiceCount(proficiencyCount || 1);
            setCustomDiceType('d' + sides);
            setCustomModifier(String(modifier));
        }
    }, [damageSource, selectedWeapon, proficiencyCount]);

    const handleRoll = () => {
        // Roll two d12s
        const hope = rollDie(12);
        const fear = rollDie(12);
        let d6 = null;
        let advType = null;
        if (advantage && !disadvantage) {
            d6 = rollDie(6);
            advType = 'advantage';
        } else if (!advantage && disadvantage) {
            d6 = rollDie(6);
            advType = 'disadvantage';
        }
        // Total: trait + modifier + hope (if hope > fear) or fear (if fear > hope)
        const base = traitValue + modifierNum;
        let total: number;
        let usedDie: 'hope' | 'fear';
        if (hope > fear) {
            total = base + hope;
            usedDie = 'hope';
        } else if (fear > hope) {
            total = base + fear;
            usedDie = 'fear';
        } else {
            // Tie: use hope
            total = base + hope;
            usedDie = 'hope';
        }
        // Apply d6 for adv/disadvantage
        if (advType === 'advantage') total += d6!;
        if (advType === 'disadvantage') total -= d6!;
        setResult({ hope, fear, d6, advType, traitValue, modifier, total, usedDie });
    };

    const handleModifierBlur = () => {
        if (modifier === '' || isNaN(Number(modifier))) setModifier('0');
    };

    const handleDamageRoll = () => {
        let diceCount = customDiceCount;
        let sides = Number(customDiceType.replace('d', ''));
        let modifier = customModifier === '' || isNaN(Number(customModifier)) ? 0 : Number(customModifier);
        let sourceLabel = '';
        if (damageSource === 'weapon') {
            if (!selectedWeapon) return;
            sourceLabel = selectedWeapon.name;
        } else {
            sourceLabel = 'Custom';
        }
        const dice = Array.from({ length: diceCount }, () => rollDie(sides));
        const total = dice.reduce((a, b) => a + b, 0) + modifier;
        setDamageResult({ sourceLabel, dice, modifier, total, diceCount, sides });
    };

    return (
        <div style={{ padding: 16, maxWidth: 480, margin: '0 auto' }}>
            <h2>Dice Roller</h2>
            <section style={{ marginBottom: 32 }}>
                <h3>Duality Dice (Action Roll)</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 12 }}>
                    <label>
                        Trait:
                        <select value={selectedTrait} onChange={e => setSelectedTrait(e.target.value)} style={{ marginLeft: 8 }}>
                            {TRAIT_NAMES.map(trait => (
                                <option key={trait} value={trait}>
                                    {trait.charAt(0).toUpperCase() + trait.slice(1)} ({currentCharacter[trait] >= 0 ? '+' : ''}{currentCharacter[trait]})
                                </option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Modifier:
                        <span style={{ display: 'inline-flex', alignItems: 'center', marginLeft: 8 }}>
                            <button
                                type="button"
                                onClick={() => setModifier((prev) => String((Number(prev || '0') - 1)))}
                                style={{
                                    width: 28,
                                    height: 28,
                                    fontSize: 18,
                                    marginRight: 2,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: '0 6px',
                                }}
                            >
                                −
                            </button>
                            <input
                                type="text"
                                inputMode="numeric"
                                pattern="-?\d*"
                                value={modifier}
                                onChange={e => setModifier(e.target.value.replace(/[^-\d]/g, ''))}
                                onBlur={handleModifierBlur}
                                style={{ width: 40, textAlign: 'center' }}
                            />
                            <button
                                type="button"
                                onClick={() => setModifier((prev) => String((Number(prev || '0') + 1)))}
                                style={{
                                    width: 28,
                                    height: 28,
                                    fontSize: 18,
                                    marginLeft: 2,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: '0 6px',
                                }}
                            >
                                +
                            </button>
                        </span>
                    </label>
                    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                        <label>
                            <input
                                type="checkbox"
                                checked={advantage}
                                onChange={e => { setAdvantage(e.target.checked); if (e.target.checked) setDisadvantage(false); }}
                            />
                            Advantage (add d6)
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                checked={disadvantage}
                                onChange={e => { setDisadvantage(e.target.checked); if (e.target.checked) setAdvantage(false); }}
                            />
                            Disadvantage (subtract d6)
                        </label>
                    </div>
                    <button onClick={handleRoll} style={{ marginTop: 8, fontSize: 16, padding: '6px 18px' }}>Roll</button>
                </div>
                {result && (
                    <div style={{ marginTop: 16, background: '#23272a', color: '#fff', borderRadius: 8, padding: 16 }}>
                        <div>Trait: <b>{selectedTrait.charAt(0).toUpperCase() + selectedTrait.slice(1)} ({result.traitValue >= 0 ? '+' : ''}{result.traitValue})</b></div>
                        <div>Modifier: <b>{modifierNum >= 0 ? '+' : ''}{modifierNum}</b></div>
                        <div>Hope d12: <b>{result.hope}</b> {result.hope === 12 && '🎉 Critical!'} {result.hope === 1 && '💀 Fumble!'}</div>
                        <div>Fear d12: <b>{result.fear}</b> {result.fear === 12 && '🎉 Critical!'} {result.fear === 1 && '💀 Fumble!'}</div>
                        {result.advType && <div>{result.advType === 'advantage' ? 'Advantage' : 'Disadvantage'} d6: <b>{result.d6}</b></div>}
                        <div style={{ fontSize: 18, marginTop: 8 }}>Total: <b>{result.total} with {result.usedDie}</b></div>
                    </div>
                )}
            </section>
            <section>
                <h3>Damage Roll</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 12 }}>
                    <label>
                        Source:
                        <select value={damageSource} onChange={e => setDamageSource(e.target.value as 'weapon' | 'custom')} style={{ marginLeft: 8 }}>
                            <option value="weapon">Equipped Weapon</option>
                            <option value="custom">Custom</option>
                        </select>
                    </label>
                    {damageSource === 'weapon' && (
                        <label>
                            Weapon:
                            <select value={selectedWeaponIdx} onChange={e => setSelectedWeaponIdx(Number(e.target.value))} style={{ marginLeft: 8 }}>
                                {equippedWeapons.length === 0 && <option value={-1}>No weapon equipped</option>}
                                {equippedWeapons.map((w, idx) => (
                                    <option key={w.name + idx} value={idx}>{w.name} ({w.damageDiceType})</option>
                                ))}
                            </select>
                        </label>
                    )}
                    <label>
                        Number of Dice:
                        <input
                            type="number"
                            min={1}
                            value={customDiceCount}
                            onChange={e => setCustomDiceCount(Math.max(1, Number(e.target.value)))}
                            style={{ width: 40, marginLeft: 8 }}
                            disabled={damageSource === 'weapon'}
                        />
                    </label>
                    <label>
                        Dice Type:
                        <select
                            value={customDiceType}
                            onChange={e => setCustomDiceType(e.target.value)}
                            style={{ marginLeft: 8 }}
                            disabled={damageSource === 'weapon'}
                        >
                            <option value="d4">d4</option>
                            <option value="d6">d6</option>
                            <option value="d8">d8</option>
                            <option value="d10">d10</option>
                            <option value="d12">d12</option>
                            <option value="d20">d20</option>
                        </select>
                    </label>
                    <label>
                        Modifier:
                        <input
                            type="text"
                            inputMode="numeric"
                            pattern="-?\d*"
                            value={customModifier}
                            onChange={e => setCustomModifier(e.target.value.replace(/[^-\d]/g, ''))}
                            style={{ width: 40, marginLeft: 8, textAlign: 'center' }}
                            disabled={damageSource === 'weapon'}
                        />
                    </label>
                    <button
                        onClick={handleDamageRoll}
                        style={{ marginTop: 8, fontSize: 16, padding: '6px 18px' }}
                        disabled={damageSource === 'weapon' ? (!selectedWeapon || proficiencyCount === 0) : (customDiceCount < 1 || isNaN(Number(customDiceType.replace('d', ''))))}
                    >
                        Roll Damage
                    </button>
                </div>
                {damageResult && (
                    <div style={{ marginTop: 16, background: '#23272a', color: '#fff', borderRadius: 8, padding: 16 }}>
                        <div>Source: <b>{damageResult.sourceLabel}</b></div>
                        <div>Rolled: <b>{damageResult.diceCount} × d{damageResult.sides}</b></div>
                        <div>Dice Results: <b>{damageResult.dice.join(', ')}</b></div>
                        {damageResult.modifier !== 0 && <div>Static Modifier: <b>{damageResult.modifier > 0 ? '+' : ''}{damageResult.modifier}</b></div>}
                        <div style={{ fontSize: 18, marginTop: 8 }}>Total: <b>{damageResult.total}</b></div>
                    </div>
                )}
            </section>
        </div>
    );
};

export default DiceTab; 