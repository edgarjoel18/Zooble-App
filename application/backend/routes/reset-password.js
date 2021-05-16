const express = require('express');
const connection = require('../db');
const router = express.Router();

const nodemailer = require('nodemailer');
const randomToken = require('random-token');

router.post("/api/resetpassword", (req, res) => {
    console.log("/resetpassword")
    console.log(req)

    const email = req.body.email;

    if(req.body.email == ''){
        res.status(400).send('Email required');
    }

    connection.query('SELECT * FROM Credentials WHERE email = ?', [email], function(error, results, fields){
        console.log(results)
        if(results.length > 0 && email == results[0].email){
            const token = randomToken(16);
            // Needs to be inserted into a "token" column in the user in the
            // database
            const resetPasswordToken = token;
            const passwordExpires = Date.now() + 140000000;
            connection.query(`INSERT INTO Credentials (token, expires) VALUES ('${resetPasswordToken}', NOW() + INTERVAL 48 HOUR)')`, function(error, results, fields){
                console.log("Inserted")
            });        
            
        }else{
            console.log("No Email");
            res.status(400).json("no email exists");
        }
    });

    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'gideon.mcclure@ethereal.email',
            pass: 'THX48h5WWyfJNycS7w'
        }
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