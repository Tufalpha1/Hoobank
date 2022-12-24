-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: bank
-- ------------------------------------------------------
-- Server version	8.0.30

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
-- Table structure for table `accounts`
--

DROP TABLE IF EXISTS `accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accounts` (
  `account_no` double NOT NULL AUTO_INCREMENT,
  `account_status` varchar(45) DEFAULT NULL,
  `account_type` varchar(45) DEFAULT NULL,
  `customer_id` int DEFAULT NULL,
  `branch_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`account_no`),
  KEY `customer_id` (`customer_id`),
  KEY `accounts_ibfk_3` (`branch_id`),
  CONSTRAINT `accounts_ibfk_3` FOREIGN KEY (`branch_id`) REFERENCES `branch` (`ID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts`
--

LOCK TABLES `accounts` WRITE;
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;
INSERT INTO `accounts` VALUES (2,'active','savings',5,2,'2022-12-22 13:12:53'),(3,'active','current',6,3,'2022-12-17 15:01:43'),(4,'active','savings',7,1,'2022-12-22 15:06:37'),(5,'active','current',8,2,'2022-12-08 15:09:30'),(6,'active','savings',9,3,'2022-12-01 15:12:22'),(7,'active','current',10,2,'2022-12-23 04:33:52');
/*!40000 ALTER TABLE `accounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `branch`
--

DROP TABLE IF EXISTS `branch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `branch` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `phone_no` varchar(12) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `phone_no` (`phone_no`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `branch`
--

LOCK TABLES `branch` WRITE;
/*!40000 ALTER TABLE `branch` DISABLE KEYS */;
INSERT INTO `branch` VALUES (1,'paris_branch','paris','03370443869'),(2,'london_branch','london','03025099546'),(3,'newyork_branch','new york','03345653443');
/*!40000 ALTER TABLE `branch` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customers` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `name` char(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phone_no` varchar(12) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `branch_id` int DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `phone_no` (`phone_no`),
  KEY `branch_id` (`branch_id`),
  CONSTRAINT `customers_ibfk_1` FOREIGN KEY (`branch_id`) REFERENCES `branch` (`ID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES (5,'zain','abq, NM','03025099546','zain@gmail.com',2),(6,'ali','austin, texas','39864371698','ali@gmail.com',3),(7,'mansoor','rwp, pk','09849834957','mansoor@gmail.com',1),(8,'qamar','isl, pk','12380013469','qamar@gmail.com',2),(9,'moiz','bwp, pk','01988238742','moiz@gmail.com',3),(11,'test','test, 123st','19824298365','test123@gmail.com',3),(15,'testuser','djgcvsdjhvcs','12873283479','test123@gmail.com',1);
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `login`
--

DROP TABLE IF EXISTS `login`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `login` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(128) DEFAULT NULL,
  `password` varchar(128) DEFAULT NULL,
  `isAdmin` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `login`
--

LOCK TABLES `login` WRITE;
/*!40000 ALTER TABLE `login` DISABLE KEYS */;
/*!40000 ALTER TABLE `login` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transactions`
--

DROP TABLE IF EXISTS `transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transactions` (
  `transaction_type` enum('physical','online','atm','loan') DEFAULT NULL,
  `time_stamp` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `account_no` double DEFAULT NULL,
  KEY `account_no` (`account_no`),
  CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`account_no`) REFERENCES `accounts` (`account_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactions`
--

LOCK TABLES `transactions` WRITE;
/*!40000 ALTER TABLE `transactions` DISABLE KEYS */;
INSERT INTO `transactions` VALUES ('physical','2022-12-22 13:20:25',2),('online','2022-12-22 13:20:25',2),('atm','2022-12-22 13:20:25',2),('physical','2022-12-22 18:27:27',3),('online','2022-12-22 18:27:27',3),('atm','2022-12-22 18:27:27',4),('online','2022-12-22 18:27:27',5),('physical','2022-12-22 18:27:27',5),('physical','2022-12-22 18:27:27',6),('atm','2022-12-22 18:27:27',6);
/*!40000 ALTER TABLE `transactions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-12-23 21:29:04
