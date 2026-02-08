from pydantic import BaseModel, EmailStr
from typing import Optional

class JobApplicationIn(BaseModel):
    full_name: str
    email: EmailStr
    phone: str
    linkedin: Optional[str] = None
    github: Optional[str] = None
