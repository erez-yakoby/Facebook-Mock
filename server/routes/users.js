const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// get user
// delete user
// follow user
// unfollow user
// update user

// update user
router.put("/:id", async (req, res) => {
  if (req.body.senderId === req.params.id) {
    if (req.body.password) {
      // hash the password we want to change
      try {
        const salt = await bcrypt.salt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (error) {
        console.log("error");
        res.send("error");
      }
    }
    try {
      // update user
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      // responding
      res.status(200).json("updated account");
    } catch (error) {
      console.log("error");
      res.send("error");
    }
  } else {
    res.status(403).json("You can update only your account");
  }
});

// delete user
router.delete("/:id", async (req, res) => {
  // TODO: handle the case where the user does not exists
  if (req.body.senderId === req.params.id) {
    try {
      // delete user
      const user = await User.findByIdAndDelete(req.params.id);
      // responding
      res.status(200).json("deleted account");
    } catch (error) {
      console.log(error);
      res.send("error");
    }
  } else {
    res.status(403).json("You can delete only your account");
  }
});

// get a user
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    !user && res.status(404).json("user not found");

    // removing unneccecery attributes
    const minimalUser = { ...user._doc };
    delete minimalUser.password;

    // responding
    res.status(200).json(minimalUser);
  } catch (error) {
    console.log("error");
    res.send("error");
  }
});

// follow a user
router.put("/:id/follow", async (req, res) => {
  if (req.body.senderId !== req.params.id) {
    try {
      const user = await User.findByIdAndUpdate(req.params.id);
      const senderUser = await User.findByIdAndUpdate(req.body.senderId);

      // add to followers and following
      if (!user.followers.includes(req.body.senderId)) {
        await user.updateOne({ $push: { followers: req.body.senderId } });
        await senderUser.updateOne({ $push: { following: req.params.id } });
        res.status(200).json("successfully followed the user");
      } else {
        res.status(403).json("You already follow this user");
      }
    } catch (error) {
      console.log("error");
      res.send("error");
    }
  } else {
    res.status(403).json("You can't follow yourself");
  }
});

// unfollow a user
router.put("/:id/unfollow", async (req, res) => {
  if (req.body.senderId !== req.params.id) {
    try {
      const user = await User.findByIdAndUpdate(req.params.id);
      const senderUser = await User.findByIdAndUpdate(req.body.senderId);

      // remove from followers and following
      if (user.followers.includes(req.body.senderId)) {
        await user.updateOne({ $pull: { followers: req.body.senderId } });
        await senderUser.updateOne({ $pull: { following: req.params.id } });
        res.status(200).json("successfully unfollowed the user");
      } else {
        res.status(403).json("You dont follow this user");
      }
    } catch (error) {
      console.log("error");
      res.send("error");
    }
  } else {
    res.status(403).json("You can't unfollow yourself");
  }
});

module.exports = router;
