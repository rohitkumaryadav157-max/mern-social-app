const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const multer = require("multer");

// Image upload setup
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  }
});

const upload = multer({ storage });


// CREATE POST (text or image or both)
router.post("/create", upload.single("image"), async (req, res) => {
  const { username, text } = req.body;

  try {
    const newPost = new Post({
      username,
      text,
      image: req.file ? req.file.filename : ""
    });

    await newPost.save();

    res.json(newPost);

  } catch (err) {
    res.json({ error: err.message });
  }
});


// GET ALL POSTS (Feed)
router.get("/feed", async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.json(posts);
});


// LIKE POST
router.post("/like/:id", async (req, res) => {
  const { username } = req.body;

  const post = await Post.findById(req.params.id);

  if (!post.likes.includes(username)) {
    post.likes.push(username);
  } else {
    post.likes = post.likes.filter(u => u !== username);
  }

  await post.save();

  res.json(post);
});


// COMMENT POST
router.post("/comment/:id", async (req, res) => {
  const { username, text } = req.body;

  const post = await Post.findById(req.params.id);

  post.comments.push({ username, text });

  await post.save();

  res.json(post);
});

module.exports = router;