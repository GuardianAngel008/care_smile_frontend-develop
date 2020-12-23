import { Button, Col, Form, Input, Row, Image, message } from "antd";
import React from "react";

import { textResources } from "../../constants/constants-data";
import forgotImage from "../../assets/images/Forgot_image.svg";
import "./forgot-password.styles.scss";
import { resetPassword } from "../../services/registrationService";

const ForgotPasswordPage: React.FC = (props: any) => {
  const forgotFormFinish = async (values: {
    username: string;
    mobilenum: string;
  }) => {
    console.log("forgot form ", values);
    try {
      const datatoSend = {
        emailId: values.username,
        mobileNumber: values.mobilenum,
      };

      const resetPasswordResponse = await resetPassword(datatoSend);
      if (resetPasswordResponse.status == 200) {
        message.success("Reser");
      }
    } catch (err: any) {
      console.log("API Failed: ", err);
    }
  };

  const forgotFormFailed = (err: any) => {
    console.log("Failed: ", err);
  };

  return (
    <div className="forgot-container">
      <Row className="minh-100vh">
        <Col xs={24} md={12} lg={14} style={{ alignSelf: "center" }}>
          <div className="forgot-image">
            <Image src={forgotImage} />
          </div>
        </Col>
        <Col xs={24} md={12} lg={10}>
          <div className="space-align-container-forgot">
            <div style={{ lineHeight: "initial" }}>
              <div className="title">{textResources.forgotPasswordTitle1}</div>
              <div className="title">{textResources.forgotPasswordTitle2}</div>
            </div>
            <p className="text-description">
              {textResources.forgotPasswordDescription}
            </p>
            <Form
              className="form-group"
              name="forgot-password"
              initialValues={{ remember: true }}
              size="large"
              onFinish={forgotFormFinish}
              onFinishFailed={forgotFormFailed}
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
                  placeholder={textResources.emailIdPlaceholder}
                  style={{ fontSize: "18px" }}
                />
              </Form.Item>
              <Form.Item
                name="mobilenum"
                className="custom-form-item"
                rules={[
                  {
                    required: true,
                    message: textResources.emptyMobileNumMessage,
                  },
                ]}
              >
                <Input
                  placeholder={textResources.mobileNumPlacerholder}
                  style={{ fontSize: "18px" }}
                />
              </Form.Item>
              <Form.Item style={{ marginBottom: "10px" }}>
                <Button
                  className="custom-button"
                  type="primary"
                  size={"large"}
                  block
                  htmlType="submit"
                  style={{ fontSize: "18px" }}
                >
                  {textResources.sendButtonName}
                </Button>
              </Form.Item>
              <p className="text-description custom-trytext">
                Try another way?
              </p>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ForgotPasswordPage;
