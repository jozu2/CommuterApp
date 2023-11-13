import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getDatabase } from "firebase/database";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAkFCgeMiNZk9zV9S05xO00Ol3rEtfcqwk",
  authDomain: "v5angkas.firebaseapp.com",
  databaseURL:
    "https://v5angkas-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "v5angkas",
  storageBucket: "v5angkas.appspot.com",
  messagingSenderId: "815935174111",
  appId: "1:815935174111:web:3e6f36c80dbeb9a221006a",
  measurementId: "G-EFZ6C567X3",
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const db = getDatabase();
export { firebase, db };
