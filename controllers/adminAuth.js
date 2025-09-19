const { errorHandler } = require('../utils/errorHandler');
const databaseCon = require('../config/db.config');
const { createHmac } = require('crypto');

// GET: Admin Home
exports.home = (req, res) => {
    if (req.session.isLoggedIn && req.session.role === 'admin') {
        res.redirect(`/admin/dashboard?from=0&to=1`);
    } else {
        res.redirect(`/admin/login`);
    }
};

// GET: Login Page
exports.loginPage = (req, res) => {
    if (req.session.isLoggedIn && req.session.role === 'admin') {
        res.redirect(`/admin`);
    } else {
        res.status(200).render('../views/admin/login.ejs');
    }
};

// POST: Auth
exports.auth = async (req, res) => {
    const Email = (req.body.Email || '').trim();

    if (Email && req.body.Password) {
        const query = `SELECT email, password FROM adminauth WHERE email ='${Email}'`;
        const hash = createHmac('sha256', 'secret').update(req.body.Password).digest('hex');

        databaseCon.query(query, (err, rows) => {
            if (err) throw new errorHandler(500, 'Something went wrong in MySQL Admin Auth');

            if (rows.length > 0) {
                if (Email === rows[0].email && hash === rows[0].password) {
                    req.session.isLoggedIn = true;
                    req.session.email_id = Email;
                    req.session.role = 'admin';
                    req.session.cookie.expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
                    req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000;
                    res.redirect(`/admin`);
                } else {
                    res.status(503).send('Unauthorized');
                }
            } else {
                res.redirect(`/admin/login`);
            }
        });
    } else {
        res.redirect(`/admin/login`);
    }
};

// GET: Logout
exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect(`/admin/login`);
};
