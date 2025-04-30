from flask import Flask, render_template

from flask_cors import CORS
app = Flask(__name__)
CORS(app)

# Carrega o modelo e o scaler
knn_model = joblib.load("knn_model.joblib")
scaler = joblib.load("scaler.joblib")
@app.route('/')
def home():
    return render_template('index.html')  # Vai renderizar o HTML na pasta templates
@app.route("/predict", methods=["POST"])
def predict():
        return 0
if __name__ == '__main__':
    app.run(debug=True)
