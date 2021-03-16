const hbs = require('nodemailer-express-handlebars');
const nodemailer = require('nodemailer');

const sendMail =async (reciever,token)=>{

    return new Promise((resolve,reject)=>{

        const smtpTransport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                 type: "OAuth2",
                 user: "med.dev.checker@gmail.com", 
                 clientId: `${process.env.GMAIL_CLIENT_ID}`,
                 clientSecret: `${process.env.GMAIL_CLIENT_SECRET}`,
                 refreshToken: `${process.env.GMAIL_REFRESH_TOKEN}`
            }
       });
    
       smtpTransport.use('compile' ,hbs({
            viewEngine : {
                extname : '.hbs',
                layoutsDir : 'mailTemplate' ,
                partialsDir : 'mailTemplate' , 
                defaultLayout : 'mail'
            },
            viewPath : 'mailTemplate',
            extName : '.hbs'
        }));
    
        const mailOptions = {
            from: "med.dev.checker@gmail.com",
            to: reciever,
            subject: "Email verification",
            template : 'mail' , 
            context : {
                msg : 'Verify your email' , 
                link : `${process.env.WEBSITE_ORIGINE}/confirm_email?token=${token}`
            }
        };
    

        smtpTransport.sendMail(mailOptions, (err, response) => {

            if(err) resolve({err});
            else{
                smtpTransport.close();
                resolve({success : true});
            }
       });

    });

};

module.exports = sendMail;