from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .config import CORS_ORIGINS
from .routers.cocktails import router as cocktails_router

app = FastAPI(title="Cocktails API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS or ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
async def health():
    return {"ok": True}
app.include_router(cocktails_router)
