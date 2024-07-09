# flake8: noqa
# pylint: skip-file

from flask import Flask
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from sqlalchemy.orm import DeclarativeBase
from config import Config


app = Flask(__name__)
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

from pollination import routes  # noqa
