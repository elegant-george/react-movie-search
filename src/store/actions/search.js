import axios from 'axios';
import * as actionTypes from './actionTypes';


export const searchStart = () => {
    return {
        type: actionTypes.SEARCH_START
    };
};

export const searchSuccess = (movieData) => {
    return {
        type: actionTypes.SEARCH_SUCCESS,
        movieData: movieData
    };
};

export const searchFailed = (error) => {
    return {
        type: actionTypes.SEARCH_FAILED,
        error: error
    };
};

export const search = (searchString) => {
    return dispatch => {
        dispatch(searchStart());
        axios.get(`https://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_API_KEY}&s=${searchString}`)
        .then(response => {
            dispatch(searchSuccess(response.data));
        })
        .catch(error => {
            dispatch(searchFailed(error));
        });
    };
};