# 🛡️ AI SOC Assistant

An AI-powered **SOC (Security Operations Center) Assistant** that analyzes security logs and generates structured investigation reports using **RAG, semantic search, and Google Gemini**.

## 🚀 Features

- 🔍 Security log analysis
- 🤖 AI-generated SOC reports
- 🧠 RAG-based cybersecurity knowledge retrieval
- 🧬 Gemini embeddings
- 🔎 Vector similarity search using cosine similarity
- 🛡️ MITRE ATT&CK mapping
- 🚨 IOC extraction
- 📊 SOC dashboard and analysis metrics
- 📂 Analysis history
- 💬 Cybersecurity chat assistant
- 📋 Copy and download reports

## 🧠 How It Works

```text
Security Log
     ↓
React Frontend
     ↓
FastAPI Backend
     ↓
Query Embedding
     ↓
Vector Similarity Search
     ↓
Relevant Cybersecurity Knowledge
     ↓
Google Gemini
     ↓
SOC Investigation Report
```
# 🛠️ Tech Stack

## Frontend

- React
- Vite
- Axios
- CSS

## Backend

- Python
- FastAPI
- Uvicorn

## AI / RAG

- Google Gemini
- Gemini Embeddings
- Vector Search
- Cosine Similarity
- Retrieval-Augmented Generation (RAG)

# 📁 Project Structure

```text
AI_soc_assistant/
│
├── backend/
│   │
│   ├── app.py
│   ├── config.py
│   ├── memory.py
│   ├── requirements.txt
│   │
│   ├── knowledge_base/
│   │   ├── documents/
│   │   │   ├── incident_response.txt
│   │   │   ├── malware_basics.txt
│   │   │   ├── mitre.txt
│   │   │   ├── sigma_rules.txt
│   │   │   └── windows_events_ids.txt
│   │   │
│   │   └── vector_store.json
│   │
│   ├── prompts/
│   │   ├── log_prompt.txt
│   │   └── soc_system_prompt.txt
│   │
│   ├── routes/
│   │   ├── chat.py
│   │   └── log.py
│   │
│   └── services/
│       ├── build_vector_store.py
│       ├── embedding_service.py
│       ├── llm_service.py
│       ├── log_service.py
│       ├── rag_service.py
│       └── vector_store.py
│
├── frontend/
│   │
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── styles/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

# ⚙️ Setup

## 🔧 Backend Setup

Navigate to the backend directory:

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

## 🔐 Environment Variables

Create backend/.env:
```
GEMINI_API_KEY=your_api_key_here
```

## ▶️ Start the Backend

Start the FastAPI development server:
```
python -m uvicorn app:app --reload --port 8001
```
The backend will run on:
```
http://localhost:8001
```
## 💻 Frontend Setup
Navigate to the frontend directory:
```
cd frontend
```
Install the required dependencies:
```
npm install
```
Start the development server:
```
npm run dev
```
# 🔐 Security

* API keys are stored in environment variables.

* .env is excluded from Git.

* Uploaded logs are processed as text and are not executed.

* AI-generated reports should be reviewed by a human analyst before taking security actions.

# 🚀 Future Improvements

* SIEM integration

* Real-time log ingestion

* Threat-intelligence enrichment

* Production vector database

* Authentication and RBAC

* Multi-user support

* Advanced incident correlation

# 👨‍💻 Developer

**Kumar Parth**

Cybersecurity Student • Blue Team Enthusiast • Full Stack Developer
