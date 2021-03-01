import { combineReducers } from "redux";
import directoryReducer from "./directoryReducer";
import { reducer as formReducer } from 'redux-form'
export default combineReducers({
    directory: directoryReducer,
    form: formReducer
})