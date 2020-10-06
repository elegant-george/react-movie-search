import * as actionTypes from '../actions/actionTypes';

const initialState = {
    token: null,
    userId: null,
    userName: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
};

const authStart = ( state, action ) => {
    return {...state,
                   ...{ error: null, loading: true }
    };
};

const authSuccess = (state, action) => {
    return {...state,
        ...{token: action.idToken,
             userId: action.userId,
             error: null,
             loading: false}
    };
};

const authSetName = (state, action) => {
    return {...state,
        userName: action.userName
    };
}

const authFail = (state, action) => {
    return {...state,
        ...{error: action.error,
            loading: false
            }
    };
};

const authClearError = (state, action) => {
    return {...state,
        ...{error: null}
    };
};

const authLogout = (state, action) => {
    return {...state, ...{ token: null, userId: null }};
};

const setAuthRedirectPath = (state, action) => {
    return {...state, ...{ authRedirectPath: action.path }};
};

const fetchFailed = (state, action) => {
    return {...state,
        ...{error: action.error,
            loading: false
            }
    };
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_SET_NAME: return authSetName(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_CLEAR_ERROR: return authClearError(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state,action);
        case actionTypes.FETCH_FAILED: return fetchFailed(state, action);
        default:
            return state;
    }
};

export default reducer;