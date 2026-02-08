from fastapi import APIRouter, UploadFile, File, Form, HTTPException, status
from database import applications_collection, jobs_collection
from services.email_service import send_application_email
from datetime import datetime
import uuid
import os
from pathlib import Path
import aiofiles
from bson import ObjectId
from bson.errors import InvalidId
from pydantic import EmailStr

router = APIRouter(prefix="/applications", tags=["Applications"])

UPLOAD_DIR = "uploads/cvs"
Path(UPLOAD_DIR).mkdir(parents=True, exist_ok=True)
MAX_CV_BYTES = 5 * 1024 * 1024
ALLOWED_MIME_TYPES = {
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
}

@router.post("/")
async def apply_for_job(
    job_id: str = Form(...),
    full_name: str = Form(...),
    email: EmailStr = Form(...),
    phone: str = Form(...),
    linkedin: str = Form(None),
    github: str = Form(None),
    cv: UploadFile = File(...)
):
    try:
        job_object_id = ObjectId(job_id)
    except InvalidId:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid job id format.",
        )

    job = await jobs_collection.find_one({"_id": job_object_id, "status": "active"})
    if not job:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Job not found.",
        )

    if cv.content_type not in ALLOWED_MIME_TYPES:
        raise HTTPException(
            status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE,
            detail="Unsupported CV file type.",
        )

    safe_name = Path(cv.filename).name
    filename = f"{uuid.uuid4()}_{safe_name}"
    file_path = os.path.join(UPLOAD_DIR, filename)

    total_bytes = 0
    async with aiofiles.open(file_path, "wb") as f:
        while True:
            chunk = await cv.read(1024 * 1024)
            if not chunk:
                break
            total_bytes += len(chunk)
            if total_bytes > MAX_CV_BYTES:
                await f.close()
                try:
                    os.remove(file_path)
                except OSError:
                    pass
                raise HTTPException(
                    status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
                    detail="CV file is too large.",
                )
            await f.write(chunk)

    application = {
        "job_id": job_object_id,
        "job_title": job["title"],
        "full_name": full_name,
        "email": email,
        "phone": phone,
        "linkedin": linkedin,
        "github": github,
        "cv_file": {
            "filename": safe_name,
            "stored_path": file_path,
            "mime_type": cv.content_type
        },
        "status": "submitted",
        "created_at": datetime.utcnow()
    }

    await applications_collection.insert_one(application)

    try:
        await send_application_email(
            full_name,
            job["title"],
            email,
            phone,
            file_path
        )
    except Exception as e:
        print("Failed to send application email:", e)
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail="Application saved, but email delivery failed.",
        )

    return {"message": "Application submitted successfully"}
