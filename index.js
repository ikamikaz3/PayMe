import { registerRootComponent } from "expo";
import * as firebase from "firebase";

import App from "./src/App";

const config = {
  apiKey: "AIzaSyANuRVB2-P_Fzvm----rTB40QBxLw6XZdg",
  authDomain: "payme-f7da7.firebaseapp.com",
  databaseURL: "https://payme-f7da7.firebaseio.com",
  projectId: "payme-f7da7",
  storageBucket: "payme-f7da7.appspot.com",
  messagingSenderId: "13715356007"
};
firebase.initializeApp(config);

registerRootComponent(App);
