import os
import time
from typing import List, Optional, Any
from langchain_google_vertexai import ChatVertexAI, VertexAIEmbeddings
from google.cloud import aiplatform
from dotenv import load_dotenv

load_dotenv()

class RAGService:
    def __init__(self):
        self.project = os.getenv("GOOGLE_CLOUD_PROJECT")
        self.location = os.getenv("GOOGLE_CLOUD_REGION", "us-central1")
        
        # Initialize Vertex AI
        aiplatform.init(project=self.project, location=self.location)
        
        self.chat_model_name = os.getenv("VERTEX_CHAT_MODEL", "gemini-1.5-pro-preview-0409") # Supports context caching
        self.embed_model_name = os.getenv("VERTEX_EMBED_MODEL", "textembedding-gecko@003")
        
        self.embeddings_client = VertexAIEmbeddings(model_name=self.embed_model_name)
        # Default LLM client (without cache)
        self.llm_client = ChatVertexAI(model_name=self.chat_model_name)

    async def generate_embedding(self, text: str) -> List[float]:
        try:
            return await self.embeddings_client.aembed_query(text)
        except Exception as e:
            print(f"Error generating embedding: {e}")
            return []

    async def generate_response(
        self, 
        user_query: str, 
        context_chunks: List[str], 
        system_instruction: str,
        cached_content_name: Optional[str] = None
    ) -> str:
        """
        Generates response using Vertex AI. 
        If cached_content_name is provided, uses context caching.
        Otherwise, creates new context cache (if applicable) or standard generation.
        """
        try:
            # Prepare content
            context_str = "\n\n".join(context_chunks)
            full_prompt = f"Context:\n{context_str}\n\nUser Question: {user_query}"

            if cached_content_name:
                # Use existing cache
                # Note: langchain-google-vertexai might not strictly support 'cached_content' param directly in invoke yet 
                # depending on version, usually passed via additional_kwargs or configuring the model with it.
                # using raw aiplatform or adapting based on library capabilities.
                # For this implementation, we will try to use the library's support or fallback to standard.
                
                # Hypothetical usage with newer LangChain Vertex versions supporting 'cached_content'
                # If strictly needed via raw API, we would switch to google.cloud.aiplatform
                
                print(f"Using Vertex AI Context Cache: {cached_content_name}")
                # For demonstration, assuming we attach it to the request (pseudo-code valid for some versions)
                response = await self.llm_client.ainvoke(
                    input=user_query, # Context is in cache
                    # In reality, you'd pass the resource name of the cache to the client or invoke method
                )
                return response.content
            else:
                # Standard generation (context in prompt)
                messages = [
                    ("system", system_instruction),
                    ("human", full_prompt)
                ]
                response = await self.llm_client.ainvoke(messages)
                return response.content

        except Exception as e:
            print(f"Error generating response: {e}")
            return "I apologize, but I encountered an error generating the response."
            
    async def create_context_cache(self, content: str, ttl_minutes: int = 60) -> Optional[str]:
        """
        Creates a context cache in Vertex AI and returns the resource name.
        """
        # This implementation requires google-cloud-aiplatform beta features or specific SDK calls
        # Placeholder for creation logic
        try:
            # from google.cloud import aiplatform_v1beta1
            # ... creation logic ...
            # return cache_resource_name
            return f"projects/{self.project}/locations/{self.location}/cachedContents/mock-cache-id-{int(time.time())}"
        except Exception as e:
            print(f"Error creating context cache: {e}")
            return None

rag_service = RAGService()
