import {
  LOGIN_ERROR,
  LOGIN_PENDING,
  LOGIN_SUCCESS
} from "../actions/actionTypes";
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
      return {
        ...state,
        isLoginPending: action.isLoginPending,
        isLoginSuccessful: false,
        loginErrorMessage: null
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoginSuccessful: action.isLoginSuccessful
      };
    case LOGIN_ERROR:
      return {
        ...state,
        loginErrorMessage: action.loginErrorMessage
      };
    default:
      return state;
  }
};

export default loginReducer;
