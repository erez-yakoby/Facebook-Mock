import { Box } from "@mui/material";
import React, { useCallback, useEffect } from "react";
import Post from "./Post";
import Posts from "../data/Posts";
import axios from "axios";
import { SERVER_URL } from "../utils/constants";

const Feed = () => {
  const getPosts = useCallback(() => {
    axios
      .get(`${SERVER_URL}/`)
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
