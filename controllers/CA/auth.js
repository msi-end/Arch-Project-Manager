const { errorHandler } = require('../../utils/errorHandler');
const databaseCon = require('../../config/db.config');
const { createHmac } = require('crypto');

exports.CheckLoginServe = (req, res) => {
    if (req.session.isLoggedIn == true && req.session.role == 'ca') {
        res.redirect('/ca/dashboard')
    } else {
        res.status(200).render('../views/CA/login.ejs')
    }
}


exports.Auth = async (req, res) => {
    let Email = (req.body.Email).trim()
    if (Email && req.body.Password) {
        const query = `SELECT email, password FROM adminauth WHERE email ='${Email}'`;
        const hash = createHmac('sha256', 'secret').update(req.body.Password).digest('hex');
        await databaseCon.query(query, (err, rows, fields) => {
            if (err) throw new errorHandler(404, 'Something wents wrong in this Mysql  Auth');
            if (rows.length > 0) {
                if (Email == rows[0].email && hash == rows[0].password) {
                    req.session.isLoggedIn = true;
                    req.session.email_id = Email;
                    req.session.role = 'ca';
                    req.session.cookie.expires = new Date(Date.now() + 10 * 10 * 60 * 60 * 1000);
                    req.session.cookie.maxAge = 10 * 60 * 60 * 1000;
                    res.redirect(`/ca/dashboard`);
                } else {
                    res.status(503).send('unauthorized')
                }
            } else {
                res.redirect(`/ca`)
            }
        })
    }
}
exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect(`/ca`)
}
