import React from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import AddCommentIcon from "@mui/icons-material/AddComment";
import CommentIcon from "@mui/icons-material/Comment";

import {
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  TextField,
  Grid,
} from "@mui/material";
import TimeComponent from "./TimeComponent";


const ComplaintDialog = ({ open, handleClose, complaint, upvoteHandlerFunction, loggedUserId, commentHandler, listCommentHandler }) => {
const [commentText, updateComment] = React.useState('')

  const updateCommentText = event => {
    updateComment(event.target.value)
  }
return (
<React.Fragment>
    <Dialog open={open} onClose={handleClose} PaperProps={{ style: { minWidth: '400px' } }}>
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
          created At - <TimeComponent timeString = {complaint?.data?.complaint?.createdAt} />
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
        {(!complaint?.data?.upvoted && complaint?.data?.complaint?.complainee?._id !== loggedUserId) &&
          <Button
            variant="outlined"
            color="primary"
            onClick={() => { upvoteHandlerFunction(complaint, complaint?.data?.complaint?._id) }}
            style={{ marginTop: "12px" }}
          >
            <ThumbUpIcon />
          </Button>
        }

        <Grid container spacing={2} style={{ marginTop: "10px" }}>
          <Grid item xs={10}>
            <TextField
              label="Add a comment"
              variant="outlined"
              multiline
              rows={3}
              fullWidth
              value = {commentText}
              onChange={updateCommentText}
            />
          </Grid>
          <Grid item xs={2}>
            <Grid container direction="column" spacing={1}>
              <Grid item>
                <IconButton color="primary" onClick= {() => {listCommentHandler(complaint?.data?.complaint?._id)}} >
                  <CommentIcon />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton color="primary" onClick={()=> {commentHandler(commentText, complaint?.data?.complaint?._id)}}>
                  <AddCommentIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
            </Dialog>
            </React.Fragment>
  );
};

export default ComplaintDialog;
