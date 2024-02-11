const { mailer } = require('./mailer');
const dbCon = require('../config/db.config.js')
const path = require('path')
const { errorHandler } = require('../utils/errorHandler');


let mailConf = {
    subject: {
        remove: 'You Have Been Removed From Project',
        add: 'You Are Added To Project'
    },
    template:{
        remove:'../src/email-templates/remove.html',
        add:'../src/email-templates/add.html',
    }
}


// ndeal_id, npcid ,category_id, emid
const EmailSender = async (type,proj, e) => {
    try {
        query=`SELECT deal_name, reference_no  FROM deals WHERE id =${e.ndeal_id};SELECT task_name FROM task WHERE task_id =  ${e.category_id};SELECT name , email FROM employee WHERE em_id = ${e.emid} ;`
        query2=`SELECT sdeal_name as deal_name ,reference_no FROM single_deal WHERE sdid = ${e.sdeal_id};SELECT msub_task_name as task_name FROM mis_subtask WHERE msub_task_id = ${e.mtask} ;SELECT name,email FROM employee WHERE em_id = ${e.emid}`
        let ProjectType= proj=='normal'?"Normal":"Miscellaneous"
        dbCon.query(proj=='normal'?query:query2,async(err,result)=>{
            if(err){console.log(err);}
            const email = result[2][0].email;
            const subject = type == 'add' ? mailConf.subject.add : mailConf.subject.remove;
            const text = type == 'add' ? mailConf.subject.add : mailConf.subject.remove;
            const htmlFile = path.join(__dirname, type=='add'?mailConf.template.add:mailConf.template.remove);
            const htmlData = { name: result[2][0].name ,ref:result[0][0].reference_no,project:result[0][0].deal_name,task:result[1][0].task_name,ProjectType:ProjectType};
            await mailer(email, subject, text, htmlFile, htmlData);
        })
    } catch (err) {
        new errorHandler('503', 'Unable to send the Email, Recheck utils/emailSender.js:15\n' + err)
    }
};

// EmailSender('remove','normal', {  ndeal_id:'5' ,category_id:'1', emid:'1' });

module.exports={EmailSender}