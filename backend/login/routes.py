import datetime
import os
import mysql.connector
from db_connector import get_db_connection
from mysql.connector import Error

def login_user(student_code, password_hash):
    conn = None
    cur = None
    try:
        conn = get_db_connection()
        cur = conn.cursor(dictionary=True)
        cur.execute(
            "SELECT student_code, full_name FROM students WHERE student_code = %s AND password_hash = %s",
            (student_code, password_hash)
        )
        row = cur.fetchone()
        return row

    except Error as e:
        print(f"Error during login: {e}")
        return None
    finally:
        if cur:
            try: cur.close()
            except Exception: pass
        if conn:
            conn.close()