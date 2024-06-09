from flask import Flask, request, jsonify, render_template, redirect, url_for, session
from pymongo import MongoClient, ReturnDocument
from bson import json_util, ObjectId
import json
import random

# Setup connection to MongoDB
app = Flask(__name__)
app.secret_key = 'your_secret_key'  # Needed for session handling
client = MongoClient("mongodb://localhost:27017/")
db = client["friend_matching_db"]
users_collection = db["users"]
counter_collection = db["counters"]

if counter_collection.count_documents({"_id": "email"}) == 0:
    counter_collection.insert_one({"_id": "email", "seq": 0})

def parse_json(data):
    return json.loads(json_util.dumps(data))

def get_next_email():
    counter = counter_collection.find_one_and_update(
        {"_id": "email"},
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
    print(compatibility_percentage)
    return compatibility_percentage

def update_compatibility_scores(updated_user):
    existing_users = list(users_collection.find({"email": {"$ne": updated_user["email"]}}))
    
    # Calculate compatibility scores for the updated user with all existing users
    updated_user_scores = []
    for user in existing_users:
        print(user)
        print("HI")
        score = calculate_compatibility(updated_user, user)
        updated_user_scores.append({"email": user["email"], "score": score})
        # Update the score for the existing user
        users_collection.update_one(
            {"_id": user["_id"]},
            {"$push": {"compatibility_scores": {"email": updated_user["email"], "score": score}}}
        )
    
    updated_user_scores = sorted(updated_user_scores, key=lambda x: x["score"], reverse=True)
    users_collection.update_one(
        {"_id": updated_user["_id"]},
        {"$set": {"compatibility_scores": updated_user_scores}}
    )

    # Ensure all compatibility scores for existing users are sorted
    for user in existing_users:
        sorted_scores = sorted(user["compatibility_scores"], key=lambda x: x["score"], reverse=True)
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
        email = session.get('email')  # Assuming email is stored in session
        if not email:
            return jsonify({"error": "Email is required"}), 400

        print(f"Request form data: {request.form.to_dict()}")

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

        existing_user = users_collection.find_one({"email": email})
        if existing_user:
            # Update existing user activities
            users_collection.update_one(
                {"email": email},
                {"$set": {
                    "activities": activities_data,
                    "compatibility_scores": []  # Ensure compatibility_scores field is present
                }}
            )
            existing_user["activities"] = activities_data
            existing_user["compatibility_scores"] = []  # Ensure compatibility_scores field is present
            update_compatibility_scores(existing_user)
        else:
            email = get_next_email()
            new_user_data = {
                "email": email,
                "email": email,
                "activities": activities_data,
                "compatibility_scores": []  # Ensure compatibility_scores field is present
            }
            new_user_data["_id"] = users_collection.insert_one(new_user_data).inserted_id
            update_compatibility_scores(new_user_data)

        return redirect(url_for("index"))

    except Exception as e:
        print(f"Exception occurred: {e}")
        return jsonify({"error": str(e)}), 500


@app.route("/loggedIn", methods=["POST"])
def loggedIn():
    try:
        userData = request.get_json()
        userData["likes"] = []
        userData["matches"] = []
        print("Request data", userData)
        # Store email in session
        session['email'] = userData["email"]
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

@app.route("/getUser", methods=["GET"])
def getUser():
    try:
        email = request.args.get('email')        
        user = users_collection.find_one({
            "email": email
        }, {"user_id": 1, "email": 1, "name": 1, "photo": 1, "likes": 1, "matches": 1, "compatibility_scores": 1})  # Include email explicitly
        if user is None:
            return jsonify({"error": "User not found"}), 404
        print("USER DATA", user)
        return parse_json(user), 200
    except Exception as e:
        print(f"Exception occurred: {e}")
        return jsonify({"error": str(e)}), 500

@app.route("/getUsers", methods=["GET"])
def getUsers():
    try:
        # Get the logged-in user's email from the request parameters
        email = request.args.get('email')
        users = list(users_collection.find({"email": {"$ne": email}}, {"user_id": 1, "email": 1, "name": 1, "photo": 1, "likes": 1, "matches": 1, "compatibility_scores": 1}))  # Include user_id explicitly
        print("HERHE")
        print(users)
        return {"users": parse_json(users)}, 200
    except Exception as e:
        print(f"Exception occurred: {e}")
        return jsonify({"error": str(e)}), 500





@app.route("/getUserById", methods=["GET"])
def get_user_by_id():
    try:
        email = request.args.get('email')
        print(f"Fetching data for email: {email}")

        user = users_collection.find_one({"_id": ObjectId(email)})
        if user is None:
            return jsonify({"error": "User not found"}), 404

        user_data = {
            "_id": str(user["_id"]),
            "name": user["name"],
            "email": user["email"],
            "photo": user["photo"],
            "likes": user.get("likes", []),
            "matches": [str(match_id) for match_id in user.get("matches", [])],
            "compatibility_scores": user.get("compatibility_scores", [])
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
        
        if "user_email" not in data or "liked_user_email" not in data:
            print("Request data missing required fields. Data received:", data)
            return jsonify({"error": "Request data missing required fields"}), 400

        user_email = data["user_email"]
        liked_email = data["liked_user_email"]  

        user = users_collection.find_one({"email": user_email})
        liked_user = users_collection.find_one({"email": liked_email})

        if not user:
            print("User email bad")
        if not liked_user:
            print("Liked user email bad")

        if not user or not liked_user:
            print(f"User or liked user not found: user_email={user_email}, liked_email={liked_email}")
            return jsonify({"error": "User not found"}), 404

        print(f"User {user['email']} liked user {liked_email}")

        # Add liked user to the user's likes
        users_collection.update_one(
            {"email": user_email},
            {"$addToSet": {"likes": liked_email}}
        )

        # Check if the liked user also likes the user
        if user_email in liked_user.get("likes", []):
            print(f"User {liked_email} also liked user {user_email}. Creating a match.")

            # Add each other to matches
            users_collection.update_one(
                {"email": user_email},
                {"$addToSet": {"matches": liked_email}}
            )
            users_collection.update_one(
                {"email": liked_email},
                {"$addToSet": {"matches": user_email}}
            )

            # Remove from likes
            users_collection.update_one(
                {"email": user_email},
                {"$pull": {"likes": liked_email}}
            )
            users_collection.update_one(
                {"email": liked_email},
                {"$pull": {"likes": user_email}}
            )

            # Find the most liked activity they have in common
            common_activities = set(user["likes"]).intersection(set(liked_user["likes"]))
            most_liked_activity = None
            max_likes = 0
            for activity in common_activities:
                likes_count = user["likes"].count(activity)
                if likes_count > max_likes:
                    max_likes = likes_count
                    most_liked_activity = activity

            # Update the database with the most liked activity they have in common
            users_collection.update_one(
                {"email": user_email},
                {"$set": {"most_liked_activity": most_liked_activity}}
            )
            users_collection.update_one(
                {"email": liked_email},
                {"$set": {"most_liked_activity": most_liked_activity}}
            )

        else:
            print(f"User {liked_email} has not liked user {user_email} back yet.")

        return '', 200
    except Exception as e:
        print(f"Exception occurred: {e}")
        return jsonify({"error": str(e)}), 500

@app.route("/check_matches", methods=["GET"])
def check_matches():
    user_email = request.args.get('email')
    user = users_collection.find_one({"email": user_email}, {"matches": 1})
    print(user_email)
    if user and "matches" in user and len(user["matches"]) >= 2:
        #show_popup = random.choice([True, False])  # 50% chance
        #return jsonify({"show_popup": show_popup}), 200
        print("popup should happen")
        return jsonify({"show_popup": True}), 200
    else:
        return jsonify({"show_popup": False}), 200


if __name__ == "__main__":
    app.run(debug=True)
