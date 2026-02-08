from fastapi import APIRouter, HTTPException, Query, status
from database import jobs_collection

router = APIRouter(prefix="/jobs", tags=["Jobs"])

def _serialize_job(job: dict) -> dict:
    job["id"] = str(job["_id"])
    del job["_id"]
    return job

@router.get("/")
async def list_jobs(
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=200),
):
    jobs = []
    cursor = (
        jobs_collection.find({"status": "active"})
        .sort("created_at", -1)
        .skip(skip)
        .limit(limit)
    )
    async for job in cursor:
        jobs.append(_serialize_job(job))
    return jobs


@router.get("/{slug}")
async def get_job(slug: str):
    job = await jobs_collection.find_one({"slug": slug, "status": "active"})
    if not job:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Job not found.",
        )

    return _serialize_job(job)
