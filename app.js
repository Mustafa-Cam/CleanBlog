const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;
const router = express.Router();
const Posts = require("./models/posts");
const postRoutes = require("./Routes/postRpoutes");

//!Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(postRoutes);

mongoose.connect("mongodb://localhost:27017/CleanBlog", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on("connected", () => {
  console.log("MongoDB ye başarıyla bağlandı");
});

db.on("error", (err) => {
  console.error("MongoDB bağlantı hatası:", err);
});

app.use(express.static("public"));

app.set("view engine", "ejs");

// app.get('/',(req,res)=>{
//     const blog = { id: 1, title: "Blog title", description: "Blog description" }
//     res.send(blog);
// })

app.get("/", async (req, res) => {
  const message = req.query.message

  const posts= await Posts.find({}) 
  res.render("index",{ message,posts}); 
});

app.get("/addpost", (req, res) => {
  res.render("add_post");
});

app.listen(port, () => {
  console.log("listening on port 3000");
});
