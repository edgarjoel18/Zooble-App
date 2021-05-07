const express = require("express");

const session = require('express-session');

//DB Connection
const connection = require('./db');

//Routes
const loginRouter = require('./routes/login.js');
const logoutRouter = require('./routes/logout.js');
const signupRouter = require('./routes/sign-up.js');
const searchRouter = require('./routes/search.js');
const dropdownRouter = require('./routes/dropdown-options.js');
const uploadPostRouter = require('./routes/upload-post.js');
const editPostRouter = require('./routes/edit-post.js');
const deletePostRouter = require('./routes/delete-post.js');
const feedRouter = require('./routes/feed.js');
const commentsRouter = require('./routes/comments.js');
const followUserRouter = require('./routes/follow-unfollow-user.js');
const petsRouter = require('./routes/pets.js');
const likeRouter = require('./routes/like.js')
const profileRouter = require('./routes/profile.js');

const app = express();

// const cors = require('cors');

//Session Store
const sessionStore = require('./session-store');



// app.use(cookieParser());

app.use(express.urlencoded({extended : true}));
app.use(express.json());

app.use(session({
     key: "userId",
     secret: "zooble",
     resave: false,
     saveUninitialized: false,
     store: sessionStore,
     cookie: {
         expires: 60 * 60 * 24 * 1000, //1 day expiration
     }
 }))

//start express server on port 5000
app.listen(5000, () =>{
    console.log("server started on port 5000");
});

//Sign Up
app.use(signupRouter);

//Login
app.use(loginRouter);

//Logout
app.use(logoutRouter);

//Search
app.use(searchRouter);

//Dropdown Options
app.use(dropdownRouter)

//Upload Post
app.use(uploadPostRouter)

//Edit Post
app.use(editPostRouter)

//Delete Post
app.use(deletePostRouter)

//Feed
app.use(feedRouter);

//Insert, Get Comments
app.use(commentsRouter);


// Follow a user
app.use(followUserRouter);

//Pets Lists
app.use(petsRouter);

//Liking/unliking a post
app.use(likeRouter)

//Profile
app.use(profileRouter)












