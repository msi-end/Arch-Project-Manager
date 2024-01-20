-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jan 15, 2024 at 06:41 PM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ArchDB`
--

-- --------------------------------------------------------

--
-- Table structure for table `adminauth`
--

CREATE TABLE `adminauth` (
  `adm_id` int(11) NOT NULL,
  `name` varchar(80) DEFAULT NULL,
  `email` varchar(80) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` varchar(10) DEFAULT 'admin'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `adminauth`
--

INSERT INTO `adminauth` (`adm_id`, `name`, `email`, `password`, `role`) VALUES
(1, 'msi', 'aditya01377@gmail.com', '77ee3625f508f3051360327fb67668b2ba769f13f56599bb45a4a923bb850c49', 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `amount_split`
--

CREATE TABLE `amount_split` (
  `cid` int(11) NOT NULL,
  `splitvalue` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `amount_split`
--

INSERT INTO `amount_split` (`cid`, `splitvalue`) VALUES
(1, '3:3:6'),
(2, '4:4:4'),
(3, '');

-- --------------------------------------------------------

--
-- Table structure for table `deals`
--

CREATE TABLE `deals` (
  `id` bigint(20) NOT NULL,
  `deal_name` varchar(200) DEFAULT NULL,
  `reference_no` int(11) DEFAULT NULL,
  `contact` int(11) DEFAULT NULL,
  `agreement_amount` int(11) DEFAULT NULL,
  `work_name` varchar(300) DEFAULT NULL,
  `email` varchar(80) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `total_price` int(11) DEFAULT NULL,
  `split` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `deals`
--

INSERT INTO `deals` (`id`, `deal_name`, `reference_no`, `contact`, `agreement_amount`, `work_name`, `email`, `city`, `total_price`, `split`) VALUES
(3, 'Mintu Sharma', 1532, 7988516, 10000, 'New Project1', 'ciritav719@hrisland.com', 'jajori , nagoan ,Assam', 20000, '4:4:2'),
(4, 'Mintu Sharma', 1534, 777988, 10000, 'New Project1', 'gujilu.uhites@rungel.net', 'jajori , nagoan ,Assam', 20000, '4:4:2'),
(5, 'Mintu Sharma', 1533, 77798, 10000, 'New Project2', 'ciritav719@hrisland.com', 'jajori , nagoan ,Assam', 200000, '4:4:2'),
(6, 'Mintu Sharma', 1532, 7779, 10000, 'Lenovo A68', 'ciritav719@hrisland.com', 'jajori , nagoan ,Assam', 200000, '6:2:2');

-- --------------------------------------------------------

--
-- Table structure for table `empAttendance`
--

CREATE TABLE `empAttendance` (
  `January` char(1) DEFAULT NULL,
  `February` char(1) DEFAULT NULL,
  `March` char(1) DEFAULT NULL,
  `April` char(1) DEFAULT NULL,
  `May` char(1) DEFAULT NULL,
  `June` char(1) DEFAULT NULL,
  `July` char(1) DEFAULT NULL,
  `August` char(1) DEFAULT NULL,
  `September` char(1) DEFAULT NULL,
  `October` char(1) DEFAULT NULL,
  `November` char(1) DEFAULT NULL,
  `December` char(1) DEFAULT NULL,
  `id` int(11) NOT NULL,
  `empID` int(11) NOT NULL,
  `date` varchar(10) NOT NULL,
  `year` varchar(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `empAttendance`
--

INSERT INTO `empAttendance` (`January`, `February`, `March`, `April`, `May`, `June`, `July`, `August`, `September`, `October`, `November`, `December`, `id`, `empID`, `date`, `year`) VALUES
('P', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 1, '19', '2024');

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `em_id` int(11) NOT NULL,
  `name` varchar(80) DEFAULT NULL,
  `email` varchar(80) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `number` varchar(10) DEFAULT NULL,
  `lastLoginAt` datetime DEFAULT NULL,
  `lastLogoutAt` datetime DEFAULT NULL,
  `status` varchar(30) NOT NULL DEFAULT 'active',
  `job_role` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`em_id`, `name`, `email`, `password`, `number`, `lastLoginAt`, `lastLogoutAt`, `status`, `job_role`) VALUES
(1, 'msi updated', 'msis@gmail.com', 'b0a858af33fbccf6840afca4159ce84d9101f1086ee534a42031b9aae7dcb054', 'N/A', '2023-12-23 15:57:51', '2023-11-28 04:15:25', 'active', 'fuckers'),
(2, 'kankan 44', 'msis@gmail.comfgd', '77ee3625f508f3051360327fb67668b2ba769f13f56599bb45a4a923bb850c49', 'N/A', '2024-01-16 00:11:53', '2023-11-28 04:15:35', 'active', ''),
(3, 'mintu2', 'msis@gmail.comfgd2', '38e0f27db72420e16f65472b21821cf820351c96ae3c3451d4da3efb5df197f9', '', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'active', NULL),
(4, 'mintu3', 'msis@gmail.comfgd3', '38e0f27db72420e16f65472b21821cf820351c96ae3c3451d4da3efb5df197f9', '', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'active', NULL),
(5, 'pancha', 'msis@gmail.com', 'b0a858af33fbccf6840afca4159ce84d9101f1086ee534a42031b9aae7dcb054', NULL, '2023-12-23 15:57:51', NULL, 'active', NULL),
(7, 'Mintu Sharma', 'gujilu.uhites@rungel.net', 'b0a858af33fbccf6840afca4159ce84d9101f1086ee534a42031b9aae7dcb054', '07779', NULL, NULL, 'active', 'dfgvs'),
(8, 'Mintu Sharma 2', 'ciritav719@hrisland.com', 'b0a858af33fbccf6840afca4159ce84d9101f1086ee534a42031b9aae7dcb054', '077', NULL, NULL, 'active', 'dfgvs'),
(9, 'Mintu Sharma', 'ciritav719@hrisland.com', 'b0a858af33fbccf6840afca4159ce84d9101f1086ee534a42031b9aae7dcb054', '9885160', NULL, NULL, 'active', 'dfgvs'),
(10, 'Mintu Sharma7777', 'tya01377@gmail.com', 'b0a858af33fbccf6840afca4159ce84d9101f1086ee534a42031b9aae7dcb054', '0777', NULL, NULL, 'active', 'Bosss');

-- --------------------------------------------------------

--
-- Table structure for table `emp_task_notify`
--

CREATE TABLE `emp_task_notify` (
  `notid` bigint(20) NOT NULL,
  `emid` int(11) DEFAULT NULL,
  `task` varchar(70) DEFAULT NULL,
  `project` varchar(200) DEFAULT NULL,
  `dateofnotify` varchar(50) DEFAULT '0',
  `viewed` varchar(20) DEFAULT 'unread'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `expenses`
--

CREATE TABLE `expenses` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `remark` varchar(355) DEFAULT NULL,
  `amount` int(50) NOT NULL,
  `date` varchar(20) NOT NULL,
  `md_type` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `expenses`
--

INSERT INTO `expenses` (`id`, `title`, `remark`, `amount`, `date`, `md_type`) VALUES
(1, 'HIRING video editor', 'hiring video editor for editing videos', 2, '12/01/2024', 'cash'),
(2, 'HIRING Google editor ', 'hiring Google editor for editing videos', 18500, '12/01/2024', 'online'),
(3, 'test', '1.adfgdfg', 3, '14/01/2024', 'cash'),
(4, 'test', 'adfgdfg', 5003, '2024-01-14', 'cash'),
(5, 'post', 'okay', 5003, '12/02/2302', 'cash'),
(6, 'test', '1. okay\n 2. okay', 5003, '19/01/2024', 'online');

-- --------------------------------------------------------

--
-- Table structure for table `misc_project_employee`
--

CREATE TABLE `misc_project_employee` (
  `mpeid` int(11) NOT NULL,
  `mdeal_id` int(11) DEFAULT NULL,
  `mstask_id` int(11) DEFAULT NULL,
  `mpemid` int(11) DEFAULT NULL,
  `dateofassign` varchar(50) DEFAULT '0',
  `dateofremove` varchar(50) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `misc_project_employee`
--

INSERT INTO `misc_project_employee` (`mpeid`, `mdeal_id`, `mstask_id`, `mpemid`, `dateofassign`, `dateofremove`) VALUES
(1, 1, 12, 2, '19/01/2024', '0');

-- --------------------------------------------------------

--
-- Table structure for table `misc_project_finance`
--

CREATE TABLE `misc_project_finance` (
  `mfid` int(11) NOT NULL,
  `mdeal_id` int(11) NOT NULL,
  `totalamount` int(11) DEFAULT NULL,
  `task` int(11) NOT NULL,
  `amount_got` int(11) DEFAULT NULL,
  `dateofpay` varchar(80) DEFAULT '0',
  `modeofpay` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `misc_project_finance`
--

INSERT INTO `misc_project_finance` (`mfid`, `mdeal_id`, `totalamount`, `task`, `amount_got`, `dateofpay`, `modeofpay`) VALUES
(1, 1, 5535, 7, 5000, '12/12/24', 'cash'),
(2, 2, 10000, 7, 57500, '12/12/24', 'online'),
(3, 3, 20000, 1, 12, '0', 'online'),
(4, 4, 200000, 12, NULL, '0', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `misc_project_subtask`
--

CREATE TABLE `misc_project_subtask` (
  `mpstid` int(11) NOT NULL,
  `mdeal_id` int(11) DEFAULT NULL,
  `mstask_id` int(11) DEFAULT NULL,
  `mstask_status` varchar(50) DEFAULT 'not started',
  `dateofdeadline` varchar(50) DEFAULT '0',
  `dateofcomplete` varchar(50) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `misc_project_subtask`
--

INSERT INTO `misc_project_subtask` (`mpstid`, `mdeal_id`, `mstask_id`, `mstask_status`, `dateofdeadline`, `dateofcomplete`) VALUES
(1, 3, 1, 'not started', '30/09/2013', '0'),
(2, 4, 12, 'not started', '30/09/2013', '0');

-- --------------------------------------------------------

--
-- Table structure for table `mis_subtask`
--

CREATE TABLE `mis_subtask` (
  `msub_task_id` int(11) NOT NULL,
  `msub_task_name` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `mis_subtask`
--

INSERT INTO `mis_subtask` (`msub_task_id`, `msub_task_name`) VALUES
(1, '5msi4'),
(2, 'ADADF'),
(3, 'ADADF'),
(4, 'ADADF'),
(5, 'ADADF'),
(6, 'ADADF'),
(7, 'ADADF'),
(8, 'ADADF'),
(9, 'ADADF'),
(10, 'ADADF'),
(11, 'ADADF'),
(12, 'ADADF'),
(13, 'ADADF'),
(14, 'ADADF'),
(15, 'ADADF'),
(16, 'ADADF'),
(17, 'ADADF'),
(18, 'ADADF'),
(19, 'ADADF'),
(20, 'ADADF'),
(21, 'ADADF'),
(22, 'ADADF'),
(23, 'ADADF'),
(24, 'ADADF'),
(25, 'ADADF'),
(26, 'ADADF'),
(27, 'fuck'),
(28, 'asdfaf77');

-- --------------------------------------------------------

--
-- Table structure for table `normal_projects_finance`
--

CREATE TABLE `normal_projects_finance` (
  `fid` bigint(20) NOT NULL,
  `ndeal_id` bigint(20) NOT NULL,
  `totalamount` int(11) DEFAULT NULL,
  `task` int(11) DEFAULT NULL,
  `amount_got` int(11) DEFAULT 0,
  `dateofpay` varchar(50) DEFAULT NULL,
  `modeofpay` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `normal_projects_finance`
--

INSERT INTO `normal_projects_finance` (`fid`, `ndeal_id`, `totalamount`, `task`, `amount_got`, `dateofpay`, `modeofpay`) VALUES
(4, 4, 20000, 1, 0, NULL, NULL),
(5, 4, 20000, 2, 0, NULL, NULL),
(6, 4, 20000, 3, 0, NULL, NULL),
(7, 5, 200000, 1, 0, NULL, NULL),
(8, 5, 200000, 2, 0, NULL, NULL),
(9, 5, 200000, 3, 0, NULL, NULL),
(10, 6, 200000, 1, 0, NULL, NULL),
(11, 6, 200000, 2, 0, NULL, NULL),
(12, 6, 200000, 3, 0, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `normal_project_cat`
--

CREATE TABLE `normal_project_cat` (
  `npcid` int(11) NOT NULL,
  `ndeal_id` bigint(20) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `cat_status` varchar(50) DEFAULT 'pending',
  `project_status` varchar(60) DEFAULT 'pending',
  `dateofdeadline` varchar(80) DEFAULT '0',
  `dateofpostponed` varchar(80) DEFAULT '0',
  `dateofcomplete` varchar(50) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `normal_project_cat`
--

INSERT INTO `normal_project_cat` (`npcid`, `ndeal_id`, `category_id`, `cat_status`, `project_status`, `dateofdeadline`, `dateofpostponed`, `dateofcomplete`) VALUES
(10, 4, 1, 'Completed', 'completed', '25/09/2023', '0', '0'),
(11, 4, 2, 'Completed', 'pending', '25/09/2023', '0', '0'),
(12, 4, 3, 'Completed', 'pending', '25/09/2023', '0', '0'),
(13, 5, 1, 'Completed', 'pending', '25/09/2023', '0', '0'),
(14, 5, 2, 'Completed', 'pending', '25/09/2023', '0', '0'),
(15, 5, 3, 'Completed', 'pending', '25/09/2023', '0', '0'),
(16, 6, 1, 'pending', 'pending', '25/09/2023', '0', '0'),
(17, 6, 2, 'pending', 'pending', '25/09/2023', '0', '0'),
(18, 6, 3, 'pending', 'pending', '25/09/2023', '0', '0');

-- --------------------------------------------------------

--
-- Table structure for table `normal_project_employee`
--

CREATE TABLE `normal_project_employee` (
  `npeid` int(11) NOT NULL,
  `ndeal_id` bigint(20) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `emid` int(11) DEFAULT NULL,
  `dateofassign` varchar(50) DEFAULT '0',
  `dateofremove` varchar(50) DEFAULT '0',
  `npcid` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `normal_project_employee`
--

INSERT INTO `normal_project_employee` (`npeid`, `ndeal_id`, `category_id`, `emid`, `dateofassign`, `dateofremove`, `npcid`) VALUES
(63, 4, 1, 3, '20/02/2023', '0', 10),
(64, 4, 1, 4, '20/02/2023', '0', 10),
(65, 4, 1, 3, '20/02/2023', '0', 10),
(66, 4, 1, 4, '20/02/2023', '0', 10),
(67, 4, 2, 3, '20/02/2023', '0', 11),
(68, 4, 2, 4, '20/02/2023', '0', 11),
(69, 4, 3, 1, '20/02/2023', '0', 12),
(70, 4, 3, 2, '20/02/2023', '0', 12),
(71, 4, 3, 4, '20/02/2023', '0', 12),
(72, 5, 1, 3, '20/02/2023', '0', 13),
(73, 5, 1, 4, '20/02/2023', '0', 13),
(74, 5, 1, 5, '20/02/2023', '0', 13),
(75, 5, 2, 2, '20/02/2023', '0', 14),
(76, 5, 2, 3, '20/02/2023', '0', 14),
(77, 5, 2, 4, '20/02/2023', '0', 14),
(78, 5, 3, 2, '20/02/2023', '0', 15),
(79, 5, 3, 3, '20/02/2023', '0', 15),
(80, 6, 3, 4, '20/02/2023', '0', 16);

-- --------------------------------------------------------

--
-- Table structure for table `normal_project_subtask`
--

CREATE TABLE `normal_project_subtask` (
  `npstid` int(11) NOT NULL,
  `ndeal_id` bigint(20) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `stask_id` int(11) DEFAULT NULL,
  `stask_status` varchar(50) DEFAULT 'not started',
  `dateofcomplete` varchar(50) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `normal_project_subtask`
--

INSERT INTO `normal_project_subtask` (`npstid`, `ndeal_id`, `category_id`, `stask_id`, `stask_status`, `dateofcomplete`) VALUES
(1, 4, 1, 1, 'Completed', '0'),
(2, 4, 1, 6, 'not started', '0');

-- --------------------------------------------------------

--
-- Table structure for table `single_deal`
--

CREATE TABLE `single_deal` (
  `sdid` int(11) NOT NULL,
  `sdeal_name` varchar(200) DEFAULT NULL,
  `reference_no` int(11) DEFAULT NULL,
  `contact` int(11) DEFAULT NULL,
  `agreement_amount` int(11) DEFAULT NULL,
  `work_name` varchar(300) DEFAULT NULL,
  `email` varchar(80) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `total_price` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `single_deal`
--

INSERT INTO `single_deal` (`sdid`, `sdeal_name`, `reference_no`, `contact`, `agreement_amount`, `work_name`, `email`, `city`, `total_price`) VALUES
(1, 'create uml', 1532, 9401067, 5535, 'dfgadga', 'a@gmail.com', 'nagaon', 5535),
(2, 'creating diagram', 1532, 940106, 5535, 'jkdrjukdgd', 'a@gmail.com', 'nagaon', 5535),
(3, 'Mintu Sharma', 1533, 7779, 10000, 'Mintu Sharma', 'gujilu.uhites@rungel.net', 'jajori , nagoan ,Assam', 20000),
(4, 'Mintu Sharma', 1533, 77798, 10000, 'Mintu Sharma', 'kamal01sfgs377@gmail.com', 'jajori , nagoan ,Assam', 200000);

-- --------------------------------------------------------

--
-- Table structure for table `subtask`
--

CREATE TABLE `subtask` (
  `sub_task_id` int(11) NOT NULL,
  `task_id` int(11) DEFAULT NULL,
  `sub_task_name` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `subtask`
--

INSERT INTO `subtask` (`sub_task_id`, `task_id`, `sub_task_name`) VALUES
(1, NULL, '2arfgaf'),
(2, NULL, 'adfasfd'),
(3, NULL, 'asdfaf'),
(4, NULL, 'zxdvzv'),
(5, NULL, 'asdfaffd'),
(6, NULL, 'asdddddddddddd'),
(7, NULL, 'dfdf'),
(8, NULL, 'asdfasdf');

-- --------------------------------------------------------

--
-- Table structure for table `task`
--

CREATE TABLE `task` (
  `task_id` int(11) NOT NULL,
  `task_name` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `task`
--

INSERT INTO `task` (`task_id`, `task_name`) VALUES
(1, '3d modeling'),
(2, 'Structure'),
(3, 'Coding');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `adminauth`
--
ALTER TABLE `adminauth`
  ADD PRIMARY KEY (`adm_id`);

--
-- Indexes for table `amount_split`
--
ALTER TABLE `amount_split`
  ADD PRIMARY KEY (`cid`);

--
-- Indexes for table `deals`
--
ALTER TABLE `deals`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `empAttendance`
--
ALTER TABLE `empAttendance`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`em_id`);

--
-- Indexes for table `emp_task_notify`
--
ALTER TABLE `emp_task_notify`
  ADD PRIMARY KEY (`notid`),
  ADD KEY `emid` (`emid`);

--
-- Indexes for table `expenses`
--
ALTER TABLE `expenses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `misc_project_employee`
--
ALTER TABLE `misc_project_employee`
  ADD PRIMARY KEY (`mpeid`),
  ADD KEY `mdeal_id` (`mdeal_id`),
  ADD KEY `mstask_id` (`mstask_id`),
  ADD KEY `mpemid` (`mpemid`);

--
-- Indexes for table `misc_project_finance`
--
ALTER TABLE `misc_project_finance`
  ADD PRIMARY KEY (`mfid`),
  ADD KEY `mdeal_id` (`mdeal_id`),
  ADD KEY `task` (`task`);

--
-- Indexes for table `misc_project_subtask`
--
ALTER TABLE `misc_project_subtask`
  ADD PRIMARY KEY (`mpstid`),
  ADD KEY `mdeal_id` (`mdeal_id`),
  ADD KEY `mstask_id` (`mstask_id`);

--
-- Indexes for table `mis_subtask`
--
ALTER TABLE `mis_subtask`
  ADD PRIMARY KEY (`msub_task_id`);

--
-- Indexes for table `normal_projects_finance`
--
ALTER TABLE `normal_projects_finance`
  ADD PRIMARY KEY (`fid`),
  ADD KEY `ndeal_id` (`ndeal_id`),
  ADD KEY `task` (`task`);

--
-- Indexes for table `normal_project_cat`
--
ALTER TABLE `normal_project_cat`
  ADD PRIMARY KEY (`npcid`),
  ADD KEY `category_id` (`category_id`),
  ADD KEY `ndeal_id` (`ndeal_id`);

--
-- Indexes for table `normal_project_employee`
--
ALTER TABLE `normal_project_employee`
  ADD PRIMARY KEY (`npeid`),
  ADD KEY `ndeal_id` (`ndeal_id`),
  ADD KEY `category_id` (`category_id`),
  ADD KEY `emid` (`emid`);

--
-- Indexes for table `normal_project_subtask`
--
ALTER TABLE `normal_project_subtask`
  ADD PRIMARY KEY (`npstid`),
  ADD KEY `ndeal_id` (`ndeal_id`),
  ADD KEY `stask_id` (`stask_id`);

--
-- Indexes for table `single_deal`
--
ALTER TABLE `single_deal`
  ADD PRIMARY KEY (`sdid`);

--
-- Indexes for table `subtask`
--
ALTER TABLE `subtask`
  ADD PRIMARY KEY (`sub_task_id`),
  ADD KEY `task_id` (`task_id`);

--
-- Indexes for table `task`
--
ALTER TABLE `task`
  ADD PRIMARY KEY (`task_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `adminauth`
--
ALTER TABLE `adminauth`
  MODIFY `adm_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `amount_split`
--
ALTER TABLE `amount_split`
  MODIFY `cid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `deals`
--
ALTER TABLE `deals`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `empAttendance`
--
ALTER TABLE `empAttendance`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `employee`
--
ALTER TABLE `employee`
  MODIFY `em_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `emp_task_notify`
--
ALTER TABLE `emp_task_notify`
  MODIFY `notid` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- AUTO_INCREMENT for table `expenses`
--
ALTER TABLE `expenses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `misc_project_employee`
--
ALTER TABLE `misc_project_employee`
  MODIFY `mpeid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `misc_project_finance`
--
ALTER TABLE `misc_project_finance`
  MODIFY `mfid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `misc_project_subtask`
--
ALTER TABLE `misc_project_subtask`
  MODIFY `mpstid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `mis_subtask`
--
ALTER TABLE `mis_subtask`
  MODIFY `msub_task_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `normal_projects_finance`
--
ALTER TABLE `normal_projects_finance`
  MODIFY `fid` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `normal_project_cat`
--
ALTER TABLE `normal_project_cat`
  MODIFY `npcid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `normal_project_employee`
--
ALTER TABLE `normal_project_employee`
  MODIFY `npeid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=81;

--
-- AUTO_INCREMENT for table `normal_project_subtask`
--
ALTER TABLE `normal_project_subtask`
  MODIFY `npstid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `single_deal`
--
ALTER TABLE `single_deal`
  MODIFY `sdid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `subtask`
--
ALTER TABLE `subtask`
  MODIFY `sub_task_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `task`
--
ALTER TABLE `task`
  MODIFY `task_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `emp_task_notify`
--
ALTER TABLE `emp_task_notify`
  ADD CONSTRAINT `emp_task_notify_ibfk_1` FOREIGN KEY (`emid`) REFERENCES `employee` (`em_id`);

--
-- Constraints for table `misc_project_employee`
--
ALTER TABLE `misc_project_employee`
  ADD CONSTRAINT `misc_project_employee_ibfk_1` FOREIGN KEY (`mdeal_id`) REFERENCES `single_deal` (`sdid`),
  ADD CONSTRAINT `misc_project_employee_ibfk_2` FOREIGN KEY (`mstask_id`) REFERENCES `mis_subtask` (`msub_task_id`),
  ADD CONSTRAINT `misc_project_employee_ibfk_3` FOREIGN KEY (`mpemid`) REFERENCES `employee` (`em_id`);

--
-- Constraints for table `misc_project_finance`
--
ALTER TABLE `misc_project_finance`
  ADD CONSTRAINT `misc_project_finance_ibfk_1` FOREIGN KEY (`mdeal_id`) REFERENCES `single_deal` (`sdid`),
  ADD CONSTRAINT `misc_project_finance_ibfk_2` FOREIGN KEY (`task`) REFERENCES `mis_subtask` (`msub_task_id`);

--
-- Constraints for table `misc_project_subtask`
--
ALTER TABLE `misc_project_subtask`
  ADD CONSTRAINT `misc_project_subtask_ibfk_1` FOREIGN KEY (`mdeal_id`) REFERENCES `single_deal` (`sdid`),
  ADD CONSTRAINT `misc_project_subtask_ibfk_2` FOREIGN KEY (`mstask_id`) REFERENCES `mis_subtask` (`msub_task_id`);

--
-- Constraints for table `normal_projects_finance`
--
ALTER TABLE `normal_projects_finance`
  ADD CONSTRAINT `normal_projects_finance_ibfk_1` FOREIGN KEY (`ndeal_id`) REFERENCES `deals` (`id`),
  ADD CONSTRAINT `normal_projects_finance_ibfk_2` FOREIGN KEY (`task`) REFERENCES `task` (`task_id`);

--
-- Constraints for table `normal_project_cat`
--
ALTER TABLE `normal_project_cat`
  ADD CONSTRAINT `normal_project_cat_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `task` (`task_id`),
  ADD CONSTRAINT `normal_project_cat_ibfk_2` FOREIGN KEY (`ndeal_id`) REFERENCES `deals` (`id`);

--
-- Constraints for table `normal_project_employee`
--
ALTER TABLE `normal_project_employee`
  ADD CONSTRAINT `normal_project_employee_ibfk_1` FOREIGN KEY (`ndeal_id`) REFERENCES `deals` (`id`),
  ADD CONSTRAINT `normal_project_employee_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `task` (`task_id`),
  ADD CONSTRAINT `normal_project_employee_ibfk_3` FOREIGN KEY (`emid`) REFERENCES `employee` (`em_id`);

--
-- Constraints for table `normal_project_subtask`
--
ALTER TABLE `normal_project_subtask`
  ADD CONSTRAINT `normal_project_subtask_ibfk_1` FOREIGN KEY (`ndeal_id`) REFERENCES `deals` (`id`),
  ADD CONSTRAINT `normal_project_subtask_ibfk_2` FOREIGN KEY (`stask_id`) REFERENCES `subtask` (`sub_task_id`);

--
-- Constraints for table `subtask`
--
ALTER TABLE `subtask`
  ADD CONSTRAINT `subtask_ibfk_1` FOREIGN KEY (`task_id`) REFERENCES `task` (`task_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
