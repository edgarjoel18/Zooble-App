const express = require('express');
const connection = require('../db');
const router = express.Router();

router.get("/api/get-current-user-pets",(req,res)=>{
    connection.query(
        `SELECT *
         FROM Profile
         JOIN RegisteredUser ON RegisteredUser.reg_user_id = '${[req.session.reg_user_id]}'
         JOIN Account ON Account.user_id = RegisteredUser.user_id
         WHERE (Profile.account_id = Account.account_id
         && Profile.profile_id != '${req.session.profile_id}')`,
         function(err, userPets){
             if(err){
                 console.log(err);
             }
             console.log(userPets);
             res.status(200).json(userPets);
         })
})

module.exports = router