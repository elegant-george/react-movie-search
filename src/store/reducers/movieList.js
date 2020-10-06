import * as actionTypes from '../actions/actionTypes';

const initialData = {
    movieList: {},
    menuLoading: false,
    fetchLoading: false,
    menuError: null,
    fetchError: null,
    isFetched: false
};

const listStart = (state, action) => {
    return {
        ...state,
        ...{menuError: null, menuLoading: true}
    };
};

const addSuccess = (state, action) => {
    return (
        {...state,
        ...{movieList:
                {...state.movieList,
                    ...{[`${action.imdbID}`]:{
                        movieData: action.movieData,
                        toWhich: action.toWhich
                        }
                    }
                },
             menuLoading: false,
             menuError: null
            }
       })
};

const modifySuccess = (state, action) => {
    return (
        {...state,
        ...{movieList:
                {...state.movieList,
                    ...{[`${action.imdbID}`]: {
                        movieData: state.movieList[`${action.imdbID}`].movieData,
                        toWhich: action.toWhich
                        }
                    }
                },
            menuLoading: false,
            menuError: null
            }
       })
};

const deleteSuccess = (state, action) => {
    return (
        {...state,
        ...{movieList:
                {...state.movieList,
                    ...{[`${action.imdbID}`]: {
                        movieData: state.movieList[`${action.imdbID}`].movieData,
                        toWhich: "none"
                        }
                    }
                },
            menuLoading: false,
            menuError: null
            }
       })
};

const listFailed = (state, action) => {
    return {
        ...state,
        ...{menuError: action.error,
             menuLoading: false}
    };
};

const fetchStart = (state, action) => {
    return {
        ...state,
        ...{fetchError: null, fetchLoading: true}
    };
};

const fetchSuccess = (state, action) => {
    return (
        {...state,
        ...{movieList:
            action.movieList,
            fetchLoading: false,
            fetchError: null,
            isFetched: true}
    })
};

const fetchFailed = (state, action) => {
    return {
        ...state,
        ...{fetchError: action.error,
             fetchLoading: false}
    };
};

const clearList = (state, action) => {
    return (
        {...state,
        ...{movieList:
            {},
            isFetched: false}
    })
};

const reducer = (state=initialData, action) => {
    switch(action.type) {
        case actionTypes.LIST_START: return listStart(state, action);
        case actionTypes.ADD_SUCCESS: return addSuccess(state, action);
        case actionTypes.MODIFY_SUCCESS: return modifySuccess(state, action);
        case actionTypes.DELETE_SUCCESS: return deleteSuccess(state, action);
        case actionTypes.LIST_FAILED: return listFailed(state, action);
        case actionTypes.FETCH_START: return fetchStart(state, action);
        case actionTypes.FETCH_SUCCESS: return fetchSuccess(state, action);
        case actionTypes.FETCH_FAILED: return fetchFailed(state, action);
        case actionTypes.CLEAR_LIST: return clearList(state, action);
        default: return state;
    };
};

export default reducer;