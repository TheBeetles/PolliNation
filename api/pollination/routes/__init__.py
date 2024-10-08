'''
Contains the initial api routes
'''
from flask import request, jsonify
from flask_login import login_user, current_user, logout_user
from flask_login import login_required, fresh_login_required
from pollination import app, bcrypt, login_manager, db
from pollination.models import User, File, Species, get_uuid


@login_manager.unauthorized_handler
def unauthorized():
    '''
    Unauthorized handler
    '''
    return jsonify({"Invalid": "Unauthorized"}), 401


@app.route('/api/register', methods=['POST'])
def register():
    '''
    Creates a account for that user
    '''
    data = request.json

    if (data is None):
        return jsonify({"Invalid": "Incorrect username or password"}), 401
    if (data.get('username') is None):
        return jsonify({"Invalid": "Incorrect username or password"}), 401
    if (data.get('password') is None):
        return jsonify({"Invalid": "Incorrect username or password"}), 401

    user = db.session.scalars(db.select(User).filter_by(username=data['username'])).first()

    if (user is not None):
        return jsonify({"Invalid": "Username already exists"})

    # Create the User
    pw_hash = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    user = User(username=data['username'], password=pw_hash)
    db.session.add(user)
    db.session.commit()

    return jsonify({"Success": "Account created"})


@app.route('/api/login', methods=['POST'])
def login():
    '''
    User Login and sets a cookie to be authenticated in the future
    '''
    data = request.json

    if (data is None):
        return jsonify({"Invalid": "Incorrect username or password"}), 401
    if (data.get('username') is None):
        return jsonify({"Invalid": "Incorrect username or password"}), 401
    if (data.get('password') is None):
        return jsonify({"Invalid": "Incorrect username or password"}), 401

    user: User = db.session.scalars(db.select(User)
                              .filter_by(username=data['username'])).first()

    if (user is None or user.password is None):
        # save value as a cookie
        return jsonify({"Invalid": "Incorrect username or password"}), 401
        # return "Invalid"

    pass_check = bcrypt.check_password_hash(user.password, data['password'])
    if (pass_check is False):
        return jsonify({"Invalid": "Incorrect username or password"}), 401
        # return "Invalid"
    if (user.alt_id is None):
        user.alt_id = get_uuid()
        db.session.commit()
    # Check remember me token if the user wants a cookie
    login_user(user, remember=True)
    # user.verified = True
    return jsonify({"Success": "User is authenticated"}), 200


@app.route('/api/verify', methods=['GET'])
@login_required
def verify():
    '''
    Verifies the User
    '''
    return jsonify({"Success": "User is authenticated"}), 200


@app.route('/api/logout', methods=['GET'])
@login_required
def logout():
    '''
    Logout the user
    '''
    user: User = current_user
    user.alt_id = None
    db.session.commit()

    return jsonify({"Success": "User is logged out"}), 200