from pymongo import MongoClient

# Connect to the MongoDB server running in Docker
client = MongoClient("mongodb://localhost:27017/")

# Access the database and collection
db = client["friend_matching_db"]
users_collection = db["users"]

# Function to calc compatibility score
def calculate_compatibility(user1, user2):
    score = 0
    for activity in user1["activities"]:
        if activity in user2["activities"]:
            interest_diff = abs(user1["activities"][activity]["interest"] - user2["activities"][activity]["interest"])
            desired_diff = abs(user1["activities"][activity]["desired_interest"] - user2["activities"][activity]["interest"])
            score += (3 - interest_diff) + (3 - desired_diff)
    return score

def find_compatibility_scores():
    users = list(users_collection.find())
    for i in range(len(users)):
        for j in range(i + 1, len(users)):
            score = calculate_compatibility(users[i], users[j])
            print(f"Compatibility score between user {users[i]['user_id']} and user {users[j]['user_id']}: {score}")

# Test function for adding sample users
def add_users():
    users_collection.insert_many([
        {
            "user_id": 1,
            "activities": {
                "running": {"interest": 2, "desired_interest": 3},
                "gym": {"interest": 3, "desired_interest": 3},
                "eating": {"interest": 1, "desired_interest": 2}
            }
        },
        {
            "user_id": 2,
            "activities": {
                "running": {"interest": 3, "desired_interest": 3},
                "gym": {"interest": 1, "desired_interest": 2},
                "eating": {"interest": 2, "desired_interest": 1}
            }
        }
    ])


add_users()

# Find compatibility scores between users
find_compatibility_scores()
