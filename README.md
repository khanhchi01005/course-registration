# Hướng dẫn cài đặt

## Clone dự án:

```bash
git clone https://github.com/<your-repo>/course-registration.git
```

## Chạy docker:

```bash
docker compose build --no-cache
docker compose up -d
```

## Nếu lỗi thì build lại:

```bash
docker compose down -v --rmi all
docker compose build --no-cache
docker compose up -d
```

## Dữ liệu môn học

```bash
INSERT INTO courses (course_code, course_name, max_slots, current_slots) VALUES
('PHI1006_1', 'Triết học Mác – Lênin', 93, 63),
('PHI1006_2', 'Triết học Mác – Lênin', 108, 108),
('PEC1008_1', 'Kinh tế chính trị Mác-Lênin', 84, 54),
('PEC1008_2', 'Kinh tế chính trị Mác-Lênin', 97, 58),
('PHI1002_1', 'Chủ nghĩa xã hội khoa học', 90, 60),
('PHI1002_2', 'Chủ nghĩa xã hội khoa học', 85, 49),
('HIS1001_1', 'Lịch sử Đảng Cộng sản Việt Nam', 88, 55),
('POL1001_1', 'Tư tưởng Hồ Chí Minh', 103, 73),
('THL1057_1', 'Nhà nước và Pháp luật đại cương', 91, 52),
('THL1057_2', 'Nhà nước và Pháp luật đại cương', 72, 42),
('FLF1107_1', 'Tiếng Anh B1', 105, 105),
('FLF1107_2', 'Tiếng Anh B1', 110, 110),
('FLF1108_1', 'Tiếng Anh B2', 90, 57),
('FLF1108_2', 'Tiếng Anh B2', 102, 72),
('INT1009_1', 'Tin học cơ sở', 95, 59),
('INT1009_2', 'Tin học cơ sở', 82, 52),
('MAT1093_1', 'Đại số', 110, 80),
('MAT1041_1', 'Giải tích 1', 100, 70),
('MAT1041_2', 'Giải tích 1', 94, 60),
('MAT1042_1', 'Giải tích 2', 90, 55),
('EPN1095_1', 'Vật lý đại cương 1', 108, 78),
('EPN1096_1', 'Vật lý đại cương 2', 104, 74),
('INT1008_1', 'Nhập môn lập trình', 100, 61),
('INT1008_2', 'Nhập môn lập trình', 78, 48),
('ELT2035_1', 'Tín hiệu và hệ thống', 85, 55),
('INT2210_1', 'Cấu trúc dữ liệu và giải thuật', 105, 68),
('INT2210_2', 'Cấu trúc dữ liệu và giải thuật', 91, 61),
('MAT1101_1', 'Xác suất thống kê', 92, 62),
('INT2215_1', 'Lập trình nâng cao', 110, 74),
('INT2211_1', 'Cơ sở dữ liệu', 90, 60),
('INT2211_2', 'Cơ sở dữ liệu', 105, 75),
('INT2212_1', 'Kiến trúc máy tính', 107, 70),
('INT1050_1', 'Toán học rời rạc', 100, 100),
('INT2214_1', 'Nguyên lý hệ điều hành', 102, 72),
('INT2213_1', 'Mạng máy tính', 95, 63),
('INT2204_1', 'Lập trình hướng đối tượng', 92, 55),
('INT2208_1', 'Công nghệ phần mềm', 103, 73),
('INT2044_1', 'Lý thuyết thông tin', 82, 52),
('ELT3057_1', 'Truyền thông số và mã hóa', 78, 46),
('INT3303_1', 'Mạng không dây', 95, 65),
('INT3307E_1', 'An toàn và an ninh mạng', 80, 80),
('INT3310_1', 'Quản trị mạng', 96, 96),
('INT3306_1', 'Phát triển ứng dụng Web', 105, 68),
('INT3313E_1', 'Các vấn đề hiện đại của Truyền thông và Mạng máy tính', 87, 87),
('INT4002_1', 'Thực tập doanh nghiệp', 90, 55),
('INT3301_1', 'Thực hành hệ điều hành mạng', 94, 64),
('INT3308_1', 'Đánh giá hiệu năng mạng', 78, 48),
('INT3309_1', 'Phân tích và thiết kế mạng máy tính', 100, 70),
('INT3317E_1', 'Thực hành an ninh mạng', 102, 72),
('INT3327_1', 'Kiểm thử an ninh mạng', 91, 61),
('INT3324_1', 'An ninh di động', 103, 65),
('INT3318_1', 'Các thiết bị mạng và môi trường truyền', 90, 58),
('INT3304_1', 'Lập trình mạng', 85, 55),
('INT3319E_1', 'Điện toán đám mây', 102, 72),
('INT3326_1', 'Phát triển ứng dụng điện toán đám mây', 90, 60),
('INT3323_1', 'Phát triển ứng dụng Internet of Things', 88, 51),
('INT3305_1', 'Truyền thông đa phương tiện', 105, 75),
('INT3202_1', 'Hệ quản trị cơ sở dữ liệu', 91, 61),
('INT3325_1', 'Các hệ thống nhúng', 103, 70),
('INT3120_1', 'Phát triển ứng dụng di động', 108, 78),
('ELT3243_1', 'Các nguyên lý truyền thông', 90, 60),
('ELT3067_1', 'Truyền thông quang', 88, 50),
('ELT3144_1', 'Xử lý tín hiệu số', 105, 69),
('ELT3098_1', 'Truyền thông vệ tinh', 93, 63),
('ELT3163_1', 'Mạng truyền thông di động', 101, 71),
('ELT3062_1', 'Mạng truyền thông máy tính 2', 78, 48),
('ELT3056_1', 'Truyền thông vô tuyến', 106, 76),
('INT3209E_1', 'Khai phá dữ liệu', 103, 73),
('INT3401_1', 'Trí tuệ nhân tạo', 98, 68),
('INT3405_1', 'Học máy', 110, 71),
('INT3105_1', 'Kiến trúc phần mềm', 90, 60),
('INT3111_1', 'Quản lý dự án phần mềm', 105, 67),
('INT3125_1', 'Các chuyên đề trong TT&MMT', 80, 50),
('UET1002_1', 'Kỹ năng khởi nghiệp', 95, 65),
('INT3418_1', 'Thuật toán nâng cao và ứng dụng', 104, 74),
('INT3102_1', 'Phương pháp tính', 110, 80),
('INT3103_1', 'Tối ưu hóa', 91, 56),
('INT4006_1', 'Thực tập tốt nghiệp', 98, 68),
('INT4054_1', 'Đồ án tốt nghiệp', 75, 45),
('INT2211_3', 'Cơ sở dữ liệu', 80, 40),
('INT2204_2', 'Lập trình hướng đối tượng', 75, 50),
('INT2210_3', 'Cấu trúc dữ liệu và giải thuật', 80, 45),
('INT3306_2', 'Phát triển ứng dụng Web', 80, 40),
('INT3401_2', 'Trí tuệ nhân tạo', 90, 50),
('INT3405_2', 'Học máy', 90, 55),
('INT3319E_2', 'Điện toán đám mây', 85, 60),
('INT3120_2', 'Phát triển ứng dụng di động', 80, 50),
('INT3105_2', 'Kiến trúc phần mềm', 75, 45);
```
