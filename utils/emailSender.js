const { mailer } = require('./mailer');
const dbCon = require('../config/db.config.js')
const path = require('path')
const { errorHandler } = require('../utils/errorHandler');


let mailConf = {
    subject: {
        remove: 'You Have Been Removed From Project',
        add: 'You Are Added To Projrect'
    }
}



const EmailSender = async (mail, type, e) => {
    try {
        query=``
        dbCon.query(query,async(err,result)=>{
            const email = mail;
            const subject = type == 'add' ? mailConf.subject.add : mailConf.subject.remove;
            const text = type == 'add' ? mailConf.subject.add : mailConf.subject.remove;
            const htmlFile = path.join(__dirname, '../src/email-templates/email.html');
            const htmlData = { name: e.name ,msg1:e.msg};
            await mailer(email, subject, text, htmlFile, htmlData);
        })
    } catch (error) {
        new errorHandler('503', 'Unable to send the Email, Recheck utils/emailSender.js:15\n' + err)
    }
};

// EmailSender('aditya01377@gmail.com', 'add', { name: 'Panchanan',msg:'You are removed from Project 20154 ' });

module.exports={EmailSender}