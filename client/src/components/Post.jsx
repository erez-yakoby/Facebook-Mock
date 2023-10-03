import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Checkbox,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import { Delete, Favorite, FavoriteBorder } from "@mui/icons-material";
import { useContext, useState } from "react";
import styled from "@emotion/styled";

import { format } from "timeago.js";
import { Link } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "../utils/constants";
import { AuthContext } from "../context/AuthContext";

const StyledModal = styled(Modal)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const Post = ({ post, handleDeletePost }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useContext(AuthContext);
  const [displayImg, setDisplayImg] = useState({ isDisplayed: false, src: "" });
  const [isLiked, setIsLiked] = useState(post.likes.includes(user._id));
  const [likes, setLikes] = useState(post.likes.length);

  const handleLikeClick = async () => {
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
    await axios
      .put(`${SERVER_URL}/api/posts/${post._id}/like`, {
        userId: user._id,
      })

      .catch((error) => {
        console.log("like error");
      });
  };

  const handleDeleteClick = async () => {
    await axios
      .delete(`${SERVER_URL}/api/posts/${post._id}`, {
        data: { userId: user._id },
      })
      .then(() => {
        console.log("deleting");
        handleDeletePost(post._id);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Card sx={{ mb: 5 }}>
        <CardHeader
          avatar={
            <Link to={`profile/${post.username}`}>
              <Avatar
                sx={{ bgcolor: "lightblue" }}
                src={PF + post.userProfileImg}
              >
                R
              </Avatar>
            </Link>
          }
          action={
            user._id === post.userId && (
              <IconButton onClick={handleDeleteClick}>
                <Delete color="error" />
              </IconButton>
            )
          }
          title={post.username}
          subheader={format(post.createdAt)}
        />
        {post.imageUrl && (
          <CardMedia
            component="img"
            image={PF + post.imageUrl}
            height="300"
            alt="Post image"
            onClick={(e) =>
              setDisplayImg({ isDisplayed: true, src: post.imageUrl })
            }
          />
        )}

        <CardContent>
          <Typography variant="body3" color="text.secondary">
            {post.content}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Checkbox
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite color="error" />}
            checked={isLiked}
            onClick={handleLikeClick}
          />
          <Typography ml={1}> {likes} people liked</Typography>
        </CardActions>
      </Card>
      <StyledModal
        open={displayImg.isDisplayed}
        onClose={(e) => setDisplayImg({ isDisplayed: false, src: "" })}
        disableScrollLock={true}
      >
        <img
          src={PF + displayImg.src}
          loading="lazy"
          width="50%"
          alt="postImage"
        />
      </StyledModal>
    </>
  );
};

export default Post;
