'''
This is the init file to set all of the variables
'''
from flask import Flask
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from sqlalchemy.orm import DeclarativeBase
from config import Config


app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = './storage'
CORS(app)
app.config.from_object(Config)
app.app_context().push()
login_manager = LoginManager()
login_manager.init_app(app)
bcrypt = Bcrypt(app)


class Base(DeclarativeBase):
    pass


db = SQLAlchemy(model_class=Base)
db.init_app(app)

# inits all the classes and the routes
from pollination.user import User
from pollination.files import File
from pollination.species import Species
