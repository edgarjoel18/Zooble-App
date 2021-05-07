const express = require('express');
const connection = require('../db');
const router = express.Router();

router.post("/api/reply",(req,res)=>{
    connection.query(
        `INSERT INTO Message (subject, body, sender_id, recipient_id, timestamp, reply_id, read)
         VALUES ('${"RE: " + req.body.selectedMessage.subject}', '${req.body.replyBody}', '${req.session.reg_user_id}', '${req.body.selectedMessage.sender_id}', NOW(), '${req.body.selectedMessage.message_id}', false)`,
    function(err, result){
        if(err){
            console.log(err);
            res.status(500).json(err);
        }
        else{
            console.log(result)
            res.status(200).json(result);
        }
    })    
})

router.get("/api/messages", (req,res) =>{
    connection.query(`SELECT * FROM Message WHERE recipient_id= '${req.session.reg_user_id}'`,
    function(err,messages){
        if(err){
            console.log(err);
            res.status(500).json(err);
        }
        else{
            console.log(result)
            res.status(200).json(messages);
        }
    })
})

router.post("/api/message", (req,res) =>{
    connection.query(`INSERT INTO Message`,
    function(err,messages){
        if(err){
            console.log(err);
            res.status(500).json(err);
        }
        else{
            console.log(result)
            res.status(200).json(messages);
        }
    })
})

module.exports = router