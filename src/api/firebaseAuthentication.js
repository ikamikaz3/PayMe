import * as firebase from "firebase";
import { AsyncStorage } from "react-native";
import {
  LoginSuccess,
  LoginError,
  LoginPending,
  RegisterPending,
  RegisterSuccess,
  RegisterError
} from "../redux/actions/actionCreators";
import { createUserEntry, updateWalletAmount } from "./firebaseDatabase";

function login(email, password) {
  return dispatch => {
    dispatch(LoginPending(true));

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(
        data => {
          const { uid } = data.user;
          AsyncStorage.setItem("uid", uid).then(() => {
            dispatch(LoginPending(false));
            dispatch(LoginSuccess(true));
          });
        },
        error => {
          dispatch(LoginPending(false));
          const errorMessage = error.message;
          dispatch(LoginError(errorMessage));
        }
      );
  };
}

function register(email, password) {
  return dispatch => {
    dispatch(RegisterPending(true));

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(
        data => {
          const { uid } = data.user;
          AsyncStorage.setItem("uid", uid).then(() => {
            dispatch(RegisterPending(false));
            dispatch(RegisterSuccess(true));
            dispatch(LoginSuccess(true));
            createUserEntry(uid, email);
            updateWalletAmount();
          });
        },
        error => {
          dispatch(RegisterPending(false));
          const errorMessage = error.message;
          // ...
          dispatch(RegisterError(errorMessage));
        }
      );
  };
}

export { register, login };
