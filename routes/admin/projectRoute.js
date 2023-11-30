const express = require('express');
const api = express.Router();
const apiController = require('../../controllers/pm.normal.crud')


api.get('/employee/:dealId/:catId', apiController.getEmployListPerProject)

api.get('/get-employee', apiController.getEmployListToaddOrRemove)

api.post('/add-employee-to-project', apiController.addEmployeeToProject)

api.delete('/removeempnp/:dealId/:catId/:emid/:task/:project/:removeDate', apiController.removeEmployeeToProject)

//-------normal project subtask --------

api.post('/addtaskto-nproject', apiController.addNewSubTaskToProject)

module.exports = api