import React, { Component } from 'react'
import { connect } from 'react-redux';
import './DirectoryBrowser.css'

import * as actions from '../actions';
import { XSquareFill } from 'react-bootstrap-icons';

class DirectoryBrowser extends Component {


    finalNode;
    /**
     * Find node in tree
     * @param {*} node 
     * @param {*} path 
     */
    findChild = (node, path) => {
        if (!node)
            return;
        let length = node.childs.length;
        if (node.name === path) {
            this.finalNode = node;
            return node;

        }
        else {
            for (let i = 0; i < length; i++) {
                this.findChild(node.childs[i], path)
            }
        }
    }



    /**
     * To navigate to child directory
     * @param {*} child Folder forward navigation
     */
    onFolderClick = (child) => {
        let finalTree = this.props.directory;
        finalTree.currentPath = `${child.currentPath}/${child.name}`
        child.currentPath = `${child.currentPath}/${child.name}`
        finalTree.currentDirectory = child;
        this.props.changeDirectory({ ...finalTree });
    }

    /**
     * To delete folder
     * @param {*} child Folder which needs to be deleted
     * @param {*} event Click event
     */
    onFolderDelete = (child, event) => {
        event.stopPropagation();
        let finalTree = this.props.directory;
        this.finalNode.childs = this.finalNode.childs.filter(item => item !== child)
        this.props.delFolder({ ...finalTree });
    }

    /**
     * Get empty directory message
     */
    getNoFolderMessage = () => {
        return (

            <div className="col-md-12 text-center">Empty directory, please add folder!</div>

        )
    }

    /**
     * To get all child folders of current directory
     * @param {*} childs Current directories child folders
     */
    getFolders = (childs = []) => {
        if (childs.length <= 0) {
            return this.getNoFolderMessage()
        } else {
            return (
                childs?.map((child, index) => {
                    return (
                        <div
                            className=" text-center folder"
                            onClick={() => this.onFolderClick(child)}
                            key={index}>
                            {child.name}
                            <XSquareFill onClick={(event) => this.onFolderDelete(child, event)} className="folder-del-icon" />
                        </div>)
                }

                )
            )
        }
    }


    render() {

        let { activePath, rootNode } = this.props.directory;
        for (let i = 0; i < activePath.length; i++) {
            this.findChild(rootNode, activePath[i]);
        }
        if (this.finalNode?.childs) {
            return (
                <div className="row">
                    {this.getFolders(this.finalNode.childs)}
                </div>
            )
        }
        else {
            return this.getNoFolderMessage()
        }
    }
}


let mapStateToProps = (state) => {
    return {
        directory: { ...state.directory }
    }
}

export default connect(mapStateToProps, actions)(DirectoryBrowser)