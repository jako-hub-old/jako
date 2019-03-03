/**
 * This file joins and creates the main application store.
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 */
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

export default createStore(reducers(), applyMiddleware(thunk));