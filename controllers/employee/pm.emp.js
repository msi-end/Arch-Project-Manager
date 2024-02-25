const db = require('../../config/db.config')


exports.getMyProject = async (req, res) => {
    let query;
    if (req.query.type == 'normal') {
        query = `SELECT ndeal_id AS dealid FROM normal_project_employee WHERE emid=${req.query.emid}`
    } else { query = `SELECT mdeal_id AS dealid FROM misc_project_employee WHERE mpemid=${req.query.emid}` }
    await db.query(query, (err, result) => {
        if (err) {
            res.status(500).send({ status: false, msg: ' Life!=success' + err })
        } else { res.status(200).send({ status: true, msg: 'Life success!', data: result }) }
    })
}