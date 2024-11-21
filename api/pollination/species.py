'''
Contains the table representations of the database
'''
from pollination import app, db, File


class Species(db.Model):
    '''
    Contains a database of species to search for
    '''
    __tablename__ = "Species"
    id = db.Column(db.Integer, primary_key=True, unique=True)
    is_bug = db.Column(db.Boolean)
    name = db.Column(db.Text)
    scientific = db.Column(db.Text)
    description = db.Column(db.Text)
    native = db.Column(db.Boolean)
    living = db.Column(db.Text)
    future = db.Column(db.Text)

    file = db.Relationship('File', back_populates='species')

    def __repr__(self):
        return f"Species('{self.name}', '{self.is_bug}', '{self.native}')"
