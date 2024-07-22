'''
Contains the table representations of the database
'''
import random
import string
from uuid import uuid4
from flask_login import UserMixin
from pollination import db
from pollination import login_manager


@login_manager.user_loader
def load_user(user_id):
    '''Sets up the login manager to use the alt id'''
    return db.session.scalars(db.select(User).filter_by(alt_id=user_id)).first()


def get_uuid():
    '''Returns a unique id in hex'''
    return uuid4().hex


def get_basic_id():
    '''Returns a unique id of easy typeable string'''
    return ''.join(random.choices(string.ascii_uppercase + string.ascii_lowercase, k=6))


class User(db.Model, UserMixin):
    '''
    Only allows people with the team id to create an account
    '''
    __tablename__ = "User"
    id = db.Column(db.String(32), primary_key=True,
                   unique=True, default=get_uuid)
    alt_id = db.Column(db.String(32), unique=True, default=get_uuid)
    username = db.Column(db.Text, unique=True, nullable=False)
    password = db.Column(db.String(72), nullable=False)
    file = db.Relationship('File', back_populates='user',
                           cascade='all, delete', passive_deletes=True)

    def get_id(self):
        return str(self.alt_id)

    def __repr__(self):
        return f"User('{self.username}','{ self.alt_id }')"


class File(db.Model):
    '''
    Correlates the file location with the User
    '''
    __tablename__ = "File"
    id = db.Column(db.Integer, primary_key=True, unique=True)
    alt_id = db.Column(db.String(7), unique=True, default=get_basic_id)
    user_id = db.Column(db.String(32), db.ForeignKey('User.id',
                                                     ondelete="CASCADE"), nullable=False)
    location = db.Column(db.Text)
    bug_name = db.Column(db.Text)
    file_name = db.Column(db.Text)
    user = db.Relationship('User', back_populates='file')

    def __repr__(self):
        return f"File('{self.location}', '{self.bug_name}', \
                      '{self.file_name}')"


class Species(db.Model):
    '''
    Contains a database of species to search for
    '''
    __tablename__ = "Species"
    id = db.Column(db.Integer, primary_key=True, unique=True)
    plant = db.Column(db.Boolean)
    name = db.Column(db.Text)
    description = db.Column(db.Text)
    native = db.Column(db.Boolean)
    location = db.Column(db.Text)
    image_location = db.Column(db.Text)

    def __repr__(self):
        return f"Species('{self.name}', '{self.plant}', '{self.native}')"
