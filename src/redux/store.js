import { createStore, applyMiddleware, compose } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";

import rootReducer from "./reducers";
import { navMiddleware } from "../navigation/routes";
import {LoginPending} from "./actions/actionCreators";

const middlewares = [thunk, navMiddleware, logger];

const store = createStore(
  rootReducer,
  undefined,
  applyMiddleware(...middlewares)
);

store.dispatch(LoginPending(true));

export default store;
