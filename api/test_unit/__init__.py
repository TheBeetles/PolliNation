import pytest
from pollination import app


@pytest.fixture
def client():
    app.config["TESTING"] = True
    client = app.test_client()
    yield client
