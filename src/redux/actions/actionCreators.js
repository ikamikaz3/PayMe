import {
  LOGIN_PENDING,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  GO_TO_REGISTER,
  REGISTER_SUCCESS,
  REGISTER_PENDING,
  REGISTER_ERROR
} from "./actionTypes";

function LoginPending(isLoginPending) {
  return {
    type: LOGIN_PENDING,
    isLoginPending
  };
}

function LoginSuccess(isLoginSuccessful) {
  return {
    type: LOGIN_SUCCESS,
    isLoginSuccessful
  };
}

function LoginError(loginErrorMessage) {
  return {
    type: LOGIN_ERROR,
    loginErrorMessage: loginErrorMessage.toString()
  };
}

function goToRegister() {
  return {
    type: GO_TO_REGISTER
  };
}

function registerPending(isRegisterPending) {
  return {
    type: REGISTER_PENDING,
    isRegisterPending
  };
}

function registerSuccess(isRegisterSuccessful) {
  return {
    type: REGISTER_SUCCESS,
    isRegisterSuccessful
  };
}

function registerError(registerErrorMessage) {
  return {
    type: REGISTER_ERROR,
    registerErrorMessage: registerErrorMessage.toString()
  };
}

export {
  LoginPending,
  LoginSuccess,
  LoginError,
  goToRegister,
  registerSuccess,
  registerPending,
  registerError
};
