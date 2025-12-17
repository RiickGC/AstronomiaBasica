import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAL8CG2_zsckKcWGtgV1DLEto_7nu-ysLw",
    authDomain: "astronomiabasica.firebaseapp.com",
    projectId: "astronomiabasica",
    storageBucket: "astronomiabasica.firebasestorage.app",
    messagingSenderId: "602245201136",
    appId: "1:602245201136:web:8af800e59364837f651635",
    measurementId: "G-0XB719WBLC"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
