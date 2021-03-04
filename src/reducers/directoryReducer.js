import { ADD_FOLDER, CHANGE_DIRECTORY, DEL_FOLDER, GO_BACK, JUMP_TO_DIR, SET_CURRENT_PATH } from "../actions/events";

let directoryReducer = (state = {
    childs: [],
    name: "/",
    currentPath: "root",
    activePath: ["root"],
    currentDirectory: { childs: [], name: "root", parent: null, currentPath: "root", },
    rootNode: { childs: [], name: "root", parent: null, currentPath: "root", }
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
        case JUMP_TO_DIR:
            return { ...state, ...action.payload }
        default:
            return state
    }
}

export default directoryReducer