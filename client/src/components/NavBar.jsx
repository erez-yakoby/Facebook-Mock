import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  InputBase,
  Menu,
  MenuItem,
  Toolbar,
} from "@mui/material";
import React, { useState } from "react";
import { Pets, Mail, Notifications } from "@mui/icons-material";
import styled from "@emotion/styled";

const StyledToolBar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const StyledSearch = styled("div")(({ theme }) => ({
  backgroundColor: "white",
  padding: "0 10px",
  color: "black",
  borderRadius: theme.shape.borderRadius,
  width: "40%",
}));

const StyledIconContainer = styled(Box)(({ theme }) => ({
  display: "none",
  gap: "20px",
  alignItems: "center",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
}));

const StyledUserBox = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "20px",
  alignItems: "center",
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
}));

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <AppBar position="sticky">
      <StyledToolBar>
        <Button
          disableTouchRipple
          href="/"
          size="large"
          sx={{
            display: { xs: "none", sm: "block" },
            color: "white",
            p: 0,
          }}
        >
          Lama Dev
        </Button>
        <Pets sx={{ display: { xs: "block", sm: "none" } }}></Pets>
        <StyledSearch>
          <InputBase placeholder="search..." fullWidth />
        </StyledSearch>
        <StyledIconContainer>
          <Badge badgeContent={4} color="error">
            <Mail />
          </Badge>
          <Badge badgeContent={2} color="error">
            <Notifications />
          </Badge>
          <Avatar
            onClick={(e) => setIsOpen(true)}
            sx={{ width: 30, height: 30 }}
            alt="Remy Sharp"
            src="/images/erez.jpg"
          />
        </StyledIconContainer>
        <StyledUserBox>
          <Avatar
            onClick={(e) => setIsOpen(true)}
            sx={{ width: 30, height: 30 }}
            alt="Remy Sharp"
            src="/images/erez.jpg"
          />
        </StyledUserBox>
      </StyledToolBar>
      <Menu
        open={isOpen}
        onClose={(e) => setIsOpen(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        disableScrollLock={true}
      >
        <MenuItem>Profile</MenuItem>
        <MenuItem>My account</MenuItem>
        <MenuItem>Logout</MenuItem>
      </Menu>
    </AppBar>
  );
};

export default NavBar;
