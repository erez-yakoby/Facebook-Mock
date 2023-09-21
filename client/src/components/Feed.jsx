import { Box } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import Post from "./Post";
import axios from "axios";
import { SERVER_URL } from "../utils/constants";
import { AuthContext } from "../context/AuthContext";

const Feed = ({ profile }) => {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      profile
        ? await axios
            .get(`${SERVER_URL}/api/posts/profile/${user.username}`)
            .then((response) => {
              setPosts(response.data);
            })
            .catch((error) => {
              console.log(error);
            })
        : await axios
            .get(`${SERVER_URL}/api/posts/feed/${user._id}`)
            .then((response) => {
              setPosts(response.data);
            })
            .catch((error) => {
              console.log(error);
            });
    };
    fetchPosts();
  }, [user, profile]);

  return (
    <Box p={2} flex={4}>
      {posts.map((post) => {
        return <Post key={post._id} post={post} />;
      })}
    </Box>
  );
};

export default Feed;
