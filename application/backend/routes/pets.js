const express = require('express');
const connection = require('../db');
const router = express.Router();

router.get("/api/get-current-user-pets",(req,res)=>{
    connection.query(
        `SELECT Pet.name
         FROM Pet
         LEFT JOIN RegisteredUser on RegisteredUser.reg_user_id = Pet.reg_user_id
         LEFT JOIN User on User.user_id = RegisteredUser.user_id
         LEFT JOIN Account on Account.user_id = User.user_id
         LEFT JOIN Credentials on Credentials.acct_id = Account.account_id
         WHERE Credentials.username = ?`, [req.session.username],
         function(err, userPets){
             if(err){
                 console.log(err);
             }
             console.log(userPets);
             res.status(200).json(userPets);
         })
})

module.exports = router