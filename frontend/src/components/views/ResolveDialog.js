import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const ResolveDialog = ({
  open,
  closeResolver,
  submitResolver,
  changeResolveText,
}) => {
  return (
    <React.Fragment>
      <Dialog open={open} onClose={closeResolver} fullWidth>
        <DialogTitle>Resolve</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill the resolvement marks
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="resolvement_text"
            label="Marks"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => {
              changeResolveText(e);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeResolver}>Cancel</Button>
          <Button onClick={submitResolver}>Resolve</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default ResolveDialog;
