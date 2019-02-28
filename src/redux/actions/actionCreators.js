import {
  LOGIN_PENDING,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  GO_TO_REGISTER,
  REGISTER_SUCCESS,
  REGISTER_PENDING,
  REGISTER_ERROR,
  NAVIGATE_BACK
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

function RegisterPending(isRegisterPending) {
  return {
    type: REGISTER_PENDING,
    isRegisterPending
  };
}

function RegisterSuccess(isRegisterSuccessful) {
  return {
    type: REGISTER_SUCCESS,
    isRegisterSuccessful
  };
}

function RegisterError(registerErrorMessage) {
  return {
    type: REGISTER_ERROR,
    registerErrorMessage: registerErrorMessage.toString()
  };
}

function navigateBack() {
  return {
    type: NAVIGATE_BACK
  };
}

export {
  LoginPending,
  LoginSuccess,
  LoginError,
  goToRegister,
  RegisterSuccess,
  RegisterPending,
  RegisterError,
  navigateBack
};
