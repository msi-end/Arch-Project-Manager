const databaseCon = require('../config/db.config')

exports.gettaskDetails = async (req, res) => {
  const q = `SELECT deals.deal_name, task.task_name, normal_project_cat.cat_status, normal_project_cat.dateofdeadline
    FROM normal_project_cat 
    INNER JOIN deals ON deals.id = normal_project_cat.ndeal_id
    INNER JOIN task ON task.task_id = normal_project_cat.category_id
    WHERE ndeal_id = 1;`
  databaseCon.query(q, (err, results) => {
    if (!err) {
      res.send(200).send(results)
    }
  })
}




