import * as actions from "../src/redux/actions/actionCreators";
import * as types from "../src/redux/actions/actionTypes";

describe("Redux actions", () => {
  it("should create a login pending action", () => {
    const expectedAction = {
      type: types.LOGIN_PENDING,
      isLoginPending: true
    };
    expect(actions.LoginPending(true)).toEqual(expectedAction);
  });

  it("should create a login success action", () => {
    const expectedAction = {
      type: types.LOGIN_SUCCESS,
      isLoginSuccessful: true
    };
    expect(actions.LoginSuccess(true)).toEqual(expectedAction);
  });

  it("should create a login error action", () => {
    const loginErrorMessage = "Login Error";
    const expectedAction = {
      type: types.LOGIN_ERROR,
      loginErrorMessage
    };
    expect(actions.LoginError(loginErrorMessage)).toEqual(expectedAction);
  });

  it("should create a register pending action", () => {
    const expectedAction = {
      type: types.REGISTER_PENDING,
      isRegisterPending: true
    };
    expect(actions.RegisterPending(true)).toEqual(expectedAction);
  });

  it("should create a register success action", () => {
    const expectedAction = {
      type: types.REGISTER_SUCCESS,
      isRegisterSuccessful: true
    };
    expect(actions.RegisterSuccess(true)).toEqual(expectedAction);
  });

  it("should create a register error action", () => {
    const registerErrorMessage = "Register Error";
    const expectedAction = {
      type: types.REGISTER_ERROR,
      registerErrorMessage
    };
    expect(actions.RegisterError(registerErrorMessage)).toEqual(expectedAction);
  });
});
