const databaseCon = require('../config/db.config')


  //-------normal project employee-------------------

exports.getEmployListPerProject = async (req, res)=>{
    const {dealId, catId} = req.params
    const q = `SELECT deals.deal_name, employee.em_id, employee.name, employee.email,  normal_project_employee.category_id, normal_project_employee.ndeal_id
    FROM normal_project_employee
    INNER JOIN deals ON deals.id = normal_project_employee.ndeal_id
    INNER JOIN employee ON employee.em_id = normal_project_employee.emid
    WHERE ndeal_id = ${dealId} AND category_id = ${catId} ;`
    databaseCon.query(q, (err, results) => {
      if (!err) {
        res.status(200).send(results);
      }else{ res.status(500).send({msg : "Something went wrong!"}) }
   })
  }

  exports.getEmployListToaddOrRemove = async (req, res)=>{
    const q = `SELECT em_id, name, email FROM employee`
    databaseCon.query(q, (err, results) => {
      if (!err) {
        res.status(200).send(results);
      }else{ res.status(500).send({msg : "Something went wrong!"}) }
   })
  }

  exports.addEmployeeToProject = async (req, res)=>{
    const {dealId, catId, emid, task, project, assignDate} = req.body
    const q = `INSERT INTO normal_project_employee (ndeal_id, category_id, emid, dateofassign) VALUES (${dealId}, ${catId}, ${emid}, "${assignDate}");`
    databaseCon.query(q, (err1, data) => {
      if (!err1) {
        res.status(200).send(data);
        let q2 = `INSERT INTO emp_task_notify (emid, task, project, dateofnotify) VALUES (${emid}, "${task}", "${project}", "${assignDate}");`
        databaseCon.query(q2, (err2, results) => {
            if (!err2) {return;}else{ res.status(500).send({msg : err2}) }
        })
      }else{ res.status(500).send({msg : err1}) }
   })
  }

  
  exports.removeEmployeeToProject = async (req, res)=>{
    const {dealId, catId, emid, task, project, removeDate} = req.params
    const q = `DELETE FROM normal_project_employee WHERE ndeal_id = ${dealId} AND category_id = ${catId} AND emid = ${emid};`
    databaseCon.query(q, (err1, data) => {
      if (!err1) {
        res.status(200).send(data);
        let q2 = `INSERT INTO emp_task_notify (emid, task, project, dateofnotify) VALUES (${emid}, "${task}", "${project}", "${removeDate}");`
        databaseCon.query(q2, (err2, results) => {
            if (!err2) {return;}else{ res.status(500).send({msg : err2}) }
        })
      }else{ res.status(500).send({msg : "data not deleted ! some error occured..."}) }
   })
  }


  //-------normal project subtask-------------------

  exports.addNewSubTaskToProject = async(req, res) => {
    let q = `insert into normal_project_subtask set ?`
    databaseCon.query(q, req.body, (err, results)=>{
      if(!err){
        res.status(200).send(results)
      }else{
        res.status(500).send({msg : "not created sorry! try again later..."})
      }
    })
  }

  exports.updateSubtaskStatus = async()=>{
    let q = `update `
  }

