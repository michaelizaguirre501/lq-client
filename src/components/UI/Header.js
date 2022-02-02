import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import history from "../../history";

const Header = () => {
  return (
    <div
      style={{
        display: "flex",
        height: 70,
        alignItems: "center",
      }}
    >
      <Link to="/">
        <Button color="primary" style={{ marginRight: "10px" }}>
          <HomeIcon />
        </Button>
        <Button style={{ height: "35px" }} onClick={() => history.goBack()}>
          <ArrowBackIcon />
        </Button>
      </Link>
      <Button
        style={{ height: "35px" }}
        onClick={() => history.push("/brokers")}
      >
        Brokers
      </Button>
    </div>
  );
};

export default Header;
