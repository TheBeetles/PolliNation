# pylint: skip-file
import shutil
import os
import subprocess
from pollination import db, bcrypt
from pollination.user import User

if __name__ == "__main__":
    shutil.rmtree("./nature-id/classifiers")
    shutil.rmtree("./nature-id/inaturalist-taxonomy")
    shutil.rmtree("./storage")
    os.mkdir("./storage")
    subprocess.run(['touch', './storage/temp.txt'])
    shutil.copytree("./classifiers", "./nature-id/classifiers")
    shutil.copytree("./inaturalist-taxonomy", "./nature-id/inaturalist-taxonomy")

    db.drop_all()
    db.create_all()
    hash = bcrypt.generate_password_hash("moo").decode('utf-8')
    user = User(username="moo", password=hash)
    db.session.add(user)
    db.session.commit()
