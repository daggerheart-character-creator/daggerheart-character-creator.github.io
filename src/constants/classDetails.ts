
export interface ClassFeature {
    name: string;
    description: string;
}

export interface ClassDetail {
    name: string;
    domains: string[];
    description: string;
    classFeatures: ClassFeature[];
    startingEvasion: number;
    startingHP: number;
    hopeFeature: { name: string; description: string };
}

export const CLASS_DETAILS: Record<string, ClassDetail> = {
    Bard: {
        name: "Bard",
        domains: ["Grace", "Codex"],
        description: `Bards are the most charismatic people in all the realms. Masters of captivation, they specialize in performance, storytelling, and social situations. Bards thrive in bringing people together, but can also tear a party apart.`,
        classFeatures: [
            {
                name: "Rally",
                description: `Once per session, describe how you rally the party and give yourself and each of your allies a Rally Die. At level 1, your Rally Die is a d6. A PC can spend their Rally Die to roll it, adding the result to their action roll, reaction roll, damage roll, or to clear a number of Stress equal to the result. Your Rally Die increases at higher levels.`
            }
        ],
        startingEvasion: 10,
        startingHP: 5,
        hopeFeature: {
            name: "Make a Scene",
            description: `Spend 3 Hope to temporarily Distract a target within Close range, giving them a -2 penalty to their Difficulty.`
        }
    },
    Druid: {
        name: "Druid",
        domains: ["Sage", "Arcana"],
        description: `Druids are called to protect the magic of the wilderness. They can transform into beasts and shape nature itself, often working in small groups or alone.`,
        classFeatures: [
            {
                name: "Beastform",
                description: `Mark a Stress to magically transform into a creature of your tier or lower from the Beastform list. While transformed, you can’t use weapons or cast spells from domain cards, but you can use other features or abilities. Spells cast before transforming stay active. You gain the Beastform’s features, add their Evasion bonus to your Evasion, and use the trait specified in their statistics for your attack.`
            }
        ],
        startingEvasion: 10,
        startingHP: 6,
        hopeFeature: {
            name: "Evolution",
            description: `Spend 3 Hope to transform into Beastform without marking a Stress. When you do, choose one trait to raise by +1 until you drop out of that Beastform.`
        }
    },
    Guardian: {
        name: "Guardian",
        domains: ["Valor", "Blade"],
        description: `Guardians are martial professionals known for their unshakeable fortitude and loyalty. They defend their cohort above all else, fighting with remarkable ferocity even against overwhelming odds.`,
        classFeatures: [
            {
                name: "Unstoppable",
                description: `Once per long rest, you can become Unstoppable. You gain an Unstoppable Die (d4 at level 1). While Unstoppable, reduce the severity of physical damage by one threshold, add the Unstoppable Die to your damage roll, and you can’t be Restrained or Vulnerable.`
            }
        ],
        startingEvasion: 9,
        startingHP: 7,
        hopeFeature: {
            name: "Frontline Tank",
            description: `Spend 3 Hope to clear 2 Armor Slots.`
        }
    },
    Ranger: {
        name: "Ranger",
        domains: ["Bone", "Sage"],
        description: `Rangers are indispensable trackers and navigators, using keen eyes and graceful haste to hunt down enemies and survive in the wilds.`,
        classFeatures: [
            {
                name: "Ranger’s Focus",
                description: `Spend a Hope and make an attack against a target. On a success, deal normal damage and temporarily make the target your Focus. While focused, you know their direction, they must mark a Stress when you deal damage, and you can reroll your Duality Dice if you fail an attack against them.`
            }
        ],
        startingEvasion: 12,
        startingHP: 6,
        hopeFeature: {
            name: "Hold Them Off",
            description: `Spend 3 Hope when you succeed on an attack with a weapon to use that same roll against two additional adversaries within range of the attack.`
        }
    },
    Rogue: {
        name: "Rogue",
        domains: ["Midnight", "Grace"],
        description: `Rogues are scoundrels and masters of stealth, trickery, and underhanded tactics. They move through the world anonymously, manipulating shadow and movement.`,
        classFeatures: [
            {
                name: "Cloaked",
                description: `Any time you would be Hidden, you are instead Cloaked. While Cloaked, you remain unseen if stationary.`
            },
            {
                name: "Sneak Attack",
                description: `When you succeed on an attack while Cloaked or with an ally in Melee range, add a number of d6s equal to your tier to your damage roll.`
            }
        ],
        startingEvasion: 12,
        startingHP: 6,
        hopeFeature: {
            name: "Rogue’s Dodge",
            description: `Spend 3 Hope to gain a +2 bonus to your Evasion until the next time an attack succeeds against you, or until your next rest.`
        }
    },
    Seraph: {
        name: "Seraph",
        domains: ["Splendor", "Valor"],
        description: `Seraphs are divine warriors who dominate the battlefield with legendary weapons and holy power. They can heal, protect, and strike with divine might.`,
        classFeatures: [
            {
                name: "Prayer Dice",
                description: `At the beginning of each session, roll a number of d4s equal to your subclass’s Spellcast trait. You can spend Prayer Dice to aid yourself or an ally, reduce damage, add to a roll, or gain Hope. Unspent dice are cleared at the end of the session.`
            }
        ],
        startingEvasion: 9,
        startingHP: 7,
        hopeFeature: {
            name: "Life Support",
            description: `Spend 3 Hope to clear a Hit Point on an ally within Close range.`
        }
    },
    Sorcerer: {
        name: "Sorcerer",
        domains: ["Arcana", "Midnight"],
        description: `Sorcerers are born with innate magical power and learn to wield it for their own ends. Their magic is volatile and powerful, but requires discipline to control.`,
        classFeatures: [
            {
                name: "Arcane Sense",
                description: `Sense magical people and objects within Close range.`
            },
            {
                name: "Minor Illusion",
                description: `Create a minor visual illusion within Close range.`
            },
            {
                name: "Channel Raw Power",
                description: `Once per long rest, place a domain card from your loadout into your vault to gain Hope or enhance a spell’s damage.`
            }
        ],
        startingEvasion: 10,
        startingHP: 6,
        hopeFeature: {
            name: "Volatile Magic",
            description: `Spend 3 Hope to reroll any number of your damage dice on an attack that deals magic damage.`
        }
    },
    Warrior: {
        name: "Warrior",
        domains: ["Blade", "Bone"],
        description: `Warriors are masters of weapons and violence, known for their agility, strength, and relentless training. They thrive in battle and are always seeking to improve their skills.`,
        classFeatures: [
            {
                name: "Battle Ritual",
                description: `Once per long rest, before attempting something dangerous, clear 2 Stress and gain 2 Hope.`
            },
            {
                name: "Courage",
                description: `When you fail a roll with Fear, you gain a Hope.`
            }
        ],
        startingEvasion: 11,
        startingHP: 6,
        hopeFeature: {
            name: "No Mercy",
            description: `Spend 3 Hope to gain a +1 bonus to your attack rolls until your next rest.`
        }
    },
    Wizard: {
        name: "Wizard",
        domains: ["Codex", "Arcana"],
        description: `Wizards are scholars and masters of arcane knowledge, using their intellect to wield powerful magic and manipulate the world around them.`,
        classFeatures: [
            {
                name: "Prepared",
                description: `Take an additional domain card of your level or lower from a domain you have access to.`
            },
            {
                name: "Adept",
                description: `When you Utilize an Experience, you can mark a Stress instead of spending a Hope. If you do, double your Experience modifier for that roll.`
            }
        ],
        startingEvasion: 10,
        startingHP: 5,
        hopeFeature: {
            name: "Not This Time",
            description: `Spend 3 Hope to force an adversary within Far range to reroll an attack or damage roll.`
        }
    }
};

// SUBCLASS_DETAILS has been moved to subclassDetails.ts 