const express = require('express');
const connection = require('../db');
const router = express.Router();

router.get("/api/get-current-user-pets",(req,res)=>{
    connection.query(
        `SELECT *
         FROM Profile
         WHERE 
         (Profile.account_id = (SELECT Account.account_id FROM Account JOIN Profile ON Profile.profile_id = '${req.query.profileID}' WHERE Account.account_id = Profile.account_id)) AND (Profile.profile_id != '${req.query.profileID}') AND (Profile.pet_id IS NOT NULL)`,
         function(err, userPets){
             if(err){
                 console.log(err);
             }
             console.log(userPets);
             res.status(200).json(userPets);
         })
})

module.exports = router