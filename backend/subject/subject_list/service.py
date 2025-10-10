from db_connector import get_db_connection
import mysql.connector

class SubjectError(Exception):
    pass

def getListSubject(student_code: str, courses_to_enroll: list):
    connection = None
    results = {"successful": [], "failed": {}}

    if not courses_to_enroll:
        return results

    try:
        connection = get_db_connection()
        if connection is None:
            raise SubjectError("Không thể kết nối đến database.")

        cursor = connection.cursor(dictionary=True)
        connection.start_transaction()

        for course_data in courses_to_enroll:
            course_code = course_data.get('course_code')
            if not course_code:
                continue

            try:
                # 1. Lấy thông tin mới nhất từ DB và KHÓA dòng dữ liệu lại để chống race condition
                query_course_lock = "SELECT * FROM courses "
                cursor.execute(query_course_lock)
                course_db_info = cursor.fetchone()

                if not course_db_info:
                    results["failed"][course_code] = "Môn học không tồn tại"
                    continue

                course_code_from_db = course_db_info['course_code']

        
            except mysql.connector.Error as err:
                results["failed"][course_code] = f"Lỗi database khi xử lý môn học: {err}"

        # 4. COMMIT TRANSACTION: Lưu vĩnh viễn tất cả thay đổi nếu không có lỗi nghiêm trọng
        connection.commit()

    except mysql.connector.Error as err:
        # Nếu có bất kỳ lỗi nào ở cấp độ transaction, hủy bỏ tất cả thay đổi
        if connection:
            connection.rollback()
        raise EnrollmentError(f"Lỗi transaction nghiêm trọng: {err}")
    
    finally:
        # đóng kết nối 
        if connection and connection.is_connected():
            cursor.close()
            connection.close()

    return results
