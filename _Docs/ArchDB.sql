-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jan 28, 2024 at 03:33 PM
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

-- --------------------------------------------------------

--
-- Table structure for table `amount_split`
--

CREATE TABLE `amount_split` (
  `cid` int(11) NOT NULL,
  `splitvalue` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
  `year` varchar(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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

-- --------------------------------------------------------

--
-- Table structure for table `mis_subtask`
--

CREATE TABLE `mis_subtask` (
  `msub_task_id` int(11) NOT NULL,
  `msub_task_name` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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

-- --------------------------------------------------------

--
-- Table structure for table `subtask`
--

CREATE TABLE `subtask` (
  `sub_task_id` int(11) NOT NULL,
  `task_id` int(11) DEFAULT NULL,
  `sub_task_name` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `task`
--

CREATE TABLE `task` (
  `task_id` int(11) NOT NULL,
  `task_name` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
  MODIFY `adm_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `amount_split`
--
ALTER TABLE `amount_split`
  MODIFY `cid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `deals`
--
ALTER TABLE `deals`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `empAttendance`
--
ALTER TABLE `empAttendance`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `employee`
--
ALTER TABLE `employee`
  MODIFY `em_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `emp_task_notify`
--
ALTER TABLE `emp_task_notify`
  MODIFY `notid` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `expenses`
--
ALTER TABLE `expenses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `misc_project_employee`
--
ALTER TABLE `misc_project_employee`
  MODIFY `mpeid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `misc_project_finance`
--
ALTER TABLE `misc_project_finance`
  MODIFY `mfid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `misc_project_subtask`
--
ALTER TABLE `misc_project_subtask`
  MODIFY `mpstid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `mis_subtask`
--
ALTER TABLE `mis_subtask`
  MODIFY `msub_task_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `normal_projects_finance`
--
ALTER TABLE `normal_projects_finance`
  MODIFY `fid` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `normal_project_cat`
--
ALTER TABLE `normal_project_cat`
  MODIFY `npcid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `normal_project_employee`
--
ALTER TABLE `normal_project_employee`
  MODIFY `npeid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `normal_project_subtask`
--
ALTER TABLE `normal_project_subtask`
  MODIFY `npstid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `single_deal`
--
ALTER TABLE `single_deal`
  MODIFY `sdid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `subtask`
--
ALTER TABLE `subtask`
  MODIFY `sub_task_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `task`
--
ALTER TABLE `task`
  MODIFY `task_id` int(11) NOT NULL AUTO_INCREMENT;

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

-- atlast modification after review

ALTER TABLE deals ADD COLUMN np_deadline VARCHAR(30) AFTER total_price;
ALTER TABLE single_deal ADD COLUMN mp_deadline VARCHAR(30) AFTER total_price;

ALTER TABLE normal_project_employee
ADD CONSTRAINT node UNIQUE (ndeal_id, category_id, emid);

ALTER TABLE misc_project_employee
ADD CONSTRAINT mpnd UNIQUE (mdeal_id, mstask_id, mpemid);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
