const dbcon = require('../config/db.config')


exports.getIncom_Exp_total = async (req, res) => {
  const q = `SELECT 'misc_project_finance' AS tName, SUM(amount_got) AS total_amount_got, SUM(CASE WHEN modeofpay='online' THEN amount_got ELSE 0 END) AS online_sum, SUM(CASE WHEN modeofpay='cash' THEN amount_got ELSE 0 END) AS cash_sum FROM misc_project_finance GROUP BY tName UNION ALL SELECT 'normal_projects_finance' AS tName, SUM(amount_got) AS total_amount_got, SUM(CASE WHEN modeofpay='online' THEN amount_got ELSE 0 END) AS online_sum, SUM(CASE WHEN modeofpay='cash' THEN amount_got ELSE 0 END) AS cash_sum FROM normal_projects_finance GROUP BY tName;SELECT  SUM(total_price) AS total_sum FROM single_deal  UNION ALL SELECT  SUM(total_price) AS total_sum FROM deals;`
  await dbcon.query(q, (err, result) => {
    if (err) {
      res.status(500).send({ status: false, msg: "some error occurred!.." });
    }
    res.status(200).send({ status: true, msg: "added successfully", data: result })
  })
}

//----------normal project finace----------------

exports.updateNpAmountRecieved = async (req, res) => {
  const q = `update normal_projects_finance set amount_got = ?, dateofpay = ?, modeofpay = ? where ndeal_id = ? and task = ?`
  await dbcon.query(q, [req.body.amount_got, req.body.dateofpay, req.body.modeofpay, req.body.ndeal_id, req.body.task], (err, result) => {
    if (err) {
      res.status(500).send("some error occurred!..");
    }
    res.status(200).send({ msg: "added successfully" })
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