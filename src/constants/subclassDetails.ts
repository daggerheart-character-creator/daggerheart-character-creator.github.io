import type { SubclassDetail } from '../types/characterTypes';

export const SUBCLASS_DETAILS: Record<string, Record<string, SubclassDetail>> = {
    Bard: {
        Troubadour: {
            name: 'Troubadour',
            description: 'Play the Troubadour if you want to play music to bolster your allies.',
            spellcastTrait: 'Presence',
            foundationFeature: {
                name: 'Gifted Performer',
                description: 'Describe how you perform for others. You can play each song once per long rest: Relaxing Song (clear a Hit Point), Epic Song (make a target Vulnerable), Heartbreaking Song (gain a Hope).'
            },
            specializationFeature: {
                name: 'Maestro',
                description: 'When you give a Rally Die to an ally, they can gain a Hope or clear a Stress.'
            },
            masteryFeature: {
                name: 'Virtuoso',
                description: 'You can perform each of your “Gifted Performer” feature’s songs twice instead of once per long rest.'
            }
        },
        Wordsmith: {
            name: 'Wordsmith',
            description: 'Play the Wordsmith if you want to use clever wordplay and captivate crowds.',
            spellcastTrait: 'Presence',
            foundationFeature: {
                name: 'Rousing Speech & Heart of a Poet',
                description: 'Rousing Speech: Once per long rest, give a heartfelt speech to clear 2 Stress on all allies within Far range. Heart of a Poet: After impressing, persuading, or offending, spend a Hope to add a d4 to the roll.'
            },
            specializationFeature: {
                name: 'Eloquent',
                description: 'Once per session, your moving words boost morale.'
            },
            masteryFeature: {
                name: 'Master Orator',
                description: 'Your words can sway crowds and inspire allies beyond normal limits.'
            }
        }
    },
    Druid: {
        'Warden of the Elements': {
            name: 'Warden of the Elements',
            description: 'Play the Warden of the Elements if you want to embody the natural elements of the wild.',
            spellcastTrait: 'Instinct',
            foundationFeature: {
                name: 'Elemental Incarnation',
                description: 'Mark a Stress to Channel one of the following elements: Fire, Earth, Water, Air. Each grants a unique benefit until you take Severe damage or rest.'
            },
            specializationFeature: {
                name: 'Elemental Aura',
                description: 'Once per rest while Channeling, assume an aura matching your element, affecting targets within Close range.'
            },
            masteryFeature: {
                name: 'Elemental Dominion',
                description: 'While Channeling, gain a powerful benefit based on your element.'
            }
        },
        'Warden of Renewal': {
            name: 'Warden of Renewal',
            description: 'Play the Warden of Renewal if you want to use powerful magic to heal your party.',
            spellcastTrait: 'Instinct',
            foundationFeature: {
                name: 'Clarity of Nature & Regeneration',
                description: 'Clarity of Nature: Once per long rest, create a space of serenity to clear Stress. Regeneration: Touch a creature and spend 3 Hope to clear 1d4 Hit Points.'
            },
            specializationFeature: {
                name: 'Regenerative Reach',
                description: 'You can target creatures within Very Close range with your “Regeneration” feature.'
            },
            masteryFeature: {
                name: 'Warden’s Protection',
                description: 'Once per long rest, spend 2 Hope to clear 2 Hit Points on 1d4 allies within Close range.'
            }
        }
    },
    Guardian: {
        Stalwart: {
            name: 'Stalwart',
            description: 'Play the Stalwart if you want to take heavy blows and keep fighting.',
            foundationFeature: {
                name: 'Unwavering & Iron Will',
                description: 'Unwavering: Gain a permanent +1 bonus to your damage thresholds. Iron Will: When you take physical damage, you can mark an additional Armor Slot to reduce the severity.'
            },
            specializationFeature: {
                name: 'Unrelenting & Partners-in-Arms',
                description: 'Unrelenting: Gain a permanent +2 bonus to your damage thresholds. Partners-in-Arms: When an ally within Very Close range takes damage, you can mark an Armor Slot to reduce the severity by one threshold.'
            },
            masteryFeature: {
                name: 'Undaunted & Loyal Protector',
                description: 'Undaunted: Gain a permanent +3 bonus to your damage thresholds. Loyal Protector: When an ally within Close range has 2 or fewer Hit Points and would take damage, you can mark a Stress to take the damage instead.'
            }
        },
        Vengeance: {
            name: 'Vengeance',
            description: 'Play the Vengeance if you want to strike down enemies who harm you or your allies.',
            foundationFeature: {
                name: 'At Ease & Revenge',
                description: 'At Ease: Gain an additional Stress slot. Revenge: When an adversary within Melee range succeeds on an attack against you, you can mark 2 Stress to force the attacker to mark a Hit Point.'
            },
            specializationFeature: {
                name: 'Act of Reprisal',
                description: 'When an adversary damages an ally within range, you can mark Stress to retaliate.'
            },
            masteryFeature: {
                name: 'Relentless Pursuit',
                description: 'You become a terrifying foe, able to pursue and punish those who harm your allies.'
            }
        }
    },
    Ranger: {
        Beastbound: {
            name: 'Beastbound',
            description: 'Play the Beastbound if you want to form a deep bond with an animal ally.',
            foundationFeature: {
                name: 'Companion',
                description: 'You have an animal companion. They stay by your side unless you tell them otherwise. Level up your companion as you level up.'
            },
            specializationFeature: {
                name: 'Expert Training & Battle-Bonded',
                description: 'Expert Training: Choose an additional level-up option for your companion. Battle-Bonded: When an adversary attacks you while within your companion’s Melee range, you gain a +2 bonus to Evasion.'
            },
            masteryFeature: {
                name: 'Advanced Training & Loyal Friend',
                description: 'Advanced Training: Choose two additional level-up options for your companion. Loyal Friend: Once per long rest, you or your companion can take damage for each other.'
            }
        },
        Wayfinder: {
            name: 'Wayfinder',
            description: 'Play the Wayfinder if you want to hunt your prey and strike with deadly force.',
            foundationFeature: {
                name: 'Ruthless Predator',
                description: 'When you make a damage roll, you can mark a Stress to gain a +1 bonus to Proficiency. When you deal Severe damage, the adversary must mark a Stress.'
            },
            specializationFeature: {
                name: 'Relentless Pursuit',
                description: 'You can track and pursue your Focus with deadly efficiency.'
            },
            masteryFeature: {
                name: 'Master Hunter',
                description: 'You are unmatched in tracking and eliminating your chosen prey.'
            }
        }
    },
    Rogue: {
        Nightwalker: {
            name: 'Nightwalker',
            description: 'Play the Nightwalker if you want to manipulate shadows to maneuver through the environment.',
            spellcastTrait: 'Finesse',
            foundationFeature: {
                name: 'Shadow Stepper',
                description: 'You can move from shadow to shadow. Mark a Stress to disappear from one shadow and reappear in another within Far range, becoming Cloaked.'
            },
            specializationFeature: {
                name: 'Dark Cloud & Adrenaline',
                description: 'Dark Cloud: Create a temporary dark cloud that blocks line of sight. Adrenaline: While you’re Vulnerable, add your level to your damage rolls.'
            },
            masteryFeature: {
                name: 'Fleeting Shadow & Vanishing Act',
                description: 'Fleeting Shadow: Gain +1 Evasion and can Shadow Step within Very Far range. Vanishing Act: Mark a Stress to become Cloaked at any time, clearing Restrained if you have it.'
            }
        },
        Syndicate: {
            name: 'Syndicate',
            description: 'Play the Syndicate if you want to have a web of contacts everywhere you go.',
            spellcastTrait: 'Finesse',
            foundationFeature: {
                name: 'Well-Connected',
                description: 'When you arrive in a prominent town or environment, you know somebody who calls this place home. Choose a fact about them.'
            },
            specializationFeature: {
                name: 'Contacts Everywhere',
                description: 'Once per session, briefly call on a shady contact for a benefit.'
            },
            masteryFeature: {
                name: 'Mastermind',
                description: 'You can orchestrate complex schemes and have a network of contacts in every major city.'
            }
        }
    },
    Seraph: {
        'Divine Wielder': {
            name: 'Divine Wielder',
            description: 'Play the Divine Wielder if you want to dominate the battlefield with a legendary weapon.',
            spellcastTrait: 'Strength',
            foundationFeature: {
                name: 'Spirit Weapon & Sparing Touch',
                description: 'Spirit Weapon: Your weapon can fly to attack at range and return. Mark a Stress to target an additional adversary. Sparing Touch: Once per long rest, touch a creature to clear 2 Hit Points or 2 Stress.'
            },
            specializationFeature: {
                name: 'Devout',
                description: 'When you roll Prayer Dice, roll an extra die and discard the lowest. Use Sparing Touch twice per long rest.'
            },
            masteryFeature: {
                name: 'Sacred Resonance',
                description: 'When you roll damage for Spirit Weapon, if any die results match, double their value.'
            }
        },
        'Winged Sentinel': {
            name: 'Winged Sentinel',
            description: 'Play the Winged Sentinel if you want to take flight and strike crushing blows from the sky.',
            spellcastTrait: 'Strength',
            foundationFeature: {
                name: 'Wings of Light',
                description: 'You can fly. Mark a Stress to carry another creature. Spend a Hope to deal extra 1d8 damage on a successful attack.'
            },
            specializationFeature: {
                name: 'Ethereal Visage',
                description: 'While flying, you have advantage on Presence Rolls. On a success with Hope, you can remove a Fear from the GM’s pool instead of gaining Hope.'
            },
            masteryFeature: {
                name: 'Ascendant & Power of the Gods',
                description: 'Ascendant: Gain +4 Severe damage threshold. Power of the Gods: While flying, deal an extra 1d12 damage instead of 1d8.'
            }
        }
    },
    Sorcerer: {
        'Elemental Origin': {
            name: 'Elemental Origin',
            description: 'Play the Elemental Origin if you want to channel raw magic to take the shape of a particular element.',
            spellcastTrait: 'Instinct',
            foundationFeature: {
                name: 'Elementalist',
                description: 'Choose air, earth, fire, lightning, or water. Shape this element into harmless effects. Spend a Hope to gain +2 to a roll or +3 to damage.'
            },
            specializationFeature: {
                name: 'Natural Evasion',
                description: 'Call forth your element to protect you. Mark a Stress to roll a d6 and add to your Evasion against an attack.'
            },
            masteryFeature: {
                name: 'Charged',
                description: 'When you take magic damage, become Charged. When you attack while Charged, clear Charge to gain +10 damage or +3 Difficulty to a reaction roll.'
            }
        },
        'Primal Origin': {
            name: 'Primal Origin',
            description: 'Play the Primal Origin if you want to extend the versatility of your spells in powerful ways.',
            spellcastTrait: 'Instinct',
            foundationFeature: {
                name: 'Primal Magic',
                description: 'You can alter the effects of your spells in creative ways, adapting to the situation.'
            },
            specializationFeature: {
                name: 'Versatile Spellcasting',
                description: 'You can combine effects from multiple spells or domains.'
            },
            masteryFeature: {
                name: 'Primal Mastery',
                description: 'Your spells can affect larger areas, more targets, or have longer durations.'
            }
        }
    },
    Warrior: {
        'Call of the Brave': {
            name: 'Call of the Brave',
            description: 'Play the Call of the Brave if you want to use the might of your enemies to fuel your own power.',
            foundationFeature: {
                name: 'Courage & Battle Ritual',
                description: 'Courage: When you fail a roll with Fear, gain a Hope. Battle Ritual: Once per long rest, clear 2 Stress and gain 2 Hope before a dangerous action.'
            },
            specializationFeature: {
                name: 'Rise to the Challenge',
                description: 'While you have 2 or fewer Hit Points unmarked, roll a d20 as your Hope Die.'
            },
            masteryFeature: {
                name: 'Camaraderie',
                description: 'Initiate a Tag Team Roll one extra time per session. When an ally initiates a Tag Team Roll with you, they spend only 2 Hope.'
            }
        },
        'Call of the Slayer': {
            name: 'Call of the Slayer',
            description: 'Play the Call of the Slayer if you want to strike down adversaries with immense force.',
            foundationFeature: {
                name: 'Slayer',
                description: 'Gain a pool of Slayer Dice. On a roll with Hope, place a d6 on this card instead of gaining Hope. Spend Slayer Dice to add to attack or damage rolls.'
            },
            specializationFeature: {
                name: 'Weapon Specialist',
                description: 'Wield multiple weapons with ease. On a successful attack, spend a Hope to add a secondary weapon’s damage die. Once per long rest, reroll 1s on Slayer Dice.'
            },
            masteryFeature: {
                name: 'Martial Preparation',
                description: 'Your party gains access to the Martial Preparation downtime move. When you train with your party, you and your allies gain bonuses.'
            }
        }
    },
    Wizard: {
        'School of Knowledge': {
            name: 'School of Knowledge',
            description: 'Play the School of Knowledge if you want a keen understanding of the world around you.',
            spellcastTrait: 'Knowledge',
            foundationFeature: {
                name: 'Prepared & Adept',
                description: 'Prepared: Take an extra domain card from a domain you have access to. Adept: Mark a Stress instead of spending Hope to use an Experience, doubling its modifier.'
            },
            specializationFeature: {
                name: 'Accomplished & Perfect Recall',
                description: 'Accomplished: Take an extra domain card. Perfect Recall: Once per rest, reduce Recall Cost by 1 when recalling a domain card.'
            },
            masteryFeature: {
                name: 'Brilliant & Honed Expertise',
                description: 'Brilliant: Take an extra domain card. Honed Expertise: When you use an Experience, roll a d6; on 5+, use it without spending Hope.'
            }
        },
        'School of War': {
            name: 'School of War',
            description: 'Play the School of War if you want to utilize trained magic for violence.',
            spellcastTrait: 'Knowledge',
            foundationFeature: {
                name: 'Battlemage & Face Your Fear',
                description: 'Battlemage: Gain an extra Hit Point slot. Face Your Fear: On a success with Fear on an attack, deal an extra 1d10 magic damage.'
            },
            specializationFeature: {
                name: 'Conjure Shield',
                description: 'Maintain a protective barrier of magic. While you have at least 2 Hope, add your Proficiency to your Evasion.'
            },
            masteryFeature: {
                name: 'Fueled by Fear & Thrive in Chaos',
                description: 'Fueled by Fear: Extra magic damage from Face Your Fear increases to 2d10. Thrive in Chaos: On a successful attack, mark a Stress to force the target to mark an additional Hit Point.'
            }
        }
    }
}; 