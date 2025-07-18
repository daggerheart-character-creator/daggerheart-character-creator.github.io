import { CLASS_DETAILS } from './classDetails';

export interface DomainCard {
    name: string;
    level: number;
    domain: string;
    type: 'ability' | 'spell' | 'grimoire';
    recallCost: number;
    description: string[];
}

export const DOMAIN_CARDS: Record<string, DomainCard[]> = {
    Arcana: [
        {
            name: "Rift Walker",
            level: 6,
            domain: "Arcana",
            type: "spell",
            recallCost: 2,
            description: [
                "Make a Spellcast Roll (15). On a success, you place an arcane marking on the ground where you currently stand. The next time you successfully cast Rift Walker, a rift in space opens up, providing safe passage back to the exact spot where the marking was placed. This rift stays open until you choose to close it or you cast another spell.",
                "You can drop the spell at any time to cast Rift Walker again and place the marking somewhere new."
            ]
        },
        {
            name: "Telekinesis",
            level: 6,
            domain: "Arcana",
            type: "spell",
            recallCost: 0,
            description: [
                "Make a Spellcast Roll against a target within Far range. On a success, you can use your mind to move them anywhere within Far range of their original position.",
                "You can throw the lifted target as an attack by making an additional Spellcast Roll against the second target you're trying to attack. On a success, deal d12+4 physical damage to the second target using your Proficiency. This spell then ends."
            ]
        },
        {
            name: "Arcana-touched",
            level: 7,
            domain: "Arcana",
            type: "ability",
            recallCost: 2,
            description: [
                "When 4 or more of the domain cards in your loadout are from the Arcana domain, gain the following benefits:",
                "+1 bonus to your Spellcast Rolls",
                "Once per rest, you can switch the results of your Hope and Fear Dice."
            ]
        },
        {
            name: "Cloaking Blast",
            level: 7,
            domain: "Arcana",
            type: "spell",
            recallCost: 2,
            description: [
                "When you make a successful Spellcast Roll to cast a different spell, you can spend a Hope to become Cloaked. While Cloaked, you remain unseen if you are stationary when an adversary moves to where they would normally see you. When you move into or within an adversary's line of sight or make an attack, you are no longer Cloaked."
            ]
        },
        {
            name: "Arcane Reflection",
            level: 8,
            domain: "Arcana",
            type: "spell",
            recallCost: 1,
            description: [
                "When you would take magic damage, you can spend any number of Hope to roll that many d6s. If any roll a 6, the attack is reflected back to the caster, dealing the damage to them instead."
            ]
        },
        {
            name: "Confusing Aura",
            level: 8,
            domain: "Arcana",
            type: "spell",
            recallCost: 2,
            description: [
                "Make a Spellcast Roll (14). Once per long rest on a success, you create a layer of illusion over your body that makes it hard to tell exactly where you are. Mark any number of Stress to make that many additional layers.",
                "When an adversary makes an attack against you, roll a number of d6s equal to the number of layers currently active. If any roll a 5 or higher, one layer of the aura is destroyed and the attack fails. If all the results are 4 or lower, you take the damage and this spell ends."
            ]
        },
        {
            name: "Earthquake",
            level: 9,
            domain: "Arcana",
            type: "spell",
            recallCost: 2,
            description: [
                "Make a Spellcast Roll (16). Once per rest on a success, all targets within Very Far range who aren't flying must make a Reaction Roll (18). Targets who fail take 3d10+8 physical damage and are temporarily Vulnerable. Targets who succeed take half damage.",
                "Additionally, when you succeed on the Spellcast Roll, all terrain within Very Far range becomes difficult to move through and structures within this range might sustain damage or crumble."
            ]
        },
        {
            name: "Sensory Projection",
            level: 9,
            domain: "Arcana",
            type: "spell",
            recallCost: 0,
            description: [
                "Once per rest, make a Spellcast Roll (15). On a success, drop into a vision that lets you clearly see and hear any place you have been before as though you are standing there in this moment. You can move freely in this vision and are not constrained by the physics or impediments of a physical body. This spell cannot be detected by mundane or magical means. You drop out of this vision upon taking damage or casting another spell."
            ]
        },
        {
            name: "Adjust Reality",
            level: 10,
            domain: "Arcana",
            type: "spell",
            recallCost: 1,
            description: [
                "After you or a willing ally make any roll, you can spend 5 Hope to change the numerical result of that roll to a result of your choice instead. The result must be plausible within the range of the dice."
            ]
        },
        {
            name: "Falling Sky",
            level: 10,
            domain: "Arcana",
            type: "spell",
            recallCost: 1,
            description: [
                "Make a Spellcast Roll against all adversaries within Far range. Mark any number of Stress to make shards of arcana rain down from above. Targets you succeed against take 1d20+2 magic damage for each Stress marked."
            ]
        }
    ],
    Blade: [
        {
            name: "Get Back Up",
            level: 1,
            domain: "Blade",
            type: "ability",
            recallCost: 1,
            description: [
                "When you take Severe damage, you can mark a Stress to reduce the severity by one threshold."
            ]
        },
        {
            name: "Not Good Enough",
            level: 1,
            domain: "Blade",
            type: "ability",
            recallCost: 1,
            description: [
                "When you roll your damage dice, you can reroll any 1s or 2s."
            ]
        },
        {
            name: "Whirlwind",
            level: 1,
            domain: "Blade",
            type: "ability",
            recallCost: 0,
            description: [
                "When you make a successful attack against a target within Very Close range, you can spend a Hope to use the attack against all other targets within Very Close range. All additional adversaries you succeed against with this ability take half damage."
            ]
        },
        {
            name: "A Soldier's Bond",
            level: 2,
            domain: "Blade",
            type: "ability",
            recallCost: 1,
            description: [
                "Once per long rest, when you compliment someone or ask them about something they're good at, you can both gain 3 Hope."
            ]
        },
        {
            name: "Reckless",
            level: 2,
            domain: "Blade",
            type: "ability",
            recallCost: 1,
            description: [
                "Mark a Stress to gain advantage on an attack."
            ]
        },
        {
            name: "Scramble",
            level: 3,
            domain: "Blade",
            type: "ability",
            recallCost: 1,
            description: [
                "Once per rest, when a creature within Melee range would deal damage to you, you can avoid the attack and safely move out of Melee range of the enemy."
            ]
        },
        {
            name: "Versatile Fighter",
            level: 3,
            domain: "Blade",
            type: "ability",
            recallCost: 1,
            description: [
                "You can use a different character trait for an equipped weapon, rather than the trait the weapon calls for. When you deal damage, you can mark a Stress to use the maximum result of one of your damage dice instead of rolling it."
            ]
        },
        {
            name: "Deadly Focus",
            level: 4,
            domain: "Blade",
            type: "ability",
            recallCost: 2,
            description: [
                "Once per rest, you can apply all your focus toward a target of your choice. Until you attack another creature, or the battle ends, gain a +1 bonus to your Proficiency."
            ]
        },
        {
            name: "Fortified Armor",
            level: 4,
            domain: "Blade",
            type: "ability",
            recallCost: 0,
            description: [
                "While you are wearing armor, gain a +2 bonus to your damage thresholds."
            ]
        },
        {
            name: "Champion's Edge",
            level: 5,
            domain: "Blade",
            type: "ability",
            recallCost: 1,
            description: [
                "When you critically succeed on an attack, you can spend up to 3 Hope and choose one of the following options for each Hope spent:",
                "• You clear a Hit Point.",
                "• You clear an Armor Slot.",
                "• The target must mark an additional Hit Point.",
                "You can't choose the same option more than once."
            ]
        },
        {
            name: "Vitality",
            level: 5,
            domain: "Blade",
            type: "ability",
            recallCost: 0,
            description: [
                "When you choose this card, permanently gain two of the following benefits:",
                "• One Stress slot",
                "• One Hit Point slot",
                "• +2 bonus to your damage thresholds",
                "Then place this card in your vault permanently."
            ]
        },
        {
            name: "Battle-Hardened",
            level: 6,
            domain: "Blade",
            type: "ability",
            recallCost: 2,
            description: [
                "Once per long rest when you would make a Death Move, you can spend a Hope to clear a Hit Point instead."
            ]
        },
        {
            name: "Rage Up",
            level: 6,
            domain: "Blade",
            type: "ability",
            recallCost: 1,
            description: [
                "Before you make an attack, you can mark a Stress to gain a bonus to your damage roll equal to twice your Strength.",
                "You can Rage Up twice per attack."
            ]
        },
        {
            name: "Blade-touched",
            level: 7,
            domain: "Blade",
            type: "ability",
            recallCost: 1,
            description: [
                "When 4 or more of the domain cards in your loadout are from the Blade domain, gain the following benefits:",
                "+2 bonus to your attack rolls",
                "+4 bonus to your Severe damage threshold"
            ]
        },
        {
            name: "Glancing Blow",
            level: 7,
            domain: "Blade",
            type: "ability",
            recallCost: 1,
            description: [
                "When you fail an attack, you can mark a Stress to deal weapon damage using half your Proficiency."
            ]
        },
        {
            name: "Battle Cry",
            level: 8,
            domain: "Blade",
            type: "ability",
            recallCost: 1,
            description: [
                "Mark a Stress and gain a Hope. Additionally, your allies gain advantage on attack rolls until you or an ally rolls a failure with Fear."
            ]
        },
        {
            name: "Frenzy",
            level: 8,
            domain: "Blade",
            type: "ability",
            recallCost: 3,
            description: [
                "Once per long rest, you can go into a Frenzy until there are no more adversaries within sight. While Frenzied, you can't use Armor Slots, and you gain a +10 bonus to your damage rolls and a +8 bonus to your Severe damage threshold."
            ]
        },
        {
            name: "Gore and Glory",
            level: 9,
            domain: "Blade",
            type: "ability",
            recallCost: 2,
            description: [
                "When you critically succeed on a weapon attack, gain an additional Hope or clear an additional Stress. Additionally, when you deal enough damage to defeat an enemy, gain a Hope or clear a Stress."
            ]
        },
        {
            name: "Reaper's Strike",
            level: 9,
            domain: "Blade",
            type: "ability",
            recallCost: 3,
            description: [
                "Once per long rest, spend a Hope to make an attack roll. The GM tells you which targets within range it would succeed against. Choose one of these targets and force them to mark 5 Hit Points."
            ]
        },
        {
            name: "Battle Monster",
            level: 10,
            domain: "Blade",
            type: "ability",
            recallCost: 0,
            description: [
                "When you make a successful attack against an adversary, you can mark 4 Stress to force the target to mark a number of Hit Points equal to the number of Hit Points you currently have marked instead of rolling for damage."
            ]
        },
        {
            name: "Onslaught",
            level: 10,
            domain: "Blade",
            type: "ability",
            recallCost: 3,
            description: [
                "When you successfully make an attack with your weapon, you never deal damage beneath a target's Major damage threshold (the target always marks a minimum of 2 Hit Points). Additionally, when a creature within your weapon's range deals damage to an ally with an attack that doesn't include you, you can mark a Stress to force them to make a Reaction Roll (15). On a failure, the target must mark a Hit Point."
            ]
        }
    ],
    Bone: [
        {
            name: "Deft Maneuvers",
            level: 1,
            domain: "Bone",
            type: "ability",
            recallCost: 0,
            description: [
                "Once per rest, mark a Stress to sprint anywhere within Far range without making an Agility Roll to get there.",
                "If you end this movement within Melee range of an adversary and immediately make an attack against them, gain a +1 bonus to the attack roll."
            ]
        },
        {
            name: "I See It Coming",
            level: 1,
            domain: "Bone",
            type: "ability",
            recallCost: 1,
            description: [
                "When you're targeted by an attack made from beyond Melee range, you can mark a Stress to roll a d4 and gain a bonus to your Evasion equal to the result against the attack."
            ]
        },
        {
            name: "Untouchable",
            level: 1,
            domain: "Bone",
            type: "ability",
            recallCost: 1,
            description: [
                "Gain a bonus to your Evasion equal to half your Agility."
            ]
        },
        {
            name: "Ferocity",
            level: 2,
            domain: "Bone",
            type: "ability",
            recallCost: 2,
            description: [
                "When you cause an adversary to mark 1 or more Hit Points, you can spend 2 Hope to increase your Evasion by the number of Hit Points they marked. This bonus lasts until after the next attack made against you."
            ]
        },
        {
            name: "Strategic Approach",
            level: 2,
            domain: "Bone",
            type: "ability",
            recallCost: 1,
            description: [
                "After a long rest, place a number of tokens equal to your Knowledge on this card (minimum 1). The first time you move within Close range of an adversary and make an attack against them, you can spend one token to choose one of the following options:",
                "• You make the attack with advantage.",
                "• You clear a Stress on an ally within Melee range of the adversary.",
                "• You add a d8 to your damage roll.",
                "When you take a long rest, clear all unspent tokens."
            ]
        },
        {
            name: "Brace",
            level: 3,
            domain: "Bone",
            type: "ability",
            recallCost: 1,
            description: [
                "When you mark an Armor Slot to reduce incoming damage, you can mark a Stress to mark an additional Armor Slot."
            ]
        },
        {
            name: "Tactician",
            level: 3,
            domain: "Bone",
            type: "ability",
            recallCost: 1,
            description: [
                "When you Help an Ally, they can spend a Hope to add one of your Experiences to their roll alongside your advantage die.",
                "When making a Tag Team Roll, you can roll a d20 as your Hope Die."
            ]
        },
        {
            name: "Boost",
            level: 4,
            domain: "Bone",
            type: "ability",
            recallCost: 1,
            description: [
                "Mark a Stress to boost off a willing ally within Close range, fling yourself into the air, and perform an aerial attack against a target within Far range. You have advantage on the attack, add a d10 to the damage roll, and end your move within Melee range of the target."
            ]
        },
        {
            name: "Redirect",
            level: 4,
            domain: "Bone",
            type: "ability",
            recallCost: 1,
            description: [
                "When an attack made against you from beyond Melee range fails, roll a number of d6s equal to your Proficiency. If any roll a 6, you can mark a Stress to redirect the attack to damage an adversary within Very Close range instead."
            ]
        },
        {
            name: "Know Thy Enemy",
            level: 5,
            domain: "Bone",
            type: "ability",
            recallCost: 1,
            description: [
                "When observing a creature, you can make an Instinct Roll against them. On a success, spend a Hope and ask the GM for one set of information about the target from the following options:",
                "• Their unmarked Hit Points and Stress.",
                "• Their Difficulty and damage thresholds.",
                "• Their tactics and standard attack damage dice.",
                "• Their features and Experiences.",
                "Additionally on a success, you can mark a Stress to remove a Fear from the GM's Fear Pool."
            ]
        },
        {
            name: "Signature Move",
            level: 5,
            domain: "Bone",
            type: "ability",
            recallCost: 1,
            description: [
                "Name and describe your signature combat move. Once per rest, when you perform this signature move as part of an action you're taking, you can roll a d20 as your Hope Die. On a success, clear a Stress."
            ]
        },
        {
            name: "Rapid Riposte",
            level: 6,
            domain: "Bone",
            type: "ability",
            recallCost: 0,
            description: [
                "When an attack made against you from within Melee range fails, you can mark a Stress and seize the opportunity to deal the weapon damage of one of your active weapons to the attacker."
            ]
        },
        {
            name: "Recovery",
            level: 6,
            domain: "Bone",
            type: "ability",
            recallCost: 1,
            description: [
                "During a short rest, you can choose a long rest downtime move instead. You can spend a Hope to let an ally do the same."
            ]
        },
        {
            name: "Bone-touched",
            level: 7,
            domain: "Bone",
            type: "ability",
            recallCost: 2,
            description: [
                "When 4 or more of the domain cards in your loadout are from the Bone domain, gain the following benefits:",
                "+1 bonus to Agility",
                "Once per rest, you can spend 3 Hope to cause an attack that succeeded against you to fail instead."
            ]
        },
        {
            name: "Cruel Precision",
            level: 7,
            domain: "Bone",
            type: "ability",
            recallCost: 1,
            description: [
                "When you make a successful attack with a weapon, gain a bonus to your damage roll equal to either your Finesse or Agility."
            ]
        },
        {
            name: "Breaking Blow",
            level: 8,
            domain: "Bone",
            type: "ability",
            recallCost: 3,
            description: [
                "When you make a successful attack, you can mark a Stress to make the next successful attack against that same target deal an extra 2d12 damage."
            ]
        },
        {
            name: "Wrangle",
            level: 8,
            domain: "Bone",
            type: "ability",
            recallCost: 1,
            description: [
                "Make an Agility Roll against all targets within Close range. Spend a Hope to move targets you succeed against, and any willing allies within Close range, to another point within Close range."
            ]
        },
        {
            name: "On the Brink",
            level: 9,
            domain: "Bone",
            type: "ability",
            recallCost: 1,
            description: [
                "When you have 2 or fewer Hit Points unmarked, you don't take Minor damage."
            ]
        },
        {
            name: "Splintering Strike",
            level: 9,
            domain: "Bone",
            type: "ability",
            recallCost: 3,
            description: [
                "Spend a Hope and make an attack against all adversaries within your weapon's range. Once per long rest, on a success against any targets, add up the damage dealt, then redistribute that damage however you wish between the targets you succeeded against. When you deal damage to a target, roll an additional damage die and add its result to the damage you deal to that target."
            ]
        },
        {
            name: "Deathrun",
            level: 10,
            domain: "Bone",
            type: "ability",
            recallCost: 1,
            description: [
                "Spend 3 Hope to run a straight path through the battlefield to a point within Far range, making an attack against all adversaries within your weapon's range along that path. Choose the order in which you deal damage to the targets you succeeded against. For the first, roll your weapon damage with a +1 bonus to your Proficiency. Then remove a die from your damage roll and deal the remaining damage to the next target. Continue to remove a die for each subsequent target until you have no more damage dice or adversaries. You can't target the same adversary more than once per attack."
            ]
        },
        {
            name: "Swift Step",
            level: 10,
            domain: "Bone",
            type: "ability",
            recallCost: 2,
            description: [
                "When an attack made against you fails, clear a Stress. If you can't clear a Stress, gain a Hope."
            ]
        }
    ],
    Codex: [
        {
            name: "Book of Ava",
            level: 1,
            domain: "Codex",
            type: "grimoire",
            recallCost: 2,
            description: [
                "Power Push: Make a Spellcast Roll against a target within Melee range. On a success, they're knocked back to Far range and take d10+2 magic damage using your Proficiency.",
                "Tava's Armor: Spend a Hope to give a target you can touch a +1 bonus to their Armor Score until their next rest or you cast Tava's Armor again.",
                "Ice Spike: Make a Spellcast Roll (12) to summon a large ice spike within Far range. If you use it as a weapon, make the Spellcast Roll against the target's Difficulty instead. On a success, deal d6 physical damage using your Proficiency."
            ]
        },
        {
            name: "Book of Illiat",
            level: 1,
            domain: "Codex",
            type: "grimoire",
            recallCost: 2,
            description: [
                "Slumber: Make a Spellcast Roll against a target within Very Close range. On a success, they're Asleep until they take damage or the GM spends a Fear on their turn to clear this condition.",
                "Arcane Barrage: Once per rest, spend any number of Hope and shoot magical projectiles that strike a target of your choice within Close range. Roll a number of d6s equal to the Hope spent and deal that much magic damage to the target.",
                "Telepathy: Spend a Hope to open a line of mental communication with one target you can see. This connection lasts until your next rest or you cast Telepathy again."
            ]
        },
        {
            name: "Book of Tyfar",
            level: 1,
            domain: "Codex",
            type: "grimoire",
            recallCost: 2,
            description: [
                "Wild Flame: Make a Spellcast Roll against up to three adversaries within Melee range. Targets you succeed against take 2d6 magic damage and must mark a Stress as flames erupt from your hand.",
                "Magic Hand: You conjure a magical hand with the same size and strength as your own within Far range.",
                "Mysterious Mist: Make a Spellcast Roll (13) to cast a temporary thick fog that gathers in a stationary area within Very Close range. The fog heavily obscures this area and everything in it."
            ]
        },
        {
            name: "Book of Sitil",
            level: 2,
            domain: "Codex",
            type: "grimoire",
            recallCost: 2,
            description: [
                "Adjust Appearance: You magically shift your appearance and clothing to avoid recognition.",
                "Parallela: Spend 2 Hope to cast this spell on yourself or an ally within Close range. The next time the target makes an attack, they can hit an additional target within range that their attack roll would succeed against. You can only hold this spell on one creature at a time.",
                "Illusion: Make a Spellcast Roll (14). On a success, create a temporary visual illusion no larger than you within Close range that lasts for as long as you look at it. It holds up to scrutiny until an observer is within Melee range."
            ]
        },
        {
            name: "Book of Vagras",
            level: 2,
            domain: "Codex",
            type: "grimoire",
            recallCost: 2,
            description: [
                "Runic Lock: Make a Spellcast Roll (15) on an object you're touching that can close (such as a lock, chest, or box). Once per rest on a success, you can lock the object so it can only be opened by creatures of your choice. Someone with access to magic and an hour of time to study the spell can break it.",
                "Arcane Door: When you have no adversaries within Melee range, make a Spellcast Roll (13). On a success, spend a Hope to create a portal from where you are to a point within Far range you can see. It closes once a creature has passed through it.",
                "Reveal: Make a Spellcast Roll. If there is anything magically hidden within Close range, it is revealed."
            ]
        },
        {
            name: "Book of Korvax",
            level: 3,
            domain: "Codex",
            type: "grimoire",
            recallCost: 2,
            description: [
                "Levitation: Make a Spellcast Roll to temporarily lift a target you can see up into the air and move them within Close range of their original position.",
                "Recant: Spend a Hope to force a target within Melee range to make a Reaction Roll (15). On a failure, they forget the last minute of your conversation.",
                "Rune Circle: Mark a Stress to create a temporary magical circle on the ground where you stand. All adversaries within Melee range, or who enter Melee range, take 2d12+4 magic damage and are knocked back to Very Close range."
            ]
        },
        {
            name: "Book of Norai",
            level: 3,
            domain: "Codex",
            type: "grimoire",
            recallCost: 2,
            description: [
                "Mystic Tether: Make a Spellcast Roll against a target within Far range. On a success, they're temporarily Restrained and must mark a Stress. If you target a flying creature, this spell grounds and temporarily Restrains them.",
                "Fireball: Make a Spellcast Roll against a target within Very Far range. On a success, hurl a sphere of fire toward them that explodes on impact. The target and all creatures within Very Close range of them must make a Reaction Roll (13). Targets who fail take d20+5 magic damage using your Proficiency. Targets who succeed take half damage."
            ]
        },
        {
            name: "Book of Exota",
            level: 4,
            domain: "Codex",
            type: "grimoire",
            recallCost: 3,
            description: [
                "Repudiate: You can interrupt a magical effect taking place. Make a reaction roll using your Spellcast trait. Once per rest on a success, the effect stops and any consequences are avoided.",
                "Create Construct: Spend a Hope to choose a group of objects around you and create an animated construct from them that obeys basic commands. Make a Spellcast Roll to command them to take action. When necessary, they share your Evasion and traits and their attacks deal 2d10+3 physical damage. You can only maintain one construct at a time, and they fall apart when they take any amount of damage."
            ]
        },
        {
            name: "Book of Grynn",
            level: 4,
            domain: "Codex",
            type: "grimoire",
            recallCost: 2,
            description: [
                "Arcane Deflection: Once per long rest, spend a Hope to negate the damage of an attack targeting you or an ally within Very Close range.",
                "Time Lock: Target an object within Far range. That object stops in time and space exactly where it is until your next rest. If a creature tries to move it, make a Spellcast Roll against them to maintain this spell.",
                "Wall of Flame: Make a Spellcast Roll (15). On a success, create a wall of magical flame between two points within Far range. All creatures in its path must choose a side to be on, and anything that subsequently passes through the wall takes 4d10+3 magic damage."
            ]
        },
        {
            name: "Manifest Wall",
            level: 5,
            domain: "Codex",
            type: "spell",
            recallCost: 2,
            description: [
                "Make a Spellcast Roll (15). Once per rest on a success, spend a Hope to create a temporary magical wall between two points within Far range. It can be up to 50 feet high and form at any angle. Creatures or objects in its path are shunted to a side of your choice. The wall stays up until your next rest or you cast Manifest Wall again."
            ]
        },
        {
            name: "Teleport",
            level: 5,
            domain: "Codex",
            type: "spell",
            recallCost: 2,
            description: [
                "Once per long rest, you can instantly teleport yourself and any number of willing targets within Close range to a place you've been before. Choose one of the following options, then make a Spellcast Roll (16):",
                "• If you know the place very well, gain a +3 bonus.",
                "• If you've visited the place frequently, gain a +1 bonus.",
                "• If you've visited the place infrequently, gain no modifier.",
                "• If you've only been there once, gain a −2 penalty.",
                "On a success, you appear where you were intending to go. On a failure, you appear off course, with the range of failure determining how far off course."
            ]
        },
        {
            name: "Banish",
            level: 6,
            domain: "Codex",
            type: "spell",
            recallCost: 0,
            description: [
                "Make a Spellcast Roll against a target within Close range. On a success, roll a number of d20s equal to your Spellcast trait. The target must make a reaction roll with a Difficulty equal to your highest result. On a success, the target must mark a Stress but isn't banished. Once per rest on a failure, they are banished from this realm.",
                "When the PCs roll with Fear, the Difficulty gains a −1 penalty and the target makes another reaction roll. On a success, they return from banishment."
            ]
        },
        {
            name: "Sigil of Retribution",
            level: 6,
            domain: "Codex",
            type: "spell",
            recallCost: 2,
            description: [
                "Mark an adversary within Close range with a sigil of retribution. The GM gains a Fear. When the marked adversary deals damage to you or your allies, place a d8 on this card. You can hold a number of d8s equal to your level. When you successfully attack the marked adversary, roll the dice on this card and add the total to your damage roll, then clear the dice. This effect ends when the marked adversary is defeated or you cast Sigil of Retribution again."
            ]
        },
        {
            name: "Book of Homet",
            level: 7,
            domain: "Codex",
            type: "grimoire",
            recallCost: 0,
            description: [
                "Pass Through: Make a Spellcast Roll (13). Once per rest on a success, you and all creatures touching you can pass through a wall or door within Close range. The effect ends once everyone is on the other side.",
                "Plane Gate: Make a Spellcast Roll (14). Once per long rest on a success, open a gateway to a location in another dimension or plane of existence you've been to before. This gateway lasts until your next rest."
            ]
        },
        {
            name: "Codex-touched",
            level: 7,
            domain: "Codex",
            type: "ability",
            recallCost: 2,
            description: [
                "When 4 or more of the domain cards in your loadout are from the Codex domain, gain the following benefits: You can mark a Stress to add your Proficiency to a Spellcast Roll. Once per rest, replace this card with any card from your vault without paying its Recall Cost."
            ]
        },
        {
            name: "Book of Vyola",
            level: 8,
            domain: "Codex",
            type: "grimoire",
            recallCost: 2,
            description: [
                "Memory Delve: Make a Spellcast Roll against a target within Far range. On a success, peer into the target's mind and ask the GM a question. The GM describes any memories the target has pertaining to the answer.",
                "Shared Clarity: Once per long rest, spend a Hope to choose two willing creatures. When one of them would mark Stress, they can choose between the two of them who marks it. This spell lasts until their next rest."
            ]
        },
        {
            name: "Safe Haven",
            level: 8,
            domain: "Codex",
            type: "spell",
            recallCost: 3,
            description: [
                "When you have a few minutes of calm to focus, you can spend 2 Hope to summon your Safe Haven, a large interdimensional home where you and your allies can take shelter. When you do, a magical door appears somewhere within Close range. Only creatures of your choice can enter. Once inside, you can make the entrance invisible. You and anyone else inside can always exit. Once you leave, the doorway must be summoned again.",
                "When you take a rest within your own Safe Haven, you can choose an additional downtime move."
            ]
        },
        {
            name: "Book of Ronin",
            level: 9,
            domain: "Codex",
            type: "grimoire",
            recallCost: 4,
            description: [
                "Transform: Make a Spellcast Roll (15). On a success, transform into an inanimate object no larger than twice your normal size. You can remain in this shape until you take damage.",
                "Eternal Enervation: Once per long rest, make a Spellcast Roll against a target within Close range. On a success, they become permanently Vulnerable. They can't clear this condition by any means."
            ]
        },
        {
            name: "Disintegration Wave",
            level: 9,
            domain: "Codex",
            type: "spell",
            recallCost: 4,
            description: [
                "Make a Spellcast Roll (18). Once per long rest on a success, the GM tells you which adversaries within Far range have a Difficulty of 18 or lower. Mark a Stress for each one you wish to hit with this spell. They are killed and can't come back to life by any means."
            ]
        },
        {
            name: "Book of Yarrow",
            level: 10,
            domain: "Codex",
            type: "grimoire",
            recallCost: 2,
            description: [
                "Timejammer: Make a Spellcast Roll (18). On a success, time temporarily slows to a halt for everyone within Far range except for you. It resumes the next time you make an action roll that targets another creature.",
                "Magic Immunity: Spend 5 Hope to become immune to magic damage until your next rest."
            ]
        },
        {
            name: "Transcendent Union",
            level: 10,
            domain: "Codex",
            type: "spell",
            recallCost: 1,
            description: [
                "Once per long rest, spend 5 Hope to cast this spell on two or more willing creatures. Until your next rest, when a creature connected by this union would mark Stress or Hit Points, the connected creatures can choose who marks it."
            ]
        }
    ],
    Grace: [
        {
            name: "Deft Deceiver",
            level: 1,
            domain: "Grace",
            type: "ability",
            recallCost: 0,
            description: [
                "Spend a Hope to gain advantage on a roll to deceive or trick someone into believing a lie you tell them."
            ]
        },
        {
            name: "Enrapture",
            level: 1,
            domain: "Grace",
            type: "spell",
            recallCost: 0,
            description: [
                "Make a Spellcast Roll against a target within Close range. On a success, they become temporarily Enraptured. While Enraptured, a target's attention is fixed on you, narrowing their field of view and drowning out any sound but your voice.",
                "Once per rest on a success, you can mark a Stress to force the Enraptured target to mark a Stress as well."
            ]
        },
        {
            name: "Inspirational Words",
            level: 1,
            domain: "Grace",
            type: "ability",
            recallCost: 1,
            description: [
                "Your speech is imbued with power. After a long rest, place a number of tokens on this card equal to your Presence.",
                "When you speak with an ally, you can spend a token from this card to give them one benefit from the following options:",
                "• Your ally clears a Stress.",
                "• Your ally clears a Hit Point.",
                "• Your ally gains a Hope.",
                "When you take a long rest, clear all unspent tokens."
            ]
        },
        {
            name: "Tell No Lies",
            level: 2,
            domain: "Grace",
            type: "spell",
            recallCost: 1,
            description: [
                "Make a Spellcast Roll against a target within Very Close range. On a success, they can't lie to you while they remain within Close range, but they are not compelled to speak. If you ask them a question and they refuse to answer, they must mark a Stress and the effect ends. The target is typically unaware this spell has been cast on them until it causes them to utter the truth."
            ]
        },
        {
            name: "Troublemaker",
            level: 2,
            domain: "Grace",
            type: "ability",
            recallCost: 2,
            description: [
                "When you taunt or provoke a target within Far range, make a Presence Roll against them.",
                "Once per rest on a success, roll a number of d4s equal to your Proficiency. The target must mark Stress equal to the highest result rolled."
            ]
        },
        {
            name: "Hypnotic Shimmer",
            level: 3,
            domain: "Grace",
            type: "spell",
            recallCost: 1,
            description: [
                "Make a Spellcast Roll against all adversaries in front of you within Close range. Once per rest on a success, create an illusion of flashing colors and lights that temporarily Stuns targets you succeed against and forces them to mark a Stress. While Stunned, they can't use reactions and can't take any other actions until they clear this condition."
            ]
        },
        {
            name: "Invisibility",
            level: 3,
            domain: "Grace",
            type: "spell",
            recallCost: 1,
            description: [
                "Make a Spellcast Roll (10). On a success, mark a Stress and choose yourself or an ally within Melee range to become Invisible. An Invisible creature can't be seen except through magical means and attack rolls against them are made with disadvantage.",
                "Place a number of tokens on this card equal to your Spellcast trait. When the Invisible creature takes an action, spend a token from this card. After the action that spends the last token is resolved, the effect ends.",
                "You can only hold Invisibility on one creature at a time."
            ]
        },
        {
            name: "Soothing Speech",
            level: 4,
            domain: "Grace",
            type: "ability",
            recallCost: 1,
            description: [
                "During a short rest, when you take the time to comfort another character while using the Tend to Wounds downtime move on them, clear an additional Hit Point on that character. When you do, you also clear 2 Hit Points."
            ]
        },
        {
            name: "Through Your Eyes",
            level: 4,
            domain: "Grace",
            type: "spell",
            recallCost: 1,
            description: [
                "Choose a target within Very Far range. You can see through their eyes and hear through their ears. You can transition between using your own senses or the target's freely until you cast another spell or until your next rest."
            ]
        },
        {
            name: "Thought Delver",
            level: 5,
            domain: "Grace",
            type: "spell",
            recallCost: 2,
            description: [
                "You can peek into the minds of others. Spend a Hope to read the vague surface thoughts of a target within Far range. Make a Spellcast Roll against the target to delve for deeper, more hidden thoughts.",
                "On a roll with Fear, the target might, at the GM's discretion, become aware that you're reading their thoughts."
            ]
        },
        {
            name: "Words of Discord",
            level: 5,
            domain: "Grace",
            type: "spell",
            recallCost: 1,
            description: [
                "Whisper words of discord to an adversary within Melee range and make a Spellcast Roll (13). On a success, the target must mark a Stress and make an attack against another adversary instead of against you or your allies. Once this attack is over, the target realizes what happened. The next time you cast Words of Discord on them, gain a −5 penalty to the Spellcast Roll."
            ]
        },
        {
            name: "Never Upstaged",
            level: 6,
            domain: "Grace",
            type: "ability",
            recallCost: 2,
            description: [
                "When you mark 1 or more Hit Points from an attack, you can mark a Stress to place a number of tokens equal to the number of Hit Points you marked on this card. On your next successful attack, gain a +5 bonus to your damage roll for each token on this card, then clear all tokens."
            ]
        },
        {
            name: "Share the Burden",
            level: 6,
            domain: "Grace",
            type: "spell",
            recallCost: 0,
            description: [
                "Once per rest, take on the Stress from a willing creature within Melee range. The target describes what intimate knowledge or emotions telepathically leak from their mind in this moment between you. Transfer any number of their marked Stress to you, then gain a Hope for each Stress transferred."
            ]
        },
        {
            name: "Endless Charisma",
            level: 7,
            domain: "Grace",
            type: "ability",
            recallCost: 1,
            description: [
                "After you make an action roll to persuade, lie, or garner favor, you can spend a Hope to reroll the Hope or Fear Die."
            ]
        },
        {
            name: "Grace-touched",
            level: 7,
            domain: "Grace",
            type: "ability",
            recallCost: 2,
            description: [
                "When 4 or more of the domain cards in your loadout are from the Grace domain, gain the following benefits:",
                "You can mark an Armor Slot instead of marking a Stress.",
                "When you would force a target to mark a number of Hit Points, you can choose instead to force them to mark that number of Stress."
            ]
        },
        {
            name: "Astral Projection",
            level: 8,
            domain: "Grace",
            type: "spell",
            recallCost: 0,
            description: [
                "Once per long rest, mark a Stress to create a projected copy of yourself that can appear anywhere you've been before. You can see and hear through the projection as though it were you and affect the world as though you were there. A creature investigating the projection can tell it's of magical origin. This effect lasts until your next rest or your projection takes any damage."
            ]
        },
        {
            name: "Mass Enrapture",
            level: 8,
            domain: "Grace",
            type: "spell",
            recallCost: 3,
            description: [
                "Make a Spellcast Roll against all targets within Far range. Targets you succeed against become temporarily Enraptured. While Enraptured, a target's attention is fixed on you, narrowing their field of view and drowning out any sound but your voice. Mark a Stress to force all Enraptured targets to mark a Stress, ending this spell."
            ]
        },
        {
            name: "Copycat",
            level: 9,
            domain: "Grace",
            type: "spell",
            recallCost: 3,
            description: [
                "Once per long rest, this card can mimic the features of another domain card of level 8 or lower in another player's loadout. Spend Hope equal to half the card's level to gain access to the feature. It lasts until your next rest or they place the card in their vault."
            ]
        },
        {
            name: "Master of the Craft",
            level: 9,
            domain: "Grace",
            type: "ability",
            recallCost: 0,
            description: [
                "Gain a permanent +2 bonus to two of your Experiences or a permanent +3 bonus to one of your Experiences. Then place this card in your vault permanently."
            ]
        },
        {
            name: "Encore",
            level: 10,
            domain: "Grace",
            type: "spell",
            recallCost: 1,
            description: [
                "When an ally within Close range deals damage to an adversary, you can make a Spellcast Roll against that same target. On a success, you deal the same damage to the target that your ally dealt. If your Spellcast Roll succeeds with Fear, place this card in your vault."
            ]
        },
        {
            name: "Notorious",
            level: 10,
            domain: "Grace",
            type: "ability",
            recallCost: 0,
            description: [
                "People know who you are and what you've done, and they treat you differently because of it. When you leverage your notoriety to get what you want, you can mark a Stress before you roll to gain a +10 bonus to the result. Your food and drinks are always free wherever you go, and everything else you buy is reduced in price by one bag of gold (to a minimum of one handful). This card doesn't count against your loadout's domain card maximum of 5 and can't be placed in your vault."
            ]
        }
    ],
    Midnight: [
        {
            name: "Pick and Pull",
            level: 1,
            domain: "Midnight",
            type: "ability",
            recallCost: 0,
            description: [
                "You have advantage on action rolls to pick nonmagical locks, disarm nonmagical traps, or steal items from a target (either through stealth or by force)."
            ]
        },
        {
            name: "Rain of Blades",
            level: 1,
            domain: "Midnight",
            type: "spell",
            recallCost: 1,
            description: [
                "Spend a Hope to make a Spellcast Roll and conjure throwing blades that strike out at all targets within Very Close range. Targets you succeed against take d8+2 magic damage using your Proficiency. If a target you hit is Vulnerable, they take an extra 1d8 damage."
            ]
        },
        {
            name: "Uncanny Disguise",
            level: 1,
            domain: "Midnight",
            type: "spell",
            recallCost: 0,
            description: [
                "When you have a few minutes to prepare, you can mark a Stress to don the facade of any humanoid you can picture clearly in your mind. While disguised, you have advantage on Presence Rolls to avoid scrutiny. Place a number of tokens equal to your Spellcast trait on this card. When you take an action while disguised, spend a token from this card. After the action that spends the last token is resolved, the disguise drops."
            ]
        },
        {
            name: "Midnight Spirit",
            level: 2,
            domain: "Midnight",
            type: "spell",
            recallCost: 1,
            description: [
                "Spend a Hope to summon a humanoid-sized spirit that can move or carry things for you until your next rest. You can also send it to attack an adversary. When you do, make a Spellcast Roll against a target within Very Far range. On a success, the spirit moves into Melee range with that target. Roll a number of d6s equal to your Spellcast trait and deal that much magic damage to the target. The spirit then dissipates. You can only have one spirit at a time."
            ]
        },
        {
            name: "Shadowbind",
            level: 2,
            domain: "Midnight",
            type: "spell",
            recallCost: 0,
            description: [
                "Make a Spellcast Roll against all adversaries within Very Close range. Targets you succeed against are temporarily Restrained as their shadow binds them in place."
            ]
        },
        {
            name: "Chokehold",
            level: 3,
            domain: "Midnight",
            type: "ability",
            recallCost: 1,
            description: [
                "When you position yourself behind a creature who's about your size, you can mark a Stress to pull them into a chokehold, making them temporarily Vulnerable. When a creature attacks a target who is Vulnerable in this way, they deal an extra 2d6 damage."
            ]
        },
        {
            name: "Veil of Night",
            level: 3,
            domain: "Midnight",
            type: "spell",
            recallCost: 1,
            description: [
                "Make a Spellcast Roll (13). On a success, you can create a temporary curtain of darkness between two points within Far range. Only you can see through this darkness. You're considered Hidden to adversaries on the other side of the veil, and you have advantage on attacks you make through the darkness. The veil remains until you cast another spell."
            ]
        },
        {
            name: "Stealth Expertise",
            level: 4,
            domain: "Midnight",
            type: "ability",
            recallCost: 0,
            description: [
                "When you roll with Fear while attempting to move unnoticed through a dangerous area, you can mark a Stress to roll with Hope instead. If an ally within Close range is also attempting to move unnoticed and rolls with Fear, you can mark a Stress to change their result to a roll with Hope."
            ]
        },
        {
            name: "Glyph of Nightfall",
            level: 4,
            domain: "Midnight",
            type: "spell",
            recallCost: 1,
            description: [
                "Make a Spellcast Roll against a target within Very Close range. On a success, spend a Hope to conjure a dark glyph upon their body that exposes their weak points, temporarily reducing the target's Difficulty by a value equal to your Knowledge (minimum 1)."
            ]
        },
        {
            name: "Hush",
            level: 5,
            domain: "Midnight",
            type: "spell",
            recallCost: 1,
            description: [
                "Make a Spellcast Roll against a target within Close range. On a success, spend a Hope to conjure suppressive magic around the target that encompasses everything within Very Close range of them and follows them as they move. The target and anything within the area is Silenced until the GM spends a Fear on their turn to clear this condition, you cast Hush again, or you take Major damage. While Silenced, they can't make noise and can't cast spells."
            ]
        },
        {
            name: "Phantom Retreat",
            level: 5,
            domain: "Midnight",
            type: "spell",
            recallCost: 2,
            description: [
                "Spend a Hope to activate Phantom Retreat where you're currently standing. Spend another Hope at any time before your next rest to disappear from where you are and reappear where you were standing when you activated Phantom Retreat. This spell ends after you reappear."
            ]
        },
        {
            name: "Dark Whispers",
            level: 6,
            domain: "Midnight",
            type: "spell",
            recallCost: 0,
            description: [
                "You can speak into the mind of any person with whom you've made physical contact. Once you've opened a channel with them, they can speak back into your mind. Additionally, you can mark a Stress to make a Spellcast Roll against them. On a success, you can ask the GM one of the following questions and receive an answer:",
                "• Where are they?",
                "• What are they doing?",
                "• What are they afraid of?",
                "• What do they cherish most in the world?"
            ]
        },
        {
            name: "Mass Disguise",
            level: 6,
            domain: "Midnight",
            type: "spell",
            recallCost: 0,
            description: [
                "When you have a few minutes of silence to focus, you can mark a Stress to change the appearance of all willing creatures within Close range. Their new forms must share a general body structure and size, and can be somebody or something you've seen before or entirely fabricated. A disguised creature has advantage on Presence Rolls to avoid scrutiny. Activate a Countdown (8). It ticks down as a consequence the GM chooses. When it triggers, the disguise drops."
            ]
        },
        {
            name: "Midnight-touched",
            level: 7,
            domain: "Midnight",
            type: "ability",
            recallCost: 2,
            description: [
                "When 4 or more of the domain cards in your loadout are from the Midnight domain, gain the following benefits:",
                "Once per rest, when you have 0 Hope and the GM would gain a Fear, you can gain a Hope instead.",
                "When you make a successful attack, you can mark a Stress to add the result of your Fear Die to your damage roll."
            ]
        },
        {
            name: "Vanishing Dodge",
            level: 7,
            domain: "Midnight",
            type: "spell",
            recallCost: 1,
            description: [
                "When an attack made against you that would deal physical damage fails, you can spend a Hope to envelop yourself in shadow, becoming Hidden and teleporting to a point within Close range of the attacker. You remain Hidden until the next time you make an action roll."
            ]
        },
        {
            name: "Shadowhunter",
            level: 8,
            domain: "Midnight",
            type: "ability",
            recallCost: 2,
            description: [
                "Your prowess is enhanced under the cover of shadow. While you're shrouded in low light or darkness, you gain a +1 bonus to your Evasion and make attack rolls with advantage."
            ]
        },
        {
            name: "Spellcharge",
            level: 8,
            domain: "Midnight",
            type: "spell",
            recallCost: 1,
            description: [
                "When you take magic damage, place tokens equal to the number of Hit Points you marked on this card. You can store a number of tokens equal to your Spellcast trait. When you make a successful attack against a target, you can spend any number of tokens to add a d6 for each token spent to your damage roll."
            ]
        },
        {
            name: "Night Terror",
            level: 9,
            domain: "Midnight",
            type: "spell",
            recallCost: 2,
            description: [
                "Once per long rest, choose any targets within Very Close range to perceive you as a nightmarish horror. The targets must succeed on a Reaction Roll (16) or become temporarily Horrified. While Horrified, they're Vulnerable. Steal a number of Fear from the GM equal to the number of targets that are Horrified (up to the number of Fear in the GM's pool). Roll a number of d6s equal to the number of stolen Fear and deal the total damage to each Horrified target. Discard the stolen Fear."
            ]
        },
        {
            name: "Twilight Toll",
            level: 9,
            domain: "Midnight",
            type: "ability",
            recallCost: 1,
            description: [
                "Choose a target within Far range. When you succeed on an action roll against them that doesn't result in making a damage roll, place a token on this card. When you deal damage to this target, spend any number of tokens to add a d12 for each token spent to your damage roll. You can only hold Twilight Toll on one creature at a time. When you choose a new target or take a rest, clear all unspent tokens."
            ]
        },
        {
            name: "Eclipse",
            level: 10,
            domain: "Midnight",
            type: "spell",
            recallCost: 2,
            description: [
                "Make a Spellcast Roll (16). Once per long rest on a success, plunge the entire area within Far range into complete darkness only you and your allies can see through. Attack rolls have disadvantage when targeting you or an ally within this shadow. Additionally, when you or an ally succeeds with Hope against an adversary within this shadow, the target must mark a Stress. This spell lasts until the GM spends a Fear on their turn to clear this effect or you take Severe damage."
            ]
        },
        {
            name: "Specter of the Dark",
            level: 10,
            domain: "Midnight",
            type: "spell",
            recallCost: 1,
            description: [
                "Mark a Stress to become Spectral until you make an action roll targeting another creature. While Spectral, you're immune to physical damage and can float and pass through solid objects. Other creatures can still see you while you're in this form."
            ]
        }
    ],
    Sage: [
        {
            name: "Gifted Tracker",
            level: 1,
            domain: "Sage",
            type: "ability",
            recallCost: 0,
            description: [
                "When you're tracking a specific creature or group of creatures based on signs of their passage, you can spend any number of Hope and ask the GM that many questions from the following list:",
                "• What direction did they go?",
                "• How long ago did they pass through?",
                "• What were they doing in this location?",
                "• How many of them were here?",
                "When you encounter creatures you've tracked in this way, gain a +1 bonus to your Evasion against them."
            ]
        },
        {
            name: "Nature's Tongue",
            level: 1,
            domain: "Sage",
            type: "ability",
            recallCost: 0,
            description: [
                "You can speak the language of the natural world. When you want to speak to the plants and animals around you, make an Instinct Roll (12). On a success, they'll give you the information they know. On a roll with Fear, their knowledge might be limited or come at a cost.",
                "Additionally, before you make a Spellcast Roll while within a natural environment, you can spend a Hope to gain a +2 bonus to the roll."
            ]
        },
        {
            name: "Vicious Entangle",
            level: 1,
            domain: "Sage",
            type: "spell",
            recallCost: 1,
            description: [
                "Make a Spellcast Roll against a target within Far range. On a success, roots and vines reach out from the ground, dealing 1d8+1 physical damage and temporarily Restraining the target.",
                "Additionally on a success, you can spend a Hope to temporarily Restrain another adversary within Very Close range of your target."
            ]
        },
        {
            name: "Conjure Swarm",
            level: 2,
            domain: "Sage",
            type: "spell",
            recallCost: 1,
            description: [
                "Tekaira Armored Beetles: Mark a Stress to conjure armored beetles that encircle you. When you next take damage, reduce the severity by one threshold. You can spend a Hope to keep the beetles conjured after taking damage.",
                "Fire Flies: Make a Spellcast Roll against all adversaries within Close range. Spend a Hope to deal 2d8+3 magic damage to targets you succeeded against."
            ]
        },
        {
            name: "Natural Familiar",
            level: 2,
            domain: "Sage",
            type: "spell",
            recallCost: 1,
            description: [
                "Spend a Hope to summon a small nature spirit or forest critter to your side until your next rest, you cast Natural Familiar again, or the familiar is targeted by an attack. If you spend an additional Hope, you can summon a familiar that flies.",
                "You can communicate with them, make a Spellcast Roll to command them to perform simple tasks, and mark a Stress to see through their eyes.",
                "When you deal damage to an adversary within Melee range of your familiar, you add a d6 to your damage roll."
            ]
        },
        {
            name: "Corrosive Projectile",
            level: 3,
            domain: "Sage",
            type: "spell",
            recallCost: 1,
            description: [
                "Make a Spellcast Roll against a target within Far range. On a success, deal d6+4 magic damage using your Proficiency. Additionally, mark 2 or more Stress to make them permanently Corroded. While a target is Corroded, they gain a −1 penalty to their Difficulty for every 2 Stress you spent. This condition can stack."
            ]
        },
        {
            name: "Towering Stalk",
            level: 3,
            domain: "Sage",
            type: "spell",
            recallCost: 1,
            description: [
                "Once per rest, you can conjure a thick, twisting stalk within Close range that can be easily climbed. Its height can grow up to Far range.",
                "Mark a Stress to use this spell as an attack. Make a Spellcast Roll against an adversary or group of adversaries within Close range. The erupting stalk lifts targets you succeed against into the air and drops them, dealing d8 physical damage using your Proficiency."
            ]
        },
        {
            name: "Death Grip",
            level: 4,
            domain: "Sage",
            type: "spell",
            recallCost: 1,
            description: [
                "Make a Spellcast Roll against a target within Close range and choose one of the following options:",
                "• You pull the target into Melee range or pull yourself into Melee range of them.",
                "• You constrict the target and force them to mark 2 Stress.",
                "• All adversaries between you and the target must succeed on a Reaction Roll (13) or be hit by vines, taking 3d6+2 physical damage.",
                "On a success, vines reach out from your hands, causing the chosen effect and temporarily Restraining the target."
            ]
        },
        {
            name: "Healing Field",
            level: 4,
            domain: "Sage",
            type: "spell",
            recallCost: 2,
            description: [
                "Once per long rest, you can conjure a field of healing plants around you. Everywhere within Close range of you bursts to life with vibrant nature, allowing you and all allies in the area to clear a Hit Point. Spend 2 Hope to allow you and all allies to clear 2 Hit Points instead."
            ]
        },
        {
            name: "Thorn Skin",
            level: 5,
            domain: "Sage",
            type: "spell",
            recallCost: 1,
            description: [
                "Once per rest, spend a Hope to sprout thorns all over your body. When you do, place a number of tokens equal to your Spellcast trait on this card. When you take damage, you can spend any number of tokens to roll that number of d6s. Add the results together and reduce the incoming damage by that amount. If you're within Melee range of the attacker, deal that amount of damage back to them. When you take a rest, clear all unspent tokens."
            ]
        },
        {
            name: "Wild Fortress",
            level: 5,
            domain: "Sage",
            type: "spell",
            recallCost: 1,
            description: [
                "Make a Spellcast Roll (13). On a success, spend 2 Hope to grow a natural barricade in the shape of a dome that you and one ally can take cover within. While inside the dome, a creature can't be targeted by attacks and can't make attacks. Attacks made against the dome automatically succeed. The dome has the following damage thresholds and lasts until it marks 3 Hit Points. Place tokens on this card to represent marking Hit Points. Thresholds: 15/30"
            ]
        },
        {
            name: "Conjured Steeds",
            level: 6,
            domain: "Sage",
            type: "spell",
            recallCost: 0,
            description: [
                "Spend any number of Hope to conjure that many magical steeds (such as horses, camels, or elephants) that you and your allies can ride until your next long rest or the steeds take any damage. The steeds double your land speed while traveling and, when in danger, allow you to move within Far range without having to roll. Creatures riding a steed gain a −2 penalty to attack rolls and a +2 bonus to damage rolls."
            ]
        },
        {
            name: "Forager",
            level: 6,
            domain: "Sage",
            type: "ability",
            recallCost: 1,
            description: [
                "As an additional downtime move you can choose, roll a d6 to see what you forage. Work with the GM to describe it and add it to your inventory as a consumable. Your party can carry up to five foraged consumables at a time.",
                "1. A unique food (Clear 2 Stress)",
                "2. A beautiful relic (Gain 2 Hope)",
                "3. An arcane rune (+2 to a Spellcast Roll)",
                "4. A healing vial (Clear 2 Hit Points)",
                "5. A luck charm (Reroll any die)",
                "6. Choose one of the options above."
            ]
        },
        {
            name: "Sage-touched",
            level: 7,
            domain: "Sage",
            type: "ability",
            recallCost: 2,
            description: [
                "When 4 or more of the domain cards in your loadout are from the Sage domain, gain the following benefits:",
                "While you're in a natural environment, you gain a +2 bonus to your Spellcast Rolls.",
                "Once per rest, you can double your Agility or Instinct when making a roll that uses that trait. You must choose to do this before you roll."
            ]
        },
        {
            name: "Wild Surge",
            level: 7,
            domain: "Sage",
            type: "spell",
            recallCost: 2,
            description: [
                "Once per long rest, mark a Stress to channel the natural world around you and enhance yourself. Describe how your appearance changes, then place a d6 on this card with the 1 value facing up. While the Wild Surge Die is active, you add its value to every action roll you make. After you add its value to a roll, increase the Wild Surge Die's value by one. When the die's value would exceed 6 or you take a rest, this form drops and you must mark an additional Stress."
            ]
        },
        {
            name: "Forest Sprites",
            level: 8,
            domain: "Sage",
            type: "spell",
            recallCost: 2,
            description: [
                "Make a Spellcast Roll (13). On a success, spend any number of Hope to create an equal number of small forest sprites who appear at points you choose within Far range, providing the following benefits:",
                "• Your allies gain a +3 bonus to attack rolls against adversaries within Melee range of a sprite.",
                "• An ally who marks an Armor Slot while within Melee range of a sprite can mark an additional Armor Slot.",
                "A sprite vanishes after granting a benefit or taking any damage."
            ]
        },
        {
            name: "Rejuvenation Barrier",
            level: 8,
            domain: "Sage",
            type: "spell",
            recallCost: 1,
            description: [
                "Make a Spellcast Roll (15). Once per rest on a success, create a temporary barrier of protective energy around you at Very Close range. You and all allies within the barrier when this spell is cast clear 1d4 Hit Points. While the barrier is up, you and all allies within have resistance to physical damage from outside the barrier. When you move, the barrier follows you."
            ]
        },
        {
            name: "Fane of the Wilds",
            level: 9,
            domain: "Sage",
            type: "ability",
            recallCost: 2,
            description: [
                "After a long rest, place a number of tokens equal to the number of Sage domain cards in your loadout and vault on this card. When you would make a Spellcast Roll, you can spend any number of tokens after the roll to gain a +1 bonus for each token spent. When you critically succeed on a Spellcast Roll for a Sage domain spell, gain a token. When you take a long rest, clear all unspent tokens."
            ]
        },
        {
            name: "Plant Dominion",
            level: 9,
            domain: "Sage",
            type: "spell",
            recallCost: 1,
            description: [
                "Make a Spellcast Roll (18). Once per long rest on a success, you reshape the natural world, changing the surrounding plant life anywhere within Far range of you. For example, you can grow trees instantly, clear a path through dense vines, or create a wall of roots."
            ]
        },
        {
            name: "Force of Nature",
            level: 10,
            domain: "Sage",
            type: "spell",
            recallCost: 2,
            description: [
                "Mark a Stress to transform into a hulking nature spirit, gaining the following benefits:",
                "• When you succeed on an attack or Spellcast Roll, gain a +10 bonus to the damage roll.",
                "• When you deal enough damage to defeat a creature within Close range, you absorb them and clear an Armor Slot.",
                "• You can't be Restrained.",
                "Before you make an action roll, you must spend a Hope. If you can't, you revert to your normal form."
            ]
        },
        {
            name: "Tempest",
            level: 10,
            domain: "Sage",
            type: "spell",
            recallCost: 2,
            description: [
                "Choose one of the following tempests and make a Spellcast Roll against all targets within Far range. Targets you succeed against experience its effects until the GM spends a Fear on their turn to end this spell.",
                "• Blizzard: Deal 2d20+8 magic damage and targets are temporararily Vulnerable.",
                "• Hurricane: Deal 3d10+10 magic damage and choose a direction the wind is blowing. Targets can't move against the wind.",
                "• Sandstorm: Deal 5d6+9 magic damage. Attacks made from beyond Melee range have disadvantage."
            ]
        }
    ],
    Splendor: [
        {
            name: "Bolt Beacon",
            level: 1,
            domain: "Splendor",
            type: "spell",
            recallCost: 1,
            description: [
                "Make a Spellcast Roll against a target within Far range. On a success, spend a Hope to send a bolt of shimmering light toward them, dealing d8+2 magic damage using your Proficiency. The target becomes temporarily Vulnerable and glows brightly until this condition is cleared."
            ]
        },
        {
            name: "Mending Touch",
            level: 1,
            domain: "Splendor",
            type: "spell",
            recallCost: 1,
            description: [
                "You lay your hands upon a creature and channel healing magic to close their wounds. When you can take a few minutes to focus on the target you're helping, you can spend 2 Hope to clear a Hit Point or a Stress on them. Once per long rest, when you spend this healing time learning something new about them or revealing something about yourself, you can clear 2 Hit Points or 2 Stress on them instead."
            ]
        },
        {
            name: "Reassurance",
            level: 1,
            domain: "Splendor",
            type: "ability",
            recallCost: 0,
            description: [
                "Once per rest, after an ally attempts an action roll but before the consequences take place, you can offer assistance or words of support. When you do, your ally can reroll their dice."
            ]
        },
        {
            name: "Second Wind",
            level: 3,
            domain: "Splendor",
            type: "ability",
            recallCost: 2,
            description: [
                "Once per rest, when you succeed on an attack against an adversary, you can clear 3 Stress or a Hit Point. On a success with Hope, you also clear 3 Stress or a Hit Point on an ally within Close range of you."
            ]
        },
        {
            name: "Final Words",
            level: 2,
            domain: "Splendor",
            type: "spell",
            recallCost: 1,
            description: [
                "You can infuse a corpse with a moment of life to speak with it. Make a Spellcast Roll (13). On a success with Hope, the corpse answers up to three questions. On a success with Fear, the corpse answers one question. The corpse answers truthfully, but it can't impart information it didn't know in life. On a failure, or once the corpse has finished answering your questions, the body turns to dust."
            ]
        },
        {
            name: "Healing Hands",
            level: 2,
            domain: "Splendor",
            type: "spell",
            recallCost: 1,
            description: [
                "Make a Spellcast Roll (13) and target a creature other than yourself within Melee range. On a success, mark a Stress to clear 2 Hit Points or 2 Stress on the target. On a failure, mark a Stress to clear a Hit Point or a Stress on the target. You can't heal the same target again until your next long rest."
            ]
        },
        {
            name: "Voice of Reason",
            level: 3,
            domain: "Splendor",
            type: "ability",
            recallCost: 1,
            description: [
                "You speak with an unmatched power and authority. You have advantage on action rolls to de-escalate violent situations or convince someone to follow your lead. Additionally, you're emboldened in moments of duress. When all of your Stress slots are marked, you gain a +1 bonus to your Proficiency for damage rolls."
            ]
        },
        {
            name: "Divination",
            level: 4,
            domain: "Splendor",
            type: "spell",
            recallCost: 1,
            description: [
                `Once per long rest, spend 3 Hope to reach out to the forces beyond and ask one "yes or no" question about an event, person, place, or situation in the near future. For a moment, the present falls away and you see the answer before you.`
            ]
        },
        {
            name: "Life Ward",
            level: 4,
            domain: "Splendor",
            type: "spell",
            recallCost: 1,
            description: [
                "Spend 3 Hope and choose an ally within Close range. They are marked with a glowing sigil of protection. When this ally would make a death move, they clear a Hit Point instead. This effect ends when it saves the target from a death move, you cast Life Ward on another target, or you take a long rest."
            ]
        },
        {
            name: "Shape Material",
            level: 5,
            domain: "Splendor",
            type: "spell",
            recallCost: 1,
            description: [
                "Spend a Hope to shape a section of natural material you're touching (such as stone, ice, or wood) to suit your purpose. The area of the material can be no larger than you. For example, you can form a rudimentary tool or create a door. You can only affect the material within Close range of where you're touching it."
            ]
        },
        {
            name: "Smite",
            level: 5,
            domain: "Splendor",
            type: "spell",
            recallCost: 2,
            description: [
                "Once per rest, spend 3 Hope to charge your powerful smite. When you next successfully attack with a weapon, double the result of your damage roll. This attack deals magic damage regardless of the weapon's damage type."
            ]
        },
        {
            name: "Restoration",
            level: 6,
            domain: "Splendor",
            type: "spell",
            recallCost: 2,
            description: [
                "After a long rest, place a number of tokens equal to your Spellcast trait on this card. Touch a creature and spend any number of tokens to clear 2 Hit Points or 2 Stress for each token spent. You can also spend a token from this card when touching a creature to clear the Vulnerable condition or heal a physical or magical ailment (the GM might require additional tokens depending on the strength of the ailment). When you take a long rest, clear all unspent tokens."
            ]
        },
        {
            name: "Zone of Protection",
            level: 6,
            domain: "Splendor",
            type: "spell",
            recallCost: 2,
            description: [
                "Make a Spellcast Roll (16). Once per long rest on a success, choose a point within Far range and create a visible zone of protection there for all allies within Very Close range of that point. When you do, place a d6 on this card with the 1 value facing up. When an ally in this zone takes damage, they reduce it by the die's value. You then increase the die's value by one. When the die's value would exceed 6, this effect ends."
            ]
        },
        {
            name: "Healing Strike",
            level: 7,
            domain: "Splendor",
            type: "spell",
            recallCost: 1,
            description: [
                "When you deal damage to an adversary, you can spend 2 Hope to clear a Hit Point on an ally within Close range."
            ]
        },
        {
            name: "Splendor-touched",
            level: 7,
            domain: "Splendor",
            type: "ability",
            recallCost: 2,
            description: [
                "When 4 or more of the domain cards in your loadout are from the Splendor domain, gain the following benefits:",
                "+3 bonus to your Severe damage threshold",
                "Once per long rest, when incoming damage would require you to mark a number of Hit Points, you can choose to mark that much Stress or spend that much Hope instead."
            ]
        },
        {
            name: "Shield Aura",
            level: 8,
            domain: "Splendor",
            type: "spell",
            recallCost: 2,
            description: [
                "Mark a Stress to cast a protective aura on a target within Very Close range. When the target marks an Armor Slot, they reduce the severity of the attack by an additional threshold. If this spell causes a creature who would be damaged to instead mark no Hit Points, the effect ends. You can only hold Shield Aura on one creature at a time."
            ]
        },
        {
            name: "Stunning Sunlight",
            level: 8,
            domain: "Splendor",
            type: "spell",
            recallCost: 2,
            description: [
                "Make a Spellcast Roll to unleash powerful rays of burning sunlight against all adversaries in front of you within Far range. On a success, spend any number of Hope and force that many targets you succeeded against to make a Reaction Roll (14). Targets who succeed take 3d20+3 magic damage. Targets who fail take 4d20+5 magic damage and are temporarily Stunned. While Stunned, they can't use reactions and can't take any other actions until they clear this condition."
            ]
        },
        {
            name: "Overwhelming Aura",
            level: 9,
            domain: "Splendor",
            type: "spell",
            recallCost: 2,
            description: [
                "Make a Spellcast Roll (15) to magically empower your aura. On a success, spend 2 Hope to make your Presence equal to your Spellcast trait until your next long rest. While this spell is active, an adversary must mark a Stress when they target you with an attack."
            ]
        },
        {
            name: "Salvation Beam",
            level: 9,
            domain: "Splendor",
            type: "spell",
            recallCost: 2,
            description: [
                "Make a Spellcast Roll (16). On a success, mark any number of Stress to target a line of allies within Far range. You can clear Hit Points on the targets equal to the number of Stress marked, divided among them however you'd like."
            ]
        },
        {
            name: "Invigoration",
            level: 10,
            domain: "Splendor",
            type: "spell",
            recallCost: 3,
            description: [
                "When you or an ally within Close range has used a feature that has an exhaustion limit (such as once per rest or once per session), you can spend any number of Hope and roll that many d6s. If any roll a 6, the feature can be used again."
            ]
        },
        {
            name: "Resurrection",
            level: 10,
            domain: "Splendor",
            type: "spell",
            recallCost: 2,
            description: [
                "Make a Spellcast Roll (20). On a success, restore one creature who has been dead no longer than 100 years to full strength. Then roll a d6. On a result of 5 or lower, place this card in your vault permanently. On a failure, you can't cast Resurrection again for a week."
            ]
        }
    ],
    Valor: [
        {
            name: "Bare Bones",
            level: 1,
            domain: "Valor",
            type: "ability",
            recallCost: 0,
            description: [
                "When you choose not to equip armor, you have a base Armor Score of 3 + your Strength and use the following as your base damage thresholds:",
                "• Tier 1: 9/19",
                "• Tier 2: 11/24",
                "• Tier 3: 13/31",
                "• Tier 4: 15/38"
            ]
        },
        {
            name: "Forceful Push",
            level: 1,
            domain: "Valor",
            type: "ability",
            recallCost: 0,
            description: [
                "Make an attack with your primary weapon against a target within Melee range. On a success, you deal damage and knock them back to Close range. On a success with Hope, add a d6 to your damage roll.",
                "Additionally, you can spend a Hope to make them temporarily Vulnerable."
            ]
        },
        {
            name: "I Am Your Shield",
            level: 1,
            domain: "Valor",
            type: "ability",
            recallCost: 1,
            description: [
                "When an ally within Very Close range would take damage, you can mark a Stress to stand in the way and make yourself the target of the attack instead. When you take damage from this attack, you can mark any number of Armor Slots."
            ]
        },
        {
            name: "Critical Inspiration",
            level: 1,
            domain: "Valor",
            type: "ability",
            recallCost: 1,
            description: [
                "Once per rest, when you critically succeed on an attack, all allies within Very Close range can clear a Stress or gain a Hope."
            ]
        },
        {
            name: "Body Basher",
            level: 2,
            domain: "Valor",
            type: "ability",
            recallCost: 1,
            description: [
                "You use the full force of your body in a fight. On a successful attack using a weapon with a Melee range, gain a bonus to your damage roll equal to your Strength."
            ]
        },
        {
            name: "Bold Presence",
            level: 2,
            domain: "Valor",
            type: "ability",
            recallCost: 0,
            description: [
                "When you make a Presence Roll, you can spend a Hope to add your Strength to the roll.",
                "Additionally, once per rest when you would gain a condition, you can describe how your bold presence aids you in the situation and avoid gaining the condition."
            ]
        },
        {
            name: "Lean On Me",
            level: 3,
            domain: "Valor",
            type: "ability",
            recallCost: 1,
            description: [
                "Once per long rest, when you console or inspire an ally who failed an action roll, you can both clear 2 Stress."
            ]
        },
        {
            name: "Valor-touched",
            level: 7,
            domain: "Valor",
            type: "ability",
            recallCost: 2,
            description: [
                "When 4 or more of the domain cards in your loadout are from the Valor domain, gain the following benefits:",
                "+2 bonus to your Armor Score",
                "Once per rest, when you would take Severe damage, you can mark a Stress to reduce the severity by one threshold."
            ]
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