
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  

@app.route("/api/message", methods=["POST"])
def message():
    data = request.get_json()
    user_message = data.get("message")
    bot_response = f"You said: {user_message}. Interesting..."
    return jsonify({"response": bot_response})

if __name__ == "__main__":
    app.run(debug=True)
