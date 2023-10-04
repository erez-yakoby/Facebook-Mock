import React, { useContext, useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Card,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Stack,
  Typography,
} from "@mui/material";
import SideBar from "../components/SideBar";
import { SERVER_URL } from "../utils/constants";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Users = () => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [users, setUsers] = useState([]);
  const { user: curUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchUsers = async () => {
      await axios
        .get(`${SERVER_URL}/api/users/all`)
        .then((response) => {
          setUsers(response.data);
          console.log(curUser);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchUsers();
  }, []);

  const handleFollowClicked = async (userToFollow) => {
    await axios
      .put(`${SERVER_URL}/api/users/${userToFollow}/follow`, {
        senderId: curUser._id,
      })
      .then((response) => {})
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUnfollowClicked = async (userToUnfollow) => {
    await axios
      .put(`${SERVER_URL}/api/users/${userToUnfollow}/unfollow`, {
        senderId: curUser._id,
      })
      .then((response) => {})
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <NavBar />
      <Stack
        className="App"
        direction="row"
        spacing={2}
        justifyContent="space-between"
        bgcolor="#f0f2f5"
      >
        <SideBar showExpanded />
        <Box pl={2} pt={4} flex={4}>
          <List>
            {users.map((user) => {
              return (
                <ListItem key={user._id}>
                  <Card
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      bgcolor: "white",
                      width: "70%",
                      borderRadius: 3,
                      p: 2,
                      py: 3,
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Link to={`/profile/${user.username}`}>
                        <Avatar
                          sx={{ bgcolor: "lightblue", height: 70, width: 70 }}
                          src={PF + user.profileImg}
                        >
                          R
                        </Avatar>
                      </Link>
                      <Typography>{user.username}</Typography>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        px: 1,
                      }}
                    >
                      <Button
                        variant="outlined"
                        href={`/profile/${user.username}`}
                      >
                        View Profile
                      </Button>
                      {user._id !== curUser._id &&
                        curUser.following.includes(user._id) && (
                          <Button
                            sx={{ width: 120 }}
                            variant="outlined"
                            onClick={(e) => handleUnfollowClicked(user._id)}
                          >
                            unfollow
                          </Button>
                        )}
                      {user._id !== curUser._id &&
                        !curUser.following.includes(user._id) && (
                          <Button
                            sx={{ width: 120 }}
                            variant="contained"
                            onClick={(e) => handleFollowClicked(user._id)}
                          >
                            follow
                          </Button>
                        )}
                    </Box>
                  </Card>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Stack>
    </>
  );
};

export default Users;
