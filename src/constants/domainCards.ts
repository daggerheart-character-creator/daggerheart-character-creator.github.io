import { CLASS_DETAILS } from './classDetails';

export interface DomainCard {
    name: string;
    level: number;
    domain: string;
    type: 'ability' | 'spell' | 'grimoire';
    recallCost: number;
    description: string;
}

export const DOMAIN_CARDS: Record<string, DomainCard[]> = {
    Arcana: [
        {
            name: "Rune Ward",
            level: 1,
            domain: "Arcana",
            type: "spell",
            recallCost: 0,
            description: "You have a deeply personal trinket that can be infused with protective magic and held as a ward by you or an ally. Describe what it is and why it's important to you. The ward's holder can spend a Hope to reduce incoming damage by 1d8. If the Ward Die result is 8, the ward's power ends after it reduces damage this turn. It can be recharged for free on your next rest."
        },
        {
            name: "Cinder Grasp",
            level: 1,
            domain: "Arcana",
            type: "spell",
            recallCost: 0,
            description: "Make a Spellcast Roll against a target within Melee range. On a success, the target instantly bursts into flames, takes 1d20+3 magic damage, and is temporarily lit On Fire. When a creature acts while On Fire, they must take an extra 2d6 magic damage if they are still On Fire at the end of their action."
        },
        {
            name: "Blink Out",
            level: 1,
            domain: "Arcana",
            type: "spell",
            recallCost: 0,
            description: "Make a Spellcast Roll (12). On a success, spend a Hope to teleport to another point you can see within Far range. If any willing creatures are within Very Close range, spend an additional Hope for each creature to bring them with you."
        },
        {
            name: "Unleash Chaos",
            level: 1,
            domain: "Arcana",
            type: "spell",
            recallCost: 1,
            description: "At the beginning of a session, place a number of tokens equal to your Spellcast trait on this card. Make a Spellcast Roll against a target within Far range and spend any number of tokens to channel raw energy from within yourself to unleash against them. On a success, roll a number of d10s equal to the tokens you spent and deal that much magic damage to the target. Mark a Stress to replenish this card with tokens (up to your Spellcast trait). At the end of each session, clear all unspent tokens."
        },
        {
            name: "Wall Walk",
            level: 2,
            domain: "Arcana",
            type: "spell",
            recallCost: 1,
            description: "Spend a Hope to allow a creature you can touch to climb on walls and ceilings as easily as walking on the ground. This lasts until the end of the scene or you cast Wall Walk again."
        },
        {
            name: "Floating Eye",
            level: 2,
            domain: "Arcana",
            type: "spell",
            recallCost: 0,
            description: "Spend a Hope to create a single, small floating orb that you can move anywhere within Very Far range. While this spell is active, you can see through the orb as though you're looking out from its position. You can transition between using your own senses and seeing through the orb freely. If the orb takes damage or moves out of range, the spell ends."
        },
        {
            name: "Counterspell",
            level: 3,
            domain: "Arcana",
            type: "spell",
            recallCost: 2,
            description: "You can interrupt a magical effect taking place by making a reaction roll against the caster's Spellcast Roll. On a success, the magical effect is negated and the caster marks a Stress."
        }
    ],
    Blade: [
        {
            name: "Blade Dance",
            level: 1,
            domain: "Blade",
            type: "ability",
            recallCost: 0,
            description: "When you make a weapon attack, you can mark a Stress to gain a +2 bonus to your attack roll."
        },
        {
            name: "Weapon Mastery",
            level: 1,
            domain: "Blade",
            type: "ability",
            recallCost: 0,
            description: "Choose a weapon type. When you attack with that weapon type, you gain a +1 bonus to your damage roll."
        },
        {
            name: "Precise Strike",
            level: 2,
            domain: "Blade",
            type: "ability",
            recallCost: 1,
            description: "When you succeed on a weapon attack, you can mark a Stress to deal an additional 1d6 damage."
        },
        {
            name: "Blade-touched",
            level: 7,
            domain: "Blade",
            type: "ability",
            recallCost: 1,
            description: "When 4 or more of the domain cards in your loadout are from the Blade domain, gain the following benefits: +2 bonus to your attack rolls, +4 bonus to your Severe damage threshold."
        }
    ],
    Bone: [
        {
            name: "Tactical Awareness",
            level: 1,
            domain: "Bone",
            type: "ability",
            recallCost: 0,
            description: "You have advantage on rolls to predict enemy movements and tactics."
        },
        {
            name: "Body Control",
            level: 1,
            domain: "Bone",
            type: "ability",
            recallCost: 0,
            description: "You can mark a Stress to gain a +2 bonus to any physical action roll."
        },
        {
            name: "Combat Reflexes",
            level: 2,
            domain: "Bone",
            type: "ability",
            recallCost: 1,
            description: "When you would be surprised or caught off guard, you can mark a Stress to act normally instead."
        }
    ],
    Codex: [
        {
            name: "Book of Ava",
            level: 1,
            domain: "Codex",
            type: "grimoire",
            recallCost: 2,
            description: "Power Push: Make a Spellcast Roll against a target within Melee range. On a success, they're knocked back to Far range and take d10+2 magic damage using your Proficiency."
        },
        {
            name: "Book of Tyfar",
            level: 1,
            domain: "Codex",
            type: "grimoire",
            recallCost: 2,
            description: "Wild Flame: Make a Spellcast Roll against up to three adversaries within Melee range. Targets you succeed against take 2d6 magic damage and must mark a Stress as flames erupt from your hand."
        },
        {
            name: "Book of Vagras",
            level: 1,
            domain: "Codex",
            type: "grimoire",
            recallCost: 2,
            description: "Runic Lock: Make a Spellcast Roll (15) on an object you're touching that can close (such as a lock, chest, or box). Once per rest on a success, you can lock the object so it can only be opened by creatures of your choice. Someone with access to magic and an hour of time to study the spell can break it. Tava's Armor: Spend a Hope to give a target you can touch a +1 bonus to their Armor Score until their next rest or you cast Tava's Armor again. Magic Hand: You conjure a magical hand with the same size and strength as your own within Far range. Ice Spike: Make a Spellcast Roll (12) to summon a large ice spike within Far range. If you use it as a weapon, make the Spellcast Roll against the target's Difficulty instead. On a success, deal d6 physical damage using your Proficiency. Mysterious Mist: Make a Spellcast Roll (13) to cast a temporary thick fog that gathers in a stationary area within Very Close range. The fog heavily obscures this area and everything in it."
        },
        {
            name: "Book of Sages",
            level: 1,
            domain: "Codex",
            type: "grimoire",
            recallCost: 2,
            description: "Slumber: Make a Spellcast Roll against a target within Very Close range. On a success, they're Asleep until they take damage or the GM spends a Fear on their turn to clear this condition. Arcane Barrage: Once per rest, spend any number of Hope and shoot magical projectiles that strike a target of your choice within Close range. Roll a number of d6s equal to the Hope spent and deal that much magic damage to the target. Telepathy: Spend a Hope to open a line of mental communication with one target you can see. This connection lasts until your next rest or you cast Telepathy again."
        },
        {
            name: "Book of Sitil",
            level: 2,
            domain: "Codex",
            type: "grimoire",
            recallCost: 2,
            description: "Adjust Appearance: You magically shift your appearance and clothing to avoid recognition. Parallela: Spend 2 Hope to cast this spell on yourself or an ally within Close range. The next time the target makes an attack, they can hit an additional target within range that their attack roll would succeed against. You can only hold this spell on one creature at a time. Illusion: Make a Spellcast Roll (14). On a success, create a temporary visual illusion no larger than you within Close range that lasts for as long as you look at it. It holds up to scrutiny until an observer is within Melee range."
        },
        {
            name: "Codex-touched",
            level: 7,
            domain: "Codex",
            type: "ability",
            recallCost: 2,
            description: "When 4 or more of the domain cards in your loadout are from the Codex domain, gain the following benefits: You can mark a Stress to add your Proficiency to a Spellcast Roll. Once per rest, replace this card with any card from your vault without paying its Recall Cost."
        }
    ],
    Grace: [
        {
            name: "Enrapture",
            level: 1,
            domain: "Grace",
            type: "spell",
            recallCost: 0,
            description: "Make a Spellcast Roll against a target within Close range. On a success, they become temporarily Enraptured. While Enraptured, a target's attention is fixed on you, narrowing their field of view and drowning out any sound but your voice. Once per rest on a success, you can mark a Stress to force the Enraptured target to mark a Stress as well."
        },
        {
            name: "Inspirational Words",
            level: 1,
            domain: "Grace",
            type: "ability",
            recallCost: 1,
            description: "Your speech is imbued with power. After a long rest, place a number of tokens on this card equal to your Presence. When you speak with an ally, you can spend a token from this card to give them one benefit from the following options: Your ally clears a Stress, Your ally clears a Hit Point, Your ally gains a Hope. When you take a long rest, clear all unspent tokens."
        },
        {
            name: "Troublemaker",
            level: 2,
            domain: "Grace",
            type: "ability",
            recallCost: 2,
            description: "When you taunt or provoke a target within Far range, make a Presence Roll against them. Once per rest on a success, roll a number of d4s equal to your Proficiency. The target must mark Stress equal to the highest result rolled."
        },
        {
            name: "Invisibility",
            level: 3,
            domain: "Grace",
            type: "spell",
            recallCost: 1,
            description: "Make a Spellcast Roll (10). On a success, mark a Stress and choose one of the following effects: You become invisible until you take an action, You can make one ally invisible until they take an action, You can make yourself and one ally invisible until either of you takes an action."
        }
    ],
    Midnight: [
        {
            name: "Pick and Pull",
            level: 1,
            domain: "Midnight",
            type: "ability",
            recallCost: 0,
            description: "You have advantage on action rolls to pick nonmagical locks, disarm nonmagical traps, or steal items from a target (either through stealth or by force)."
        },
        {
            name: "Chokehold",
            level: 1,
            domain: "Midnight",
            type: "ability",
            recallCost: 0,
            description: "When you position yourself behind a creature who's about your size, you can mark a Stress to pull them into a chokehold, making them temporarily Vulnerable. When a creature attacks a target who is Vulnerable in this way, they deal an extra 2d6 damage."
        },
        {
            name: "Hush",
            level: 1,
            domain: "Midnight",
            type: "spell",
            recallCost: 0,
            description: "Make a Spellcast Roll against a target within Close range. On a success, spend a Hope to conjure suppressive magic around the target that encompasses everything within Very Close range. While this spell is active, all creatures in the area are Silenced and can't make any sound."
        },
        {
            name: "Rain of Blades",
            level: 2,
            domain: "Midnight",
            type: "spell",
            recallCost: 1,
            description: "Make a Spellcast Roll against all targets within Close range. On a success, spend a Hope to conjure a storm of magical blades that rain down on your targets. Each target takes 2d6+2 magic damage and must mark a Stress."
        }
    ],
    Sage: [
        {
            name: "Nature's Touch",
            level: 1,
            domain: "Sage",
            type: "spell",
            recallCost: 0,
            description: "Spend a Hope to touch a plant or animal and gain insight into its nature and recent experiences."
        },
        {
            name: "Wild Shape",
            level: 1,
            domain: "Sage",
            type: "ability",
            recallCost: 0,
            description: "Mark a Stress to transform into a small animal for up to an hour. While transformed, you can't use weapons or cast spells, but you gain the animal's movement abilities and can communicate with other animals of the same type."
        },
        {
            name: "Natural Healing",
            level: 2,
            domain: "Sage",
            type: "spell",
            recallCost: 1,
            description: "Spend a Hope to heal 1d6+2 Hit Points on yourself or an ally within Close range."
        }
    ],
    Splendor: [
        {
            name: "Healing Touch",
            level: 1,
            domain: "Splendor",
            type: "spell",
            recallCost: 0,
            description: "Spend a Hope to heal 1d4+1 Hit Points on yourself or an ally within Close range."
        },
        {
            name: "Life Force",
            level: 1,
            domain: "Splendor",
            type: "ability",
            recallCost: 0,
            description: "When you heal an ally, you can mark a Stress to heal an additional 1d4 Hit Points."
        },
        {
            name: "Revitalize",
            level: 2,
            domain: "Splendor",
            type: "spell",
            recallCost: 1,
            description: "Spend a Hope to clear 1d4 Stress on yourself or an ally within Close range."
        }
    ],
    Valor: [
        {
            name: "Shield Wall",
            level: 1,
            domain: "Valor",
            type: "ability",
            recallCost: 0,
            description: "When an ally within Close range would take damage, you can mark a Stress to reduce that damage by 1d6."
        },
        {
            name: "Rallying Cry",
            level: 1,
            domain: "Valor",
            type: "ability",
            recallCost: 1,
            description: "Once per rest, when you succeed on an attack, you and all allies who can see or hear you can clear a Hit Point or 1d4 Stress."
        },
        {
            name: "Inevitable",
            level: 6,
            domain: "Valor",
            type: "ability",
            recallCost: 1,
            description: "When you fail an action roll, your next action roll has advantage."
        },
        {
            name: "Rise Up",
            level: 6,
            domain: "Valor",
            type: "ability",
            recallCost: 2,
            description: "Gain a bonus to your Severe threshold equal to your Proficiency. When you mark 1 or more Hit Points from an attack, clear a Stress."
        },
        {
            name: "Valor-touched",
            level: 7,
            domain: "Valor",
            type: "ability",
            recallCost: 1,
            description: "When 4 or more of the domain cards in your loadout are from the Valor domain, gain the following benefits: +1 bonus to your Armor Score, When you mark 1 or more Hit Points without marking an Armor Slot, clear an Armor Slot."
        }
    ]
};

// Helper function to get available domain cards for a character
export function getAvailableDomainCards(characterClass: string, characterLevel: number): DomainCard[] {
    if (!characterClass) return [];

    const classDetail = CLASS_DETAILS[characterClass];
    if (!classDetail) return [];

    const availableCards: DomainCard[] = [];

    // Get cards from the character's domains (up to their level)
    for (const domain of classDetail.domains) {
        const domainCards = DOMAIN_CARDS[domain] || [];
        const availableForDomain = domainCards.filter(card => card.level <= characterLevel);
        availableCards.push(...availableForDomain);
    }

    return availableCards.sort((a, b) => a.level - b.level || a.name.localeCompare(b.name));
}

// Helper function to get domain cards by domain
export function getDomainCardsByDomain(domain: string): DomainCard[] {
    return DOMAIN_CARDS[domain] || [];
} 