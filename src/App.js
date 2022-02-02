import React from "react";
import { Router, Route, Switch } from "react-router-dom";

import Header from "./components/UI/Header";
import Landing from "./components/Landing";
import BrokerList from "./components/brokers/BrokerList";

import history from "./history";

//Theme
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
    },
  })
);

const App = () => {
  useStyles();
  return (
    <ThemeProvider theme={theme}>
      <Router history={history}>
        <Header />
        <Switch>
          <Route path="/" exact component={Landing} />
          <Route path="/brokers" exact component={BrokerList} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default App;
