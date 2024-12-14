const { createHmac } = require('crypto')
const { mailer } = require('./utils/mailer');
const path = require('path')
const mysql = require('mysql');


require('dotenv').config({ path: path.resolve(__dirname, `./.env.${process.env.NODE_ENV}`) });

let databaseCon = mysql.createPool({
    host: process.env.MySQL_host,
    user: process.env.MySQL_user,
    password: process.env.MySQL_pass,
    database: process.env.MySQL_db,
    multipleStatements: true,
})
databaseCon.getConnection((error) => {
    if (error) {
        console.log('there is an error bro!' + error)
    } else {
        console.log('connected to datbase!')
    }
})

// console.log(createHmac('sha256', 'secret').update('msi').digest('hex'));

const main = async (e) => {
    try {
        const email = e;
        const subject = 'Test';
        const text = ' email.';
        const htmlFile = path.join(__dirname, '../src/email-templates/email.html');
        const htmlData = { name: 'John' };
        await mailer(email, subject, text, htmlFile, htmlData);
    } catch (error) {
        console.log(error);
    }
};
const create = async (name, email, password, role) => {
    const hash = createHmac('sha256', 'secret').update(password).digest('hex');
    const query = `INSERT INTO adminauth(name, email, password, role) VALUES (?, ?, ?, ?)`;
    await databaseCon.query(query, [name, email, hash, role], (err, rows, fields) => {
        if (err) { console.log('Something went wrong in this Mysql Admin Auth' + err, process.env.MySQL_db) }
        else { console.log('Data created !'); };
    });
};
const name = process.argv[2];
const email = process.argv[3];
const password = process.argv[4];
const role = process.argv[5];
create(name, email, password, role)
// main('aditya01377@gmail.com')
// main('kamal013777@gmail.com')
// 77ee3625f508f3051360327fb67668b2ba769f13f56599bb45a4a923bb850c49

// NODE_ENV=development node runner.js msi msi@gmail.com msi admin