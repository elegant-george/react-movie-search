import * as actionTypes from '../actions/actionTypes';

const initialData = {
    movieData: null,
    loading: false,
    error: null
};

const searchStart = (state, action) => {
    return {
        ...state,
        ...{loading: true}
    }
};

const searchSuccess = (state, action) => {
    return {
        ...state,
        ...{movieData:action.movieData,
             loading: false,
             error: null}
    };
};

const searchFailed = (state, action) => {
    return {
        ...state,
        ...{error: action.error,
             loading: false}
    }
};

const reducer = (state=initialData, action) => {
    switch(action.type) {
        case actionTypes.SEARCH_START: return searchStart(state, action);
        case actionTypes.SEARCH_SUCCESS: return searchSuccess(state, action);
        case actionTypes.SEARCH_FAILED: return searchFailed(state, action);
        default: return state;
    };
};

export default reducer;