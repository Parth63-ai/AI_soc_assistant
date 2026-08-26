from google import genai

from config import GEMINI_API_KEY


client = genai.Client(
    api_key=GEMINI_API_KEY
)


def create_embedding(text):
    result = client.models.embed_content(
        model="gemini-embedding-001",
        contents=text
    )

    return result.embeddings[0].values


if __name__ == "__main__":

    text = "PowerShell suspicious command"

    vector = create_embedding(text)

    print("Embedding created!")
    print("Vector size:", len(vector))
    print("First 5 values:", vector[:5])