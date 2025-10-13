from flask import Blueprint, jsonify, request
from subject.enroll.controller import enroll_in_courses, EnrollmentError

enroll_bp = Blueprint('enroll_bp', __name__)

@enroll_bp.route('/api/subject/enroll', methods=['POST'])
def enroll_endpoint():
    data = request.get_json()
    if not data:
        return jsonify({"error": "Dữ liệu JSON không hợp lệ"}), 400

    student_code = data.get('student_code')
    courses = data.get('courses')

    if not student_code or not isinstance(courses, list):
        return jsonify({"error": "Thiếu student_code hoặc danh sách courses"}), 400
    try:
        result = enroll_in_courses(student_code, courses)
        return jsonify(result), 200

    except EnrollmentError as e:
        return jsonify({"error": "đăng ký thất bại", "message": str(e)}), 500
    