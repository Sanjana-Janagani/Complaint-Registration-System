import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Avatar,
} from "@mui/material";



export const ResolveComplaintCard = ({ complaint, viewHandler, resolveHandler }) => {

  return (
    <Card>
      <CardContent>
        <Grid container alignItems="center" spacing={2}>
          <Grid item>
            <Avatar>{complaint.complainee.name.charAt(0)}</Avatar>
          </Grid>
          <Grid item>
            <Typography variant="h7" color="text.primary">
              Author : <b>{complaint.complainee.name}</b>
            </Typography>
          </Grid>
        </Grid>
        <Grid
          container
          alignItems="center"
          xs={10}
          style={{ marginTop: "15px" }}
        >
          <Grid item>
            <Typography variant="h6" component="div">
              {complaint.complaint_category}
            </Typography>
            <Typography
              variant="subtitle1"
              color="textSecondary"
              style={{ marginTop: "12px" }}
            >
              Section - {complaint.section}
            </Typography>
          </Grid>
        </Grid>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => { viewHandler(complaint._id) }}
          style={{ marginTop: "5px" }}
        >
          View More
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => { resolveHandler(complaint._id) }}
          style={{ marginTop: "5px", marginLeft: '5px' }}
        >
          Resolve
        </Button>
      </CardContent>
    </Card>
  );
};
