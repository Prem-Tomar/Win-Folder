import { ADD_FOLDER, CHANGE_DIRECTORY, DEL_FOLDER } from "../actions/events";

let directoryReducer = (state = { childs: [], name: "/", currentPath: "root" }, action) => {
    switch (action.type) {
        case CHANGE_DIRECTORY:
            return action.payload;
        case ADD_FOLDER:
            return action.payload;
        case DEL_FOLDER:
            return action.payload;
        default:
            return state
    }
}

export default directoryReducer