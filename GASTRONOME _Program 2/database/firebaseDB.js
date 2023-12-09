// Import the functions you need from the SDKs you need
import * as firebase from "firebase/compat";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from 'firebase/firestore'; 
import { getStorage } from 'firebase/storage'; 

import {getReactNativePersistence, initializeAuth} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB_mnF6B8fpUvArEYK9tnBZQzdIemi0P8Y",
  authDomain: "ject4-1d758.firebaseapp.com",
  projectId: "ject4-1d758",
  storageBucket: "ject4-1d758.appspot.com",
  messagingSenderId: "492360518305",
  appId: "1:492360518305:web:d7bec70a0885d3aef93ee0",
  measurementId: "G-P4L1GZBYY7"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app()
}
export const auth1 = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const auth = firebase.auth()
const firestore = getFirestore(app);
const storage = getStorage(app);

export { auth, firebase, firestore, storage };