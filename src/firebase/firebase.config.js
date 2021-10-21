import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const config = {
  apiKey: "AIzaSyCbdhD2rE46Y7n37bO6MjViu7I37FzpvrQ",
  authDomain: "udemy-e-commece.firebaseapp.com",
  projectId: "udemy-e-commece",
  storageBucket: "udemy-e-commece.appspot.com",
  messagingSenderId: "839342083779",
  appId: "1:839342083779:web:52e5649cbb7f2e88a35c76",
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const db = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
