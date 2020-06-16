import { all, call } from "redux-saga/effects";

import { fetchCollectionsStarting } from "./shop/shop.sagas";

export default function* rootSaga() {
  yield all[call(fetchCollectionsStarting)];
}
