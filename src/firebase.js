import { initializeApp } from "firebase/app";
import { getAuth,signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBXRIySIbjIesqnXAmI3tWD_hmXir5_BeU",
    authDomain: "shoppers-shopping-app-2aebc.firebaseapp.com",
    projectId: "shoppers-shopping-app-2aebc",
    storageBucket: "shoppers-shopping-app-2aebc.appspot.com",
    messagingSenderId: "867000088215",
    appId: "1:867000088215:web:c37c21d0d44e3d9a895bd2",
    measurementId: "G-4RP31K0NC9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
export { signOut };
