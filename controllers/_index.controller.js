const db = require('../config/db.config')


exports.index = (req, res) => {
    const query = ``
    db.query(query, (err, result, field) => {
        res.send(result)
    })
}
exports.userManager = (req, res) => {
    const query = `SELECT employee.em_id, employee.name ,employee.number, employee.email, employee.lastLoginAt ,employee.lastLogoutAt , employee.status 
    , COUNT(normal_project_employee.emid) FROM employee
      INNER JOIN normal_project_employee ON employee.em_id = normal_project_employee.emid
      GROUP BY normal_project_employee.emid;`
    db.query(query, (err, result, field) => {
        res.send(result)
    })
}
exports.finance = (req, res) => {
    const query = ``
    db.query(query, (err, result, field) => {
        res.send(result)
    })
}
exports.expense = (req, res) => {
    const query = ``
    db.query(query, (err, result, field) => {
        res.send(result)
    })
}
exports.settings = (req, res) => {
    const query = ``
    db.query(query, (err, result, field) => {
        res.send(result)
    })


    // SELECT employee.em_id, employee.name, employee.number, employee.email, employee.lastLoginAt, employee.lastLogoutAt, employee.status
    //     , COUNT(normal_project_employee.emid), normal_project_cat.cat_status
    //        FROM employee
    //         INNER JOIN normal_project_employee ON employee.em_id = normal_project_employee.emid
    //         INNER JOIN normal_project_cat ON normal_project_cat.category_id = normal_project_employee.category_id
    //         GROUP BY   normal_project_employee.emid;
}

// exports.insertNewNormalDeal = async (req, res)=>{
//     const qTodeal = `insert into deals (deal_name, reference_no, contact, agreement_amount, work_name, email, city, total_price, split) values ()`
//     await db.query(qTodeal, (err1, response)=>{
//         if(!err1) {
//             const dealId = response.insertId
//         }
//     })
// }

exports.insertNewDeal = async (req, res) => {
    db.getConnection((err0, conn) => {
        if (err0) throw err0;
        const body = {
            name: "cafeBar", reference: 1104, contact: 98765893, argAm : 20000, work_name : "xyz restau",
            email: "lassan@gmail.com", city: "dibrugarh", totalprice: 100000, split: "4:4:2", tasks: [1,2]
        }
        conn.beginTransaction(function (err) {
            if (err) {
                res.status(500).send("something error occured")
                return;
            }
            const dealsTableData = [body.name, body.reference, body.contact, body.argAm, body.work_name, body.email, body.city, body.totalprice, body.split]
    
            const qTodeal = `insert into deals (deal_name, reference_no, contact, agreement_amount, work_name, email, city, total_price, split) values (?,?,?,?,?,?,?,?,?)`
    
        conn.query(qTodeal, dealsTableData, (err1, response) => {
            if (err1) {
                return conn.rollback(function() {
                  throw err1;
                })}
            
            const dealId = response.insertId
            const catTableData = [[dealId, 1, '23/09/2023'], [dealId, 2, '25/09/2023']]
            const qTonpc = `insert into normal_project_cat (ndeal_id, category_id, dateofdeadline) values ?`
            conn.query(qTonpc, [catTableData], (err2, response2) => {
                if (err2) {
                    return conn.rollback(function() {
                      throw err2;
                    })
                }
    
                const qTonpf = `insert into normal_projects_finance (ndeal_id, totalamount, task) values ?`
                const finTableData = [[dealId, body.totalprice, 1], [dealId, body.totalprice, 2] ]
                conn.query(qTonpf, [finTableData], (err3, response3) => {
                    if (err3) {
                        return conn.rollback(function() {
                          throw err3;
                        })
                    }
                    conn.commit(function(errC) {
                        if (errC) {
                          return conn.rollback(function() {
                            throw errC;
                          });
                        }
                        res.status(200).send("new deal entered successfully..😍")
                    })
                })
            })
    
            })
    
        })
    })
    
}