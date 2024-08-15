import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: `${import.meta.env.VITE_API_APIKEY}`,
  authDomain: `${import.meta.env.VITE_API_AUTHDOMAIN}`,
  projectId: `${import.meta.env.VITE_API_PROJECTID}`,
  storageBucket: `${import.meta.env.VITE_API_STORAGEBUCKET}`,
  messagingSenderId: `${import.meta.env.VITE_API_SENDERID}`,
  appId: `${import.meta.env.VITE_API_APPID}`
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { app, storage };