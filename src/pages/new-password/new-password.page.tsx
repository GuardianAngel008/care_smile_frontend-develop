import React from "react";

import { textResources } from "../../constants/constants-data";
import "./new-password.styles.scss";
import { useParams } from "react-router";
import { Button, Col, Form, Input, Row, Image } from "antd";
import { LockOutlined } from "@ant-design/icons";
import newpassImage from "../../assets/images/Newpass_Image.svg";

const NewpasswordPage: React.FC = (props: any) => {
  const { token }: { token: string } = useParams();

  console.log("token :", token);

  return (
    <div className="newpass-container">
      <Row className="minh-100vh">
        <Col xs={24} md={12} lg={14} style={{ alignSelf: "center" }}>
          <div className="newpass-image">
            <Image src={newpassImage} />
          </div>
        </Col>
        <Col xs={24} md={12} lg={10}>
          <div className="space-align-container-newpass">
            <div style={{ lineHeight: "initial" }}>
              <div className="title">{textResources.newPasswordTitle1}</div>
              <div className="title">{textResources.newPasswordTitle2}</div>
            </div>
            <p className="text-description">
              {textResources.newPasswordDescription}
            </p>
            <Form
              className="form-group"
              name="forgot-password"
              initialValues={{ remember: true }}
              size="large"
            >
              <Form.Item
                name="newpassword"
                className="custom-form-item"
                rules={[
                  {
                    required: true,
                    message: textResources.shortPasswordMessage,
                  },
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder={textResources.newPasswordPlaceholder}
                  style={{ fontSize: "18px" }}
                />
              </Form.Item>
              <Form.Item
                name="confirmpassword"
                className="custom-form-item"
                rules={[
                  {
                    required: true,
                    message: textResources.shortPasswordMessage,
                  },
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder={textResources.confirmPasswordPlaceholder}
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
                  {textResources.doneButtonName}
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

export default NewpasswordPage;
