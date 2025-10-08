from flask import Flask
from login.controller import auth_bp
app = Flask(__name__)

@app.route('/')
def home():
    return "Hello from Course Registration App!"

if __name__ == '__main__':
    app.register_blueprint(auth_bp)
    app.run()
