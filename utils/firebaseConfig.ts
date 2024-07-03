import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBtZM6QDQPEJEsDNM9RAWwKqsK5uOXfues",
  authDomain: "mystroke-c4378.firebaseapp.com",
  projectId: "mystroke-c4378",
  storageBucket: "mystroke-c4378.appspot.com",
  messagingSenderId: "568348724078",
  appId: "1:568348724078:web:6dc8aa049aa6fa4b6b0f7f"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };