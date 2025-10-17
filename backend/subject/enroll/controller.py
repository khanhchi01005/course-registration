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

        cursor = connection.cursor(pymysql.cursors.DictCursor)
        connection.begin()

        for course_data in courses_to_enroll:
            # Nếu phần tử là string
            if isinstance(course_data, str):
                course_code = course_data
            # Nếu phần tử là dict
            elif isinstance(course_data, dict):
                course_code = course_data.get('course_code')
            else:
                continue

            if not course_code:
                continue

            try:
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

                if course_db_info['current_slots'] < course_db_info['max_slots']:
                    cursor.execute(
                        "INSERT INTO registrations (student_code, course_code) VALUES (%s, %s)",
                        (student_code, course_code),
                    )
                    cursor.execute(
                        "UPDATE courses SET current_slots = current_slots + 1 WHERE course_code = %s",
                        (course_code,),
                    )
                    results["successful"].append(course_code)
                else:
                    results["failed"][course_code] = "Lớp học đã đầy"

            except pymysql.MySQLError as err:
                results["failed"][course_code] = f"Lỗi database khi xử lý môn học: {err}"

        connection.commit()

    except pymysql.MySQLError as err:
        if connection:
            connection.rollback()
        raise EnrollmentError(f"Lỗi transaction nghiêm trọng: {err}")

    finally:
        if 'cursor' in locals() and cursor:
            cursor.close()
        if connection:
            connection.close()

    return results
