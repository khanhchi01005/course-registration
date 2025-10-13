create table registrations
(
    id                bigint auto_increment
        primary key,
    student_id        bigint                                not null,
    course_id         bigint                                not null,
    registration_time timestamp   default CURRENT_TIMESTAMP null,
    status            varchar(20) default 'SUCCESSFUL'      null,
    constraint fk_reg_course
        foreign key (course_id) references courses (id)
            on delete cascade,
    constraint fk_reg_student
        foreign key (student_id) references students (id)
            on delete cascade
);

INSERT INTO qtm.registrations (id, student_id, course_id, registration_time, status) VALUES (4, 1, 1, '2025-10-07 23:42:29', 'SUCCESSFUL');
INSERT INTO qtm.registrations (id, student_id, course_id, registration_time, status) VALUES (5, 2, 2, '2025-10-07 23:42:29', 'SUCCESSFUL');
INSERT INTO qtm.registrations (id, student_id, course_id, registration_time, status) VALUES (6, 3, 3, '2025-10-07 23:42:29', 'SUCCESSFUL');
