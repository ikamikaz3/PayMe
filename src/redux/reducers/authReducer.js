import {
  LOGIN_ERROR,
  LOGIN_PENDING,
  LOGIN_SUCCESS,
  REGISTER_ERROR,
  REGISTER_PENDING,
  REGISTER_SUCCESS
} from "../actions/actionTypes";
import {
  LoginSuccess,
  LoginError,
  LoginPending,
  RegisterPending,
  RegisterSuccess,
  RegisterError
} from "../actions/actionCreators";

function callLoginApi(email, password, callback) {
  setTimeout(() => {
    if (email === "admin@example.com" && password === "admin") {
      return callback(null);
    }
    return callback(new Error("Invalid email and password"));
  }, 1000);
}

function callRegisterApi(email, password, callback) {
  setTimeout(() => {
    if (email === "user@example.com" && password === "password") {
      return callback(null);
    }
    return callback(new Error("Email already taken"));
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

export function register(email, password) {
  return dispatch => {
    dispatch(RegisterPending(true));

    callRegisterApi(email, password, error => {
      dispatch(RegisterPending(false));
      if (!error) {
        dispatch(RegisterSuccess(true));
        dispatch(LoginSuccess(true));
      } else {
        dispatch(RegisterError(error));
      }
    });
  };
}

const initialState = {
  isLoginPending: false,
  isLoginSuccessful: false,
  loginErrorMessage: null,
  isRegisterPending: false,
  isRegisterSuccessful: false,
  registerErrorMessage: null
};

const authReducer = (state = initialState, action) => {
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
    case REGISTER_PENDING:
      return {
        ...state,
        isRegisterPending: action.isRegisterPending,
        isRegisterSuccessful: false,
        registerErrorMessage: null
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        isRegisterSuccessful: action.isRegisterSuccessful
      };
    case REGISTER_ERROR:
      return {
        ...state,
        registerErrorMessage: action.registerErrorMessage
      };
    default:
      return state;
  }
};

export default authReducer;
