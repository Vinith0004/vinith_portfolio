// src/firebase.ts
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDYN-sbiCs31T9CbBKAzJr_jl-D1PNntGU",
  authDomain: "porrtfolio-19bfc.firebaseapp.com",
  projectId: "porrtfolio-19bfc",
  storageBucket: "porrtfolio-19bfc.firebasestorage.app",
  messagingSenderId: "401390015114",
  appId: "1:401390015114:web:6be5a72d21323fd779d373",
  measurementId: "G-VKLHTZZ8M9"
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export { db }
