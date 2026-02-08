from motor.motor_asyncio import AsyncIOMotorClient
from config import settings

client = AsyncIOMotorClient(settings.MONGO_URL)
if settings.MONGO_DB:
    db = client[settings.MONGO_DB]
else:
    db = client.get_default_database()
    if db is None:
        raise RuntimeError("No default database set. Provide MONGO_DB or a DB in MONGO_URL.")

jobs_collection = db["jobs"]
applications_collection = db["job_applications"]
contacts_collection = db["submissions"]
