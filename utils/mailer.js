const nmailer = require('nodemailer');
const { errHandler } = require('../middleware/error')
const { email: config } = require('../config/mail.config');
const fs =require('fs')

const transporter = nmailer.createTransport(
    {   host: config.host,
        port: config.port,
        secure: config.secure,
        auth: {
            user: config.user,
            pass: config.pass } })
    const emailTemplate =(filepath , data)=>{
       let fileDate = fs.readFileSync(filepath,'utf8');
        for(const [key , value] of Object.entries(data)){
            const changeData = new RegExp(`{{${key}}}`,'g');
            fileDate=fileDate.replace(changeData,value);
        }
        return fileData;
    }
const EmailNotifier = async (email, subject, text, htmlFile,htmlData) => {
    try { 
        let template= emailTemplate(htmlFile,htmlData);
        const options = {
            from: config.user,
            email,
            subject,
            text,
            html: template}
        let sendInfoStatus = await transporter.sendMail(options);
        return sendInfoStatus;
    } catch (err) {
        console.log('Error in Emaial Sender', err)
        throw new errHandler('503', 'Unable to send the Email, Recheck utils/mailer.js:26')
    }
}

module.exports={EmailNotifier};