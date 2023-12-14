# <u>Plan & Task lists.</u>

> ##### **Admin Panel :** 
>
> ###### Pages : 5 , One extra sub-page for Finance 
>
> 1. Dashboard
> 2. User Manager
> 3. Projects
> 4. Finance
> 5. Settings
>
> ##### **Employee Panel :** 
>
> ###### Pages :  3  
>
> 1. Dashboard
> 2. Projects
> 3. Settings



### Admin Panel

##### 1. Dashboard :- ( is now <u>Project</u>  section )



##### 2. User Manager :-

- [ ] Add , Delete , Update Users API Creation
- [ ] Create Add , Delete , Update Model windows
- [ ] Add , Delete , Update integration with Front-end UI  
- [ ] Last Login time & status for Each Employee
- [ ] User Attendance 
- [ ] Total Project done by each User (with Completed , Pending Projects)

##### 3. Finance :- 

- [ ] Showing list of all Projects with --

  > - [ ] total amount 
  > - [ ] All 3 spliced amount 
  > - [ ] Amount paid , Amount remaining
  > - [ ] Amount in Hand , Amount in Bank of each project
  > - [ ] Advance & remaining balance  insertions 

- [ ] Add sub-page Expanse with --

  > - [ ] list of Expenses of each month/10 days
  > - [ ] Showing Row> Amount , Subject , By cash/Online , Date and Sub-note for each expanse
  > - [ ] Add a Model window to Add expanse
  > - [ ] Add , delete & Update features for Expenses

##### 4. Settings :-

- [ ] Ratio Changeability settings



<!-- 
SELECT deals.*, normal_project_cat.category_id, task.task_name, normal_project_cat.cat_status, normal_project_subtask.stask_id, subtask.sub_task_name, normal_project_subtask.stask_status, normal_project_cat.project_status, normal_project_cat.dateofdeadline
FROM deals 
INNER JOIN normal_project_cat ON normal_project_cat.ndeal_id = deals.id 
INNER JOIN task ON normal_project_cat.category_id = task.task_id 
LEFT JOIN normal_project_subtask ON normal_project_subtask.ndeal_id = deals.id AND normal_project_subtask.category_id = normal_project_cat.category_id 
LEFT JOIN subtask ON subtask.sub_task_id = normal_project_subtask.stask_id -->

<!-- view table -->

SELECT pro_cat.*, normal_project_subtask.stask_id, normal_project_subtask.stask_status
FROM pro_cat
LEFT JOIN normal_project_subtask ON normal_project_subtask.ndeal_id = pro_cat.id
AND normal_project_subtask.category_id = pro_cat.category_id