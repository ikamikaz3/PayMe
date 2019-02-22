import { connect } from "react-redux";
import { applyMiddleware, combineReducers, createStore } from "redux";
import logger from "redux-logger";

import AppNavigator from "./routes";
import navReducer from "../reducer/navReducer";

const appReducer = combineReducers({ nav: navReducer });

const middleware = createReactNavigationReduxMiddleware(state => state.nav);

const App = createReduxContainer(AppNavigator);

const mapStateToProps = state => ({
  state: state.nav
});

const AppWithNavigationState = connect(mapStateToProps)(App);

const middlewares = [middleware, logger];

const store = createStore(appReducer, applyMiddleware(...middlewares));

export { AppWithNavigationState, store };
