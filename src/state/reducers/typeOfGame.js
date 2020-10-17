const typeOfGame = (state='', action) => {
    switch(action.type){
        case 'NEW_VALUE_FOR_TYPE_OF_GAME':
            return action.payload
        default:
            return state
    }
}

export default typeOfGame