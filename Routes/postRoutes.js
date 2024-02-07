const express = require("express");
const router = express.Router();
const Post = require("../models/posts"); // Post modelini dahil edin
const {updatePost,addpost} = require("../controller/postController");
// Yeni post oluşturmak için POST yönlendiricisi

// Yeni postu MongoDB'ye kaydedin
router.post("/add_post",addpost);
router.post("/posts/:id/edit",updatePost)


module.exports = router;