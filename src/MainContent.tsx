import Container from '@mui/material/Container';
import React from 'react';
import DomainCardsSection from './sections/DomainCardsSection';
import ExperiencesSection from './sections/ExperiencesSection';
import FeaturesSection from './sections/FeaturesDomainsSection';
import HealthSection from './sections/HealthSection';
import InfoSection from './sections/InfoSection';
import InventorySection from './sections/InventorySection';
import TraitsSection from './sections/TraitsSection';
import WeaponsArmorSection from './sections/WeaponsArmorSection';
import type { Armor, DaggerheartCharacter, Weapon } from './types/characterTypes';
import type { TraitName, TraitValue } from './types/traits';

interface MainContentProps {
    activeSection: string;
    currentCharacter: DaggerheartCharacter;
    updateCharacterField: (field: keyof DaggerheartCharacter, value: any) => void;
    subclassOptions: any;
    CLASS_OPTIONS: any;
    ANCESTRY_OPTIONS: any;
    COMMUNITY_OPTIONS: any;
    traitAssignment: Record<TraitName, TraitValue | null>;
    traitIssues: Record<TraitName, 'duplicate' | 'unassigned' | null>;
    remainingTraitValues: TraitValue[];
    getAvailableValues: (trait: TraitName) => TraitValue[];
    handleTraitChange: (trait: TraitName, value: TraitValue | '') => void;
    resetTraitAssignment: () => void;
    showTraitHelp: boolean;
    setShowTraitHelp: (show: boolean) => void;
    calculateThreshold: (base: number) => number;
    toggleCircles: (resourceType: 'hp' | 'stress' | 'hope' | 'proficiency', index: number) => void;
    isCreationMode: boolean;
    handleWeaponChange: (index: number, field: keyof Weapon, value: string) => void;
    handleArmorChange: (index: number, field: keyof Armor, value: string) => void;
}

const MainContent: React.FC<MainContentProps> = (props) => {
    const {
        activeSection,
        currentCharacter,
        updateCharacterField,
        subclassOptions,
        CLASS_OPTIONS,
        ANCESTRY_OPTIONS,
        COMMUNITY_OPTIONS,
        traitAssignment,
        traitIssues,
        remainingTraitValues,
        getAvailableValues,
        handleTraitChange,
        resetTraitAssignment,
        calculateThreshold,
        toggleCircles,
        isCreationMode,
        handleWeaponChange,
        handleArmorChange,
    } = props;

    return (
        <Container maxWidth="md" sx={{ py: 0, px: 2 }}>
            {/* Info Section */}
            {activeSection === 'info' && (
                <InfoSection
                    currentCharacter={currentCharacter}
                    updateCharacterField={updateCharacterField}
                    subclassOptions={subclassOptions}
                    CLASS_OPTIONS={CLASS_OPTIONS}
                    ANCESTRY_OPTIONS={ANCESTRY_OPTIONS}
                    COMMUNITY_OPTIONS={COMMUNITY_OPTIONS}
                />
            )}
            {/* Traits Section */}
            {activeSection === 'traits' && (
                <TraitsSection
                    traitAssignment={traitAssignment}
                    traitIssues={traitIssues}
                    remainingTraitValues={remainingTraitValues}
                    getAvailableValues={getAvailableValues}
                    handleTraitChange={handleTraitChange}
                    resetTraitAssignment={resetTraitAssignment}
                />
            )}
            {/* Health Section */}
            {activeSection === 'health' && (
                <HealthSection
                    currentCharacter={currentCharacter}
                    calculateThreshold={calculateThreshold}
                    toggleCircles={toggleCircles}
                    isCreationMode={isCreationMode}
                />
            )}
            {/* Weapons & Armor Section */}
            {activeSection === 'weapons' && (
                <WeaponsArmorSection
                    currentCharacter={currentCharacter}
                    handleWeaponChange={handleWeaponChange}
                    handleArmorChange={handleArmorChange}
                />
            )}
            {/* Experiences Section */}
            {activeSection === 'experiences' && (
                <ExperiencesSection
                    currentCharacter={currentCharacter}
                    updateCharacterField={updateCharacterField}
                />
            )}
            {/* Features Section */}
            {activeSection === 'features' && (
                <FeaturesSection currentCharacter={currentCharacter} />
            )}
            {/* Domain Cards Section */}
            {activeSection === 'domains' && (
                <DomainCardsSection
                    currentCharacter={currentCharacter}
                    updateCharacterField={updateCharacterField}
                />
            )}
            {/* Inventory Section */}
            {activeSection === 'inventory' && (
                <InventorySection
                    currentCharacter={currentCharacter}
                    updateCharacterField={updateCharacterField}
                />
            )}
            {/* Rally Section (Bard only) */}
            {currentCharacter?.characterClass === 'Bard' && activeSection === 'rally' && (
                <section className="rally-section box">
                    <h2>RALLY</h2>
                    <p>
                        Once per session, describe how you rally the party and give yourself and each of your allies a Rally Die. At level 1, your Rally Die is a d6. A PC can spend their Rally Die to roll it, adding the result to their action roll, reaction roll, damage roll, or to clear a number of Stress equal to the result. Your Rally Die increases at higher levels.
                    </p>
                </section>
            )}
        </Container>
    );
};

export default MainContent; 