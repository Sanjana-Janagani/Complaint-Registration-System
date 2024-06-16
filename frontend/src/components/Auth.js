import React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Button from '@mui/material/Button';
import { AuthContext } from "../App";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const authContext = React.useContext(AuthContext);
  const navigate = useNavigate();

  const isMenuOpen = Boolean(anchorEl);
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    authContext.logout();
    setTimeout(() => {
      navigate('/login');
    }, 6000)
  }

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose} style={{margin: "2px"}}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <Button variant="contained" color="error" style={{ margin: "2px" }} onClick={handleLogOut}>
          Log Out
        </Button>
      </MenuItem>
    </Menu>
  );

  return (
    <React.Fragment>
      <Box sx={{ display: { md: "flex" } }}>
        <IconButton
          size="large"
          edge="end"
          aria-controls={menuId}
          aria-haspopup="true"
          onClick={handleProfileMenuOpen}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
      </Box>
      {renderMenu}
    </React.Fragment>
  );
};

export default Auth;
