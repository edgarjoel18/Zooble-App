const express = require('express');
const router = express.Router();

const connection = require('../db');

router.post("/api/upload-post", (req, res) => { // uploading a post

    console.log("/upload-post");
    const postBody = req.body.body;
    const userId = req.body.userId;
    // const imageLink = req.body.imageLink;
    const imageLink = 'https://csc648groupproject.s3-us-west-2.amazonaws.com/MimiPic.jpg';

    connection.query(`INSERT INTO Post (body, reg_user_id, timestamp, like_count, comment_count) VALUES ('${postBody}','${userId}', NOW(), 0, 0)`, (error, post, fields) => {
        if (error) {
            console.error('An error occurred while executing the query');
            res.status(500).json(error);
        } else {
            console.log(post)

            connection.query(`INSERT INTO Photo (link, post_id) VALUES ('${imageLink}','${post.post_id}')`, (error, photo, fields) => {
                if (error) {
                    console.error('An error occurred while executing the query, INSERT INTO Photo');
                    res.status(500).json(error);
                }
                console.log("image was inserted!")

            });

            res.status(200).json(post);
        }

    });


});

module.exports = router