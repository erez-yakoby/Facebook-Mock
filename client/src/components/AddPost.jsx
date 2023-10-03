import {
  PersonAdd,
  VideoCameraBack,
  Image,
  EmojiEmotions,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  IconButton,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import axios from "axios";
import React, { useContext, useState } from "react";
import { SERVER_URL } from "../utils/constants";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const UserBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: 15,
});

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const AddPost = ({ handleAddPost }) => {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [content, setContent] = useState("");

  const handleSubmitPost = async (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const postData = {
      content: data.get("content"),
    };
    await axios
      .post(`${SERVER_URL}/api/posts/`, {
        content: postData.content,
        userId: user._id,
      })
      .then((res) => {
        setContent("");

        handleAddPost(res.data);
      })
      .catch((error) => {
        console.log("add post error");
      });
  };

  return (
    <Card
      component="form"
      onSubmit={handleSubmitPost}
      bgcolor={"background.default"}
      color={"text.primary"}
      sx={{ p: 2, mb: 4 }}
    >
      <Typography variant="h5" textAlign="center">
        Share new post
      </Typography>
      <UserBox>
        <Link to={`profile/${user.username}`}>
          <Avatar sx={{ bgcolor: "lightblue" }} src={PF + user.profileImg} />
        </Link>
        <Typography variant="h7">{user.username}</Typography>
      </UserBox>
      <TextField
        label="What's on your mind?"
        multiline
        maxRows={4}
        variant="standard"
        fullWidth
        sx={{ mt: 2, mb: 2 }}
        required
        name="content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Box mb={1}>
        <IconButton color="info">
          <EmojiEmotions />
        </IconButton>
        <IconButton color="error">
          <Image />
          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            accept=".png,.jpeg,.jpg"
          />
        </IconButton>
        <IconButton color="success">
          <VideoCameraBack />
        </IconButton>
        <IconButton color="warning">
          <PersonAdd />
        </IconButton>
      </Box>
      <Button type="submit" variant="contained" fullWidth>
        Post
      </Button>
    </Card>
  );
};

export default AddPost;
