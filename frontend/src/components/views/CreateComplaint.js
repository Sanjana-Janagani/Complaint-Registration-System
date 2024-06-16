import React, { useContext } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Slide from "@mui/material/Slide";
import { useNavigate } from "react-router-dom";
import { Grid, TextField, DialogContent } from "@mui/material";
import { useApolloClient } from "@apollo/client";
import { CREATE_COMPLAINT } from "../../gql/queries/COMPLAINT";
import BottomSnackBar from "../../snackbar/BottomSnackBar";
import { AuthContext } from "../../App";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CreateComplaint = (props) => {
  const [open, setOpen] = React.useState(props.openDialog);
  const navigate = useNavigate();
  const client = useApolloClient();
  const authContext = useContext(AuthContext)
  const [severity, setSnackSeverity] = React.useState("");
  const [snackMessage, setSnackMessage] = React.useState("");

  const handleClose = () => {
    navigate(-1);
    setOpen(false);
  };

  const [complaintInput, setComplaintInput] = React.useState({
    complaint_category: "",
    section: "",
    department: "",
    complaint_details: "",
  });


  const handleInputChange = (fieldName) => (event) => {
    setComplaintInput({ ...complaintInput, [fieldName]: event.target.value });
  };

  const handleSave = async () => {
    try {
      let res = await client.mutate({
        mutation: CREATE_COMPLAINT,
        variables: {
          complaintInput,
        },
        refetchQueries:[
          'LIST_COMPLAINTS_FEW'
      ]
      });
      setSnackSeverity("");
      setSnackMessage(
        `Complaint saved successfully with id ${res?.data?.createComplaint?._id}`
      );
      setSnackSeverity("success");
      setTimeout(() => {
        handleClose();
      }, 2000);
    } catch (error) {
      if (error.message === "Unauthorized client in the scope") {
        setSnackSeverity("");
        setSnackMessage("Session Timed Out. Please LogIn again!");
        setSnackSeverity("error");
        // setTimeout(() => {
        //   navigate("/login");
        // }, 3000);
        authContext.logout()
      } else {
        setSnackSeverity("");
        setSnackMessage(
          `Couldn't save the complaint with error ${error?.message} `
        );
        setSnackSeverity("error");
      }
    }
  };

  return (
    <React.Fragment>
      {severity !== "" && (
        <BottomSnackBar message={snackMessage} severity={severity} />
      )}
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
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
              onClick={handleClose}
              aria-label="close"
            >
              <KeyboardBackspaceIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Create Complaint
            </Typography>
            <Button
              autoFocus
              color="inherit"
              variant="outlined"
              onClick={handleSave}
            >
              save
            </Button>
          </Toolbar>
        </AppBar>

        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Category"
                fullWidth
                value={complaintInput.complaint_category}
                onChange={handleInputChange("complaint_category")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Section"
                fullWidth
                value={complaintInput.section}
                onChange={handleInputChange("section")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Department"
                fullWidth
                value={complaintInput.department}
                onChange={handleInputChange("department")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Complaint Details"
                fullWidth
                multiline
                rows={5}
                value={complaintInput.complaint_details}
                onChange={handleInputChange("complaint_details")}
              />
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default CreateComplaint;
