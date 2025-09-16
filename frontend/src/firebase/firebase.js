import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDTE7vpIxuX2mT8Cg57gcAu74lDo6Q4juM",
  authDomain: "parent-control-app-69d3c.firebaseapp.com",
  databaseURL: "https://parent-control-app-69d3c-default-rtdb.firebaseio.com",
  projectId: "parent-control-app-69d3c",
  storageBucket: "parent-control-app-69d3c.firebasestorage.app",
  messagingSenderId: "799762296383",
  appId: "1:799762296383:web:922e6a9b1beb16a9bb528a",
  measurementId: "G-58J8R5F4V3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
