const nmailer = require('nodemailer');
const { errHandler } = require('../utils/errorHandler')
const { email: config } = require('../config/mail.config');
const fs = require('fs');

const transporter = nmailer.createTransport(
    {
        service: "gmail",
        // host: config.host,
        // port: config.port,
        // secure: config.secure,
        auth: {
            // user:config.user,
            // pass:config.pass
            type: "OAuth2",
            user: config.user,
            clientId: "1023914290850-j72n4fkjm98hc0j32qvagpmjjg3bdsem.apps.googleusercontent.com",
            clientSecret: "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",
            refreshToken: "1//04APZ91Gsd_ZpCgYIARAAGAQSNwF-L9IryJhXNwo-hz5GgaYkuPh1qttdtXK84Auuzv_UyQHgF0mJ09yhd0Ula1PrDGMGnTJtELg",
            accessToken: "a0AfB_byBgQUUtYupAiaG8E94dNH3D4NI0_u7rmmql"
        },
        tls: {
            rejectUnauthorized: false
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
           to: email,
           subject: subject,
           text: text,
            html: template
        }
        let sendInfoStatus = await transporter.sendMail(options);
        return sendInfoStatus;
    } catch (err) {
        console.log('Error in Emaial Sender', err)
        // throw new errHandler('503', 'Unable to send the Email, Recheck utils/mailer.js:26')
    }
}

module.exports = { EmailNotifier };