import "./App.css";
import React from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Landing from "./components/Landing";
import Dashboard from "./components/Dashboard";
import Options from "./components/Options";
import { Route, useHistory } from "react-router-dom";
import useApplicationData from "./hooks/useApplicationData";
import axios from "axios";

if (process.env.REACT_APP_API_BASE_URL) {
  axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
} else {
  axios.defaults.baseURL = "http://localhost:9000";
}

axios.defaults.withCredentials = true;

function App() {
  const {
    state,
    disableBlacklistedSite,
    addBlacklistedSite,
    setDashboard,
    changeQuota,
  } = useApplicationData();

  const theme = createMuiTheme({
    typography: {
      fontFamily: "Amatic SC, sans-serif",
      fontSize: 25,
      fontWeight: "700",
    },
  });

  const history = useHistory();
  
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Route
          exact
          path={["/"]}
          render={() =>
            !state.quota_today.allotment
              ? history.push("/login")
              : history.push("/dashboard")
          }
        />
        <Route
          exact
          path={["/login", "/register"]}
          render={() =>
            !state.quota_today.allotment ? (
              <Landing setDashboard={setDashboard} />
            ) : (
              history.push("/dashboard")
            )
          }
        />
        <Route
          exact
          path={["/logout"]}
          render={() => <Landing setDashboard={setDashboard} />}
        />
        <Route
          exact
          path="/dashboard"
          render={() =>
            state.quota_today.allotment && (
              <Dashboard dashboardData={state} setDashboard={setDashboard} />
            )
          }
        />
        <Route
          exact
          path="/options"
          render={() =>
            state.quota_today.allotment && (
              <Options
                changeQuota={changeQuota}
                addBlacklistedSite={addBlacklistedSite}
                disableBlacklistedSite={disableBlacklistedSite}
                dashboardData={state}
                blacklisted={state.blacklisted}
                setDashboard={setDashboard}
              />
            )
          }
        />
      </ThemeProvider>
    </div>
  );
}

export default App;
