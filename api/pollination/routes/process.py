# pylint: skip-file
'''
Contains all of the routes for processing images and saving
images location on the database. Also, saving the image to the 
filesystem
'''
from flask import request, jsonify
from flask_login import login_user, current_user
from flask_login import login_required
from pollination import app, bcrypt, db
from pollination.models import User, File, Species


@app.route('/api/image/upload', methods=['POST'])
def upload():
    '''
    Saves the image to a file and runs the image
    '''
    file = request.files['image']
    data = request.json


    return jsonify({"Success": "File uploaded and processing"})
