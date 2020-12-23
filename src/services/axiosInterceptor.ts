import axios, { AxiosRequestConfig } from "axios";
import { store } from "../redux/store";

axios.interceptors.request.use(
  (request) => requestHandler(request),
  (error) => {
    return Promise.reject(error);
  }
);
const requestHandler = async (request: AxiosRequestConfig) => {
  if (isHandlerEnabled(request)) {
    const userdata = store.getState().user;
    console.log("request ", request);
    if (userdata.isLogged) {
      const jwttoken = userdata.userData.jwt;
      console.log("add the headers");
      // Modify request here
      request.headers["Authorization"] = `Bearer ${jwttoken}`;
      request.headers["Content-Type"] = "application/json";
    }
  }
  return request;
};
const isHandlerEnabled = (config: any) => {
  // eslint-disable-next-line no-prototype-builtins
  return config.hasOwnProperty("handlerEnabled") && !config.handlerEnabled
    ? false
    : true;
};
// const axiosI = {};
// export default axiosI;
