const databaseCon = require('../config/db.config')
const express = require('express')
const router = express.Router();

router.get('/get-task', async (req, res) => {
   const q = "select * from task"
   await databaseCon.query(q, (err, results) => {
     if (!err) {
        res.status(200).send(results)
     }else{
        res.status(500).send({msg: "Internal error occurs!"});
     }
   })
})

router.get('/get-subtask', async (req, res) => {
    const q = "select * from subtask"
    await databaseCon.query(q, (err, results) => {
      if (!err) {
         res.status(200).send(results)
      }else{
         res.status(500).send({msg: "Internal error occurs!"});
      }
    })
 })

 router.get('/get-amountsplit', async (req, res) => {
   const q = "select splitvalue from amount_split"
   await databaseCon.query(q, (err, results) => {
     if (!err) {
        res.status(200).send(results)
     }else{
        res.status(500).send({msg: "Internal error occurs!"});
     }
   })
})

module.exports = router;