const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//register new user
router.post("/register", async (req, res) => {
  try {
    // hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // creating and saving the new user
    const newUser = await new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      profileImg: req.body.profileImg,
    });

    // save user and return matching response
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (error) {
    // TODO: change the returning value

    console.log(error);
    res.send("error");
  }
});

//login user
router.post("/login", async (req, res) => {
  try {
    // check that user exist by email
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(400).json("Problem with email or password");

    // check that that the given password matches the encrypted one
    const isValidPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    !isValidPassword
      ? res.status(400).json("Problem with email or password")
      : res.status(200).json(user);
  } catch (error) {
    // TODO: change the returning value
    console.log("error");
    res.send("error");
  }
});

module.exports = router;
