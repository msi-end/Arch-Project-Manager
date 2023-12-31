const db = require('../config/db.config')
const dataUnity = require('../utils/arrange')

// All Index routes
exports.indexDeshboard = async (req, res) => {
    const q = `SELECT deals.*, normal_project_cat.category_id,normal_project_cat.npcid, task.task_name, normal_project_cat.cat_status, normal_project_subtask.stask_id, subtask.sub_task_name, normal_project_subtask.stask_status, normal_project_cat.project_status, normal_project_cat.dateofdeadline
    FROM deals 
    INNER JOIN normal_project_cat ON normal_project_cat.ndeal_id = deals.id 
    INNER JOIN task ON normal_project_cat.category_id = task.task_id 
    LEFT JOIN normal_project_subtask ON normal_project_subtask.ndeal_id = deals.id AND normal_project_subtask.category_id = normal_project_cat.category_id 
    LEFT JOIN subtask ON subtask.sub_task_id = normal_project_subtask.stask_id`
    await db.query(q, (err, results) => {
        // console.log(results);
        const grouped = {};
        const sentData = []
        if (!err) {
            results.forEach(element => {
                const key = element.id.toString();
                if (!grouped[key]) { grouped[key] = [] }
                grouped[key].push(element);
            })
            for (const key in grouped) { dataUnity(grouped[key]) }

            for (const key in grouped) { sentData.push(grouped[key][0]) }
            // res.status(200).send({data : sentData});
            // console.log(sentData)
            res.status(200).render('../views/admin/_index.ejs', { sentData })
        }
    })
}

exports.userManager = (req, res) => {
    const query = `SELECT employee.em_id, employee.name ,employee.number, employee.email,employee.job_role, employee.lastLoginAt ,employee.lastLogoutAt , employee.status 
    , COUNT(normal_project_employee.emid) FROM employee
      INNER JOIN normal_project_employee ON employee.em_id = normal_project_employee.emid
      GROUP BY normal_project_employee.emid;`
    db.query(query, (err, result, field) => {
        res.status(200).render('../views/admin/user.ejs')
    })
}

exports.settings = (req, res) => {
    const query = `select * from subtask;select * from mis_subtask;select splitvalue from amount_split`
    db.query(query, (err, result, field) => {
        res.status(200).render('../views/admin/settings.ejs', { data: result })
    })
}
exports.expense = (req, res) => {
    const query = `SELECT * FROM expenses;SELECT 'misc_project_finance' AS tName, SUM(totalamount) AS total_sum, SUM(amount_got) AS total_amount_got, SUM(CASE WHEN modeofpay='online' THEN amount_got ELSE 0 END) AS online_sum, SUM(CASE WHEN modeofpay='cash' THEN amount_got ELSE 0 END) AS cash_sum FROM misc_project_finance GROUP BY tName UNION ALL SELECT 'normal_projects_finance' AS tName, SUM(totalamount) AS total_sum, SUM(amount_got) AS total_amount_got, SUM(CASE WHEN modeofpay='online' THEN amount_got ELSE 0 END) AS online_sum, SUM(CASE WHEN modeofpay='cash' THEN amount_got ELSE 0 END) AS cash_sum FROM normal_projects_finance GROUP BY tName`
    db.query(query, (err, result, field) => {
        // res.status(200).render('../views/admin/expense.finance.ejs', { data: 'result' })
        res.send(result)

    })
}



//---Normal project form works-------
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
                    const taskTableData = [mdealId, Number(req.body.task), '30/09/2013']
                    const qTonpSt = `insert into misc_project_subtask (mdeal_id, mstask_id, dateofdeadline) values (?, ?, ?)`
                    conn.query(qTonpSt, taskTableData, (err4, response4) => {
                        if (err4) {
                            return conn.rollback(function () {
                                throw err4;
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
    })

}



//---normal projects controll-------
exports.renderNormalProjectFinance = async (req, res) => {
    const q = `SELECT deals.id, deals.reference_no, deals.city, deals.deal_name, deals.split, normal_projects_finance.task, task.task_name, normal_projects_finance.totalamount, normal_projects_finance.amount_got FROM normal_projects_finance INNER JOIN deals ON deals.id = normal_projects_finance.ndeal_id INNER JOIN task ON task.task_id = normal_projects_finance.task ORDER BY deals.deal_name;`
    await db.query(q, (err, result) => {
        if (!err) {
            const grouped = {};
            const sentData = []
            result.forEach(element => {
                const key = element.id.toString();
                if (!grouped[key]) { grouped[key] = [] }
                grouped[key].push(element);
            })
            for (const key in grouped) { sentData.push(grouped[key]) }
            // res.status(200).send(sentData);
            res.render('../views/admin/np.finance.ejs', { sentData });
        } else {
            res.status(500).send({ msg: "Internal server error!!!" })
        }
    })

}


exports.renderNormalProjectForm = async (req, res) => {
    const q = `select * from mis_subtask`
    await db.query(q, (err, results) => {
        if (!err) {
            res.status(200).render('../views/admin/np.form.ejs', { results })
        } else {
            res.status(500).send({ msg: "Some internal error has occurred !!" })
        }
    })

}


//---Misc project page Controll -----
exports.renderMiscProjectDashboard = async (req, res) => {
    const q = `select single_deal.reference_no, single_deal.contact, single_deal.email, single_deal.sdeal_name, single_deal.work_name, single_deal.agreement_amount, single_deal.total_price, mis_subtask.msub_task_name,
    misc_project_subtask.mstask_status
    from misc_project_subtask
    inner join single_deal on single_deal.sdid = misc_project_subtask.mdeal_id
    inner join mis_subtask on mis_subtask.msub_task_id = misc_project_subtask.mstask_id;`
    await db.query(q, (err, result) => {
        if (!err) {
            res.status(200).render('../views/admin/miscDash.ejs', { result })
        }
    })

}
exports.miscProjectFinance = async (req, res) => {
    const q = ``
    await db.query(q, (err, result) => {
        if (!err) {
            res.render('../views/admin/mp.finance.ejs', { data: 'adf' });
        } else {
            res.status(500).send({ msg: "Internal server error!!!" })
        }
    })

}
exports.renderMiscProjectForm = (req, res) => {
    res.render('../views/admin/normalProject.ejs')
}




