'''
Contains the user class and routes
'''
from uuid import uuid4
from flask_login import UserMixin
from pollination import db


def get_uuid():
    '''Returns a unique id in hex'''
    return uuid4().hex


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
