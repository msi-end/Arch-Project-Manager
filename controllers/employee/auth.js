const errorHandler = require('../../middleware/error');
const databaseCon = require('../../config/db.config');
const { createHmac } = require('crypto');

exports.CheckLoginServe =(req, res) => {
    if (req.session.isLoggedIn == true && req.session.role == 'employee') {
        res.status(200).render('../../views/employee/dashboard.js')
    } else {
        res.status(200).render('../../views/employee/login.js')
    }
    // throw new errorHandler.errHandler()
}



exports.Auth = async (req, res) => {
    if (req.body.Username && req.body.Password) {
        const query = ` Set databse query here`;
        const hash = createHmac('sha256', 'secret').update(req.body.Password).digest('hex');
        await databaseCon.query(query, (err, rows, fields) => {
            // if (err) throw new errorHandler(404, 'Something wents wrong in this Mysql Admin Auth')
            if (rows.length > 0) {
                if (req.body.Username == rows[0].username && hash == rows[0].password) {
                    req.session.isLoggedIn = true;
                    req.session.user_id = req.body.Username;
                    req.session.role = 'employee';
                    req.session.cookie.expires = new Date(Date.now() + 10 * 60 * 60 * 1000);
                    req.session.cookie.maxAge = 10 * 60 * 60 * 1000;
                    res.redirect(`/`);
                } else {
                    res.status(503).send('unauthorized')
                }
            } else {
                // error page >
                res.redirect(`/`)
            }
        })
    }
}

exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect(`/`)
}
