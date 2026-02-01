from fastapi import FastAPI, HTTPException, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from app.models.request import ChatRequest
from app.models.response import ChatResponse
from app.services.chat_service import chat_service

app = FastAPI(title="Turing Labs Chatbot API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    try:
        result = await chat_service.process_chat(request.conversation_id, request.message)
        return ChatResponse(message=result["message"])
    except Exception as e:
        print(f"Error in chat endpoint: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/embedding")
async def create_embedding_endpoint(
    file: UploadFile = File(...),
    document_id: str = Form(...)
):
    """
    Endpoint to receive a file and document ID to create embeddings.
    Currently a skeleton implementation.
    """
    # Logic to be implemented later as per user request
    return {"status": "received", "document_id": document_id, "filename": file.filename}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}
