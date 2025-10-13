create table courses
(
    id            bigint auto_increment
        primary key,
    course_code   varchar(20)   not null,
    course_name   varchar(255)  not null,
    max_slots     int           not null comment 'Sĩ số tối đa của lớp học',
    current_slots int default 0 not null comment 'Sĩ số hiện tại, sẽ bị lock và cập nhật trong transaction',
    constraint course_code
        unique (course_code)
);

INSERT INTO qtm.courses (id, course_code, course_name, max_slots, current_slots) VALUES (1, 'CS101', 'Lập trình Python cơ bản', 50, 10);
INSERT INTO qtm.courses (id, course_code, course_name, max_slots, current_slots) VALUES (2, 'CS102', 'Cấu trúc dữ liệu và giải thuật', 60, 15);
INSERT INTO qtm.courses (id, course_code, course_name, max_slots, current_slots) VALUES (3, 'CS103', 'Cơ sở dữ liệu', 55, 20);
