from fastapi import FastAPI
from pydantic import BaseModel, EmailStr
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from email.message import EmailMessage
import aiosmtplib
from datetime import datetime
from config import settings  # <-- load env variables

app = FastAPI(title="Contact Form API")

# CORS (allow your frontend domain)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # change to your frontend domain
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB setup
client = AsyncIOMotorClient(settings.MONGO_URL)
db = client["contact_form_db"]
collection = db["submissions"]

# Email setup
SMTP_HOST = settings.SMTP_HOST
SMTP_PORT = settings.SMTP_PORT
SMTP_USER = settings.SMTP_USER
SMTP_PASSWORD = settings.SMTP_PASSWORD
TO_EMAIL = settings.TO_EMAIL

# Pydantic model
class ContactForm(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    project_details: str

async def send_email(form: ContactForm):
    message = EmailMessage()
    message["From"] = SMTP_USER
    message["To"] = TO_EMAIL
    message["Subject"] = f"New Contact Form Submission from {form.first_name} {form.last_name}"
    message.set_content(f"""
New contact form submission:

Name: {form.first_name} {form.last_name}
Email: {form.email}

Project Details:
{form.project_details}
""")
    await aiosmtplib.send(
        message,
        hostname=SMTP_HOST,
        port=SMTP_PORT,
        start_tls=True,
        username=SMTP_USER,
        password=SMTP_PASSWORD,
    )

@app.post("/api/contact")
async def receive_contact(form: ContactForm):
    # Save to MongoDB
    submission = form.dict()
    submission["created_at"] = datetime.utcnow()
    await collection.insert_one(submission)

    # Send email notification
    try:
        await send_email(form)
    except Exception as e:
        print("Failed to send email:", e)

    return {"message": "Form submitted successfully!"}
