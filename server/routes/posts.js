const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");

// add post
router.post("/", async (req, res) => {
  // creating the new post
  let post = req.body;
  const user = await User.findById(post.userId);
  post.username = user.username;
  post.userProfileImg = user.profileImg;
  const newPost = await new Post(post);

  // saving and responding
  try {
    const post = await newPost.save();
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res.send("error");
  }
});

// get feed posts
router.get("/feed/:userId", async (req, res) => {
  // TODO: add index on userId in Post schema
  try {
    // following is all the users from which i want to see posts in my feed
    const curUser = await User.findById(req.params.userId);
    const following = curUser.following;
    following.push(req.params.userId);

    // fetching the filtered posts
    const relevantPosts = await Post.find({ userId: { $in: following } }).sort(
      "-createdAt"
    );
    res.status(200).json(relevantPosts);
  } catch (error) {
    console.log(error);
    res.send("error");
  }
});

// get user profile posts
router.get("/profile/:username", async (req, res) => {
  // TODO: add index on userId in Post schema
  try {
    // fetching the user's posts
    const profilePosts = await Post.find({
      username: req.params.username,
    }).sort("-createdAt");
    res.status(200).json(profilePosts);
  } catch (error) {
    console.log(error);
    res.send("error");
  }
});

// like / dislike post
router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.likes.includes(req.body.userId)) {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("disliked post");
    } else {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("liked post");
    }
  } catch (error) {
    console.log("error");
    res.send("error");
  }
});

// update post
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (req.body.userId === post.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("updated post");
    } else {
      res.status(403).json("You can update only your posts");
    }
  } catch (error) {
    console.log("post not exists");
    res.send("post not exists");
  }
});

// delete post
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (req.body.userId === post.userId) {
      await post.deleteOne();
      res.status(200).json("deleted post");
    } else {
      res.status(403).json("You can delete only your posts");
    }
  } catch (error) {
    console.log("post not exists");
    res.send("post not exists");
  }
});

// get post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    console.log("post not found");
    res.send("post not found");
  }
});

module.exports = router;
