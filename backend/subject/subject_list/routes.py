# ...existing code...
from flask import Blueprint, request, jsonify
from .controller import get_list, get_all_list

subject_list_bp = Blueprint('subject_list_bp', __name__)

@subject_list_bp.route('/api/subject/list', methods=['GET'])
def list_subjects():
    student_code = request.args.get('student_code')

    if student_code:
        courses = get_list(student_code)
    else:
        courses = get_all_list()

    if courses is None:
        return jsonify({"error": "Không thể lấy danh sách khóa học"}), 500

    return jsonify({"courses": courses}), 200

