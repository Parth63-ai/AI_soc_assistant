import os

from services.rag_service import chunk_document
from services.vector_store import add_chunk


KNOWLEDGE_BASE = "knowledge_base"


def build_vector_store():

    print("Building vector store...")

    for root, folders, files in os.walk(KNOWLEDGE_BASE):

        for filename in files:

            if filename == "vector_store.json":
                continue

            if not filename.endswith((".txt", ".md")):
                continue

            path = os.path.join(root, filename)

            with open(path, "r", encoding="utf-8") as file:
                text = file.read()

            chunks = chunk_document(text, 500)

            print(filename, "->", len(chunks), "chunks")

            for chunk in chunks:
                add_chunk(chunk, filename)

    print("Vector store ready!")


if __name__ == "__main__":
    build_vector_store()