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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) {
    return;
  }

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  console.log("fire----", snapShot);
  if (!snapShot.exists) {
    const { displayName, email, photoURL } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const addCollectionAndDocuments = async (collectionKey, dataToAdd) => {
  const collectionRef = firestore.collection(collectionKey);
  // console.log("addcollection----", collectionRef);
  const batch = firestore.batch();
  dataToAdd.forEach((element) => {
    const newDocRef = collectionRef.doc(); // create uniq id
    batch.set(newDocRef, element);
  });

  return await batch.commit();
};

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformCollection = collections.docs.map((doc) => {
    const { title, items } = doc.data();
    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    };
  });

  return transformCollection.reduce((acc, cumm) => {
    acc[cumm.title.toLowerCase()] = cumm;
    return acc;
  }, {});
};

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ promp: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
