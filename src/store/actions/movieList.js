import axios from 'axios';
import * as actionTypes from './actionTypes';

export const listStart = () => {
    return {
        type: actionTypes.LIST_START
    };
};

export const addSuccess = (movieData, imdbID, toWhich) => {
    return {
        type: actionTypes.ADD_SUCCESS,
        movieData: movieData,
        imdbID: imdbID,
        toWhich: toWhich
    };
};

export const modifySuccess = (imdbID, toWhich) => {
    return {
        type: actionTypes.MODIFY_SUCCESS,
        imdbID: imdbID,
        toWhich: toWhich
    };
};

export const deleteSuccess = (imdbID) => {
    return {
        type: actionTypes.DELETE_SUCCESS,
        imdbID: imdbID
    };
};

export const listFailed =  error => {
    return {
        type: actionTypes.LIST_FAILED,
        error: error
    };
};

export const addToList = (movieData, imdbID, userId, token, toWhich) => {
    return dispatch => {
        dispatch(listStart());
        axios.put(`${process.env.REACT_APP_FIRE_BASE_DATABASE}/${userId}/${imdbID}/.json?auth=${token}`,
        {movieData: movieData, toWhich: toWhich})
        .then(() => {
            dispatch(addSuccess(movieData, imdbID, toWhich));
            console.log('success');
        })
        .catch(err => {
            dispatch(listFailed(err));
        });
    };
}

export const modifyList = (imdbID, userId, token, toWhich) => {
    return dispatch => {
        dispatch(listStart());
        axios.patch(`${process.env.REACT_APP_FIRE_BASE_DATABASE}/${userId}/${imdbID}/.json?auth=${token}`,
        {toWhich: toWhich})
        .then((res) => {
            dispatch(modifySuccess(imdbID, toWhich));
        })
        .catch(err => {
            dispatch(listFailed(err));
        });
    };
}

export const deleteList = (imdbID, userId, token) => {
    return dispatch => {
        dispatch(listStart());
        axios.delete(`${process.env.REACT_APP_FIRE_BASE_DATABASE}/${userId}/${imdbID}/.json?auth=${token}`)
        .then((res) => {
            dispatch(deleteSuccess(imdbID));
        })
        .catch(err => {
            dispatch(listFailed(err));
        });
    };
};

export const fetchStart = () => {
    return {
        type: actionTypes.FETCH_START
    };
};

export const fetchSuccess = (movieList) => {
    return {
        type: actionTypes.FETCH_SUCCESS,
        movieList: movieList === null? {}: movieList
    };
};

export const fetchFailed = (error) => {
    return {
        type: actionTypes.FETCH_FAILED,
        error: error
    };
};

export const fetchList = (userId, token) => {
    return dispatch => {
        dispatch(fetchStart());
        axios.get(`${process.env.REACT_APP_FIRE_BASE_DATABASE}/${userId}/.json?auth=${token}`)
        .then(res => {
            dispatch(fetchSuccess(res.data));
        })
        .catch(err => {
            dispatch(fetchFailed(err));
        });
    };
};

export const clearList = () => {
    return {
        type: actionTypes.CLEAR_LIST,
    };
};