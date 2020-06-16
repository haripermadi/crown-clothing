import { takeLatest, put, all, call } from "redux-saga/effects";

import userActionTypes from "./user.types";

import {
  auth,
  googleProvider,
  createUserProfileDocument,
  getCurrentUser,
} from "../../firebase/firebase.utils";
import {
  signInSuccess,
  signInFail,
  signOutSuccess,
  signOutFail,
  signUpFail,
  signUpSuccess,
} from "./user.action";

export function* getSnapshotFromUser(userAuth, additionalData) {
  try {
    const userRef = yield call(
      createUserProfileDocument,
      userAuth,
      additionalData
    );
    const userSnapshot = yield userRef.get();
    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (error) {
    yield put(signInFail(error.message));
  }
}

export function* signInWithGoogle() {
  try {
    const { user } = yield auth.signInWithPopup(googleProvider);
    // console.log("userref----", user);
    yield getSnapshotFromUser(user);
  } catch (error) {
    // console.log(error);
    yield put(signInFail(error.message));
  }
}

export function* signInWithEmail({ payload: { email, password } }) {
  try {
    // console.log("signinemailsaga-----", email, password);
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield getSnapshotFromUser(user);
  } catch (error) {
    yield put(signInFail(error.message));
  }
}

export function* isUserLogin() {
  try {
    const userAuth = getCurrentUser();
    console.log("check------", userAuth);
    if (!userAuth) return;
    yield getSnapshotFromUser(userAuth);
  } catch (error) {
    yield put(signInFail(error.message));
  }
}

export function* signOut() {
  try {
    yield auth.signOut();
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFail(error.message));
  }
}

export function* signUp({ payload: { email, password, displayName } }) {
  try {
    // console.log("UP-----", payload);
    const { user } = yield auth.createUserWithEmailAndPassword(email, password);
    yield put(signUpSuccess({ user, additionalData: { displayName } }));
  } catch (error) {
    yield put(signUpFail(error.message));
  }
}

export function* signInAfterSignUp({ payload: { user, additionalData } }) {
  yield getSnapshotFromUser(user, additionalData);
}

export function* onGoogleSignInStart() {
  yield takeLatest(userActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onEmailSignInStart() {
  yield takeLatest(userActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onCheckUserSeassion() {
  yield takeLatest(userActionTypes.CHECK_USER_SESSION, isUserLogin);
}

export function* onSignOutStart() {
  yield takeLatest(userActionTypes.SIGN_OUT_START, signOut);
}

export function* onSignUpStart() {
  yield takeLatest(userActionTypes.SIGN_UP_START, signUp);
}

export function* onSignUpSuccess() {
  yield takeLatest(userActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* userSagas() {
  yield all([
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onCheckUserSeassion),
    call(onSignOutStart),
    call(onSignUpStart),
    call(onSignUpSuccess),
  ]);
}
