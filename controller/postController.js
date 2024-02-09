// Gerekli modülleri içe aktar
const Post = require('../models/posts');

// Post güncelleme kontrolcüsü
const updatePost = async (req, res) => {
    try {
        // Güncellenecek postun id'sini al
        const postId = req.params.id;
        // Yeni verileri al
        const { title, message } = req.body;
        
        // Post verisini güncelle 
        const updatedPost = await Post.findByIdAndUpdate(postId, { title, message },{ new: true });

        if (!updatedPost) {
            return res.status(404).json({ error: "Post not found" });
        }

        // Başarılı bir şekilde güncellendiğine dair mesaj gönder
        res.redirect('/posts/'+postId );
    } catch (error) { 
        // Hata durumunda hatayı yakala ve istemciye gönder
        res.status(500).json({ error: error.message });
    }
};



const deletepost = async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.redirect("/");
}

const addpost = async(req, res) => {
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
};

// Kontrolcüyü dışa aktar
module.exports = { updatePost, addpost,deletepost };
