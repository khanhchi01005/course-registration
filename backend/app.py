# backend/app.py
from flask import Flask
from subject.enroll.controller import enroll_bp
from subject.subject_list.controller import subject_list

app = Flask(__name__)

app.register_blueprint(enroll_bp)
app.register_blueprint(subject_list)

@app.route('/')
def index():
    return "Enrollment API đang hoạt động!"

if __name__ == '__main__':
    app.run(debug=True, port=5000)
