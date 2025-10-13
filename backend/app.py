# ...existing code...
from flask import Flask
from subject.enroll.routes import enroll_bp
from login.routes import auth_bp
from subject.subject_list.routes import subject_list_bp

app = Flask(__name__)

app.register_blueprint(enroll_bp)
app.register_blueprint(auth_bp)
app.register_blueprint(subject_list_bp)

@app.route('/')
def index():
    return "Enrollment API đang hoạt động!"

if __name__ == '__main__':
    app.run(debug=True, port=5000)
# ...existing code...