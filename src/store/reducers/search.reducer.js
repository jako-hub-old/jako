import {
    SET_RESULTS,
    SET_QUERY,
} from '../actions/search.actions';

const defaultState = {
    results     : [],
    searchQuery : "",    
};

export default gameReducer = (state=defaultState, action) => {
    switch (action.type) {
        case SET_RESULTS : return ({
            ...state,
            results : action.results,
        });
        case SET_QUERY : return ({
            ...state,
            searchQuery : action.query,
        });
        default : return ({
            ...state,
        });
    }
};