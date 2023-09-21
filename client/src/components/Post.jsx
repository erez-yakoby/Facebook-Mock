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
import { Favorite, FavoriteBorder, MoreVert } from "@mui/icons-material";
import { useState } from "react";
import styled from "@emotion/styled";

import { format } from "timeago.js";
import { Link } from "react-router-dom";

const StyledModal = styled(Modal)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const Post = ({ post }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [displayImg, setDisplayImg] = useState({ isDisplayed: false, src: "" });
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes.length);

  const handleLikeClick = () => {
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
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
            <IconButton>
              <MoreVert />
            </IconButton>
          }
          title={post.username}
          subheader={format(post.createdAt)}
        />
        <CardMedia
          component="img"
          image={PF + post.imageUrl}
          height="300"
          alt="Post image"
          onClick={(e) =>
            setDisplayImg({ isDisplayed: true, src: post.imageUrl })
          }
        />
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
