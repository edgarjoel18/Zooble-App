const express = require('express');
const connection = require('../db');
const router = express.Router();

router.post("/api/edit-about-me", (req,res) =>{
    console.log(req.body.aboutMeText);
    //may need to change this to support pet profile
    console.log("POST /api/edit-about-me")
    connection.query(
        `UPDATE Profile
         SET about_me = '${req.body.aboutMeText}'
         WHERE profile_id = '${req.session.profile_id}' `,
         function (err, result){
             if(err){
                 console.log(err);
                 res.status(500).json(err)
             }
             console.log(result)
             res.status(200).json(result)
         }
    )
})


module.exports = router