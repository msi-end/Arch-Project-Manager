const db = require('../config/db.config')


exports.GetNotification = (req, res) => {
    let query=`SELECT notid,title,dateofnotify,status FROM emp_task_notify WHERE emid in (0) AND status !='removed'`
    db.query(query,(err,result)=>{
        if (!err) {
            res.status(200).send({ status: true, msg: 'Success', data: result })
         } else {
            res.status(500).send({ status: false, msg: "Internal error occurs!" });
         }
    })

}
exports.SetNotification = (req, res) => {
    console.log(req.body, req.body.id);
    let query=`INSERT INTO emp_task_notify(emid,title , dateofnotify) VALUES(?,?,?);`
    db.query(query,[req.body.id,req.body.title,req.body.date],(err,result)=>{
        if (!err) {
            res.status(200).send({ status: true, msg: 'Success', data: result })
         } else {
            res.status(500).send({ status: false, msg: "Internal error occurs! or Duplicate Row" });
         }
    })

}
exports.UpdateNotification = (req, res) => {
    let query=`UPDATE emp_task_notify SET status='${req.query.act}' WHERE notid=?`
    db.query(query,[req.params.id],(err,result)=>{
        if (!err) {
            res.status(200).send({ status: true, msg: 'Success' })
         } else {
            res.status(500).send({ status: false, msg: "Internal error occurs!" });
         }
    })

}