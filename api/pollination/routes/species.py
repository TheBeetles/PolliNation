from flask import jsonify
from flask_login import current_user, login_required
from pollination import app, db, File, User, Species


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
