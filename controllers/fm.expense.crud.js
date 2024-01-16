const db = require('../config/db.config');


exports.addExpense = (req, res) => {
    console.log(req.body
        );
    let q = `INSERT  INTO  expenses(title,remark,amount,date,md_type) VALUE(?,?,?,?,?)`
    db.query(q,[req.body.title,req.body.remark,req.body.amount,req.body.date,req.body.mode], (err, results) => {
        if (!err) {
            res.status(200).send({ status: true, msg: 'Successfully Expense Added'})
        } else {
            res.status(500).send({ status: false, msg: "Internal error occurs! \n " })
        }
    })

}

exports.expenseUpdater = (req, res) => {
    let q = `UPDATE expenses SET title =?,remark= ?,amount=?,date =?,md_type=? WHERE id=${req.params.id}`
    console.log(req.params.id, req.body);
    db.query(q,[req.body.title,req.body.remark,req.body.amount,req.body.date,req.body.mode], (err, results) => {
        if (!err) {
            res.status(200).send({ status: true, msg: 'Successfully Expense Updated' })
        } else {
            throw err;
            res.status(500).send({ status: false, msg: "Internal error occurs! \n "+err })
        }
    })

}