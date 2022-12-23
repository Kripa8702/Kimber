const express = require("express");
const router = express.Router();
const Post = require("../models/postModel");
const { v4: uuidv4 } = require("uuid");

module.exports = router;

//Get All Method
router.get("/getAll", async (req, res) => {
  try {
    const data = await Post.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Get By ID Method
router.get("/getOne/:id", async (req, res) => {
  try {
    const data = await Post.find({
      postId: req.params.id,
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Post Method
router.post("/post", async (req, res) => {
  const randomNo = uuidv4();
  const postId = `post${randomNo}`;
  const dateObj = new Date();

  const date = ("0" + dateObj.getDate()).slice(-2);
  const month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
  const year = dateObj.getFullYear();
  const hours = ("0" + dateObj.getHours()).slice(-2) 
  const minutes = ("0" + dateObj.getMinutes()).slice(-2) 
  const seconds = ("0" + dateObj.getSeconds()).slice(-2)

  //date & time in YYYY-MM-DD HH:MM:SS format
  const datePublished =
    year +
    "-" +
    month +
    "-" +
    date +
    " " +
    hours +
    ":" +
    minutes +
    ":" +
    seconds;

  const data = new Post({
    postId: postId,
    picUrl: req.body.picUrl,
    description: req.body.description,
    datePublished: datePublished,
    tags: req.body.tags,
  });

  try {
    const postData = await data.save();
    res.status(200).json(postData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Update By ID Method
router.patch("/update/:id", async (req, res) => {
  try {
    // const id = req.params.id;
    const newBody = req.body;
    const options = { new: true };

    const data = await Post.findOneAndUpdate(
      { postId: req.params.id },
      newBody,
      options
    );

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Delete By ID Method
router.delete("/delete/:id", async (req, res) => {
  try {
    const data = await Post.findOneAndDelete({ postId: req.params.id });
    res.send(`Post has been deleted..`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
