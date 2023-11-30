-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 27, 2023 at 11:15 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vacationsdatabase`
--
CREATE DATABASE IF NOT EXISTS `vacationsdatabase` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `vacationsdatabase`;

-- --------------------------------------------------------

--
-- Table structure for table `followers`
--

CREATE TABLE `followers` (
  `userId` int(11) NOT NULL,
  `vacationId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `followers`
--

INSERT INTO `followers` (`userId`, `vacationId`) VALUES
(60, 9),
(60, 8),
(62, 2),
(62, 9),
(62, 10),
(62, 5),
(62, 3),
(60, 10),
(62, 2),
(62, 1),
(62, 8);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `firstName` varchar(30) NOT NULL,
  `lastName` varchar(30) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(256) NOT NULL,
  `role` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `firstName`, `lastName`, `email`, `password`, `role`) VALUES
(2, 'Bart', 'Greg', 'bartgreg@gmail.com', '', 'User'),
(4, 'Loren', 'Kore', 'lorenkore@gmail.com', 'dd6ff49baeb6802c954201a4216f690810451a9991247ebe7fd62556bc68218071c7e27de059fecde889215a9a5c17f30d8c87f03c339818fbaa61ca18cd756b', 'User'),
(5, 'moishe', 'ufnik', 'moishe@gmail.com', '274e2bff61a9b36a7fe11aa1c5dcf7107dc27416d2a7cd1d519f0e749193528699ea5e8f4e7b6cab358119cb119e6cfb91ab0ccd9647c19d3a74246eb3fbf43d', 'User'),
(6, 'Homer', 'simpson', 'homer@gmail.com', '209f3c0d92c5eebb187c4ffece2cdb64c43af3bd34f0f1f338a0e3921e052cbd46443f265e75cb667b32bb93696185a333b7d08390c1689ec7b72357521233a8', 'User'),
(59, 'Admin', 'halevy', 'Admin@gmail.com', '475594658ee267ed38042cd53243a6e8870a2e3f1f68b78b537cad8cddfd6d7ba924dfd617da21f10268e3d9938b196db8c8dc1a86cc578d999f9ac7b20a7e77', 'Admin'),
(60, 'haron', 'halevy', 'haron@gmail.com', '475594658ee267ed38042cd53243a6e8870a2e3f1f68b78b537cad8cddfd6d7ba924dfd617da21f10268e3d9938b196db8c8dc1a86cc578d999f9ac7b20a7e77', 'User'),
(62, 'marcos', 'rashpord', 'rashpord@gmail.com', '1858b86f3f3a647595ac7411f443c419bd55d211514e381fde7257c4261b784c2980407bccbe436f0a34fd3607e5ad94e1e35aa41944d1cfbcc71d8aa35e6607', 'User'),
(63, 'admin', '', 'admin@gmail.com', '1858b86f3f3a647595ac7411f443c419bd55d211514e381fde7257c4261b784c2980407bccbe436f0a34fd3607e5ad94e1e35aa41944d1cfbcc71d8aa35e6607', 'Admin'),
(64, 'hh', 'jj', 'john@gmail.com', '1858b86f3f3a647595ac7411f443c419bd55d211514e381fde7257c4261b784c2980407bccbe436f0a34fd3607e5ad94e1e35aa41944d1cfbcc71d8aa35e6607', 'User');

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `vacationId` int(11) NOT NULL,
  `destination` varchar(50) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `imageName` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`vacationId`, `destination`, `description`, `startDate`, `endDate`, `price`, `imageName`) VALUES
(1, 'Madrid', 'amazing city', '2023-01-21', '2023-01-25', '4000.00', 'f52f8afb-6e53-4f75-9b19-d362650115f9.jpg'),
(2, 'Athenes', 'Beautiful city, amazing expirience!', '2023-02-13', '2023-02-22', '500.00', '9cbc52d1-85ec-438a-b2bd-c000fe61bbeb.jpg'),
(3, 'Barcelona', 'amazing footbal!', '2023-06-17', '2023-06-24', '2000.00', '2991a523-4876-4960-a751-f531fd4fd71a.jpg'),
(5, 'Paris', 'amazing city!', '2023-06-17', '2023-06-24', '2000.00', '07f5bb89-a622-4edf-85c7-122534d56710.jpg'),
(6, 'Maldives', 'Amazing beaches\r\n', '2023-03-16', '2023-03-23', '4000.00', 'e971d3b1-356e-457d-9e76-f5ab6c1110ae.jpg'),
(7, 'Las Vegas', 'hotels and shows', '2023-02-12', '2023-02-21', '6000.00', 'd6ae7999-485d-40bc-a6f0-9f57d2390822.jpg'),
(8, 'New York', 'NBA games', '2023-01-21', '2023-01-25', '4000.00', '4acf8a35-6be7-4618-945e-2cabff5217b8.jpg'),
(9, 'Manchester', 'the best football in england', '2023-03-19', '2023-03-27', '3000.00', '20f06601-7a67-4b82-a42c-abdca422c183.jpg'),
(10, 'London', ' city, capital of the United Kingdom', '2023-03-20', '2023-03-28', '3000.00', 'c64de09c-fe58-4dbb-b36c-9f22e465b100.jpg'),
(11, 'Thailand', 'Whether you want to lounge in a shack on peaceful sandy shores or party all night by the sea', '2023-02-21', '2023-05-21', '3000.00', '81d44d75-dcad-44aa-a746-cc52b53cdc15.jpg'),
(13, 'Brazil', 'many beaches amazing', '2023-03-14', '2023-02-28', '1000.00', '42d24460-1992-4ee0-a7e9-1192e460bc6f.jpg'),
(14, 'Greece', 'Travel ideas, Events, guides, what to do, where to go in Greece', '2023-02-08', '2023-02-15', '6000.00', '3b5e2863-4659-4b49-a0ea-78fccbe99deb.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `followers`
--
ALTER TABLE `followers`
  ADD KEY `vacationId` (`vacationId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`vacationId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `vacationId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `followers`
--
ALTER TABLE `followers`
  ADD CONSTRAINT `followers_ibfk_1` FOREIGN KEY (`vacationId`) REFERENCES `vacations` (`vacationId`) ON DELETE CASCADE,
  ADD CONSTRAINT `followers_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
