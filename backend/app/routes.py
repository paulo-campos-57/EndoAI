from flask import Blueprint, jsonify, request
import joblib
import pandas as pd
from pathlib import Path

routes_bp = Blueprint("routes", __name__)

# Diretório atual do arquivo routes.py
BASE_DIR = Path(__file__).resolve().parent

# Caminhos absolutos para os arquivos
model_path = BASE_DIR / "knn_model.joblib"
scaler_path = BASE_DIR / "scaler.joblib"

# Carregar o modelo KNN e o scaler
knn_model = joblib.load(model_path)
scaler = joblib.load(scaler_path)


@routes_bp.route("/api/salute", methods=["GET"])
def salute():
    return jsonify({"message": "Integrado com sucesso"})


@routes_bp.route("/prever", methods=["POST"])
def prever_diabetes():
    dados = request.json
    df_input = pd.DataFrame([dados])

    features = [
        "HighBP",
        "HighChol",
        "BMI",
        "Smoker",
        "PhysActivity",
        "Fruits",
        "GenHlth",
        "MentHlth",
        "PhysHlth",
        "Age",
        "Education",
        "Income",
    ]
    df_input = df_input[features]

    df_input_scaled = scaler.transform(df_input)
    probabilidades = knn_model.predict_proba(df_input_scaled)
    probabilidade_diabetes = round(probabilidades[0][2] * 100, 1)

    if probabilidade_diabetes > 95:
        probabilidade_diabetes = 95

    resultado = {"chance_diabetes": f"{probabilidade_diabetes}%"}

    return jsonify(resultado)
