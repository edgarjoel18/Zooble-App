const express = require('express');
const connection = require('../db');
const router = express.Router();

router.get("/api/get-profile-pic", (req,res) =>{
    connection.query(
        `SELECT Profile.profile_pic_link
         FROM Profile
         JOIN Credentials ON Credentials.acct_id = Profile.account_id
         WHERE Credentials.username = '${req.session.username}'`,
        function(err,link){
            if(err)
                console.log(err);
            else{
                res.status(200).json(link[0]); //should be only one profile pic
            }
        }
    )
})

router.get("/api/profile", (req,res) =>{
    let selfViewFlag=false
    console.log("GET /api/profile")
    connection.query(
        `SELECT Profile.profile_pic_link, Profile.display_name, Profile.about_me, Profile.type, Profile.account_id, Profile.profile_id, Pet.reg_user_id,Profile.pet_id
         FROM Profile
         LEFT JOIN Pet ON Profile.pet_id = Pet.pet_id
         WHERE Profile.profile_id = '${req.query.profileID}'`,
         function(err, profile){
             if(err){
                console.log(err);
                res.status(500).json(err);
             }
             else if(profile && profile[0].pet_id === null){ //if its not a pet profile, no need to check if the pet is owned by the profile viewer
                console.log(profile);
                console.log("not a pet profile")
                 if(profile[0].profile_id === req.session.profile_id){ //if the profile id is the same as the user who is currently logged in
                     //then set selfView flag to true
                     console.log("profile owned by logged in user")
                     selfViewFlag = true;
                 }
             }
             else{ //its a pet_profile
                console.log("pet profile")
                 if(profile && profile[0].reg_user_id === req.session.reg_user_id){ //if pets reguserid (owner) matches currently logged in user
                    console.log("pet owned by profile viewer")
                     //then set selfView flag to true
                     selfViewFlag = true
                 }
             }
             let response = {
                 profile : profile[0],
                 selfView: selfViewFlag
             }
             res.status(200).json(response);
         }
         

    )
})

router.get("/api/photo-posts", (req,res) =>{
    console.log(req.query);
    console.log("GET /api/photo-posts")
    connection.query(
        `SELECT *
         FROM Photo
         LEFT JOIN Post ON Photo.post_id = Post.post_id
         JOIN RegisteredUser ON Post.reg_user_id = RegisteredUser.reg_user_id
         JOIN Account ON RegisteredUser.user_id = Account.user_id
         JOIN Profile ON Account.account_id = Profile.account_id
         WHERE Profile.profile_id = '${req.query.profileID}'`,
        function(err, photoPosts){
            if(err){
               console.log(err);
            }
            else{
                console.log("photoPosts: ", photoPosts);
                res.status(200).json(photoPosts);
            }
        }
    )
})

router.post("/api/profile-pic", (req,res) =>{
    console.log(req.body);
    console.log("POST /api/profile-pic")
    connection.query(`UPDATE Profile SET profile_pic_link = '${req.body.photoLink}' WHERE Profile.profile_id =${req.session.profile_id}`,
        function(err, result){
            if(err){
                console.log(err)
                res.status(500).json(err);
            }
            else{
                console.log(result);
                res.status(200).json(result);
            }
        }
    )
})

router.get("/api/profile-display-name", (req,res) =>{
    console.log(req.body);
    console.log("GET /api/profile-display-name")
    connection.query(`SELECT Profile.display_name
     FROM Profile
     WHERE Profile.profile_id = '${req.query.profileID}'`,
        function(err, results){
            if(err){
                console.log(err)
                res.status(500).json(err);
            }
            else{
                console.log(results);
                res.status(200).json(results[0]);
            }
        }
    )
})

module.exports = router