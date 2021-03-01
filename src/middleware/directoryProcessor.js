let directoryProcessor = ({ dispatch, getState }) => next => action => {
    next(action)
}

export default directoryProcessor