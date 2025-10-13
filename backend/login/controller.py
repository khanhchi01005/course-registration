import datetime
import os
import pymysql
from db_connector import get_db_connection

def login_user(student_code, password_hash):
    conn = None
    cur = None
    try:
        conn = get_db_connection()
        cur = conn.cursor(pymysql.cursors.DictCursor)
        cur.execute(
            "SELECT student_code, full_name FROM students WHERE student_code = %s AND password_hash = %s",
            (student_code, password_hash)
        )
        row = cur.fetchone()
        return row

    except pymysql.MySQLError as e:
        print(f"Error during login: {e}")
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