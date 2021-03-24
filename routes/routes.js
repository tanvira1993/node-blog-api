const express = require("express");
const router = express.Router();
const middleware = require('../middleware/authenticate'); 
const userController = require("../controller/user");
const postController = require("../controller/post");

router.post("/signup", userController.signup);
router.post("/login", userController.login);
// router.post("/posts", middleware,postController.posts);

module.exports = router;