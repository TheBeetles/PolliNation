# pylint: skip-file
import json
import shutil
import os
import subprocess
from pollination import db, bcrypt
from pollination import User, File, Species

if __name__ == "__main__":
    shutil.rmtree("./nature-id/classifiers")
    shutil.rmtree("./nature-id/inaturalist-taxonomy")
    shutil.rmtree("./storage")
    os.mkdir("./storage")
    subprocess.run(['touch', './storage/temp.txt'])
    shutil.copytree("./classifiers", "./nature-id/classifiers")
    shutil.copytree("./inaturalist-taxonomy",
                    "./nature-id/inaturalist-taxonomy")

    db.drop_all()
    db.create_all()
    # read all of the json data
    with open("./data/insects.json") as file:
        data = json.load(file)

        for k, v in data.items():
            species = Species(name=k, scientific=v['scientific'], description=v['description'],
                              native=v['native'], living=v['living'], future=v['future'], is_bug=True)
            db.session.add(species)

    with open("./data/plants.json") as file:
        data = json.load(file)
        for k, v in data.items():
            species = Species(name=k, scientific=v['scientific'], description=v['description'],
                              native=v['native'], living=v['living'], future=v['future'], is_bug=False)
            db.session.add(species)

    # example accounts
    hash = bcrypt.generate_password_hash("moo").decode('utf-8')
    user = User(username="moo", password=hash)
    db.session.add(user)
    db.session.commit()

    # creation of example images
    location = f"./storage/{user.id}"
    os.mkdir(location)
    plant: Species = db.session.scalars(
        db.select(Species).filter_by(scientific="Persicaria amphibia")).first()
    file: File = File(user_id=user.id, location=location,
                      file_name="thing.jpg", is_bug=False, species_id=plant.id)
    db.session.add(file)
    db.session.commit()
    # Moves the files to storage
    subprocess.run(['cp', './nature-id/plant_images/Persicaria_amphibia.jpg',
                   f'./storage/{user.id}/{file.alt_id}.jpg'])

    plant: Species = db.session.scalars(
        db.select(Species).filter_by(scientific="Tragopogon porrifolius")).first()
    file: File = File(user_id=user.id, location=location,
                      file_name="things.jpg", is_bug=False, species_id=plant.id)
    db.session.add(file)
    db.session.commit()
    subprocess.run(['cp', './nature-id/plant_images/Tragopogon_porrifolius.jpg',
                   f'./storage/{user.id}/{file.alt_id}.jpg'])

    hash = bcrypt.generate_password_hash("frog").decode('utf-8')
    user = User(username="frog", password=hash)
    db.session.add(user)
    db.session.commit()
    # creation of example images
    location = f"./storage/{user.id}"
    insect: Species = db.session.scalars(
        db.select(Species).filter_by(name="Buff-tailed bumblebee")).first()
    file: File = File(user_id=user.id, location=location,
                      file_name="bombus.jpg", is_bug=True, species_id=insect.id)
    db.session.add(file)
    db.session.commit()

    os.mkdir(location)
    subprocess.run(['cp', './insect_images/bombus.jpg',
                   f'./storage/{user.id}/{file.alt_id}.jpg'])

    # creation of example images
    insect: Species = db.session.scalars(
        db.select(Species).filter_by(scientific="Halyomorpha halys")).first()
    file: File = File(user_id=user.id, location=location,
                      file_name="stink_bug.jpg", is_bug=True, species_id=insect.id)
    db.session.add(file)
    db.session.commit()

    subprocess.run(['cp', './insect_images/stink_bug.jpg',
                   f'./storage/{user.id}/{file.alt_id}.jpg'])

    db.session.commit()
