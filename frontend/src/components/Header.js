import React from "react";
import Heading from "./Heading";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Unauth from "./Unauth";
import Tabs from "./Tabs";
import SearchBar from "./SearchBar";
import { AuthContext } from "../App";
import Auth from "./Auth";

const Header = () => {
  const authContext = React.useContext(AuthContext);
  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" style={{ backgroundColor: '#161934', padding: '12px' }}>
          <Toolbar>
            <Heading />
            {authContext.token && <SearchBar />}
            <Tabs />
            {authContext.token ? <Auth /> : <Unauth />}
          </Toolbar>
        </AppBar>
      </Box>
    </React.Fragment>
  );
};

export default Header;
