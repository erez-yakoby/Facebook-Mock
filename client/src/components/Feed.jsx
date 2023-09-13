import { Box } from "@mui/material";
import React, { useCallback, useEffect } from "react";
import Post from "./Post";
import Posts from "../data/Posts";
import axios from "axios";

const Feed = () => {
  const serverURL = "http://127.0.0.1:3080";

  const getPosts = useCallback(() => {
    axios
      .get(`${serverURL}/`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

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
