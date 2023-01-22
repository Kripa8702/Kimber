const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/userModel");
const {
  // v1: uuidv1,
  v4: uuidv4,
} = require("uuid");

module.exports = router;

//Get All Method
router.get("/getAll", async (req, res) => {
  try {
    const data = await User.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Get By ID Method
router.get("/getOne/:id", async (req, res) => {
  try {
    const data = await User.find({
      userId: req.params.id,
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Register route
router.post("/register", async (req, res) => {
  try {
    const { username, email, password, profilePic } = req.body;

    if (!(username && email && password)) {
      res.status(400).send("Please enter the required fields");
    }

    //User already exists
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      res.status(409).send("User already exists");
      return;
    }

    //Encrypt password
    encryptedPassword = await bcrypt.hash(password, 10);

    //Create User
    const randomNo = uuidv4();
    const userId = `user-${randomNo}`;

    const data = new User({
      userId: userId,
      username: username,
      email: email.toLowerCase(),
      password: encryptedPassword,
      profilePic: profilePic,
      moodTags: req.body.moodTags,
    });

    const user = await data.save();

    const token = jwt.sign(
      {
        user_id: user._id,
        email,
      },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );

    user.token = token;

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Login route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      res.status(400).send("Please enter the required fields");
    }

    const user = await User.findOne({ email });
    
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        {
          user_id: user._id,
          email,
        },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      user.token = token;

      res.status(200).json(user);
      return;
    }
    res.status(400).send("Invalid Credentials");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// router.post("/post", async (req, res) => {
//   const randomNo = uuidv4();
//   const userId = `user-${randomNo}`;

//   const data = new User({
//     userId: userId,
//     username: req.body.username,
//     email: req.body.email,
//     password: req.body.password,
//     profilePic: req.body.profilePic,
//     moodTags: req.body.moodTags,
//   });

//   try {
//     const postData = await data.save();
//     res.status(200).json(postData);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

//Update By ID Method
router.patch("/update/:id", async (req, res) => {
  try {
    // const id = req.params.id;
    const newBody = req.body;
    const options = { new: true };

    const data = await User.findOneAndUpdate(
      { userId: req.params.id },
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
    const data = await User.findOneAndDelete({ userId: req.params.id });
    res.send(`Document ${data.name} has been deleted..`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
