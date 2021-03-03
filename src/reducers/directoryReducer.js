import { ADD_FOLDER, CHANGE_DIRECTORY, DEL_FOLDER, GO_BACK, SET_CURRENT_PATH } from "../actions/events";

let directoryReducer = (state = {
    childs: [],
    name: "/",
    currentPath: "root"
}, action) => {
    switch (action.type) {
        case CHANGE_DIRECTORY:
            return { ...state, ...action.payload };
        case ADD_FOLDER:
            return { ...state, ...action.payload };
        case DEL_FOLDER:
            return { ...state, ...action.payload };
        case GO_BACK:
            return { ...state, ...action.payload };
        case SET_CURRENT_PATH:
            return { ...state, ...action.payload }
        default:
            return state
    }
}

export default directoryReducer