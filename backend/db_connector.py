# db_connector.py
import mysql.connector
from mysql.connector import pooling
import os

db_config = {
    "host": os.environ.get("DB_HOST", "localhost"),
    "user": os.environ.get("DB_USER", "root"),
    "password": os.environ.get("DB_PASSWORD", "Cuong2005@"),
    "database": os.environ.get("DB_NAME", "qtm"),
}

try:
    connection_pool = pooling.MySQLConnectionPool(pool_name="registration_pool", pool_size=10,pool_reset_session=True, **db_config)
    print("MySQL Connection Pool created successfully")
except mysql.connector.Error as err:
    print(f"Error creating connection pool: {err}")
    exit(1)

def get_db_connection():
    try:
        return connection_pool.get_connection()
    except mysql.connector.Error as err:
        print(f"Error getting connection from pool: {err}")
        return None