import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDLClE5u-Ad2BRhbc9vjO_E62u2moAJJiw",
  authDomain: "the-walnut.firebaseapp.com",
  projectId: "the-walnut",
  storageBucket: "the-walnut.appspot.com",
  messagingSenderId: "294799270210",
  appId: "1:294799270210:web:68b2a389db74e2754228db",
  measurementId: "G-PVP9BCB84L"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
  
  export default firebaseConfig;
  