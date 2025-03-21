# MindSage - AI-Powered Mental Health Chatbot
MindSage is a simple yet intelligent AI-powered chatbot that assesses a user's emotional and mental state through natural conversation. It uses machine learning and explainable AI techniques to provide real-time feedback, emotion tracking, and a final assessment summary.

# What This Project Does:
--> Provides an interactive chatbot for users to talk about their mental and emotional state.

--> Analyzes user input to detect emotions using a fine-tuned transformer model.

--> Displays live emotion updates in a sidebar during the chat.

--> Dynamically adjusts questions based on detected emotional state.

--> Generates a final assessment summary explaining the detected mental state and suggesting positive actions.

--> Uses SHAP (SHapley Additive exPlanations) to explain why the AI made a certain prediction.


# Technologies Used
--> Frontend: React.js, HTML, CSS

--> Backend: Python, Flask

--> AI Model: HuggingFace Transformers (fine-tuned on GoEmotions dataset)

--> Explainability: SHAP

--> Others: Axios for API calls, Sentiment library for initial rule-based setup

# Key Features
  1. Chat Interface:
     Users can have a conversation with the bot in a modern web UI.

  2. Emotion Detection:
     The bot detects emotions like happy, sad, neutral, anxious, or depressed using the AI model (transformers).

  3. Dynamic Questions:
     The chatbot asks a set of 5 dynamically tailored questions based on the emotional state. These questions change on the basis of response to previous question.

  4. Real-Time Emotion Tracker
     The right-side panel shows the user's mental state in real time. It updates dynamically as assessed from response to each question.

  5. Summary Report


# Dataset Used
We used the GoEmotions dataset by Google. It contains user comments labeled with 27 emotion classes. We converted the .tsv file into .csv and fine-tuned a transformer model for binary and multi-class classification of mental states.

# How to run
Create a virtual environment

Install dependencies using requirements.txt

Frontend:

cd frontend/

Run npm install

Run npm start

Backend:

Go to backend/

Run python app.py
