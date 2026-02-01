from typing import Optional, Dict
from app.configs.supabase import supabase_client

class PromptService:
    def __init__(self):
        self.client = supabase_client

    async def get_latest_prompt(self, prompt_name: str = "turing_lab_main") -> Optional[Dict]:
        """
        Fetches the latest active prompt template from 'prompt_template' table.
        Assumes table has columns: id, name, template_content, version, is_active.
        """
        if not self.client:
            return None

        try:
            # Fetch latest active prompt
            response = self.client.table("prompt_template")\
                .select("*")\
                .eq("name", prompt_name)\
                .eq("is_active", True)\
                .order("version", desc=True)\
                .limit(1)\
                .execute()
            
            if response.data and len(response.data) > 0:
                return response.data[0]
            
            return None
        except Exception as e:
            print(f"Error fetching prompt: {e}")
            return None

prompt_service = PromptService()
