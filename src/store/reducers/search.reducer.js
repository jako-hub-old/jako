import {
    SET_RESULTS,
    SET_QUERY,
    CLEAR_SELECTED_GAME,
    SET_SELECTED_GAME,
    SELECT_GAME,
} from '../actions/search.actions';

const defaultState = {
    results     : [],
    searchQuery : "",
    selectedGame: {},
    /**
        selectedGame    : null,
    */
    viewGameDetail  : true,
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
        case SELECT_GAME : return ({
            ...state,
            selectedGame    : action.selectedGame,
            viewGameDetail  : true,            
        });
        case SET_SELECTED_GAME : return ({
            ...state,
            selectedGame : action.selectedGame,
        });
        case CLEAR_SELECTED_GAME : return ({
            ...state,
            selectedGame    : null,
            viewGameDetail  : false,
        });
        default : return ({
            ...state,
        });
    }
};