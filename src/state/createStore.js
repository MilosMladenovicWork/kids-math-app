import { createStore, combineReducers } from 'redux';

import typeOfGame from './reducers/typeOfGame'
import numberOfCharactersPerNumber from './reducers/numberOfCharactersPerNumber'
import numberOfNumbersPerTask from './reducers/numberOfNumbersPerTask'
import speed from './reducers/speed'
import numberOfTasksPerGame from './reducers/numberOfTasksPerGame'
import authenticatedUser from './reducers/authenticatedUser'

export default preloadedState => {
    return createStore(combineReducers({typeOfGame, numberOfCharactersPerNumber, numberOfNumbersPerTask, numberOfTasksPerGame, speed, authenticatedUser}), preloadedState);
  };