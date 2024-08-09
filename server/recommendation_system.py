from pymongo import MongoClient
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
import sys
import json
from bson.objectid import ObjectId

def fetch_location_by_id(location_id):
    client = MongoClient("mongodb+srv://vinaychakravarthi10110:EykKaaCi50klzwVq@cluster0.bqykut9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    db = client['test']
    collection = db['locations']
    location = collection.find_one({"_id": ObjectId(location_id)})
    return location

def fetch_all_locations():
    client = MongoClient("mongodb+srv://vinaychakravarthi10110:EykKaaCi50klzwVq@cluster0.bqykut9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    db = client['test']
    collection = db['locations']
    return list(collection.find())

def get_tags_vector(locations):
    all_tags = set(tag['name'] for loc in locations if 'tags' in loc and loc['tags'] is not None for tag in loc['tags'])
    tag_to_index = {tag: i for i, tag in enumerate(all_tags)}
    
    vectors = []
    for loc in locations:
        vector = [0] * len(all_tags)
        if 'tags' in loc and loc['tags'] is not None:
            for tag in loc['tags']:
                vector[tag_to_index[tag['name']]] = 1
        vectors.append(vector)
    
    return np.array(vectors), tag_to_index

def recommend_locations(locations, target_location, num_recommendations=3):
    tags_vectors, tag_to_index = get_tags_vector(locations)
    target_vector = np.array([0] * len(tag_to_index))
    
    if 'tags' in target_location and target_location['tags'] is not None:
        for tag in target_location['tags']:
            if tag['name'] in tag_to_index:
                target_vector[tag_to_index[tag['name']]] = 1
    
    similarities = cosine_similarity([target_vector], tags_vectors)[0]
    ranked_indices = np.argsort(similarities)[::-1]
    
    recommendations = []
    for i in ranked_indices:
        recommended_loc = locations[i]
        if recommended_loc['_id'] != target_location['_id']:
            recommendations.append(str(recommended_loc['_id']))
        if len(recommendations) >= num_recommendations:
            break
    return recommendations

def save_recommendations(user_id, recommendations):
    client = MongoClient("mongodb+srv://vinaychakravarthi10110:EykKaaCi50klzwVq@cluster0.bqykut9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    db = client['test']
    collection = db['recommends']

    existing_recommendation = collection.find_one({"userId": ObjectId(user_id)})
    
    if existing_recommendation:
        existing_recs = set(str(rec) for rec in existing_recommendation["recommendations"])
        new_recommendations = [ObjectId(rec) for rec in recommendations if rec not in existing_recs]
        
        if new_recommendations:
            collection.update_one(
                {"userId": ObjectId(user_id)},
                {"$addToSet": {"recommendations": {"$each": new_recommendations}}}
            )
    else:
        recommendation_data = {
            "userId": ObjectId(user_id),
            "recommendations": [ObjectId(rec_id) for rec_id in recommendations]
        }
        collection.insert_one(recommendation_data)

class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        return json.JSONEncoder.default(self, o)
    
if __name__ == '__main__':
    location_id = sys.argv[1]
    user_id = sys.argv[2]
    target_location = fetch_location_by_id(location_id)
    locations = fetch_all_locations()
    recommendations = recommend_locations(locations, target_location, num_recommendations=1)
    save_recommendations(user_id, recommendations)
