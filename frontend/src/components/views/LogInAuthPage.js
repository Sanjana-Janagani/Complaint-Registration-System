import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useApolloClient } from "@apollo/client";
import { LOGIN } from "../../gql/queries/AUTHQUERIES";
import SnackBar from "../../snackbar/SnackBar";
import { AuthContext } from "../../App";
import { jwtDecode } from "jwt-decode";

const defaultTheme = createTheme();

export default function LogInAuthPage() {
  const [role, setRole] = React.useState("student");
  const [identity_label, setIdentityLabel] = React.useState("Roll Number");
  const client = useApolloClient();
  const [severity, setSnackSeverity] = React.useState('');
  const [snackMessage, setSnackMessage] = React.useState('');
  const authContext = React.useContext(AuthContext);
  const navigate = useNavigate();

  const handleRole = (event) => {
    let new_identity_label =
      event.target.value === "dean" ? "Dean Id" : "Roll Number";
    setIdentityLabel(new_identity_label);
    setRole(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const logInput = {
      identification_num: data.get("identification_num"),
      password: data.get("password"),
      role: role,
    };

    try {
      let res = await client.query({
        query: LOGIN,
        variables: {
          logInput,
        },
      });
      let parsed_token = jwtDecode(res?.data?.login?.token);
      let new_userstore = {
        userId: parsed_token.userId,
        role: parsed_token.role,
        token: res?.data?.login?.token,
      };
      setSnackSeverity('');
      setSnackMessage('Logged in successfully. Redirecting...');
      setSnackSeverity('success');
      setTimeout(() => {
        authContext.login(new_userstore);
        if (role === 'student') {
          navigate('/complaints/me');
        } else {
          navigate('/view')
        }
        
      }, 5000)

    } catch (error) {
      setSnackSeverity('');
      setSnackMessage(error.message);
      setSnackSeverity('error');
    }
  };

  return (
    <>
      {severity !== '' && <SnackBar message={snackMessage} severity = {severity} />}
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate={false}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="identification_num"
                label={identity_label}
                name="identification_num"
                autoComplete="identification_num"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <br />
              <FormControl sx={{ marginTop: "10px" }}>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Role :
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  value={role}
                  onChange={handleRole}
                >
                  <FormControlLabel
                    value="student"
                    control={<Radio />}
                    label="Student"
                  />
                  <FormControlLabel
                    value="dean"
                    control={<Radio />}
                    label="Dean"
                  />
                </RadioGroup>
              </FormControl>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link variant="body2">Forgot password?</Link>
                </Grid>
                <Grid item>
                  <Link variant="body2">
                    <RouterLink
                      to="/signup"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      {"Don't have an account? Sign Up"}
                    </RouterLink>
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}
