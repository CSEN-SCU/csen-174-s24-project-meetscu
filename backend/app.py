from flask import Flask, request, jsonify, render_template, redirect, url_for
from pymongo import MongoClient, ReturnDocument
from bson import json_util
from bson import ObjectId
import json

# Setup connection to MongoDB
app = Flask(__name__)
client = MongoClient("mongodb://localhost:27017/")
db = client["friend_matching_db"]
users_collection = db["users"]
counter_collection = db["counters"]

if counter_collection.count_documents({"_id": "user_id"}) == 0:
    counter_collection.insert_one({"_id": "user_id", "seq": 0})

def parse_json(data):
    return json.loads(json_util.dumps(data))

def get_next_user_id():
    counter = counter_collection.find_one_and_update(
        {"_id": "user_id"},
        {"$inc": {"seq": 1}},
        return_document=ReturnDocument.AFTER
    )
    return counter["seq"]

# Function to calculate compatibility score
def calculate_compatibility(user1, user2):
    total_score = 0
    total_possible_score = 1

    activities1 = {act["activity"]: act for act in user1["activities"]}
    activities2 = {act["activity"]: act for act in user2["activities"]}

    for activity in activities1:
        if activity in activities2:
            interest_user1 = activities1[activity]["interest_level"]
            interest_user2 = activities2[activity]["interest_level"]
            desired_interest_user1 = activities1[activity]["desired_interest_level"]
            desired_interest_user2 = activities2[activity]["desired_interest_level"]

            if interest_user1 is None or interest_user2 is None or desired_interest_user1 is None or desired_interest_user2 is None:
                continue

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

def update_compatibility_scores(new_user):
    existing_users = list(users_collection.find())

    # Calculate compatibility scores for the new user with all existing users
    new_user_scores = []
    for user in existing_users:
        score = calculate_compatibility(new_user, user)
        new_user_scores.append({"user_id": user["user_id"], "score": score})

    new_user_scores = sorted(new_user_scores, key=lambda x: x["score"], reverse=True)

    new_user["compatibility_scores"] = new_user_scores
    new_user_id = users_collection.insert_one(new_user).inserted_id

    for user in existing_users:
        score = calculate_compatibility(user, new_user)
        users_collection.update_one(
            {"_id": user["_id"]},
            {"$push": {"compatibility_scores": {"user_id": new_user["user_id"], "score": score}}}
        )

    for user in existing_users:
        updated_user = users_collection.find_one({"_id": user["_id"]})
        sorted_scores = sorted(updated_user["compatibility_scores"], key=lambda x: x["score"], reverse=True)
        users_collection.update_one(
            {"_id": user["_id"]},
            {"$set": {"compatibility_scores": sorted_scores}}
        )

@app.route("/")
def index():
    users = list(users_collection.find())
    return render_template("index.html", users=users)

@app.route("/submit", methods=["POST"])
def submit_interests():
    try:
        print(f"Request form data: {request.form}")

        activities_data = []

        for key in request.form:
            if key.endswith("[activity]"):
                index = key.split('[')[0]
                activity = request.form.get(f"{index}[activity]")
                interest_level = request.form.get(f"{index}[interest_level]")
                desired_interest_level = request.form.get(f"{index}[desired_interest_level]")

                interest_level = int(interest_level) if interest_level else None
                desired_interest_level = int(desired_interest_level) if desired_interest_level else None

                # Structure the data
                activity_data = {
                    "activity": activity,
                    "interest_level": interest_level,
                    "desired_interest_level": desired_interest_level
                }

                activities_data.append(activity_data)

        user_id = get_next_user_id()

        new_user_data = {
            "user_id": user_id,
            "activities": activities_data,
            "compatibility_scores": []
        }

        # Update compatibility scores and store the new user data
        update_compatibility_scores(new_user_data)

        return redirect(url_for("index"))

    except Exception as e:
        print(f"Exception occurred: {e}")
        return jsonify({"error": str(e)}), 500

# after logging in, store user in database
@app.route("/loggedIn", methods=["POST"])
def loggedIn():
    try:
        userData = request.get_json()
        userData["likes"] = []
        userData["matches"] = []
        print("Request data", userData)
        # Check if the user already exists
        existing_user = users_collection.find_one({"email": userData["email"]})
        if existing_user:
            print("User already exists in the database")
            return '', 200
        users_collection.insert_one(userData)
        return '', 200
    except Exception as e:
        print(f"Exception occurred: {e}")
        return jsonify({"error": str(e)}), 500

# get user data
@app.route("/getUser", methods=["GET"])
def getUser():
    try:
        email = request.args.get('email')        
        user = users_collection.find_one({
            "email": email
        }, {"user_id": 1, "email": 1, "name": 1, "photo": 1, "likes": 1, "matches": 1})  # Include user_id explicitly
        if user is None:
            return jsonify({"error": "User not found"}), 404
        print("USER DATA", user)
        return parse_json(user), 200
    except Exception as e:
        print(f"Exception occurred: {e}")
        return jsonify({"error": str(e)}), 500

@app.route("/getUserById", methods=["GET"])
def get_user_by_id():
    try:
        user_id = request.args.get('user_id')
        print(f"Fetching data for user_id: {user_id}")

        user = users_collection.find_one({"_id": ObjectId(user_id)})
        if user is None:
            return jsonify({"error": "User not found"}), 404

        user_data = {
            "_id": str(user["_id"]),
            "name": user["name"],
            "email": user["email"],
            "photo": user["photo"],
            "likes": user.get("likes", []),
            "matches": [str(match_id) for match_id in user.get("matches", [])]
        }
        return jsonify(user_data), 200
    except Exception as e:
        print(f"Exception occurred: {e}")
        return jsonify({"error": str(e)}), 500



@app.route("/like", methods=["POST"])
def like():
    try:
        data = request.get_json()
        print(f"Received like request data: {data}")
        
        if not data:
            print("No data received in the request.")
            return jsonify({"error": "No data received"}), 400
        
        if "user_email" not in data or "liked_user_id" not in data:
            print("Request data missing required fields. Data received:", data)
            return jsonify({"error": "Request data missing required fields"}), 400

        user_email = data["user_email"]
        liked_user_id = data["liked_user_id"]  

        # Extract ObjectId if provided as $oid
        if isinstance(liked_user_id, dict) and "$oid" in liked_user_id:
            liked_user_id = ObjectId(liked_user_id["$oid"])

        user = users_collection.find_one({"email": user_email})
        liked_user = users_collection.find_one({"_id": liked_user_id})

        if not user:
            print("User email bad")
        if not liked_user:
            print("Liked user id bad")

        if not user or not liked_user:
            print(f"User or liked user not found: user_email={user_email}, liked_user_id={liked_user_id}")
            return jsonify({"error": "User not found"}), 404

        print(f"User {user['email']} liked user {liked_user_id}")

        # Add liked user to the user's likes
        users_collection.update_one(
            {"email": user_email},
            {"$addToSet": {"likes": liked_user_id}}
        )

        # Check if the liked user also likes the user
        if user["_id"] in liked_user.get("likes", []):
            print(f"User {liked_user_id} also liked user {user['email']}. Creating a match.")

            # Add each other to matches
            users_collection.update_one(
                {"email": user_email},
                {"$addToSet": {"matches": liked_user_id}}
            )
            users_collection.update_one(
                {"_id": liked_user_id},
                {"$addToSet": {"matches": user["_id"]}}
            )

            # Remove from likes
            users_collection.update_one(
                {"email": user_email},
                {"$pull": {"likes": liked_user_id}}
            )
            users_collection.update_one(
                {"_id": liked_user_id},
                {"$pull": {"likes": user["_id"]}}
            )
        else:
            print(f"User {liked_user_id} has not liked user {user['email']} back yet.")

        return '', 200
    except Exception as e:
        print(f"Exception occurred: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
