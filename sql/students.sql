CREATE TABLE students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_code TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    full_name TEXT NOT NULL
);

INSERT INTO students (id, student_code, password_hash, full_name) VALUES
(1, 'SV001', 'abc', 'Nguyen Van A'),
(2, 'SV002', 'def', 'Tran Thi B'),
(3, 'SV003', 'ghi', 'Le Van C');