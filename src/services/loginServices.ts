import axios from "axios";
import dataConstants from "../constants/constants-data";

export const loginService = async (body: any) => {
  return axios.post(dataConstants.clientLoginURL, body);
};
