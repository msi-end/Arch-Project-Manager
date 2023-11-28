const databaseCon = require('../../../config/db.config')

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
      }else{
        res.status(500).send({msg : "Something went wrong!"})
      }
   })
  }

  exports.getEmployListToaddOrRemove = async (req, res)=>{
    const q = `SELECT em_id, name, email FROM employee`
    databaseCon.query(q, (err, results) => {
      if (!err) {
        res.status(200).send(results);
      }else{
        res.status(500).send({msg : "Something went wrong!"})
      }
   })
  }

  exports.addEmployeeToProject = async (req, res)=>{
    const {dealId, catId, emid, assignDate} = req.body
    const q = `INSERT INTO normal_project_employee (ndeal_id, category_id, emid, dateofassign) VALUES (${dealId}, ${catId}, ${emid}, "${assignDate}");`
    databaseCon.query(q, (err, results) => {
      if (!err) {
        res.status(200).send(results);
      }else{
        res.status(500).send({msg : "data not inserted!"})
      }
   })
  }

  
  exports.removeEmployeeToProject = async (req, res)=>{
    const {dealId, catId, emid} = req.body
    const q = `DELETE FROM normal_project_employee WHERE ndeal_id = ${dealId} AND category_id = ${catId} AND emid = ${emid};`
    databaseCon.query(q, (err, results) => {
      if (!err) {
        res.status(200).send(results);
      }else{
        res.status(500).send({msg : "data not deleted ! some error occured..."})
      }
   })
  }