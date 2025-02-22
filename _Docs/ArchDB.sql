-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 22, 2025 at 05:33 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `archdb`
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `adminauth`
--

INSERT INTO `adminauth` (`adm_id`, `name`, `email`, `password`, `role`) VALUES
(1, 'msi', 'msi@gmail.com', '77ee3625f508f3051360327fb67668b2ba769f13f56599bb45a4a923bb850c49', 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `amount_split`
--

CREATE TABLE `amount_split` (
  `cid` int(11) NOT NULL,
  `splitvalue` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `amount_split`
--

INSERT INTO `amount_split` (`cid`, `splitvalue`) VALUES
(1, '2:3:5');

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
  `np_deadline` varchar(30) DEFAULT NULL,
  `split` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `deals`
--

INSERT INTO `deals` (`id`, `deal_name`, `reference_no`, `contact`, `agreement_amount`, `work_name`, `email`, `city`, `total_price`, `np_deadline`, `split`) VALUES
(3, 'Mintu Sharma7', 16, NULL, 1500, 'Mintu Sharma', 'aditya01377@gmail.com', 'siwan', 15000, '12/12/2026', '2:3:5'),
(4, 'Mintu Sharma', 2, 940106937, 1500, 'Mintu Sharma', 'aditya01377@gmail.com', 'siwan', 15000, '12/12/2026', '2:3:5');

-- --------------------------------------------------------

--
-- Table structure for table `empattendance`
--

CREATE TABLE `empattendance` (
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
  `year` varchar(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `empattendance`
--

INSERT INTO `empattendance` (`January`, `February`, `March`, `April`, `May`, `June`, `July`, `August`, `September`, `October`, `November`, `December`, `id`, `empID`, `date`, `year`) VALUES
(NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 1, '1', NULL),
(NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2, 1, '2', NULL),
(NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3, 1, '3', NULL),
(NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 4, 1, '4', NULL),
(NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 5, 1, '5', NULL),
(NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 6, 1, '6', NULL),
(NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 7, 1, '7', NULL),
(NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 8, 1, '8', NULL),
(NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 9, 1, '9', NULL),
(NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 10, 1, '10', NULL),
(NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 11, 1, '11', NULL),
(NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 12, 1, '12', NULL),
(NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 13, 1, '13', NULL),
(NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 14, 1, '14', NULL),
(NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 15, 1, '15', NULL),
(NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 16, 1, '16', NULL),
(NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 17, 1, '17', NULL),
(NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 18, 1, '18', NULL),
(NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 19, 1, '19', NULL),
(NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 20, 1, '20', NULL),
(NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 21, 1, '21', NULL),
(NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 22, 1, '22', NULL),
(NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 23, 1, '23', NULL),
(NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'P', 24, 1, '24', '2024'),
(NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 25, 1, '25', NULL),
(NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 26, 1, '26', NULL),
(NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 27, 1, '27', NULL),
(NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 28, 1, '28', NULL),
(NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 29, 1, '29', NULL),
(NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 30, 1, '30', NULL),
(NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 31, 1, '31', NULL);

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`em_id`, `name`, `email`, `password`, `number`, `lastLoginAt`, `lastLogoutAt`, `status`, `job_role`) VALUES
(1, 'Mintu Sharma', 'user@user.com', 'b95ab2dcee3e5f987834e0eb3188ec3e73e4c065bbee645c222e1330535b382e', '9401069337', '2024-12-25 03:32:04', NULL, 'active', 'Worker');

-- --------------------------------------------------------

--
-- Table structure for table `emp_task_notify`
--

CREATE TABLE `emp_task_notify` (
  `notid` bigint(20) NOT NULL,
  `emid` int(11) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `dateofnotify` varchar(50) DEFAULT '0',
  `status` varchar(20) DEFAULT 'unread'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `emp_task_notify`
--

INSERT INTO `emp_task_notify` (`notid`, `emid`, `title`, `dateofnotify`, `status`) VALUES
(1, 1, 'You have been assigned to a new project with ref no. \n                  0\n                 on Sun Feb 16 2025 13:29:56 GMT+0530 (India Standard Time)', '20/02/2023', 'unread'),
(2, 1, 'You have been assigned to a new Miscallaneous project with ref no. \n                  0\n                 on Sun Feb 16 2025 14:35:56 GMT+0530 (India Standard Time)', '20/02/2023', 'unread');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `expenses`
--

INSERT INTO `expenses` (`id`, `title`, `remark`, `amount`, `date`, `md_type`) VALUES
(1, 'new expence', 'zdDF', 1500, '14/12/2024', 'cash'),
(2, 'new expence', 'new expences of the year', 1500, '03/01/2025', 'cash'),
(3, 'new expence2', 'sadf asdf asdg', 15023, '22/01/2025', 'online'),
(4, 'new expence2', 'sadf asdf asdg', 15023, '22/01/2025', 'online'),
(5, 'new expence2', 'sadf asdf asdg', 15023, '22/01/2025', 'online'),
(6, 'new expence2', 'sSDF', 1500, 'undefined/undefined/', 'cash'),
(7, 'new expence2', 'scsc', 1500, 'undefined/undefined/', 'cash'),
(8, 'assdfas', 'asdgasdg', 785757, 'undefined/undefined/', 'cash'),
(9, 'new expence2', 'ZSCC', 1500, 'undefined/undefined/', 'cash'),
(10, '', '', 0, 'undefined/undefined/', 'cash'),
(11, '', '', 0, '24/02/12', 'cash'),
(12, '', '', 0, '2400/02/12', 'cash');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `misc_project_employee`
--

INSERT INTO `misc_project_employee` (`mpeid`, `mdeal_id`, `mstask_id`, `mpemid`, `dateofassign`, `dateofremove`) VALUES
(1, 2, 1, 1, '20/02/2023', '0');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `misc_project_finance`
--

INSERT INTO `misc_project_finance` (`mfid`, `mdeal_id`, `totalamount`, `task`, `amount_got`, `dateofpay`, `modeofpay`) VALUES
(2, 2, 15000, 1, 1500, '0', NULL),
(3, 3, 15000, 1, 456123, '12/12/3050', 'cash'),
(4, 4, 15000, 1, 1500, '12/12/3030', 'online');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `misc_project_subtask`
--

INSERT INTO `misc_project_subtask` (`mpstid`, `mdeal_id`, `mstask_id`, `mstask_status`, `dateofdeadline`, `dateofcomplete`) VALUES
(2, 2, 1, 'completed', '30/09/2013', '28/03/2033'),
(3, 3, 1, 'not started', '30/09/2013', '0'),
(4, 4, 1, 'On Progress', '30/09/2013', '0');

-- --------------------------------------------------------

--
-- Table structure for table `mis_subtask`
--

CREATE TABLE `mis_subtask` (
  `msub_task_id` int(11) NOT NULL,
  `msub_task_name` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `mis_subtask`
--

INSERT INTO `mis_subtask` (`msub_task_id`, `msub_task_name`) VALUES
(1, 'Interior'),
(2, 'Interoo'),
(3, 'Interoo'),
(4, 'Bricks');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `normal_projects_finance`
--

INSERT INTO `normal_projects_finance` (`fid`, `ndeal_id`, `totalamount`, `task`, `amount_got`, `dateofpay`, `modeofpay`) VALUES
(1, 3, 15000, 1, 0, NULL, NULL),
(2, 3, 15000, 2, 0, NULL, NULL),
(3, 4, 15000, 1, 0, NULL, NULL),
(4, 4, 15000, 2, 0, NULL, NULL),
(5, 4, 15000, 1, 456123, '12/12/3030', 'cash'),
(6, 4, 15000, 1, 500, '12/12/3030', 'cash'),
(7, 4, 15000, 2, NULL, NULL, 'cash'),
(10, 4, NULL, 1, NULL, NULL, 'cash'),
(11, 4, NULL, 1, NULL, NULL, 'cash'),
(12, 4, NULL, 1, 456123, '12/12/3030', 'cash'),
(13, 4, NULL, 2, 500, '12/12/3030', 'cash'),
(14, 4, NULL, 2, 1500, '12/04/2024', 'cash'),
(15, 3, NULL, 2, 500, '12/12/3030', 'cash'),
(16, 4, NULL, 1, 456123, '12/12/3030', 'online');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `normal_project_cat`
--

INSERT INTO `normal_project_cat` (`npcid`, `ndeal_id`, `category_id`, `cat_status`, `project_status`, `dateofdeadline`, `dateofpostponed`, `dateofcomplete`) VALUES
(6, 3, 1, 'pending', 'pending', 'not set yet', '0', '0'),
(7, 3, 2, 'On Progress', 'On Progress', 'not set yet', '0', '0'),
(8, 4, 1, 'completed', 'completed', 'not set yet', '0', '0'),
(9, 4, 2, 'completed', 'completed', 'not set yet', '0', '0');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `normal_project_employee`
--

INSERT INTO `normal_project_employee` (`npeid`, `ndeal_id`, `category_id`, `emid`, `dateofassign`, `dateofremove`, `npcid`) VALUES
(1, 3, 2, 1, '20/02/2023', '0', 7);

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `normal_project_subtask`
--

INSERT INTO `normal_project_subtask` (`npstid`, `ndeal_id`, `category_id`, `stask_id`, `stask_status`, `dateofcomplete`) VALUES
(1, 3, 2, 1, 'not started', '0');

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
  `total_price` int(11) DEFAULT NULL,
  `mp_deadline` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `single_deal`
--

INSERT INTO `single_deal` (`sdid`, `sdeal_name`, `reference_no`, `contact`, `agreement_amount`, `work_name`, `email`, `city`, `total_price`, `mp_deadline`) VALUES
(2, 'Mintu Sharma', 0, NULL, 1500, NULL, 'aditya01377@gmail.com', NULL, 15000, NULL),
(3, 'Mintu Sharma', 0, NULL, 456123, 'nullsdfas', 'akhterjabed648@gmail.com', 'nuladsfas', 15000, '12'),
(4, 'Mintu Sharma', 0, 21474, 1500, 'First floor of retail store', 'aditya01377@gmail.com', 'siwan', 15000, '01/10/2023');

-- --------------------------------------------------------

--
-- Table structure for table `subtask`
--

CREATE TABLE `subtask` (
  `sub_task_id` int(11) NOT NULL,
  `task_id` int(11) DEFAULT NULL,
  `sub_task_name` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `subtask`
--

INSERT INTO `subtask` (`sub_task_id`, `task_id`, `sub_task_name`) VALUES
(1, NULL, 'Bricks');

-- --------------------------------------------------------

--
-- Table structure for table `task`
--

CREATE TABLE `task` (
  `task_id` int(11) NOT NULL,
  `task_name` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `task`
--

INSERT INTO `task` (`task_id`, `task_name`) VALUES
(1, 'Architecture'),
(2, 'Structural');

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
-- Indexes for table `empattendance`
--
ALTER TABLE `empattendance`
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
  ADD UNIQUE KEY `title` (`title`),
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
  ADD UNIQUE KEY `mpnd` (`mdeal_id`,`mstask_id`,`mpemid`),
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
  ADD UNIQUE KEY `node` (`ndeal_id`,`category_id`,`emid`),
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
  MODIFY `cid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `deals`
--
ALTER TABLE `deals`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `empattendance`
--
ALTER TABLE `empattendance`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `employee`
--
ALTER TABLE `employee`
  MODIFY `em_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `emp_task_notify`
--
ALTER TABLE `emp_task_notify`
  MODIFY `notid` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `expenses`
--
ALTER TABLE `expenses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

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
  MODIFY `mpstid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `mis_subtask`
--
ALTER TABLE `mis_subtask`
  MODIFY `msub_task_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `normal_projects_finance`
--
ALTER TABLE `normal_projects_finance`
  MODIFY `fid` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `normal_project_cat`
--
ALTER TABLE `normal_project_cat`
  MODIFY `npcid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `normal_project_employee`
--
ALTER TABLE `normal_project_employee`
  MODIFY `npeid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `normal_project_subtask`
--
ALTER TABLE `normal_project_subtask`
  MODIFY `npstid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `single_deal`
--
ALTER TABLE `single_deal`
  MODIFY `sdid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `subtask`
--
ALTER TABLE `subtask`
  MODIFY `sub_task_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `task`
--
ALTER TABLE `task`
  MODIFY `task_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

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
  ADD CONSTRAINT `misc_project_finance_ibfk_1` FOREIGN KEY (`mdeal_id`) REFERENCES `single_deal` (`sdid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `misc_project_finance_ibfk_2` FOREIGN KEY (`task`) REFERENCES `mis_subtask` (`msub_task_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `misc_project_subtask`
--
ALTER TABLE `misc_project_subtask`
  ADD CONSTRAINT `misc_project_subtask_ibfk_1` FOREIGN KEY (`mdeal_id`) REFERENCES `single_deal` (`sdid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `misc_project_subtask_ibfk_2` FOREIGN KEY (`mstask_id`) REFERENCES `mis_subtask` (`msub_task_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `normal_projects_finance`
--
ALTER TABLE `normal_projects_finance`
  ADD CONSTRAINT `normal_projects_finance_ibfk_1` FOREIGN KEY (`ndeal_id`) REFERENCES `deals` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `normal_projects_finance_ibfk_2` FOREIGN KEY (`task`) REFERENCES `task` (`task_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `normal_project_cat`
--
ALTER TABLE `normal_project_cat`
  ADD CONSTRAINT `normal_project_cat_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `task` (`task_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `normal_project_cat_ibfk_2` FOREIGN KEY (`ndeal_id`) REFERENCES `deals` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

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
