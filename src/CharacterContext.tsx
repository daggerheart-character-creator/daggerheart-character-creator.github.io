import React, { createContext, useContext, useEffect, useState } from 'react';
import type { DaggerheartCharacter } from './types/characterTypes';
import { createNewCharacter } from './utils/characterUtils';

interface CharacterContextType {
    characters: DaggerheartCharacter[];
    currentCharacter: DaggerheartCharacter;
    currentCharacterId: string;
    setCurrentCharacterId: (id: string) => void;
    addCharacter: () => void;
    deleteCharacter: (id: string) => void;
    updateCharacterField: (field: keyof DaggerheartCharacter, value: any) => void;
}

const CharacterContext = createContext<CharacterContextType | undefined>(undefined);

const CHARACTER_STORAGE_KEY = 'daggerheartCharacters';
const CHARACTER_ID_STORAGE_KEY = 'daggerheartCurrentCharacterId';

export const CharacterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Load from storage or create a new character
    const [characters, setCharacters] = useState<DaggerheartCharacter[]>(() => {
        const stored = localStorage.getItem(CHARACTER_STORAGE_KEY);
        if (stored) {
            try {
                const arr = JSON.parse(stored);
                if (Array.isArray(arr) && arr.length > 0) return arr;
            } catch { }
        }
        return [createNewCharacter()];
    });

    const [currentCharacterId, setCurrentCharacterId] = useState<string>(() => {
        const stored = localStorage.getItem(CHARACTER_ID_STORAGE_KEY);
        if (stored) return stored;
        return characters[0].id;
    });

    // Persist characters and currentCharacterId
    useEffect(() => {
        localStorage.setItem(CHARACTER_STORAGE_KEY, JSON.stringify(characters));
    }, [characters]);
    useEffect(() => {
        localStorage.setItem(CHARACTER_ID_STORAGE_KEY, currentCharacterId);
    }, [currentCharacterId]);

    // Get the current character object
    const currentCharacter = characters.find(c => c.id === currentCharacterId) || characters[0];

    // Update a field on the current character
    const updateCharacterField = (field: keyof DaggerheartCharacter, value: any) => {
        setCharacters(prev => prev.map(c =>
            c.id === currentCharacterId ? { ...c, [field]: value } : c
        ));
    };

    // Add a new character and select it
    const addCharacter = () => {
        const newChar = createNewCharacter();
        setCharacters(prev => [...prev, newChar]);
        setCurrentCharacterId(newChar.id);
    };

    // Delete a character and select another
    const deleteCharacter = (id: string) => {
        setCharacters(prev => {
            const filtered = prev.filter(c => c.id !== id);
            if (filtered.length === 0) {
                const newChar = createNewCharacter();
                setCurrentCharacterId(newChar.id);
                return [newChar];
            } else {
                if (id === currentCharacterId) {
                    setCurrentCharacterId(filtered[0].id);
                }
                return filtered;
            }
        });
    };

    return (
        <CharacterContext.Provider value={{
            characters,
            currentCharacter,
            currentCharacterId,
            setCurrentCharacterId,
            addCharacter,
            deleteCharacter,
            updateCharacterField,
        }}>
            {children}
        </CharacterContext.Provider>
    );
};

export const useCharacter = () => {
    const ctx = useContext(CharacterContext);
    if (!ctx) throw new Error('useCharacter must be used within a CharacterProvider');
    return ctx;
}; 