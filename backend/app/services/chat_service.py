import json
from app.services.redis_service import redis_service
from app.services.vectorstore_service import vectorstore_service
from app.services.prompt_service import prompt_service
from app.services.cache_service import cache_service
from app.services.rag_service import rag_service

class ChatService:
    async def process_chat(self, conversation_id: str, user_query: str) -> dict:
        # 1. Check Redis Cache for exact query (Optional, but user said "check redis cache if cache not it then...")
        # Assuming user meant response caching for identical queries, or conversation state?
        # User: "intially it it recive the query and conversation id and check the redis cache if cache not it then..."
        cache_key = f"chat:{conversation_id}:{hash(user_query)}"
        cached_response = await redis_service.get_cache(cache_key)
        if cached_response:
             print("Redis Cache Hit")
             return {"message": cached_response, "source": "redis_cache"}

        print("Redis Cache Miss - Proceeding to Semantic Search")

        # 2. Embedding & Vector Search
        embedding = await rag_service.generate_embedding(user_query)
        relevant_chunks = await vectorstore_service.get_relevant_chunks(embedding)
        
        chunk_texts = [chunk.get('content', '') for chunk in relevant_chunks]

        # 3. Fetch Prompt Template
        prompt_data = await prompt_service.get_latest_prompt()
        if not prompt_data:
            system_instruction = "You are a helpful AI assistant."
            prompt_id = None
        else:
            system_instruction = prompt_data.get("template_content", "You are a helpful AI assistant.")
            prompt_id = str(prompt_data.get("id"))

        # 4. Check Vertex AI Context Cache
        cache_name = await cache_service.get_cached_context_name(prompt_id)
        
        if not cache_name:
            print("GCP Cache Miss - Creating new Context Cache")
            # Logic to create cache (in real implementation, we'd cache the SYSTEM instruction + maybe common documents)
            # For this flow, user said: "if not want to call the cache service to cache the prompt and store the cache name"
            new_cache_name = await rag_service.create_context_cache(system_instruction)
            if new_cache_name:
                await cache_service.save_cached_context(prompt_id, new_cache_name)
                cache_name = new_cache_name
        else:
            print(f"GCP Cache Hit: {cache_name}")

        # 5. Generate Response (RAG)
        ai_response = await rag_service.generate_response(
            user_query=user_query,
            context_chunks=chunk_texts,
            system_instruction=system_instruction,
            cached_content_name=cache_name
        )

        # 6. Store in Redis
        await redis_service.set_cache(cache_key, ai_response)

        return {"message": ai_response, "source": "generated"}

chat_service = ChatService()
