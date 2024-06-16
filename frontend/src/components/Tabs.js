import React, { useContext } from "react";
import Box from "@mui/material/Box";
import Button from "@material-ui/core/Button";
import Stack from "@mui/material/Stack";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { AuthContext } from "../App";

const useStyles = makeStyles((theme) => ({
  noTransform: {
    textTransform: "none !important",
  },
}));

const Tabs = () => {
  const classes = useStyles();
  const authContext = useContext(AuthContext);

  return (
    <Box sx={{ flexGrow: 1, display: { md: "flex" }, marginLeft: "100px", justifyContent: "flex-end", marginRight: '8px' }}>
      <Stack spacing={1} direction="row">
        {authContext.role === "student" && (
          <Button
            variant="outlined"
            className={classes.noTransform}
            color="inherit"
          >
            <Link
              to="/complaints"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              All Active Complaints
            </Link>
          </Button>
        )}
        {authContext.role === "student" && (
          <Button
            variant="outlined"
            className={classes.noTransform}
            color="inherit"
          >
            <Link
              to="/complaints/me"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              My Complaints
            </Link>
          </Button>
        )}
        {authContext.role === "student" && (
          <Button
            variant="outlined"
            className={classes.noTransform}
            color="inherit"
          >
            <Link
              to="/create"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Create Complaint
            </Link>
          </Button>
        )}
        {authContext.role === "student" && (
          <Button
            variant="outlined"
            className={classes.noTransform}
            color="inherit"
          >
            <Link
              to="/givefeedback"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Give FeedBack
            </Link>
          </Button>
        )}
        {authContext.role === "dean" && (
          <Button
            variant="outlined"
            className={classes.noTransform}
            color="inherit"
          >
            <Link
              to="/view"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              View Feedback
            </Link>
          </Button>
        )}
        {authContext.role === "dean" && (
          <Button
            variant="outlined"
            className={classes.noTransform}
            color="inherit"
          >
            <Link
              to="/resolve"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Resolve Complaints
            </Link>
          </Button>
        )}

        <Button
          key="Home"
          variant="outlined"
          className={classes.noTransform}
          color="inherit"
          style={{ marginLeft: "8px" }}
        >
          <Link to="/home" style={{ textDecoration: "none", color: "inherit" }}>
            Home
          </Link>
        </Button>
      </Stack>
    </Box>
  );
};

export default Tabs;
