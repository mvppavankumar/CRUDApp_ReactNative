-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 20, 2024 at 08:14 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `crudhybridapp`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_books`
--

CREATE TABLE `tbl_books` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `author` varchar(255) NOT NULL,
  `date_added` datetime NOT NULL,
  `email` varchar(255) NOT NULL,
  `added_by` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_books`
--

INSERT INTO `tbl_books` (`id`, `name`, `author`, `date_added`, `email`, `added_by`) VALUES
(3, 'Lord of the rings updated', 'John Ronald updated', '2023-11-05 17:17:00', 'designer6453@gmail.com updated', 'Naveed updated'),
(6, 'Rich dad poor dad', 'Robert Kiyosaki ', '2023-11-07 23:42:25', 'designer6453@gmail.com', 'Hammad'),
(8, 'Pride and prejudice ', 'Jane Austen', '2023-11-07 23:50:58', 'designer6453@gmail.com', 'Aaliyah '),
(9, '1984', 'George Owel', '2023-11-07 23:52:52', 'designer6453@gmail.com', 'Rida Maryam'),
(10, 'The Book Theif', 'Markus Zusak', '2023-11-07 23:54:49', 'designer6453@gmail.com', 'Easha'),
(11, 'The Catcher in the Rye', 'J.D Saliger', '2023-11-07 23:58:08', 'designer6453@gmail.com', 'Bilawal'),
(12, 'Spare', 'Jr Moehringer', '2023-11-08 21:12:10', 'designer6453@gmail.com', 'Robert'),
(13, 'When Breath Becomes Air', 'PAUL Kala ithi', '2023-11-08 21:18:52', 'designer6453@gmail.com', 'Robert'),
(17, 'Relentless ', 'Jenifer', '2023-11-08 20:45:50', 'designer6453@gmail.com', 'Aaliyah ');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_books`
--
ALTER TABLE `tbl_books`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_books`
--
ALTER TABLE `tbl_books`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
