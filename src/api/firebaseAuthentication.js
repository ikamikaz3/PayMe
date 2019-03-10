import * as firebase from "firebase";
import {
  LoginSuccess,
  LoginError,
  LoginPending,
  RegisterPending,
  RegisterSuccess,
  RegisterError,
  SetWalletAmount,
  SetProfilePictureURI
} from "../redux/actions/actionCreators";
import { createUserEntry } from "./firebaseDatabase";

function login(email, password) {
  return dispatch => {
    dispatch(LoginPending(true));

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(
        data => {
          const { uid } = data.user;
          dispatch(LoginPending(false));
          dispatch(LoginSuccess(true));
          firebase
            .database()
            .ref(`/users/${uid}`)
            .once("value")
            .then(userSnapshot => {
              const { walletAmount } = userSnapshot.val();
              dispatch(SetWalletAmount(walletAmount));
            });
          const picRef = firebase
            .storage()
            .ref(`photo_profile/${uid}/profile_pic.png`);
          picRef.getDownloadURL().then(uri => {
            dispatch(SetProfilePictureURI(uri));
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

function register(email, password, confirmPassword) {
  return dispatch => {
    dispatch(RegisterPending(true));

    if (password !== confirmPassword) {
      dispatch(RegisterPending(false));
      dispatch(RegisterError("Passwords do not match"));
      return;
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(
        data => {
          const { uid } = data.user;
          dispatch(RegisterPending(false));
          dispatch(RegisterSuccess(true));
          dispatch(LoginSuccess(true));
          createUserEntry(uid, email);
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
