import shopActionTypes from "./shop.types";
import {
  firestore,
  convertCollectionsSnapshotToMap,
} from "../../firebase/firebase.utils";

export const fetchCollectionsStart = () => ({
  type: shopActionTypes.FETCH_COLLECTIONS_START,
});

export const fetchCollectionSuccess = (collectionMap) => ({
  type: shopActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: collectionMap,
});

export const fetchCollectionFail = (error) => ({
  type: shopActionTypes.FETCH_COLLECTIONS_FAIL,
  payload: error,
});

export const fetchCollectionStartAsync = () => {
  return (dispatch) => {
    const collectionRef = firestore.collection("collections");
    console.log("action b4----");

    dispatch(fetchCollectionsStart());

    collectionRef
      .get()
      .then((snapshot) => {
        const collectionMap = convertCollectionsSnapshotToMap(snapshot);
        console.log("action----", collectionMap);

        dispatch(fetchCollectionSuccess(collectionMap));
      })
      .catch((err) => {
        dispatch(fetchCollectionFail(err.message));
      });
  };
};
