import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import PrivateRoute from "./components/private-route/private-route.component";
import LandingLayout from "./layout/LandingLayout";
import LoginPage from "./pages/login/login.page";
import RegisterPage from "./pages/register/register.page";
import ForgotPasswordPage from "./pages/forgot-password/forgot-password.page";
import NewPasswordPage from "./pages/new-password/new-password.page";
import ThankYou from "./pages/registration-success/registration-success.page";

// https://create-react-app.dev/docs/adding-a-sass-stylesheet/
// https://stackoverflow.com/questions/64625050/error-node-sass-version-5-0-0-is-incompatible-with-4-0-0/64626556#64626556
import "./App.scss";
import "./services/axiosInterceptor";
import { Row, Col } from "antd";

const App: React.FC = () => {
  return (
    <Row>
      <Col xs={24} md={24} lg={24}>
        <Switch>
          <Route path="/login" component={LoginPage} exact />
          <Route path="/register" component={RegisterPage} exact />
          <Route path="/forgotPassword" exact component={ForgotPasswordPage} />
          <Route path="/thankyou" component={ThankYou} exact />
          <Route path="/newPassword/:token" component={NewPasswordPage} exact />
          <PrivateRoute path="/home" component={LandingLayout} exact={false} />
          <Redirect exact path="/" to="/home" />
        </Switch>
      </Col>
    </Row>
  );
};
export default App;
