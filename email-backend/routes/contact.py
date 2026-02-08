from fastapi import APIRouter
from models.contact import ContactForm
from database import contacts_collection
from services.email_service import send_contact_email
from datetime import datetime
from fastapi import HTTPException, status

router = APIRouter(prefix="/contact", tags=["Contact"])

@router.post("/")
async def submit_contact(form: ContactForm):
    # Save to MongoDB
    submission = form.dict()
    submission["created_at"] = datetime.utcnow()
    await contacts_collection.insert_one(submission)

    # Send email
    email_sent = True
    try:
        await send_contact_email(form)
    except Exception as e:
        email_sent = False
        print("Failed to send contact email:", e)

    if not email_sent:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail="Form saved, but email delivery failed.",
        )

    return {"message": "Form submitted successfully!"}
