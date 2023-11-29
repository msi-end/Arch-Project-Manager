const db = require('../config/db.config')


exports.index = (req, res) => {
    const query = ``
    db.query(query, (err, result, field) => {
        res.send(result)
    })
}
exports.userManager = (req, res) => {
    const query = `SELECT employee.em_id, employee.name ,employee.number, employee.email, employee.lastLoginAt ,employee.lastLogoutAt , employee.status 
      , COUNT(normal_project_employee.emid) FROM employee
        INNER JOIN normal_project_employee ON employee.em_id = normal_project_employee.emid
        GROUP BY   normal_project_employee.emid;`
    db.query(query, (err, result, field) => {
        res.send(result)
    })
} 

// SELECT employee.em_id, employee.name, employee.number, employee.email, employee.lastLoginAt, employee.lastLogoutAt, employee.status
//     , COUNT(normal_project_employee.emid), normal_project_employee.cat_status
//        FROM employee
//         INNER JOIN normal_project_employee ON employee.em_id = normal_project_employee.emid
//         INNER JOIN normal_project_cat ON normal_project_cat.category_id = normal_project_employee.category_id
//         GROUP BY   normal_project_employee.emid;








exports.finance = (req, res) => {
    const query = ``
    db.query(query, (err, result, field) => {
        res.send(result)
    })
}
exports.expense = (req, res) => {
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