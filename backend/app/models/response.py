from pydantic import BaseModel, Field

class ChatResponse(BaseModel):
    message: str = Field(..., description="AI generated response")

class EmbeddingResponse(BaseModel):
    state: bool = Field(..., description="Success status of embedding generation")
    message: str = Field(..., description="Status message")
