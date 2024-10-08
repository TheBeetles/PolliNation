# pylint: skip-file
'''
THIS IS CONFIG VARIABLES FOR DEVELOPMENT
'''
from dotenv import load_dotenv
import os

load_dotenv()


class Config(object):
    # Used for flask check flask documentation
    SECRET_KEY = os.getenv('SECRET_KEY')
    # Used to connect to the database
    SQLALCHEMY_DATABASE_URI = os.getenv('SQLALCHEMY_DATABASE_URI')
    # used to secure the cookie
    SESSION_COOKIE_SECURE = True
    # Sets the name of the cookie
    REMEMBER_COOKIE_NAME = 'Pollination_token'
    # Sets the flask environment
    FLASK_ENV = 'development'
    # Sets the debuging to true
    DEBUG = True
