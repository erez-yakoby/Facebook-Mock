import {
  Avatar,
  AvatarGroup,
  Box,
  Divider,
  ImageList,
  ImageListItem,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";

const RightBar = () => {
  console.log("right");
  return (
    <Box p={2} flex={2} sx={{ display: { xs: "none", sm: "block" } }}>
      <Box position="fixed">
        <Typography variant="h6" fontWeight={100}>
          Online Friends
        </Typography>
        <AvatarGroup max={6} sx={{ display: "flex", justifyContent: "start" }}>
          {onlineFriends.map((friend) => (
            <Avatar alt={friend.username} src={friend.img} key={friend.key} />
          ))}
        </AvatarGroup>
        <br />

        <Typography variant="h6" fontWeight={100}>
          Latest Photos
        </Typography>
        <ImageList cols={3}>
          {itemData.map((item) => (
            <ImageListItem key={item.img}>
              <img
                src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt={item.title}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
        <br />

        <Typography variant="h6" fontWeight={100}>
          Latest Conversations
        </Typography>
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          {conversations.map((conversation) => (
            <ListItem alignItems="flex-start" key={conversation.id}>
              <ListItemAvatar>
                <Avatar src={conversation.userProfileImg} />
              </ListItemAvatar>
              <ListItemText
                primary={conversation.title}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {conversation.username}
                    </Typography>
                    {" - " + conversation.lastMessage}
                  </React.Fragment>
                }
              />
              {/* <Divider variant="inset" component="li" /> */}
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

const onlineFriends = [
  {
    username: "user 1",
    img: "/images/shaked.jpg",
    key: 1,
  },
  {
    username: "user 2",
    img: "/images/erez.jpg",
    key: 2,
  },
  {
    username: "user 3",
    img: "/images/shaked.jpg",
    key: 3,
  },
  {
    username: "user 4",
    img: "/images/erez.jpg",
    key: 4,
  },
  {
    username: "user 5",
    img: "/images/shaked.jpg",
    key: 5,
  },
  {
    username: "user 6",
    img: "/images/erez.jpg",
    key: 6,
  },
  {
    username: "user 7",
    img: "/images/shaked.jpg",
    key: 7,
  },
  {
    username: "user 8",
    img: "/images/erez.jpg",
    key: 8,
  },
  {
    username: "user 9",
    img: "/images/shaked.jpg",
    key: 1,
  },
];

const itemData = [
  {
    img: "images/DSCN3087.JPG",
  },
  {
    img: "images/DSCN3117.JPG",
  },
  {
    img: "images/DSCN3121.JPG",
  },
];

const conversations = [
  {
    id: 1,
    username: "user 1",
    userProfileImg: "images/DSCN3087.JPG",
    title: "Conversation Title 1",
    lastMessage:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum laboriosam",
  },
  {
    id: 2,
    username: "user 2",
    userProfileImg: "images/DSCN3117.JPG",
    title: "Conversation Title 2",
    lastMessage:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum laboriosam",
  },
  {
    id: 3,
    username: "user 3",
    userProfileImg: "images/DSCN3121.JPG",
    title: "Conversation Title 3",
    lastMessage:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum laboriosam",
  },
];

export default RightBar;
