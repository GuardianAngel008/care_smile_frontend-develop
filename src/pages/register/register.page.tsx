import React, { useState, useEffect } from "react";
import "./register.styles.scss";
import { Row, Col, message, Button, Radio } from "antd";

import { useHistory } from "react-router-dom";

import RegistrationProgress from "../../components/register-progress/register-progress.component";
import {
  InformationForm,
  BillingForm,
  DeliveryForm,
  ConfirmationForm,
  UploadImageForm,
  InformationFormProfessional,
  BillingFormProfessional,
  DeliveryFormProfessional,
  ConfirmationFormProfessional,
  UploadImageFormProfessional,
} from "../../components/register-form/register-form.component";
import { clientRegisterUser } from "../../services/registrationService";

const RegisterPage: React.FC = (props: any) => {
  interface UserType {
    id: number;
    title: string;
  }

  //#region  hardcoded data

  const userTypes: Array<UserType> = [
    { id: 0, title: "Client" },
    { id: 1, title: "Professional" },
  ];

  const steps = [
    {
      id: 0,
      title: "Information",
    },
    {
      id: 1,
      title: "Billing Address",
    },
    {
      id: 2,
      title: "Service Delivery Address",
    },
    {
      id: 3,
      title: "Upload Image",
    },
    {
      id: 4,
      title: "Confirmation",
    },
  ];

  //#endregion

  //#region Hooks

  const [registrationData, setRegistrationData] = useState({});
  const [currentProgressIndex, setcurrentProgressIndex] = useState(0);
  const [userType, setUserType] = useState<UserType | undefined>(undefined);

  const history = useHistory();

  // this useEffect is specifically for the registration submission.
  // Use another useEffect for different purposes.
  useEffect(() => {
    if (currentProgressIndex === 4) {
      confirmRegistration();
    }
  }, [registrationData]);

  //#endregion

  //#region General_functions

  const goToNextStep = () => {
    setcurrentProgressIndex(currentProgressIndex + 1);
  };

  const goToPreviousStep = () => {
    setcurrentProgressIndex(currentProgressIndex - 1);
  };

  const confirmRegistration = async () => {
    try {
      console.log("Registration confirmed", registrationData);
      const regUser = await clientRegisterUser(registrationData);
      if (regUser && regUser.status === 200) {
        console.log("registered ", regUser);
        history.replace("/thankyou");
      } else {
        message.error("Registration failed, please retry !");
      }
    } catch (error) {
      console.log("Error caught in registering: ", error);
    }
  };

  const saveRegistrationData = (values: any) => {
    setRegistrationData((prevState) => ({
      ...prevState,
      ...values,
    }));
  };

  //#endregion

  return (
    <div className="register-container">
      {/* ROW 1: HEADER */}
      <Row>
        <Col xs={24} md={24} lg={24}>
          <div className="title">
            {userType
              ? "Client Registration - Information"
              : "Please Select Your Role"}
          </div>
        </Col>
      </Row>

      {/* ROW 2 : Progress || Select User Type */}
      {userType ? (
        <Row justify="center">
          <Col xs={20} md={20} lg={20}>
            <div className="progress-container">
              <RegistrationProgress
                currentStepIndex={currentProgressIndex}
                steps={steps}
              />
            </div>
          </Col>
        </Row>
      ) : (
          <Row justify="center">
            <Col xs={24} md={24} lg={24}>
              <div className="progress-container">
                {userTypes &&
                  userTypes.map((item) => (
                    <Button
                      key={item.id}
                      className="progress-button type-button"
                      onClick={() =>
                        setUserType({ id: item.id, title: item.title })
                      }
                    >
                      {item.title}
                    </Button>
                  ))}
              </div>
            </Col>
          </Row>
        )}

      {/* ROW 3: Forms  */}

      {userType?.id === 0 && (
        <>
          <InformationForm
            isVisible={currentProgressIndex === 0}
            currentProgressIndex={currentProgressIndex}
            goToPreviousStep={goToPreviousStep}
            steps={steps}
            goToNextStep={goToNextStep}
            saveRegistrationData={saveRegistrationData}
            setRegData={setRegistrationData}
          />

          <BillingForm
            isVisible={currentProgressIndex === 1}
            currentProgressIndex={currentProgressIndex}
            goToPreviousStep={goToPreviousStep}
            steps={steps}
            goToNextStep={goToNextStep}
            saveRegistrationData={saveRegistrationData}
          />

          <DeliveryForm
            isVisible={currentProgressIndex === 2}
            currentProgressIndex={currentProgressIndex}
            goToPreviousStep={goToPreviousStep}
            steps={steps}
            goToNextStep={goToNextStep}
            saveRegistrationData={saveRegistrationData}
          />

          <UploadImageForm
            isVisible={currentProgressIndex === 3}
            currentProgressIndex={currentProgressIndex}
            goToPreviousStep={goToPreviousStep}
            steps={steps}
            goToNextStep={goToNextStep}
            saveRegistrationData={saveRegistrationData}
          />

          <ConfirmationForm
            isVisible={currentProgressIndex === 4}
            currentProgressIndex={currentProgressIndex}
            goToPreviousStep={goToPreviousStep}
            steps={steps}
            goToNextStep={goToNextStep}
            saveRegistrationData={saveRegistrationData}
          />
        </>
      )}

      {userType?.id === 1 && (
        <>
          <InformationFormProfessional
            isVisible={currentProgressIndex === 0}
            currentProgressIndex={currentProgressIndex}
            goToPreviousStep={goToPreviousStep}
            steps={steps}
            goToNextStep={goToNextStep}
            saveRegistrationData={saveRegistrationData}
          />

          <BillingFormProfessional
            isVisible={currentProgressIndex === 1}
            currentProgressIndex={currentProgressIndex}
            goToPreviousStep={goToPreviousStep}
            steps={steps}
            goToNextStep={goToNextStep}
            saveRegistrationData={saveRegistrationData}
          />

          <DeliveryFormProfessional
            isVisible={currentProgressIndex === 2}
            currentProgressIndex={currentProgressIndex}
            goToPreviousStep={goToPreviousStep}
            steps={steps}
            goToNextStep={goToNextStep}
            saveRegistrationData={saveRegistrationData}
          />

          <UploadImageFormProfessional
            isVisible={currentProgressIndex === 3}
            currentProgressIndex={currentProgressIndex}
            goToPreviousStep={goToPreviousStep}
            steps={steps}
            goToNextStep={goToNextStep}
            saveRegistrationData={saveRegistrationData}
          />

          <ConfirmationFormProfessional
            isVisible={currentProgressIndex === 4}
            currentProgressIndex={currentProgressIndex}
            goToPreviousStep={goToPreviousStep}
            steps={steps}
            goToNextStep={goToNextStep}
            saveRegistrationData={saveRegistrationData}
          />
        </>
      )}
    </div>
  );
};

export default RegisterPage;
