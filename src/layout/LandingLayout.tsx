import React from "react";

import { connect } from "react-redux";
import { Dispatch } from "redux";

import { setUserLoggedInStatus } from "../redux/user/user.actions";

import { Route, Switch, Link, useRouteMatch } from "react-router-dom";

import { Button } from "antd";

import AdminHome from "../pages/admin/AdminHome";
import ClientHome from "../pages/client/ClientHome";
import ProfessionalHome from "../pages/professional/ProfessionalHome";

const LandingLayout: React.FC = (props: any) => {
  const { url, path } = useRouteMatch();

  const { setUserLoggedInStatus } = props;

  return (
    <>
      <div
        style={{
          //TODO: this needs to be put in a separate file.
          display: "flex",
          margin: "10px",
          padding: "10px",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "50%",
          alignSelf: "center",
        }}
      >
        <Link to={`${url}`}>Landing Page</Link>
        <Link to={`${url}/admin`}>Admin</Link>
        <Link to={`${url}/client`}>Client</Link>
        <Link to={`${url}/professional`}>Professional</Link>
      </div>
      {/* <Button>test</Button> */}

      <Switch>
        <Route exact path={`${path}`}>
          <>
            <h2>Landing Page</h2>
            <Button onClick={() => setUserLoggedInStatus(false)}>Logout</Button>
          </>
        </Route>
        <Route exact path={`${path}/admin`}>
          <AdminHome />
        </Route>
        <Route exact path={`${path}/client`}>
          <ClientHome />
        </Route>
        <Route exact path={`${path}/professional`}>
          <ProfessionalHome />
        </Route>
      </Switch>
    </>
  );
};
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    setUserLoggedInStatus: (status: boolean) =>
      dispatch(setUserLoggedInStatus(status)),
  };
};

export default connect(null, mapDispatchToProps)(LandingLayout);
