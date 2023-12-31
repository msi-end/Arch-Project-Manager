const express = require('express');
const route = express.Router();
const { errorHandler } = require('../utils/errorHandler')
const databaseCon = require('../config/db.config');
const { createHmac } = require('crypto')


route.get('/', (req, res) => {
    if (req.session.isLoggedIn == true) {
        res.redirect(`/admin/dashboard`)
    } else {
        res.redirect(`/admin/login`)
    }
})
route.get('/login', (req, res) => {
    if (req.session.isLoggedIn == true) {
        res.redirect(`/admin`)
    } else {
        res.status(200).render('../views/admin/login.ejs')
    }
    //  throw new errorHandler(404, 'dgadr5ragfd')
}
)

route.post('/auth', async (req, res) => {
    if (req.body.Email && req.body.Password) {
        const query = `SELECT email, password FROM adminauth WHERE email ='${req.body.Email}'`;
        const hash = createHmac('sha256', 'secret').update(req.body.Password).digest('hex');
        await databaseCon.query(query, (err, rows, fields) => {
            if (err) throw new errorHandler(500, 'Something wents wrong in this Mysql Admin Auth')
            if (rows.length > 0) {

                  if (req.body.Email == rows[0].email && hash == rows[0].password) {
                    req.session.isLoggedIn = true;
                    req.session.email_id = req.body.Email;
                    req.session.role = 'admin';
                    req.session.cookie.expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
                    req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000;
                    res.redirect(`/admin`);
                } else {
                    res.status(503).send('unauthorized')
                }
            } else {
                res.redirect(`/admin/login`)
            }
        })
    }
});

route.get('/logOut', (req, res) => {
    req.session.destroy();
    res.redirect(`/admin/login`)
})

module.exports = route;

// SELECT deals.deal_name, employee.name, task.task_name, normal_project_employee.dateofassign
// FROM normal_project_employee
// INNER JOIN deals ON deals.id = normal_project_employee.ndeal_id
// INNER JOIN task ON normal_project_employee.category_id = task.task_id
// INNER JOIN employee ON normal_project_employee.emid = employee.em_id
// WHERE ndeal_id = 1;