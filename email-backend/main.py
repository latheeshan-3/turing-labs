from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.jobs import router as jobs_router
from routes.applications import router as applications_router
from routes.contact import router as contact_router
from config import settings


app = FastAPI(title="Careers API")

if settings.CORS_ORIGINS.strip() == "*":
    allowed_origins = ["*"]
else:
    allowed_origins = [o.strip() for o in settings.CORS_ORIGINS.split(",") if o.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(contact_router, prefix="/api")
app.include_router(jobs_router)
app.include_router(applications_router)
