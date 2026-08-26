from fastapi import FastAPI
from routes.chat import router
from fastapi.middleware.cors import CORSMiddleware
from routes.log import router as log_router

app = FastAPI()
app.include_router(log_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)

@app.get("/")
def home():
    return {
        "message": "AI SOC Assistant is Running 🚀"
    }