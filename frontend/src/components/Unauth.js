import React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  extraLarge: {
    fontSize : 'large'
  },
}));

const Unauth = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <Box sx={{ display: { md: "flex" } }}>
        <IconButton
          size="large"
          edge="end"
          aria-haspopup="true"
          onClick={() => {
            navigate('/login')
          }}
          color="inherit"
          className={classes.extraLarge}
        >
          <LoginIcon />
        </IconButton>
      </Box>
    </React.Fragment>
  );
};

export default Unauth;
