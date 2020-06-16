import { all, call, put, takeLatest } from "redux-saga/effects";

import userActionTypes from "../user/user.types";
import { clearAllCartItems } from "./cart.action";

export function* clearAllCartItemsOnSignOut() {
  yield put(clearAllCartItems());
}

export function* onSignOutSuccess() {
  yield takeLatest(
    userActionTypes.SIGN_OUT_SUCCESS,
    clearAllCartItemsOnSignOut
  );
}

export function* cartSagas() {
  yield all([call(onSignOutSuccess)]);
}
