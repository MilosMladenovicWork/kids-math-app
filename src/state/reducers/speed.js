const speed = (state='', action) => {
    switch(action.type){
        case 'NEW_VALUE_FOR_SPEED':
            return action.payload
        default:
            return state
    }
}

export default speed