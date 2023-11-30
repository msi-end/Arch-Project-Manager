const express = require('express');
const api = express.Router();
const pmNormalAPI = require('../../controllers/PM.normal.crud')


api.get('/employee/:dealId/:catId', pmNormalAPI.getEmployListPerProject)

api.get('/get-employee', pmNormalAPI.getEmployListToaddOrRemove)

api.post('/add-employee-to-project', pmNormalAPI.addEmployeeToProject)

api.delete('/removeempnp/:dealId/:catId/:emid/:task/:project/:removeDate', pmNormalAPI.removeEmployeeToProject)

//-------normal project subtask --------

api.post('/addsubtaskto-nproject', pmNormalAPI.addNewSubTaskToProject)
api.put('/update-subtask-status', pmNormalAPI.updateSubtaskStatus)

module.exports = api