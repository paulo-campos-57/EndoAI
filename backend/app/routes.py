from flask import Blueprint, jsonify, request  
import joblib 
import pandas as pd  
routes_bp = Blueprint("routes", __name__)


@routes_bp.route("/api/salute", methods=["GET"])
def salute():
    return jsonify({"message": "Integrado com sucesso"})



# Carregar o modelo KNN e o scaler
knn_model = joblib.load('knn_model.joblib')  # Modelo KNN
scaler = joblib.load('scaler.joblib')  # Scaler

# Definindo a rota para prever a probabilidade de diabetes
@routes_bp.route('/prever', methods=['POST'])
def prever_diabetes():
    # Recebe os dados do POST
    dados = request.json
    
    # Converter os dados para DataFrame
    df_input = pd.DataFrame([dados])
    
    # Definir as features (colunas de entrada para o modelo)
    features = ['HighBP', 'HighChol', 'BMI', 'Smoker', 'PhysActivity', 'Fruits',
                'GenHlth', 'MentHlth', 'PhysHlth', 'Age', 'Education', 'Income']
    df_input = df_input[features]
    
    # Escalonar os dados
    df_input_scaled = scaler.transform(df_input)
    
    # Prever as probabilidades para as classes
    probabilidades = knn_model.predict_proba(df_input_scaled)
    
    # Obter a probabilidade de diabetes (classe 2)
    probabilidade_diabetes = round(probabilidades[0][2] * 100, 1)
    
    # Limitar a probabilidade a 95% caso seja maior que isso
    if probabilidade_diabetes > 95:
        probabilidade_diabetes = 95
    
    # Retornar a resposta com a chance de diabetes
    resultado = {
        "chance_diabetes": f"{probabilidade_diabetes}%"
    }
    
    return jsonify(resultado)