const router = require("express").Router();
const User = require("../models/User");

// get a user
// TODO:  i am returning all of the user detaild including password!
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    !user && res.status(404).json("user not found");
    res.status(200).json(user);
  } catch (error) {
    console.log("error");
    res.send("error");
  }
});

module.exports = router;
