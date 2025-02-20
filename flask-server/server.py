from flask import Flask
from flask_cors import CORS
from routes.auth import auth_bp
from routes.home import home_bp
from routes.resume import resume_bp

app = Flask(__name__)


CORS(app, origins=["http://localhost:3000"])

app.register_blueprint(auth_bp)
app.register_blueprint(home_bp)
app.register_blueprint(resume_bp)

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5001)
