const dbcon = require("../config/db.config");

exports.getIncom_Exp_total = async (req, res) => {
  const q = ` SELECT 'normal_projects_finance' AS tName, SUM(amount_got) AS total_amount_got, SUM(CASE WHEN modeofpay='online' THEN amount_got ELSE 0 END) AS online_sum, SUM(CASE WHEN modeofpay='cash' THEN amount_got ELSE 0 END) AS cash_sum FROM normal_projects_finance GROUP BY tName UNION ALL SELECT 'misc_project_finance' AS tName, SUM(amount_got) AS total_amount_got, SUM(CASE WHEN modeofpay='online' THEN amount_got ELSE 0 END) AS online_sum, SUM(CASE WHEN modeofpay='cash' THEN amount_got ELSE 0 END) AS cash_sum FROM misc_project_finance GROUP BY tName;SELECT  SUM(total_price) AS total_sum FROM single_deal  UNION ALL SELECT  SUM(total_price) AS total_sum FROM deals;`;
  await dbcon.query(q, (err, result) => {
    if (err) {
      res.status(500).send({ status: false, msg: "some error occurred!.." });
    }
    res
      .status(200)
      .send({ status: true, msg: "added successfully", data: result });
  });
};

//----------normal project finace----------------
// update normal_projects_finance set amount_got = ?, dateofpay = ?, modeofpay = ? where ndeal_id = ? and task = ?

exports.updateNpAmountRecieved = async (req, res) => {
  const q = `insert into normal_projects_finance (ndeal_id, task, amount_got, dateofpay, modeofpay) values(?, ?, ?, ?, ?)`;
  await dbcon.query(
    q,
    [
      req.body.ndeal_id,
      req.body.task,
      req.body.amount_got,
      req.body.dateofpay,
      req.body.modeofpay,
    ],
    (err, result) => {
      if (err) {
        res.status(500).send("some error occurred!..");
      }
      res.status(200).send({ msg: "added successfully" });
    }
  );
};

//-----------Misc project finance -----------------

exports.updateMpAmountGot = async (req, res) => {
  const q1 = `update single_deal set agreement_amount	 = ? where sdid = ?`;
  await dbcon.query(
    q1,
    [req.body.amount_got, req.body.mdealid],
    async (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("some error occurred!..");
        return;
      }
      const q2 = `INSERT INTO misc_project_finance (amount_got, dateofpay, modeofpay, mdeal_id, task) VALUES (?, ?, ?, ?, ?)`;
      await dbcon.query(
        q2,
        [
          req.body.amount_got,
          req.body.dateofpay,
          req.body.modeofpay,
          req.body.mdealid,
          req.body.taskid,
        ],
        (err2, result) => {
          if (err2) {
            console.log(err2);
            res.status(500).send("some error occurred!..");
            return;
          }
          res.status(200).send({ msg: "added successfully" });
        }
      );
    }
  );
};

exports.deleteMisc_FinancePaymentsByID = (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM misc_project_finance WHERE mfid = ?`;

  dbcon.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error deleting from misc_project_finance:", err);
      return res
        .status(500)
        .json({ error: "An error occurred while deleting data" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Record not found" });
    }

    res.status(200).json({ status:200, msg: "Deleted successfully" });
  });
};

exports.deleteNormal_FinancePaymentsByID = (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM normal_projects_finance WHERE fid = ?`;

  dbcon.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error deleting from normal_projects_finance:", err);
      return res
        .status(500)
        .json({ error: "An error occurred while deleting data" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({status:400, error: "Record not found" });
    }

    res.status(200).json({status:200, msg: "Deleted successfully" });
  });
};
