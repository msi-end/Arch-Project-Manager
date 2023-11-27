const db = require('../config/db.config')
const { createHmac } = require('crypto')
const {errorHandler} = require('../utils/errorHandler')



exports.add = (req, res) => {
    let password = createHmac('sha256', 'zxcvbnmsdasgdrf').update(req.body.Password).digest('hex')
    const query = `INSERT INTO employee (name,email,passwor d) VALUES(?,?,?) `
    db.query(query, [req.body.Name, req.body.Email, password], (err, result, field) => {
        if(err) throw new errorHandler('',err) ;
        res.status(200).send({status:true,msg:'Life success!'})
    })
}
exports.getAll = (req, res) => {
    const query = `SELECT em_id,name,email FROM employee`;
    db.query(query, [req.body.Name, req.body.Email, password], (err, result, field) => {
        if(err) throw new errorHandler('',err) ;
        res.status(200).send({status:true,msg:'Life success!'})
    })
}
exports.getOne = (req, res) => {
    const query = `INSERT INTO employee (name,email,passwor d) VALUES(?,?,?) `
    db.query(query, [req.body.Name, req.body.Email, password], (err, result, field) => {
        if(err) throw new errorHandler('',err) ;
        res.status(200).send({status:true,msg:'Life success!'})
    })


}
exports.Del = (req, res) => {
    const query = `INSERT INTO employee (name,email,passwor d) VALUES(?,?,?) `
    db.query(query, [req.body.Name, req.body.Email, password], (err, result, field) => {
        if(err) throw new errorHandler('',err) ;
        res.status(200).send({status:true,msg:'Life success!'})
    })

}
exports.Update = (req, res) => {
    const query = `INSERT INTO employee (name,email,passwor d) VALUES(?,?,?) `
    db.query(query, [req.body.Name, req.body.Email, password], (err, result, field) => {
        if(err) throw new errorHandler('',err) ;
        res.status(200).send({status:true,msg:'Life success!'})
    })


}
exports.getAttendence = (req, res) => {
    const query = ``
    db.query(query, (err, result, field) => {
        res.send(result)
    })


}