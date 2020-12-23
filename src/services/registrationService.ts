/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios from "axios";
import dataConstants from "../constants/constants-data";

export const clientRegisterUser = async (body: any) => {
  return axios.post(dataConstants.clientRegistrationUrl, body);
};

export const getclientRegtypes = async () => {
  return axios.get(dataConstants.clientRegTypesUrl);
};

export const getprofRegtypes = async () => {
  return axios.get(dataConstants.profRegTypesUrl);
};

export const resetPassword = async (body: any) => {
  return axios.post(dataConstants.resetPasswordURL, body);
};
