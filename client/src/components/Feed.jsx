import { Box } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import Post from "./Post";
import axios from "axios";
import { SERVER_URL } from "../utils/constants";
import { AuthContext } from "../context/AuthContext";
import AddPost from "./AddPost";

const Feed = ({ username }) => {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

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
            .get(`${SERVER_URL}/api/posts/feed/${user._id}`)
            .then((response) => {
              setPosts(response.data);
            })
            .catch((error) => {
              console.log(error);
            });
    };
    fetchPosts();
  }, [user, username]);

  const handleAddPost = (post) => {
    setPosts([post, ...posts]);
  };

  const handleDeletePost = (postId) => {
    setPosts(posts.filter((post) => post._id !== postId));
  };

  return (
    <Box pl={2} pt={4} flex={4}>
      {(!username || username === user.username) && (
        <AddPost handleAddPost={handleAddPost} />
      )}

      {posts.map((post) => {
        return (
          <Post
            key={post._id}
            post={post}
            handleDeletePost={handleDeletePost}
          />
        );
      })}
    </Box>
  );
};

export default Feed;
