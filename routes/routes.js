const express = require("express");
const router = express.Router();
const middleware = require('../middleware/authenticate'); 
const userController = require("../controller/user");
const postController = require("../controller/post");

router.get("/signup", userController.signup);
// router.post("/login", userController.Login);
// router.post("/posts", middleware,postController.posts);

module.exports = router;