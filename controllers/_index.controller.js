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
      GROUP BY normal_project_employee.emid;`
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


    // SELECT employee.em_id, employee.name, employee.number, employee.email, employee.lastLoginAt, employee.lastLogoutAt, employee.status
    //     , COUNT(normal_project_employee.emid), normal_project_cat.cat_status
    //        FROM employee
    //         INNER JOIN normal_project_employee ON employee.em_id = normal_project_employee.emid
    //         INNER JOIN normal_project_cat ON normal_project_cat.category_id = normal_project_employee.category_id
    //         GROUP BY   normal_project_employee.emid;
}

// ------------------Normal project form works--------------------------

exports.renderNormalProjectForm = (req, res) => {
    res.render('../views/admin/normalProject.ejs')
}

exports.insertNewNormalDeal = async (req, res) => {
    db.getConnection((err0, conn) => {
        if (err0) throw err0;
        conn.beginTransaction(function (err) {
            if (err) {
                res.status(500).send("something error occured")
                return;
            }
            const dealsTableData = [req.body.name, req.body.rfNo, req.body.contactNo, req.body.agreementAm, req.body.workName, req.body.email, req.body.city, req.body.TotalAm, req.body.split]

            const qTodeal = `insert into deals (deal_name, reference_no, contact, agreement_amount, work_name, email, city, total_price, split) values (?,?,?,?,?,?,?,?,?)`

            conn.query(qTodeal, dealsTableData, (err1, response) => {
                if (err1) {
                    return conn.rollback(function () {
                        throw err1;
                    })
                }

                const dealId = response.insertId
                const catTableData = []
                req.body.task.forEach((ask) => {
                    const taskNum = Number(ask)
                    catTableData.push([dealId, taskNum, '25/09/2023'])
                })
                const qTonpc = `insert into normal_project_cat (ndeal_id, category_id, dateofdeadline) values ?`
                conn.query(qTonpc, [catTableData], (err2, response2) => {
                    if (err2) {
                        return conn.rollback(function () {
                            throw err2;
                        })
                    }

                    const finTableData = []
                    req.body.task.forEach((ask) => {
                        const taskNum = Number(ask)
                        const tam = Number(req.body.TotalAm)
                        finTableData.push([dealId, tam, taskNum])
                    })
                    const qTonpf = `insert into normal_projects_finance (ndeal_id, totalamount, task) values ?`
                    conn.query(qTonpf, [finTableData], (err3, response3) => {
                        if (err3) {
                            return conn.rollback(function () {
                                throw err3;
                            })
                        }
                        conn.commit(function (errC) {
                            if (errC) {
                                return conn.rollback(function () {
                                    throw errC;
                                });
                            }
                            res.status(200).send("new deal entered successfully..😍")
                        })
                    })
                })

            })

        })
    })

}


//----------Misc project form work ------------

exports.renderMiscProjectForm = (req, res) => {
    res.render('../views/admin/normalProject.ejs')
}

exports.insertNewMiscDeal = async (req, res) => {
    db.getConnection((err0, conn) => {
        if (err0) throw err0;
        conn.beginTransaction(function (err) {
            if (err) {
                res.status(500).send("something error occured")
                return;
            }
            const miscDealsTableData = [req.body.name, req.body.rfNo, req.body.contactNo, req.body.agreementAm, req.body.workName, req.body.email, req.body.city, req.body.TotalAm]

            const qTodeal = `insert into single_deal (sdeal_name, reference_no, contact, agreement_amount, work_name, email, city, total_price) values (?,?,?,?,?,?,?,?)`

            conn.query(qTodeal, miscDealsTableData, (err1, response) => {
                if (err1) {
                    return conn.rollback(function () {
                        throw err1;
                    })
                }
                const mdealId = response.insertId
                const finTableData = [mdealId, req.body.TotalAm, Number(req.body.task)]
                const qTonpf = `insert into misc_project_finance (mdeal_id, totalamount, task) values (?, ?, ?)`
                conn.query(qTonpf, finTableData, (err3, response3) => {
                    if (err3) {
                        return conn.rollback(function () {
                            throw err3;
                        })
                    }
                    conn.commit(function (errC) {
                        if (errC) {
                            return conn.rollback(function () {
                                throw errC;
                            });
                        }
                        res.status(200).send("new misc deal entered successfully..😍")
                    })
                })   

            })

        })
    })

}


