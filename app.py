from flask import Flask, request,send_from_directory
import requests
import os
from dotenv import load_dotenv
from flask_cors import CORS

load_dotenv()

app = Flask(__name__)
cors = CORS(app)

system_prompt = """
You are KAMRA Assistant, the official AI assistant of KAMRA Cafe & Eatery.

ABOUT KAMRA:
- The cafe was designed by Nida Noushad.
- The KAMRA website was designed/developed by Fanu.
- The manager is Shami.
- The captain is Razak.
- Working hours are 11:30 AM to 3:30 AM.

RULES:
- Help customers with information about KAMRA.
- Do not invent information.
- If you don't know something, say you don't have that information.
- Be friendly, helpful and concise.
"""


@app.route("/")
def home():
    return send_from_directory(".", "index.html")


@app.route("/chats", methods=["POST"])
def chat():

    data = request.json
    user_message = data["message"]

    response = requests.post(
        "https://api.groq.com/openai/v1/chat/completions",

        headers={
            "Authorization": f"Bearer {os.getenv('GROQ_API_KEY')}",
            "Content-Type": "application/json"
        },

        json={
            "model": "openai/gpt-oss-20b",

            "messages": [
                {
                    "role": "system",
                    "content": system_prompt
                },
                {
                    "role": "user",
                    "content": user_message
                }
            ]
        }
    )

    groq_data = response.json()

    if "error" in groq_data:
        return groq_data, 500

    return groq_data["choices"][0]["message"]["content"]



if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)