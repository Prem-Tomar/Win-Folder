
import { ADD_FOLDER, CHANGE_DIRECTORY, GO_BACK, SET_CURRENT_PATH } from "../actions/events"

let directoryProcessor = ({ dispatch, getState }) => next => action => {
    next(action)
    let { activePath, currentDirectory, rootNode, currentPath } = getState().directory;

    /**
     * To add child to tree
     * @param {*} node 
     * @param {*} path 
     */

    let addChild = (node, path) => {

        if (!node)
            return;

        let length = node.childs.length;
        if (node.name === path) {
            node.childs.push(action.payload.newFolder)
            return;
        }
        else {
            for (let i = 0; i < length; i++) {
                addChild(node.childs[i], path)
            }
        }
    }
    let finalNode;
    let findChild = (node, path) => {
        if (!node)
            return;
        let length = node.childs.length;
        if (node.name === path) {
            finalNode = node;
            return node;

        }
        else {
            for (let i = 0; i < length; i++) {
                findChild(node.childs[i], path)
            }
        }
    }



    if (action.type === ADD_FOLDER) {

        addChild(rootNode, activePath[activePath.length - 1])
        dispatch({ type: SET_CURRENT_PATH, payload: { ...getState().directory, activePath, currentDirectory, rootNode } })
    }


    if (action.type === CHANGE_DIRECTORY) {
        let path = currentPath.split("/");
        activePath.push(path[path.length - 1])
        console.log(activePath)
        var tempNode = undefined;
        for (let i = 1; i < activePath.length; i++) {
            tempNode = findChild(tempNode || rootNode, activePath[i]);
        }

        currentDirectory = finalNode;
        dispatch({ type: SET_CURRENT_PATH, payload: { ...getState().directory, activePath, currentDirectory, rootNode } })
    }

    if (action.type === GO_BACK) {
        let { activePath } = getState().directory;
        for (let i = 1; i < activePath.length; i++) {
            findChild(rootNode, activePath[i]);
        }

        if (activePath.length > 1)
            activePath.pop()

        dispatch({ type: SET_CURRENT_PATH, payload: { ...getState(), activePath } })
    }





}



export default directoryProcessor