from flask import Flask, send_from_directory
from flask_cors import CORS
import os
from routes.auth import auth_bp
from routes.home import home_bp
from routes.resume import resume_bp


app = Flask(__name__, static_folder="client/build")

CORS(app, origins="http://localhost:3000", supports_credentials=True)  # enable CORS globally


app.register_blueprint(auth_bp)
app.register_blueprint(home_bp)
app.register_blueprint(resume_bp)


@app.route('/styles/<path:filename>')
def serve_css(filename):
    return send_from_directory("client/src/styles", filename)

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5001)




