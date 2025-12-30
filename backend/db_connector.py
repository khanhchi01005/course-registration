import pymysql
from dbutils.pooled_db import PooledDB
import os
from dotenv import load_dotenv

load_dotenv()

db_pool = PooledDB(
    creator=pymysql,
    host=os.getenv("DB_HOST"),
    user=os.getenv("DB_USER"),
    password=os.getenv("DB_PASSWORD"),
    database=os.getenv("DB_NAME"),
    port=int(os.getenv("DB_PORT")),
    charset="utf8mb4",
    maxconnections=10,
    mincached=3,
    maxcached=6
)

def get_db_connection():
    return db_pool.connection()

def test_connection():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT VERSION()")
    print("MySQL version:", cursor.fetchone())
    cursor.close()
    conn.close()

if __name__ == "__main__":
    test_connection()
