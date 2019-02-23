import { LOGIN_PENDING } from "../actions/actionTypes";
import {
  LoginSuccess,
  LoginError,
  LoginPending
} from "../actions/actionCreators";

function callLoginApi(email, password, callback) {
  setTimeout(() => {
    if (email === "admin@example.com" && password === "admin") {
      return callback(null);
    } else {
      return callback(new Error("Invalid email and password"));
    }
  }, 1000);
}

export function login(email, password) {
  return dispatch => {
    dispatch(LoginPending(true));
    dispatch(LoginSuccess(false));
    dispatch(LoginError(null));

    callLoginApi(email, password, error => {
      dispatch(LoginPending(false));
      if (!error) {
        dispatch(LoginSuccess(true));
      } else {
        dispatch(LoginError(error));
      }
    });
  };
}

const initialState = {
  isLoginPending: false,
  isLoginSuccessful: false,
  loginErrorMessage: null
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_PENDING:
      console.log("LOGIN_PENDING");
      return state;
    default:
      return state;
  }
};

export default loginReducer;
