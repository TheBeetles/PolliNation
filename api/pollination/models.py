'''
Contains the table representations of the database
'''

import string
import random
from uuid import uuid4
from pollination import db


# BELOW THIS ARE EXAMPLES

def get_uuid():
    '''Returns a unique id in hex'''
    return uuid4().hex


def get_basic_id():
    '''Returns a unique id of easy typeable string'''
    return ''.join(random.choices(string.ascii_uppercase
                                  + string.ascii_lowercase, k=6))


class User(db.Model):
    '''
    Only allows people with the team id to create an account
    '''
    __tablename__ = "User"
    id = db.Column(db.String(32), primary_key=True,
                   unique=True, default=get_uuid)
    alt_id = db.Column(db.String(6), unique=True, default=get_basic_id)

    team_name = db.Column(db.String(20), unique=True)
    track_value = db.relationship('Track_value', back_populates='team')

    user = db.relationship('User', back_populates='team')
    # Determine what access level the function is at

    def __repr__(self):
        return f"Team('{self.team_name}','{ self.alt_id }')"
