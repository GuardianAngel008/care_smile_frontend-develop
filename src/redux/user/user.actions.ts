import { UserActionTypes } from "./user.types";
import { Action } from "redux";

export const setUserLoggedInStatus = (status: boolean): any => {
  return {
    type: UserActionTypes.SET_LOGGED_IN_STATUS,
    payload: status,
  };
};

export const setUserData = (userData: any): any => {
  return {
    type: UserActionTypes.SET_USER_DATA,
    payload: userData,
  };
};
