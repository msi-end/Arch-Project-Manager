const databaseCon = require('../config/db.config.js')
const { EmailSender } = require('../utils/emailSender.js')
//-------normal project employee-------------------

exports.getEmployListPerProject = async (req, res) => {
  const { dealId, catId } = req.params
  const q = `SELECT deals.deal_name, employee.em_id, employee.name, employee.email,  normal_project_employee.category_id, normal_project_employee.ndeal_id
    FROM normal_project_employee
    INNER JOIN deals ON deals.id = normal_project_employee.ndeal_id
    INNER JOIN employee ON employee.em_id = normal_project_employee.emid
    WHERE ndeal_id = ${dealId} AND category_id = ${catId} ;`
  databaseCon.query(q, (err, results) => {
    if (!err) {
      res.status(200).send(results);
    } else { res.status(500).send({ msg: "Something went wrong!" }) }
  })
}

exports.getEmployListToaddOrRemove = async (req, res) => {
  const q = `SELECT em_id, name, email FROM employee`
  databaseCon.query(q, (err, results) => {
    if (!err) {
      res.status(200).send(results);
    } else { res.status(500).send({ msg: "Something went wrong!" }) }
  })
}

exports.addEmployeeToProject = async (req, res) => {
  const { ndeal_id, npcid, category_id, emid, title, assignDate } = req.body
  if (req.body.emid && typeof req.body.emid === "string") {
    const q = `INSERT INTO normal_project_employee (ndeal_id, npcid ,category_id, emid, dateofassign) VALUES (${ndeal_id},${Number(npcid)}, ${category_id}, ${emid}, "${assignDate}");`
    await databaseCon.query(q, async (err1, data) => {
      if (!err1) {
        await EmailSender('add', 'normal', { ndeal_id: ndeal_id, category_id: category_id, emid: emid });
        let q2 = `INSERT INTO emp_task_notify(emid, title, dateofnotify) VALUES(?,?,?);`
        databaseCon.query(q2, [emid, title, assignDate], (err2, results) => {
          if (!err2) { res.status(200).send({ msg: 'success' }); } else { res.status(500).send({ msg: err2 }) }
        })
      } else { res.status(500).send({ msg: err1 }) }
    })
  } else if (req.body.emid) {
    const np_emp_data = []
    const np_emp_notify = []
    req.body.emid.forEach((el) => { np_emp_data.push([req.body.ndeal_id, req.body.npcid, req.body.category_id, el, assignDate]) })
    req.body.emid.forEach((el) => { np_emp_notify.push([el, title + '#' + el, assignDate]) })
    const q = `INSERT INTO normal_project_employee (ndeal_id, npcid, category_id, emid, dateofassign) VALUES ?`
    await databaseCon.query(q, [np_emp_data], (err1, data) => {
      if (!err1) {
        // np_emp_data.forEach(async (e) => {
        //   await EmailSender('add', 'normal', { ndeal_id: e[0], category_id: e[2], emid: e[3] });
        // })
        let q2 = `INSERT INTO emp_task_notify(emid, title, dateofnotify) VALUES ?;`
        databaseCon.query(q2, [np_emp_notify], (err2, results) => {
          if (!err2) { res.status(200).send(data); }
          else {
            console.log(err2)
            res.status(500).send({ msg: err2 })
          }
        })
      } else {
        res.status(500).send({ msg: 'error occurred' })
      }
    })
  } else {
    res.status(500).send({ msg: 'error occurred' })
  }

}

exports.removeEmployeeToProject = async (req, res) => {
  const { dealId, catId, emid, title, removeDate } = req.query;
  const q = `DELETE FROM normal_project_employee WHERE ndeal_id = ${dealId} AND category_id = ${catId} AND emid = ${emid};`
  await databaseCon.query(q, async (err1, data) => {
    if (!err1) {
      res.status(200).send(data);
      await EmailSender('remove', 'normal', { ndeal_id: dealId, category_id: catId, emid: emid });
      let q2 = `INSERT INTO emp_task_notify(emid, title, dateofnotify) VALUES(?,?,?);`
      databaseCon.query(q2, [emid, title, removeDate], (err2, results) => {
        if (!err2) { return; } else { res.status(500).send({ msg: err2 }) }
      })
    } else { res.status(500).send({ msg: "data not deleted ! some error occured..." }) }
  })
}

//-------normal project subtask-------------------

exports.addNewSubTaskToProject = async (req, res) => {
  if (req.body.stask_id && typeof req.body.stask_id === "string") {
    const q = `insert into normal_project_subtask (ndeal_id, category_id, stask_id) values(${req.body.ndeal_id}, ${req.body.category_id}, ${req.body.stask_id})`
    await databaseCon.query(q, (err, results) => {
      if (!err) {
        res.status(200).send(results)
      } else { res.status(500).send({ msg: "not created sorry! try again later..." }) }
    })
  } else if (req.body.stask_id) {
    const sub_task_data = []
    req.body.stask_id.forEach((el) => {
      sub_task_data.push([req.body.ndeal_id, req.body.category_id, el])
    })
    const q = `insert into normal_project_subtask (ndeal_id, category_id, stask_id) values ?`
    await databaseCon.query(q, [sub_task_data], (err, results) => {
      if (!err) {
        res.status(200).send(results)
      } else { res.status(500).send({ msg: "not created sorry! try again later..." }) }
    })
  }

}

exports.updateSubtaskStatus = async (req, res) => {
  const { status, dealId, catId, staskId } = req.body;
  let q = `UPDATE normal_project_subtask SET stask_status = '${status}' WHERE ndeal_id = ${dealId} AND category_id = ${catId} AND stask_id = ${staskId};`
  databaseCon.query(q, (err, result) => {
    if (!err) {
      res.status(200).send(result)
    } else { res.status(500).send({ msg: "not updated properly! try again later..." }) }
  })
}

exports.deleteSubtask = async (req, res) => {
  const { dealId, catId, staskId } = req.query;
  let q = `DELETE FROM normal_project_subtask
    WHERE ndeal_id = ${dealId} AND category_id = ${catId} AND stask_id = ${staskId};`
  databaseCon.query(q, (err, result) => {
    if (!err) {
      res.status(200).send(result)
    } else { res.status(500).send({ msg: "not deleted! try again later..." }) }
  })
}

//-------normal project task-------------------

exports.addNewTaskToProject = async (req, res) => {
  let q = `insert into normal_project_cat set ?`
  databaseCon.query(q, req.body, (err, results) => {
    if (!err) {
      res.status(200).send(results)
    } else { res.status(500).send({ msg: "not created sorry! try again later..." }) }
  })
}

exports.updatetaskStatus = async (req, res) => {
  const { status, dealId, catId } = req.body;
  let q = `UPDATE normal_project_cat SET cat_status = '${status}',project_status = '${status}' WHERE ndeal_id = ${dealId} AND category_id = ${catId}`
  databaseCon.query(q, (err, result) => {
    if (!err) {
      res.status(200).send(result)
    } else { res.status(500).send({ msg: "not updated properly! try again later..." }) }
  })
}

exports.updatetaskDeadline = async (req, res) => {
  const { dealId, catId, date } = req.body;
  let q = `UPDATE normal_project_cat SET dateofdeadline = '${date}' WHERE ndeal_id = ${dealId} AND category_id = ${catId}`
  databaseCon.query(q, (err, result) => {
    if (!err) {
      res.status(200).send({ msg: 'deadline updated' })
    } else { res.status(500).send({ msg: "not updated properly! try again later..." }) }
  })
}

exports.deleteTask = async (req, res) => {
  const { dealId, catId, staskId } = req.query;
  let q = `DELETE FROM normal_project_cat
    WHERE ndeal_id = ${dealId} AND category_id = ${catId};`
  databaseCon.query(q, (err, result) => {
    if (!err) {
      res.status(200).send(result)
    } else { res.status(500).send({ msg: "not deleted! try again later..." }) }
  })
}

exports.getProjectsStaus = (req, res) => {
  let q = `SELECT id, CASE WHEN COUNT(DISTINCT project_status) = 1 AND MAX(project_status) = 'completed' THEN 'completed' ELSE 'pending' END AS project_status FROM ( SELECT deals.id, normal_project_cat.project_status FROM deals INNER JOIN normal_project_cat ON deals.id = normal_project_cat.ndeal_id ) AS subquery GROUP BY id`
  databaseCon.query(q, (err, result) => {
    if (!err) {
      res.status(200).send({ status: true, msg: 'Successfully data retrieve', data: result })

    } else {
      res.status(500).send({ status: false, msg: "Internal error occurs!" });
    }
  })
}
exports.getCheckCompletedUnpaid = async (req, res) => {
  const { dealId, catId } = req.params
  const q = `SELECT * FROM( SELECT deals.id as id, deals.deal_name,deals .reference_no , deals.total_price,SUM(normal_projects_finance.amount_got) as amount_got FROM deals INNER JOIN normal_projects_finance ON normal_projects_finance.ndeal_id=deals.id) AS one INNER JOIN (SELECT id, CASE WHEN COUNT(DISTINCT project_status) = 1 AND MAX(project_status) = 'completed' THEN 'completed' ELSE 'pending' END AS project_status FROM ( SELECT deals.id, normal_project_cat.project_status FROM deals INNER JOIN normal_project_cat ON deals.id = normal_project_cat.ndeal_id ) AS subquery GROUP BY id) AS two on one.id =two.id WHERE project_status='completed' `
  await databaseCon.query(q, (err, results) => {
    if (!err) {
      res.status(200).send(results);
    } else { res.status(500).send({ msg: "Something went wrong!" }) }
  })
}

// Update Normal and Misc task Controllers---

exports.getDataToUpdate = async (req, res) => {
  let q = req.query.type == "normal" ? `SELECT * FROM deals WHERE id = ${req.query.id}` : `SELECT * FROM single_deal WHERE sdid = ${req.query.id}`
  await databaseCon.query(q, (err, results) => {
    if (!err) {
      res.status(200).send({ results })
    } else {
      res.status(500).send({ msg: "Internal Server Error!" })
    }
  })
}

exports.UpdateNormalProjectData = async (req, res) => {
  const q = `UPDATE deals SET deal_name=?, reference_no=?, contact=?, work_name=?, email=?, city=?, total_price=?,split=?, np_deadline=? WHERE id=${req.body.dealid}`;
  await databaseCon.query(q, [req.body.name, req.body.eref, req.body.econtact, req.body.ework, req.body.egmail, req.body.ecity, req.body.etotal, req.body.split, req.body.edeadline], async (err, result) => {
    if (!err) {
      const q2 = `UPDATE normal_projects_finance SET totalamount = ? WHERE ndeal_id = ${req.body.dealid}`;
      await databaseCon.query(q2, [req.body.etotal], (err2, result) => {
        if (!err2) {
          res.status(200).send({ msg: "successfull update!" })
        } else {
          res.status(500).send({ msg: "Something Error Occured!" }); return;
        }
      })
    } else { res.status(500).send({ msg: "Something Error Occured!" }) }
  })

}

exports.UpdateMiscProjectData = async (req, res) => {
  const q = `UPDATE single_deal SET sdeal_name=?, reference_no=?, contact=?, agreement_amount=?, work_name=?, email=?, city=?, total_price=?, mp_deadline=? WHERE sdid=${req.body.dealid}`;
  await databaseCon.query(q, [req.body.name, req.body.eref, req.body.econtact, req.body.eagre, req.body.ework, req.body.egmail, req.body.ecity, req.body.etotal, req.body.edeadline], async (err, result) => {
    if (!err) {
      const q2 = `UPDATE misc_project_finance SET totalamount = ? WHERE mdeal_id = ${req.body.dealid}`;
      await databaseCon.query(q2, [req.body.etotal], (err2, result) => {
        if (!err2) {
          res.status(200).send({ msg: "successfull update!" })
        } else {
          console.log(err2);
          res.status(500).send({ msg: "Something Error Occured!" }); return;
        }
      })
    } else { console.log(err); res.status(500).send({ msg: "Something Error Occured!" }) }
  })
}
exports.DeleteNormalProjectData = async (req, res) => {
  const q = `DELETE FROM deals WHERE id =? `;
  await databaseCon.query(q, [ req.params.id], async (err, result) => {
    if (!err) {
      res.status(200).send({ status: true, msg: 'Successfully data Deletd' })
    } else {
      res.status(500).send({ status: flase, msg: 'Successfully data Deletd'+err })
    }
  })
}




