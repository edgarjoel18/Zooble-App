const express = require('express');
const router = express.Router();

const connection = require('../db');

router.post("/api/comment", (req, res) => { // comment on a post

    console.log("/comment");
    const commentBody = req.body.body;
    const postID = req.body.postId;

    connection.query(`INSERT INTO Comment (body, reg_user_id, timestamp, like_count, post_id) VALUES ('${commentBody}','${req.session.reg_user_id}', NOW(), 0, '${postID}')`, 
    (error, comment) => {
        if (error) {
            console.error(error);
            res.status(500).json(error);
        } else {
            console.log("Comment body has been added");
            res.status(200).json(comment);
        }
    });
});

router.get("/api/comments", (req,res) =>{
    console.log("/api/comments");
    console.log(req.query);

    console.log("Req.query.postId: ", req.query.post_id);

    connection.query(
        `SELECT Comment.body, Comment.comment_id, Comment.like_count, Comment.timestamp, Profile.profile_pic_link, Profile.display_name
        FROM Comment
        LEFT JOIN RegisteredUser ON Comment.reg_user_id = RegisteredUser.reg_user_id
        LEFT JOIN Account ON RegisteredUser.user_id = Account.user_id
        LEFT JOIN Profile ON Account.account_id = Profile.account_id
        WHERE Comment.post_id = '${req.query.post_id}'`,
        function(err, comments){
            if(err)
                console.log(err);
            else{
                console.log("Comments: ", comments);
                res.status(200).json(comments);
            }
        })
})

module.exports = router