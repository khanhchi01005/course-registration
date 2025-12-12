from flask import Flask
from flask_cors import CORS    # 🔹 Thêm dòng này
from subject.enroll.routes import enroll_bp
from login.routes import auth_bp
from subject.subject_list.routes import subject_list_bp
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
CORS(app, origins=[os.getenv("CORS_ORIGIN")])

app.register_blueprint(enroll_bp)
app.register_blueprint(auth_bp)
app.register_blueprint(subject_list_bp)

@app.route('/')
def index():
    return "Enrollment API đang hoạt động!"

if __name__ == '__main__':
    app.run(debug=True, port=5000)
