const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/socialdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// USER MODEL
const User = mongoose.model("User", {
  username: String,
  password: String
});

// POST MODEL
const Post = mongoose.model("Post", {
  username: String,
  content: String,
  comments: [{ username: String, text: String }]
});

// REGISTER
app.post("/register", async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.send({ message: "Registered successfully" });
});

// LOGIN
app.post("/login", async (req, res) => {
  const user = await User.findOne(req.body);
  if (user) res.send({ success: true });
  else res.send({ success: false });
});

// CREATE POST
app.post("/post", async (req, res) => {
  const post = new Post(req.body);
  await post.save();
  res.send({ message: "Post created" });
});

// GET POSTS
app.get("/posts", async (req, res) => {
  const posts = await Post.find();
  res.send(posts);
});

// ADD COMMENT
app.post("/comment", async (req, res) => {
  const { postId, username, text } = req.body;
  await Post.findByIdAndUpdate(postId, {
    $push: { comments: { username, text } }
  });
  res.send({ message: "Comment added" });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
