const db = require('../config/db.config')


exports.index = (req, res) => {
    const query = ``
    db.query(query, (err, result, field) => {
        res.send(result)
    })
}
exports.userManager = (req, res) => {
    const query = ``
    db.query(query, (err, result, field) => {
        res.send(result)
    })
}
exports.Projects = (req, res) => {
    const query = ``
    db.query(query, (err, result, field) => {
        res.send(result)
    })


}
exports.finance = (req, res) => {
    const query = ``
    db.query(query, (err, result, field) => {
        res.send(result)
    })


}
exports.settings = (req, res) => {
    const query = ``
    db.query(query, (err, result, field) => {
        res.send(result)
    })


}