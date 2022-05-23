import { initializeApp } from "firebase/app";
import {
    getFirestore,
    collection,
    getDocs,
    addDoc,
    getDoc,
    deleteDoc,
    serverTimestamp,
    doc,
    setDoc,
    orderBy,
    limit,
    onSnapshot,
    query,
} from 'firebase/firestore';

import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';

const firebaseConfig = {
    apiKey: "..."
};

initializeApp(firebaseConfig);

const db = getFirestore();
const auth = getAuth();
const googleProvider = new GoogleAuthProvider();

export {
    db,
    auth,
    googleProvider,
    collection,
    getDocs,
    addDoc,
    deleteDoc,
    serverTimestamp,
    doc,
    setDoc,
    getDoc,
    orderBy,
    limit,
    onSnapshot,
    query,
    signInWithPopup,
    signOut,
    onAuthStateChanged,
};