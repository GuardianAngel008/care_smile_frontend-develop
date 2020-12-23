import { createSelector } from "reselect";
import { User } from "../../models";

const selectUser = (state: any): User => state.user;

export const selectIsLogged = createSelector(
  [selectUser],
  (user) => user.isLogged
);

export const selectUserData = createSelector(
  [selectUser],
  (user) => user.userData
);

export const selectToken = createSelector(
  [selectUserData],
  (userData) => userData.jwt
);
