import { Box } from "@mui/material";
import React from "react";
import Post from "./Post";
import Posts from "../data/Posts";

const Feed = () => {
  return (
    <Box p={2} flex={4}>
      {Posts.map((p) => {
        return (
          <Post
            key={p.id}
            userName={p.userName}
            profileImgUrl={p.profileImgUrl}
            content={p.content}
            mainImgUrl={p.mainImgUrl}
            date={p.date}
          />
        );
      })}
    </Box>
  );
};

export default Feed;
