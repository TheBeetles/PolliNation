from test_unit import client
from pollination import db, File, User


def test_delete(client):
    response = client.post("/api/login", json={
        "username": "moo",
        "password": "moo"
    })

    assert response.status_code == 200

    user: User = db.session.scalars(db.select(User).filter_by(username="moo")).first()

    assert user is not None

    file: File = db.session.scalars(db.select(File).filter_by(user_id=user.id)).first()

    assert file is not None

    response = client.post("/api/image/delete", json={
        "id": file.alt_id
    })

    assert response.status_code == 200

    response = client.get("/api/logout")

    assert response.status_code == 200


def test_get_image(client):
    response = client.post("/api/login", json={
        "username": "frog",
        "passoword": "frog"
    })

    assert response.status_code == 200

    user: User = db.session.scalars(db.select(User).filter_by(username="frog")).first()

    assert user is not None

    file: File = db.session.scalars(db.select(File).filter_by(user_id=user.id)).first()

    assert file is not None

    response = client.get(f"/api/image/get/{file.alt_id}")

    assert response.status_code == 200

    response = client.get("/api/logout")

    assert response.status_code == 200


def test_get_all(client):
    response = client.post("/api/login", json={
        "username": "frog",
        "passoword": "frog"
    })

    assert response.status_code == 200

    user: User = db.session.scalars(db.select(User).filter_by(username="frog")).first()

    assert user is not None

    file: File = db.session.scalars(db.select(File).filter_by(user_id=user.id)).all()

    assert file is not None

    response = client.get("/api/image/all")

    assert response.status_code == 200

    assert len(response.json["plant"]) == len(file)

    for i in range(len(file)):
        assert response.json["plant"][i] == file[i].alt_id

    response = client.get("/api/logout")

    assert response.status_code == 200




