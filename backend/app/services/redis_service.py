from app.configs.redis import redis_client
import json

class RedisService:
    def __init__(self):
        self.client = redis_client
        self.expiration = 3600  # 1 hour default

    async def get_cache(self, key: str):
        try:
            return await self.client.get(key)
        except Exception as e:
            print(f"Redis get error: {e}")
            return None

    async def set_cache(self, key: str, value: str, expire: int = None):
        try:
            await self.client.set(
                key, 
                value, 
                ex=expire if expire else self.expiration
            )
        except Exception as e:
            print(f"Redis set error: {e}")

redis_service = RedisService()
