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
import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import axios from "axios";
import { SERVER_URL } from "../utils/constants";
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
  const [user, setUser] = useState({});
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes.length);

  useEffect(() => {
    const fetchUser = async () => {
      await axios
        .get(`${SERVER_URL}/api/users/${post.userId}`)
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchUser();
  }, [post.userId]);

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
            <Link to={`profile/${user.username}`}>
              <Avatar sx={{ bgcolor: "lightblue" }} src={PF + user.profileImg}>
                R
              </Avatar>
            </Link>
          }
          action={
            <IconButton>
              <MoreVert />
            </IconButton>
          }
          title={user.username}
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
