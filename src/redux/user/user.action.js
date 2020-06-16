import userActionTypes from "./user.types";

export const googleSignInStart = () => ({
  type: userActionTypes.GOOGLE_SIGN_IN_START,
});

export const signInSuccess = (user) => ({
  type: userActionTypes.SIGN_IN_SUCCESS,
  payload: user,
});

export const signInFail = (error) => ({
  type: userActionTypes.SIGN_IN_FAIL,
  payload: error,
});

export const emailSignInStart = (input) => ({
  type: userActionTypes.EMAIL_SIGN_IN_START,
  payload: input,
});

export const checkUserSession = () => ({
  type: userActionTypes.CHECK_USER_SESSION,
});

export const signOutStart = () => ({
  type: userActionTypes.SIGN_OUT_START,
});

export const signOutSuccess = () => ({
  type: userActionTypes.SIGN_OUT_SUCCESS,
});

export const signOutFail = (error) => ({
  type: userActionTypes.SIGN_OUT_FAIL,
  payload: error,
});
