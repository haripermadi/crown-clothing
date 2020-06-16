import { all, call } from "redux-saga/effects";

import { fetchCollectionsStarting } from "./shop/shop.sagas";
import { userSagas } from "./user/user.sagas";
import { cartSagas } from "./cart/cart.sagas";

export default function* rootSaga() {
  yield all([call(fetchCollectionsStarting), call(userSagas), call(cartSagas)]);
}
