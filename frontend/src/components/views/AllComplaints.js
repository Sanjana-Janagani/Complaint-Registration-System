import React, { useState, useEffect } from "react";
import { Grid, Container, Typography } from "@mui/material";
import { ComplaintCard } from "./ComplaintCard";
import ComplaintDialog from "./ComplaintDialog";
import CommentDialog from "./CommentDialog";
import { useQuery } from "@apollo/client";
import { LIST_COMPLAINTS_FEW } from "../../gql/queries/COMPLAINT";
import SnackBar from "../../snackbar/SnackBar";
import { useNavigate } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { AuthContext } from "../../App";
import { VIEW_COMPLAINT } from "../../gql/queries/COMPLAINT";
import { UPVOTE_COMPLAINT } from "../../gql/queries/COMPLAINT";
import { CREATE_COMMENT, LIST_COMMENTS } from "../../gql/queries/COMMENT";
import { useApolloClient } from "@apollo/client";
import BottomSnackBar from "../../snackbar/BottomSnackBar";

const default_variable = { status: "Active" };

const AllComplaints = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [complaintsData, setComplaintsData] = useState([]);
  const [severity, setSnackSeverity] = useState("");
  const [snackMessage, setSnackMessage] = useState("");
  const [backDrop, setBackDrop] = useState(false);
  const authContext = React.useContext(AuthContext);
  const [hardloading, setHardLoading] = useState(false);
  const [bottomSeverity, setBottomSnackSeverity] = useState("");
  const [bottomSnackMessage, setBottomSnackMessage] = useState("");
  const [commentdialogOpen, setCommentDialog] = useState(false);
  const [commentsData,setCommentData] = useState([])
  const client = useApolloClient();
  const navigate = useNavigate();

  const handleViewDetails = (complaint) => {
    setSelectedComplaint(complaint);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };
  let { loading, error, data } = useQuery(LIST_COMPLAINTS_FEW, {
    variables: { default_variable },
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
    let c = hardloading || loading;
    setBackDrop(c);
  }, [hardloading, loading]);

  const viewHandler = async (id) => {
    setHardLoading(true);
    try {
      let complaintId = id;
      let userId = authContext.userId;
      let res = await client.query({
        query: VIEW_COMPLAINT,
        variables: {
          complaintId,
          userId,
        },
        fetchPolicy: "network-only",
      });
      setHardLoading(false);
      let detailedComplaint = { data: res?.data?.viewComplaint };
      handleViewDetails(detailedComplaint);
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
          `Couldn't View the complaint with error ${error?.message} `
        );
        setSnackSeverity("error");
      }
    }
  };

  const commentHandlerFunction = async (text, id) => {
    let commentInput = {
      comment_text: text,
      complaint_id: id,
    };
    try {
      let res = await client.mutate({
        mutation: CREATE_COMMENT,
        variables: {
          commentInput,
        },
        refetchQueries: ["LIST_COMMENTS"],
      });
      setBottomSnackSeverity("");
      setBottomSnackMessage(
        `Comment saved successfully with id ${res?.data?.createComment?._id}`
      );
      setBottomSnackSeverity("success");
    } catch (error) {
      if (error.message === "Unauthorized client in the scope") {
        setBottomSnackSeverity("");
        setBottomSnackMessage("Session Timed Out. Please LogIn again!");
        setBottomSnackSeverity("error");
        // setTimeout(() => {
        //   navigate("/login");
        // }, 3000);
        authContext.logout()
      } else {
        setBottomSnackSeverity("");
        setBottomSnackMessage(
          `Couldn't comment with error ${error?.message} `
        );
        setBottomSnackSeverity("error");
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

  const upVoteHandler = async (old_complaint, id) => {
    let complaintId = id;
    try {
      let res = await client.mutate({
        mutation: UPVOTE_COMPLAINT,
        variables: {
          complaintId,
        },
      });
      let new_complaint = {
        data: {
          complaint: {
            ...old_complaint.data.complaint,
            upvotes: res?.data?.upVoteComplaint?.upvotes,
          },
          upvoted: true,
          viewer: old_complaint.data.viewer,
        },
      };
      handleViewDetails(new_complaint);
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
          `Couldn't upvote the complaint with error ${error?.message} `
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

      {bottomSeverity !== "" && (
        <BottomSnackBar
          message={bottomSnackMessage}
          severity={bottomSeverity}
        />
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
          <Typography variant="h5" gutterBottom>
            No Active Complaints
          </Typography>
        </Container>
      ) : (
        <Container maxWidth="lg" style={{ marginTop: "50px" }}>
          <Grid container spacing={3}>
            {complaintsData.map((complaint) => (
              <Grid item key={complaint.id} xs={12} sm={6} md={4}>
                <ComplaintCard
                  complaint={complaint}
                  viewHandler={viewHandler}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      )}
      <ComplaintDialog
            open={dialogOpen}
            handleClose={handleDialogClose}
            complaint={selectedComplaint}
            upvoteHandlerFunction={upVoteHandler}
            loggedUserId={authContext.userId}
            commentHandler={commentHandlerFunction}
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

export default AllComplaints;
