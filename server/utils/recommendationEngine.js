const Location = require('../models/Location');
const Recommend = require('../models/Recommend');

/**
 * Calculate cosine similarity between two vectors
 */
function cosineSimilarity(vecA, vecB) {
    const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
    const magnitudeA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
    const magnitudeB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
    
    if (magnitudeA === 0 || magnitudeB === 0) return 0;
    return dotProduct / (magnitudeA * magnitudeB);
}

/**
 * Extract all unique tags from locations and create tag-to-index mapping
 */
function getTagsVector(locations) {
    const allTags = new Set();
    
    // Collect all unique tags
    locations.forEach(loc => {
        if (loc.tags && Array.isArray(loc.tags)) {
            loc.tags.forEach(tag => {
                if (tag && tag.name) {
                    allTags.add(tag.name);
                }
            });
        }
    });
    
    const tagToIndex = {};
    Array.from(allTags).forEach((tag, index) => {
        tagToIndex[tag] = index;
    });
    
    // Create vectors for each location
    const vectors = locations.map(loc => {
        const vector = new Array(allTags.size).fill(0);
        if (loc.tags && Array.isArray(loc.tags)) {
            loc.tags.forEach(tag => {
                if (tag && tag.name && tagToIndex.hasOwnProperty(tag.name)) {
                    vector[tagToIndex[tag.name]] = 1;
                }
            });
        }
        return vector;
    });
    
    return { vectors, tagToIndex };
}

/**
 * Generate location recommendations based on tag similarity
 */
function recommendLocations(locations, targetLocation, numRecommendations = 3) {
    if (locations.length <= 1) return [];
    
    const { vectors, tagToIndex } = getTagsVector(locations);
    
    // Create target vector
    const targetVector = new Array(Object.keys(tagToIndex).length).fill(0);
    if (targetLocation.tags && Array.isArray(targetLocation.tags)) {
        targetLocation.tags.forEach(tag => {
            if (tag && tag.name && tagToIndex.hasOwnProperty(tag.name)) {
                targetVector[tagToIndex[tag.name]] = 1;
            }
        });
    }
    
    // Calculate similarities
    const similarities = vectors.map(vector => 
        cosineSimilarity(targetVector, vector)
    );
    
    // Create array of indices with their similarities
    const indexedSimilarities = similarities.map((similarity, index) => ({
        index,
        similarity,
        locationId: locations[index]._id.toString()
    }));
    
    // Sort by similarity (descending) and filter out target location
    const recommendations = indexedSimilarities
        .filter(item => item.locationId !== targetLocation._id.toString())
        .sort((a, b) => b.similarity - a.similarity)
        .slice(0, numRecommendations)
        .map(item => item.locationId);
    
    return recommendations;
}

/**
 * Save recommendations to database
 */
async function saveRecommendations(userId, recommendations) {
    try {
        const existingRecommendation = await Recommend.findOne({ userId });
        
        if (existingRecommendation) {
            // Get existing recommendations as strings for comparison
            const existingRecs = new Set(
                existingRecommendation.recommendations.map(rec => rec.toString())
            );
            
            // Filter out recommendations that already exist
            const newRecommendations = recommendations.filter(
                rec => !existingRecs.has(rec)
            );
            
            if (newRecommendations.length > 0) {
                await Recommend.updateOne(
                    { userId },
                    { $addToSet: { recommendations: { $each: newRecommendations } } }
                );
            }
        } else {
            // Create new recommendation document
            await Recommend.create({
                userId,
                recommendations
            });
        }
    } catch (error) {
        console.error('Error saving recommendations:', error);
        throw error;
    }
}

/**
 * Main function to generate and save recommendations
 */
async function generateRecommendations(locationId, userId) {
    try {
        // Fetch target location and all locations
        const [targetLocation, allLocations] = await Promise.all([
            Location.findById(locationId),
            Location.find()
        ]);
        
        if (!targetLocation) {
            throw new Error('Target location not found');
        }
        
        // Generate recommendations
        const recommendations = recommendLocations(
            allLocations, 
            targetLocation, 
            3 // Number of recommendations
        );
        
        // Save recommendations if any were generated
        if (recommendations.length > 0) {
            await saveRecommendations(userId, recommendations);
        }
        
        return recommendations;
    } catch (error) {
        console.error('Error generating recommendations:', error);
        throw error;
    }
}

module.exports = {
    generateRecommendations,
    recommendLocations,
    saveRecommendations,
    cosineSimilarity
};
