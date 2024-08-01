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
from PIL import Image
from io import BytesIO
from flask import request, jsonify, send_from_directory
from flask_login import current_user, login_required
from pollination import app, db
from pollination.user import User


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
    location = db.Column(db.Text)
    bug_name = db.Column(db.Text)
    file_name = db.Column(db.Text)
    user = db.Relationship('User', back_populates='file')

    @app.route('/api/image/delete', methods=['POST'])
    @login_required
    def delete():
        '''
        Deletes the image
        '''
        data = request.json

        if (data is None):
            return jsonify({"Invalid": "No data sent"})

        db.session.scalars(db.select(File).filter_by(alt_id=data.get("id")))

        return jsonify({"Success": "Deleted file"})

    @app.route('/api/image/upload', methods=['POST'])
    @login_required
    def upload():
        '''
        Saves the image to a file and runs the image
        '''
        image_data = re.sub('^data:image/.+;base64,', '', request.data.decode('utf-8'))
        im = Image.open(BytesIO(base64.b64decode(image_data)))

        user: User = current_user
        location: str = f"./storage/{user.id}"
        obj: File = File(user_id=user.id, location=location, file_name="image")
        db.session.add(obj)
        db.session.commit()

        if (not os.path.exists(location)):
            os.mkdir(location)

        im.save(f'./storage/{user.id}/{obj.alt_id}.png')
        # saves as its alt id on file server
        # run process in the background
        return jsonify({"Success": "File uploaded and processing", "image": obj.alt_id})

    @app.route('/api/image/get/<search_query>', methods=['GET'])
    @login_required
    def get_image(search_query):
        '''
        Sends user images not working
        '''
        user: User = current_user

        file: File = db.session.scalars(db.select(File).filter_by(user_id=user.id,
                                                                  alt_id=search_query)).first()
        if file is None:
            return "No file found"

        print(file.location, file=sys.stderr)
        print(os.curdir, file=sys.stderr)
        return send_from_directory(f"../{file.location}", file.alt_id + '.png')

    @app.route('/api/image/all', methods=['GET'])
    @login_required
    def get_all():
        '''
        Get all images
        '''
        user: User = current_user
        file: list[File] = db.session.scalars(db.select(File).filter_by(user_id = user.id)).all()

        data: list[str] = []
        for x in file:
            data.append(x.alt_id)

        return jsonify({"Success": "worked", "data": data})

    def __repr__(self):
        '''
        formats the File class when printing
        '''
        return f"File('{self.location}', '{self.bug_name}', \
                      '{self.file_name}')"
