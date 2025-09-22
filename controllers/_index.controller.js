const { error } = require("winston");
const db = require("../config/db.config");
const { dataUnity, arrangeFinance } = require("../utils/arrange");

// ---- All Index routes here ----
exports.dashboard = async (req, res) => {
  if (req.session.isLoggedIn == true && req.session.role == "admin") {
    let query = `SELECT ((SELECT COUNT(sdid) FROM single_deal) + (SELECT COUNT(id) FROM deals)) AS total_projects; SELECT COUNT(em_id) AS users FROM employee; SELECT id, CASE WHEN COUNT(DISTINCT project_status) = 1 AND MAX(project_status) = 'completed' THEN 'completed' ELSE 'pending' END AS project_status FROM (SELECT deals.id, normal_project_cat.project_status FROM deals INNER JOIN normal_project_cat ON deals.id = normal_project_cat.ndeal_id) AS subquery GROUP BY id; SELECT misc_project_subtask.mdeal_id, GROUP_CONCAT(misc_project_subtask.mstask_status) AS project_status FROM single_deal INNER JOIN misc_project_subtask ON single_deal.sdid = misc_project_subtask.mdeal_id GROUP BY misc_project_subtask.mdeal_id; SELECT 'misc_project_finance' AS tName, SUM(amount_got) AS total_amount_got, SUM(CASE WHEN modeofpay='online' THEN amount_got ELSE 0 END) AS online_sum, SUM(CASE WHEN modeofpay='cash' THEN amount_got ELSE 0 END) AS cash_sum FROM misc_project_finance GROUP BY tName UNION ALL SELECT 'normal_projects_finance' AS tName, SUM(amount_got) AS total_amount_got, SUM(CASE WHEN modeofpay='online' THEN amount_got ELSE 0 END) AS online_sum, SUM(CASE WHEN modeofpay='cash' THEN amount_got ELSE 0 END) AS cash_sum FROM normal_projects_finance GROUP BY tName; SELECT SUM(total_price) AS total_sum FROM single_deal UNION ALL SELECT SUM(total_price) AS total_sum FROM deals; SELECT SUM(CASE WHEN md_type = 'cash' THEN amount ELSE 0 END) AS cash_expenses, SUM(CASE WHEN md_type = 'online' THEN amount ELSE 0 END) AS online_expenses FROM expenses;`;
    db.query(query, (err, results) => {
      if (!err) {
        res
          .status(200)
          .render("../views/admin/dashboard.ejs", { data: results });
      } else {
        console.log(err);
        res.status(401).render("../views/admin/dashboard.ejs", {});
      }
    });
  }
};

exports.indexDeshboard = async (req, res) => {
  if (req.session.isLoggedIn == true && req.session.role == "admin") {
    let currentPage = Number(req.query.to) || 1;
    let offset = (currentPage - 1) * 10;

    db.query(`SELECT COUNT(*) AS total FROM deals`, (countErr, countResult) => {
      if (countErr) return res.status(500).send("Failed to fetch total count");
      const totalPages = Math.ceil(countResult[0].total / 10);
      let normalQuery = `SELECT deals.*, normal_project_cat.category_id,normal_project_cat.npcid, task.task_name, normal_project_cat.cat_status, normal_project_subtask.stask_id, subtask.sub_task_name, normal_project_subtask.stask_status, normal_project_cat.project_status, normal_project_cat.dateofdeadline FROM (SELECT * FROM deals ORDER BY id DESC LIMIT ${offset}, 10) AS deals INNER JOIN normal_project_cat ON normal_project_cat.ndeal_id = deals.id INNER JOIN task ON normal_project_cat.category_id = task.task_id LEFT JOIN normal_project_subtask ON normal_project_subtask.ndeal_id = deals.id AND normal_project_subtask.category_id = normal_project_cat.category_id LEFT JOIN subtask ON subtask.sub_task_id = normal_project_subtask.stask_id ORDER BY deals.id DESC`;
      let SearchQuery = `SELECT deals.*, normal_project_cat.category_id,normal_project_cat.npcid,task.task_name,normal_project_cat.cat_status,normal_project_subtask.stask_id,subtask.sub_task_name, normal_project_subtask.stask_status,normal_project_cat.project_status, normal_project_cat.dateofdeadline FROM (SELECT * FROM deals ORDER BY id DESC LIMIT ${offset}, 10) AS deals INNER JOIN normal_project_cat ON normal_project_cat.ndeal_id = deals.id INNER JOIN task ON normal_project_cat.category_id = task.task_id LEFT JOIN normal_project_subtask ON normal_project_subtask.ndeal_id = deals.id AND normal_project_subtask.category_id = normal_project_cat.category_id LEFT JOIN subtask ON subtask.sub_task_id = normal_project_subtask.stask_id  WHERE deals.deal_name LIKE '%${req.query.search}%' ORDER BY deals.id DESC;`;

      let q = req.query.search ? SearchQuery : normalQuery;

      db.query(q || countResult, (err, results) => {
        const grouped = {};
        const sentData = [];
        if (!err) {
          results.forEach((element) => {
            const key = element.id.toString();
            if (!grouped[key]) {
              grouped[key] = [];
            }
            grouped[key].push(element);
          });
          for (const key in grouped) {
            dataUnity(grouped[key]);
          }
          for (const key in grouped) {
            sentData.push(grouped[key][0]);
          }
          // res.status(200).send({data : sentData});
          const sortedData = sentData.sort((a, b) => b.id - a.id);
          res.status(200).render("../views/admin/_index.ejs", {
            sortedData,
            currentPage,
            totalPages,
          });
          // console.log(sortedData, currentPage, totalPages);
        }
      });
    });
  } else {
    res.redirect("/admin/login");
  }
};

exports.userManager = (req, res) => {
  if (req.session.isLoggedIn == true && req.session.role == "admin") {
    let currentPage = Number(req.query.to) || 1;
    let offset = (currentPage - 1) * 10;
    const query = `SELECT em_id, name ,number, email, job_role, lastLoginAt ,lastLogoutAt , status FROM employee`;
    // INNER JOIN normal_project_employee ON employee.em_id = normal_project_employee.emid
    // GROUP BY normal_project_employee.emid;
    db.query(query, (err, result, field) => {
      res.status(200).render("../views/admin/user.ejs", { data: result });
    });
  }
};

exports.settings = (req, res) => {
  if (req.session.isLoggedIn == true && req.session.role == "admin") {
    const query = `select * from subtask;select * from mis_subtask;select * from amount_split;
    SELECT * FROM expense_category;SELECT * FROM payment_methods;SELECT * FROM projects_category;`;
    db.query(query, (err, result, field) => {
      res.status(200).render("../views/admin/settings.ejs", { data: result });
    });
  }
};

function parseDMY(dateStr) {
  if (!dateStr) return new Date("1970-01-01");
  let [day, month, year] = dateStr.split("/");
  return new Date(`${year}-${month}-${day}`);
}

exports.expense = (req, res) => {
  if (req.session.isLoggedIn == true && req.session.role == "admin") {
    const query = `
      SELECT * FROM expenses ORDER BY id DESC LIMIT 50;
      SELECT sd.sdeal_name,mpf.*, ms.msub_task_name 
        FROM misc_project_finance mpf 
        LEFT JOIN single_deal sd on mpf.mdeal_id=sd.sdid 
        LEFT JOIN mis_subtask ms on mpf.task=ms.msub_task_id 
        WHERE amount_got != '0' 
        ORDER BY mpf.mfid desc LIMIT 20;
      SELECT d.deal_name,npf.*, t.task_name 
        FROM normal_projects_finance npf 
        LEFT JOIN deals d on npf.ndeal_id=d.id 
        LEFT JOIN task t on npf.task=t.task_id 
        WHERE amount_got != '0'  
        ORDER BY npf.fid desc LIMIT 40;
    `;

    db.query(query, (err, result, field) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Database error");
      }

      let unifiedData = [];

      // Expenses
      result[0].forEach((row) => {
        unifiedData.push({
          id: row.id,
          title: row.title,
          amount: row.amount,
          date: row.date, // assumed "dd/mm/yyyy"
          mode_of_pay: row.md_type || "",
          category: row.category || "",
          remarks: row.remark || "",
          type: "expense",
        });
      });

      // Misc project finance
      result[1].forEach((row) => {
        unifiedData.push({
          id: row.mfid,
          title: row.sdeal_name || "",
          amount: row.amount_got,
          date: row.dateofpay, // assumed "dd/mm/yyyy"
          mode_of_pay: row.modeofpay || "",
          category: "Misc Project",
          remarks: row.msub_task_name || "",
          type: "Misc",
        });
      });

      // Normal projects finance
      result[2].forEach((row) => {
        unifiedData.push({
          id: row.fid,
          title: row.deal_name || "",
          amount: row.amount_got,
          date: row.dateofpay, // assumed "dd/mm/yyyy"
          mode_of_pay: row.modeofpay || "",
          category: "Normal Project",
          remarks: row.task_name || "",
          type: "Normal",
        });
      });

      // 🔹 Sort by dd/mm/yyyy correctly
      unifiedData.sort((a, b) => {
        const dateA = parseDMY(a.date);
        const dateB = parseDMY(b.date);
        if (dateB - dateA !== 0) return dateB - dateA;
        return b.id - a.id;
      });

      res
        .status(200)
        .render("../views/admin/expense.finance.ejs", { data: unifiedData });
    });
  }
};

//---Normal project form works-------
exports.insertNewNormalDeal = async (req, res) => {
  if (req.session.isLoggedIn == true && req.session.role == "admin") {
    db.getConnection((err0, conn) => {
      if (err0) throw err0;
      conn.beginTransaction(function (err) {
        if (err) {
          res.status(500).send({ msg: "something error occured" });
          return;
        }
        const dealsTableData = [
          req.body.name,
          req.body.rfNo, 
          req.body.contactNo,
          req.body.agreementAm,
          req.body.workName,
          req.body.email,
          req.body.city,
          req.body.TotalAm,
          req.body.npdeadline,
          req.body.split,
          req.body.category,
        ];

        const qTodeal = `insert into deals (deal_name, reference_no, contact, agreement_amount, work_name, email, city, total_price, np_deadline, split,category) values (?,?,?,?,?,?,?,?,?,?,?)`;

        conn.query(qTodeal, dealsTableData, (err1, response) => {
          if (err1) {
            res.status(500).send({ msg: "something error occured" });
            return conn.rollback(function () {
              throw err1;
            });
          }

          const dealId = response.insertId;
          const catTableData = [];
          req.body.task.forEach((ask) => {
            const taskNum = Number(ask);
            catTableData.push([dealId, taskNum, "not set yet"]);
          });
          const qTonpc = `insert into normal_project_cat (ndeal_id, category_id, dateofdeadline) values ?`;
          conn.query(qTonpc, [catTableData], (err2, response2) => {
            if (err2) {
              res.status(500).send({ msg: "something error occured" });
              return conn.rollback(function () {
                throw err2;
              });
            }

            const finTableData = [];
            req.body.task.forEach((ask) => {
              const taskNum = Number(ask);
              const tam = Number(req.body.TotalAm);
              finTableData.push([dealId, tam, taskNum]);
            });
            const qTonpf = `insert into normal_projects_finance (ndeal_id, totalamount, task) values ?`;
            conn.query(qTonpf, [finTableData], (err3, response3) => {
              if (err3) {
                res.status(500).send({ msg: "something error occured" });
                return conn.rollback(function () {
                  throw err3;
                });
              }
              conn.commit(function (errC) {
                if (errC) {
                  res.status(500).send({ msg: "something error occured" });
                  return conn.rollback(function () {
                    throw errC;
                  });
                }
                res
                  .status(200)
                  .send({ msg: "new deal entered successfully..😍" });
              });
            });
          });
        });
        conn.release();
      });
    });
  }
};

exports.insertNewMiscDeal = async (req, res) => {
  if (req.session.isLoggedIn == true && req.session.role == "admin") {
    db.getConnection((err0, conn) => {
      if (err0) throw err0;
      conn.beginTransaction(function (err) {
        if (err) {
          res.status(500).send({ msg: "something error occured" });
          return;
        }
        const miscDealsTableData = [
          req.body.name,
          req.body.rfNo,
          req.body.contactNo,
          req.body.agreementAm,
          req.body.workName,
          req.body.email,
          req.body.city,
          req.body.TotalAm,
          req.body.mpdeadline,
          req.body.category,
        ];

        const qTodeal = `insert into single_deal (sdeal_name, reference_no, contact, agreement_amount, work_name, email, city, total_price, mp_deadline,category) values (?,?,?,?,?,?,?,?,?,?)`;

        conn.query(qTodeal, miscDealsTableData, (err1, response) => {
          if (err1) {
            return conn.rollback(function () {
              throw err1;
            });
          }
          const mdealId = response.insertId;
          const finTableData = [
            mdealId,
            req.body.TotalAm,
            Number(req.body.task),
            req.body.agreementAm,
            req.body.mpdeadline,
            "Advance Pay",
          ];
          const qTonpf = `insert into misc_project_finance (mdeal_id, totalamount, task, amount_got,dateofpay,modeofpay) values (?, ?, ?, ?,?,?)`;
          conn.query(qTonpf, finTableData, (err3, response3) => {
            if (err3) {
              return conn.rollback(function () {
                throw err3;
              });
            }
            const taskTableData = [
              mdealId,
              Number(req.body.task),
              "30/09/2013",
            ];
            const qTonpSt = `insert into misc_project_subtask (mdeal_id, mstask_id, dateofdeadline) values (?, ?, ?)`;
            conn.query(qTonpSt, taskTableData, (err4, response4) => {
              if (err4) {
                return conn.rollback(function () {
                  throw err4;
                });
              }
              conn.commit(function (errC) {
                if (errC) {
                  return conn.rollback(function () {
                    throw errC;
                  });
                }
                res
                  .status(200)
                  .send({ msg: "new misc deal entered successfully..😍" });
              });
            });
          });
        });
      });
    });
  }
};

exports.renderNormalProjectFinance = async (req, res) => {
  if (req.session.isLoggedIn == true && req.session.role == "admin") {
    let currentPage = Number(req.query.to) || 1;
    let offset = (currentPage - 1) * 10;
    const q = `SELECT deals.id, deals.reference_no, deals.city, deals.deal_name, deals.total_price, deals.split, normal_projects_finance.task, task.task_name, normal_projects_finance.fid, normal_projects_finance.amount_got, normal_projects_finance.modeofpay, normal_projects_finance.dateofpay FROM (SELECT * FROM deals ORDER BY id DESC LIMIT ${
      Number(req.query.from) * 10
    }, 10) AS deals INNER JOIN normal_projects_finance ON deals.id = normal_projects_finance.ndeal_id INNER JOIN task ON task.task_id = normal_projects_finance.task ORDER BY deals.id DESC;`;
    await db.query(q, (err, result) => {
      if (!err) {
        const grouped = {};
        const sentData = [];
        result.forEach((element) => {
          const key = element.id.toString();
          if (!grouped[key]) {
            grouped[key] = [];
          }
          grouped[key].push(element);
        });
        for (const key in grouped) {
          sentData.push(grouped[key]);
        }

        const sortedTasks = sentData.sort((a, b) => b[0].id - a[0].id);
        const sortedData = arrangeFinance(sortedTasks);
        //  res.status(200).send(sortedData);
        // const sortedData = sentData.sort((a, b) => b[0].id - a[0].id);
        res.render("../views/admin/np.finance.ejs", { sortedData });
      } else {
        res.status(500).send({ msg: "Internal server error!!!" });
      }
    });
  }
};

exports.renderNormalProjectForm = async (req, res) => {
  if (req.session.isLoggedIn == true && req.session.role == "admin") {
    const q = `select * from mis_subtask;SELECT * FROM projects_category`;
    await db.query(q, (err, results) => {
      if (!err) {
        res.status(200).render("../views/admin/np.form.ejs", { results });
      } else {
        res.status(500).send({ msg: "Some internal error has occurred !!" });
      }
    });
  }
};

//---Misc project page Controll -----
exports.renderMiscProjectDashboard = async (req, res) => {
  if (req.session.isLoggedIn == true && req.session.role == "admin") {
    let currentPage = Number(req.query.to) || 1;
    let offset = (currentPage - 1) * 10;
    db.query(
      `SELECT COUNT(*) AS total FROM misc_project_subtask`,
      (countErr, countResult) => {
        if (countErr)
          return res.status(500).send("Failed to fetch total count");
        const totalPages = Math.ceil(countResult[0].total / 10);
        const q = `select single_deal.sdid, single_deal.reference_no, single_deal.contact, single_deal.email, single_deal.sdeal_name, single_deal.work_name, single_deal.agreement_amount, single_deal.total_price, single_deal.city, single_deal.mp_deadline, misc_project_subtask.mstask_id, misc_project_subtask.mdeal_id, mis_subtask.msub_task_name, misc_project_subtask.mstask_status, misc_project_subtask.dateofdeadline 
        from misc_project_subtask 
        inner join single_deal on single_deal.sdid = misc_project_subtask.mdeal_id 
        inner join mis_subtask on mis_subtask.msub_task_id = misc_project_subtask.mstask_id order by single_deal.sdid DESC`;
        db.query(q, [offset], (err, result) => {
          // console.log(result);
          if (!err) {
            res.status(200).render("../views/admin/miscDash.ejs", {
              result,
              currentPage,
              totalPages,
            });
          }
        });
      }
    );
  }
};

exports.miscProjectFinance = async (req, res) => {
  if (req.session.isLoggedIn === true && req.session.role === "admin") {
    let currentPage = Number(req.query.to) || 1;
    let offset = (currentPage - 1) * 10;
    const q = `
     SELECT 
    sd.sdid,
    sd.reference_no,
    sd.sdeal_name,
    sd.work_name,
    sd.city,
    sd.total_price,
    sd.agreement_amount,
    ms.msub_task_id,
    ms.msub_task_name,
    mpf.mfid,
    mpf.mdeal_id,
    mpf.totalamount,
    mpf.task,
    mpf.amount_got,
    mpf.dateofpay,
    mpf.modeofpay
FROM single_deal sd
LEFT JOIN misc_project_finance mpf ON sd.sdid = mpf.mdeal_id
LEFT JOIN mis_subtask ms ON ms.msub_task_id = mpf.task
ORDER BY sd.sdid DESC
LIMIT 10 OFFSET ?;`;
    await db.query(q, [offset], (err, rows) => {
      if (err) {
        return res.status(500).send({ msg: "Internal server error!!!" });
      }
      const grouped = {};
      rows.forEach((row) => {
        if (!grouped[row.sdid]) {
          grouped[row.sdid] = {
            sdid: row.sdid,
            reference_no: row.reference_no,
            sdeal_name: row.sdeal_name,
            work_name: row.work_name,
            city: row.city,
            total_price: row.total_price,
            agreement_amount: row.agreement_amount,
            total_received: 0,
            subtasks: {},
          };
        }
        if (!grouped[row.sdid].subtasks[row.msub_task_id]) {
          grouped[row.sdid].subtasks[row.msub_task_id] = {
            msub_task_id: row.msub_task_id,
            msub_task_name: row.msub_task_name,
            subtask_total_received: 0,
            payments: [],
          };
        }
        grouped[row.sdid].subtasks[row.msub_task_id].payments.push({
          mfid: row.mfid,
          amount_got: row.amount_got,
          dateofpay: row.dateofpay,
          modeofpay: row.modeofpay,
        });
        grouped[row.sdid].subtasks[row.msub_task_id].subtask_total_received +=
          row.amount_got || 0;
        grouped[row.sdid].total_received += row.amount_got || 0;
      });
      const result = Object.values(grouped).map((deal) => {
        deal.subtasks = Object.values(deal.subtasks);
        deal.balance = (deal.total_price || 0) - deal.total_received;
        return deal;
      });

      res.status(200).render("../views/admin/mp.finance.ejs", { result });
      // console.log(JSON.stringify(result, null, 2));
    });
  }
};

exports.renderMiscProjectForm = (req, res) => {
  if (req.session.isLoggedIn == true && req.session.role == "admin") {
    res.render("../views/admin/normalProject.ejs");
  }
};

exports.renderInvoice = (req, res) => {
  if (req.session.isLoggedIn == true && req.session.role == "admin") {
    res.render("../views/admin/invoice.ejs");
  }
};
