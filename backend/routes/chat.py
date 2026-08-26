from fastapi import APIRouter
from pydantic import BaseModel
from services.llm_service import ask_gemini

router = APIRouter()

class ChatRequest(BaseModel):
    message: str

@router.post("/chat")
def chat(req: ChatRequest):

    answer = ask_gemini(req.message)

    return {
        "response": answer
    }