const express = require('express');
const api = express.Router();
const pmNormalAPI = require('../../controllers/pm.normal.crud')
const pmMiscAPI = require('../../controllers/pm.misc.crud')

//-------normal project employee --------
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
api.delete('/delete-task', pmNormalAPI.deleteTask)



//=================MISC PROJECT ROUTE============================

api.post('/add-employee-to-miscproject', pmMiscAPI.addEmployeeToMisc)
api.delete('/remove-emp-miscp', pmMiscAPI.removeEmployeeToMisc)

//---- Misc project subtask route----

api.put('/update-misctask-status', pmMiscAPI.updateMiscTaskStatus)

api.get('/getProjectStatus', pmNormalAPI.getEmployListPerProject)


module.exports = api