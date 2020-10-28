const authenticatedUser = (state = false, action) => {
    switch(action.type){
        case "AUTHENTICATED":
            return true
        default:
            return state
    }
}

export default authenticatedUser