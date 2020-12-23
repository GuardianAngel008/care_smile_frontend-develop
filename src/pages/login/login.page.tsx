import React from "react";
import "./login.styles.scss";

import { useHistory } from "react-router-dom";

import { connect } from "react-redux";
import { Dispatch } from "redux";
import {
  setUserLoggedInStatus,
  setUserData,
} from "../../redux/user/user.actions";

import { loginService } from "../../services/loginServices";

import { textResources } from "../../constants/constants-data";

import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Typography,
  Image,
  message,
} from "antd";
import {
  UserOutlined,
  LockOutlined,
  LoginOutlined,
  CheckSquareOutlined,
} from "@ant-design/icons";

import mainImage from "../../assets/images/MainImage.svg";
import logoImage from "../../assets/images/CareLogo.svg";
import { User } from "../../models";

const LoginPage: React.FC = (props: any) => {
  const { setUserLoggedInStatus, setUserData } = props;
  const { Title, Text } = Typography;

  const history = useHistory();

  const onFinish = async (values: { username: string; password: string }) => {
    try {
      const dataToSend = {
        username: values.username,
        password: values.password,
      };

      console.log(dataToSend);

      const loginResponse = await loginService(dataToSend);

      //TODO: autologout to be setup
      if (loginResponse.status == 200) {
        console.log(loginResponse.data);
        setUserData(loginResponse.data);
        setUserLoggedInStatus(true);
        history.replace("/home");
      } else {
        message.error("Login Failed.");
      }
    } catch (error) {
      message.error("Login Failed.");
      console.log("Error caught :", error);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const register = () => {
    console.log("registering");
    history.replace("/register");
  };

  const forgotPassword = () => {
    history.replace("/forgotPassword");
  };

  return (
    <div>
      {/* https://github.com/ant-design/ant-design/issues/4926#issuecomment-493617463 */}
      <Row className="minh-100vh">
        <Col xs={24} md={12} lg={16}>
          <div className="space-align-container background-color-primary">
            <div className="register-area">
              <Image src={mainImage} />
              <Title className="text-uppercase" level={2}>
                {textResources.welcomeText}
              </Title>
              <Text>{textResources.welcomeDescription}</Text>
              <br />
              <Button
                className="custom-outline-button"
                icon={<CheckSquareOutlined />}
                size={"large"}
                htmlType="submit"
                onClick={register}
              >
                {textResources.registerButtonName}
              </Button>
            </div>
          </div>
        </Col>
        <Col xs={24} md={12} lg={8}>
          <div className="space-align-container">
            <div style={{ textAlign: "center" }}>
              <Image width={"80%"} src={logoImage} />
            </div>
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{ remember: true }}
              size="large"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                name="username"
                className="custom-form-item"
                rules={[
                  {
                    required: true,
                    message: textResources.emptyUsernameMessage,
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder={textResources.usernameFieldPlaceholder}
                />
              </Form.Item>
              <Form.Item
                name="password"
                className="custom-form-item"
                rules={[
                  {
                    required: true,
                    message: textResources.emptyPasswordMessage,
                  },
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder={textResources.passwordFieldPlaceholder}
                />
              </Form.Item>

              <Form.Item>
                <Button
                  className="custom-button text-uppercase"
                  type="primary"
                  icon={<LoginOutlined />}
                  size={"large"}
                  block
                  htmlType="submit"
                >
                  {textResources.loginButtonName}
                </Button>
              </Form.Item>

              <Form.Item className="text-align-center">
                <a className="custom-link" onClick={forgotPassword}>
                  {textResources.forgotPasswordLinkName}
                </a>
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    setUserLoggedInStatus: (status: boolean) =>
      dispatch(setUserLoggedInStatus(status)),
    setUserData: (userData: User) => dispatch(setUserData(userData)),
  };
};

export default connect(null, mapDispatchToProps)(LoginPage);
