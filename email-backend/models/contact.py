from pydantic import BaseModel, EmailStr

class ContactForm(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    project_details: str
