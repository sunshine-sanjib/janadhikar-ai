from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

load_dotenv()

from routers import chat, health

app = FastAPI(
    title="JanAdhikar AI API",
    description="Backend API for JanAdhikar AI — India's citizen rights assistant",
    version="1.0.0",
)

# CORS
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        FRONTEND_URL,
        "https://*.vercel.app",
        "http://localhost:5173",
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router)
app.include_router(chat.router, prefix="/api")


@app.get("/")
async def root():
    return {
        "service": "JanAdhikar AI API",
        "status": "running",
        "docs": "/docs",
    }
