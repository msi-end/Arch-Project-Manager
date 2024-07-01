const express = require('express');
const api = express.Router();
const pmNormalAPI = require('../../controllers/pm.normal.crud')
const pmMiscAPI = require('../../controllers/pm.misc.crud')

//-------normal project employee --------

api.get('/delete-project/:id', pmNormalAPI.DeleteNormalProjectData)
api.get('/employee/:dealId/:catId', pmNormalAPI.getEmployListPerProject)
api.get('/get-employee', pmNormalAPI.getEmployListToaddOrRemove)
api.post('/add-employee-to-project', pmNormalAPI.addEmployeeToProject)
api.delete('/removeempnp', pmNormalAPI.removeEmployeeToProject)

//-------normal project subtask --------
api.post('/addsubtaskto-nproject', pmNormalAPI.addNewSubTaskToProject)
api.put('/update-subtask-status', pmNormalAPI.updateSubtaskStatus)
api.delete('/delete-subtask', pmNormalAPI.deleteSubtask)

//-------normal project task --------
// api.post('/addtaskto-nproject', pmNormalAPI.addNewSubTaskToProject)
api.put('/update-task-status', pmNormalAPI.updatetaskStatus)
api.put('/update-task-deadline', pmNormalAPI.updatetaskDeadline)
api.delete('/delete-task', pmNormalAPI.deleteTask)
api.get('/ngetProjectStatus', pmNormalAPI.getProjectsStaus)
api.get('/nIsProjectPaid', pmNormalAPI.getCheckCompletedUnpaid)


//=================MISC PROJECT ROUTE==========================
api.get('/get-misc-emp/:dealId/:subtaskId', pmMiscAPI.getEmpListPerMiscProject)
api.post('/add-employee-to-miscproject', pmMiscAPI.addEmployeeToMisc)
api.delete('/remove-emp-miscp', pmMiscAPI.removeEmployeeToMisc)
api.get('/employee-misc/:dealId/:catId', pmMiscAPI.getEmployListPerProject)


//---- Misc project subtask route----

api.put('/update-misctask-status', pmMiscAPI.updateMiscTaskStatus)
api.get('/mgetProjectStatus', pmMiscAPI.getProjectsStaus)
api.get('/mIsProjectPaid', pmMiscAPI.getCheckCompletedUnpaid)

// -----Update task route for bith normal and misc task-----

api.get('/get-data-update', pmNormalAPI.getDataToUpdate)
api.put('/np-data-update', pmNormalAPI.UpdateNormalProjectData)
api.put('/misc-data-update', pmNormalAPI.UpdateMiscProjectData)






module.exports = api