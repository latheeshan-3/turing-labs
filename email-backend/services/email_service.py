from email.message import EmailMessage
import aiosmtplib
from config import settings

# Contact form email
async def send_contact_email(form):
    message = EmailMessage()
    message["From"] = settings.SMTP_USER
    message["To"] = settings.TO_EMAIL
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
        hostname=settings.SMTP_HOST,
        port=settings.SMTP_PORT,
        start_tls=True,
        username=settings.SMTP_USER,
        password=settings.SMTP_PASSWORD,
    )

# Job application email
async def send_application_email(
    full_name: str,
    job_title: str,
    email: str,
    phone: str,
    cv_path: str
):
    message = EmailMessage()
    message["From"] = settings.SMTP_USER
    message["To"] = settings.TO_EMAIL
    message["Subject"] = f"New Job Application - {job_title}"

    message.set_content(f"""
New job application received:

Name: {full_name}
Job: {job_title}
Email: {email}
Phone: {phone}

CV Path:
{cv_path}
""")

    await aiosmtplib.send(
        message,
        hostname=settings.SMTP_HOST,
        port=settings.SMTP_PORT,
        start_tls=True,
        username=settings.SMTP_USER,
        password=settings.SMTP_PASSWORD,
    )
