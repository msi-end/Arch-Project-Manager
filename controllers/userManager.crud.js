const db = require('../config/db.config')
const { createHmac } = require('crypto')
const { errorHandler } = require('../utils/errorHandler')

function insertAttendanceData(empID) {
    let arr ='';
    for (let i = 2; i <=31; i++) {
         arr +=`,(${empID},${i})`
    }
    let query2 = `INSERT INTO empAttendance (empID,date) VALUES (${empID},'1')${arr};`
    db.query(query2,(err, result, field) => {
        if (err) throw new errorHandler(500,'There is an Error in Usermanager.crud ln:12 data not inserting.'+err);
    })
}

exports.add = async (req, res) => {
    let password = createHmac('sha256', 'zxcvbnmsdasgdrf').update(req.body.Password).digest('hex')
    const query = `INSERT INTO employee (name,email,password,number,job_role) VALUES(?,?,?,?,?);`
    await db.query(query, [req.body.Name, req.body.Email, password, req.body.Number, req.body.jobRole], (err, result, field) => {
        if (err) throw new errorHandler('', err);
        res.status(200).send({ status: true, msg: 'Life success!' });
     insertAttendanceData(result.insertId)
    })
}
exports.getOne = (req, res) => {
    const query = `SELECT name,email,number,status FROM employee WHERE em_id = ?  `
    db.query(query, [req.params.id], (err, result, field) => {
        if (err) throw new errorHandler('', err);
        res.status(200).send({ status: true, msg: 'Life success!', data: result })
    })
}
//Delete all data of employee from all tables
exports.Del = (req, res) => {
    const query = `UPDATE employee SET status ='inactive' WHERE em_id=?; `
    db.query(query, [req.params.id], (err, result, field) => {
        if (err) throw new errorHandler(err.status, err);
        res.status(200).send({ status: true, msg: 'Life success!' })
    })
}
exports.Del = (req, res) => {
    let password = createHmac('sha256', 'zxcvbnmsdasgdrf').update(req.body.Password).digest('hex')
    const query = `UPDATE employee SET status ='inactive' WHERE em_id=?; `
    db.query(query, [password,], (err, result, field) => {
        if (err) throw new errorHandler('', err);
        res.status(200).send({ status: true, msg: 'Life success!' })
    })
}


// Updating all kind Coulmns in DB (no need to change)
exports.Update = (req, res) => {
    let val = []
    let query = `UPDATE employee SET `
    Object.keys(req.body).forEach((key, index, arr) => {
        query += `${key}=?`; val.push(req.body[key]);
        if (index < arr.length - 1) { query += ','; }
    });
    query += 'WHERE em_id =?'; val.push(req.params.id)
    console.log(query, val);
    db.query(query, val, (err, result, field) => {
        if (err) throw new errorHandler(err.statusCode, err);
        res.status(200).send({ status: true, msg: 'Life success!' })
    })
}
exports.getAttendence = (req, res) => {
    let month = (new Date).getUTCMonth()
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const query = `SELECT COUNT(${monthNames[month]}) AS totalAtten FROM empAttendance WHERE empID = ${req.params.id} ;`
    db.query(query, (err, data, field) => {
        if (!err) {
            res.status(200).send({ status: true, data })
        } else {
            res.status(500).send({ status: false, msg: "Internal error occurs!" });
        }
    })
}
exports.getAttendenceByMonth = (req, res) => {
    let month = (new Date).getUTCMonth()
    let year = (new Date).getFullYear()
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const query = `SELECT date, ${monthNames[month]} FROM empAttendance WHERE empID = ${req.params.id} AND year = '${year}' AND  ${monthNames[month]} ='P' `
    db.query(query, (err, data, field) => {
        if (!err) {
            res.status(200).send({ status: true, data })
        } else {
            res.status(500).send({ status: false, msg: "Internal error occurs!" });
        }
    })
}
exports.setAttendence = (req, res,empId) => {
    let date = (new Date).getDate()
    let month = (new Date).getUTCMonth()
    let year = (new Date).getFullYear()
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const query = `UPDATE empAttendance  SET empID=${req.params.id||empId} ,date='${date}',${monthNames[month]}='P',year='${year}');`
    db.query(query, (err, result, field) => {
        if (!err) {
            res.status(200).send({ status: true, msg: 'Successfully Password Updated ', date: result })
        } else {
            res.status(500).send({ status: false, msg: "Internal error occurs!" });
        }
    })
}
// Note : check by group of ndeals_id
exports.getCompletePandingWork = (req, res) => {
    const query = `SELECT COUNT(normal_project_cat.cat_status) AS total_cats, SUM(CASE WHEN normal_project_cat.cat_status = 'Completed' THEN 1 ELSE 0 END) AS num_cats_completed FROM normal_project_cat LEFT JOIN normal_project_employee ON normal_project_cat.npcid = normal_project_employee.npcid WHERE emid = ${req.params.id} ; SELECT ndeal_id FROM normal_project_employee WHERE emid=${req.params.id} GROUP BY ndeal_id;SELECT COUNT(misc_project_subtask.mstask_status) AS total_mtask, SUM(CASE WHEN misc_project_subtask.mstask_status = 'not started' THEN 1 ELSE 0 END) AS num_task_completed FROM misc_project_subtask LEFT JOIN misc_project_employee ON misc_project_employee.mstask_id = misc_project_subtask.mstask_id WHERE misc_project_employee.mpemid = ${req.params.id};SELECT mdeal_id FROM misc_project_employee WHERE mpemid=${req.params.id} GROUP BY mdeal_id;`
    db.query(query, (err, result, field) => {
        res.status(200).send({ status: true, msg: 'Life success!', data: result })
    })
}


exports.ChangePwd = (req, res) => {
    let password = createHmac('sha256', 'zxcvbnmsdasgdrf').update(req.body.Password).digest('hex')
    const query = `UPDATE employee SET password=? WHERE em_id=${req.params.id} `
    db.query(query, [password], (err, result, field) => {
        if (!err) {
            res.status(200).send({ status: true, msg: 'Successfully Password Updated ' })
        } else {
            res.status(500).send({ status: false, msg: "Internal error occurs!" });
        }
    })
}


