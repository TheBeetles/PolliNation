from test_unit import client
from pollination import db


def test_login(client):
    response = client.post("/api/login", json={
        "username": "moo",
        "password": "moo"
    })
    assert response.status_code == 200

    response = client.post("/api/login", json={
        "username": "test",
        "password": "test"
    })
    assert response.status_code == 401

    response = client.get("/api/logout")
    assert response.status_code == 200


def test_unauth(client):
    response = client.get("/api/image/all")

    assert response.status_code == 401

    response = client.get("/api/image/get/ierdD")

    assert response.status_code == 401

    response = client.get("/api/verify")

    assert response.status_code == 401

    response = client.get("/api/logout")

    assert response.status_code == 401

    response = client.get("/api/logout")

    assert response.status_code == 401

    response = client.get("/api/get/image/info/difM")

    assert response.status_code == 401

def test_create_user(client):
    response = client.post("/api/register", json={
        "username": "test",
        "password": "test"
    })
    assert response.status_code == 200

    response = client.post("/api/login", json={
        "username": "test",
        "password": "test"
    })
    assert response.status_code == 200

    response = client.get("/api/logout")
    assert response.status_code == 200
