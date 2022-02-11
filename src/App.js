import React, { useEffect, useState } from "react";
import { Router, Route, Switch } from "react-router-dom";

import Header from "./components/UI/Header";
import Landing from "./components/Landing";
import BrokerList from "./components/brokers/BrokerList";
import AgentList from "./components/agents/AgentList";
import MemberList from "./components/members/MemberList";

import history from "./history";
import api from "./api/api";

import {
  createStyles,
  makeStyles,
  createTheme,
  ThemeProvider,
} from "@material-ui/core";

const theme = createTheme({});

const useStyles = makeStyles(() =>
  createStyles({
    "@global": {
      "*": {
        boxSizing: "border-box",
        margin: 0,
        padding: 0,
      },
      html: {
        "-webkit-font-smoothing": "antialiased",
        "-moz-osx-font-smoothing": "grayscale",
        height: "100%",
        width: "100%",
        fontFamily: "roboto",
      },
      body: {
        height: "100%",
        width: "90%",
        margin: "50px auto",
      },
      "#root": {
        height: "100%",
        width: "100%",
      },
      a: {
        textDecoration: "none",
      },
      h1: {
        fontWeight: 400,
        margin: "50px 0",
      },
      ".filters": {
        display: "flex",
        flexDirection: "row",
      },
      ".filters > label": {
        marginRight: "15px",
        marginLeft: "15px",
        marginTop: "10px",
      },
      ".resetButton": {
        marginLeft: "15px",
      },
      h2: {
        marginBottom: "25px",
        fontWeight: 400,
      },
    },
  })
);

const App = () => {
  const [agentList, setAgentList] = useState([]);
  const [brokerList, setBrokerList] = useState([]);

  useEffect(() => {
    async function fetchMyApi() {
      let response = await api.get("/agents");

      setAgentList(response.data);
    }
    fetchMyApi();
  }, []);

  useEffect(() => {
    async function fetchMyApi() {
      let response = await api.get("/brokers");
      setBrokerList(response.data);
    }
    fetchMyApi();
  }, []);

  useStyles();
  return (
    <ThemeProvider theme={theme}>
      <Router history={history}>
        <Header />
        <Switch>
          <Route path="/" exact component={Landing} />
          <Route path="/brokers" exact>
            <BrokerList brokerList={brokerList} />
          </Route>
          <Route path="/agents" exact>
            <AgentList agentList={agentList} />
          </Route>
          <Route path="/members" exact component={MemberList} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default App;
