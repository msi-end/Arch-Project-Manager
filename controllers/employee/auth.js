const { errorHandler } = require('../../utils/errorHandler');
const databaseCon = require('../../config/db.config');
const { createHmac } = require('crypto');

exports.CheckLoginServe = (req, res) => {
    if (req.session.isLoggedIn == true && req.session.role == 'employee') {
        res.redirect('/dashboard')
    } else {
        res.status(200).render('../views/employee/login.ejs')
    }
}


exports.Auth = async (req, res) => {
    if (req.body.Email && req.body.Password) {
        const query = `SELECT em_id name,email, password FROM employee WHERE email ='${req.body.Email}' `;
        let queryUpdateTime = `UPDATE employee SET lastLoginAt = CONVERT_TZ(NOW(),\'+00:00\',\'+05:30\') WHERE email='${req.body.Email}';`;
        const hash = createHmac('sha256', 'secret').update(req.body.Password).digest('hex');
        await databaseCon.query(query, (err, rows, fields) => {
            if (err) throw new errHandler(404, 'Something wents wrong in this Mysql  Auth');
            if (rows.length > 0) {
                if (req.body.Email == rows[0].email && hash == rows[0].password) {
                    req.session.isLoggedIn = true;
                    req.session.email_id = req.body.Email;
                    req.session.id = rows[0].em_id;
                    req.session.role = 'employee';
                    req.session.cookie.expires = new Date(Date.now() + 10 * 60 * 60 * 1000);
                    req.session.cookie.maxAge = 10 * 60 * 60 * 1000;
                    databaseCon.query(queryUpdateTime, (err) => { if (err) throw new errorHandler(404, err); })
                    res.redirect(`/`);
                } else {
                    res.status(503).send('unauthorized')
                }
            } else {
                res.redirect(`/`)
            }
        })
    }
}
exports.logout = (req, res) => {
    let queryUpdateTime = `UPDATE employee SET lastLogoutAt = CONVERT_TZ(NOW(),\'+00:00\',\'+05:30\') WHERE email='${req.session.email_id}'`;
    req.session.destroy();
    databaseCon.query(queryUpdateTime, (err) => { if (err) throw new errorHandler(404, err); })
    res.redirect(`/`)
}
