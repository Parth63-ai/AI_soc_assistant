from google import genai
from config import GEMINI_API_KEY
from memory import conversation_history
import os

client = genai.Client(api_key=GEMINI_API_KEY)


def load_system_prompt():
    prompt_path = os.path.join(
        os.path.dirname(__file__),
        "..",
        "prompts",
        "soc_system_prompt.txt"
    )

    with open(prompt_path, "r", encoding="utf-8") as file:
        return file.read()


def ask_gemini(user_prompt: str):

    system_prompt = load_system_prompt()

    # Save user message
    conversation_history.append({
        "role": "user",
        "text": user_prompt
    })

    # Build complete conversation
    conversation = system_prompt + "\n\n"

    for message in conversation_history:
        conversation += f"{message['role'].capitalize()}: {message['text']}\n"

    # Send conversation to Gemini
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=conversation,
    )

    # Save Gemini response
    conversation_history.append({
        "role": "assistant",
        "text": response.text
    })

    return response.text