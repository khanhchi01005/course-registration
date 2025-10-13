# ...existing code...
from flask import Blueprint, request, jsonify
from .controller import get_list

subject_list_bp = Blueprint('subject_list_bp', __name__)

@subject_list_bp.route('/api/subject/list', methods=['GET'])
def list_subjects():
    student_code = request.args.get('student_code')
    if not student_code:
        return jsonify({"error": "Thiếu student_code"}), 400

    courses = get_list(student_code)
    if courses is None:
        return jsonify({"error": "Student không tồn tại hoặc lỗi server"}), 404

    return jsonify({ "courses": courses}), 200
