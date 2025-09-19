const { log } = require("winston");
const databaseCon = require("../config/db.config");

/**
 *
 *
 * task
 */
exports.getTask = async (req, res) => {
  const q = "select * from task";
  await databaseCon.query(q, (err, results) => {
    if (!err) {
      res.status(200).send(results);
    } else {
      res.status(500).send({ msg: "Internal error occurs!" });
    }
  });
};
exports.setTask = async (req, res) => {
  const q = "INSERT INTO task (task_name) VALUES(?)";
  await databaseCon.query(q, [req.body.taskName], (err, results) => {
    if (!err) {
      res.status(200).send(results);
    } else {
      res.status(500).send({ msg: "Internal error occurs!" });
    }
  });
};

/**
 *
 *
 * Sub task
 */

exports.getSubtask = async (req, res) => {
  const q = "select * from subtask";
  await databaseCon.query(q, (err, results) => {
    if (!err) {
      res.status(200).send(results);
    } else {
      res.status(500).send({ msg: "Internal error occurs!" });
    }
  });
};

exports.setSubtask = async (req, res) => {
  const q = "INSERT INTO subtask (sub_task_name) VALUES(?)";
  await databaseCon.query(q, [req.body.subTask], (err, results) => {
    if (!err) {
      res.status(200).send({
        status: true,
        msg: "Successfully added Sub-Task",
        data: results.insertId,
      });
    } else {
      res.status(500).send({ status: false, msg: "Internal error occurs!" });
    }
  });
};
exports.updateSubtask = async (req, res) => {
  const q = `UPDATE subtask SET sub_task_name=?  WHERE sub_task_id =${req.params.id}`;
  await databaseCon.query(q, [req.body.subTask], (err, results) => {
    if (!err) {
      res.status(200).send({
        status: true,
        msg: "Successfully Updated Sub-Task",
        data: results.insertId,
      });
    } else {
      res.status(500).send({ status: false, msg: "Internal error occurs!" });
    }
  });
};
exports.deleteSubtask = async (req, res) => {
  const q = `DELETE FROM subtask WHERE sub_task_id =${req.params.id}`;
  await databaseCon.query(q, [req.body.subTask], (err, results) => {
    if (!err) {
      res.status(200).send({
        status: true,
        msg: "Successfully DELETED Sub-Task",
        data: results.insertId,
      });
    } else {
      res.status(500).send({ status: false, msg: "Internal error occurs!" });
    }
  });
};

/**
 *
 *
 * Misc task
 */
exports.getMiscTask = async (req, res) => {
  const q = "select * from mis_subtask";
  await databaseCon.query(q, (err, results) => {
    if (!err) {
      res.status(200).send(results);
    } else {
      res.status(500).send({ msg: "Internal error occurs!" });
    }
  });
};
exports.setMiscTask = async (req, res) => {
  const q = "INSERT INTO mis_subtask(msub_task_name) VALUE(?)";
  await databaseCon.query(q, [req.body.miscTask], (err, results) => {
    if (!err) {
      res.status(200).send({
        status: true,
        msg: "Successfully added Miscellaneous Task",
        data: results.insertId,
      });
    } else {
      res.status(500).send({ status: false, msg: "Internal error occurs!" });
    }
  });
};
exports.updateMiscTask = async (req, res) => {
  const q = `UPDATE mis_subtask SET msub_task_name =? WHERE  msub_task_id=${req.params.id} `;
  await databaseCon.query(q, [req.body.miscTask], (err, results) => {
    if (!err) {
      res
        .status(200)
        .send({ status: true, msg: "Successfully Updated Miscellaneous Task" });
    } else {
      res.status(500).send({ status: false, msg: "Internal error occurs!" });
    }
  });
};
exports.deleteMiscTask = async (req, res) => {
  const q = `DELETE FROM mis_subtask WHERE  msub_task_id=${req.params.id} `;
  await databaseCon.query(q, [req.body.miscTask], (err, results) => {
    if (!err) {
      res
        .status(200)
        .send({ status: true, msg: "Successfully DELETED Miscellaneous Task" });
    } else {
      res.status(500).send({ status: false, msg: "Internal error occurs!" });
    }
  });
};

/**
 *
 *
 * Amount Split
 */

exports.getAmountSplit = async (req, res) => {
  const q = "select splitvalue from amount_split";
  await databaseCon.query(q, (err, results) => {
    if (!err) {
      res.status(200).send({
        status: true,
        msg: "Successfully Retrived Splits",
        data: results,
      });
    } else {
      res.status(500).send({ status: false, msg: "Internal error occurs!" });
    }
  });
};
exports.setAmountSplit = async (req, res) => {
  const q = "INSERT INTO amount_split (splitvalue) VALUES(?)";
  await databaseCon.query(q, [req.body.splitValue], (err, results) => {
    if (!err) {
      res.status(200).send({
        status: true,
        msg: "Successfully added Split Ratio",
        data: results.insertId,
      });
    } else {
      res.status(500).send({ status: false, msg: "Internal error occurs!" });
    }
  });
};
exports.updateAmountSplit = async (req, res) => {
  const q = `UPDATE amount_split SET  splitvalue =?  WHERE cid =${req.params.id}`;
  await databaseCon.query(q, [req.body.splitValue], (err, results) => {
    if (!err) {
      res.status(200).send({
        status: true,
        msg: "Successfully added Split Ratio",
        data: results.insertId,
      });
    } else {
      res.status(500).send({ status: false, msg: "Internal error occurs!" });
    }
  });
};
exports.deleteAmountSplit = async (req, res) => {
  const q = `DELETE FROM amount_split WHERE cid =${req.params.id}`;
  await databaseCon.query(q, [req.body.splitValue], (err, results) => {
    if (!err) {
      res.status(200).send({
        status: true,
        msg: "Successfully DELETED Split Ratio",
        data: results.insertId,
      });
    } else {
      res.status(500).send({ status: false, msg: "Internal error occurs!" });
    }
  });
};

/**
 *
 *
 * Expense Category
 */
exports.getExpCategory = async (req, res) => {
  const q = "select * from expense_category";
  await databaseCon.query(q, (err, results) => {
    if (!err) {
      res.status(200).send({
        status: true,
        msg: "Successfully Retrived Splits",
        data: results,
      });
    } else {
      res.status(500).send({ status: false, msg: "Internal error occurs!" });
    }
  });
};
exports.setExpCategory = async (req, res) => {
  const q = "INSERT INTO expense_category (cat_name,cat_desc) VALUES(?,?)";
  await databaseCon.query(
    q,
    [req.body.cat_name, req.body.cat_desc],
    (err, results) => {
      if (!err) {
        res.status(200).send({
          status: true,
          msg: "Successfully added expense_category ",
          data: results.insertId,
        });
      } else {
        console.log(err);
        res.status(500).send({ status: false, msg: "Internal error occurs!" });
      }
    }
  );
};
exports.updateExpCategory = async (req, res) => {
  const q = `UPDATE expense_category SET  cat_name =? ,cat_desc=?  WHERE id =${req.params.id}`;
  await databaseCon.query(
    q,
    [req.body.cat_name, req.body.cat_desc || "Not set yet"],
    (err, results) => {
      if (!err) {
        res.status(200).send({
          status: true,
          msg: "Successfully updated expense_category",
          data: results.insertId,
        });
      } else {
        console.log(err);
        res.status(500).send({ status: false, msg: "Internal error occurs!" });
      }
    }
  );
};
exports.deleteExpCategory = async (req, res) => {
  const q = `DELETE FROM expense_category WHERE id =${req.params.id}`;
  await databaseCon.query(q, (err, results) => {
    if (!err) {
      res.status(200).send({
        status: true,
        msg: "Successfully DELETED Split Ratio",
        data: results.insertId,
      });
    } else {
      res.status(500).send({ status: false, msg: "Internal error occurs!" });
    }
  });
};

/**
 *
 *
 * Payment Methods
 */
// Get all payment methods
exports.getPaymentMethods = (req, res) => {
  const q = "SELECT * FROM payment_methods";
  databaseCon.query(q, (err, results) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .send({ status: false, msg: "Internal error occurs!" });
    }
    res.status(200).send({
      status: true,
      msg: "Successfully retrieved payment methods",
      data: results,
    });
  });
};

// Insert new payment method
exports.setPaymentMethods = (req, res) => {
  const q = "INSERT INTO payment_methods (pm_title, pm_desc) VALUES (?, ?)";
  databaseCon.query(
    q,
    [req.body.method_name, req.body.method_desc],
    (err, results) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .send({ status: false, msg: "Internal error occurs!" });
      }
      res.status(200).send({
        status: true,
        msg: "Successfully added payment method",
        data: { insertId: results.insertId },
      });
    }
  );
};

// Update existing payment method
exports.updatePaymentMethods = (req, res) => {
  const q = "UPDATE payment_methods SET pm_title = ?, pm_desc = ? WHERE id = ?";
  const desc = req.body.method_desc || "Not set yet";
  databaseCon.query(
    q,
    [req.body.method_name, desc, req.params.id],
    (err, results) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .send({ status: false, msg: "Internal error occurs!" });
      }
      res.status(200).send({
        status: true,
        msg: "Successfully updated payment method",
        affectedRows: results.affectedRows, // correct field for update/delete
      });
    }
  );
};

// Delete payment method
exports.deletePaymentMethods = (req, res) => {
  const q = "DELETE FROM payment_methods WHERE id = ?";
  databaseCon.query(q, [req.params.id], (err, results) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .send({ status: false, msg: "Internal error occurs!" });
    }
    res.status(200).send({
      status: true,
      msg: "Successfully deleted payment method",
      affectedRows: results.affectedRows,
    });
  });
};

/**
 *
 *
 * Project Category
 */
// Get all categories
exports.getProjectCategory = (req, res) => {
  const q = "SELECT * FROM projects_category";
  databaseCon.query(q, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send({ status: false, msg: "Internal error occurs!" });
    }
    res.status(200).send({
      status: true,
      msg: "Successfully retrieved categories",
      data: results,
    });
  });
};

// Insert new category
exports.setProjectCategory = (req, res) => {
  const q = "INSERT INTO projects_category (cat_name, cat_desc) VALUES (?, ?)";
  databaseCon.query(q, [req.body.cat_name, req.body.cat_desc], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send({ status: false, msg: "Internal error occurs!" });
    }
    res.status(200).send({
      status: true,
      msg: "Successfully added project category",
      data: { insertId: results.insertId },
    });
  });
};

// Update category
exports.updateProjectCategory = (req, res) => {
  const q = "UPDATE projects_category SET cat_name = ?, cat_desc = ? WHERE id = ?";
  const desc = req.body.cat_desc || 'Not set yet';
  databaseCon.query(q, [req.body.cat_name, desc, req.params.id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send({ status: false, msg: "Internal error occurs!" });
    }
    res.status(200).send({
      status: true,
      msg: "Successfully updated project category",
      affectedRows: results.affectedRows,
    });
  });
};

// Delete category
exports.deleteProjectCategory = (req, res) => {
  const q = "DELETE FROM projects_category WHERE id = ?";
  databaseCon.query(q, [req.params.id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send({ status: false, msg: "Internal error occurs!" });
    }
    res.status(200).send({
      status: true,
      msg: "Successfully deleted project category",
      affectedRows: results.affectedRows,
    });
  });
};

