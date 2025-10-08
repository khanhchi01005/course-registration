from flask import Blueprint, request, jsonify
from .routes import login_user

auth_bp = Blueprint('credentials', __name__)

# API for logging in
@auth_bp.route('/api/credentials/login', methods=['POST'])
def login():
    data = request.json
    student_code = data.get('student_code')
    password = data.get('password')

    user = login_user(student_code, password)

    if user:
        return jsonify({
            'status': 'success',
            'data': {
                'user': {
                    'student_code': user['student_code'],
                    'full_name': user['full_name']
                }
            }
        }), 200
    else:
        return jsonify({'status': 'error', 'message': 'Invalid student code or password'}), 401