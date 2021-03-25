const express = require("express");
const router = express.Router();
const middleware = require('../middleware/authenticate'); 
const userController = require("../controller/user");
const postController = require("../controller/post");

router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.post("/post", middleware,postController.post);
router.get("/posts", middleware,postController.posts);
router.put("/upvote", middleware,postController.upvote);
router.put("/downvote", middleware,postController.downvote);
router.post("/comment", middleware,postController.comment);

module.exports = router;