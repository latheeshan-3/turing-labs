from pydantic import BaseModel
from typing import List

class JobOut(BaseModel):
    id: str
    title: str
    slug: str
    department: str
    location: str
    work_mode: str
    employment_type: str
    what_youll_do: List[str]
    requirements: List[str]
    nice_to_have: List[str]
    compensation: str
