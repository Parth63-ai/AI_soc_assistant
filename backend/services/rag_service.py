import os

# Path to knowledge base
KNOWLEDGE_BASE_PATH = os.path.join(
    os.path.dirname(__file__),
    "..",
    "knowledge_base",
    "documents"
)

# Keyword -> Document mapping
KEYWORD_MAPPING = {

    "4624": "windows_event_ids.txt",
    "4625": "windows_event_ids.txt",
    "4688": "windows_event_ids.txt",

    "powershell": "sigma_rules.txt",
    "cmd": "sigma_rules.txt",
    "script": "sigma_rules.txt",

    "brute": "mitre.txt",
    "brute force": "mitre.txt",
    "credential": "mitre.txt",

    "malware": "malware_basics.txt",
    "trojan": "malware_basics.txt",
    "ransomware": "malware_basics.txt",

    "incident": "incident_response.txt",
    "containment": "incident_response.txt",
    "recovery": "incident_response.txt",
}

def chunk_document(text, chunk_size=500):

    words = text.split()

    chunks = []

    for i in range(0, len(words), chunk_size):

        chunk = " ".join(
            words[i:i + chunk_size]
        )

        chunks.append(chunk)

    return chunks


def retrieve_relevant_documents(log_text):

    log_text = log_text.lower()

    knowledge = ""

    loaded_files = set()

    for keyword, filename in KEYWORD_MAPPING.items():

        if keyword in log_text and filename not in loaded_files:

            filepath = os.path.join(
                KNOWLEDGE_BASE_PATH,
                filename
            )

            if os.path.exists(filepath):

                with open(filepath, "r", encoding="utf-8") as file:

                    knowledge += f"\n\n===== {filename} =====\n"

                    knowledge += file.read()

                loaded_files.add(filename)

    return knowledge