import {
  LOGIN_PENDING,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
  GO_TO_REGISTER,
  REGISTER_SUCCESS,
  REGISTER_PENDING,
  REGISTER_ERROR,
  NAVIGATE_BACK,
  GO_TO_PAY,
  GO_TO_COLLECT
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

function Logout() {
  return {
    type: LOGOUT
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

function NavigateBack() {
  return {
    type: NAVIGATE_BACK
  };
}

function GoToPay() {
  return {
    type: GO_TO_PAY
  };
}

function GoToCollect() {
  return {
    type: GO_TO_COLLECT
  };
}

export {
  LoginPending,
  LoginSuccess,
  LoginError,
  Logout,
  goToRegister,
  RegisterSuccess,
  RegisterPending,
  RegisterError,
  NavigateBack,
  GoToCollect,
  GoToPay
};
