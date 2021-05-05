const express = require('express');
const router = express.Router();

const connection = require('../db');

router.post("/api/upload-post", (req, res) => { // uploading a post

    console.log("/api/upload-post");
    const postBody = req.body.postBody;
    console.log("Post Body: ", postBody);
    const username = req.session.username;  //username for currently logged in user on browser
    console.log("Username: ", username);
    const photoLink = req.body.photoLink;
    console.log("Photo Link: ", photoLink);

    connection.query(`INSERT INTO Post (body, reg_user_id, like_count, comment_count) 
    VALUES 
    ('${postBody}', 
    (SELECT RegisteredUser.reg_user_id
     FROM RegisteredUser
     JOIN User ON RegisteredUser.user_id = User.user_id
     JOIN Account ON User.user_id = Account.user_id
     JOIN Credentials ON Account.account_id = Credentials.acct_id
     WHERE Credentials.username= '${username}'), 
     0, 
     0)`, 
     (error, post) => {
        if (error) {
            console.error(error);
            res.status(500).json(error);
        } else {
            console.log(post)



            connection.query(`INSERT INTO Photo (link, post_id) VALUES ('${photoLink}','${post.insertId}')`, (error, photo) => {
                if (error) {
                    console.error(error);
                    res.status(500).json(error);
                }
                console.log("image was inserted!")
            });

            res.status(200).json(post);
        }

    });


});

module.exports = router