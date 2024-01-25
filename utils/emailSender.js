const {mailer} = require('./mailer');
const path = require('path')

const EmailSender = async () => {
    try {
        const email = 'aditya01377@gmail.com';
        const subject = 'Test';
        const text = ' email.';
        const htmlFile = path.join(__dirname, './src/email-templates/email.html');
        const htmlData = { name: 'John' };
        await mailer(email, subject, text, htmlFile,htmlData);
    } catch (error) {
       console.log(error);
    }
};

EmailSender();