import { takeLatest, call, put, all } from "redux-saga/effects";

import {
  firestore,
  convertCollectionsSnapshotToMap,
} from "../../firebase/firebase.utils";

import shopActionTypes from "./shop.types";
import { fetchCollectionSuccess, fetchCollectionFail } from "./shop.actions";

export function* fetchCollectionsAsync() {
  yield console.log("SAGA---fetchcolelctionasync----");
  try {
    const collectionRef = firestore.collection("collections");
    const snapshot = yield collectionRef.get();
    const collectionMap = yield call(convertCollectionsSnapshotToMap, snapshot);
    yield put(fetchCollectionSuccess(collectionMap));
  } catch (error) {
    yield put(fetchCollectionFail(error.message));
  }
}

export function* fetchCollectionsStarting() {
  yield takeLatest(
    shopActionTypes.FETCH_COLLECTIONS_START,
    fetchCollectionsAsync
  );
}

export function* shopSagas() {
  yield all([call(fetchCollectionsStarting)]);
}
