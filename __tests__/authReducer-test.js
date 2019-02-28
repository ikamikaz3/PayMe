import * as types from "../src/redux/actions/actionTypes";
import authReducer from "../src/redux/reducers/authReducer";

describe("Authentication Reducer", () => {
  it("should return the initial state", () => {
    expect(authReducer(undefined, {})).toEqual({
      isLoginPending: false,
      isLoginSuccessful: false,
      loginErrorMessage: null,
      isRegisterPending: false,
      isRegisterSuccessful: false,
      registerErrorMessage: null
    });
  });

  it("should handle LOGIN_PENDING", () => {
    expect(
      authReducer([], { type: types.LOGIN_PENDING, isLoginPending: true })
    ).toEqual({
      isLoginPending: true,
      isLoginSuccessful: false,
      loginErrorMessage: null
    });
  });

  it("should handle LOGIN_SUCCESS", () => {
    expect(
      authReducer([], { type: types.LOGIN_SUCCESS, isLoginSuccessful: true })
    ).toEqual({
      isLoginSuccessful: true
    });
  });

  it("should handle LOGIN_ERROR", () => {
    expect(
      authReducer([], {
        type: types.LOGIN_ERROR,
        loginErrorMessage: "Invalid email or password"
      })
    ).toEqual({
      loginErrorMessage: "Invalid email or password"
    });
  });

  it("should handle REGISTER_PENDING", () => {
    expect(
      authReducer([], { type: types.REGISTER_PENDING, isRegisterPending: true })
    ).toEqual({
      isRegisterPending: true,
      isRegisterSuccessful: false,
      registerErrorMessage: null
    });
  });

  it("should handle REGISTER_SUCCESS", () => {
    expect(
      authReducer([], {
        type: types.REGISTER_SUCCESS,
        isRegisterSuccessful: true
      })
    ).toEqual({
      isRegisterSuccessful: true
    });
  });

  it("should handle REGISTER_ERROR", () => {
    expect(
      authReducer([], {
        type: types.REGISTER_ERROR,
        registerErrorMessage: "Email already taken"
      })
    ).toEqual({
      registerErrorMessage: "Email already taken"
    });
  });
});
