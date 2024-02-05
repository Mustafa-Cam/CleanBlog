const express = require("express");
const router = express.Router();
const Post = require("../models/posts"); // Post modelini dahil edin

// Yeni post oluşturmak için POST yönlendiricisi

// Yeni postu MongoDB'ye kaydedin
router.post("/add_post", async (req, res) => {
  // İstemciden gelen verileri alın
  const { title, message } = req.body;
  // Yeni bir Post belgesi oluşturun
  const newPost = new Post({
    title: title,
    message: message,
  });

  // Yeni postu MongoDB'ye kaydedin
  try {
    const savedpost = await newPost.save();
    // Başarılı yanıt gönderin
    const exsavedpost = savedpost;
    const message = "kaydetme başarılı";
    if (savedpost) {
      console.log(exsavedpost);
      res.redirect("/?message=" + message);
    } else {
      console.log("hata oluştu.");
      res.status(404);
    }
  } catch (err) {
    // Hata durumunda hata mesajını gönderin
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
