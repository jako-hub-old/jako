/**
 * In this file we join all the reducers into a unique reducer.
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 */

import {combineReducers} from 'redux';
import global from './global.reducer';

const createReducer = () => combineReducers({
    global,
});

export default createReducer;