const db = require('../../config/db.config')
const dataUnity = require('../../utils/arrange')

// All Index routes are here
exports.indexDeshboard = async (req, res) => {
    if (req.session.isLoggedIn == true && req.session.role == 'employee') {
    const q = `SELECT deals.id ,deals.deal_name,deals.reference_no,deals.work_name,deals.np_deadline ,normal_project_cat.category_id,normal_project_cat.npcid, task.task_name, normal_project_cat.cat_status, normal_project_subtask.stask_id, subtask.sub_task_name, normal_project_subtask.stask_status, normal_project_cat.project_status, normal_project_cat.dateofdeadline
    FROM deals 
    INNER JOIN normal_project_cat ON normal_project_cat.ndeal_id = deals.id 
    INNER JOIN task ON normal_project_cat.category_id = task.task_id 
    LEFT JOIN normal_project_subtask ON normal_project_subtask.ndeal_id = deals.id AND normal_project_subtask.category_id = normal_project_cat.category_id 
    LEFT JOIN subtask ON subtask.sub_task_id = normal_project_subtask.stask_id`
    await db.query(q, (err, results) => {
        const grouped = {};
        const sentData = []
        if (!err) {
            results.forEach(element => {
                const key = element.id.toString();
                if (!grouped[key]) { grouped[key] = [] } grouped[key].push(element);
            })
            for (const key in grouped) { dataUnity(grouped[key]) }
            for (const key in grouped) { sentData.push(grouped[key][0]) }
            res.status(200).render('../views/employee/dashboard.ejs', { sentData,empId:req.session.empId })

        }
    })
}else(res.redirect('/'))

}

//---Misc project page Controll -----
exports.renderMiscProjectDashboard = async (req, res) => {
    if (req.session.isLoggedIn == true && req.session.role == 'employee') {
        const q = `select single_deal.sdid, single_deal.reference_no, single_deal.contact, single_deal.email, single_deal.sdeal_name,single_deal.mp_deadline, single_deal.work_name, single_deal.agreement_amount, single_deal.total_price, single_deal.city, misc_project_subtask.mstask_id, misc_project_subtask.mdeal_id, mis_subtask.msub_task_name, misc_project_subtask.mstask_status, misc_project_subtask.dateofdeadline 
        from misc_project_subtask 
        inner join single_deal on single_deal.sdid = misc_project_subtask.mdeal_id 
        inner join mis_subtask on mis_subtask.msub_task_id = misc_project_subtask.mstask_id order by single_deal.sdid desc;`
        await db.query(q, (err, result) => {
            if (!err) {
                res.status(200).render('../views/employee/miscDashboard.ejs', { result,empId:req.session.empId })
            }
        })

    }
}


exports.getCompletePandingWork = (req, res) => {
    const query = `SELECT COUNT(normal_project_cat.cat_status) AS total_cats, SUM(CASE WHEN normal_project_cat.cat_status = 'Completed' THEN 1 ELSE 0 END) AS num_cats_completed FROM normal_project_cat LEFT JOIN normal_project_employee ON normal_project_cat.npcid = normal_project_employee.npcid WHERE emid = ${req.params.id} ; SELECT ndeal_id FROM normal_project_employee WHERE emid=${req.params.id} GROUP BY ndeal_id;SELECT COUNT(misc_project_subtask.mstask_status) AS total_mtask, SUM(CASE WHEN misc_project_subtask.mstask_status = 'not started' THEN 1 ELSE 0 END) AS num_task_completed FROM misc_project_subtask LEFT JOIN misc_project_employee ON misc_project_employee.mstask_id = misc_project_subtask.mstask_id WHERE misc_project_employee.mpemid = ${req.params.id};SELECT mdeal_id FROM misc_project_employee WHERE mpemid=${req.params.id} GROUP BY mdeal_id;`
    db.query(query, (err, result, field) => {
        if (err) {
            res.status(500).send({ status: false, msg: ' Life!=success'+err })
        } else {
            res.status(200).send({ status: true, msg: 'Life success!', data: result })
            
        }
    })
}


  


