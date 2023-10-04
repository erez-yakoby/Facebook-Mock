import React, { useEffect, useState } from "react";
import SideBar from "../../components/SideBar";
import Feed from "../../components/Feed";
import { Box, Stack, Typography } from "@mui/material";
import "./profile.css";
import ProfileRightBar from "./ProfileRightBar";
import NavBar from "../../components/NavBar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "../../utils/constants";

const Profile = () => {
  const [user, setUser] = useState({});
  const profileUsername = useParams().username;

  useEffect(() => {
    const fetchUser = async () => {
      await axios
        .get(`${SERVER_URL}/api/users/${profileUsername}`)
        .then((res) => {
          setUser(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchUser();
  }, [profileUsername]);
  return (
    <>
      <NavBar />
      <Stack
        className="App"
        direction="row"
        spacing={0}
        justifyContent="space-between"
        style={{ backgroundColor: "#f0f2f5" }}
      >
        <SideBar showExpanded />
        <Box flex={5}>
          <Box mb={2} className="profileInfo">
            <img
              src="/images/DSCN3087.JPG"
              alt=""
              className="profileCoverImg"
            />
            <img
              className="profileUserImg"
              src={"/images/" + user.profileImg}
              alt=""
            />
            <div>
              <Typography variant="h5" mt={15} textAlign="center">
                {user.username}
              </Typography>
            </div>
          </Box>
          <Stack
            className="App"
            direction="row"
            spacing={2}
            justifyContent="space-between"
          >
            <Feed username={profileUsername} userProfile={user} />
            <ProfileRightBar />
          </Stack>
        </Box>
      </Stack>
    </>
  );
};

export default Profile;
