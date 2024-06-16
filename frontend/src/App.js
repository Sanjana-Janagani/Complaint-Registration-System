import * as React from "react";
import Header from "./components/Header";
import Home from "./components/static/Home";
import { Route, Navigate, Routes, useNavigate } from "react-router-dom";
import AllComplaints from "./components/views/AllComplaints";
import CreateComplaint from "./components/views/CreateComplaint";
import LogInAuthPage from "./components/views/LogInAuthPage";
import SignUpAuthPage from "./components/views/SignUpAuthPage";
import { jwtDecode } from "jwt-decode";
import ViewFeedback from "./components/views/ViewFeedback";
import ResolveComplaint from "./components/views/ResolveComplaint";
import MyComplaints from "./components/views/MyComplaints";
import FeedbackComplaints from "./components/views/FeedbackComplaints";

const default_userstore = {
  userId: null,
  role: null,
  token: null,
};

export const AuthContext = React.createContext();

const getTokenFromCookie = (cookieName) => {
  const name = cookieName + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(";");
  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i].trim();
    if (cookie.indexOf(name) === 0) {
      let final_token = cookie.substring(name.length);
      let parsed_token = jwtDecode(final_token);
      return {
        userId: parsed_token.userId,
        role: parsed_token.role,
        token: final_token,
      };
    }
  }
};

const deleteCookie = (name) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;
};


const App = () => {
  const [userStore, setUserstore] = React.useState(() => {
    const retrive_token = getTokenFromCookie("secretToken");
    return retrive_token ? retrive_token : default_userstore;
  });
  const navigate = useNavigate();
  const logInHandler = (new_userstore) => {
    setUserstore(new_userstore);
  };

  const logOutHandler = () => {
    deleteCookie('secretToken');
    setUserstore(default_userstore);
    setTimeout(() => {
      navigate('/login')
    }, 1500);

  };

  return (
    <React.Fragment>
      <AuthContext.Provider
        value={{
          token: userStore.token,
          userId: userStore.userId,
          role: userStore.role,
          login: logInHandler,
          logout: logOutHandler,
        }}
      >
        <Header />
        <Routes>

          <Route
            path="/"
            element={
              (userStore.token && userStore.userId) ? (
                (userStore.role === 'student') ? (<Navigate to="/complaints/me" />) : (<Navigate to="/view" />)
              ) : (
                <Navigate to="/home" />
              )
            }
          />
          <Route
            path="/login"
            element={
              (!userStore.token || !userStore.userId) ? (
                <LogInAuthPage />
              ) : (userStore.role === 'student') ? (<Navigate to="/complaints/me" />) : (<Navigate to="/view" />)
            }
          />
          <Route
            path="/signup"
            element={
              (!userStore.token || !userStore.userId) ? (
                <SignUpAuthPage />
              ) : (
                (userStore.role === 'student') ? (<Navigate to="/complaints/me" />) : (<Navigate to="/view" />)
              )
            }
          />
          <Route
            path="/complaints"
            element={(userStore.token && userStore.userId && userStore.role === 'student') ? <AllComplaints /> : <Navigate to="/login" />}
          />
          <Route
            path="/complaints/me"
            element={(userStore.token && userStore.userId && userStore.role === 'student') ? <MyComplaints /> : <Navigate to="/login" />}
          />
          <Route
            path="/create"
            element={
              (userStore.token && userStore.userId && userStore.role === 'student') ? <CreateComplaint openDialog={true} /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/givefeedback"
            element={
              (userStore.token && userStore.userId && userStore.role === 'student') ? <FeedbackComplaints openDialog={true} /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/view"
            element={
              (userStore.token && userStore.userId && userStore.role === 'dean') ? <ViewFeedback /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/resolve"
            element={
              (userStore.token && userStore.userId && userStore.role === 'dean') ? <ResolveComplaint /> : <Navigate to="/login" />
            }
          />
          <Route path="/home" element={<Home />} />
        </Routes>
      </AuthContext.Provider>
    </React.Fragment>
  );
};

export default App;
