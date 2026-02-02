from pydantic_settings import BaseSettings  # use this instead of pydantic.BaseSettings

class Settings(BaseSettings):
    MONGO_URL: str
    SMTP_HOST: str
    SMTP_PORT: int
    SMTP_USER: str
    SMTP_PASSWORD: str
    TO_EMAIL: str

    class Config:
        env_file = ".env"  # automatically loads .env

settings = Settings()
