import pathlib
import json
from flask import Flask
from flask import request, jsonify, make_response


app = Flask(__name__)

PRIM_KEY = "user_id"


@app.route("/")
def root():

    return "UnBoreMe"


@app.route("/submit", methods=["POST"])
def submit():
    preferences = request.json

    required_keys = [
        "user_id",
        "timestamp",
        "days",
        "activites"
    ]

    if list(preferences.keys()) != required_keys:
        missing_keys = set(required_keys) - set(preferences.keys())
        return make_response(
            f'All required keys not present: {missing_keys}',
            400
        )

    with open("data/db.json") as in_:
        db = json.load(fp=in_)

    user_data = db.get(preferences[PRIM_KEY], dict())
    user_data["pref"] = preferences

    # Check if user_data updates in db as well
    with open("data/db.json", "w+") as out:
        json.dump(fp=out, obj=db)

    return make_response(
        "OK",
        200
    )


@app.route("/matches")
def matches():
    user_id = request.args[PRIM_KEY]

    with open("data/db.json") as in_:
        db = json.load(fp=in_)

    user_data = db.get(preferences[PRIM_KEY], dict())

    if len(user_data) == 0:
        return make_response(
            f'No user with id:{user_id}',
            400
        )
    elif user_data.get("matches") is None:
        return make_response(
            f'Matches are not generated for user:{user_id} yet. Try again!',
            504
        )
    else:
        matches = user_data["matches"]
        return jsonify(matches)


if __name__ == "__main__":
    app.run()
