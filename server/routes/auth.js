const router = require("express").Router();
const User = require("../models/User");

//register new user
router.get("/register", async (req, res) => {
  const user = await new User({
    username: "erez",
  });
  await user.save();
  res.send("register adress");
});

module.exports = router;
