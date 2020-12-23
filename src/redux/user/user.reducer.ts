import { Reducer, Action } from "redux";

import { UserActionTypes } from "./user.types";

import { User } from "../../models";

const INITIAL_STATE: User = {
  isLogged: false,
  userData: {
    jwt: "",
    username: "",
    expireTime: 0,
  },
};

const userReducer: Reducer<User, Action> = (
  state = INITIAL_STATE,
  action: any
) => {
  switch (action.type) {
    case UserActionTypes.SET_LOGGED_IN_STATUS:
      return {
        ...state,
        isLogged: action.payload,
      };

    case UserActionTypes.SET_USER_DATA:
      return { ...state, userData: action.payload };
    default:
      return state;
  }
};

export default userReducer;
