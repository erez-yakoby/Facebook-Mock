import React from "react";
import SideBar from "../../components/SideBar";
import Feed from "../../components/Feed";
import { Box, Stack, Typography } from "@mui/material";
import "./profile.css";
import ProfileRightBar from "./ProfileRightBar";
const Profile = () => {
  return (
    <>
      <Stack
        className="App"
        direction="row"
        spacing={0}
        justifyContent="space-between"
      >
        <SideBar showExpanded />
        <Box flex={5}>
          <Box mb={2} className="profileInfo">
            <img
              src="/images/DSCN3087.JPG"
              alt=""
              className="profileCoverImg"
            />
            <img className="profileUserImg" src="/images/erez.jpg" alt="" />
            <div>
              <Typography variant="h5" mt={15} textAlign="center">
                User Name
              </Typography>
              <Typography variant="h6" textAlign="center">
                User Name
              </Typography>
            </div>
          </Box>
          <Stack
            className="App"
            direction="row"
            spacing={2}
            justifyContent="space-between"
          >
            <Feed username="erez" />
            <ProfileRightBar />
          </Stack>
        </Box>
      </Stack>
    </>
  );
};

export default Profile;
