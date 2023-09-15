import { Box, Typography } from "@mui/material";
import React from "react";

const ProfileRightBar = () => {
  return (
    <Box p={2} flex={2} sx={{ display: { xs: "none", sm: "block" } }}>
      <Box>
        <Typography variant="h6" fontWeight={100}>
          User Friends
        </Typography>
        <br />

        <Typography variant="h6" fontWeight={100}>
          Latest Photos
        </Typography>

        <br />

        <Typography variant="h6" fontWeight={100}>
          Latest Conversations
        </Typography>
      </Box>
    </Box>
  );
};

export default ProfileRightBar;
