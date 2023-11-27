const express = require('express');
const api = express.Router();
const apiController = require('../apiControllers/nproject.controllers')


api.get('/employee/:dealId/:catId', apiController.getEmployListPerProject)

api.get('/get-employee', apiController.getEmployListToaddOrRemove)

api.post('/add-employee-to-project', apiController.addEmployeeToProject)

api.delete('/remove-employee-to-project', apiController.removeEmployeeToProject)

module.exports = api