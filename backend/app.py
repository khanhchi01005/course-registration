# backend/app.py
from flask import Flask
from subject.enroll.controller import enroll_bp

app = Flask(__name__)

app.register_blueprint(enroll_bp)

@app.route('/')
def index():
    return "Enrollment API đang hoạt động!"

if __name__ == '__main__':
    app.run(debug=True, port=5000)
