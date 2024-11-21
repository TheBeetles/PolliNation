'''
Contains the File class and routes
This processes all images and uploads
'''
import random
import string
from pollination import db
from pollination import User


def get_basic_id():
    '''Returns a unique id of easy typeable string'''
    return ''.join(random.choices(string.ascii_uppercase + string.ascii_lowercase, k=6))


class File(db.Model):
    '''
    Correlates the file location with the User
    '''
    __tablename__ = "File"
    id = db.Column(db.Integer, primary_key=True, unique=True)
    alt_id = db.Column(db.String(7), unique=True, default=get_basic_id)
    user_id = db.Column(db.String(32), db.ForeignKey('User.id',
                                                     ondelete="CASCADE"), nullable=False)
    species_id = db.Column(db.Integer, db.ForeignKey('Species.id'))

    location = db.Column(db.Text)
    bug_name = db.Column(db.Text)
    percentage = db.Column(db.String)
    file_name = db.Column(db.Text)
    is_bug = db.Column(db.Boolean, nullable=False)
    user = db.Relationship('User', back_populates='file')
    species = db.Relationship('Species', back_populates='file')

    def __repr__(self):
        '''
        formats the File class when printing
        '''
        return f"File('{self.location}', '{self.bug_name}', \
                      '{self.file_name}')"
