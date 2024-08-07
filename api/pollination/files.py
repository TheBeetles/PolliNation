# flake8: noqa
# pylint: skip-file
'''
Contains the File class and routes
'''
import random
import string

import os
import sys
import base64
import re
import subprocess
from PIL import Image
from io import BytesIO
from flask import request, jsonify, send_from_directory
from flask_login import current_user, login_required
from pollination import app, db
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
    file_name = db.Column(db.Text)
    is_bug = db.Column(db.Boolean, nullable=False)
    user = db.Relationship('User', back_populates='file')
    species = db.Relationship('Species', back_populates='file')

    @app.route('/api/image/delete', methods=['POST'])
    @login_required
    def delete():
        '''
        Deletes the image
        '''
        data = request.json

        if (data is None):
            return jsonify({"Invalid": "No data sent"})

        if (type(data.get("id")) is not list):
            return jsonify({"Invalid": "Incorrect datatype"})

        # checks for the file and removes it in the file system and db
        for i in data.get("id"):
            file: File = db.session.scalars(db.select(File).filter_by(
                user_id=current_user.id, alt_id=i)).first()
            if (file is not None):
                os.remove(f"{file.location}/{file.alt_id}.png")
                db.session.delete(file)

        db.session.commit()
        return jsonify({"Success": "Deleted file"})

    @app.route('/api/image/<typeObject>/upload', methods=['POST'])
    @login_required
    def upload(typeObject):
        '''
        Saves the image to a file and runs the image
        '''
        from pollination import Species

        image_data = re.sub('^data:image/.+;base64,', '',
                            request.data.decode('utf-8'))
        im = Image.open(BytesIO(base64.b64decode(image_data)))

        user: User = current_user
        location: str = f"./storage/{user.id}"

        # checks what type is in use
        bug: bool = False
        if typeObject == "insect":
            bug = True

        if (bug):
            typeObject = "insects"
        else:
            typeObject = "plants"

        obj: File = File(user_id=user.id, location=location,
                         file_name="image", is_bug=bug)
        db.session.add(obj)
        db.session.commit()

        if (not os.path.exists(location)):
            os.mkdir(location)

        im = im.convert('RGB')
        im.save(f'./storage/{user.id}/{obj.alt_id}.jpg')

        result = subprocess.run(["python", "./nature-id/nature_id.py",
                                 "-m", f"{typeObject}",
                                 f"{location}/{obj.alt_id}.jpg"],
                                capture_output=True, text=True)

        print(result.stdout, file=sys.stderr)
        # print(result.stderr, file=sys.stderr)

        # saves as its alt id on file server
        # run process in the background
        return jsonify({"Success": "File uploaded and processing", "image": obj.alt_id})

    @ app.route('/api/image/get/<search_query>', methods=['GET'])
    @ login_required
    def get_image(search_query):
        '''
        Sends user images not working
        '''
        user: User = current_user

        file: File = db.session.scalars(db.select(File).filter_by(user_id=user.id,
                                                                  alt_id=search_query)).first()
        if file is None:
            return "No file found"

        return send_from_directory(f"../{file.location}", file.alt_id + '.jpg')

    @ app.route('/api/image/all', methods=['GET'])
    @ login_required
    def get_all():
        '''
        Get all images
        '''
        user: User = current_user
        file: list[File] = db.session.scalars(
            db.select(File).filter_by(user_id=user.id)).all()

        plantData: list[str] = []
        insectData: list[str] = []
        for x in file:
            if (x.is_bug):
                insectData.append(x.alt_id)
            else:
                plantData.append(x.alt_id)
        print(insectData, file=sys.stderr)
        return jsonify({"Success": "worked", "insect": insectData, "plant": plantData})

    def __repr__(self):
        '''
        formats the File class when printing
        '''
        return f"File('{self.location}', '{self.bug_name}', \
                      '{self.file_name}')"
