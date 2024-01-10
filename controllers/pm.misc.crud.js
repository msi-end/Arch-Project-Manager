const dbcon = require('../config/db.config')

// misc project employee-------------
exports.addEmployeeToMisc = async (req, res) => {
  const { mdeal_id, mstask_id, mpemid, dateofassign, task, project } = req.body
  const q = `insert into misc_project_employee (mdeal_id, mstask_id, mpemid, dateofassign) values(${mdeal_id}, ${mstask_id}, ${mpemid}, '${dateofassign}')`
  await dbcon.query(q, req.body, (err, result) => {
    if (!err) {
      res.status(200).send(result)
      let q2 = `INSERT INTO emp_task_notify (emid, task, project, dateofnotify) VALUES (${mpemid}, "${task}", "${project}", "${dateofassign}");`
      dbcon.query(q2, (err2, results) => {
        if (!err2) { return; } else { res.status(500).send({ msg: err2 }) }
      })
    } else { res.status(500).send("Something went wrong!") }
  })
}

exports.removeEmployeeToMisc = async (req, res) => {
  const { mdeal_id, mstask_id, mpemid, dateofremove, task, project } = req.query
  const q = `delete from misc_project_employee where mdeal_id = ${mdeal_id} and mstask_id = ${mstask_id} and mpemid = ${mpemid}`
  await dbcon.query(q, req.body, (err, result) => {
    if (!err) {
      res.status(200).send(result)
      let q2 = `INSERT INTO emp_task_notify (emid, task, project, dateofnotify) VALUES (${mpemid}, "${task}", "${project}", "${dateofremove}");`
      dbcon.query(q2, (err2, results) => {
        if (!err2) { return; } else { res.status(500).send({ msg: err2 }) }
      })
    } else { res.status(500).send("Something went wrong!") }
  })
}


//-----misc project subtask ---------------
exports.updateMiscTaskStatus = async (req, res) => {
  const { mdeal_id, mstask_id, mstask_status, dateofstatus } = req.body
  let q = mstask_status != 'completed' ? `update misc_project_subtask set mstask_status ='${mstask_status}' where mdeal_id=${mdeal_id} and mstask_id=${mstask_id}` : `update misc_project_subtask set mstask_status ='${mstask_status}', dateofcomplete='${dateofstatus}' where mdeal_id=${mdeal_id} and mstask_id=${mstask_id}`
  await dbcon.query(q, (err, results) => {
    if (!err) {
      res.status(200).send("status updated successfully")
    } else { res.status(500).send(err) }
  })
}

exports.getProjectsStaus = (req, res) => {
  let q = 'SELECT deals.id ,normal_project_cat.project_status FROM `deals` INNER JOIN normal_project_cat on deals.id =normal_project_cat.ndeal_id GROUP BY normal_project_cat.ndeal_id;'
  dbcon.query(q, (err, result) => {
    if (!err) {
      res.status(200).send({ status: true, msg: 'Successfully data retrieve', data: result})

    } else {res.status(500).send({ status: false, msg: "Internal error occurs!" });
  }
  })
}
