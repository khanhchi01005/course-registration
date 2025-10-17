# ...existing code...
import pymysql
from typing import Optional, List, Dict, Any
from db_connector import get_db_connection

def get_list(student_code: str) -> Optional[List[Dict[str, Any]]]:
    conn = None
    cur = None
    try:
        conn = get_db_connection()
        if conn is None:
            return None

        cur = conn.cursor(pymysql.cursors.DictCursor)

        # Normalize input and do case-insensitive lookup to avoid missing student
        student_code_norm = student_code.strip()
        cur.execute("SELECT * FROM students WHERE LOWER(student_code) = LOWER(%s) LIMIT 1", (student_code_norm,))
        if cur.fetchone() is None:
            return None

        cur.execute("""
            SELECT  course_code, course_name, current_slots, max_slots
            FROM courses
            ORDER BY course_name
        """)
        rows = cur.fetchall()
      
        return list(rows) if rows is not None else []

    except pymysql.MySQLError:
        return None
    finally:
        if cur:
            try:
                cur.close()
            except Exception:
                pass
        if conn:
            try:
                conn.close()
            except Exception:
                pass

def get_all_list() -> Optional[List[Dict[str, Any]]]:
    """
    Lấy toàn bộ danh sách khóa học (không phụ thuộc student_code)
    """
    conn = None
    cur = None
    try:
        conn = get_db_connection()
        if conn is None:
            return None

        cur = conn.cursor(pymysql.cursors.DictCursor)

        cur.execute("""
            SELECT course_code, course_name, current_slots, max_slots
            FROM courses
            ORDER BY course_name
        """)
        rows = cur.fetchall()

        return list(rows) if rows else []

    except pymysql.MySQLError:
        return None
    finally:
        if cur:
            try:
                cur.close()
            except Exception:
                pass
        if conn:
            try:
                conn.close()
            except Exception:
                pass