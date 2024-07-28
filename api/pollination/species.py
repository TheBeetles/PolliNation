'''
Contains the table representations of the database
'''
from pollination import db


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
