import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Switch,
} from "@mui/material";
import {
  Home,
  Article,
  Group,
  Storefront,
  Person,
  ModeNight,
  Settings,
  AccountBox,
} from "@mui/icons-material";
import React from "react";

// each button in the side bar will have an icon, a text and an href to the relevant page.
const SideBarButtons = [
  { ButtonIcon: Home, buttonText: "Homepage", href: "/" },
  { ButtonIcon: Article, buttonText: "Pages", href: "/pages" },
  { ButtonIcon: Group, buttonText: "Groups", href: "/groups" },
  { ButtonIcon: Storefront, buttonText: "Marketplace", href: "/marketplace" },
  { ButtonIcon: Person, buttonText: "Friends", href: "/friends" },
  { ButtonIcon: Settings, buttonText: "Settings", href: "/settings" },
  { ButtonIcon: AccountBox, buttonText: "Profile", href: "/profile" },
];

const SideBar = ({ onClickChangeTheme, showExpanded }) => {
  return (
    <Box p={2} flex={1} sx={{ display: { xs: "none", md: "block" } }}>
      <Box position="fixed">
        <List>
          {/* generate all buttons but the dark theme button */}
          {SideBarButtons.map(({ ButtonIcon, buttonText, href }) => {
            return (
              <ListItem disablePadding>
                <ListItemButton href={href}>
                  <ListItemIcon>
                    <ButtonIcon />
                  </ListItemIcon>
                  {showExpanded && <ListItemText primary={buttonText} />}
                </ListItemButton>
              </ListItem>
            );
          })}

          {/* generate dark theme button*/}
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <ModeNight />
              </ListItemIcon>
              <Switch onClick={(e) => onClickChangeTheme()} />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};

export default SideBar;
