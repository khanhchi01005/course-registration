from flask import Flask
from login.controller import auth_bp
app = Flask(__name__)

app.register_blueprint(auth_bp)

@app.route('/')
def home():
    return "Hello from Course Registration App!"

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)
