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
    }
}; 