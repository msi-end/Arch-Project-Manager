const express = require('express');
const route = express.Router();
const databaseCon = require('../config/db.config');
const { createHmac } = require('crypto')


route.get('/', (req, res) => {
    if (req.session.isLoggedIn == true) {
        res.status(200).render('../views/admin/index.ejs')
    } else {
        res.redirect(`/admin/login`)
    }
})
route.get('/login', (req, res) => {
    if (req.session.isLoggedIn == true) {
        res.status(200).render('../views/admin/index.ejs')
    } else {
        res.status(200).render('../views/admin/login.ejs')
    }
}
)

route.post('/auth', async (req, res) => {
    if (req.body.Username && req.body.Password) {
        const query = `SELECT username,password FROM adminAuth WHERE _id ='1'`;
        const hash = createHmac('sha256', 'secret').update(req.body.Password).digest('hex');
        await databaseCon.query(query, (err, rows, fields) => {
            if (err) throw err
            if (rows.length > 0) {
                if (req.body.Username == rows[0].username && hash == rows[0].password) {
                    req.session.isLoggedIn = true;
                    req.session.user_id = req.body.Username;
                    req.session.cookie.expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
                    req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000;
                    res.redirect(`/admin`);
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