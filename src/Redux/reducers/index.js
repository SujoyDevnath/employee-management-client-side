import { combineReducers } from "redux";
// import { firebaseReducer } from "./firebaseReduser";
import { tableDataReducer } from "./tableDataReducer";
const reducers = combineReducers({
    // firebaseReducer: firebaseReducer,
    tableDataReducer: tableDataReducer
});
export default reducers;