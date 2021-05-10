const express = require('express');
const router = express.Router();

const connection = require('../db');

router.post("/api/follow-unfollow-user", (req, res) => { // follow user
    console.log("POST /api/follow-unfollow-user");
    const {accountId} = req.body

    connection.query(
        `INSERT INTO Follow (follower_id, reg_user_id) 
         VALUES ('${req.session.reg_user_id}',
                (SELECT RegisteredUser.reg_user_id 
                 FROM RegisteredUser
                 JOIN Account ON Account.user_id = RegisteredUser.user_id
                 WHERE Account.account_id = '${accountId}'
                 ))`, 
        function(err, follow){  //anytime we use the currently logged in user's information we use the id stored in session
            if (err) {
                console.error(err);
                    if(err.errno = 1062){  //if duplicate key error means that the post has already been liked by the user
                        console.log(1062);
                        connection.query(
                            `DELETE FROM Follow 
                            WHERE (Follow.reg_user_id = '${req.session.regUserId}'
                            AND Follow.follower_id = (SELECT RegisteredUser.reg_user_id 
                                FROM RegisteredUser
                                JOIN Account ON Account.user_id = RegisteredUser.user_id
                                WHERE Account.account_id = '${accountId}'
                                ))`,
                            function(err, result){
                                if(err){
                                    console.log(err);
                                }
                                else{
                                    console.log("Follower has been deleted")
                                    console.log(result);
                                    res.status(200);
                                    res.end;
                                }
                            }
                        )
                    }
            }
            else {
                console.log("Follower has been added");
                //We don't have followers_count in Profile database entity but I think we should,
                // then it would be updated in this section.
                res.status(200);
                res.end;
            }
    });
});

// router.post("/api/unfollow-user", (req, res) => { // follow user

//     console.log("/unfollow-user");
//     const followerId = req.body.followerId;
//     const userId = req.body.userId;

//     connection.query(`DELETE FROM Follow WHERE reg_user_id = '${userId}' AND follower_id = '${followerId}'`, (error, unfollow, fields) => {
//         if (error) {
//             console.error('An error occurred while executing the query');
//             res.status(500).json(error);
//         } else {
//             console.log("unfollowed");
//             //We don't have followers_count in Profile database entity but I think we should,
//             // then it would be updated in this section.
//             res.sendStatus(200);
//         }
//     });
// });

router.get("/api/followers", (req,res) =>{
    console.log("GET /api/followers");
    connection.query(
        `SELECT Follow.follower_id
         FROM Follow
         WHERE Follow.reg_user_id = ${followingUser}
        `,
        function(err, followers){
            console.log(followers);
        })
})

router.get("/api/following", (req,res) =>{
    const {followingUser} = req.query;
    console.log("GET /api/following");
    connection.query(
        `SELECT Follow.reg_user_id
         FROM Follow
         WHERE Follow.follower_id = ${followingUser}
        `,
         function(err, followings){
             console.log(followings);
         })
})


module.exports = router