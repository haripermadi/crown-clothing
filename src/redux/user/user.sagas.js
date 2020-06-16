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
} from "./user.action";

export function* getSnapshotFromUser(userAuth) {
  try {
    const userRef = yield call(createUserProfileDocument, userAuth);
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

export function* userSagas() {
  yield all([
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onCheckUserSeassion),
    call(onSignOutStart),
  ]);
}
