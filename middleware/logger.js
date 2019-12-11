const logger = (store) => (next) => (action) => {
    console.groupCollapsed(action.type)
        console.log('The Action: ', action)
        const returnValue = next(action)
        console.log('The new state: ', store.getState())
    console.groupEnd()
    return returnValue

}

export default logger