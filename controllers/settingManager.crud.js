const databaseCon = require('../config/db.config')
const express = require('express')
const router = express.Router();

exports.getTasks = async (req, res) => {
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
   await databaseCon.query(q,[req.body.taskName] ,(err, results) => {
      if (!err) {
         res.status(200).send(results)
      } else {
         res.status(500).send({ msg: "Internal error occurs!" });
      }
   })
}

exports.getSubtask= async (req, res) => {
   const q = "select * from subtask"
   await databaseCon.query(q, (err, results) => {
      if (!err) {
         res.status(200).send(results)
      } else {
         res.status(500).send({ msg: "Internal error occurs!" });
      }
   })
}
exports.setSubtask= async (req, res) => {
   const q = "INSERT INTO subtask (task_id,sub_task_name) VALUES(?,?)"
   await databaseCon.query(q,[req.body.taskId,req.body.subtaskName], (err, results) => {
      if (!err) {
         res.status(200).send(results)
      } else {
         res.status(500).send({ msg: "Internal error occurs!" });
      }
   })
}
exports.getAmountSplit= async (req, res) => {
   const q = "select splitvalue from amount_split"
   await databaseCon.query(q, (err, results) => {
      if (!err) {
         res.status(200).send(results)
      } else {
         res.status(500).send({ msg: "Internal error occurs!" });
      }
   })

}
exports.setAmountSplit= async (req, res) => {
   const q = "INSERT INTO amount_split (splitvalue) VALUES(?)"
   await databaseCon.query(q,[req.body.slitvalue], (err, results) => {
      if (!err) {
         res.status(200).send(results)
      } else {
         res.status(500).send({ msg: "Internal error occurs!" });
      }
   })

}

module.exports = router;