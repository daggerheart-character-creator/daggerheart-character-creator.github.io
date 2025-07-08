import type { CommunityDetail } from '../types/characterTypes';

export const COMMUNITY_DETAILS: Record<string, CommunityDetail> = {
    Highborne: {
        name: 'Highborne',
        description: 'Accustomed to a life of elegance, opulence, and prestige within the upper echelons of society. Highborne communities possess material wealth, power, and influence, often controlling the political and economic status of their regions.',
        feature: {
            name: 'Privilege',
            description: 'You have advantage on rolls to consort with nobles, negotiate prices, or leverage your reputation to get what you want.'
        }
    },
    Ridgeborne: {
        name: 'Ridgeborne',
        description: 'Mountain-dwelling communities adept at adaptation, technology, and survival in dangerous terrain. Ridgeborne are sturdy, strong-willed, and skilled at traversing cliffs and peaks.',
        feature: {
            name: 'Steady',
            description: 'You have advantage on rolls to traverse dangerous cliffs and ledges, navigate harsh environments, and use your survival knowledge.'
        }
    },
    Underborne: {
        name: 'Underborne',
        description: 'Subterranean societies known for their boldness, resourcefulness, and feats of engineering. Underborne thrive in underground environments and develop unique nonverbal languages.',
        feature: {
            name: 'Low-Light Living',
            description: 'When you’re in an area with low light or heavy shadow, you have advantage on rolls to hide, investigate, or perceive details within that area.'
        }
    },
    Loreborne: {
        name: 'Loreborne',
        description: 'Communities that value knowledge, history, and political or academic prowess. Loreborne are scholars, researchers, and keepers of lore, often found in institutions or isolated enclaves.',
        feature: {
            name: 'Well-Read',
            description: 'You have advantage on rolls that involve the history, culture, or politics of a prominent person or place.'
        }
    },
    Seaborne: {
        name: 'Seaborne',
        description: 'Communities built around large bodies of water, skilled in sailing, fishing, and surviving the tides. Seaborne are tied to the ocean and its creatures, and are known for their resilience and cooperation.',
        feature: {
            name: 'Know the Tide',
            description: 'When you roll with Fear, place a token on your community card (max = your level). Before an action roll, spend tokens for +1 per token. Clear all tokens at the end of each session.'
        }
    },
    Wanderborne: {
        name: 'Wanderborne',
        description: 'Nomadic communities defined by travel, adaptability, and loyalty. Wanderborne value information, skills, and connections over material possessions.',
        feature: {
            name: 'Nomadic Pack',
            description: 'Add a Nomadic Pack to your inventory. Once per session, spend a Hope to pull out a mundane item useful to your situation.'
        }
    },
    Orderborne: {
        name: 'Orderborne',
        description: 'Communities focused on discipline, faith, and shared principles. Orderborne are powerful, organized, and often mobilize around a common value or goal.',
        feature: {
            name: 'Dedicated',
            description: 'Record three sayings or values from your upbringing. Once per rest, when you embody one of these principles, you can roll a d20 as your Hope Die.'
        }
    },
    Slyborne: {
        name: 'Slyborne',
        description: 'Groups that operate outside the law, including criminals, grifters, and con artists. Slyborne are clever, formidable, and possess strict codes of honor.',
        feature: {
            name: 'Scoundrel',
            description: 'You have advantage on rolls to negotiate with criminals, detect lies, or find a safe place to hide.'
        }
    },
    Wildborne: {
        name: 'Wildborne',
        description: 'Forest-dwelling communities dedicated to conservation and sustainability. Wildborne integrate their homes with nature and avoid disturbing the environment.',
        feature: {
            name: 'Lightfoot',
            description: 'Your movement is naturally silent. You have advantage on rolls to move without being heard.'
        }
    }
}; 