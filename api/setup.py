# pylint: skip-file
from pollination import db, bcrypt
from pollination.user import User

if __name__ == "__main__":
    db.drop_all()
    db.create_all()
    hash = bcrypt.generate_password_hash("moo").decode('utf-8')
    user = User(username="moo", password=hash)
    db.session.add(user)
    db.session.commit()
