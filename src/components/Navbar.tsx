import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  BottomNavigation,
  BottomNavigationAction,
} from "@mui/material";
import {
  Home as HomeIcon,
  Leaderboard as LeaderboardIcon,
  Person as PersonIcon,
  Share as ShareIcon,
} from "@mui/icons-material";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <AppBar position="static" color="primary" elevation={0}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            StepTracker
          </Typography>
        </Toolbar>
      </AppBar>
      <BottomNavigation
        value={location.pathname}
        onChange={(_, newValue) => {
          navigate(newValue);
        }}
        sx={{
          width: "100%",
          position: "fixed",
          bottom: 0,
          borderTop: "1px solid rgba(0, 0, 0, 0.12)",
        }}
      >
        <BottomNavigationAction label="Главная" value="/" icon={<HomeIcon />} />
        <BottomNavigationAction
          label="Рейтинг"
          value="/leaderboard"
          icon={<LeaderboardIcon />}
        />
        <BottomNavigationAction
          label="Профиль"
          value="/profile"
          icon={<PersonIcon />}
        />
        <BottomNavigationAction
          label="Рефералы"
          value="/referral"
          icon={<ShareIcon />}
        />
      </BottomNavigation>
    </>
  );
};

export default Navbar;
