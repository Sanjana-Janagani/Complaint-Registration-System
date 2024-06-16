import React from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import CommentIcon from "@mui/icons-material/Comment";

import {
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
} from "@mui/material";
import TimeComponent from "./TimeComponent";

const MyComplaintDialog = ({ open, handleClose, complaint, listCommentHandler }) => {
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{ style: { minWidth: "400px" } }}
      >
        <DialogTitle
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginRight: "20px",
          }}
        >
          {complaint?.data?.complaint?.complaint_category}{" "}
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
            style={{ position: "absolute", right: 0, top: 0 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Typography variant="subtitle1" color="textSecondary">
            created At -{" "}
            <TimeComponent timeString={complaint?.data?.complaint?.createdAt} />
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Section - {complaint?.data?.complaint?.department}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Department - {complaint?.data?.complaint?.department}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Views - {complaint?.data?.complaint?.views}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Upvotes - {complaint?.data?.complaint?.upvotes}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Status - {complaint?.data?.complaint?.status}
          </Typography>
          <Typography variant="body1" style={{ marginTop: "12px" }}>
            {complaint?.data?.complaint?.complaint_details}
          </Typography>
          <Grid
            container
            spacing={1}
            justifyContent="center"
            alignItems="center"
            style={{ marginTop: "5px" }}
          >
            <Grid item>
              <IconButton color="primary" onClick= {() => {listCommentHandler(complaint?.data?.complaint?._id)}}>
                <CommentIcon />
              </IconButton>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default MyComplaintDialog;
