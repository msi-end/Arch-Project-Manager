const nmailer = require('nodemailer');
const { errHandler } = require('../middleware/error')
const { email: config } = require('../config/mail.config');

const transporter = nmailer.createTransport(
    {   host: config.host,
        port: config.port,
        secure: config.secure,
        auth: {
            user: config.user,
            pass: config.pass }
    })


const EmailNotifier = async (email, subject, text, htmlFile) => {
    try { const options = {
            from: config.user,
            to,
            subject,
            text,
            html: htmlFile}
        let sendInfoStatus = await transporter.sendMail(options);
        return sendInfoStatus;
    } catch (err) {
        console.log('Error in Emaial Sender', err)
        throw new errHandler('503', 'Unable to send the Email, Recheck utils/mailer.js:26')
    }
}