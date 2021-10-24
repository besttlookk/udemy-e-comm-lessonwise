import { call, put, takeLatest, all } from "redux-saga/effects";
import { db } from "../../firebase/firebase.config";
import { convertCollectionsSnapshotToMap } from "../../firebase/firebase.utils";
import {
  fetchCollectionsFailure,
  fetchCollectionsSuccess,
} from "./shop.actions";

import ShopActionTypes from "./shop.types";

const { FETCH_COLLECTIONS_START } = ShopActionTypes;

// Worker saga will be fired on USER_FETCH_REQUESTED actions
function* fetchCollectionsAsync() {
  try {
    const collectionRef = db.collection("collections");
    const snapshot = yield collectionRef.get();
    // const collectionsMap = convertCollectionsSnapshotToMap(snapshot);// here it is not good practice to call function directly(use call)
    const collectionsMap = yield call(
      convertCollectionsSnapshotToMap,
      snapshot
    );
    yield put(fetchCollectionsSuccess(collectionsMap));
  } catch (e) {
    yield put(fetchCollectionsFailure(e.message));
  }
}

// Starts fetchUser on each dispatched USER_FETCH_REQUESTED action
// Allows concurrent fetches of user
export function* fetchCollectionsStart() {
  yield takeLatest(FETCH_COLLECTIONS_START, fetchCollectionsAsync);
}

// ! NOTE
//  inside generator function/ sagas do not dispatch actions using "dispatch function" instaed they use anothe effect called "put". put helsps to create action inside saga

export function* shopSagas() {
  yield all([call(fetchCollectionsStart)]);
}
