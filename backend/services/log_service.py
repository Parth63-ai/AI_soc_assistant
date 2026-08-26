import time

from google import genai

from config import GEMINI_API_KEY
from services.vector_store import search_chunks


client = genai.Client(
    api_key=GEMINI_API_KEY
)


def analyze_log(log_text: str):

    start_time = time.time()

    results = search_chunks(log_text, 5)

    knowledge = ""

    for result in results:
        knowledge += f"\n\n===== {result['source']} =====\n"
        knowledge += result["chunk"]

    prompt = f"""
You are an expert SOC (Security Operations Center) Analyst.

Analyze the security log using the cybersecurity knowledge provided below.

==========================
CYBERSECURITY KNOWLEDGE
==========================

{knowledge}

==========================
SECURITY LOG
==========================

{log_text}

==========================
IMPORTANT RULES
==========================

Use the provided cybersecurity knowledge only when it is relevant
to the security log.

Do not assume an attack technique just because it appears in the
provided knowledge.

Only assign a MITRE ATT&CK technique when there is evidence in the
security log supporting it.

If there is not enough evidence to determine the MITRE ATT&CK
technique, clearly state:

"Not enough evidence to determine the MITRE ATT&CK technique."

Do not invent IP addresses, usernames, commands, hashes, dates,
Incident IDs, or other indicators that are not present in the log.

Do not create an Incident ID or report date unless they are present
in the security log.

Clearly separate confirmed evidence from assumptions or possibilities.

Generate a professional SOC report using the following format:

1. Executive Summary

2. Severity

3. Attack Type

4. MITRE ATT&CK Technique

5. Indicators of Compromise (IOCs)

6. Investigation Steps

7. Containment Recommendations

8. Detection Opportunities

9. Additional Evidence Needed (if applicable)
"""

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt,
    )

    analysis_time = round(
        time.time() - start_time,
        2
    )

    return {
        "report": response.text,
        "analysis_time": analysis_time,
        "chunks_retrieved": len(results)
    }