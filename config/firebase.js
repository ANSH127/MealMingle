// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration


import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyAD9jJk6ongGR41r66tSDvzsNBX-BoB7tg",
  authDomain: "mealmingle-3ac05.firebaseapp.com",
  projectId: "mealmingle-3ac05",
  storageBucket: "mealmingle-3ac05.appspot.com",
  messagingSenderId: "635432936485",
  appId: "1:635432936485:web:d086f71af66ab469624bcc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export default app;