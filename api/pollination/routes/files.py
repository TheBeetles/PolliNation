import os
import sys
import base64
import re
import subprocess
from PIL import Image
from io import BytesIO
from flask import request, jsonify, send_from_directory
from flask_login import current_user, login_required
from pollination import app, db, File, User


@app.route('/api/image/delete', methods=['POST'])
@login_required
def delete():
    '''
    Deletes the image
    '''
    data = request.json

    if (data is None):
        return jsonify({"Invalid": "No data sent"})

    # checks for the file and removes it in the file system and db
    file: File = db.session.scalars(db.select(File).filter_by(
        user_id=current_user.id, alt_id=data.get("id"))).first()
    if (file is not None):
        os.remove(f"./{file.location}/{file.alt_id}.jpg")
        db.session.delete(file)

    db.session.commit()
    return jsonify({"Success": "Deleted file"})


@app.route('/api/image/<typeObject>/upload', methods=['POST'])
@login_required
def upload(typeObject):
    '''
    Saves the image to a file and processes the image
    '''
    from pollination import Species

    # Removes the beginning of the data
    image_data = re.sub('^data:image/.+;base64,', '',
                        request.data.decode('utf-8'))
    # Converts the base64 to an image
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

    # adds new data to the database
    obj: File = File(user_id=user.id, location=location,
                     file_name="image", is_bug=bug)
    db.session.add(obj)
    db.session.commit()

    if (not os.path.exists(location)):
        os.mkdir(location)

    im = im.convert('RGB')
    im.save(f'./storage/{user.id}/{obj.alt_id}.jpg')

    # Runs the model
    result = subprocess.run(["python", "./nature-id/nature_id.py",
                             "-m", f"{typeObject}",
                             f"{location}/{obj.alt_id}.jpg"],
                            capture_output=True, text=True)

    # parses the output of the result
    lastline = result.stdout.split('\n')[-2]
    if 'species' not in lastline:
        return jsonify({"Failed": "Unknown Species", "image": obj.alt_id}), 422
    lastline = lastline.split("(")

    if len(lastline) != 2:
        return jsonify({"Failed": "Unknown Species", "image": obj.alt_id}), 422

    print(lastline, file=sys.stderr)
    info = lastline[0].split('species')
    lastline = lastline[1][:-1]
    # checks to see if the data is in the database
    data: Species = db.session.scalars(
        db.select(Species).filter_by(scientific=lastline)).first()
    if data is None:
        data: Species = Species(is_bug=bug, name=info[1].strip(), scientific=lastline)
        db.session.add(data)
        db.session.commit()

    obj.percentage = info[0].strip()
    obj.species_id = data.id
    db.session.commit()
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

    return send_from_directory(f"../{file.location}", file.alt_id + '.jpg')


@app.route('/api/image/all', methods=['GET'])
@login_required
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
