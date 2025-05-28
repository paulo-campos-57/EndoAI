import pytest
from flask import Flask
from app.routes import routes_bp


@pytest.fixture
def client():
    app = Flask(__name__)
    app.register_blueprint(routes_bp)
    app.config["TESTING"] = True
    return app.test_client()


def test_salute(client):
    response = client.get("/api/salute")
    assert response.status_code == 200
    assert response.json == {"message": "Integrado com sucesso"}


def test_prever(client):
    payload = {
        "HighBP": 1,
        "HighChol": 1,
        "BMI": 25,
        "Smoker": 0,
        "PhysActivity": 1,
        "Fruits": 1,
        "GenHlth": 3,
        "MentHlth": 0,
        "PhysHlth": 0,
        "Age": 9,
        "Education": 5,
        "Income": 7,
    }

    response = client.post("/prever", json=payload)
    assert response.status_code == 200
    assert "chance_diabetes" in response.json
    assert "%" in response.json["chance_diabetes"]


def test_prever_ex(client):
    payload = {
        "HighBP": 1,
        "HighChol": 1,
        "CholCheck": 1,
        "BMI": 28,
        "Smoker": 0,
        "Stroke": 0,
        "HeartDiseaseorAttack": 0,
        "PhysActivity": 1,
        "Fruits": 1,
        "Veggies": 1,
        "HvyAlcoholConsump": 0,
        "AnyHealthcare": 1,
        "NoDocbcCost": 0,
        "GenHlth": 3,
        "MentHlth": 1,
        "PhysHlth": 2,
        "DiffWalk": 0,
        "Sex": 1,
        "Age": 9,
        "Education": 5,
        "Income": 7,
    }

    response = client.post("/prever_ex", json=payload)
    assert response.status_code == 200
    assert "chance_diabetes" in response.json
    assert "%" in response.json["chance_diabetes"]
