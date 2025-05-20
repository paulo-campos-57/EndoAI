from flask import Blueprint, jsonify, request
import joblib
import pandas as pd
from pathlib import Path

routes_bp = Blueprint("routes", __name__)

# Diretório atual do arquivo routes.py
BASE_DIR = Path(__file__).resolve().parent

# Caminhos absolutos para os arquivos
model_path = BASE_DIR / "knn_model.joblib"
model_path_ex = BASE_DIR / "knn_model_ex.joblib"
scaler_path = BASE_DIR / "scaler.joblib"
scaler_path_ex = BASE_DIR / "scaler_ex.joblib"

# Carregar o modelo KNN e o scaler
knn_model = joblib.load(model_path)
knn_model_ex = joblib.load(model_path_ex)
scaler = joblib.load(scaler_path)
scaler_ex = joblib.load(scaler_path_ex)


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


@routes_bp.route("/prever_ex", methods=["POST"])
def prever_diabetes_ex():
    dados = request.json
    df_input = pd.DataFrame([dados])
    print("Dados recebidos no backend:", dados)

    features_ex = [
        "HighBP",
        "HighChol",
        "CholCheck",
        "BMI",
        "Smoker",
        "Stroke",
        "HeartDiseaseorAttack",
        "PhysActivity",
        "Fruits",
        "Veggies",
        "HvyAlcoholConsump",
        "AnyHealthcare",
        "NoDocbcCost",
        "GenHlth",
        "MentHlth",
        "PhysHlth",
        "DiffWalk",
        "Sex",
        "Age",
        "Education",
        "Income",
    ]

    try:
        df_input = df_input[features_ex]
    except KeyError as e:
        return jsonify({"erro": f"Feature faltando: {e}"}), 400

    df_input_scaled = scaler_ex.transform(df_input)
    probabilidades = knn_model_ex.predict_proba(df_input_scaled)
    prob_diabetes = round(probabilidades[0][2] * 100, 1)

    if prob_diabetes > 95:
        prob_diabetes = 95

    return jsonify({"chance_diabetes": f"{prob_diabetes}%"})
