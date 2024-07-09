# pylint: skip-file
from dotenv import load_dotenv
import os

load_dotenv()


class Config(object):
    SECRET_KEY = os.getenv('SECRET_KEY')
    SQLALCHEMY_DATABASE_URI = os.getenv('SQLALCHEMY_DATABASE_URI')
    SESSION_COOKIE_SECURE = True
    REMEMBER_COOKIE_NAME = 'Pollination_token'
    FLASK_ENV = 'development'
    DEBUG = True
