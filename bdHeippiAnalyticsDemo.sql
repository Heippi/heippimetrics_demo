/*
SQLyog Enterprise - MySQL GUI v6.5
MySQL - 5.5.28 : Database - heippianalyticsdemo
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

create database if not exists `heippianalyticsdemo`;

USE `heippianalyticsdemo`;

/*Table structure for table `consumer_data` */

DROP TABLE IF EXISTS `consumer_data`;

CREATE TABLE `consumer_data` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `detection_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `lost_time` timestamp NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  KEY `FK_consumer_data_user` (`user_id`),
  CONSTRAINT `FK_consumer_data_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `consumer_data` */

/*Table structure for table `image_php` */

DROP TABLE IF EXISTS `image_php`;

CREATE TABLE `image_php` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `path_image` varchar(300) NOT NULL,
  `datetime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `processed` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_image_php_user` (`user_id`),
  CONSTRAINT `FK_image_php_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `image_php` */

/*Table structure for table `image_processed` */

DROP TABLE IF EXISTS `image_processed`;

CREATE TABLE `image_processed` (
  `id` int(11) NOT NULL,
  `image_php_id` int(11) NOT NULL,
  `path_image` varchar(100) DEFAULT NULL,
  `detections_number` int(11) DEFAULT NULL,
  `view` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_image_processed_image_php` (`image_php_id`),
  CONSTRAINT `FK_image_processed_image_php` FOREIGN KEY (`image_php_id`) REFERENCES `image_php` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `image_processed` */

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `email` varchar(200) NOT NULL,
  `name_user` varchar(100) DEFAULT NULL,
  `password` varchar(150) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `user` */

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
