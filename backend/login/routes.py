import sqlite3
import datetime
import os

DATABASE = os.path.join(os.path.dirname(os.getcwd()), 'course-registration.db')

def get_db_connection():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

def login_user(student_code, password_hash):
    conn = None
    try:
        conn = get_db_connection()
        user = conn.execute(
            "SELECT student_code, full_name FROM students WHERE student_code = ? AND password_hash = ?",
            (student_code, password_hash)
        ).fetchone()
        return user
    except Exception as e:
        print(f"Error during login: {e}")
        return None
    finally:
        if conn:
            conn.close()