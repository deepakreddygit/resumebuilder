# from flask import Flask, send_from_directory
# from flask_cors import CORS
# from config import Config, MAIL_SETTINGS
# from extensions import mail 

# from routes.auth import auth_bp
# from routes.home import home_bp
# from routes.resume import resume_bp

# app = Flask(__name__, static_folder="client/build")

# # Load app config
# app.config.from_object(Config)
# app.config.update(MAIL_SETTINGS)

# # Init mail here
# mail.init_app(app)

# # Enable CORS
# CORS(app, origins=["http://localhost:3000"], supports_credentials=True)
# # CORS(app, resources={r"/*": {"origins": "http://proresume.kentcs.org:8316"}}, supports_credentials=True)

# # Register routes
# app.register_blueprint(auth_bp)
# app.register_blueprint(home_bp)
# app.register_blueprint(resume_bp)

# @app.route('/styles/<path:filename>')
# def serve_css(filename):
#     return send_from_directory("client/src/styles", filename)

# if __name__ == "__main__":
#     app.run(debug=True, host="0.0.0.0", port=5001)
#     #  app.run(debug=True, host="0.0.0.0", port=8007)


from flask import Flask, send_from_directory
from flask_cors import CORS
from config import Config, MAIL_SETTINGS
from extensions import mail

from routes.auth import auth_bp
from routes.home import home_bp
from routes.resume import resume_bp
import os

# Create Flask app
app = Flask(__name__, static_folder="client/build")

# Load configuration
app.config.from_object(Config)
app.config.update(MAIL_SETTINGS)

# Initialize extensions
mail.init_app(app)

# CORS: use environment variable or fallback to localhost
frontend_origin = os.environ.get("FRONTEND_ORIGIN", "http://localhost:3000")
CORS(app, origins=[frontend_origin], supports_credentials=True)

# Register Blueprints
app.register_blueprint(auth_bp)
app.register_blueprint(home_bp)
app.register_blueprint(resume_bp)

# Serve static styles if needed
@app.route('/styles/<path:filename>')
def serve_css(filename):
    return send_from_directory("client/src/styles", filename)

# For Gunicorn to detect the app
app = app
