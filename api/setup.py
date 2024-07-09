# pylint: skip-file
from pollination import db
from pollination.models import User

if __name__ == "__main__":
    db.drop_all()
    db.create_all()

    user = User(username="moo", email="testing@gmail.com")
    db.session.add(user)
    db.session.commit()
