from typing import Optional
from app.configs.supabase import supabase_client

class CacheService:
    def __init__(self):
        self.client = supabase_client

    async def get_cached_context_name(self, prompt_id: str) -> Optional[str]:
        """
        Checks 'gcp_cache' table if there is an active Vertex AI cache for this prompt_id.
        """
        if not self.client:
            return None

        if prompt_id is None:
            return None

        try:
            response = self.client.table("gcp_cache")\
                .select("cache_name")\
                .eq("prompt_id", prompt_id)\
                .eq("is_active", True)\
                .limit(1)\
                .execute()
            
            if response.data and len(response.data) > 0:
                return response.data[0]["cache_name"]
            
            return None
        except Exception as e:
            print(f"Error checking GCP cache: {e}")
            return None

    async def save_cached_context(self, prompt_id: str, cache_name: str, expire_time: str = None):
        """
        Saves the new cache_name to 'gcp_cache' table.
        """
        if not self.client:
            return

        if prompt_id is None:
            return

        try:
            data = {
                "prompt_id": prompt_id,
                "cache_name": cache_name,
                "is_active": True
            }
            if expire_time:
                data["expire_time"] = expire_time

            self.client.table("gcp_cache").insert(data).execute()
        except Exception as e:
            print(f"Error saving GCP cache record: {e}")

cache_service = CacheService()
