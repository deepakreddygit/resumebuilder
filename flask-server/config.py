# config.py

import os

class Config:
    MONGO_URI = "mongodb+srv://deepakreddy1635:EHikudm9963sIrXR@cluster0.c4kfz.mongodb.net/?retryWrites=true&w=majority"
    SECRET_KEY = os.getenv("SECRET_KEY", "your_default_secret_key")

MAIL_SETTINGS = {
    "MAIL_SERVER": 'smtp.gmail.com',
    "MAIL_PORT": 587,
    "MAIL_USE_TLS": True,
    "MAIL_USERNAME": 'proresume1111@gmail.com',
    "MAIL_PASSWORD": 'tqvphbqbhkuptkkb'
}
