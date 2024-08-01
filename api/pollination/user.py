# flake8: noqa
# pylint: skip-file
'''
Contains the user class and routes
'''
from uuid import uuid4
from flask_login import UserMixin
from flask import request, jsonify
from flask_login import login_user, current_user, logout_user
from flask_login import login_required
from pollination import app, bcrypt, db
from pollination import login_manager


@login_manager.user_loader
def load_user(user_id):
    '''Sets up the login manager to use the alt id'''
    return db.session.scalars(db.select(User).filter_by(alt_id=user_id)).first()


def get_uuid():
    '''Returns a unique id in hex'''
    return uuid4().hex


class User(db.Model, UserMixin):
    '''
    Only allows people with the team id to create an account
    '''
    __tablename__ = "User"
    id = db.Column(db.String(32), primary_key=True,
                   unique=True, default=get_uuid)
    alt_id = db.Column(db.String(32), unique=True, default=get_uuid)
    username = db.Column(db.Text, unique=True, nullable=False)
    password = db.Column(db.String(72), nullable=False)
    file = db.Relationship('File', back_populates='user',
                           cascade='all, delete', passive_deletes=True)

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

        user = db.session.scalars(db.select(User).filter_by(
            username=data['username'])).first()

        if (user is not None):
            return jsonify({"Invalid": "Username already exists"})

        # Create the User
        pw_hash = bcrypt.generate_password_hash(
            data['password']).decode('utf-8')
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

        pass_check = bcrypt.check_password_hash(
            user.password, data['password'])
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
        logout_user()

        return jsonify({"Success": "User is logged out"}), 200

    def get_id(self):
        return str(self.alt_id)

    def __repr__(self):
        return f"User('{self.username}','{ self.alt_id }')"
