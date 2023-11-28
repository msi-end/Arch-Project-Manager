const db = require('../config/db.config')
const { createHmac } = require('crypto')
const { errorHandler } = require('../utils/errorHandler')



exports.add = (req, res) => {
    let password = createHmac('sha256', 'zxcvbnmsdasgdrf').update(req.body.Password).digest('hex')
    const query = `INSERT INTO employee (name,email,password,number) VALUES(?,?,?,?) `
    db.query(query, [req.body.Name, req.body.Email, password,req.body.Number], (err, result, field) => {
        if (err) throw new errorHandler('', err);
        res.status(200).send({ status: true, msg: 'Life success!' })
    })
}

exports.getOne = (req, res) => {
    const query = `SELECT name,email,number,status FROM employee WHERE em_id = ?  `
    db.query(query, [req.params.id], (err, result, field) => {
        if (err) throw new errorHandler('', err);
        res.status(200).send({ status: true, msg: 'Life success!' ,data:result})
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
// Updating all kind Coulmns in DB (no need to change)
exports.Update = (req, res) => {
    let val = []
    let query = `UPDATE employee SET `
    Object.keys(req.body).forEach((key, index, arr) => {
        query += `${key}=?`; val.push(req.body[key]);
        if (index < arr.length - 1) { query += ','; } });
    query += 'WHERE em_id =?';
    val.push(req.params.id)
    db.query(query, val, (err, result, field) => {
        if (err) throw new errorHandler(err.statusCode, err);
        res.status(200).send({ status: true, msg: 'Life success!' })
    })

    
}
exports.getAttendence = (req, res) => {
    const query = ``
    db.query(query, (err, result, field) => {
        res.send(result)
    })

    
}
//None Use function----------------------------------------
// exports.getAll = (req, res) => {
//     const query = `SELECT em_id,name,email, FROM employee`;
//     db.query(query, [req.body.Name, req.body.Email, password], (err, result, field) => {
//         if(err) throw new errorHandler('',err) ;
//         res.status(200).send({status:true,msg:'Life success!'})
//     })
// }