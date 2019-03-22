/**
 * In this file we join all the reducers into a unique reducer.
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 */

import {combineReducers} from 'redux';
import global from './global.reducer';
import games from './game.reducer';
import session from './session.reducer';

const createReducer = () => combineReducers({
    global,
    games,
    session,
});

export default createReducer;