import {
  Add,
  PersonAdd,
  VideoCameraBack,
  Image,
  EmojiEmotions,
  CalendarMonth,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Fab,
  IconButton,
  Modal,
  TextField,
  Tooltip,
  Typography,
  styled,
} from "@mui/material";
import axios from "axios";
import React, { useContext, useState } from "react";
import { SERVER_URL } from "../utils/constants";
import { AuthContext } from "../context/AuthContext";

const StyledModal = styled(Modal)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const UserBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: 15,
});

const AddPost = () => {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddPost = async (e) => {
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
      .catch((error) => {
        console.log("add post error");
      });
  };

  return (
    <>
      <Tooltip
        title="Add Post"
        sx={{ position: "fixed", bottom: 20, left: 20 }}
        onClick={(e) => setIsModalOpen(true)}
      >
        <Fab color="primary" aria-label="add">
          <Add />
        </Fab>
      </Tooltip>

      <StyledModal
        open={isModalOpen}
        onClose={(e) => setIsModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disableScrollLock={true}
      >
        <Box
          component="form"
          onSubmit={handleAddPost}
          width={500}
          height={300}
          bgcolor={"background.default"}
          color={"text.primary"}
          borderRadius={5}
          p={2}
          m={1}
        >
          <Typography variant="h5" textAlign="center">
            Create post
          </Typography>
          <UserBox>
            <Avatar src={PF + user.profileImg}> </Avatar>
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
            autoFocus
            name="content"
          />
          <Box mb={1}>
            <IconButton color="info">
              <EmojiEmotions />
            </IconButton>
            <IconButton color="error">
              <Image />
            </IconButton>
            <IconButton color="success">
              <VideoCameraBack />
            </IconButton>
            <IconButton color="warning">
              <PersonAdd />
            </IconButton>
          </Box>
          <ButtonGroup variant="contained" fullWidth>
            <Button type="submit">Post</Button>
            <Button sx={{ width: 70 }}>
              <CalendarMonth />
            </Button>
          </ButtonGroup>
        </Box>
      </StyledModal>
    </>
  );
};

export default AddPost;
