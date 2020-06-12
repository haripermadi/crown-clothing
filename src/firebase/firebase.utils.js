import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB6jd3SQ9EhJfGizsxPBo3F6QSAUVMI_Jc",
  authDomain: "crown-clothing-54fca.firebaseapp.com",
  databaseURL: "https://crown-clothing-54fca.firebaseio.com",
  projectId: "crown-clothing-54fca",
  storageBucket: "crown-clothing-54fca.appspot.com",
  messagingSenderId: "707770082472",
  appId: "1:707770082472:web:0403642b466f18fa0d8e9d",
  measurementId: "G-G9FQFY8K24",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ promp: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
