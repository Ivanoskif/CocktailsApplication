from pymongo import MongoClient
from .config import MONGO_URI, MONGO_DB

_client = MongoClient(MONGO_URI)

db = _client[MONGO_DB]

cocktails_col = db["cocktails"]

def get_db():
    return db

def get_cocktails_col():
    return cocktails_col
