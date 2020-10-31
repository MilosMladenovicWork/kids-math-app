const themeSongPlaying = (state = false, action) => {
    switch(action.type){
        case 'TOGGLE_THEME_SONG':
            return !state
        default:
            return state 
    }
}

export default themeSongPlaying