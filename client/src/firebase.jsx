import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDzLSq1GAJtpco7JX_67zizJXkftQcvUiI",
  authDomain: "eplq-42288.firebaseapp.com",
  projectId: "eplq-42288",
  storageBucket: "eplq-42288.appspot.com",
  messagingSenderId: "472330350143",
  appId: "1:472330350143:web:69837379b4d4a06eae528a"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { app, storage };