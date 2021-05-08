const express = require('express');
const connection = require('../db');
const router = express.Router();

router.get("/api/get-current-user-pets",(req,res)=>{
    console.log("/api/get-current-user-pets");

    //get all profiles that are owned by the current user, but only the profiles associated with pets and not the profile that is the profile the user is on already
    connection.query(
        `SELECT *
         FROM Profile
         WHERE 
         (Profile.account_id = (SELECT Account.account_id FROM Account JOIN Profile ON Profile.profile_id = '${req.query.profileID}' WHERE Account.account_id = Profile.account_id)) AND (Profile.profile_id != '${req.query.profileID}') AND (Profile.pet_id IS NOT NULL)`,
         function(err, userPets){
             if(err){
                 console.log(err);
             }
             console.log("userPets: ",userPets);
             res.status(200).json(userPets);
         })
})

router.get("/api/current-user-pets",(req,res)=>{
    console.log("/api/current-user-pets");
    
    //get all profiles that are owned by the current user, but only the profiles associated with pets
    connection.query(
        `SELECT Profile.pet_id, Profile.display_name, Profile.profile_pic_link
         FROM Profile
         WHERE 
         (Profile.account_id = (SELECT Account.account_id FROM Account JOIN Profile ON Profile.profile_id = '${req.session.profile_id}' WHERE Account.account_id = Profile.account_id))  AND (Profile.pet_id IS NOT NULL)`,
         function(err, userPets){
             if(err){
                 console.log(err);
             }
             console.log("userPets: ",userPets);
             res.status(200).json(userPets);
         })
})

module.exports = router