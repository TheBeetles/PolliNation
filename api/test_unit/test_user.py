from test_unit import client
from pollination import db

def test_login(client):
    response = client.post("/api/login", json={
        "username": "moo",
        "password": "moo"
    })
    assert response.status_code == 200

