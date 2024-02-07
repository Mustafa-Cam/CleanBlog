const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;
const router = express.Router();
const Posts = require("./models/posts");
const postRoutes = require("./Routes/postRoutes");
const updatedPost = require("./controller/postController");

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
  let message = req.query.message;
  const posts = await Posts.find({});
  res.render("index", { message, posts });
});

app.get("/addpost", (req, res) => {
  res.render("add_post");
});

app.get("/posts/:id/edit", async (req, res) => {
  const post = await Posts.findById(req.params.id);
  res.render("postviews/edit_post", { post });
});

app.get("/posts/:id", async (req, res) => {
  const post = await Posts.findById(req.params.id);
  res.render("postviews/post", { post });
});

app.listen(port, () => {
  console.log("listening on port 3000");
});
