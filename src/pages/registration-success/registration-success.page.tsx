import React from "react";
import "./registration-success.styles.scss";
import ThanksImage from "../../assets/images/Thanks_image.svg";
import { textResources } from "../../constants/constants-data";

import { Button } from "antd";
import { CheckCircleFilled } from "@ant-design/icons";
import { useHistory } from "react-router-dom";

const RegistrationSuccess = () => {
  const history = useHistory();
  return (
    <div className="reg-success-page">
      <div className="reg-success-container">
        <div className="image-container">
          <img style={{ width: "100%" }} src={ThanksImage} alt="Thank You" />
        </div>
        <div className="thanks-text">
          <CheckCircleFilled />
          <div className="text">{textResources.completedRegistration}</div>
        </div>
        <div className="btn-container">
          <Button
            className="custom-button"
            type="primary"
            size={"large"}
            block
            onClick={(e) => history.replace("/login")}
          >
            {textResources.gotoLoginButtonName}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RegistrationSuccess;
