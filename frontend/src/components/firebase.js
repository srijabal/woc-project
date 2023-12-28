import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";




const firebaseConfig = {
  apiKey: process.env.FIREBASE_API || "AIzaSyAwWyWNr65atxXbwNC1cVGr7d8ViMseN8Y" ,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || "study-ace-6f433.firebaseapp.com",
  projectId: process.env.FIREBASE_PROJECT_ID || "study-ace-6f433",
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "study-ace-6f433.appspot.com",
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "172800211090",
  appId: process.env.FIREBASE_APP_ID || "1:172800211090:web:4f91a1e35480f2b087ce4b",
  measurementId: process.env.FIREBASE_MEASUREMENT_ID || "G-01FT2PB891"
};



const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);


