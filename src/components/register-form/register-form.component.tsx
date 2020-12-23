import React, { useEffect, useState } from "react";
import "./register-form.styles.scss";

import CustomInputField from "../../components/custom-input-field/custom-input-field.component";
import CustomCheckbox from "../../components/custom-checkbox/custom-checkbox.component";
import CustomSelect from "../../components/custom-select/custom-select.component";

import { ReactComponent as WhatsappIcon } from "../../assets/icons/whatsapp.svg";
import { ReactComponent as EmailIcon } from "../../assets/icons/mail.svg";
import { ReactComponent as PhoneIcon } from "../../assets/icons/phone.svg";

import { Row, Button, Form, DatePicker, Upload, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import {
  getclientRegtypes,
  getprofRegtypes,
} from "../../services/registrationService";

interface RegistrationFormProps {
  currentProgressIndex: number;
  goToPreviousStep: () => void;
  goToNextStep: () => void;
  steps: Array<{ id: number; title: string }>;
  saveRegistrationData: (values: any) => void;
  setRegData?: any;
  isVisible: boolean;
}

//#region GENERAL_USE_FUNCTIONS

//TODO: Make a util function (Optimization required !)

function getBase64(img: any, callback: any) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file: any) {
  console.log("before upload: ", file);
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
}

//#endregion

//#region CLIENT_FORM

export const InformationForm: React.FC<RegistrationFormProps> = (
  props: RegistrationFormProps
) => {
  const {
    currentProgressIndex,
    goToPreviousStep,
    goToNextStep,
    steps,
    saveRegistrationData,
    setRegData,
    isVisible,
  } = props;

  const [typeOptions, setTypeOptions] = useState([]);
  //#region hardcoded data
  // const typeOptions = [
  //   { id: 1, name: "Individual" },
  //   { id: 2, name: "Care Home" },
  //   { id: 3, name: "Hospital" },
  // ];
  const genderOptions = [
    { id: "M", name: "Male" },
    { id: "F", name: "Female" },
    { id: "U", name: "Transgender" },
    { id: "O", name: "Others" },
  ];
  //#endregion

  useEffect(() => {
    const fetchTypeData = async () => {
      console.log("fetching");
      const clientTypeData = await getclientRegtypes();
      console.log("cleintdata ", clientTypeData);
      setTypeOptions(clientTypeData.data);
    };
    fetchTypeData();
  }, []);

  const [form] = Form.useForm();
  const [clientType, setClientType] = useState(1);

  const onSelected = (label: string, value: string) => {
    console.log(value);
    form.setFieldsValue({ [label]: value });
  };

  //To delete keys from an array
  const deleteKey = (keys: Array<string>, obj: any) => {
    keys.map((key) => delete obj[key]);
  };

  const onFinishInformation = (values: any) => {
    console.log("Success:", values);
    const updatedValues = {
      ...values,
      dob: values.dob && values.dob.format("YYYY-MM-DD"),
    };
    setRegData({});
    clientType !== 1 &&
      deleteKey(
        [
          "dob",
          "emergencyContactPerson",
          "emergencyContactEmail",
          "lastName",
          "gender",
        ],
        updatedValues
      );
    saveRegistrationData(updatedValues);
    goToNextStep();
  };

  const onFinishFailedInformation = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      className={`${isVisible ? "visible-registration-form" : "hidden-registration-form"
        }`}
      name={`registration-form-step-${currentProgressIndex}`}
      form={form}
      initialValues={{ remember: true }}
      onFinish={onFinishInformation}
      onFinishFailed={onFinishFailedInformation}
    >
      <Row justify="center">
        <div className="inputs">
          <>
            {/* TYPE */}
            <Form.Item
              name="clientTypeId"
              rules={[
                {
                  required: true,
                  message: "Please select the type of user!",
                },
              ]}
            >
              <CustomSelect
                options={typeOptions}
                placeholder="Type"
                onChange={(value) => {
                  onSelected("type", value);
                  setClientType(value);
                }}
                returnId
              />
            </Form.Item>
            {/* FIRST NAME */}
            <Form.Item
              name="firstName"
              rules={[
                { required: true, message: "Please input your first name!" },
              ]}
            >
              <CustomInputField
                type="text"
                placeholder={
                  clientType === 1
                    ? "First Name"
                    : clientType === 2
                      ? "Care Home Name"
                      : "Hospital Name"
                }
              />
            </Form.Item>
            {/* LAST NAME */}
            {clientType === 1 && (
              <Form.Item
                name="lastName"
              // rules={[
              //   { required: true, message: "Please input your last name!" },
              // ]}
              >
                <CustomInputField type="text" placeholder="Last Name" />
              </Form.Item>
            )}
            {/* GENDER */}
            {clientType === 1 && (
              <Form.Item
                name="gender"
              // rules={[
              //   { required: true, message: "Please select your gender!" },
              // ]}
              >
                <CustomSelect
                  options={genderOptions}
                  placeholder="Gender"
                  returnId
                  onChange={(value) => onSelected("gender", value)}
                />
              </Form.Item>
            )}
            {/* DOB */}
            {clientType === 1 && (
              <Form.Item
                name="dob"
              // rules={[
              //   { required: true, message: "Please enter your dob!" },
              // ]}
              >
                <DatePicker className="custom-datepicker" placeholder="DOB" />
                {/* <CustomInputField type="dob" placeholder="DOB" /> */}
              </Form.Item>
            )}
            {/* Email ID */}
            <Form.Item
              name="emailId"
              rules={[
                { required: true, message: "Please enter your e-mail id!" },
              ]}
            >
              <CustomInputField type="email" placeholder="E-mail" />
            </Form.Item>

            {/* Contact Number */}
            <Form.Item
              name="contactNumber"
            // rules={[
            //   {
            //     message: "Please input your contact number!",
            //   },
            // ]}
            >
              <CustomInputField type="tel" placeholder="Contact Number" />
            </Form.Item>

            {/* Mobile Number */}
            <Form.Item
              name="mobileNumber"
              rules={[
                {
                  required: true,
                  message: "Please input your mobile number!",
                },
              ]}
            >
              <CustomInputField type="tel" placeholder="Mobile Number" />
            </Form.Item>
            {/* Emergenct Contact Name */}
            {clientType === 1 && (
              <Form.Item
                name="emergencyContactPerson"
                rules={[
                  {
                    required: true,
                    message: "Please enter your Emergency contact name!",
                  },
                ]}
              >
                <CustomInputField
                  type="text"
                  placeholder="Emergency contact person"
                />
              </Form.Item>
            )}
            {/* Emergency Contact Number */}
            {clientType === 1 && (
              <Form.Item
                name="emergencyContactEmail"
                rules={[
                  {
                    required: true,
                    message: "Please enter your Emergency contact E-mail Id",
                  },
                ]}
              >
                <CustomInputField
                  type="text"
                  placeholder="Emergency contact E-mail Id"
                />
              </Form.Item>
            )}
          </>
        </div>
      </Row>

      <Row justify="space-between">
        {currentProgressIndex > 0 && (
          <Button
            className="progress-button keep-left"
            onClick={() => goToPreviousStep()}
          >
            PREVIOUS
          </Button>
        )}

        <Button
          type="primary"
          htmlType="submit"
          className="progress-button keep-right"
        >
          {currentProgressIndex === steps.length - 1 ? "SUBMIT" : "NEXT"}
        </Button>
      </Row>
    </Form>
  );
};
export const BillingForm: React.FC<RegistrationFormProps> = (
  props: RegistrationFormProps
) => {
  const {
    currentProgressIndex,
    goToPreviousStep,
    goToNextStep,
    steps,
    saveRegistrationData,
    isVisible,
  } = props;

  const [form] = Form.useForm();

  const onFinishAddress1 = (values: any) => {
    console.log("Success:", values);
    const updatedValues = {
      billingAddress: `${values.address},${values.address2 && values.address2 + ","
        } ${values.apartment && values.apartment + ","} ${values.city}, ${values.state
        }, ${values.country}`,
      billingPostcode: values.billingPostcode,
    };
    saveRegistrationData(updatedValues);
    goToNextStep();
  };

  const onFinishFailedAddress1 = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      className={`${isVisible ? "visible-registration-form" : "hidden-registration-form"
        }`}
      name={`registration-form-step-${currentProgressIndex}`}
      form={form}
      initialValues={{ remember: true }}
      onFinish={onFinishAddress1}
      onFinishFailed={onFinishFailedAddress1}
    >
      <Row justify="center">
        <div className="inputs">
          <>
            <Form.Item
              name="address"
              rules={[
                { required: true, message: "Please enter your address!" },
              ]}
            >
              <CustomInputField type="text" placeholder="Address Line 1" />
            </Form.Item>
            <Form.Item
              name="address2"
            // rules={[
            //   { required: true, message: "Please enter your address!" },
            // ]}
            >
              <CustomInputField type="text" placeholder="Address Line 2" />
            </Form.Item>
            <Form.Item
              name="apartment"
            // rules={[{ required: true, message: "Please enter apartment!" }]}
            >
              <CustomInputField
                type="text"
                placeholder="Apartment,Suite etc."
              />
            </Form.Item>
            <Form.Item
              name="city"
              rules={[{ required: true, message: "Please enter your city!" }]}
            >
              <CustomInputField type="text" placeholder="City" />
            </Form.Item>
            <Form.Item
              name="state"
              rules={[{ required: true, message: "Please enter your state!" }]}
            >
              <CustomInputField type="text" placeholder="Province or State" />
            </Form.Item>
            <Form.Item
              name="country"
              rules={[
                { required: true, message: "Please enter your country!" },
              ]}
            >
              <CustomInputField type="text" placeholder="Country or Region" />
            </Form.Item>
            <Form.Item
              name="billingPostcode"
              rules={[
                { required: true, message: "Please enter your Postal Code!" },
              ]}
            >
              <CustomInputField type="text" placeholder="Postal Code" />
            </Form.Item>
          </>
        </div>
      </Row>

      <Row justify="space-between">
        {currentProgressIndex > 0 && (
          <Button
            className="progress-button keep-left"
            onClick={() => goToPreviousStep()}
          >
            PREVIOUS
          </Button>
        )}

        <Button
          type="primary"
          htmlType="submit"
          className="progress-button keep-right"
        >
          {currentProgressIndex === steps.length - 1 ? "SUBMIT" : "NEXT"}
        </Button>
      </Row>
    </Form>
  );
};
export const DeliveryForm: React.FC<RegistrationFormProps> = (
  props: RegistrationFormProps
) => {
  const {
    currentProgressIndex,
    goToPreviousStep,
    goToNextStep,
    steps,
    saveRegistrationData,
    isVisible,
  } = props;

  const [form] = Form.useForm();

  const onFinishAddress2 = (values: any) => {
    console.log("Success:", values);
    const updatedValues = {
      serviceDeliveryAddress: `${values.deliveryAddress},${values.deliveryAddress2 && values.deliveryAddress2 + ","
        } ${values.deliveryApartment && values.deliveryApartment + ","} ${values.deliveryCity
        }, ${values.deliveryState}, ${values.deliveryCountry}`,
      serviceDeliveryPostcode: values.serviceDeliveryPostcode,
    };
    saveRegistrationData(updatedValues);
    goToNextStep();
  };

  const onFinishFailedAddress2 = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      className={`${isVisible ? "visible-registration-form" : "hidden-registration-form"
        }`}
      name={`registration-form-step-${currentProgressIndex}`}
      form={form}
      initialValues={{ remember: true }}
      onFinish={onFinishAddress2}
      onFinishFailed={onFinishFailedAddress2}
    >
      <Row justify="center">
        <div className="inputs">
          <>
            <Form.Item
              name="deliveryAddress"
              rules={[
                { required: true, message: "Please enter your address!" },
              ]}
            >
              <CustomInputField type="text" placeholder="Address Line 1" />
            </Form.Item>
            <Form.Item
              name="deliveryAddress2"
            // rules={[
            //   { required: true, message: "Please enter your address!" },
            // ]}
            >
              <CustomInputField type="text" placeholder="Address Line 2" />
            </Form.Item>
            <Form.Item
              name="deliveryApartment"
            // rules={[{ required: true, message: "Please enter apartment!" }]}
            >
              <CustomInputField
                type="text"
                placeholder="Apartment,Suite etc."
              />
            </Form.Item>
            <Form.Item
              name="deliveryCity"
              rules={[{ required: true, message: "Please enter your city!" }]}
            >
              <CustomInputField type="text" placeholder="City" />
            </Form.Item>
            <Form.Item
              name="deliveryState"
              rules={[{ required: true, message: "Please enter your state!" }]}
            >
              <CustomInputField type="text" placeholder="Province or State" />
            </Form.Item>
            <Form.Item
              name="deliveryCountry"
              rules={[
                { required: true, message: "Please enter your country!" },
              ]}
            >
              <CustomInputField type="text" placeholder="Country or Region" />
            </Form.Item>
            <Form.Item
              name="serviceDeliveryPostcode"
              rules={[
                { required: true, message: "Please enter your Postal Code!" },
              ]}
            >
              <CustomInputField type="text" placeholder="Postal Code" />
            </Form.Item>
          </>
        </div>
      </Row>

      <Row justify="space-between">
        {currentProgressIndex > 0 && (
          <Button
            className="progress-button keep-left"
            onClick={() => goToPreviousStep()}
          >
            PREVIOUS
          </Button>
        )}

        <Button
          type="primary"
          htmlType="submit"
          className="progress-button keep-right"
        >
          {currentProgressIndex === steps.length - 1 ? "SUBMIT" : "NEXT"}
        </Button>
      </Row>
    </Form>
  );
};

export const UploadImageForm: React.FC<RegistrationFormProps> = (
  props: RegistrationFormProps
) => {
  const {
    currentProgressIndex,
    goToPreviousStep,
    steps,
    goToNextStep,
    saveRegistrationData,
    isVisible,
  } = props;

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const onFinishUpload = (values: any) => {
    console.log("Success:", values);
    const updatedValues = {
      pictureData: imageUrl.split(",")[1],
      // pictureData: imageUrl,
    };
    saveRegistrationData(updatedValues);
    goToNextStep();
  };

  const onFinishFailedUpload = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>{loading ? "Upload" : "Uploading"}</div>
    </div>
  );

  const handleChange = (info: any) => {
    console.log("INFO: ", info);
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl: any) => {
        console.log("UUUURRRRLLLL: ", imageUrl.split(",")[1]);
        //   this.setState({
        //   imageUrl,
        //   loading: false,
        // })
        setImageUrl(imageUrl);
        setLoading(false);
      });
    }
  };

  return (
    <Form
      className={`${isVisible ? "visible-registration-form" : "hidden-registration-form"
        }`}
      name={`registration-form-step-${currentProgressIndex}`}
      form={form}
      initialValues={{ remember: true }}
      onFinish={onFinishUpload}
      onFinishFailed={onFinishFailedUpload}
    >
      <Row justify="center">
        <div className="upload-image">
          <>
            <Form.Item name="pictureData">
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                beforeUpload={beforeUpload}
                onChange={handleChange}
              >
                {imageUrl ? (
                  <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
                ) : (
                    uploadButton
                  )}
              </Upload>
            </Form.Item>
          </>
        </div>
      </Row>

      <Row justify="space-between">
        {currentProgressIndex > 0 && (
          <Button
            className="progress-button keep-left"
            onClick={() => goToPreviousStep()}
          >
            PREVIOUS
          </Button>
        )}

        <Button
          type="primary"
          htmlType="submit"
          className="progress-button keep-right"
        >
          {currentProgressIndex === steps.length - 1 ? "SUBMIT" : "NEXT"}
        </Button>
      </Row>
    </Form>
  );
};

export const ConfirmationForm: React.FC<RegistrationFormProps> = (
  props: RegistrationFormProps
) => {
  const {
    currentProgressIndex,
    goToPreviousStep,
    steps,
    saveRegistrationData,
    isVisible,
  } = props;

  const [form] = Form.useForm();

  const onFinishConfirmation = (values: any) => {
    const updatedData = {
      email: ~~values.email,
      phoneCall: ~~values.phoneCall,
      sms: ~~values.sms,
      whatsapp: ~~values.whatsapp,
    };
    console.log("Success:", updatedData);
    saveRegistrationData(updatedData);
  };

  const onFinishFailedConfirmation = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      className={`${isVisible ? "visible-registration-form" : "hidden-registration-form"
        }`}
      name={`registration-form-step-${currentProgressIndex}`}
      form={form}
      initialValues={{ remember: true }}
      onFinish={onFinishConfirmation}
      onFinishFailed={onFinishFailedConfirmation}
    >
      <div className="consent-text">
        <div>Hi there, a quick question for you:</div>
        <div>Provide your consent to contact you over</div>
      </div>
      <Row justify="center">
        <div className="inputs">
          <>
            <Form.Item name="whatsapp" valuePropName="checked">
              <CustomCheckbox icon={<WhatsappIcon />} name="Whatsapp" />
            </Form.Item>
            <Form.Item name="email" valuePropName="checked">
              <CustomCheckbox icon={<EmailIcon />} name="Email" />
            </Form.Item>
            <Form.Item name="phoneCall" valuePropName="checked">
              <CustomCheckbox icon={<PhoneIcon />} name="Phone" />
            </Form.Item>
            <Form.Item name="sms" valuePropName="checked">
              <CustomCheckbox icon={<PhoneIcon />} name="SMS" />
            </Form.Item>
          </>
        </div>
      </Row>

      <Row justify="space-between">
        {currentProgressIndex > 0 && (
          <Button
            className="progress-button keep-left"
            onClick={() => goToPreviousStep()}
          >
            PREVIOUS
          </Button>
        )}

        <Button
          type="primary"
          htmlType="submit"
          className="progress-button keep-right"
        >
          {currentProgressIndex === steps.length - 1 ? "SUBMIT" : "NEXT"}
        </Button>
      </Row>
    </Form>
  );
};

//#endregion

//#region PROFESSIONAL_FORM

export const InformationFormProfessional: React.FC<RegistrationFormProps> = (
  props: RegistrationFormProps
) => {
  const {
    currentProgressIndex,
    goToPreviousStep,
    goToNextStep,
    steps,
    saveRegistrationData,
    isVisible,
  } = props;

  const [typeOptions, setTypeOptions] = useState([]);

  //TODO: get this options from Api
  //#region hardcoded data
  // const typeOptions = [
  //   { id: 1, name: "Doctor" },
  //   { id: 2, name: "Nurse" },
  //   { id: 3, name: "Midwife" },
  // ];
  const genderOptions = [
    { id: "M", name: "Male" },
    { id: "F", name: "Female" },
    { id: "U", name: "Transgender" },
    { id: "O", name: "Others" },
  ];
  //#endregion

  useEffect(() => {
    const fetchTypeData = async () => {
      console.log("fetching");
      const profTypeData = await getprofRegtypes();
      console.log("cleintdata ", profTypeData);
      setTypeOptions(profTypeData.data);
    };
    fetchTypeData();
  }, []);

  const [form] = Form.useForm();

  const onSelected = (label: string, value: string) => {
    console.log(value);
    form.setFieldsValue({ [label]: value });
    // console.log("GOT FROM FORM: ",form.getFieldValue(label))
  };

  const onFinishInformation = (values: any) => {
    console.log("Success:", values);
    const updatedValues = {
      ...values,
      dob: values.dob && values.dob.format("YYYY-MM-DD"),
    };
    saveRegistrationData(updatedValues);
    goToNextStep();
  };

  const onFinishFailedInformation = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      className={`${isVisible ? "visible-registration-form" : "hidden-registration-form"
        }`}
      name={`registration-form-step-${currentProgressIndex}`}
      form={form}
      initialValues={{ remember: true }}
      onFinish={onFinishInformation}
      onFinishFailed={onFinishFailedInformation}
    >
      <Row justify="center">
        <div className="inputs">
          <>
            {/* TYPE */}
            <Form.Item
              name="clientTypeId"
              rules={[
                {
                  required: true,
                  message: "Please select the type of user!",
                },
              ]}
            >
              <CustomSelect
                options={typeOptions}
                placeholder="Type"
                onChange={(value) => onSelected("type", value)}
                returnId
              />
            </Form.Item>
            {/* FIRST NAME */}
            <Form.Item
              name="firstName"
              rules={[
                { required: true, message: "Please input your first name!" },
              ]}
            >
              <CustomInputField type="text" placeholder="First Name" />
            </Form.Item>
            {/* LAST NAME */}
            <Form.Item
              name="lastName"
            // rules={[
            //   { required: true, message: "Please input your last name!" },
            // ]}
            >
              <CustomInputField type="text" placeholder="Last Name" />
            </Form.Item>
            {/* GENDER */}
            <Form.Item
              name="gender"
            // rules={[
            //   { required: true, message: "Please select your gender!" },
            // ]}
            >
              <CustomSelect
                options={genderOptions}
                placeholder="Gender"
                returnId
                onChange={(value) => onSelected("gender", value)}
              />
            </Form.Item>
            {/* DOB */}
            <Form.Item
              name="dob"
            // rules={[
            //   { required: true, message: "Please enter your dob!" },
            // ]}
            >
              <DatePicker className="custom-datepicker" placeholder="DOB" />
              {/* <CustomInputField type="dob" placeholder="DOB" /> */}
            </Form.Item>
            {/* Email ID */}
            <Form.Item
              name="emailId"
              rules={[
                { required: true, message: "Please enter your e-mail id!" },
              ]}
            >
              <CustomInputField type="email" placeholder="E-mail" />
            </Form.Item>

            {/* Contact Number */}
            <Form.Item
              name="contactNumber"
            // rules={[
            //   {
            //     message: "Please input your contact number!",
            //   },
            // ]}
            >
              <CustomInputField type="tel" placeholder="Contact Number" />
            </Form.Item>

            {/* Mobile Number */}
            <Form.Item
              name="mobileNumber"
              rules={[
                {
                  required: true,
                  message: "Please input your mobile number!",
                },
              ]}
            >
              <CustomInputField type="tel" placeholder="Mobile Number" />
            </Form.Item>
            {/*Years of Experience */}
            <Form.Item name="experience">
              <CustomInputField
                type="number"
                placeholder="Years of Experience"
              />
            </Form.Item>
            {/*NMC Reg No. */}
            <Form.Item name="doc1Number">
              <CustomInputField type="text" placeholder="NMC Reg.No" />
            </Form.Item>
            {/*NMC Expiry data */}
            <Form.Item name="doc1ExpiryDate">
              <DatePicker
                className="custom-datepicker"
                placeholder="NMC Expiry Date"
              />
            </Form.Item>
            {/*Profile Summary */}
            <Form.Item name="profileSummary">
              <CustomInputField type="textarea" placeholder="Profile Summary" />
            </Form.Item>
          </>
        </div>
      </Row>

      <Row justify="space-between">
        {currentProgressIndex > 0 && (
          <Button
            className="progress-button keep-left"
            onClick={() => goToPreviousStep()}
          >
            PREVIOUS
          </Button>
        )}

        <Button
          type="primary"
          htmlType="submit"
          className="progress-button keep-right"
        >
          {currentProgressIndex === steps.length - 1 ? "SUBMIT" : "NEXT"}
        </Button>
      </Row>
    </Form>
  );
};
export const BillingFormProfessional: React.FC<RegistrationFormProps> = (
  props: RegistrationFormProps
) => {
  const {
    currentProgressIndex,
    goToPreviousStep,
    goToNextStep,
    steps,
    saveRegistrationData,
    isVisible,
  } = props;

  const [form] = Form.useForm();

  const onFinishAddress1 = (values: any) => {
    console.log("Success:", values);
    const updatedValues = {
      billingAddress: `${values.address},${values.address2 && values.address2 + ","
        } ${values.apartment && values.apartment + ","} ${values.city}, ${values.state
        }, ${values.country}`,
      billingPostcode: values.billingPostcode,
    };
    saveRegistrationData(updatedValues);
    goToNextStep();
  };

  const onFinishFailedAddress1 = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      className={`${isVisible ? "visible-registration-form" : "hidden-registration-form"
        }`}
      name={`registration-form-step-${currentProgressIndex}`}
      form={form}
      initialValues={{ remember: true }}
      onFinish={onFinishAddress1}
      onFinishFailed={onFinishFailedAddress1}
    >
      <Row justify="center">
        <div className="inputs">
          <>
            <Form.Item
              name="address"
              rules={[
                { required: true, message: "Please enter your address!" },
              ]}
            >
              <CustomInputField type="text" placeholder="Address Line 1" />
            </Form.Item>
            <Form.Item
              name="address2"
            // rules={[
            //   { required: true, message: "Please enter your address!" },
            // ]}
            >
              <CustomInputField type="text" placeholder="Address Line 2" />
            </Form.Item>
            <Form.Item
              name="apartment"
            // rules={[{ required: true, message: "Please enter apartment!" }]}
            >
              <CustomInputField
                type="text"
                placeholder="Apartment,Suite etc."
              />
            </Form.Item>
            <Form.Item
              name="city"
              rules={[{ required: true, message: "Please enter your city!" }]}
            >
              <CustomInputField type="text" placeholder="City" />
            </Form.Item>
            <Form.Item
              name="state"
              rules={[{ required: true, message: "Please enter your state!" }]}
            >
              <CustomInputField type="text" placeholder="Province or State" />
            </Form.Item>
            <Form.Item
              name="country"
              rules={[
                { required: true, message: "Please enter your country!" },
              ]}
            >
              <CustomInputField type="text" placeholder="Country or Region" />
            </Form.Item>
            <Form.Item
              name="billingPostcode"
              rules={[
                { required: true, message: "Please enter your zip code!" },
              ]}
            >
              <CustomInputField type="text" placeholder="Zip Code" />
            </Form.Item>
          </>
        </div>
      </Row>

      <Row justify="space-between">
        {currentProgressIndex > 0 && (
          <Button
            className="progress-button keep-left"
            onClick={() => goToPreviousStep()}
          >
            PREVIOUS
          </Button>
        )}

        <Button
          type="primary"
          htmlType="submit"
          className="progress-button keep-right"
        >
          {currentProgressIndex === steps.length - 1 ? "SUBMIT" : "NEXT"}
        </Button>
      </Row>
    </Form>
  );
};
export const DeliveryFormProfessional: React.FC<RegistrationFormProps> = (
  props: RegistrationFormProps
) => {
  const {
    currentProgressIndex,
    goToPreviousStep,
    goToNextStep,
    steps,
    saveRegistrationData,
    isVisible,
  } = props;

  const [form] = Form.useForm();

  const onFinishAddress2 = (values: any) => {
    console.log("Success:", values);
    const updatedValues = {
      serviceDeliveryAddress: `${values.deliveryAddress},${values.deliveryAddress2 && values.deliveryAddress2 + ","
        } ${values.deliveryApartment && values.deliveryApartment + ","} ${values.deliveryCity
        }, ${values.deliveryState}, ${values.deliveryCountry}`,
      serviceDeliveryPostcode: values.serviceDeliveryPostcode,
      emergencyContactPerson: values.emergencyContactPerson,
      emergencyContactEmail: values.emergencyContactEmail,
    };
    saveRegistrationData(updatedValues);
    goToNextStep();
  };

  const onFinishFailedAddress2 = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      className={`${isVisible ? "visible-registration-form" : "hidden-registration-form"
        }`}
      name={`registration-form-step-${currentProgressIndex}`}
      form={form}
      initialValues={{ remember: true }}
      onFinish={onFinishAddress2}
      onFinishFailed={onFinishFailedAddress2}
    >
      <Row justify="center">
        <div className="inputs">
          <>
            <Form.Item
              name="deliveryAddress"
              rules={[
                { required: true, message: "Please enter your address!" },
              ]}
            >
              <CustomInputField type="text" placeholder="Address Line 1" />
            </Form.Item>
            <Form.Item
              name="deliveryAddress2"
            // rules={[
            //   { required: true, message: "Please enter your address!" },
            // ]}
            >
              <CustomInputField type="text" placeholder="Address Line 2" />
            </Form.Item>
            <Form.Item
              name="deliveryApartment"
            // rules={[{ required: true, message: "Please enter apartment!" }]}
            >
              <CustomInputField
                type="text"
                placeholder="Apartment,Suite etc."
              />
            </Form.Item>
            <Form.Item
              name="deliveryCity"
              rules={[{ required: true, message: "Please enter your city!" }]}
            >
              <CustomInputField type="text" placeholder="City" />
            </Form.Item>
            <Form.Item
              name="deliveryState"
              rules={[{ required: true, message: "Please enter your state!" }]}
            >
              <CustomInputField type="text" placeholder="Province or State" />
            </Form.Item>
            <Form.Item
              name="deliveryCountry"
              rules={[
                { required: true, message: "Please enter your country!" },
              ]}
            >
              <CustomInputField type="text" placeholder="Country or Region" />
            </Form.Item>
            <Form.Item
              name="serviceDeliveryPostcode"
              rules={[
                { required: true, message: "Please enter your zip code!" },
              ]}
            >
              <CustomInputField type="text" placeholder="Zip Code" />
            </Form.Item>
            <Form.Item
              name="emergencyContactPerson"
              rules={[
                {
                  required: true,
                  message: "Please enter your Emergency contact name!",
                },
              ]}
            >
              <CustomInputField
                type="text"
                placeholder="Emergency contact person"
              />
            </Form.Item>
            <Form.Item
              name="emergencyContactEmail"
              rules={[
                {
                  required: true,
                  message: "Please enter your Emergency contact E-mail Id!",
                },
              ]}
            >
              <CustomInputField
                type="text"
                placeholder="Emeregency contact E-mail Id"
              />
            </Form.Item>
          </>
        </div>
      </Row>

      <Row justify="space-between">
        {currentProgressIndex > 0 && (
          <Button
            className="progress-button keep-left"
            onClick={() => goToPreviousStep()}
          >
            PREVIOUS
          </Button>
        )}

        <Button
          type="primary"
          htmlType="submit"
          className="progress-button keep-right"
        >
          {currentProgressIndex === steps.length - 1 ? "SUBMIT" : "NEXT"}
        </Button>
      </Row>
    </Form>
  );
};

export const UploadImageFormProfessional: React.FC<RegistrationFormProps> = (
  props: RegistrationFormProps
) => {
  const {
    currentProgressIndex,
    goToPreviousStep,
    steps,
    goToNextStep,
    saveRegistrationData,
    isVisible,
  } = props;

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const onFinishUpload = (values: any) => {
    console.log("Success:", values);
    const updatedValues = {
      pictureData: imageUrl.split(",")[1],
      // pictureData: imageUrl,
    };
    saveRegistrationData(updatedValues);
    goToNextStep();
  };

  const onFinishFailedUpload = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>
        {loading ? "Uploading" : "Upload Image"}
      </div>
    </div>
  );

  const uploadDocButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>
        {loading ? "Uploading" : "Upload Document"}
      </div>
    </div>
  );

  const handleChange = (info: any) => {
    console.log("INFO: ", info);
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl: any) => {
        console.log("UUUURRRRLLLL: ", imageUrl.split(",")[1]);
        //   this.setState({
        //   imageUrl,
        //   loading: false,
        // })
        setImageUrl(imageUrl);
        setLoading(false);
      });
    }
  };

  return (
    <Form
      className={`${isVisible ? "visible-registration-form" : "hidden-registration-form"
        }`}
      name={`registration-form-step-${currentProgressIndex}`}
      form={form}
      initialValues={{ remember: true }}
      onFinish={onFinishUpload}
      onFinishFailed={onFinishFailedUpload}
    >
      <Row justify="center">
        <div className="upload-image">
          <>
            <Form.Item name="pictureData">
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                beforeUpload={beforeUpload}
                onChange={handleChange}
              >
                {imageUrl ? (
                  <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
                ) : (
                    uploadButton
                  )}
              </Upload>
            </Form.Item>
          </>
        </div>
        <div className="upload-image">
          <Form.Item name="docData">
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              beforeUpload={beforeUpload}
              onChange={handleChange}
            >
              {uploadDocButton}
            </Upload>
          </Form.Item>
        </div>
      </Row>

      <Row justify="space-between">
        {currentProgressIndex > 0 && (
          <Button
            className="progress-button keep-left"
            onClick={() => goToPreviousStep()}
          >
            PREVIOUS
          </Button>
        )}

        <Button
          type="primary"
          htmlType="submit"
          className="progress-button keep-right"
        >
          {currentProgressIndex === steps.length - 1 ? "SUBMIT" : "NEXT"}
        </Button>
      </Row>
    </Form>
  );
};

export const ConfirmationFormProfessional: React.FC<RegistrationFormProps> = (
  props: RegistrationFormProps
) => {
  const {
    currentProgressIndex,
    goToPreviousStep,
    steps,
    saveRegistrationData,
    isVisible,
  } = props;

  const [form] = Form.useForm();

  const onFinishConfirmation = (values: any) => {
    const updatedData = {
      email: ~~values.email,
      phoneCall: ~~values.phoneCall,
      sms: ~~values.sms,
      whatsapp: ~~values.whatsapp,
    };
    console.log("Success:", updatedData);
    saveRegistrationData(updatedData);
  };

  const onFinishFailedConfirmation = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      className={`${isVisible ? "visible-registration-form" : "hidden-registration-form"
        }`}
      name={`registration-form-step-${currentProgressIndex}`}
      form={form}
      initialValues={{ remember: true }}
      onFinish={onFinishConfirmation}
      onFinishFailed={onFinishFailedConfirmation}
    >
      <div className="consent-text">
        <div>Hi there, a quick question for you:</div>
        <div>Please confirm on the consent to text message on</div>
      </div>
      <Row justify="center">
        <div className="inputs">
          <>
            <Form.Item name="whatsapp" valuePropName="checked">
              <CustomCheckbox icon={<WhatsappIcon />} name="Whatsapp" />
            </Form.Item>
            <Form.Item name="email" valuePropName="checked">
              <CustomCheckbox icon={<EmailIcon />} name="Email" />
            </Form.Item>
            <Form.Item name="phoneCall" valuePropName="checked">
              <CustomCheckbox icon={<PhoneIcon />} name="Phone" />
            </Form.Item>
            <Form.Item name="sms" valuePropName="checked">
              <CustomCheckbox icon={<PhoneIcon />} name="SMS" />
            </Form.Item>
          </>
        </div>
      </Row>

      <Row justify="space-between">
        {currentProgressIndex > 0 && (
          <Button
            className="progress-button keep-left"
            onClick={() => goToPreviousStep()}
          >
            PREVIOUS
          </Button>
        )}

        <Button
          type="primary"
          htmlType="submit"
          className="progress-button keep-right"
        >
          {currentProgressIndex === steps.length - 1 ? "SUBMIT" : "NEXT"}
        </Button>
      </Row>
    </Form>
  );
};

//#endregion
