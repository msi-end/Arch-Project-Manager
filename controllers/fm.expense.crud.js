const db = require('../config/db.config');


exports.addExpense = (req, res) => {
    let q = `INSERT  INTO  expenses(title,remark,amount,date,md_type,category) VALUE(?,?,?,?,?,?)`
    db.query(q, [req.body.title, req.body.remark, req.body.amount, req.body.date, req.body.mode, req.body.mode], (err, results) => {
        if (!err) {
            res.status(200).send({ status: true, msg: 'Successfully Expense Added' })
        } else {
            res.status(500).send({ status: false, msg: "Internal error occurs! \n " })
        }
    })

}

exports.expenseUpdater = (req, res) => {
    let q = `UPDATE expenses SET title =?,remark= ?,amount=?,date =?,md_type=? WHERE id=${req.params.id}`
    db.query(q, [req.body.title, req.body.remark, req.body.amount, req.body.date, req.body.mode], (err, results) => {
        if (!err) {
            res.status(200).send({ status: true, msg: 'Successfully Expense Updated' })
        } else {
            res.status(500).send({ status: false, msg: "Internal error occurs! \n " + err })
        }
    })

}
exports.GetExpensesByMonths = (req, res) => {
    let query = `SELECT * FROM expenses WHERE date LIKE '%${req.query.m}/${req.query.y}' ORDER BY id DESC;`
    db.query(query, (err, results) => {
        if (!err) {
            res.status(200).send({ status: true, msg: 'Successfully Expense Updated',data:results })
        } else {
            res.status(500).send({ status: false, msg: "Internal error occurs! \n " + err })
        }
    })
}