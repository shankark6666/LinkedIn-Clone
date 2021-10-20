import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
// import firebaseConfig from "./config";

const firebaseConfig = {
    apiKey: "AIzaSyDVWwVE_1q44v2hcwUE1rhuhbglJ6cDe_c",
    authDomain: "linkedin-clone-79e01.firebaseapp.com",
    projectId: "linkedin-clone-79e01",
    storageBucket: "linkedin-clone-79e01.appspot.com",
    messagingSenderId: "118517614964",
    appId: "1:118517614964:web:c6879daf85257015a6c421"
  };

  const firebaseApp= firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;