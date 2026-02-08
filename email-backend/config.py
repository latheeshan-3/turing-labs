from pydantic_settings import BaseSettings  # use this instead of pydantic.BaseSettings

class Settings(BaseSettings):
    MONGO_URL: str
    MONGO_DB: str | None = None
    SMTP_HOST: str
    SMTP_PORT: int
    SMTP_USER: str
    SMTP_PASSWORD: str
    TO_EMAIL: str
    CORS_ORIGINS: str = "*"

    class Config:
        env_file = ".env"  # automatically loads .env

settings = Settings()
