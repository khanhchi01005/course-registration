-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: qtm
-- ------------------------------------------------------
-- Server version	8.0.42

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `courses`
--

DROP TABLE IF EXISTS `courses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `courses` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `course_code` varchar(20) NOT NULL,
  `course_name` varchar(255) NOT NULL,
  `max_slots` int NOT NULL COMMENT 'Sĩ số tối đa của lớp học',
  `current_slots` int NOT NULL DEFAULT '0' COMMENT 'Sĩ số hiện tại, sẽ bị lock và cập nhật trong transaction',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_course_code` (`course_code`),
  UNIQUE KEY `idx_course_code` (`course_code`)
) ENGINE=InnoDB AUTO_INCREMENT=92 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `courses`
--

LOCK TABLES `courses` WRITE;
/*!40000 ALTER TABLE `courses` DISABLE KEYS */;
INSERT INTO `courses` VALUES (4,'PHI1006_1','Triết học Mác – Lênin',93,63),(5,'PHI1006_2','Triết học Mác – Lênin',108,108),(6,'PEC1008_1','Kinh tế chính trị Mác-Lênin',84,54),(7,'PEC1008_2','Kinh tế chính trị Mác-Lênin',97,58),(8,'PHI1002_1','Chủ nghĩa xã hội khoa học',90,60),(9,'PHI1002_2','Chủ nghĩa xã hội khoa học',85,49),(10,'HIS1001_1','Lịch sử Đảng Cộng sản Việt Nam',88,55),(11,'POL1001_1','Tư tưởng Hồ Chí Minh',103,73),(12,'THL1057_1','Nhà nước và Pháp luật đại cương',91,52),(13,'THL1057_2','Nhà nước và Pháp luật đại cương',72,42),(14,'FLF1107_1','Tiếng Anh B1',105,105),(15,'FLF1107_2','Tiếng Anh B1',110,110),(16,'FLF1108_1','Tiếng Anh B2',90,57),(17,'FLF1108_2','Tiếng Anh B2',102,72),(18,'INT1009_1','Tin học cơ sở',95,59),(19,'INT1009_2','Tin học cơ sở',82,52),(20,'MAT1093_1','Đại số',110,80),(21,'MAT1041_1','Giải tích 1',100,70),(22,'MAT1041_2','Giải tích 1',94,60),(23,'MAT1042_1','Giải tích 2',90,55),(24,'EPN1095_1','Vật lý đại cương 1',108,78),(25,'EPN1096_1','Vật lý đại cương 2',104,74),(26,'INT1008_1','Nhập môn lập trình',100,61),(27,'INT1008_2','Nhập môn lập trình',78,48),(28,'ELT2035_1','Tín hiệu và hệ thống',85,55),(29,'INT2210_1','Cấu trúc dữ liệu và giải thuật',105,68),(30,'INT2210_2','Cấu trúc dữ liệu và giải thuật',91,61),(31,'MAT1101_1','Xác suất thống kê',92,62),(32,'INT2215_1','Lập trình nâng cao',110,74),(33,'INT2211_1','Cơ sở dữ liệu',90,60),(34,'INT2211_2','Cơ sở dữ liệu',105,75),(35,'INT2212_1','Kiến trúc máy tính',107,70),(36,'INT1050_1','Toán học rời rạc',100,100),(37,'INT2214_1','Nguyên lý hệ điều hành',102,73),(38,'INT2213_1','Mạng máy tính',95,63),(39,'INT2204_1','Lập trình hướng đối tượng',92,55),(40,'INT2208_1','Công nghệ phần mềm',103,73),(41,'INT2044_1','Lý thuyết thông tin',82,52),(42,'ELT3057_1','Truyền thông số và mã hóa',78,46),(43,'INT3303_1','Mạng không dây',95,65),(44,'INT3307E_1','An toàn và an ninh mạng',80,80),(45,'INT3310_1','Quản trị mạng',96,96),(46,'INT3306_1','Phát triển ứng dụng Web',105,68),(47,'INT3313E_1','Các vấn đề hiện đại của Truyền thông và Mạng máy tính',87,87),(48,'INT4002_1','Thực tập doanh nghiệp',90,55),(49,'INT3301_1','Thực hành hệ điều hành mạng',94,64),(50,'INT3308_1','Đánh giá hiệu năng mạng',78,48),(51,'INT3309_1','Phân tích và thiết kế mạng máy tính',100,70),(52,'INT3317E_1','Thực hành an ninh mạng',102,72),(53,'INT3327_1','Kiểm thử an ninh mạng',91,61),(54,'INT3324_1','An ninh di động',103,65),(55,'INT3318_1','Các thiết bị mạng và môi trường truyền',90,58),(56,'INT3304_1','Lập trình mạng',85,55),(57,'INT3319E_1','Điện toán đám mây',102,72),(58,'INT3326_1','Phát triển ứng dụng điện toán đám mây',90,60),(59,'INT3323_1','Phát triển ứng dụng Internet of Things',88,51),(60,'INT3305_1','Truyền thông đa phương tiện',105,75),(61,'INT3202_1','Hệ quản trị cơ sở dữ liệu',91,61),(62,'INT3325_1','Các hệ thống nhúng',103,70),(63,'INT3120_1','Phát triển ứng dụng di động',108,78),(64,'ELT3243_1','Các nguyên lý truyền thông',90,60),(65,'ELT3067_1','Truyền thông quang',88,50),(66,'ELT3144_1','Xử lý tín hiệu số',105,69),(67,'ELT3098_1','Truyền thông vệ tinh',93,63),(68,'ELT3163_1','Mạng truyền thông di động',101,72),(69,'ELT3062_1','Mạng truyền thông máy tính 2',78,49),(70,'ELT3056_1','Truyền thông vô tuyến',106,76),(71,'INT3209E_1','Khai phá dữ liệu',103,73),(72,'INT3401_1','Trí tuệ nhân tạo',98,68),(73,'INT3405_1','Học máy',110,71),(74,'INT3105_1','Kiến trúc phần mềm',90,60),(75,'INT3111_1','Quản lý dự án phần mềm',105,67),(76,'INT3125_1','Các chuyên đề trong TT&MMT',80,50),(77,'UET1002_1','Kỹ năng khởi nghiệp',95,65),(78,'INT3418_1','Thuật toán nâng cao và ứng dụng',104,74),(79,'INT3102_1','Phương pháp tính',110,80),(80,'INT3103_1','Tối ưu hóa',91,56),(81,'INT4006_1','Thực tập tốt nghiệp',98,68),(82,'INT4054_1','Đồ án tốt nghiệp',75,45),(83,'INT2211_3','Cơ sở dữ liệu',80,40),(84,'INT2204_2','Lập trình hướng đối tượng',75,50),(85,'INT2210_3','Cấu trúc dữ liệu và giải thuật',80,45),(86,'INT3306_2','Phát triển ứng dụng Web',80,40),(87,'INT3401_2','Trí tuệ nhân tạo',90,50),(88,'INT3405_2','Học máy',90,55),(89,'INT3319E_2','Điện toán đám mây',85,60),(90,'INT3120_2','Phát triển ứng dụng di động',80,50),(91,'INT3105_2','Kiến trúc phần mềm',75,45);
/*!40000 ALTER TABLE `courses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `draft_registrations`
--

DROP TABLE IF EXISTS `draft_registrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `draft_registrations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `added_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `student_code` varchar(20) DEFAULT NULL,
  `course_code` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_draft_student` (`student_code`),
  KEY `fk_draft_course` (`course_code`),
  CONSTRAINT `fk_draft_course` FOREIGN KEY (`course_code`) REFERENCES `courses` (`course_code`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_draft_student` FOREIGN KEY (`student_code`) REFERENCES `students` (`student_code`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `draft_registrations`
--

LOCK TABLES `draft_registrations` WRITE;
/*!40000 ALTER TABLE `draft_registrations` DISABLE KEYS */;
/*!40000 ALTER TABLE `draft_registrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `registrations`
--

DROP TABLE IF EXISTS `registrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `registrations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `registration_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `status` varchar(20) DEFAULT 'SUCCESSFUL',
  `student_code` varchar(20) DEFAULT NULL,
  `course_code` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_registration_student` (`student_code`),
  KEY `fk_registration_course` (`course_code`),
  CONSTRAINT `fk_registration_course` FOREIGN KEY (`course_code`) REFERENCES `courses` (`course_code`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_registration_student` FOREIGN KEY (`student_code`) REFERENCES `students` (`student_code`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `registrations`
--

LOCK TABLES `registrations` WRITE;
/*!40000 ALTER TABLE `registrations` DISABLE KEYS */;
INSERT INTO `registrations` VALUES (37,'2025-10-17 04:05:58','SUCCESSFUL','23020623','ELT3163_1'),(38,'2025-10-17 04:05:58','SUCCESSFUL','23020623','ELT3062_1'),(39,'2025-10-17 04:05:58','SUCCESSFUL','23020623','INT2214_1');
/*!40000 ALTER TABLE `registrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `students`
--

DROP TABLE IF EXISTS `students`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `students` (
  `id` int NOT NULL AUTO_INCREMENT,
  `student_code` varchar(20) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `full_name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_student_code` (`student_code`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `students`
--

LOCK TABLES `students` WRITE;
/*!40000 ALTER TABLE `students` DISABLE KEYS */;
INSERT INTO `students` VALUES (1,'SV001','matkhau1','Nguyen Van A'),(2,'SV002','matkhau2','Tran Thi B'),(3,'SV003','matkhau3','Le Van C'),(4,'23020623','1','Nguyen Phuoc Nguong Long');
/*!40000 ALTER TABLE `students` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-13 18:23:12
