import {initializeApp} from "firebase/app";
import { getStorage } from "firebase/storage";
import {getAuth, onAuthStateChanged} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDGPMt5NMElXgDS4gKG5dxyeG_uVxR4k7k",
    authDomain: "spectagram-dfd7e.firebaseapp.com",
    databaseURL: "https://spectagram-dfd7e-default-rtdb.firebaseio.com",
    projectId: "spectagram-dfd7e",
    storageBucket: "spectagram-dfd7e.appspot.com",
    messagingSenderId: "1000132812945",
    appId: "1:1000132812945:web:2ed171f43a2344d823df30"
  };

const app =  initializeApp(firebaseConfig);
const storage = getStorage(app);

const auth = getAuth(app)
const authPerfil = getAuth();

export { app, storage, auth, authPerfil, firebaseConfig}