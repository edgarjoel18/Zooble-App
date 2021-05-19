const express = require('express');
const router = express.Router();
const connection = require('../db');


router.post('/api/flag-unflag', (req,res) =>{
    const {postToFlag} = req.body;

    connection.query(`INSERT INTO PostFlag VALUES ('${req.session.reg_user_id}', '${postToFlag}')`,
        function(err, result){
            if(err){
                if(err.errno = 1062){
                    console.log(1062);
                    connection.query(
                        `DELETE FROM PostFlag
                        WHERE (PostFlag.reg_user_id = '${req.session.reg_user_id}'
                        AND PostFlag.post_id = '${postToFlag}')`,
                        function(err,result){
                            if(err){
                                console.log(err);
                            }
                            else{
                                console.log(result);
                                res.status(200).json(result)
                            }
                        }
                    )
                }
            }
            else{
                res.status(200).json(result)
                console.log(result);
            }
        }
    )
})

module.exports = router