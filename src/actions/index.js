import { ADD_FOLDER, CHANGE_DIRECTORY, DEL_FOLDER, GO_BACK, JUMP_TO_DIR } from "./events";

/**
 * Trigger change directory action
 * @param {*} payload Payload of action
 */
export function changeDirectory(payload) {
    return (dispatch) => {
        dispatch({
            type: CHANGE_DIRECTORY,
            payload
        })
    }
}


/**
 * Trigger new folder action
 * @param {*} data Metadata for new folder
 */
export function addFolder(data) {
    return (dispatch) => {
        dispatch({
            type: ADD_FOLDER,
            payload: data
        })
    }
}

/**
 * Trigger delete folder action
 * @param {*} data Metadata of folder to be deleted
 */
export function delFolder(data) {
    return (dispatch) => {
        dispatch({
            type: DEL_FOLDER,
            payload: data
        })
    }
}

export function goBack(payload) {
    return (dispatch) => {
        dispatch({
            type: GO_BACK, payload
        })
    }
}

export function jumpToDirectory(payload) {
    return (dispatch) => {
        dispatch({
            type: JUMP_TO_DIR, payload
        })
    }
}