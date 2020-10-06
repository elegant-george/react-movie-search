import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import MovieBlock from '../../components/MovieBlock/MovieBlock';
import classes from './Search.module.scss';


const Search = props=> {

    const [searchString, setSearchString] = useState('');

    const fetchList = props.fetchList;
    const clearList = props.clearList;
    useEffect(() => {
      if (props.userId && props.idToken && !props.isFetched) {
        fetchList(props.userId, props.idToken)
      } else if (!(props.userId && props.idToken)) {
        clearList()
      }
    }, [fetchList, clearList, props.userId, props.idToken, props.isFetched])

    let movieBlock = null
    if (props.movieData) {
      if (props.movieData.Search){
        movieBlock = props.movieData.Search
        .map(item => {
          const addToListHandler = (toWhich) => {
            props.addToList({
              poster: item.Poster,
              title:item.Title,
              year:item.Year
              },
              item.imdbID,
              props.userId,
              props.idToken,
              toWhich)
          }
          const toWhich = props.movieList[`${item.imdbID}`]? props.movieList[`${item.imdbID}`].toWhich : false;
          return (
          <MovieBlock
            key={item.imdbID}
            menuType={'search'}
            loading={props.fetchLoading || props.menuLoading}
            poster={item.Poster}
            title={item.Title}
            year={item.Year}
            type={item.Type}
            imdbID={item.imdbID}
            queueHandler={() => addToListHandler("queue")}
            queueDisabled={props.idToken? toWhich === 'queue' : true}
            watchedHandler={() => addToListHandler("watched")}
            watchedDisabled={props.idToken? toWhich === 'watched' : true}/>
            )
        })
      } else {
        movieBlock = <p>Movie not found.</p>
      }
    };

    const inputChangedHandler = (event) => {
      setSearchString(event.target.value);
    };

    const submitHandler = (event) => {
      event.preventDefault();
      props.search(searchString);
    };

    return (
        <div className={classes.Search}>
          <form onSubmit={submitHandler}>
            <Input
              elementType={"input"}
              elementConfig={{type:'search', placeholder:'Search Movie'}}
              value={searchString}
              invalid={true}
              shouldValidate={{required:false}}
              touched={false}
              changed={event => inputChangedHandler(event)}
            />
            <Button btnType="Search" >Search</Button>
          </form>
        {props.loading? <Spinner  size={"Big"}/> :
            props.error? <p>Something went wrong.</p>  : movieBlock}
    </div>
    );
};


const mapStateToProps = state => {
    return {
      loading: state.search.loading,
      error: state.search.error,
      movieData: state.search.movieData,
      movieList: state.movieList.movieList,
      menuLoading: state.movieList.menuLoading,
      menuError: state.movieList.menuError,
      fetchLoading: state.movieList.fetchLoading,
      isFetched: state.movieList.isFetched,
      userId: state.auth.userId,
      idToken: state.auth.token
    };
  };

  const mapDispatchToProps = dispatch => {
    return {
      search: (searchString) => dispatch(actions.search(searchString)),
      addToList: (compactMovieData, imdbID, userId, token, toWhich) => {
        dispatch(actions.addToList(compactMovieData, imdbID, userId, token, toWhich));
      },
      fetchList: (userId, token) => {
        dispatch(actions.fetchList(userId, token));
      },
      clearList: () => {
        dispatch(actions.clearList());
      }
    };
  };

  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Search);