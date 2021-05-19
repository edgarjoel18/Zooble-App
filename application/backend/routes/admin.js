const express = require('express');
const router = express.Router();

const connection = require('../db');

router.get("/api/get-admin-feed-posts",(req,res)=>{
    console.log("/api/get-admin-feed-posts");
    let username = req.session.username;
    let postsWithLikes = []; //array for holding objects with posts and likes
    connection.query(
        `SELECT Post.post_id, Post.timestamp, Post.body, Post.like_count, Profile.display_name, Profile.profile_pic_link, Profile.pet_id, Photo.link, Post.flag_count
         FROM Post
         LEFT JOIN Photo ON Post.post_id = Photo.post_id
         LEFT JOIN RegisteredUser ON RegisteredUser.reg_user_id = Post.reg_user_id
         LEFT JOIN User ON RegisteredUser.user_id = User.user_id
         LEFT JOIN Account ON User.user_id = Account.user_id
         LEFT JOIN Profile ON Account.account_id = Profile.account_id
         AND Profile.pet_id IS NULL
         ORDER BY Post.flag_count DESC
        `,
        function(err, posts){
            if(err)
                console.log(err);
            else{
                res.status(200).json(posts);
            }
        }
    )

})

module.exports = router