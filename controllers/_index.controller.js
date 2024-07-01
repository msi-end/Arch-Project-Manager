const db = require('../config/db.config')
const dataUnity = require('../utils/arrange')

// 


// SELECT deals.*, normal_project_cat.category_id,normal_project_cat.npcid, task.task_name, normal_project_cat.cat_status, normal_project_subtask.stask_id, subtask.sub_task_name, normal_project_subtask.stask_status, normal_project_cat.project_status, normal_project_cat.dateofdeadline FROM deals INNER JOIN normal_project_cat ON normal_project_cat.ndeal_id = deals.id INNER JOIN task ON normal_project_cat.category_id = task.task_id LEFT JOIN normal_project_subtask ON normal_project_subtask.ndeal_id = deals.id AND normal_project_subtask.category_id = normal_project_cat.category_id LEFT JOIN subtask ON subtask.sub_task_id = normal_project_subtask.stask_id ORDER BY deals.id DESC;

// SELECT deals.*, normal_project_cat.category_id,normal_project_cat.npcid, task.task_name, normal_project_cat.cat_status, normal_project_subtask.stask_id, subtask.sub_task_name, normal_project_subtask.stask_status, normal_project_cat.project_status, normal_project_cat.dateofdeadline FROM deals INNER JOIN normal_project_cat ON normal_project_cat.ndeal_id = deals.id INNER JOIN task ON normal_project_cat.category_id = task.task_id LEFT JOIN normal_project_subtask ON normal_project_subtask.ndeal_id = deals.id AND normal_project_subtask.category_id = normal_project_cat.category_id LEFT JOIN subtask ON subtask.sub_task_id = normal_project_subtask.stask_id WHERE deals.id BETWEEN (SELECT MAX(id)-${Number(req.query.to) * 20} FROM deals) AND (SELECT MAX(id)-${Number(req.query.from) * 20} FROM deals) ORDER BY deals.id DESC;

// ---- All Index routes here ----
exports.indexDeshboard = async (req, res) => {
    if (req.session.isLoggedIn == true && req.session.role == 'admin') {
        const q = `SELECT deals.*, normal_project_cat.category_id,normal_project_cat.npcid, task.task_name, normal_project_cat.cat_status, normal_project_subtask.stask_id, subtask.sub_task_name, normal_project_subtask.stask_status, normal_project_cat.project_status, normal_project_cat.dateofdeadline FROM (SELECT * FROM deals ORDER BY id DESC LIMIT ${Number(req.query.from) * 10}, 10) AS deals INNER JOIN normal_project_cat ON normal_project_cat.ndeal_id = deals.id INNER JOIN task ON normal_project_cat.category_id = task.task_id LEFT JOIN normal_project_subtask ON normal_project_subtask.ndeal_id = deals.id AND normal_project_subtask.category_id = normal_project_cat.category_id LEFT JOIN subtask ON subtask.sub_task_id = normal_project_subtask.stask_id ORDER BY deals.id DESC`
        await db.query(q, (err, results) => {
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
                const sortedData = sentData.sort((a, b) => b.id - a.id);
                // console.log(sortedData)
                res.status(200).render('../views/admin/_index.ejs', { sortedData })
            }
        })
    } else { res.redirect('/admin/login') }

}

exports.userManager = (req, res) => {
    if (req.session.isLoggedIn == true && req.session.role == 'admin') {
        const query = `SELECT em_id, name ,number, email,job_role, lastLoginAt ,lastLogoutAt , status FROM employee`
        // INNER JOIN normal_project_employee ON employee.em_id = normal_project_employee.emid
        // GROUP BY normal_project_employee.emid;
        db.query(query, (err, result, field) => {
            res.status(200).render('../views/admin/user.ejs', { data: result })
        })
    }
}

exports.settings = (req, res) => {
    if (req.session.isLoggedIn == true && req.session.role == 'admin') {
        const query = `select * from subtask;select * from mis_subtask;select * from amount_split`
        db.query(query, (err, result, field) => {
            res.status(200).render('../views/admin/settings.ejs', { data: result })
        })
    }
}
exports.expense = (req, res) => {
    let months = new Date().getMonth() + 1
    let year = new Date().getFullYear()
    if (req.session.isLoggedIn == true && req.session.role == 'admin') {
        const query = `SELECT * FROM expenses WHERE date LIKE '%${months}/${year}%' ORDER BY id DESC ;SELECT 'misc_project_finance' AS tName, SUM(amount_got) AS total_amount_got, SUM(CASE WHEN modeofpay='online' THEN amount_got ELSE 0 END) AS online_sum, SUM(CASE WHEN modeofpay='cash' THEN amount_got ELSE 0 END) AS cash_sum FROM misc_project_finance GROUP BY tName UNION ALL SELECT 'normal_projects_finance' AS tName, SUM(amount_got) AS total_amount_got, SUM(CASE WHEN modeofpay='online' THEN amount_got ELSE 0 END) AS online_sum, SUM(CASE WHEN modeofpay='cash' THEN amount_got ELSE 0 END) AS cash_sum FROM normal_projects_finance GROUP BY tName;SELECT  SUM(total_price) AS total_sum FROM single_deal  UNION ALL SELECT  SUM(total_price) AS total_sum FROM deals;SELECT SUM(CASE WHEN md_type ='cash' THEN amount ELSE 0 END) AS cash_expenses, sum(case when md_type ='online' THEN amount ELSE 0 END) as online_expenses FROM expenses;`
        db.query(query, (err, result, field) => {
            res.status(200).render('../views/admin/expense.finance.ejs', { data: result })
            // res.send(result)

        })
    }
}


//---Normal project form works-------
exports.insertNewNormalDeal = async (req, res) => {
    if (req.session.isLoggedIn == true && req.session.role == 'admin') {
        db.getConnection((err0, conn) => {
            if (err0) throw err0;
            conn.beginTransaction(function (err) {
                if (err) {
                    res.status(500).send({ msg: "something error occured" })
                    console.log(err);
                    return;
                }
                const dealsTableData = [req.body.name, req.body.rfNo, req.body.contactNo, req.body.agreementAm, req.body.workName, req.body.email, req.body.city, req.body.TotalAm, req.body.npdeadline, req.body.split]

                const qTodeal = `insert into deals (deal_name, reference_no, contact, agreement_amount, work_name, email, city, total_price, np_deadline, split) values (?,?,?,?,?,?,?,?,?,?)`

                conn.query(qTodeal, dealsTableData, (err1, response) => {
                    if (err1) {
                        res.status(500).send({ msg: "something error occured" })
                        return conn.rollback(function () {
                            throw err1;
                        })
                    }

                    const dealId = response.insertId
                    const catTableData = []
                    req.body.task.forEach((ask) => {
                        const taskNum = Number(ask)
                        catTableData.push([dealId, taskNum, 'not set yet'])
                    })
                    const qTonpc = `insert into normal_project_cat (ndeal_id, category_id, dateofdeadline) values ?`
                    conn.query(qTonpc, [catTableData], (err2, response2) => {
                        if (err2) {
                            res.status(500).send({ msg: "something error occured" })
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
                                res.status(500).send({ msg: "something error occured" })
                                return conn.rollback(function () {
                                    throw err3;
                                })
                            }
                            conn.commit(function (errC) {
                                if (errC) {
                                    res.status(500).send({ msg: "something error occured" })
                                    return conn.rollback(function () {
                                        throw errC;
                                    });
                                }
                                res.status(200).send({ msg: "new deal entered successfully..😍" })
                            })
                        })
                    })

                })
                conn.release();
            })
        })


    }
}

exports.insertNewMiscDeal = async (req, res) => {
    if (req.session.isLoggedIn == true && req.session.role == 'admin') {
        db.getConnection((err0, conn) => {
            if (err0) throw err0;
            conn.beginTransaction(function (err) {
                if (err) {
                    res.status(500).send({ msg: "something error occured" })
                    return;
                }
                const miscDealsTableData = [req.body.name, req.body.rfNo, req.body.contactNo, req.body.agreementAm, req.body.workName, req.body.email, req.body.city, req.body.TotalAm, req.body.mpdeadline]

                const qTodeal = `insert into single_deal (sdeal_name, reference_no, contact, agreement_amount, work_name, email, city, total_price, mp_deadline) values (?,?,?,?,?,?,?,?,?)`

                conn.query(qTodeal, miscDealsTableData, (err1, response) => {
                    if (err1) {
                        return conn.rollback(function () {
                            throw err1;
                        })
                    }
                    const mdealId = response.insertId
                    const finTableData = [mdealId, req.body.TotalAm, Number(req.body.task), req.body.agreementAm]
                    const qTonpf = `insert into misc_project_finance (mdeal_id, totalamount, task, amount_got) values (?, ?, ?, ?)`
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
                                res.status(200).send({ msg: "new misc deal entered successfully..😍" })
                            })

                        })
                    })

                })

            })
        })
    }
}



//---normal projects controll-------
// SELECT deals.id, deals.reference_no, deals.city, deals.deal_name, deals.split, normal_projects_finance.task, task.task_name, normal_projects_finance.totalamount, normal_projects_finance.amount_got, normal_projects_finance.modeofpay FROM normal_projects_finance INNER JOIN deals ON deals.id = normal_projects_finance.ndeal_id INNER JOIN task ON task.task_id = normal_projects_finance.task;
exports.renderNormalProjectFinance = async (req, res) => {
    if (req.session.isLoggedIn == true && req.session.role == 'admin') {
        const q = `SELECT deals.id, deals.reference_no, deals.city, deals.deal_name, deals.split, normal_projects_finance.task, task.task_name, normal_projects_finance.totalamount, normal_projects_finance.amount_got, normal_projects_finance.modeofpay FROM normal_projects_finance INNER JOIN deals ON deals.id = normal_projects_finance.ndeal_id INNER JOIN task ON task.task_id = normal_projects_finance.task WHERE deals.id BETWEEN (SELECT MAX(id)-${Number(req.query.to) * 20} FROM deals) AND (SELECT MAX(id)-${Number(req.query.from) * 20} FROM deals) ORDER BY deals.id DESC;`
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
                const sortedData = sentData.sort((a, b) => b[0].id - a[0].id);
                // console.log(sortedData)
                res.render('../views/admin/np.finance.ejs', { sortedData });
            } else {
                res.status(500).send({ msg: "Internal server error!!!" })
            }
        })

    }
}

exports.renderNormalProjectForm = async (req, res) => {
    if (req.session.isLoggedIn == true && req.session.role == 'admin') {
        const q = `select * from mis_subtask`
        await db.query(q, (err, results) => {
            if (!err) {
                res.status(200).render('../views/admin/np.form.ejs', { results })
            } else {
                res.status(500).send({ msg: "Some internal error has occurred !!" })
            }
        })

    }
}

//---Misc project page Controll -----
exports.renderMiscProjectDashboard = async (req, res) => {
    if (req.session.isLoggedIn == true && req.session.role == 'admin') {
        const q = `select single_deal.sdid, single_deal.reference_no, single_deal.contact, single_deal.email, single_deal.sdeal_name, single_deal.work_name, single_deal.agreement_amount, single_deal.total_price, single_deal.city, single_deal.mp_deadline, misc_project_subtask.mstask_id, misc_project_subtask.mdeal_id, mis_subtask.msub_task_name, misc_project_subtask.mstask_status, misc_project_subtask.dateofdeadline 
        from misc_project_subtask 
        inner join single_deal on single_deal.sdid = misc_project_subtask.mdeal_id 
        inner join mis_subtask on mis_subtask.msub_task_id = misc_project_subtask.mstask_id order by single_deal.sdid desc;`
        await db.query(q, (err, result) => {
            if (!err) {
                res.status(200).render('../views/admin/miscDash.ejs', { result })
            }
        })

    }
}
exports.miscProjectFinance = async (req, res) => {
    if (req.session.isLoggedIn == true && req.session.role == 'admin') {
        const q = `select single_deal.sdid, single_deal.reference_no, single_deal.sdeal_name, single_deal.work_name, single_deal.city, single_deal.total_price, single_deal.agreement_amount, mis_subtask.*, misc_project_finance.*
        from misc_project_finance 
        inner join single_deal on single_deal.sdid = misc_project_finance.mdeal_id 
        inner join mis_subtask on mis_subtask.msub_task_id = misc_project_finance.task order by single_deal.sdid desc;`
        await db.query(q, (err, result) => {
            if (!err) {
                res.status(200).render('../views/admin/mp.finance.ejs', { result });
            } else {
                res.status(500).send({ msg: "Internal server error!!!" })
            }
        })

    }
}
exports.renderMiscProjectForm = (req, res) => {
    if (req.session.isLoggedIn == true && req.session.role == 'admin') {
        res.render('../views/admin/normalProject.ejs')
    }
}



