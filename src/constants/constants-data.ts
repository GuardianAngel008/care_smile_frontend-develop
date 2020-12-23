const endpointurl = `http://18.135.59.230:8080`;

const dataConstants = {
  clientRegistrationUrl: `${endpointurl}/csb/client/register`,
  clientRegTypesUrl: `${endpointurl}/csb/common/client-types`,
  profRegTypesUrl: `${endpointurl}/csb/common/prof-category-list`,

  clientLoginURL: `${endpointurl}/csb/common/authenticate`,
  resetPasswordURL: `${endpointurl}/csb/common/reset-password`,
};

export default dataConstants;

export const textResources = {
  welcomeText: `Welcome to Care & Smile`,
  welcomeDescription: `Your Preferred Partner for Care Services`,
  emptyUsernameMessage: `Please input your username!`,
  emptyPasswordMessage: `Please input your password!`,
  emptyMobileNumMessage: `Please input your mobile number!`,
  usernameFieldPlaceholder: `Username`,
  passwordFieldPlaceholder: `Password`,
  loginButtonName: `Login`,
  registerButtonName: `Register`,
  forgotPasswordLinkName: `Forgot Password?`,
  forgotPasswordTitle1: `Forgot`,
  forgotPasswordTitle2: `Password?`,
  forgotPasswordDescription: `Enter email id or mobile number registered with your account`,
  emailIdPlaceholder: `Email ID`,
  mobileNumPlacerholder: `Mobile Number`,
  sendButtonName: `Submit`,
  newPasswordDescription: `Enter the new password of your account`,
  newPasswordTitle1: `Forgot`,
  newPasswordTitle2: `Password?`,
  shortPasswordMessage: `Passwords must be at least 6 characters.`,
  doneButtonName: `Done`,
  newPasswordPlaceholder: `New Password`,
  confirmPasswordPlaceholder: `Confirm Password`,
  completedRegistration: `Thank you for registering. You will get your login id and password through email.`,
  gotoLoginButtonName: `Go to login`,
};
