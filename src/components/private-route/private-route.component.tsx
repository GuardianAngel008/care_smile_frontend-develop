import React from "react";
import { Route, Redirect } from "react-router-dom";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectIsLogged } from "../../redux/user/user.selectors";

const PrivateRoute: React.FC<{
  component: React.FC;
  path: string;
  exact: boolean;
}> = (props: any) => {
  const { isLogged } = props;

  console.log("isLogged", isLogged);

  return isLogged ? (
    <Route path={props.path} exact={props.exact} component={props.component} />
  ) : (
    <Redirect to="/login" />
  );
};

const mapStateToProps = createStructuredSelector({
  isLogged: selectIsLogged,
});

export default connect(mapStateToProps, null)(PrivateRoute);
