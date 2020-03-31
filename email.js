const nodemailer = require("nodemailer");

const transport =  nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port:465,
    secure: true,
    auth: {
        type: 'OAuth2',
        user: process.env.SENDER_EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
})

transport.verify((error, success) => {
    if(error) {
        console.log(error);
    } else {
        console.log(success);
    }
})

module.exports = transport