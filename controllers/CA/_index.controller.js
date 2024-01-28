const db = require('../../config/db.config')

// All Index routes
exports.indexDeshboard = async (req, res) => {
    if (req.session.isLoggedIn == true && req.session.role == 'ca') {
        const query = `SELECT * FROM expenses  ;SELECT 'misc_project_finance' AS tName, SUM(amount_got) AS total_amount_got, SUM(CASE WHEN modeofpay='online' THEN amount_got ELSE 0 END) AS online_sum, SUM(CASE WHEN modeofpay='cash' THEN amount_got ELSE 0 END) AS cash_sum FROM misc_project_finance GROUP BY tName UNION ALL SELECT 'normal_projects_finance' AS tName, SUM(amount_got) AS total_amount_got, SUM(CASE WHEN modeofpay='online' THEN amount_got ELSE 0 END) AS online_sum, SUM(CASE WHEN modeofpay='cash' THEN amount_got ELSE 0 END) AS cash_sum FROM normal_projects_finance GROUP BY tName;SELECT  SUM(total_price) AS total_sum FROM single_deal  UNION ALL SELECT  SUM(total_price) AS total_sum FROM deals;SELECT SUM(CASE WHEN md_type ='cash' THEN amount ELSE 0 END) AS cash_expenses, sum(case when md_type ='online' THEN amount ELSE 0 END) as online_expenses FROM expenses;`
        db.query(query, (err, result, field) => {
            res.status(200).render('../views/CA/dashboard.ejs', { data: result })
        })
    } else { (res.status(302).redirect('/ca')) }

}
exports.GetExpensesByMonths = (req, res) => {
    console.log(req.query);
    let query = `SELECT * FROM expenses WHERE date LIKE '%${req.query.m}/${req.query.y}';`
    db.query(query, (err, results) => {
        if (!err) {
            res.status(200).send({ status: true, msg: 'Successfully Expense Updated', data: results })
        } else {
            res.status(500).send({ status: false, msg: "Internal error occurs! \n " + err })
        }
    })
}







