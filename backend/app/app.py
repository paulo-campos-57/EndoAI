from flask import Flask, render_template

from flask_cors import CORS
app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return render_template('index.html')  # Vai renderizar o HTML na pasta templates

if __name__ == '__main__':
    app.run(debug=True)
