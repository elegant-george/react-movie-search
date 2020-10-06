import React, {useEffect} from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import MovieBlock from '../../components/MovieBlock/MovieBlock';
import classes from './ListPage.module.scss';


const ListPage = props=> {

  const fetchList = props.fetchList;
  const clearList = props.clearList;
  useEffect(() => {
    if (props.userId && props.idToken && !props.isFetched) {
      fetchList(props.userId, props.idToken)
    } else if (!(props.userId && props.idToken)) {
      clearList()
    }
  }, [fetchList, clearList, props.userId, props.idToken, props.isFetched])

    let movieBlocks = null
    if (props.movieList) {
      movieBlocks = Object.entries(props.movieList)
      .filter(movie => movie[1].toWhich === props.listType)
      .map(movie => {
        const modifyListHandler = (toWhich) => {
          props.modifyList(
            movie[0],
            props.userId,
            props.idToken,
            toWhich)
        }
        const deleteHandler = () => {
          props.deleteList(
            movie[0],
            props.userId,
            props.idToken
          )
        }

        const toWhich = movie[1].toWhich;
        return  (
          <MovieBlock
            key={movie[0]}
            menuType={props.listType}
            loading={props.menuLoading}
            poster={movie[1].movieData.poster}
            title={movie[1].movieData.title}
            year={movie[1].movieData.year}
            queueHandler={() => modifyListHandler("queue")}
            queueDisabled={toWhich === 'queue'}
            watchedHandler={() => modifyListHandler("watched")}
            watchedDisabled={toWhich === 'watched'}
            deleteHandler={deleteHandler}
            />
          )
      })
    };

    return (
        <div className={classes.ListPage}>
          {props.fetchLoading? <Spinner size={"Big"}/> :
           props.fetchError? <p>Something went wrong.</p> :
           <p>Hello {props.userName}! Here is your {props.listType} list.</p>}
          {movieBlocks}
        </div>
    );
};


const mapStateToProps = state => {
    return {
      movieList: state.movieList.movieList,
      menuLoading: state.movieList.menuLoading,
      menuError: state.movieList.menuError,
      fetchLoading: state.movieList.fetchLoading,
      fetchError: state.movieList.fetchError,
      isFetched: state.movieList.isFetched,
      userId: state.auth.userId,
      idToken: state.auth.token,
      userName: state.auth.userName
    };
  };

  const mapDispatchToProps = dispatch => {
    return {
      modifyList:(imdbID, userId, token, toWhich) => {
        dispatch(actions.modifyList(imdbID, userId, token, toWhich))
      },
      addToList: (compactMovieData, imdbID, userId, token, toWhich) => {
        dispatch(actions.addToList(compactMovieData, imdbID, userId, token, toWhich))
      },
      deleteList: (imdbID, userId, token) => {
        dispatch(actions.deleteList(imdbID, userId, token))
      },
      fetchList: (userId, token) => {
        dispatch(actions.fetchList(userId, token));
      }
    };
  };

  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(ListPage);