import { connect } from "react-redux";
import {
  createReactNavigationReduxMiddleware,
  createReduxContainer
} from "react-navigation-redux-helpers";
import { applyMiddleware, combineReducers, createStore } from "redux";
import AppNavigator from "./routes";
import navReducer from "../reducer/navReducer";
import logger from 'redux-logger';

const appReducer = combineReducers({ nav: navReducer });

const middleware = createReactNavigationReduxMiddleware(nav => state.nav);

const App = createReduxContainer(AppNavigator);

const mapStateToProps = state => ({
  nav: state.nav
});

const AppWithNavigationState = connect(mapStateToProps)(App);

const store = createStore(appReducer, applyMiddleware(middleware), applyMiddleware(logger));

export { AppWithNavigationState, store };
