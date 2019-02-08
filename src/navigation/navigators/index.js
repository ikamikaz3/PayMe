import { connect } from "react-redux";
import {
  createNavigationReducer,
  createReactNavigationReduxMiddleware,
  createReduxContainer
} from "react-navigation-redux-helpers";
import { applyMiddleware, combineReducers, createStore } from "redux";
import AppNavigator from "./routes";

const navReducer = createNavigationReducer(AppNavigator);
const appReducer = combineReducers({ nav: navReducer });

const middleware = createReactNavigationReduxMiddleware(state => state.nav);

const App = createReduxContainer(AppNavigator);

const mapStateToProps = state => ({
  state: state.nav
});

const AppWithNavigationState = connect(mapStateToProps)(App);

const store = createStore(appReducer, applyMiddleware(middleware));

export { AppWithNavigationState, store };
