const express = require('express');
const router = express.Router();

const connection = require('../db');

router.post("/api/follow-user", (req, res) => { // follow user

    console.log("/follow-user");
    const followerId = req.body.followerId;
    const userId = req.body.userId;

    connection.query(`INSERT INTO Follow (follower_id, reg_user_id) VALUES ('${req.session.reg_user_id}','${userId}')`, (error, follow, fields) => {  //anytime we use the currently logged in user's information we use the id stored in session
        if (error) {
            console.error('An error occurred while executing the query');
            res.status(500).json(error);
        } else {
            console.log("Follower has been added");
            //We don't have followers_count in Profile database entity but I think we should,
            // then it would be updated in this section.
            res.sendStatus(200);
        }
    });

});

router.post("/api/unfollow-user", (req, res) => { // follow user

    console.log("/unfollow-user");
    const followerId = req.body.followerId;
    const userId = req.body.userId;

    connection.query(`DELETE FROM Follow WHERE reg_user_id = '${userId}' AND follower_id = '${followerId}'`, (error, unfollow, fields) => {
        if (error) {
            console.error('An error occurred while executing the query');
            res.status(500).json(error);
        } else {
            console.log("unfollowed");
            //We don't have followers_count in Profile database entity but I think we should,
            // then it would be updated in this section.
            res.sendStatus(200);
        }
    });
});

module.exports = router