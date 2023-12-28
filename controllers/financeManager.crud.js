const dbcon = require('../config/db.config')


//----------normal project finace----------------

exports.updateNpAmountRecieved = async (req, res) => {
  const q = `update normal_projects_finance set amount_got = ?, dateofpay = ?, modeofpay = ? where ndeal_id = ? and task = ?`
  await dbcon.query(q, [req.body.amount_got, req.body.dateofpay, req.body.modeofpay, req.body.ndeal_id, req.body.task], (err, result) => {
    if (err) {
      res.status(500).send("some error occurred!..");
    }
    res.status(200).send({msg: "added successfully"})
  })
}

//-----------Misc project finance -----------------

exports.updateMpAmountGot = async (req, res) => {
  const q = ``
  await dbcon.query(q, (err, result) => {
    if (err) {
      res.status(500).send("some error occurred!..");
    }
    res.status(200).send("added successfully...")
  })
}