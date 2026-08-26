import json
import math
import os

from services.embedding_service import create_embedding


VECTOR_FILE = "knowledge_base/vector_store.json"


def cosine_similarity(a, b):
    dot = 0
    length_a = 0
    length_b = 0

    for x, y in zip(a, b):
        dot += x * y
        length_a += x * x
        length_b += y * y

    if length_a == 0 or length_b == 0:
        return 0

    return dot / (math.sqrt(length_a) * math.sqrt(length_b))


def load_vectors():
    if not os.path.exists(VECTOR_FILE):
        return []

    with open(VECTOR_FILE, "r", encoding="utf-8") as file:
        return json.load(file)


def save_vectors(vectors):
    with open(VECTOR_FILE, "w", encoding="utf-8") as file:
        json.dump(vectors, file)


def add_chunk(chunk, source):
    embedding = create_embedding(chunk)

    vectors = load_vectors()

    vectors.append({
        "chunk": chunk,
        "source": source,
        "embedding": embedding
    })

    save_vectors(vectors)


def search_chunks(query, limit=5):
    vectors = load_vectors()

    if not vectors:
        return []

    query_embedding = create_embedding(query)

    results = []

    for item in vectors:
        score = cosine_similarity(
            query_embedding,
            item["embedding"]
        )

        results.append({
            "chunk": item["chunk"],
            "source": item["source"],
            "score": score
        })

    results.sort(
        key=lambda item: item["score"],
        reverse=True
    )

    return results[:limit]


if __name__ == "__main__":

    results = search_chunks(
        "PowerShell suspicious command",
        3
    )

    for result in results:
        print("\nSource:", result["source"])
        print("Score:", result["score"])
        print("Chunk:", result["chunk"][:200])