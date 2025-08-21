import os

MONGO_URI = os.getenv("MONGO_URI", "mongodb://root:example@mongo:27017/")
MONGO_DB = os.getenv("MONGO_DB", "cocktailsdb")
CORS_ORIGINS = [o.strip() for o in os.getenv("CORS_ORIGINS", "*").split(",") if o.strip()]