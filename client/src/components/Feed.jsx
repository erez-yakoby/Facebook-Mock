import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import Post from "./Post";
import axios from "axios";
import { SERVER_URL } from "../utils/constants";

const Feed = ({ username }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      username
        ? await axios
            .get(`${SERVER_URL}/api/posts/profile/${username}`)
            .then((response) => {
              setPosts(response.data);
            })
            .catch((error) => {
              console.log(error);
            })
        : await axios
            .get(`${SERVER_URL}/api/posts/feed/650350543c7bedf7f235beb0`)
            .then((response) => {
              setPosts(response.data);
            })
            .catch((error) => {
              console.log(error);
            });
    };
    fetchPosts();
  }, [username]);

  return (
    <Box p={2} flex={4}>
      {posts.map((post) => {
        return <Post key={post._id} post={post} />;
      })}
    </Box>
  );
};

export default Feed;
