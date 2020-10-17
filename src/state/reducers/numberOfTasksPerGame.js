const numberOfTasksPerGame = (state='', action) => {
    switch(action.type){
        case 'NEW_VALUE_FOR_NUMBER_OF_TASKS_PER_GAME':
            return action.payload
        default:
            return state
    }
}

export default numberOfTasksPerGame