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
import type { DaggerheartCharacter } from './types/characterTypes';
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
        showTraitHelp,
        setShowTraitHelp,
    } = props;

    return (
        <Container maxWidth="md" sx={{ py: 0, px: 2 }}>
            {/* Info Section */}
            {activeSection === 'info' && (
                <InfoSection
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
            {/* Resources Section (play mode) */}
            {activeSection === 'resources' && (
                <HealthSection
                    calculateThreshold={calculateThreshold}
                />
            )}
            {/* Health Section (creation mode) */}
            {activeSection === 'health' && (
                <HealthSection
                    calculateThreshold={calculateThreshold}
                />
            )}
            {/* Weapons & Armor Section */}
            {activeSection === 'weapons' && (
                <WeaponsArmorSection />
            )}
            {/* Experiences Section */}
            {activeSection === 'experiences' && (
                <ExperiencesSection />
            )}
            {/* Features Section */}
            {activeSection === 'features' && (
                <FeaturesSection />
            )}
            {/* Domain Cards Section */}
            {activeSection === 'domains' && (
                <DomainCardsSection />
            )}
            {/* Inventory Section */}
            {activeSection === 'inventory' && (
                <InventorySection />
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