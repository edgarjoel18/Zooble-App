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
    console.log("GET /api/profile")
    connection.query(
        `SELECT Profile.profile_pic_link, Profile.display_name, Profile.about_me, Profile.type
         FROM Profile
         WHERE Profile.profile_id = '${req.query.profileID}'`,
         function(err, profile){
             if(err){
                console.log(err);
             }
             else{
                 console.log(profile[0]);
                 res.status(200).json(profile[0]);
             }
         }
    )
})

router.get("/api/get-photo-posts", (req,res) =>{
    console.log(req.query);
    console.log("GET /api/get-photo-posts")
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

module.exports = router