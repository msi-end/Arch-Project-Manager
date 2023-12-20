# API for NORMAL PROJECT 

### API for employee list per normal project - GET
http://localhost:3000/apiv1/employee/1/1    
<!-- :dealId/:catId -->

### API for adding employee from normal project - POST
http://localhost:3000/apiv1/add-employee-to-project

### API for removing employee from normal project - DELETE
http://localhost:3000/apiv1//removeempnp/1/1/1/structural/hospital/23/03/2303

### API for getting all subtasks for normal project - GET
http://localhost:3000/admin/settings/get-subtask

### API for adding subtasks to normal project - POST
http://localhost:3000/apiv1/addsubtaskto-nproject
{
  "ndeal_id" : 1,
  "category_id" : 1,
  "stask_id" : 1
}

### API for deleting subtasks from normal project - DELETE
http://localhost:3000/apiv1/delete-subtask?dealId=1&catId=1&staskId=1


# API for TASK OF NORMAL PROJECTS TASK (category)

### API for deleting tasks from normal projects - DELETE
http://localhost:3000/apiv1/delete-task?dealId=1&catId=2

### API for normal project finance updateing advance pay recieved - PUT
http://localhost:3000/admin/finance/update-advancepay
{
  "amount_got" : 1000,
  "dateofpay" : "12/02/2023",
  "modeofpay" : "online",
  "ndeal_id" : 13,
  "task" : 2
} 


# API for MISC PROJECT 

### API for misc project to add employee - POST
http://localhost:3000/apiv1/add-employee-to-miscproject
{
    "mdeal_id" : 1,
    "mstask_id" : 1,
    "mpemid" : 2,
    "dateofassign" : "23/08/2023",
    "task" : "ita gotha",
    "project" : "Latin Bonua"  
}

### API for misc project to remove employee - DELETE
http://localhost:3000/apiv1/remove-emp-miscp?mdeal_id=1&mstask_id=1&mpemid=2&dateofremove=23/09/23&task=ita+gota&project=Latin+bonua


### API for update misc projects subtask - UPDATE
http://localhost:3000/apiv1/update-misctask-status
{
  "mdeal_id" : 1,
  "mstask_id" : 1,
  "mstask_status" : "completed",
  "dateofstatus" : "28/03/2033"
}

