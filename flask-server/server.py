from flask import Flask
from flask_cors import CORS
from routes.auth import auth_bp
from routes.home import home_bp

app = Flask(__name__)

# Allow CORS for React frontend running on localhost:3000
CORS(app, origins=["http://localhost:3000"])

app.register_blueprint(auth_bp)
app.register_blueprint(home_bp)

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5001)
