const numberOfCharactersPerNumber = (state='', action) => {
    switch(action.type){
        case 'NEW_VALUE_FOR_NUMBER_OF_CHARACTERS_PER_NUMBER':
            return action.payload
        default:
            return state
    }
}

export default numberOfCharactersPerNumber