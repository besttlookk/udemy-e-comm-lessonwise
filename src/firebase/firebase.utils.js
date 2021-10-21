import { db } from "./firebase.config";

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = db.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData, // if displayName exist in additional data it will override the above displayname
      });
    } catch (err) {
      console.log("error creating user", err.message);
    }
  }

  return userRef;
};
