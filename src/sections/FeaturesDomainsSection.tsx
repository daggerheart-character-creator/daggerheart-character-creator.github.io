import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useCharacter } from '../CharacterContext';
import { ANCESTRY_DETAILS } from '../constants/ancestryDetails';
import { CLASS_DETAILS } from '../constants/classDetails';
import { COMMUNITY_DETAILS } from '../constants/communityDetails';
import { SUBCLASS_DETAILS } from '../constants/subclassDetails';

interface FeaturesSectionProps {
    // currentCharacter: DaggerheartCharacter; // Removed as per edit hint
}

const FeaturesSection: React.FC<FeaturesSectionProps> = () => {
    const { currentCharacter } = useCharacter();
    const classDetail = currentCharacter?.characterClass ? CLASS_DETAILS[currentCharacter.characterClass] : null;
    const subclassDetail = (currentCharacter?.characterClass && currentCharacter?.subclass && SUBCLASS_DETAILS[currentCharacter.characterClass]?.[currentCharacter.subclass]) || null;
    const ancestryDetail = currentCharacter?.heritage ? ANCESTRY_DETAILS[currentCharacter.heritage] : null;
    const communityDetail = currentCharacter?.community ? COMMUNITY_DETAILS[currentCharacter.community] : null;

    return (
        <Paper elevation={2} sx={{ p: 2, mb: 2, boxSizing: 'border-box' }}>
            <Typography variant="h5" gutterBottom>FEATURES & ABILITIES</Typography>
            {/* Class Features */}
            {classDetail && classDetail.classFeatures && (
                <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" fontWeight={700} sx={{ mt: 2, mb: 1 }}>Class Features</Typography>
                    {classDetail.classFeatures.map((feature, idx) => (
                        <Box key={idx} sx={{ mb: 1.5 }}>
                            <Typography variant="subtitle2" fontWeight={600}>{feature.name}</Typography>
                            <Typography variant="body2">{feature.description}</Typography>
                        </Box>
                    ))}
                </Box>
            )}
            {/* Subclass Features */}
            {subclassDetail && (
                <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" fontWeight={700} sx={{ mt: 2, mb: 1 }}>Subclass Features</Typography>
                    <Box sx={{ mb: 1 }}>
                        <Typography variant="subtitle2" fontWeight={600}>Foundation Feature: {subclassDetail.foundationFeature.name}</Typography>
                        <Typography variant="body2">{subclassDetail.foundationFeature.description}</Typography>
                    </Box>
                    <Box sx={{ mb: 1 }}>
                        <Typography variant="subtitle2" fontWeight={600}>Specialization Feature: {subclassDetail.specializationFeature.name}</Typography>
                        <Typography variant="body2">{subclassDetail.specializationFeature.description}</Typography>
                    </Box>
                    <Box sx={{ mb: 1 }}>
                        <Typography variant="subtitle2" fontWeight={600}>Mastery Feature: {subclassDetail.masteryFeature.name}</Typography>
                        <Typography variant="body2">{subclassDetail.masteryFeature.description}</Typography>
                    </Box>
                </Box>
            )}
            {/* Ancestry Features */}
            {ancestryDetail && (
                <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" fontWeight={700} sx={{ mt: 2, mb: 1 }}>Ancestry Features</Typography>
                    <Box sx={{ mb: 1 }}>
                        <Typography variant="subtitle2" fontWeight={600}>{ancestryDetail.feature1.name}</Typography>
                        <Typography variant="body2">{ancestryDetail.feature1.description}</Typography>
                    </Box>
                    <Box sx={{ mb: 1 }}>
                        <Typography variant="subtitle2" fontWeight={600}>{ancestryDetail.feature2.name}</Typography>
                        <Typography variant="body2">{ancestryDetail.feature2.description}</Typography>
                    </Box>
                </Box>
            )}
            {/* Community Features */}
            {communityDetail && (
                <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" fontWeight={700} sx={{ mt: 2, mb: 1 }}>Community Feature</Typography>
                    <Box sx={{ mb: 1 }}>
                        <Typography variant="subtitle2" fontWeight={600}>{communityDetail.feature.name}</Typography>
                        <Typography variant="body2">{communityDetail.feature.description}</Typography>
                    </Box>
                </Box>
            )}
            {/* Fallback if nothing is selected */}
            {!classDetail && !subclassDetail && !ancestryDetail && !communityDetail && (
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>Select a class, subclass, ancestry, and community to view all features and abilities.</Typography>
            )}
        </Paper>
    );
};

export default FeaturesSection; 