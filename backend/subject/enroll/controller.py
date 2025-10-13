from db_connector import get_db_connection
import pymysql

class EnrollmentError(Exception):
    pass

def enroll_in_courses(student_code: str, courses_to_enroll: list):
    connection = None
    results = {"successful": [], "failed": {}}

    if not courses_to_enroll:
        return results

    try:
        connection = get_db_connection()
        if connection is None:
            raise EnrollmentError("Không thể kết nối đến database.")

        # Dùng DictCursor nếu là pymysql
        cursor = connection.cursor(pymysql.cursors.DictCursor)

        # Một số driver (như PyMySQL) không có start_transaction(), nên thay bằng begin()
        try:
            connection.begin()
        except AttributeError:
            pass

        for course_data in courses_to_enroll:
            course_code = course_data.get('course_code')
            if not course_code:
                continue

            try:
                # 1. Lấy thông tin mới nhất từ DB và KHÓA dòng dữ liệu lại để chống race condition
                query_course_lock = """
                    SELECT course_code, current_slots, max_slots 
                    FROM courses 
                    WHERE course_code = %s 
                    FOR UPDATE
                """
                cursor.execute(query_course_lock, (course_code,))
                course_db_info = cursor.fetchone()

                if not course_db_info:
                    results["failed"][course_code] = "Môn học không tồn tại"
                    continue

                course_code_from_db = course_db_info['course_code']

                # 2. Kiểm tra sĩ số dựa trên dữ liệu vừa lấy từ DB
                if course_db_info['current_slots'] < course_db_info['max_slots']:
                    # Vẫn còn chỗ
                    # 3a. Ghi nhận đăng ký vào bảng `registrations`
                    insert_registration = """
                        INSERT INTO registrations (student_code, course_code) 
                        VALUES (%s, %s)
                    """
                    cursor.execute(insert_registration, (student_code, course_code_from_db))
                    
                    # 3b. Cập nhật lại sĩ số hiện tại trong bảng `courses`
                    update_slots = """
                        UPDATE courses 
                        SET current_slots = current_slots + 1 
                        WHERE course_code = %s
                    """
                    cursor.execute(update_slots, (course_code_from_db,))
                    
                    results["successful"].append(course_code)
                else:
                    results["failed"][course_code] = "Lớp học đã đầy"

            except mysql.connector.Error as err:
                results["failed"][course_code] = f"Lỗi database khi xử lý môn học: {err}"

        # 4. COMMIT TRANSACTION
        connection.commit()

    except mysql.connector.Error as err:
        if connection:
            connection.rollback()
        raise EnrollmentError(f"Lỗi transaction nghiêm trọng: {err}")
    
    finally:
        try:
            if 'cursor' in locals() and cursor is not None:
                cursor.close()
        except Exception:
            pass
        try:
            if connection is not None:
                connection.close()
        except Exception:
            pass

    return results
