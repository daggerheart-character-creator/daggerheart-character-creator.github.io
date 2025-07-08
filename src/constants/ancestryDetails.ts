import type { AncestryDetail } from '../types/characterTypes';

export const ANCESTRY_DETAILS: Record<string, AncestryDetail> = {
    Clank: {
        name: 'Clank',
        description: 'Sentient mechanical beings built from a variety of materials, with bespoke construction and potentially immortal bodies.',
        feature1: {
            name: 'Purposeful Design',
            description: 'At character creation, choose one of your Experiences that best aligns with your purpose and gain a permanent +1 bonus to it.'
        },
        feature2: {
            name: 'Efficient',
            description: 'When you take a short rest, you can choose a long rest move instead of a short rest move.'
        }
    },
    Drakona: {
        name: 'Drakona',
        description: 'Wingless dragonfolk with thick scales and elemental breath, known for their natural armor and long lifespans.',
        feature1: {
            name: 'Scales',
            description: 'When you would take Severe damage, you can mark a Stress to mark 1 fewer Hit Points.'
        },
        feature2: {
            name: 'Elemental Breath',
            description: 'Choose an element for your breath. Use it as an Instinct weapon (d8 magic damage, Proficiency) against targets within Very Close range.'
        }
    },
    Dwarf: {
        name: 'Dwarf',
        description: 'Short, broad, and resilient humanoids with thick hair and keratin-rich skin, often decorated with gems and tattoos.',
        feature1: {
            name: 'Thick Skin',
            description: 'When you take Minor damage, you can mark 2 Stress instead of marking a Hit Point.'
        },
        feature2: {
            name: 'Increased Fortitude',
            description: 'Spend 3 Hope to halve incoming physical damage.'
        }
    },
    Elf: {
        name: 'Elf',
        description: 'Tall, pointed-eared humanoids with attuned senses and the ability to enter a celestial trance for rest.',
        feature1: {
            name: 'Quick Reactions',
            description: 'Mark a Stress to gain advantage on a reaction roll.'
        },
        feature2: {
            name: 'Celestial Trance',
            description: 'During a rest, you can drop into a trance to choose an additional downtime move.'
        }
    },
    Faerie: {
        name: 'Faerie',
        description: 'Winged humanoids with insectile features, capable of metamorphosis and flight.',
        feature1: {
            name: 'Luckbender',
            description: 'Once per session, after you or a willing ally within Close range makes an action roll, you can spend 3 Hope to reroll the Duality Dice.'
        },
        feature2: {
            name: 'Wings',
            description: 'You can fly. While flying, mark a Stress after an adversary attacks you to gain +2 Evasion against that attack.'
        }
    },
    Firbolg: {
        name: 'Firbolg',
        description: 'Tall, strong, bovine humanoids with fur and horns, known for their charging attacks and resilience.',
        feature1: {
            name: 'Charge',
            description: 'When you succeed on an Agility Roll to move from Far/Very Far into Melee range, mark a Stress to deal 1d12 physical damage to all targets within Melee range.'
        },
        feature2: {
            name: 'Unshakable',
            description: 'When you would mark a Stress, roll a d6. On a 6, don’t mark it.'
        }
    },
    Fungril: {
        name: 'Fungril',
        description: 'Humanoid mushrooms with a variety of forms and the ability to communicate via mycelial networks.',
        feature1: {
            name: 'Fungril Network',
            description: 'Make an Instinct Roll (12) to use your mycelial array to speak with others of your ancestry across any distance.'
        },
        feature2: {
            name: 'Death Connection',
            description: 'While touching a corpse that died recently, mark a Stress to extract one memory related to a specific emotion or sensation.'
        }
    },
    Galapa: {
        name: 'Galapa',
        description: 'Anthropomorphic turtles with domed shells, able to retract for protection and live long lives.',
        feature1: {
            name: 'Shell',
            description: 'Gain a bonus to your damage thresholds equal to your Proficiency.'
        },
        feature2: {
            name: 'Retract',
            description: 'Mark a Stress to retract into your shell. While in your shell, you have resistance to physical damage, disadvantage on action rolls, and can’t move.'
        }
    },
    Giant: {
        name: 'Giant',
        description: 'Towering humanoids with up to three eyes, known for their endurance and reach.',
        feature1: {
            name: 'Endurance',
            description: 'Gain an additional Hit Point slot at character creation.'
        },
        feature2: {
            name: 'Reach',
            description: 'Treat any weapon, ability, spell, or feature with Melee range as though it has Very Close range instead.'
        }
    },
    Goblin: {
        name: 'Goblin',
        description: 'Small humanoids with large eyes and ears, keen senses, and surefooted agility.',
        feature1: {
            name: 'Surefooted',
            description: 'You ignore disadvantage on Agility Rolls.'
        },
        feature2: {
            name: 'Danger Sense',
            description: 'Once per rest, mark a Stress to force an adversary to reroll an attack against you or an ally within Very Close range.'
        }
    },
    Halfling: {
        name: 'Halfling',
        description: 'Small, youthful humanoids with large feet and acute senses, attuned to the magnetic fields of the world.',
        feature1: {
            name: 'Luckbringer',
            description: 'At the start of each session, everyone in your party gains a Hope.'
        },
        feature2: {
            name: 'Internal Compass',
            description: 'When you roll a 1 on your Hope Die, you can reroll it.'
        }
    },
    Human: {
        name: 'Human',
        description: 'Adaptable, enduring humanoids with dexterous hands and a wide variety of builds.',
        feature1: {
            name: 'High Stamina',
            description: 'Gain an additional Stress slot at character creation.'
        },
        feature2: {
            name: 'Adaptability',
            description: 'When you fail a roll that used one of your Experiences, you can mark a Stress to reroll.'
        }
    },
    Infernis: {
        name: 'Infernis',
        description: 'Horned, demonic humanoids with dread visages and long lifespans.',
        feature1: {
            name: 'Fearless',
            description: 'When you roll with Fear, you can mark 2 Stress to change it into a roll with Hope instead.'
        },
        feature2: {
            name: 'Dread Visage',
            description: 'You have advantage on rolls to intimidate hostile creatures.'
        }
    },
    Katari: {
        name: 'Katari',
        description: 'Feline humanoids with retractable claws, keen senses, and a variety of fur patterns.',
        feature1: {
            name: 'Feline Instincts',
            description: 'When you make an Agility Roll, you can spend 2 Hope to reroll your Hope Die.'
        },
        feature2: {
            name: 'Retracting Claws',
            description: 'Make an Agility Roll to scratch a target within Melee range. On a success, they become temporarily Vulnerable.'
        }
    },
    Orc: {
        name: 'Orc',
        description: 'Muscular humanoids with boar-like tusks, known for their resilience and powerful attacks.',
        feature1: {
            name: 'Sturdy',
            description: 'When you have 1 Hit Point remaining, attacks against you have disadvantage.'
        },
        feature2: {
            name: 'Tusks',
            description: 'When you succeed on an attack within Melee range, you can spend a Hope to gore the target, dealing an extra 1d6 damage.'
        }
    },
    Ribbet: {
        name: 'Ribbet',
        description: 'Anthropomorphic frogs with webbed hands and feet, able to breathe underwater and use their long tongues as weapons.',
        feature1: {
            name: 'Amphibious',
            description: 'You can breathe and move naturally underwater.'
        },
        feature2: {
            name: 'Long Tongue',
            description: 'Use your long tongue to grab things within Close range. Mark a Stress to use it as a Finesse Close weapon (d12 physical damage, Proficiency).'
        }
    },
    Faun: {
        name: 'Faun',
        description: 'Humanoid goats with horns, cloven hooves, and powerful leaps.',
        feature1: {
            name: 'Caprine Leap',
            description: 'Leap anywhere within Close range as normal movement, vaulting obstacles or scaling barriers.'
        },
        feature2: {
            name: 'Kick',
            description: 'When you succeed on an attack within Melee range, mark a Stress to deal an extra 2d6 damage and knock back yourself or the target to Very Close range.'
        }
    },
    Simiah: {
        name: 'Simiah',
        description: 'Anthropomorphic monkeys and apes with prehensile feet and tails, skilled climbers and agile movers.',
        feature1: {
            name: 'Natural Climber',
            description: 'You have advantage on Agility Rolls that involve balancing and climbing.'
        },
        feature2: {
            name: 'Nimble',
            description: 'Gain a permanent +1 bonus to your Evasion at character creation.'
        }
    }
}; 