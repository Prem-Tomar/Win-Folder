
import './App.css';
import DirectoryBrowser from './DirectoryBrowser';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions'
import 'bootstrap/dist/css/bootstrap.min.css';
import { reduxForm, Field } from 'redux-form'
import { compose } from 'redux';
import { ArrowLeftSquare } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';

const SAME_NAME_FOLDER_ERROR = "Two folders can't have same name!";
const NO_NAME_ERROR = "Folder name cannot be empty!";

class App extends Component {


  constructor(props) {
    super(props)
    this.state = {}
  }

  /**
   * Handles form submit event
   * @param {*} formProps These are form elements which contains all the data of form
   */
  onSubmit = (formProps) => {
    if (formProps.folderName) {
      let exists = this.props.directory.childs.find(child => {
        return child.currentPath === this.props.directory.currentPath && child.name === formProps.folderName

      })

      if (exists) {
        console.error(SAME_NAME_FOLDER_ERROR)
        this.setState({ ...this.state, error: SAME_NAME_FOLDER_ERROR })

      } else {

        this.setState({ ...this.state, error: "" })

        // this.props.directory.rootNode.childs.push({ childs: [], name: formProps.folderName, currentPath: this.props.directory.currentPath, parent: this.props.directory.currentPath })
        this.props.directory.childs.push({ childs: [], name: formProps.folderName, currentPath: this.props.directory.currentPath })

        let finalTree = this.props.directory;

        this.props.addFolder({ ...finalTree, newFolder: { childs: [], name: formProps.folderName, currentPath: this.props.directory.currentPath, parent: this.props.directory.currentPath } })
      }
      formProps.folderName = "";
    }
    else {
      this.setState({ ...this.state, error: NO_NAME_ERROR })
    }
  }


  /**
   * Returns error if any
   * 
   */
  getFolderError = () => {

    return (
      <div className="col-lg-12 text-danger"><b><i>{this.state.error}</i></b></div>
    )

  }

  /**
   * Returns current path and makes them redirectable
   */
  getCurrentPath = () => {
    return (
      <div className="col-lg-12 text-primary">
        <b>
          {
            this.props.directory.activePath
              .map((item, i) => <Link to="#" onClick={() => this.redirectToPath(item)} key={i}> {item.toUpperCase()} /</Link>)
          }
        </b>
      </div>
    )
  }

  /**
   * Directory add functionality
   */

  directoryAdd = () => {
    const { handleSubmit } = this.props;

    return (

      <div>
        <form onSubmit={handleSubmit(this.onSubmit)}>

          <div className="row">
            <div className="col-md-12">
              <div className="input-group">
                <Field className={"form-control col-md-4 btn-margin-10"}
                  autoComplete="off"
                  name="folderName"
                  type="text"
                  component="input"
                  placeholder="Folder Name" >
                </Field>
                <button className="btn btn-primary col-md-1 btn-margin-10" >Add
                  </button>

              </div>
              {this.getFolderError()}
              <hr className="divider" />
              {this.getCurrentPath()}

            </div>
          </div>
        </form>
      </div>

    )
  }

  /**
   * To delete directory
   */
  directoryDelete = () => {
    return (
      <button className="btn btn-primary col-md-1 btn-margin-10"
        onClick={() => this.props.delFolder({ path: "Path" })}>Delete
      </button>
    )
  }

  /**
   * Go back to parent folder button
   */
  backToParent = () => {
    return (
      <button className="btn btn-primary col-md-1 btn-margin-10"
        onClick={this.onBackClick}><ArrowLeftSquare /> Back
      </button>
    )
  }


  /**
   * Moves one directory up
   */
  onBackClick = () => {
    let finalTree = this.props.directory;
    let path = finalTree.currentPath.split("/")
    if (path.length > 1)
      path.pop()
    finalTree.currentPath = path.join("/")
    this.props.goBack({ ...this.props.directory, finalTree })
    // this.props.changeDirectory();
  }


  /**
   * TO navigate based on selected path 
   * @param {String} item Path to the directory
   */
  redirectToPath = (item) => {
    let finalTree = this.props.directory;
    let path = finalTree.activePath
    let index = path.indexOf(item);
    index = index > 0 ? index : 0;
    path = path.slice(0, index + 1);
    let activePath = path;
    finalTree.currentPath = path.join("/")
    console.log(finalTree.currentPath)
    this.props.jumpToDirectory({ ...this.props.directory, finalTree, activePath });

  }


  render() {

    return (
      <React.Fragment>
        {this.backToParent()}
        {this.directoryAdd()}
        <DirectoryBrowser />
      </React.Fragment>
    )
  }
}

let mapStateToProps = (state) => {
  return {
    directory: { ...state.directory }

  }
}
export default compose(connect(mapStateToProps, actions), reduxForm({ form: 'main-form' }))(App);
