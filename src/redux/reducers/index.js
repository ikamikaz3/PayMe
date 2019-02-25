import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import NavigationReducer from "./navReducer";

const rootReducer = combineReducers({ nav: NavigationReducer, loginReducer });

export default rootReducer;
