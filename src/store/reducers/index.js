import {combineReducers} from 'redux';
import global from './global.reducer';

const createReducer = () => combineReducers({
    global,
});

export default createReducer;