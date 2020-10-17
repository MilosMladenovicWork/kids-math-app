const numberOfNumbersPerTask = (state='', action) => {
    switch(action.type){
        case 'NEW_VALUE_FOR_NUMBER_OF_NUMBERS_PER_TASK':
            return action.payload
        default:
            return state
    }
}

export default numberOfNumbersPerTask