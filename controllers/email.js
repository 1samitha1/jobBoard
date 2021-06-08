const nodemailer = require('nodemailer');

const sendEmail = (receivers, content, subject) =>{
    try{
         return new Promise((resolve, reject) => {

 
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                port:465,
                secure: true, // true for 465, false for other ports
                secureConnection: false, 
                auth: {
                    user: "testdevelopments123@gmail.com", 
                    pass: "testDevelopment@123", 
                },
                tls:{
                    rejectUnauthorized:false
                }
            });

            console.log('vvvv email testAccount.user : ', receivers.join())
             let mailOptions = {
                from: '"Smart Job Board" <admin@jobboard.com>', // sender address
                to:  receivers.join(), 
                subject: subject, 
                text: "Job Board Invitation",
                html: content, 
            }

            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    reject({success:false, msg: "Error while sending email"})
                  console.log(error);
                } else {
                    if(info.response){
                        resolve({success:true, msg: "Sent Successfuly"})
                    }
                }
              });

         });

    }catch(err){
        console.log("err ", err)
    }

}
module.exports = {
    sendEmail
  };