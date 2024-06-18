import { combineReducers } from "redux";
import testReducer, { testSlice } from "./testSlice";

export const rootReducer = combineReducers({
    [testSlice.name] : testReducer,
})