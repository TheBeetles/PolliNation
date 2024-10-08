'''
Contains the table representations of the database
'''
from flask import request, jsonify
from flask_login import current_user, login_required
from pollination import app, db, File, User


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

    @app.route('/api/get/image/info/<data>', methods=['GET'])
    @login_required
    def info(data):
        '''
        Gets the information of the species and sends
        to the user
        '''
        user: User = current_user

        if (data is None):
            return jsonify({"Invalid": "Incorrect datatype"})

        file: File = db.session.scalars(db.select(File).filter_by(
            user_id=user.id, alt_id=data)).first()

        if file is None:
            return jsonify({"Invalid": "File not found"})

        species: Species = file.species
        if (species is None):
            return jsonify({"Failed": "Species not found"})

        return jsonify({"is_bug": species.is_bug, "name": species.name,
                        "percentage": file.percentage,
                        "scientific": species.scientific,
                        "future": species.future,
                        "native": species.native,
                        "living": species.living,
                        "description": species.description})
