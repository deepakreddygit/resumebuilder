import os

class Config:
    MONGO_URI = "mongodb+srv://deepakreddy1635:EHikudm9963sIrXR@cluster0.c4kfz.mongodb.net/?retryWrites=true&w=majority"
    SECRET_KEY = os.getenv("SECRET_KEY", "your_secret_key")
