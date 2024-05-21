from flask import Flask, request, jsonify, render_template, redirect, url_for
from pymongo import MongoClient

# Setup connection to MongoDB
app = Flask(__name__)
client = MongoClient("mongodb://localhost:27017/")
db = client["friend_matching_db"]
users_collection = db["users"]

# Function to calculate compatibility score
def calculate_compatibility(user1, user2):
    total_score = 0
    total_possible_score = 1

    for activity in user1["activities"]:
        if activity in user2["activities"]:
            interest_user1 = int(user1["activities"][activity]["interest"])
            interest_user2 = int(user2["activities"][activity]["interest"])
            desired_interest_user1 = int(user1["activities"][activity]["desired_interest"])
            desired_interest_user2 = int(user2["activities"][activity]["desired_interest"])

            denominator = max(interest_user1, interest_user2)
            if denominator == 0:
                denominator = 1

            activity_score = min(interest_user1, interest_user2) / denominator
            desired_activity_score = min(desired_interest_user1, desired_interest_user2) / denominator

            # Update the total scores
            total_score += activity_score + desired_activity_score
            total_possible_score += 2

    # Calculate the compatibility percentage
    compatibility_percentage = (total_score / total_possible_score) if total_possible_score > 0 else 0
    return compatibility_percentage

def calculate_and_store_all_scores():
    existing_users = list(users_collection.find())

    # Calculate and store compatibility scores for all pairs of users
    for i, user1 in enumerate(existing_users):
        compatibility_scores = []
        for j, user2 in enumerate(existing_users):
            if i != j:
                score = calculate_compatibility(user1, user2)
                compatibility_scores.append((user2["_id"], score))

        sorted_scores = sorted(compatibility_scores, key=lambda x: x[1], reverse=True)

        users_collection.update_one(
            {"_id": user1["_id"]},
            {"$set": {"compatibility_scores": sorted_scores}}
        )

@app.route("/")
def index():
    print("test")
    calculate_and_store_all_scores()
    
    users = list(users_collection.find())

    return render_template("index.html", users=users)

@app.route("/submit", methods=["POST"])
def submit_interests():
    print("test2")
    try:
        interests = request.form.getlist("interests")
        if interests:
            user_data = {
                "user_id": users_collection.count_documents({}) + 1,
                "activities": {}
            }
            for interest in interests:
                interest_level = request.form.get(f"{interest}_interest")
                desired_interest_level = request.form.get(f"{interest}_desired_interest")
                if interest_level is not None and desired_interest_level is not None:
                    interest_level = int(interest_level)
                    desired_interest_level = int(desired_interest_level)
                    user_data["activities"][interest] = {"interest": interest_level, "desired_interest": desired_interest_level}
                else:
                    return jsonify({"message": f"Invalid value for {interest}"}), 400
            users_collection.insert_one(user_data)
            
            return redirect(url_for("index"))
        else:
            return jsonify({"message": "No interests submitted"}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
