import React, { useState, useEffect, useContext } from "react";
import { Grid, Container, Typography } from "@mui/material";
import { FeedbackComplaintCard } from "./FeedbackComplaintCard";
import { useQuery } from "@apollo/client";
import { LIST_COMPLAINTS_FEW, VIEW_RESOLVED_COMPLAINT } from "../../gql/queries/COMPLAINT";
import SnackBar from "../../snackbar/SnackBar";
import { useNavigate } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { AuthContext } from "../../App";
import { useApolloClient } from "@apollo/client";
import { LIST_COMMENTS } from "../../gql/queries/COMMENT";
import CommentDialog from "./CommentDialog";
import FeedbackComplaintDialog from "./FeedbackComplaintDialog";


const FeedbackComplaints = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [complaintsData, setComplaintsData] = useState([]);
  const [severity, setSnackSeverity] = useState("");
  const [snackMessage, setSnackMessage] = useState("");
  const [backDrop, setBackDrop] = useState(false);
  const authContext = useContext(AuthContext);
  const client = useApolloClient();
  const [hardloading, setHardLoading] = useState(false)
  const navigate = useNavigate();
  const [commentdialogOpen, setCommentDialog] = useState(false);
  const [commentsData,setCommentData] = useState([])


  const handleViewDetails = (complaint) => {
    setSelectedComplaint(complaint);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };
  const status = 'Resolved';
  const userId = authContext.userId
  const { loading, error, data } = useQuery(LIST_COMPLAINTS_FEW, {
    variables: { status, userId  },
  });

  if (error) {
    setBackDrop(false);
    if (error.message === "Unauthorized client in the scope") {
      setSnackSeverity("");
      setSnackMessage("Session Timed Out. Please LogIn again!");
      setSnackSeverity("error");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } else {
      setSnackSeverity("");
      setSnackMessage(
        `Couldn't save the complaint with error ${error?.message} `
      );
      setSnackSeverity("error");
    }
  }

  useEffect(() => {
    setBackDrop(false);
    if (data?.listComplaints) {
      setComplaintsData(data?.listComplaints);
    }
  }, [data]);

  useEffect(() => {
    setBackDrop(loading);
  }, [loading]);

  useEffect(() => {
    let c = hardloading || loading
    setBackDrop(c);
  }, [hardloading, loading]);

  const viewHandler = async (id) => {
    setHardLoading(true)
    try {
      let complaintId = id;
      let userId = authContext.userId;
      let res = await client.query({
        query: VIEW_RESOLVED_COMPLAINT,
        variables: {
          complaintId,
          userId,
        },
        fetchPolicy: "network-only",
      });
      console.log(res)
      setHardLoading(false)
      handleViewDetails(res?.data?.viewResolvedComplaint);
    } catch (error) {
      setHardLoading(false)
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
    setHardLoading(true);
    try {
      let complaintId = id;
      let res = await client.query({
        query: LIST_COMMENTS,
        variables: {
          complaintId,

        },
        fetchPolicy: "network-only",
      });
      setHardLoading(false);
      setCommentDialog(true);
      setCommentData(res?.data?.listComments)
    } catch (error) {
      setHardLoading(false);
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

  const feedbackHandlerFunction = () => {};

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

      {complaintsData.length === 0 ? (
        <Container
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Typography variant="h4" gutterBottom>
            No Resolved Complaints to give feedback
          </Typography>
        </Container>
      ) : (
        <Container maxWidth="lg" style={{ marginTop: "50px" }}>
          <Grid container spacing={3}>
            {complaintsData.map((complaint) => (
              <Grid item key={complaint.id} xs={12} sm={6} md={4}>
                <FeedbackComplaintCard
                  complaint={complaint}
                  viewHandler={viewHandler}
                  feedbackHandler={feedbackHandlerFunction}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      )}
      <FeedbackComplaintDialog
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
 
export default FeedbackComplaints;
