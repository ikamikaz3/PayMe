import { combineReducers } from "redux";
import authReducer from "./authReducer";
import NavigationReducer from "./navReducer";

const rootReducer = combineReducers({ nav: NavigationReducer, authReducer });

export default rootReducer;
