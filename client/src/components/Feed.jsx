import { Box } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import Post from "./Post";
import Posts from "../data/Posts";
import axios from "axios";
import { SERVER_URL } from "../utils/constants";

const Feed = () => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      await axios
        .get(`${SERVER_URL}/api/posts/feed/650312e0f0c15b5bda1ba24a`)
        .then((response) => {
          setPosts(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchPosts();
  }, []);

  return (
    <Box p={2} flex={4}>
      {posts.map((post) => {
        return (
          <Post
            key={post._id}
            userId={post.userId}
            content={post.content}
            imageUrl={PF + post.imageUrl}
            likes={post.likes}
            timeStamp={post.createdAt}
          />
        );
      })}
    </Box>
  );
};

export default Feed;
