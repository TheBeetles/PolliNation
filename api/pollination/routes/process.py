# pylint: skip-file
'''
Contains all of the routes for processing images and saving
images location on the database. Also, saving the image to the
filesystem
'''
import os
import sys
import time
import threading
import base64
import re
from PIL import Image
from io import BytesIO
from flask import request, jsonify, send_from_directory, send_file
from flask_login import current_user, login_required
from pollination import app, db
from pollination.models import User, File, Species


class BackgroundTasks(threading.Thread):
    def run(self, *args, **kwargs):
        print("Testings")
        time.sleep(1)
        print("Testing")


@app.route('/api/image/process', methods=['POST'])
@login_required
def process():
    file = request.files['image']
    if file.filename == "":
        return jsonify({"Invalid": "Please have a filename"})


@app.route('/api/image/upload', methods=['POST'])
@login_required
def upload():
    '''
    Saves the image to a file and runs the image
    ADD MAX IMAGE SIZE
    ADD extension type
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
def pls(search_query):
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
