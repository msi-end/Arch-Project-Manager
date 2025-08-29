const db = require('../config/db.config');


exports.addExpense = (req, res) => {
    let q = `INSERT  INTO  expenses(title,remark,amount,date,md_type,category) VALUE(?,?,?,?,?,?);`
    db.query(q, [req.body.title, req.body.remark, req.body.amount, req.body.date, req.body.mode, req.body.category], (err, results) => {
        if (!err) {
            res.status(200).send({ status: true, msg: 'Successfully Expense Added' })
        } else {
            res.status(500).send({ status: false, msg: "Internal error occurs! \n " })
            console.log(err);
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

// 
// EXPENSE CATEGORY

exports.createExpenseCategory = (req, res) => {
    let q = `INSERT INTO expense_category (cat_name, cat_desc) VALUES (?, ?)`;
    db.query(q, [req.body.cat_name, req.body.cat_desc], (err, results) => {
        if (!err) {
            res.status(201).send({ status: true, msg: 'Expense category created successfully', id: results.insertId });
        } else {
            res.status(500).send({ status: false, msg: "Internal error occurs!\n" + err });
        }
    });
};

exports.getExpenseCategories = (req, res) => {
    let q = `SELECT id, cat_name, cat_desc FROM expense_category`;
    db.query(q, (err, results) => {
        if (!err) {
            res.status(200).send({ status: true, data: results });
        } else {
            res.status(500).send({ status: false, msg: "Internal error occurs!\n" + err });
        }
    });
};

exports.getExpenseCategoryById = (req, res) => {
    let q = `SELECT id, cat_name, cat_desc FROM expense_category WHERE id = ?`;
    db.query(q, [req.params.id], (err, results) => {
        if (!err) {
            if (results.length > 0) {
                res.status(200).send({ status: true, data: results[0] });
            } else {
                res.status(404).send({ status: false, msg: "Expense category not found" });
            }
        } else {
            res.status(500).send({ status: false, msg: "Internal error occurs!\n" + err });
        }
    });
};

exports.updateExpenseCategory = (req, res) => {
    let q = `UPDATE expense_category SET cat_name = ?, cat_desc = ? WHERE id = ?`;
    db.query(q, [req.body.cat_name, req.body.cat_desc, req.params.id], (err, results) => {
        if (!err) {
            if (results.affectedRows > 0) {
                res.status(200).send({ status: true, msg: 'Expense category updated successfully' });
            } else {
                res.status(404).send({ status: false, msg: "Expense category not found" });
            }
        } else {
            res.status(500).send({ status: false, msg: "Internal error occurs!\n" + err });
        }
    });
};

exports.deleteExpenseCategory = (req, res) => {
    let q = `DELETE FROM expense_category WHERE id = ?`;
    db.query(q, [req.params.id], (err, results) => {
        if (!err) {
            if (results.affectedRows > 0) {
                res.status(200).send({ status: true, msg: 'Expense category deleted successfully' });
            } else {
                res.status(404).send({ status: false, msg: "Expense category not found" });
            }
        } else {
            res.status(500).send({ status: false, msg: "Internal error occurs!\n" + err });
        }
    });
};

exports.getLastProjects = (req, res) => {
    let q = `SELECT id,deal_name as name ,reference_no,split FROM deals ORDER BY id DESC LIMIT 10;
             SELECT sdid as id ,sdeal_name as name ,reference_no,split FROM single_deal ORDER BY sdid DESC LIMIT 5;`;
    db.query(q, [req.params.id], (err, results) => {
        if (!err) {
            if (results) {
                res.status(200).send({ status: true, msg: 'Expense Last Project retrived successfully',data:{normal:results[0] ,misc:results[1]} });
            } else {
                res.status(404).send({ status: false, msg: "Expense Last Project not found" });
            }
        } else {
            res.status(500).send({ status: false, msg: "Internal error occurs!\n" + err });
        }
    });
};
exports.SearchLastProjects = (req, res) => {
    let searchterm =req.params.search_term
    let q = `SELECT id, deal_name AS name, reference_no,split FROM deals WHERE (deal_name LIKE '%${searchterm}%' OR reference_no LIKE '%${searchterm}%') ORDER BY id DESC LIMIT 10;
             SELECT sdid AS id, sdeal_name AS name, reference_no,split FROM single_deal WHERE (sdeal_name LIKE '%${searchterm}%' OR reference_no LIKE '%${searchterm}%') ORDER BY sdid DESC LIMIT 5;`;
    db.query(q,(err, results) => {
        if (!err) {
            if (results) {
                res.status(200).send({ status: true, msg: 'Expense Search Last Projects retrived successfully' ,data:{normal:results[0] ,misc:results[1]}});
            } else {
                res.status(404).send({ status: false, msg: "Expense Search Last Project not found" });
            }
        } else {
            res.status(500).send({ status: false, msg: "Internal error occurs!\n" + err });
        }
    });
};