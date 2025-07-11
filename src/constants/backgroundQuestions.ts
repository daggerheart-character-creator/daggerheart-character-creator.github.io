// Daggerheart class-specific background questions and connections from the core rules
export const CLASS_BACKGROUND_QUESTIONS_AND_CONNECTIONS: Record<string, { questions: string[]; connections: string[] }> = {
    Bard: {
        questions: [
            'Who from your community taught you to have such confidence in yourself?',
            'You were in love once. Who did you adore, and how did they hurt you?',
            'You’ve always looked up to another bard. Who are they, and why do you idolize them?'
        ],
        connections: [
            // Not found in the provided excerpt, add if available
        ]
    },
    Druid: {
        questions: [
            'Why was the community you grew up in so reliant on nature and its creatures?',
            'Who was the first wild animal you bonded with? Why did your bond end?',
            'Who has been trying to hunt you down? What do they want from you?'
        ],
        connections: [
            'What did you confide in me that makes me leap into danger for you every time?',
            'What animal do I say you remind me of?',
            'What affectionate nickname have you given me?'
        ]
    },
    Guardian: {
        questions: [
            'Who from your community did you fail to protect, and why do you still think of them?',
            'You’ve been tasked with protecting something important and delivering it somewhere dangerous. What is it, and where does it need to go?',
            'You consider an aspect of yourself to be a weakness. What is it, and how has it affected you?'
        ],
        connections: [
            'How did I save your life the first time we met?',
            'What small gift did you give me that you notice I always carry with me?',
            'What lie have you told me about yourself that I absolutely believe?'
        ]
    },
    Ranger: {
        questions: [
            'A terrible creature hurt your community, and you’ve vowed to hunt them down. What are they, and what unique trail or sign do they leave behind?',
            'Your first kill almost killed you, too. What was it, and what part of you was never the same after that event?',
            'You’ve traveled many dangerous lands, but what is the one place you refuse to go?'
        ],
        connections: [
            'What friendly competition do we have?',
            'Why do you act differently when we’re alone than when others are around?',
            'What threat have you asked me to watch for, and why are you worried about it?'
        ]
    },
    Rogue: {
        questions: [
            'What did you get caught doing that got you exiled from your home community?',
            'You used to have a different life, but you’ve tried to leave it behind. Who from your past is still chasing you?',
            'Who from your past were you most sad to say goodbye to?'
        ],
        connections: [
            'What did I recently convince you to do that got us both in trouble?',
            'What have I discovered about your past that I hold secret from the others?',
            'Who do you know from my past, and how have they influenced your feelings about me?'
        ]
    },
    Seraph: {
        questions: [
            'Which god did you devote yourself to? What incredible feat did they perform for you in a moment of desperation?',
            'How did your appearance change after taking your oath?',
            'In what strange or unique way do you communicate with your god?'
        ],
        connections: [
            'What promise did you make me agree to, should you die on the battlefield?',
            'Why do you ask me so many questions about my god?',
            'You’ve told me to protect one member of our party above all others, even yourself. Who are they and why?'
        ]
    },
    Sorcerer: {
        questions: [
            'What did you do that made the people in your community wary of you?',
            'What mentor taught you to control your untamed magic, and why are they no longer able to guide you?',
            'You have a deep fear you hide from everyone. What is it, and why does it scare you?'
        ],
        connections: [
            'Why do you trust me so deeply?'
        ]
    },
    Warrior: {
        questions: [
            'Who taught you to fight, and why did they stay behind when you left home?',
            'Somebody defeated you in battle years ago and left you to die. Who was it, and how did they betray you?',
            'What legendary place have you always wanted to visit, and why is it so special?'
        ],
        connections: [
            'We knew each other long before this party came together. How?',
            'What mundane task do you usually help me with off the battlefield?',
            'What fear am I helping you overcome?'
        ]
    },
    Wizard: {
        questions: [
            'What responsibilities did your community once count on you for? How did you let them down?',
            'You’ve spent your life searching for a book or object of great significance. What is it, and why is it so important to you?',
            'You have a powerful rival. Who are they, and why are you so determined to defeat them?'
        ],
        connections: [
            'What favor have I asked of you that you’re not sure you can fulfill?',
            'What weird hobby or strange fascination do we both share?',
            'What secret about yourself have you entrusted only to me?'
        ]
    },
    // TODO: Add any missing classes
}; 