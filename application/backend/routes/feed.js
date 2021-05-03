const express = require('express');
const connection = require('../db');
const router = express.Router();

router.get("/api/get-feed-user",(req,res)=>{
    console.log("/api/get-feed-user");
    connection.query(
        `SELECT User.first_name, Profile.profile_pic_link
         FROM User
         LEFT JOIN Account on User.user_id = Account.user_id
         LEFT JOIN Credentials on Account.account_id = Credentials.acct_id
         LEFT JOIN Profile on Account.account_id = Profile.account_id
         WHERE Credentials.username = ?`, [req.session.username], 
         function(err, feedUser){
             if(err){
                console.log(err);
             }
             else{
                 console.log(feedUser);
                 res.status(200).json(feedUser);
             }
         }
    )
})

module.exports = router