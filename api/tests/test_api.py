import os
import json
import pytest
from fastapi.testclient import TestClient
from main import app, DATA_FILE

client = TestClient(app)

@pytest.fixture(autouse=True)
def clean_test_file():
    """Reset test_ideas.json before each test"""
    if os.path.exists(DATA_FILE):
        os.remove(DATA_FILE)
    with open(DATA_FILE, "w") as f:
        json.dump([], f)
    yield
    if os.path.exists(DATA_FILE):
        os.remove(DATA_FILE)

def test_create_idea():
    response = client.post("/ideas", json={
        "id": 1,
        "title": "Dark mode",
        "impact": "High",
        "effort": "Low",
        "status": "Open",
        "votes": 0
    })
    assert response.status_code == 200
    data = response.json()
    assert data["title"] == "Dark mode"
    assert data["votes"] == 0

def test_duplicate_idea():
    client.post("/ideas", json={
        "id": 2,
        "title": "Dark mode",
        "impact": "High",
        "effort": "Low",
        "status": "Open",
        "votes": 0
    })
    response = client.post("/ideas", json={
        "id": 3,
        "title": "Dark mode",
        "impact": "High",
        "effort": "Low",
        "status": "Open",
        "votes": 0
    })
    assert response.status_code == 400
    assert response.json()["detail"] == "Duplicate idea"

def test_vote_idea():
    client.post("/ideas", json={
        "id": 4,
        "title": "Light mode",
        "impact": "Medium",
        "effort": "Medium",
        "status": "Open",
        "votes": 0
    })
    response = client.post("/ideas/4/vote")
    assert response.status_code == 200
    data = response.json()
    assert "votes" in data
    assert data["votes"] == 1
