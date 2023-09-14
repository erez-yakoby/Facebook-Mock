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
import { Favorite, FavoriteBorder, MoreVert, Share } from "@mui/icons-material";
import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import axios from "axios";
import { SERVER_URL } from "../utils/constants";
import { format } from "timeago.js";

const StyledModal = styled(Modal)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const Post = ({ userId, content, imageUrl, likes, timeStamp }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [displayImg, setDisplayImg] = useState({ isDisplayed: false, src: "" });
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      await axios
        .get(`${SERVER_URL}/api/users/${userId}`)
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchUser();
  }, []);
  return (
    <>
      <Card sx={{ mb: 5 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "lightblue" }} src={PF + user.profileImg}>
              R
            </Avatar>
          }
          action={
            <IconButton>
              <MoreVert />
            </IconButton>
          }
          title={user.username}
          subheader={format(timeStamp)}
        />
        <CardMedia
          component="img"
          image={imageUrl}
          height="300"
          alt="Post image"
          onClick={(e) => setDisplayImg({ isDisplayed: true, src: imageUrl })}
        />
        <CardContent>
          <Typography variant="body3" color="text.secondary">
            {content}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Checkbox
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite color="error" />}
          />
          <IconButton>
            <Share />
          </IconButton>
        </CardActions>
      </Card>
      <StyledModal
        open={displayImg.isDisplayed}
        onClose={(e) => setDisplayImg({ isDisplayed: false, src: "" })}
        disableScrollLock={true}
      >
        <img src={displayImg.src} loading="lazy" width="50%" alt="postImage" />
      </StyledModal>
    </>
  );
};

export default Post;
