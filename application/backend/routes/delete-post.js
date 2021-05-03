const express = require('express');
const router = express.Router();

const connection = require('../db');

router.post("/api/delete-post", (req, res) => { // delete a post

    console.log("/delete-post");
    const postId = req.body.postId;

    connection.query(`DELETE FROM Post WHERE post_id = '${postId}'`, (error, results, fields) => {
        if (error) {
            console.error('An error occurred while executing the query');
            res.status(500).json(error);
        } else {
            console.error('Post has been deleted');
            console.error(results);
            res.status(200).json(results);
        }

    });

});

module.exports = router