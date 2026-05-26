from fastapi import FastAPI

from app.api.routes import analysis, health

app = FastAPI(
    title="CalisteniaAdvance API",
    description="API REST para el MVP de analisis de tecnica de calistenia.",
    version="0.1.0",
)

app.include_router(health.router)
app.include_router(analysis.router, prefix="/analysis", tags=["analysis"])
