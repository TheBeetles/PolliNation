from test_unit import client
from pollination import db, File


def test_delete(client):
    response = client.post("/api/login", json={
        "username": "moo",
        "password": "moo"
    })
#def test_get_image(client):
#def test_get_all(client):
