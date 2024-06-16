import React from "react";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Slide from "@mui/material/Slide";
import {
  DialogContent,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
  Container,
} from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CommentDialog = ({ open, comments, closeHandler }) => {
  return (
    <React.Fragment>
      <Dialog
        fullScreen
        open={open}
        onClose={closeHandler}
        TransitionComponent={Transition}
      >
        <AppBar
          sx={{
            position: "relative",
            backgroundColor: "#272626",
            padding: "6px",
          }}
        >
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={closeHandler}
              aria-label="close"
            >
              <KeyboardBackspaceIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Comments
            </Typography>
          </Toolbar>
        </AppBar>
        <DialogContent>
          {comments.length === 0 ? (
            <Container
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
              }}
            >
              <Typography variant="h5" gutterBottom>
                No Comments to show
              </Typography>
            </Container>
          ) : (
            <List>
              {comments.map((comment, index) => (
                <React.Fragment key={comment._id}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>{comment.commenter.name.charAt(0)}</Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={comment.commenter.name}
                      secondary={comment.comment_text}
                    />
                  </ListItem>
                  {index !== comments.length - 1 ? <Divider /> : null}
                </React.Fragment>
              ))}
            </List>
          )}
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default CommentDialog;
