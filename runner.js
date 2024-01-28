const { createHmac } = require('crypto')
const { mailer } = require('./utils/mailer');
const path = require('path')
const databaseCon = require('./config/db.config');


// console.log(createHmac('sha256', 'secret').update('msi').digest('hex'));

const main = async () => {
    try {
        const email = 'aditya01377@gmail.com';
        const subject = 'Test';
        const text = ' email.';
        const htmlFile = path.join(__dirname, './src/email-templates/email.html');
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
        if (err) { console.log('Something went wrong in this Mysql Admin Auth') }
        else { console.log('Data created !'); };
    });
};
const name = process.argv[2];
const email = process.argv[3];
const password = process.argv[4];
const role = process.argv[5];

if (!name || !email || !password || !role) {
    console.error('Usage: node script.js <name> <email> <password> <role>');
    process.exit(1);
}
create(name, email, password, role);