// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyBxyBhguoO43h_xYXdsFSu-wg9SMqVvN4I",
  authDomain: "lumos-9b56f.firebaseapp.com",
  projectId: "lumos-9b56f",
  storageBucket: "lumos-9b56f.appspot.com",
  messagingSenderId: "133116782339",
  appId: "1:133116782339:web:8a10060bfae97a12a2ab36"
};

  const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const storage = getStorage();

export { database };
