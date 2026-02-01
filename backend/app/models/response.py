from pydantic import BaseModel, Field

class ChatResponse(BaseModel):
    message: str = Field(..., description="AI generated response")
