CREATE DATABASE  IF NOT EXISTS `zakat_app_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `zakat_app_db`;
-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: localhost    Database: zakat_app_db
-- ------------------------------------------------------
-- Server version	8.0.29

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
-- Temporary view structure for view `accepted_donations`
--

DROP TABLE IF EXISTS `accepted_donations`;
/*!50001 DROP VIEW IF EXISTS `accepted_donations`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `accepted_donations` AS SELECT 
 1 AS `id`,
 1 AS `amount`,
 1 AS `address`,
 1 AS `status`,
 1 AS `donorId`,
 1 AS `workerId`,
 1 AS `refName`,
 1 AS `refPhone`,
 1 AS `areaId`,
 1 AS `createdAt`,
 1 AS `updatedAt`,
 1 AS `requestedAt`,
 1 AS `approvedAt`,
 1 AS `acceptedAt`,
 1 AS `firstName`,
 1 AS `lastName`,
 1 AS `email`,
 1 AS `phone`,
 1 AS `cnic`,
 1 AS `active`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `active_areas`
--

DROP TABLE IF EXISTS `active_areas`;
/*!50001 DROP VIEW IF EXISTS `active_areas`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `active_areas` AS SELECT 
 1 AS `id`,
 1 AS `createdAt`,
 1 AS `updatedAt`,
 1 AS `areaName`,
 1 AS `chairpersonId`,
 1 AS `active`,
 1 AS `assignedAt`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `all_areas`
--

DROP TABLE IF EXISTS `all_areas`;
/*!50001 DROP VIEW IF EXISTS `all_areas`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `all_areas` AS SELECT 
 1 AS `id`,
 1 AS `createdAt`,
 1 AS `updatedAt`,
 1 AS `areaName`,
 1 AS `chairpersonId`,
 1 AS `active`,
 1 AS `assignedAt`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `area`
--

DROP TABLE IF EXISTS `area`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `area` (
  `id` char(32) NOT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  `areaName` varchar(256) NOT NULL,
  `chairpersonId` char(32) DEFAULT NULL,
  `active` tinyint NOT NULL DEFAULT '1',
  `assignedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `areaName_UNIQUE` (`areaName`),
  UNIQUE KEY `chairpersonId_UNIQUE` (`chairpersonId`),
  CONSTRAINT `chairpersonId` FOREIGN KEY (`chairpersonId`) REFERENCES `user` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `area`
--

LOCK TABLES `area` WRITE;
/*!40000 ALTER TABLE `area` DISABLE KEYS */;
INSERT INTO `area` VALUES ('100392530859786250','2023-07-10 07:25:28','2023-07-10 10:01:22','Gulshan-e-Iqbal','100392530859786249',1,'2023-07-10 10:01:22'),('100392530859786278','2023-07-12 01:56:55',NULL,'Gulistan-e-Jauhar',NULL,1,NULL),('100392530859786279','2023-07-12 01:57:06',NULL,'Korangi',NULL,1,NULL),('100392530859786280','2023-07-12 01:57:13',NULL,'Federal B. Area',NULL,1,NULL),('100392530859786281','2023-07-12 01:57:26',NULL,'Hussainabad',NULL,1,NULL);
/*!40000 ALTER TABLE `area` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `area_BEFORE_INSERT` BEFORE INSERT ON `area` FOR EACH ROW BEGIN
	SET NEW.id = GENERATE_ID();
    SET NEW.createdAt = CURRENT_TIMESTAMP();
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `area_BEFORE_UPDATE` BEFORE UPDATE ON `area` FOR EACH ROW BEGIN
	SET NEW.updatedAt = CURRENT_TIMESTAMP();
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Temporary view structure for view `area_with_chairperson`
--

DROP TABLE IF EXISTS `area_with_chairperson`;
/*!50001 DROP VIEW IF EXISTS `area_with_chairperson`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `area_with_chairperson` AS SELECT 
 1 AS `id`,
 1 AS `createdAt`,
 1 AS `updatedAt`,
 1 AS `areaName`,
 1 AS `chairpersonId`,
 1 AS `active`,
 1 AS `assignedAt`,
 1 AS `chairpersonName`,
 1 AS `chairpersonEmail`,
 1 AS `chairpersonPhone`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `chairperson_data`
--

DROP TABLE IF EXISTS `chairperson_data`;
/*!50001 DROP VIEW IF EXISTS `chairperson_data`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `chairperson_data` AS SELECT 
 1 AS `id`,
 1 AS `firstName`,
 1 AS `lastName`,
 1 AS `email`,
 1 AS `emailVerified`,
 1 AS `role`,
 1 AS `phone`,
 1 AS `cnic`,
 1 AS `active`,
 1 AS `createdAt`,
 1 AS `updatedAt`,
 1 AS `areaId`,
 1 AS `areaCreatedAt`,
 1 AS `areaUpdatedAt`,
 1 AS `areaName`,
 1 AS `areaAssignedAt`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `collected_donations`
--

DROP TABLE IF EXISTS `collected_donations`;
/*!50001 DROP VIEW IF EXISTS `collected_donations`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `collected_donations` AS SELECT 
 1 AS `id`,
 1 AS `amount`,
 1 AS `address`,
 1 AS `status`,
 1 AS `donorId`,
 1 AS `workerId`,
 1 AS `refName`,
 1 AS `refPhone`,
 1 AS `areaId`,
 1 AS `createdAt`,
 1 AS `updatedAt`,
 1 AS `requestedAt`,
 1 AS `approvedAt`,
 1 AS `acceptedAt`,
 1 AS `collectedAt`,
 1 AS `firstName`,
 1 AS `lastName`,
 1 AS `email`,
 1 AS `phone`,
 1 AS `cnic`,
 1 AS `active`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `donation`
--

DROP TABLE IF EXISTS `donation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `donation` (
  `id` char(32) NOT NULL,
  `amount` float DEFAULT NULL,
  `address` varchar(256) DEFAULT NULL,
  `status` enum('REQUESTED','PENDING','ACCEPTED','COLLECTED') NOT NULL,
  `refName` text,
  `refPhone` varchar(45) DEFAULT NULL,
  `donorId` char(32) DEFAULT NULL,
  `workerId` char(32) DEFAULT NULL,
  `areaId` char(32) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  `requestedAt` timestamp NULL DEFAULT NULL,
  `approvedAt` timestamp NULL DEFAULT NULL,
  `acceptedAt` timestamp NULL DEFAULT NULL,
  `collectedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `donorId_idx` (`donorId`),
  KEY `workerId_idx` (`workerId`),
  KEY `areaId_idx` (`areaId`),
  CONSTRAINT `donationAreaId` FOREIGN KEY (`areaId`) REFERENCES `area` (`id`),
  CONSTRAINT `donorId` FOREIGN KEY (`donorId`) REFERENCES `user` (`id`),
  CONSTRAINT `workerId` FOREIGN KEY (`workerId`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `donation`
--

LOCK TABLES `donation` WRITE;
/*!40000 ALTER TABLE `donation` DISABLE KEYS */;
INSERT INTO `donation` VALUES ('100392530859786283',15000,'F-14, Plot BS-9, Block-18, F.B. Area, Karachi','PENDING',NULL,NULL,'100392530859786282',NULL,'100392530859786280','2023-07-12 02:04:50','2023-07-24 10:02:09','2023-07-12 02:04:50','2023-07-24 10:02:09',NULL,NULL),('100392530859786284',150000,'Test address','REQUESTED',NULL,NULL,'100392530859786245',NULL,'100392530859786280','2023-07-12 08:17:56',NULL,'2023-07-12 08:17:56',NULL,NULL,NULL),('100392530859786286',20000,'Test address','REQUESTED',NULL,NULL,'100392530859786285',NULL,'100392530859786281','2023-07-12 09:09:10',NULL,'2023-07-12 09:09:10',NULL,NULL,NULL),('100392530859786287',50000,'Test','REQUESTED',NULL,NULL,'100392530859786282',NULL,'100392530859786280','2023-07-15 19:33:57',NULL,'2023-07-15 19:33:57',NULL,NULL,NULL),('100392530859786288',50000,'Test address 124','COLLECTED',NULL,NULL,'100392530859786282','100402492583444480','100392530859786250','2023-07-15 19:45:26','2023-07-18 21:50:12','2023-07-15 19:45:26','2023-07-16 15:16:41','2023-07-16 22:20:06','2023-07-18 21:50:12'),('100402492583444492',50000,'test address','COLLECTED',NULL,NULL,'100392530859786282','100402492583444480','100392530859786250','2023-07-16 15:27:23','2023-07-16 22:10:53','2023-07-16 15:27:23','2023-07-16 15:27:49','2023-07-16 20:50:29','2023-07-16 22:10:53'),('100402492583444493',125000,'Test address','COLLECTED',NULL,NULL,'100392530859786282',NULL,'100392530859786250','2023-07-18 17:15:12',NULL,NULL,NULL,NULL,'2023-07-18 17:15:12'),('100402492583444494',125000,'Test address','COLLECTED',NULL,NULL,'100392530859786282',NULL,'100392530859786250','2023-07-18 17:17:06',NULL,NULL,NULL,NULL,'2023-07-18 17:17:06'),('100402492583444495',55000,'Test address','COLLECTED',NULL,NULL,'100392530859786282',NULL,'100392530859786250','2023-07-18 17:18:53',NULL,NULL,NULL,NULL,'2023-07-18 17:18:53'),('100402492583444496',500000,'Test address','COLLECTED',NULL,NULL,'100392530859786282',NULL,'100392530859786250','2023-07-18 17:22:00',NULL,NULL,NULL,NULL,'2023-07-18 17:22:00'),('100402492583444497',45000,'Test','COLLECTED',NULL,NULL,'100392530859786282',NULL,'100392530859786250','2023-07-18 17:26:05',NULL,NULL,NULL,NULL,'2023-07-18 17:26:05'),('100402492583444498',45000,'Test','COLLECTED',NULL,NULL,'100392530859786282','100402492583444480','100392530859786250','2023-07-18 17:27:33',NULL,NULL,NULL,NULL,'2023-07-18 17:27:33'),('100402492583444501',56000,'Test address','COLLECTED',NULL,NULL,'100402492583444500','100402492583444480','100392530859786250','2023-07-18 21:04:25',NULL,NULL,NULL,NULL,'2023-07-18 21:04:25'),('100402492583444502',54000,'Test address','REQUESTED',NULL,NULL,'100392530859786282',NULL,'100392530859786280','2023-07-18 22:28:41',NULL,'2023-07-18 22:28:41',NULL,NULL,NULL),('100402492583444503',45000,'Test address','REQUESTED',NULL,NULL,'100392530859786282',NULL,'100392530859786279','2023-07-18 22:29:41',NULL,'2023-07-18 22:29:41',NULL,NULL,NULL),('100402492583444505',50000,'Test address','COLLECTED',NULL,NULL,'100392530859786282','100402492583444480','100392530859786250','2023-07-19 06:15:31',NULL,NULL,NULL,NULL,'2023-07-19 06:15:31'),('100402492583444507',60000,'Test address','COLLECTED',NULL,NULL,'100402492583444506','100402492583444480','100392530859786250','2023-07-19 06:16:27',NULL,NULL,NULL,NULL,'2023-07-19 06:16:27'),('100402492583444514',125990,'Test','COLLECTED',NULL,NULL,'100392530859786282','100402492583444480','100392530859786250','2023-07-24 00:05:37','2023-07-26 08:24:25','2023-07-24 00:05:37','2023-07-24 00:07:11','2023-07-24 00:11:33','2023-07-26 08:24:25'),('100402492583444515',500000,'+923138756406','COLLECTED','Aaliyan Aamir','Test address',NULL,'100402492583444480','100392530859786250','2023-07-24 09:18:27','2023-07-26 17:06:57',NULL,NULL,'2023-07-26 17:06:54','2023-07-26 17:06:57'),('100402492583444516',100000,'+923152283463','COLLECTED','Maham Aamir','Test',NULL,'100402492583444480','100392530859786250','2023-07-24 09:22:50','2023-07-26 17:05:39',NULL,NULL,'2023-07-26 17:05:34','2023-07-26 17:05:39'),('100402492583444528',50000,'Flat F-14, Samanabad Mubarace Corner, F.B. Area Karachi','COLLECTED',NULL,NULL,'100392530859786282','100402492583444480','100392530859786250','2023-07-26 16:49:45','2023-07-26 16:51:15','2023-07-26 16:49:45','2023-07-26 16:50:47','2023-07-26 16:51:10','2023-07-26 16:51:15'),('100402492583444529',450500,'Test address','COLLECTED',NULL,NULL,'100392530859786282','100402492583444480','100392530859786250','2023-07-26 17:09:34','2023-07-26 17:11:00','2023-07-26 17:09:34','2023-07-26 17:10:26','2023-07-26 17:10:55','2023-07-26 17:11:00'),('100402492583444530',1250000,'Test','COLLECTED',NULL,NULL,'100392530859786282','100402492583444480','100392530859786250','2023-07-26 17:59:07',NULL,NULL,NULL,NULL,'2023-07-26 17:59:07'),('100402492583444531',45000,'Test','COLLECTED',NULL,NULL,'100392530859786282','100402492583444480','100392530859786250','2023-07-26 18:01:50',NULL,NULL,NULL,NULL,'2023-07-26 18:01:50'),('100402492583444532',45600,'Test','COLLECTED',NULL,NULL,'100392530859786282','100402492583444480','100392530859786250','2023-07-26 18:03:47',NULL,NULL,NULL,NULL,'2023-07-26 18:03:47'),('100402492583444533',65000,'Test','COLLECTED',NULL,NULL,'100392530859786282','100402492583444480','100392530859786250','2023-07-26 18:04:23',NULL,NULL,NULL,NULL,'2023-07-26 18:04:23');
/*!40000 ALTER TABLE `donation` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `donation_BEFORE_INSERT` BEFORE INSERT ON `donation` FOR EACH ROW BEGIN
	SET NEW.id = GENERATE_ID();
    SET NEW.createdAt = CURRENT_TIMESTAMP();
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `donation_BEFORE_UPDATE` BEFORE UPDATE ON `donation` FOR EACH ROW BEGIN
    SET NEW.updatedAt = CURRENT_TIMESTAMP();
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Temporary view structure for view `donation_info`
--

DROP TABLE IF EXISTS `donation_info`;
/*!50001 DROP VIEW IF EXISTS `donation_info`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `donation_info` AS SELECT 
 1 AS `id`,
 1 AS `amount`,
 1 AS `address`,
 1 AS `status`,
 1 AS `refName`,
 1 AS `refPhone`,
 1 AS `donorId`,
 1 AS `workerId`,
 1 AS `areaId`,
 1 AS `createdAt`,
 1 AS `updatedAt`,
 1 AS `requestedAt`,
 1 AS `approvedAt`,
 1 AS `acceptedAt`,
 1 AS `collectedAt`,
 1 AS `areaName`,
 1 AS `chairpersonId`,
 1 AS `active`,
 1 AS `assignedAt`,
 1 AS `chairpersonName`,
 1 AS `chairpersonPhone`,
 1 AS `chairpersonCnic`,
 1 AS `chairpersonEmail`,
 1 AS `donorName`,
 1 AS `donorPhone`,
 1 AS `donorCnic`,
 1 AS `donorEmail`,
 1 AS `workerName`,
 1 AS `workerPhone`,
 1 AS `workerCnic`,
 1 AS `workerEmail`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `donor_history`
--

DROP TABLE IF EXISTS `donor_history`;
/*!50001 DROP VIEW IF EXISTS `donor_history`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `donor_history` AS SELECT 
 1 AS `id`,
 1 AS `amount`,
 1 AS `address`,
 1 AS `status`,
 1 AS `workerId`,
 1 AS `donorId`,
 1 AS `areaId`,
 1 AS `createdAt`,
 1 AS `updatedAt`,
 1 AS `requestedAt`,
 1 AS `approvedAt`,
 1 AS `acceptedAt`,
 1 AS `workerFirstName`,
 1 AS `workerLastName`,
 1 AS `workerEmail`,
 1 AS `phone`,
 1 AS `areaName`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `donor_requests`
--

DROP TABLE IF EXISTS `donor_requests`;
/*!50001 DROP VIEW IF EXISTS `donor_requests`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `donor_requests` AS SELECT 
 1 AS `id`,
 1 AS `amount`,
 1 AS `address`,
 1 AS `status`,
 1 AS `workerId`,
 1 AS `donorId`,
 1 AS `areaId`,
 1 AS `createdAt`,
 1 AS `updatedAt`,
 1 AS `requestedAt`,
 1 AS `approvedAt`,
 1 AS `acceptedAt`,
 1 AS `workerFirstName`,
 1 AS `workerLastName`,
 1 AS `workerEmail`,
 1 AS `phone`,
 1 AS `areaName`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `pending_donations`
--

DROP TABLE IF EXISTS `pending_donations`;
/*!50001 DROP VIEW IF EXISTS `pending_donations`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `pending_donations` AS SELECT 
 1 AS `id`,
 1 AS `amount`,
 1 AS `address`,
 1 AS `status`,
 1 AS `donorId`,
 1 AS `refName`,
 1 AS `refPhone`,
 1 AS `areaId`,
 1 AS `createdAt`,
 1 AS `updatedAt`,
 1 AS `requestedAt`,
 1 AS `approvedAt`,
 1 AS `firstName`,
 1 AS `lastName`,
 1 AS `email`,
 1 AS `phone`,
 1 AS `cnic`,
 1 AS `active`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `requested_donations`
--

DROP TABLE IF EXISTS `requested_donations`;
/*!50001 DROP VIEW IF EXISTS `requested_donations`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `requested_donations` AS SELECT 
 1 AS `id`,
 1 AS `amount`,
 1 AS `address`,
 1 AS `status`,
 1 AS `donorId`,
 1 AS `areaId`,
 1 AS `createdAt`,
 1 AS `updatedAt`,
 1 AS `requestedAt`,
 1 AS `firstName`,
 1 AS `lastName`,
 1 AS `email`,
 1 AS `phone`,
 1 AS `cnic`,
 1 AS `active`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` char(32) NOT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  `firstName` varchar(45) NOT NULL,
  `lastName` varchar(45) NOT NULL,
  `email` varchar(256) DEFAULT NULL,
  `emailOtp` varchar(4) DEFAULT NULL,
  `emailVerified` tinyint NOT NULL DEFAULT '0',
  `role` enum('DONOR','WORKER','OFFICE_SECRETARY','CHAIRPERSON','GENERAL_SECRETARY') NOT NULL,
  `phone` varchar(45) NOT NULL,
  `cnic` varchar(45) NOT NULL,
  `password` varchar(256) NOT NULL,
  `active` tinyint NOT NULL DEFAULT '1',
  `areaId` char(32) DEFAULT NULL,
  `assignedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `phone_UNIQUE` (`phone`),
  UNIQUE KEY `cnic_UNIQUE` (`cnic`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  KEY `areaId_idx` (`areaId`),
  CONSTRAINT `areaId` FOREIGN KEY (`areaId`) REFERENCES `area` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('100392530859786245','2023-07-09 10:59:10','2023-07-12 08:18:34','Test','Donor','testdonor123@gmail.com','5366',0,'DONOR','+923121212121','4210112121212','f4006ded3a51071a9d94a26f0d5bc869c8f92298',1,NULL,NULL),('100392530859786246','2023-07-09 11:01:46','2023-07-10 07:32:08','Test','Super','testsuper1@gmail.com','3336',0,'GENERAL_SECRETARY','+923232323232','4210123232323','37483bf780aa68fbb00b20e5f2dbef28f07d48f6',1,NULL,NULL),('100392530859786249','2023-07-09 11:03:19','2023-07-23 22:40:28','Test','Chairperson','testchairperson@gmail.com','3721',0,'CHAIRPERSON','+923232323231','4210123232322','37483bf780aa68fbb00b20e5f2dbef28f07d48f6',1,NULL,NULL),('100392530859786259','2023-07-10 10:11:31',NULL,'Test','Worker2','testworker2@gmail.com','9859',0,'WORKER','+923076452378','4210132323232','438267d774d5abd60c7545544d26f191f407da25',1,'100392530859786250','2023-07-10 10:11:31'),('100392530859786282','2023-07-12 02:02:20','2023-07-26 17:08:22','Daniyal','Aamir','daniyal.amir110@gmail.com',NULL,1,'DONOR','+923042868395','4210183876527','9da390506134d0bfbf00ca43e12d25342c968624',1,NULL,NULL),('100392530859786285','2023-07-12 09:07:32',NULL,'Hannan','Ashraf','Hannan@test.com','3868',0,'DONOR','+923045868286','4210156896325','c4977c27ca021c8c8e6bd4d022a5ca9d9ee66bd0',1,NULL,'2023-07-12 09:07:32'),('100402492583444480','2023-07-16 06:52:10','2023-07-24 12:49:53','Saad','Ashraf','saad@test.com','5809',0,'WORKER','+923045796562','421018754321564','37483bf780aa68fbb00b20e5f2dbef28f07d48f6',1,'100392530859786250','2023-07-24 12:49:53'),('100402492583444491','2023-07-16 07:08:11',NULL,'Hannan','Ashraf','hannan1@test.com','6678',0,'WORKER','+923181245345','4210165386509','dc9d9f9e46afedb291882d76cfe06c687fc278b3',1,'100392530859786250','2023-07-16 07:08:11'),('100402492583444500','2023-07-18 21:03:58',NULL,'Hamza','Hassan','hamzahassan@gmail.com','8259',0,'DONOR','+923458765425','4210157845236','d55bdbcfd025baa67249f976d64dfe31a84d7f89',1,NULL,'2023-07-18 21:03:58'),('100402492583444504','2023-07-19 06:13:13',NULL,'Hamza','Ahmed','hamzaahmed@gmail.com','9374',0,'WORKER','+923435876549','4210185769532','6e91f581d5e6f8780dfe6f7ec98aee2b62507980',1,'100392530859786250','2023-07-19 06:13:13'),('100402492583444506','2023-07-19 06:16:15',NULL,'Maham','Aamir','mahamamir842@gmail.com','5962',0,'DONOR','+923458565896','4210156854236','e7c6c5cc4690126532a4d44cfa8660fd5fda0180',1,NULL,'2023-07-19 06:16:15'),('100402492583444513','2023-07-22 19:38:42',NULL,'Aamir','G. Nabi','d79437206@gmail.com','7521',0,'DONOR','+923191296169','4210126996505','f5ba40df24ec63263be31b8cd012de6eb3b0e914',1,NULL,'2023-07-22 19:38:42'),('100402492583444527','2023-07-26 12:10:23',NULL,'Aaliyan','Aamir','aaliyanaamir110@gmail.com','2411',0,'DONOR','+923009223846','42101587694586','87af76aad8672b4ad2382a8c52ed2d99c7e5cd46',1,NULL,'2023-07-26 12:10:23');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `user_BEFORE_INSERT` BEFORE INSERT ON `user` FOR EACH ROW BEGIN
	SET NEW.id = GENERATE_ID();
    SET NEW.createdAt = CURRENT_TIMESTAMP();
    
    IF (NOT VALIDATE_CNIC(NEW.cnic))
    THEN 
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid CNIC';
    END IF;
    
    IF ((NEW.email IS NOT NULL) AND (NOT VALIDATE_EMAIL(NEW.email)))
    THEN 
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid email';
    END IF;
    
    IF (NOT VALIDATE_PHONE(NEW.phone))
    THEN 
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid phone';
    END IF;
    
    IF (NOT VALIDATE_PASSWORD(NEW.password))
    THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Weak password';
	END IF;
    
    IF (NOT (NEW.role = "WORKER"))
    THEN
		SET NEW.areaId = NULL;
        SET NEW.assignedAt = CURRENT_TIMESTAMP();
	ELSE
		SET NEW.assignedAt = CURRENT_TIMESTAMP();
	END IF;
    
    SET NEW.password = HASH_PASSWORD(NEW.password);
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `user_BEFORE_UPDATE` BEFORE UPDATE ON `user` FOR EACH ROW BEGIN
	SET NEW.updatedAt = CURRENT_TIMESTAMP();
    
    IF ((NOT NEW.password = OLD.password) AND (NOT VALIDATE_PASSWORD(NEW.password)))
    THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Weak password';
	END IF;
    
    SET NEW.password = HASH_PASSWORD(NEW.password);
    
    IF ((NEW.email != OLD.email) AND (NOT VALIDATE_EMAIL(NEW.email)))
    THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid email';
	END IF;
    
    IF ((NOT NEW.phone = OLD.phone) AND (NOT VALIDATE_PHONE(NEW.phone)))
    THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid phone';
	END IF;
    
    -- SET NEW.role = OLD.role;
    
    IF (NOT (NEW.role = "WORKER"))
    THEN
		SET NEW.areaId = NULL;
        SET NEW.assignedAt = NULL;
	ELSE
		SET NEW.assignedAt = CURRENT_TIMESTAMP();
	END IF;
    
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Temporary view structure for view `user_data`
--

DROP TABLE IF EXISTS `user_data`;
/*!50001 DROP VIEW IF EXISTS `user_data`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `user_data` AS SELECT 
 1 AS `id`,
 1 AS `firstName`,
 1 AS `lastName`,
 1 AS `email`,
 1 AS `emailVerified`,
 1 AS `role`,
 1 AS `phone`,
 1 AS `cnic`,
 1 AS `active`,
 1 AS `createdAt`,
 1 AS `updatedAt`,
 1 AS `areaId`,
 1 AS `assignedAt`*/;
SET character_set_client = @saved_cs_client;

--
-- Dumping events for database 'zakat_app_db'
--

--
-- Dumping routines for database 'zakat_app_db'
--
/*!50003 DROP FUNCTION IF EXISTS `GENERATE_ID` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `GENERATE_ID`() RETURNS char(32) CHARSET utf8mb4
BEGIN
	SET @id := UUID_SHORT();
RETURN @id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `HASH_PASSWORD` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `HASH_PASSWORD`(
	plaintext TEXT
) RETURNS varchar(256) CHARSET utf8mb4
BEGIN
	SET @hashPassword = SHA1(UNHEX(SHA1(plaintext)));
RETURN @hashPassword;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `VALIDATE_CNIC` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `VALIDATE_CNIC`(
	cnic VARCHAR(45)
) RETURNS tinyint
BEGIN
	SET @isValid := REGEXP_LIKE(cnic, "^([0-9]{5})([0-9]{7})([0-9]{1})+");
RETURN @isValid;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `VALIDATE_EMAIL` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `VALIDATE_EMAIL`(
	email VARCHAR(256)
) RETURNS tinyint
BEGIN
	SET @isValid := REGEXP_LIKE(email, "^[a-z0-9](\.?[a-z0-9_-]){0,}@[a-z0-9-]+\.([a-z]{1,6}\.)?[a-z]{2,6}$");
RETURN @isValid;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `VALIDATE_PASSWORD` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `VALIDATE_PASSWORD`(
	password VARCHAR(256)
) RETURNS int
BEGIN
	SET @isValid := REGEXP_LIKE(password, "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,20}$");
RETURN @isValid;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `VALIDATE_PHONE` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `VALIDATE_PHONE`(
	phone VARCHAR(45)
) RETURNS int
BEGIN
	SET @isValid := REGEXP_LIKE(phone, "^\\+92((30|31|32|33|34)[0-9]{1}|355|364)[0-9]{7}$");
RETURN @isValid;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `VERIFY_ROLE` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `VERIFY_ROLE`(
	p_id CHAR(32),
    p_role ENUM("GENERAL_SECRETARY", "OFFICE_SECRETARY", "CHAIRPERSON", "WORKER", "DONOR")
) RETURNS tinyint
BEGIN
	SET @isVerified := 0;
    SELECT 1
    FROM user
    WHERE role = p_role
    LIMIT 1
    INTO @isVerified;
RETURN @isVerified;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ACCEPT_PENDING_DONATION` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `ACCEPT_PENDING_DONATION`(
	p_donationId CHAR(32),
    p_workerId CHAR(32)
)
BEGIN
	UPDATE donation
    SET status = "ACCEPTED", acceptedAt = CURRENT_TIMESTAMP(), workerId = p_workerId
    WHERE id = p_donationId
    AND status = "PENDING";
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ADD_NEW_COLLECTION` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `ADD_NEW_COLLECTION`(
	IN p_donorId CHAR(32),
    IN p_areaId CHAR(32),
    IN p_workerId CHAR(32),
    IN p_amount FLOAT,
    IN p_address VARCHAR(256)
)
BEGIN
	IF (NOT VERIFY_ROLE(p_donorId, "DONOR"))
    THEN
		SIGNAL SQLSTATE "45000" SET MESSAGE_TEXT = "Donor not found";
	END IF;
    
	INSERT INTO donation(donorId, areaId, workerId, amount, address, status, collectedAt)
    VALUES(p_donorId, p_areaId, p_workerId, p_amount, p_address, "COLLECTED", CURRENT_TIMESTAMP());
    
    SELECT id AS donationId 
    FROM donation 
    WHERE donorId = p_donorId 
    AND areaId = p_areaId 
    AND workerId = p_workerId
    ORDER BY createdAt DESC
    LIMIT 1;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ADD_PENDING_DONATION` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `ADD_PENDING_DONATION`(
	IN p_donorId CHAR(32),
    IN p_areaId CHAR(32),
    IN p_amount FLOAT,
    IN p_address VARCHAR(256)
)
BEGIN
	IF (NOT VERIFY_ROLE(p_donorId, "DONOR"))
    THEN
		SIGNAL SQLSTATE "45000" SET MESSAGE_TEXT = "Donor not found";
	END IF;
    
	INSERT INTO donation(donorId, areaId, amount, address, status)
    VALUES(p_donorId, p_areaId, p_amount, p_address, "PENDING");
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ADD_PENDING_DONATION_UNREGISTERED` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `ADD_PENDING_DONATION_UNREGISTERED`(
	IN p_refName VARCHAR(128),
    IN p_phone VARCHAR(45),
    IN p_address VARCHAR(256),
    IN p_amount FLOAT,
    IN p_areaId CHAR(32)
)
BEGIN
	INSERT INTO donation(refName, refPhone, address, amount, status, areaId)
	VALUES (p_refName, p_phone, p_address, p_amount, "PENDING", p_areaId);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `APPROVE_DONATION_REQUEST` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `APPROVE_DONATION_REQUEST`(
	IN p_donationId CHAR(32)
)
BEGIN
	UPDATE donation
    SET status = "PENDING", approvedAt = CURRENT_TIMESTAMP()
    WHERE id = p_donationId
    AND status = "REQUESTED";
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ASSIGN_AREA_TO_CHAIRPERSON` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `ASSIGN_AREA_TO_CHAIRPERSON`(
	p_areaId CHAR(32),
    p_chairpersonId CHAR(32)
)
BEGIN
	UPDATE area 
SET 
    chairpersonId = p_chairpersonId,
    assignedAt = CURRENT_TIMESTAMP()
WHERE
    id = p_areaId
	AND active = TRUE;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `CHANGE_AREA_NAME` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `CHANGE_AREA_NAME`(
	p_id VARCHAR(32),
    p_areaName VARCHAR(256)
)
BEGIN
	UPDATE area
    SET areaName = p_areaName
    WHERE id = p_id AND active = TRUE AND areaName != p_areaName;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `CHANGE_EMAIL` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `CHANGE_EMAIL`(
	IN p_id CHAR(32),
    IN p_email VARCHAR(256),
    IN p_emailOtp CHAR(4)
)
BEGIN
	UPDATE user
	SET 
		email = p_email, 
        emailVerified = FALSE,
        emailOtp = p_emailOtp
    WHERE id = p_id AND active = TRUE AND (email != p_email OR email IS NULL);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `CHANGE_PASSWORD` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `CHANGE_PASSWORD`(
	p_id CHAR(32),
    p_password VARCHAR(256),
    p_newPassword VARCHAR(256)
)
BEGIN
	UPDATE user 
    SET password = p_newPassword 
    WHERE id = p_id 
    AND active = TRUE
    AND password = HASH_PASSWORD(p_password);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `CHANGE_PHONE` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `CHANGE_PHONE`(
	IN p_id CHAR(32),
    IN p_phone VARCHAR(45)
)
BEGIN
	UPDATE user
    SET phone = p_phone
    WHERE id = p_id AND active = TRUE AND phone != p_phone;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `COLLECT_ACCEPTED_DONATION` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `COLLECT_ACCEPTED_DONATION`(
	IN p_donationId CHAR(32)
)
BEGIN
	UPDATE donation
    SET status = "COLLECTED", collectedAt = CURRENT_TIMESTAMP()
    WHERE id = p_donationId
    AND status = "ACCEPTED";
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `CREATE_AREA` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `CREATE_AREA`(
	p_areaName VARCHAR(256)
)
BEGIN
	INSERT INTO area (areaName) VALUES (p_areaName);
    SELECT * FROM area WHERE areaName = p_areaName;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `CREATE_USER` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `CREATE_USER`(
	IN p_firstName VARCHAR(45),
    IN p_lastName VARCHAR(45),
    IN p_email VARCHAR(256),
    IN p_role ENUM("DONOR", "WORKER", "OFFICE_SECRETARY", "CHAIRPERSON", "GENERAL_SECRETARY"),
    IN p_phone VARCHAR(45),
    IN p_cnic VARCHAR(45),
    IN p_password VARCHAR(256),
    IN p_emailOtp VARCHAR(4)
)
BEGIN
	INSERT INTO `user` (`firstName`, `lastName`, `email`, `role`, `phone`, `cnic`, `password`, `emailOtp`) VALUES (p_firstName, p_lastName, p_email, p_role, p_phone, p_cnic, p_password, p_emailOtp);
    SELECT * FROM user_data WHERE cnic = p_cnic;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `CREATE_WORKER` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `CREATE_WORKER`(
	IN p_chairpersonId CHAR(32),
	IN p_firstName VARCHAR(45),
    IN p_lastName VARCHAR(45),
    IN p_email VARCHAR(256),
    IN p_phone VARCHAR(45),
    IN p_cnic VARCHAR(45),
    IN p_password VARCHAR(256),
    IN p_emailOtp VARCHAR(4)
)
BEGIN
	SET @areaId = NULL;
    SELECT id FROM area WHERE chairpersonId = p_chairpersonId LIMIT 1 INTO @areaId;
    IF (@areaId IS NULL)
    THEN
		SIGNAL SQLSTATE "45000" SET MESSAGE_TEXT = "You don't have an area assigned";
	END IF;
	INSERT INTO `user` (`firstName`, `lastName`, `role`, `email`, `phone`, `cnic`, `password`, `emailOtp`, `areaId`, `assignedAt`) 
    VALUES (p_firstName, p_lastName, "WORKER", p_email, p_phone, p_cnic, p_password, p_emailOtp, @areaId, CURRENT_TIMESTAMP());
    SELECT * FROM user_data WHERE cnic = p_cnic;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `DELETE_AREA` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `DELETE_AREA`(
	p_id CHAR(32)
)
BEGIN
	CALL UNASSIGN_AREA(p_id);
	UPDATE area
    SET active = FALSE
    WHERE id = p_id AND active = TRUE;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `DELETE_WORKER` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `DELETE_WORKER`(
	p_chairpersonId CHAR(32),
    p_workerId CHAR(32)
)
BEGIN
SET @areaId := NULL;
SELECT 
    id
FROM
    area
WHERE
    role = 'CHAIRPERSON'
        AND chairpersonId = p_chairpersonId INTO @areaId;
IF (@areaId IS NULL)
THEN
	SIGNAL SQLSTATE "45000" SET MESSAGE_TEXT = "Chairperson not assigned to any area";
END IF;
UPDATE user 
SET 
    active = FALSE,
    areaId = NULL
WHERE
    id = p_workerId AND areaId = @areaId;
SELECT 
    CASE
        WHEN ROW_COUNT() > 0 THEN 1
        ELSE 0
    END AS updated;
    IF (NOT updated)
    THEN
		SIGNAL SQLSTATE "45000" SET MESSAGE_TEXT = "Worker not found in chairperson's area";
	END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `DONOR_DONATION_REQUEST` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `DONOR_DONATION_REQUEST`(
	IN p_donorId CHAR(32),
    IN p_areaId CHAR(32),
    IN p_amount FLOAT,
    IN p_address VARCHAR(256)
)
BEGIN
	IF (NOT VERIFY_ROLE(p_donorId, "DONOR"))
    THEN
		SIGNAL SQLSTATE "45000" SET MESSAGE_TEXT = "Donor not found";
	END IF;
    
	INSERT INTO donation(donorId, areaId, amount, address, status, requestedAt)
    VALUES(p_donorId, p_areaId, p_amount, p_address, "REQUESTED", CURRENT_TIMESTAMP());
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `REMOVE_EMAIL` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `REMOVE_EMAIL`(
	IN p_id CHAR(32)
)
BEGIN
	UPDATE user
    SET email = NULL, emailVerified = FALSE, emailOtp = NULL
    WHERE id = p_id AND active = TRUE AND email IS NOT NULL;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `RESET_PASSWORD` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `RESET_PASSWORD`(
	credential CHAR(32),
    p_password VARCHAR(256)
)
BEGIN
	UPDATE user SET password = p_password WHERE (
		email = credential OR phone = credential OR cnic = credential
    ) AND active = TRUE;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `UNASSIGN_AREA_FROM_CHAIRPERSON` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `UNASSIGN_AREA_FROM_CHAIRPERSON`(
	p_areaId CHAR(32)
)
BEGIN
	UPDATE area
    SET chairpersonId = NULL, assignedAt = NULL
    WHERE id = p_areaId AND chairpersonId IS NOT NULL;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `VERIFY_CREDENTIALS` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `VERIFY_CREDENTIALS`(
	IN credential VARCHAR(256),
    IN p_password VARCHAR (45),
    IN platform ENUM ("WEB", "MOBILE")
)
BEGIN
	SET @isMobile = (platform = "MOBILE");
    SET @isWeb = (platform = "WEB");
	SELECT 
    id,
    firstName,
    lastName,
    email,
    emailVerified,
    active,
    role,
    phone,
    cnic,
    createdAt,
    updatedAt
FROM
    user
WHERE
    ((role IN ('CHAIRPERSON' , 'WORKER', 'DONOR')
        AND @isMobile)
        OR (role IN ('GENERAL_SECRETARY' , 'OFFICE_SECRETARY')
        AND @isWeb))
        AND (phone = credential OR LOWER(email) = LOWER(credential)
        OR cnic = credential)
        AND password = HASH_PASSWORD(p_password);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `VERIFY_EMAIL` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `VERIFY_EMAIL`(
	p_id CHAR(32),
    p_emailOtp VARCHAR(4)
)
BEGIN
	UPDATE user 
    SET emailVerified = 1, emailOtp = NULL
	WHERE id = p_id 
    AND emailOtp = p_emailOtp 
    AND emailVerified = 0;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Final view structure for view `accepted_donations`
--

/*!50001 DROP VIEW IF EXISTS `accepted_donations`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `accepted_donations` AS select `d`.`id` AS `id`,`d`.`amount` AS `amount`,`d`.`address` AS `address`,`d`.`status` AS `status`,`d`.`donorId` AS `donorId`,`d`.`workerId` AS `workerId`,`d`.`refName` AS `refName`,`d`.`refPhone` AS `refPhone`,`d`.`areaId` AS `areaId`,`d`.`createdAt` AS `createdAt`,`d`.`updatedAt` AS `updatedAt`,`d`.`requestedAt` AS `requestedAt`,`d`.`approvedAt` AS `approvedAt`,`d`.`acceptedAt` AS `acceptedAt`,`u`.`firstName` AS `firstName`,`u`.`lastName` AS `lastName`,`u`.`email` AS `email`,`u`.`phone` AS `phone`,`u`.`cnic` AS `cnic`,`u`.`active` AS `active` from (`donation` `d` left join `user_data` `u` on((`u`.`id` = `d`.`donorId`))) where (`d`.`status` = 'ACCEPTED') */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `active_areas`
--

/*!50001 DROP VIEW IF EXISTS `active_areas`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `active_areas` AS select `area`.`id` AS `id`,`area`.`createdAt` AS `createdAt`,`area`.`updatedAt` AS `updatedAt`,`area`.`areaName` AS `areaName`,`area`.`chairpersonId` AS `chairpersonId`,`area`.`active` AS `active`,`area`.`assignedAt` AS `assignedAt` from `area` where (`area`.`active` = true) order by `area`.`areaName` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `all_areas`
--

/*!50001 DROP VIEW IF EXISTS `all_areas`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `all_areas` AS select `area`.`id` AS `id`,`area`.`createdAt` AS `createdAt`,`area`.`updatedAt` AS `updatedAt`,`area`.`areaName` AS `areaName`,`area`.`chairpersonId` AS `chairpersonId`,`area`.`active` AS `active`,`area`.`assignedAt` AS `assignedAt` from `area` order by `area`.`areaName` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `area_with_chairperson`
--

/*!50001 DROP VIEW IF EXISTS `area_with_chairperson`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `area_with_chairperson` AS select `a`.`id` AS `id`,`a`.`createdAt` AS `createdAt`,`a`.`updatedAt` AS `updatedAt`,`a`.`areaName` AS `areaName`,`a`.`chairpersonId` AS `chairpersonId`,`a`.`active` AS `active`,`a`.`assignedAt` AS `assignedAt`,concat(`ch`.`firstName`,' ',`ch`.`lastName`) AS `chairpersonName`,`ch`.`email` AS `chairpersonEmail`,`ch`.`phone` AS `chairpersonPhone` from (`area` `a` left join `user_data` `ch` on((`a`.`chairpersonId` = `ch`.`id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `chairperson_data`
--

/*!50001 DROP VIEW IF EXISTS `chairperson_data`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `chairperson_data` AS select `c`.`id` AS `id`,`c`.`firstName` AS `firstName`,`c`.`lastName` AS `lastName`,`c`.`email` AS `email`,`c`.`emailVerified` AS `emailVerified`,`c`.`role` AS `role`,`c`.`phone` AS `phone`,`c`.`cnic` AS `cnic`,`c`.`active` AS `active`,`c`.`createdAt` AS `createdAt`,`c`.`updatedAt` AS `updatedAt`,`a`.`id` AS `areaId`,`a`.`createdAt` AS `areaCreatedAt`,`a`.`updatedAt` AS `areaUpdatedAt`,`a`.`areaName` AS `areaName`,`a`.`assignedAt` AS `areaAssignedAt` from (`user_data` `c` left join `area` `a` on((`c`.`id` = `a`.`chairpersonId`))) where (`c`.`role` = 'CHAIRPERSON') */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `collected_donations`
--

/*!50001 DROP VIEW IF EXISTS `collected_donations`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `collected_donations` AS select `d`.`id` AS `id`,`d`.`amount` AS `amount`,`d`.`address` AS `address`,`d`.`status` AS `status`,`d`.`donorId` AS `donorId`,`d`.`workerId` AS `workerId`,`d`.`refName` AS `refName`,`d`.`refPhone` AS `refPhone`,`d`.`areaId` AS `areaId`,`d`.`createdAt` AS `createdAt`,`d`.`updatedAt` AS `updatedAt`,`d`.`requestedAt` AS `requestedAt`,`d`.`approvedAt` AS `approvedAt`,`d`.`acceptedAt` AS `acceptedAt`,`d`.`collectedAt` AS `collectedAt`,`u`.`firstName` AS `firstName`,`u`.`lastName` AS `lastName`,`u`.`email` AS `email`,`u`.`phone` AS `phone`,`u`.`cnic` AS `cnic`,`u`.`active` AS `active` from (`donation` `d` left join `user_data` `u` on((`u`.`id` = `d`.`donorId`))) where (`d`.`status` = 'COLLECTED') */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `donation_info`
--

/*!50001 DROP VIEW IF EXISTS `donation_info`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `donation_info` AS select `d`.`id` AS `id`,`d`.`amount` AS `amount`,`d`.`address` AS `address`,`d`.`status` AS `status`,`d`.`refName` AS `refName`,`d`.`refPhone` AS `refPhone`,`d`.`donorId` AS `donorId`,`d`.`workerId` AS `workerId`,`d`.`areaId` AS `areaId`,`d`.`createdAt` AS `createdAt`,`d`.`updatedAt` AS `updatedAt`,`d`.`requestedAt` AS `requestedAt`,`d`.`approvedAt` AS `approvedAt`,`d`.`acceptedAt` AS `acceptedAt`,`d`.`collectedAt` AS `collectedAt`,`a`.`areaName` AS `areaName`,`a`.`chairpersonId` AS `chairpersonId`,`a`.`active` AS `active`,`a`.`assignedAt` AS `assignedAt`,concat(`c`.`firstName`,' ',`c`.`lastName`) AS `chairpersonName`,`c`.`phone` AS `chairpersonPhone`,`c`.`cnic` AS `chairpersonCnic`,`c`.`email` AS `chairpersonEmail`,concat(`dn`.`firstName`,' ',`dn`.`lastName`) AS `donorName`,`dn`.`phone` AS `donorPhone`,`dn`.`cnic` AS `donorCnic`,`dn`.`email` AS `donorEmail`,concat(`w`.`firstName`,' ',`w`.`lastName`) AS `workerName`,`w`.`phone` AS `workerPhone`,`w`.`cnic` AS `workerCnic`,`w`.`email` AS `workerEmail` from (((((`donation` `d` left join `area` `a` on((`a`.`id` = `d`.`areaId`))) left join `user_data` `c` on((`c`.`id` = `a`.`chairpersonId`))) left join `user_data` `u` on((`u`.`id` = `d`.`donorId`))) left join `user_data` `w` on((`w`.`id` = `d`.`workerId`))) left join `user_data` `dn` on((`dn`.`id` = `d`.`donorId`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `donor_history`
--

/*!50001 DROP VIEW IF EXISTS `donor_history`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `donor_history` AS select `d`.`id` AS `id`,`d`.`amount` AS `amount`,`d`.`address` AS `address`,`d`.`status` AS `status`,`d`.`workerId` AS `workerId`,`d`.`donorId` AS `donorId`,`d`.`areaId` AS `areaId`,`d`.`createdAt` AS `createdAt`,`d`.`updatedAt` AS `updatedAt`,`d`.`requestedAt` AS `requestedAt`,`d`.`approvedAt` AS `approvedAt`,`d`.`acceptedAt` AS `acceptedAt`,`u`.`firstName` AS `workerFirstName`,`u`.`lastName` AS `workerLastName`,`u`.`email` AS `workerEmail`,`u`.`phone` AS `phone`,`a`.`areaName` AS `areaName` from ((`donation` `d` left join `user_data` `u` on((`u`.`id` = `d`.`id`))) left join `area` `a` on((`a`.`id` = `d`.`areaId`))) where (`d`.`status` = 'COLLECTED') */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `donor_requests`
--

/*!50001 DROP VIEW IF EXISTS `donor_requests`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `donor_requests` AS select `d`.`id` AS `id`,`d`.`amount` AS `amount`,`d`.`address` AS `address`,`d`.`status` AS `status`,`d`.`workerId` AS `workerId`,`d`.`donorId` AS `donorId`,`d`.`areaId` AS `areaId`,`d`.`createdAt` AS `createdAt`,`d`.`updatedAt` AS `updatedAt`,`d`.`requestedAt` AS `requestedAt`,`d`.`approvedAt` AS `approvedAt`,`d`.`acceptedAt` AS `acceptedAt`,`u`.`firstName` AS `workerFirstName`,`u`.`lastName` AS `workerLastName`,`u`.`email` AS `workerEmail`,`u`.`phone` AS `phone`,`a`.`areaName` AS `areaName` from ((`donation` `d` left join `user_data` `u` on((`u`.`id` = `d`.`id`))) left join `area` `a` on((`a`.`id` = `d`.`areaId`))) where (`d`.`status` <> 'COLLECTED') */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `pending_donations`
--

/*!50001 DROP VIEW IF EXISTS `pending_donations`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `pending_donations` AS select `d`.`id` AS `id`,`d`.`amount` AS `amount`,`d`.`address` AS `address`,`d`.`status` AS `status`,`d`.`donorId` AS `donorId`,`d`.`refName` AS `refName`,`d`.`refPhone` AS `refPhone`,`d`.`areaId` AS `areaId`,`d`.`createdAt` AS `createdAt`,`d`.`updatedAt` AS `updatedAt`,`d`.`requestedAt` AS `requestedAt`,`d`.`approvedAt` AS `approvedAt`,`u`.`firstName` AS `firstName`,`u`.`lastName` AS `lastName`,`u`.`email` AS `email`,`u`.`phone` AS `phone`,`u`.`cnic` AS `cnic`,`u`.`active` AS `active` from (`donation` `d` left join `user_data` `u` on((`u`.`id` = `d`.`donorId`))) where (`d`.`status` = 'PENDING') */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `requested_donations`
--

/*!50001 DROP VIEW IF EXISTS `requested_donations`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `requested_donations` AS select `d`.`id` AS `id`,`d`.`amount` AS `amount`,`d`.`address` AS `address`,`d`.`status` AS `status`,`d`.`donorId` AS `donorId`,`d`.`areaId` AS `areaId`,`d`.`createdAt` AS `createdAt`,`d`.`updatedAt` AS `updatedAt`,`d`.`requestedAt` AS `requestedAt`,`u`.`firstName` AS `firstName`,`u`.`lastName` AS `lastName`,`u`.`email` AS `email`,`u`.`phone` AS `phone`,`u`.`cnic` AS `cnic`,`u`.`active` AS `active` from (`donation` `d` join `user_data` `u` on((`u`.`id` = `d`.`donorId`))) where (`d`.`status` = 'REQUESTED') */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `user_data`
--

/*!50001 DROP VIEW IF EXISTS `user_data`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `user_data` AS select `user`.`id` AS `id`,`user`.`firstName` AS `firstName`,`user`.`lastName` AS `lastName`,`user`.`email` AS `email`,`user`.`emailVerified` AS `emailVerified`,`user`.`role` AS `role`,`user`.`phone` AS `phone`,`user`.`cnic` AS `cnic`,`user`.`active` AS `active`,`user`.`createdAt` AS `createdAt`,`user`.`updatedAt` AS `updatedAt`,`user`.`areaId` AS `areaId`,`user`.`assignedAt` AS `assignedAt` from `user` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-07-26 23:18:34
