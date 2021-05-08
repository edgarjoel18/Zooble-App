const express = require('express');
const router = express.Router();
const connection = require('../db');
const nodemailer = require('nodemailer');

var randomToken = require('random-token');

router.get("/api/reset", (req, res) => {

    const email = req.body.email;

    if(req.body.email == ''){
        res.status(400).send('Email required');
    }
    connection.query('SELECT * FROM Credentials WHERE email = ?', [email], function(error, results, fields){
        if(results.length > 0 && email == results[0].email){
            const token = randomToken(16);
            // Needs to be inserted into a "token" column in the user in the
            // database
            const resetPasswordToken = token;
            const passwordExpires = Date.now() + 140000000;
            
        }else{
            console.log("No Email");
            res.status(400).json("no email exists");
        }
    });

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: `${process.env.EMAIL_ADDRESS}`,
            pass: `${process.env.EMAIL_PASSWORD}`,
        },
    });

    const mailOptions = {
        from: 'mySqlDemoEmail@gmail.com',
        to: `${email}`,
        subject: `Link to Reset Zooble Password`,
        text:
            'You are recieving this email because you (or another party) have requested the reset of the password \n\n' +
            'associated with your account. Please click on the following link, or paste this into your browser to \n\n' +
            'complete the process: \n\n' +
            `zooble.link/reset/${token}\n\n` +
            'If you did not request the reset, please ignore this e-mail. \n',
    };

    transporter.sendMail(mailOptions, (err, response) => {
        if(err){
            console.error("Error: ", err);
        } else {
            console.log("Here is the response: ", response);
            res.status(200).json('recovery email sent');
        }
    });
});

module.exports = router