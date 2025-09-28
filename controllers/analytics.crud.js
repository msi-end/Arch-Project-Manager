const pool = require("../config/db.config");

function getSingleDealsAnalytics(req, res) {
  // First: total deals
  pool.query(
    "SELECT COUNT(*) AS totalDeals FROM single_deal",
    (err, dealsCount) => {
      if (err)
        return res.status(500).json({ success: false, error: err.message });

      // Second: total agreement amount
      pool.query(
        "SELECT SUM(agreement_amount) AS totalAgreementAmount ,SUM(total_price) AS totalProjectsAmount FROM single_deal",
        (err, agreementAmount) => {
          if (err)
            return res.status(500).json({ success: false, error: err.message });

          // Third: total received
          pool.query(
            "SELECT SUM(amount_got) AS totalReceived FROM misc_project_finance",
            (err, totalReceived) => {
              if (err)
                return res
                  .status(500)
                  .json({ success: false, error: err.message });

              const outstanding =
                (agreementAmount[0].totalProjectsAmount || 0) -
                (totalReceived[0].totalReceived || 0);

              // Category stats
              pool.query(
                `
          SELECT category,
                 COUNT(*) AS totalDeals,
                 SUM(agreement_amount) AS totalAmount
          FROM single_deal
          GROUP BY category
        `,
                (err, categoryStats) => {
                  if (err)
                    return res
                      .status(500)
                      .json({ success: false, error: err.message });

                  // Task stats
                  pool.query(
                    `
          SELECT task,ms.msub_task_name as task_name,
                   SUM(amount_got) AS totalReceived,
                   SUM(totalamount) AS totalAmount
            FROM misc_project_finance LEFT JOIN mis_subtask ms ON task= ms.msub_task_id
            GROUP BY task;
          `,
                    (err, taskStats) => {
                      if (err)
                        return res
                          .status(500)
                          .json({ success: false, error: err.message });

                      res.json({
                        success: true,
                        summary: {
                          totalDeals: dealsCount[0].totalDeals,
                          totalAgreementAmount:agreementAmount[0].totalAgreementAmount || 0,
                          totalProjectsAmount: agreementAmount[0].totalProjectsAmount || 0,
                          totalReceived: totalReceived[0].totalReceived || 0,
                          totalOutstanding: outstanding,
                        },
                        categoryStats,
                        taskStats,
                      });
                    }
                  );
                }
              );
            }
          );
        }
      );
    }
  );
}

function getNormalDealsAnalytics(req, res) {
  // First: total deals
  pool.query(
    "SELECT COUNT(*) AS totalDeals FROM deals",
    (err, dealsCount) => {
      if (err)
        return res.status(500).json({ success: false, error: err.message });
      // Second: total agreement amount
      pool.query(
        "SELECT SUM(agreement_amount) AS totalAgreementAmount,SUM(total_price) AS totalProjectsAmount FROM deals",
        (err, agreementAmount) => {
          if (err)
            return res.status(500).json({ success: false, error: err.message });
          // Third: total received
          pool.query(
            "SELECT SUM(amount_got) AS totalReceived FROM normal_projects_finance;",
            (err, totalReceived) => {
              if (err)
                return res.status(500).json({ success: false, error: err.message });
              const outstanding = (agreementAmount[0].totalProjectsAmount || 0) - (totalReceived[0].totalReceived || 0);
              // Category stats
              pool.query(
                `SELECT category, COUNT(*) AS totalDeals, SUM(total_price) AS totalAmount FROM deals GROUP BY category;`,
                (err, categoryStats) => {
                  if (err)
                    return res.status(500).json({ success: false, error: err.message });
                  // Task stats
                  pool.query(`SELECT task,ms.task_name as task_name, SUM(amount_got) AS totalReceived, SUM(totalamount) AS totalAmount FROM normal_projects_finance LEFT JOIN task ms ON task= ms.task_id GROUP BY task;`,
                    (err, taskStats) => {
                      if (err)
                        return res.status(500).json({ success: false, error: err.message });
                      res.json({
                        success: true,
                        summary: {
                          totalDeals: dealsCount[0].totalDeals,
                          totalAgreementAmount: agreementAmount[0].totalAgreementAmount || 0,
                          totalProjectsAmount: agreementAmount[0].totalProjectsAmount || 0,
                          totalReceived: totalReceived[0].totalReceived || 0,
                          totalOutstanding: outstanding,
                        },
                        categoryStats,
                        taskStats,
                      });
                    }
                  );
                }
              );
            }
          );
        }
      );
    }
  );
}
module.exports = { getSingleDealsAnalytics, getNormalDealsAnalytics };
