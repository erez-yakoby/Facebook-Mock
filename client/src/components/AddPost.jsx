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
import React, { useState } from "react";
import axios from "axios";
import { SERVER_URL } from "../utils/constants";
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
  const [isModalOpen, setIsModalOpen] = useState(false);

  // const addPost = async () => {
  //   await axios.post(`${SERVER_URL}/posts`, {
  //     userId: userId,
  //     content:

  //   })
  // }

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
            <Avatar src="/images/erez.jpg"> </Avatar>
            <Typography variant="h7">Erez Yakoby</Typography>
          </UserBox>
          <TextField
            label="What's on your mind?"
            multiline
            maxRows={4}
            variant="standard"
            fullWidth
            rows={3}
            sx={{ mt: 2, mb: 2 }}
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
            <Button>Post</Button>
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
