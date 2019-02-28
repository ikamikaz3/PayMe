import { createStore, applyMiddleware, compose } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";

import rootReducer from "./reducers";
import { navMiddleware } from "../navigation";

const middlewares = [thunk, navMiddleware, logger];

const store = createStore(
  rootReducer,
  undefined,
  compose(applyMiddleware(...middlewares))
);

export default store;
