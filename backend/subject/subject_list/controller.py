from flask import Blueprint, jsonify, request
from subject.subject_list.service import getListSubject,SubjectError

subject_list = Blueprint('subject_list', __name__)

@subject_list.route('/api/subject/list_subjects', methods=['GET'])
def list_subjects():
    student_code = request.args.get('student_code')
    if not student_code:
        return jsonify({"error": "Thiếu student_code"}), 400

    try:
        result = list_subjects(student_code)
        return jsonify(result), 200
    except SubjectError as e:
        return jsonify({"error": "Lấy danh sách môn học thất bại", "message": str(e)}), 500

    