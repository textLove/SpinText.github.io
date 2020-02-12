const functions = require('firebase-functions');
const admin = require("firebase-admin");
const fs = require('fs');
const nodemailer = require('nodemailer');

admin.initializeApp();

const gmailEmail = "nivendhawar2@gmail.com";
const gmailPassword = "";


var htmlmail = fs.readFileSync("index.html", "utf-8").toString();

var sendWelcomeEmail = functions.auth.user().onCreate(async (user) => {
    const recipent_email = user.email;
    const name = user.displayName;
    console.log('New User ==',recipent_email);
    try {

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: gmailEmail,
                pass: gmailPassword,
            },
        });
        let info = await transporter.sendMail({
            from: '"nivendhawar2" <nivendhawar2@gmail.com>',
            to: "knivendha@gmail.com", // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Hello world?</b>" // html body
        });
        console.log("Message sent: %s", info.messageId);



    } catch (error) {
        console.error('There was an error while sending the email:', error);
    }
    return null;
});

exports.sendWelcomeEmail = sendWelcomeEmail;