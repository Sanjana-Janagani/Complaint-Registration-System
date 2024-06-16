import React, { useState, useEffect } from "react";
import {
  Grid,
  Container,
  Box,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography
} from "@mui/material";
import { ComplaintCard } from "./ComplaintCard";
import MyComplaintDialog from "./MyComplaintDialog";
import CommentDialog from "./CommentDialog";
import { LIST_COMPLAINTS_FEW } from "../../gql/queries/COMPLAINT";
import SnackBar from "../../snackbar/SnackBar";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { AuthContext } from "../../App";
import { VIEW_COMPLAINT } from "../../gql/queries/COMPLAINT";
import { useApolloClient } from "@apollo/client";
import {  LIST_COMMENTS } from "../../gql/queries/COMMENT";

const MyComplaints = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [complaintsData, setComplaintsData] = useState([]);
  const [severity, setSnackSeverity] = useState("");
  const [snackMessage, setSnackMessage] = useState("");
  const [backDrop, setBackDrop] = useState(false);
  const authContext = React.useContext(AuthContext);
  const client = useApolloClient();
  const [loading, setLoading] = useState(false)
  const [commentdialogOpen, setCommentDialog] = useState(false);
  const [commentsData,setCommentData] = useState([])

  const handleViewDetails = (complaint) => {
    setSelectedComplaint(complaint);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  useEffect(() => {
    setBackDrop(false);
  }, [complaintsData]);

  useEffect(() => {
    setBackDrop(loading);
  }, [loading]);

  const viewHandler = async (id) => {
    setLoading(true)
    try {
      let complaintId = id;
      let userId = authContext.userId;
      let res = await client.query({
        query: VIEW_COMPLAINT,
        variables: {
          complaintId,
          userId,
        },
        fetchPolicy: 'network-only',
      });
      setLoading(false)
      let detailedComplaint = { data: res?.data?.viewComplaint };
      handleViewDetails(detailedComplaint);
    } catch (error) {
      setLoading(false)
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
          `Couldn't View the complaint with error ${error?.message} `
        );
        setSnackSeverity("error");
      }
    }
  };

  const [complaintStatus, setComplaintStatus] = React.useState("");

  const handleComplaintStatusChange = (event) => {
    setComplaintStatus(event.target.value);
  };

  const handleFetchButtonClick = async () => {
    setLoading(true)
    try {
      let status = complaintStatus;
      let userId = authContext.userId;
      let res = await client.query({
        query: LIST_COMPLAINTS_FEW,
        variables: {
          status,
          userId,
        },
      });
      setLoading(false)
      let fetched_complaints = { data: res?.data?.listComplaints };
      setComplaintsData(fetched_complaints?.data);
    } catch (error) {
      setLoading(false)
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
          `Couldn't View the complaint with error ${error?.message} `
        );
        setSnackSeverity("error");
      }
    }
  };

  const commentsCloseHandler = () => {
    setCommentDialog(false);
    setCommentData([])
  }

  const listCommentsHanlderFunction = async (id) => {
    setLoading(true);
    try {
      let complaintId = id;
      let res = await client.query({
        query: LIST_COMMENTS,
        variables: {
          complaintId,

        },
        fetchPolicy: "network-only",
      });
      setLoading(false);
      setCommentDialog(true);
      setCommentData(res?.data?.listComments)
    } catch (error) {
      setLoading(false);
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
          `Couldn't list comments with error ${error?.message} `
        );
        setSnackSeverity("error");
      }
    }
  };

  return (
    <React.Fragment>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backDrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {severity !== "" && (
        <SnackBar message={snackMessage} severity={severity} />
      )}
      <Container
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "20vh",
        }}
      >
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <FormControl style={{ marginRight: "10px", width: "25%" }}>
            <InputLabel id="complaintStatus-label">Complaint Status</InputLabel>
            <Select
              labelId="complaintStatus-label"
              id="complaintStatus"
              value={complaintStatus}
              label="Complaint Status"
              onChange={handleComplaintStatusChange}
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Resolved">Resolved</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="contained"
            onClick={handleFetchButtonClick}
            style={{ width: "10%" }}
          >
            Fetch
          </Button>
        </Box>
      </Container>
      {complaintsData.length === 0 ? (
      <Container
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "60vh",
      }}
    >
      <Typography variant="h4" gutterBottom>
        No complaints to show
      </Typography>
    </Container>
      ): (
        <Container maxWidth = "lg" style = {{ marginTop: "40px" }}>
      <Grid container spacing={3}>
        {complaintsData.map((complaint) => (
          <Grid item key={complaint.id} xs={12} sm={6} md={4}>
            <ComplaintCard complaint={complaint} viewHandler={viewHandler} />
          </Grid>
        ))}
      </Grid>
        
    </Container>
  )
}
      <MyComplaintDialog
          open={dialogOpen}
          handleClose={handleDialogClose}
        complaint={selectedComplaint}
        listCommentHandler={listCommentsHanlderFunction}
      />
      <CommentDialog
            open={commentdialogOpen}
        comments={commentsData}
        closeHandler = {commentsCloseHandler}
          />
    </React.Fragment>
  );
};

export default MyComplaints;
