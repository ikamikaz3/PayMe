import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import { navReducer } from "../../navigation/routes";

console.log(navReducer);

const rootReducer = combineReducers({ nav: navReducer, loginReducer });

export default rootReducer;