const nmailer = require('nodemailer');
const { errHandler } = require('../utils/errorHandler')
const { email: config } = require('../config/mail.config');
const fs = require('fs')

const transporter = nmailer.createTransport(
    {
        service: "gmail",
        host: config.host,
        port: config.port,
        // secure: config.secure,
        auth: {
            type: "OAuth2",
            user: "your.gmail.here@gmail.com",
            clientId: "Your ClientID Here",
            clientSecret: "Your Client Secret Here",
            refreshToken: "Your Refresh Token Here",
            accessToken: accessToken
        }
    })
const emailTemplate = (filepath, data) => {
    let fileDate = fs.readFileSync(filepath, 'utf8');
    for (const [key, value] of Object.entries(data)) {
        const changeData = new RegExp(`{{${key}}}`, 'g');
        fileDate = fileDate.replace(changeData, value);
    }
    return fileDate;
}
const EmailNotifier = async (email, subject, text, htmlFile, htmlData) => {
    try {
        let template = emailTemplate(htmlFile, htmlData);
        const options = {
            from: config.user,
            email,
            subject,
            text,
            html: template
        }
        let sendInfoStatus = await transporter.sendMail(options);
        return sendInfoStatus;
    } catch (err) {
        console.log('Error in Emaial Sender', err)
        throw new errHandler('503', 'Unable to send the Email, Recheck utils/mailer.js:26')
    }
}

module.exports = { EmailNotifier };