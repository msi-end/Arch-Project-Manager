const { log } = require('winston')
const databaseCon = require('../config/db.config')

exports.getTask = async (req, res) => {
   const q = "select * from task"
   await databaseCon.query(q, (err, results) => {
      if (!err) {
         res.status(200).send(results)
      } else {
         res.status(500).send({ msg: "Internal error occurs!" });
      }
   })
}
exports.setTask = async (req, res) => {
   const q = "INSERT INTO task (task_name) VALUES(?)"
   await databaseCon.query(q, [req.body.taskName], (err, results) => {
      if (!err) {
         res.status(200).send(results)
      } else {
         res.status(500).send({ msg: "Internal error occurs!" });
      }
   })
}

exports.getSubtask = async (req, res) => {
   const q = "select * from subtask"
   await databaseCon.query(q, (err, results) => {
      if (!err) {
         res.status(200).send(results)
      } else {
         res.status(500).send({ msg: "Internal error occurs!" });
      }
   })
}

exports.setSubtask = async (req, res) => {
   const q = "INSERT INTO subtask (sub_task_name) VALUES(?)"
   await databaseCon.query(q,[req.body.subTask],(err,results) => {
      if (!err) {
         res.status(200).send({ status: true, msg: 'Successfully added Sub-Task', data: results.insertId })
      } else {
         res.status(500).send({ status: false, msg: "Internal error occurs!" });
      }
   })
}
exports.updateSubtask = async (req, res) => {
   const q = `UPDATE subtask SET sub_task_name=?  WHERE sub_task_id =${req.params.id}`
   await databaseCon.query(q,[req.body.subTask],(err,results) => {
      if (!err) {
         res.status(200).send({ status: true, msg: 'Successfully Updated Sub-Task', data: results.insertId })
      } else {
         res.status(500).send({ status: false, msg: "Internal error occurs!" });
      }
   })
}


exports.getMiscTask = async (req, res) => {
   const q = "select * from mis_subtask"
   await databaseCon.query(q, (err, results) => {
      if (!err) {
         res.status(200).send(results)
      } else {
         res.status(500).send({ msg: "Internal error occurs!" });
      }
   })
}
exports.setMiscTask = async (req, res) => {
   const q = "INSERT INTO mis_subtask(msub_task_name) VALUE(?)"
   await databaseCon.query(q, [req.body.miscTask], (err, results) => {
      if (!err) {
         res.status(200).send({ status: true, msg: 'Successfully added Miscellaneous Task', data: results.insertId })
      } else {
         res.status(500).send({ status: false, msg: "Internal error occurs!" });
      }
   })
}
exports.updateMiscTask = async (req, res) => {
   const q = `UPDATE mis_subtask SET msub_task_name =? WHERE  msub_task_id=${req.params.id} `
   await databaseCon.query(q, [req.body.miscTask], (err, results) => {
      if (!err) {
         res.status(200).send({ status: true, msg: 'Successfully Updated Miscellaneous Task' })
      } else {
         res.status(500).send({ status: false, msg: "Internal error occurs!" });
      }
   })
}

exports.getAmountSplit = async (req, res) => {
   const q = "select splitvalue from amount_split"
   await databaseCon.query(q, (err, results) => {
      if (!err) {
         res.status(200).send({ status: true, msg: 'Successfully Retrived Splits',data:results })
      } else {
         res.status(500).send({ status: false, msg: "Internal error occurs!" });
      }
   })

}
exports.setAmountSplit = async (req, res) => {
   const q = "INSERT INTO amount_split (splitvalue) VALUES(?)"
   await databaseCon.query(q, [req.body.splitValue],
      (err, results) => {
         if (!err) {
            res.status(200).send({ status: true, msg: 'Successfully added Split Ratio', data: results.insertId })

         } else {
            res.status(500).send({ status: false, msg: "Internal error occurs!" });
         }
      })

}
exports.updateAmountSplit = async (req, res) => {
   const q = `UPDATE amount_split SET  splitvalue =?  WHERE cid =${req.params.id}`
   await databaseCon.query(q, [req.body.splitValue],
      (err, results) => {
         if (!err) {
            res.status(200).send({ status: true, msg: 'Successfully added Split Ratio', data: results.insertId })

         } else {
            res.status(500).send({ status: false, msg: "Internal error occurs!" });
         }
      })

}
