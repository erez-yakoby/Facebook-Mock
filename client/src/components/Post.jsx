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
import { useState } from "react";
import styled from "@emotion/styled";

const StyledModal = styled(Modal)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const Post = ({ userName, profileImgUrl, content, mainImgUrl, date }) => {
  const [displayImg, setDisplayImg] = useState({ isDisplayed: false, src: "" });
  return (
    <>
      <Card sx={{ mb: 5 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "lightblue" }} src={profileImgUrl}>
              R
            </Avatar>
          }
          action={
            <IconButton>
              <MoreVert />
            </IconButton>
          }
          title={userName}
          subheader={date}
        />
        <CardMedia
          component="img"
          image={mainImgUrl}
          height="300"
          alt="Post image"
          onClick={(e) => setDisplayImg({ isDisplayed: true, src: mainImgUrl })}
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
