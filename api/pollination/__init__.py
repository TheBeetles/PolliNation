# flake8: noqa
# pylint: skip-file

from flask import Flask
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase
from config import Config


app = Flask(__name__)
CORS(app)
app.config.from_object(Config)
app.app_context().push()

bcrypt = Bcrypt(app)


class Base(DeclarativeBase):
    pass


db = SQLAlchemy(model_class=Base)
db.init_app(app)

from pollination import routes  # noqa
