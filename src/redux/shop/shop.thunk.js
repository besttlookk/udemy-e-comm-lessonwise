import { db } from "../../firebase/firebase.config";
import { convertCollectionsSnapshotToMap } from "../../firebase/firebase.utils";
import {
  fetchCollectionsFailure,
  fetchCollectionsStart,
  fetchCollectionsSuccess,
} from "./shop.actions";

export const fetchCollectionsStartAsync = () => (dispatch) => {
  const collectionRef = db.collection("collections");
  dispatch(fetchCollectionsStart());

  collectionRef
    .get()
    .then((snapshot) => {
      const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
      dispatch(fetchCollectionsSuccess(collectionsMap));
    })
    .catch((error) => dispatch(fetchCollectionsFailure(error.message)));
};
