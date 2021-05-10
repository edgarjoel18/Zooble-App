const express = require('express');
const router = express.Router();
const connection = require('../db');


router.post('/api/flag', (req,res) =>{
    const regUserId = req.session.reg_user_id;
    const postToFlag = req.body.postToFlag;

    connection.query(`INSERT INTO PostFlag VALUES ('${regUserId}', '${postToFlag}')`,
        function(err, result){
            if(err){
                if(err.errno = 1062){
                    console.log(1062);
                    connection.query(
                        `DELETE FROM PostFlag
                        WHERE (PostFlag.reg_user_id = '${regUserId}'
                        AND PostFlag.post_id = '${postToLike}')`,
                        function(err,result){
                            if(err){
                                console.log(err);
                            }
                            else{
                                console.log(result);
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