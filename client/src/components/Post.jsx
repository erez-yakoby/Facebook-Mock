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

const Post = () => {
  const [displayImg, setDisplayImg] = useState({ isDisplayed: false, src: "" });
  return (
    <>
      <Card sx={{ mb: 5 }}>
        <CardHeader
          avatar={
            <Avatar
              sx={{ bgcolor: "lightblue" }}
              aria-label="UserImage"
              src="/images/erez.jpg"
            >
              R
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVert />
            </IconButton>
          }
          title="Erez Yakoby"
          subheader="September 14, 2016"
        />
        <CardMedia
          component="img"
          image="/images/erez.jpg"
          height="300"
          alt="Post image"
          onClick={(e) =>
            setDisplayImg({ isDisplayed: true, src: "/images/erez.jpg" })
          }
        />
        <CardContent>
          <Typography variant="body3" color="text.secondary">
            This impressive paella is a perfect party dish and a fun meal to
            cook together with your guests. Add 1 cup of frozen peas along with
            the mussels, if you like.
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Checkbox
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite color="error" />}
          />
          <IconButton aria-label="share post">
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
