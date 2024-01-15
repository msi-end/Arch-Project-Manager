9# Ebah_database

create table adminauth(
 adm_id int primary key auto_increment,
 name varchar(80),
 email varchar(80),
 password varchar(30),
 role varchar(10) default "admin"
);

create table deals (
 id bigint primary key auto_increment,
 deal_name varchar(200),
 reference_no int,
 contact int,
 agreement_amount int,
 work_name varchar(300),
 email varchar(80),
 city varchar(50),
 total_price int
);

create table task (
 task_id int primary key auto_increment,
 task_name varchar(100)
);

create table subtask (
 sub_task_id int primary key auto_increment,
 task_id int,
 sub_task_name varchar(100),
 foreign key(task_id) references task(task_id)
);

create table employee(
 em_id int primary key auto_increment,
 name varchar(80),
 email varchar(80),
 password varchar(30)
);

create table normal_project_cat (
    npcid int primary key auto_increment,
    ndeal_id bigint,
    category_id int,
    cat_status varchar(50) default "pending",
    project_status varchar(60) default "pending",
    dateofdeadline varchar(80) default 0,
    dateofpostponed varchar(80) default 0,
    dateofcomplete varchar(50) default 0,
    foreign key(category_id) references task(task_id),
    foreign key(ndeal_id) references deals(id)
);


create table normal_project_subtask (
    npstid int primary key auto_increment,
    ndeal_id bigint,
    category_id int,
    stask_id int,
    stask_status varchar(50) default "not started",
    dateofcomplete varchar(50) default 0,
    foreign key(ndeal_id) references deals(id),
    foreign key(category_id) references task(task_id),
    foreign key(stask_id) references subtask(sub_task_id)
);

create table normal_project_employee (
    npeid int primary key auto_increment,
    ndeal_id bigint,
    category_id int,
    emid int,
    dateofassign varchar(50) default 0,
    dateofremove varchar(50) default 0,
    foreign key(ndeal_id) references deals(id),
    foreign key(category_id) references task(task_id),
    foreign key(emid) references employee(em_id)
);


//----------------miscelleneous task work------------------

create table single_deal(
 sdid int primary key auto_increment,
 sdeal_name varchar(200),
 reference_no int,
 contact int,
 agreement_amount int,
 work_name varchar(300),
 email varchar(80),
 city varchar(50),
 total_price int
);

create table mis_subtask (
 msub_task_id int primary key auto_increment,
 msub_task_name varchar(100)
);

create table misc_project_subtask (
    mpstid int primary key auto_increment,
    mdeal_id int,
    mstask_id int,
    mstask_status varchar(50) default "not started",
    dateofdeadline varchar(50) default 0,
    dateofcomplete varchar(50) default 0,
    foreign key(mdeal_id) references single_deal(sdid),
    foreign key(mstask_id) references mis_subtask(msub_task_id)
);

create table misc_project_employee (
    mpeid int primary key auto_increment,
    mdeal_id int,
    mstask_id int,
    mpemid int,
    dateofassign varchar(50) default 0,
    dateofremove varchar(50) default 0,
    foreign key(mdeal_id) references single_deal(sdid),
    foreign key(mstask_id) references mis_subtask(msub_task_id),
    foreign key(mpemid) references employee(em_id)
);


//------------------notifications dbs------------------------------

create table emp_task_notify(
  notid bigint primary key auto_increment,
  emid int,
  task varchar(70),
  project varchar(200),
  dateofnotify varchar(50) default 0,
  viewed varchar(20) default "unread",
  foreign key(emid) references employee(em_id)
);


//----------------------finance section-------------------------------------

create table amount_split(
cid int primary key auto_increment,
splitvalue varchar(100)
);

create table normal_projects_finance(
  fid bigint primary key auto_increment,
  ndeal_id bigint not null,
  totalamount int,
  task int,
  amount_got int default 0,
  dateofpay varchar(50),
  modeofpay varchar(15),
  foreign key(ndeal_id) references deals(id),
  foreign key(task) references task(task_id)
);

create table misc_project_finance (
 mfid int primary key auto_increment not null,
 mdeal_id int not null,
 totalamount int,
 task int not null,
 amount_got int,
 dateofpay varchar(80) default 0,
 modeofpay varchar(50),
 foreign key(mdeal_id) references single_deal(sdid),
 foreign key(task) references mis_subtask(msub_task_id)
);


<!-- //////ALTER////// -->
//--------entry atlast------------------------

ALTER TABLE deals ADD split varchar(100);


ALTER TALBE normal_project_employee ADD npcid INT(11)

--------------Employee Attendance Table =========

CREATE TABLE empAttendance (
    id INT PRIMARY KEY auto_increment not null,
    empID INT(11),
    date VARCHAR(10),
    year VARCHAR(6),
    January CHAR(1),
    February CHAR(1),
    March CHAR(1),
    April CHAR(1),
    May CHAR(1),
    June CHAR(1),
    July CHAR(1),
    August CHAR(1),
    September CHAR(1),
    October CHAR(1),
    November CHAR(1),
    December CHAR(1),
);

ALTER TABLE employee 
ADD number  VARCHAR(15),
ADD job_role VARCHAR(30), 
ADD lastLoginAt VARCHAR(50), 
ADD lastLogoutAt VARCHAR(50), 
ADD status  VARCHAR(50);

