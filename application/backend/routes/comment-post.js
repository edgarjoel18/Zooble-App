const express = require('express');
const router = express.Router();

const connection = require('../db');

router.post("/api/comment-post", (req, res) => { // comment on a post

    console.log("/comment-post");
    const commentBody = req.body.body;
    const postID = req.body.postId;
    const userID = req.body.userId;

    connection.query(`INSERT INTO Comment (body, reg_user_id, timestamp, like_count, post_id) VALUES ('${commentBody}','${userID}', NOW(), 0, '${postID}')`, (error, comment, fields) => {
        if (error) {
            console.error('An error occurred while executing the query');
            res.status(500).json(error);
        } else {
            console.log("Comment body has been added");
            res.sendStatus(200);
        }
    });



});

module.exports = router