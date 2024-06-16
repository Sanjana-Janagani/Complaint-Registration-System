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

const FeedbackComplaintDialog = ({
  open,
  handleClose,
  complaint,
  listCommentHandler,
}) => {
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
          {complaint?.complaint_category}{" "}
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
            <TimeComponent timeString={complaint?.createdAt} />
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Section - {complaint?.department}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Department - {complaint?.department}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Views - {complaint?.views}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Upvotes - {complaint?.upvotes}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Status - {complaint?.status}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Resolved By - {complaint?.resolvedBy?.name}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Resolvemet marks - {complaint?.resolvement}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Resolved At - {""}
            <TimeComponent
              timeString={complaint?.resolvedAt}
            />
          </Typography>

          <Typography variant="body1" style={{ marginTop: "12px" }}>
            {complaint?.complaint_details}
          </Typography>
          <Grid
            container
            spacing={1}
            justifyContent="center"
            alignItems="center"
            style={{ marginTop: "5px" }}
          >
            <Grid item>
              <IconButton
                color="primary"
                onClick={() => {
                  listCommentHandler(complaint?._id);
                }}
              >
                <CommentIcon />
              </IconButton>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default FeedbackComplaintDialog;
