const db = require('../../config/db.config')
const dataUnity = require('../../utils/arrange')

// All Index routes
exports.indexDeshboard = async (req, res) => {
    if (req.session.isLoggedIn == true && req.session.role == 'employee') {
    const q = `SELECT deals.id ,deals.deal_name,deals.reference_no,deals.work_name, normal_project_cat.category_id,normal_project_cat.npcid, task.task_name, normal_project_cat.cat_status, normal_project_subtask.stask_id, subtask.sub_task_name, normal_project_subtask.stask_status, normal_project_cat.project_status, normal_project_cat.dateofdeadline
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
            res.status(200).render('../views/employee/dashboard.ejs', { sentData,id:req.session.id })
        }
    })
}else(res.redirect('/'))

}

//---Misc project page Controll -----
exports.renderMiscProjectDashboard = async (req, res) => {
    if (req.session.isLoggedIn == true && req.session.role == 'employee') {
        const q = `select single_deal.reference_no, single_deal.contact, single_deal.email, single_deal.sdeal_name, single_deal.work_name, single_deal.agreement_amount, single_deal.total_price, single_deal.city,  mis_subtask.msub_task_name, misc_project_subtask.mstask_status, misc_project_subtask.dateofdeadline
        from misc_project_subtask
        inner join single_deal on single_deal.sdid = misc_project_subtask.mdeal_id 
        inner join mis_subtask on mis_subtask.msub_task_id = misc_project_subtask.mstask_id;`
        await db.query(q, (err, result) => {
            if (!err) {
                res.status(200).render('../views/employee/miscDashboard.ejs', { result,id:req.session.id })
            }
        })

    }
}


// exports.settings = (req, res) => {
//     if (req.session.isLoggedIn == true && req.session.role == 'admin') {

//         const query = `select * from subtask;select * from mis_subtask;select * from amount_split`    
//         db.query(query, (err, result, field) => {
//             res.status(200).render('../views/admin/settings.ejs', { data: result })    
//         })
//     }
// }





