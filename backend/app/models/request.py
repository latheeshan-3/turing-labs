from pydantic import BaseModel, Field

class ChatRequest(BaseModel):
    conversation_id: str = Field(..., description="Unique identifier for the conversation")
    message: str = Field(..., description="User's query message")
