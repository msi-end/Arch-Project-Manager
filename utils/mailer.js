const nmailer = require('nodemailer');
const { google } = require('googleapis');
const { errorHandler } = require('../utils/errorHandler');
const { email: config } = require('../config/mail.config');
const fs = require('fs');

const oAuth2Client = new google.auth.OAuth2(
    config.clientID,
    config.clientSecret,
    config.redirectURI
);
oAuth2Client.setCredentials({ refresh_token: config.refreshToken });
let accessToken;

const transporter = nmailer.createTransport(
    {
        service: "gmail",
        auth: {
            type: "OAuth2",
            user: config.user,
            clientId: config.clientID,
            clientSecret: config.clientSecret,
            refreshToken: config.refreshToken,
            accessToken: accessToken,
        },
        // tls: { rejectUnauthorized: false }
    })
const emailTemplate = (filepath, data) => {
    let fileDate = fs.readFileSync(filepath, 'utf8');
    for (const [key, value] of Object.entries(data)) {
        const changeData = new RegExp(`{{${key}}}`, 'g');
        fileDate = fileDate.replace(changeData, value);
    }
    return fileDate;
}
const mailer = async (email, subject, text, htmlFile, htmlData) => {
    try {
        accessToken = await oAuth2Client.getAccessToken();
        let template = emailTemplate(htmlFile, htmlData);
        const options = {
            from: `EBHA Admin <${config.user}>`,
            to: email,
            subject: subject,
            text: text,
            html: template
        }
        let sendInfoStatus = await transporter.sendMail(options, (err, info) => {
            if (err) {
                new errorHandler('503', 'Unable to send the Email, Recheck utils/mailer.js:18\n' + err)
            }
        });
    } catch (err) {
        new errorHandler('503', 'Unable to send the Email, Recheck utils/mailer.js:26\n' + err)
    }
}
module.exports = { mailer };