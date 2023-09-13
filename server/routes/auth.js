const router = require("express").Router();
const User = require("../models/User");

//register new user
router.post("/register", async (req, res) => {
  const newUser = await new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    profileImg: req.body.profileImg,
  });
  try {
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (error) {
    console.log("error");
    res.send("error");
  }
});

//login user
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    (!user || req.body.password !== user.password) &&
      res.status(400).json("Problem with email or password");
  } catch (error) {
    console.log("error");
    res.send("error");
  }
  res.status(200).json(user);
});

module.exports = router;
