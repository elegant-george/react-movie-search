import React, {useEffect} from 'react';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';
import Header from "./container/Header/Header";
import Search from './container/Search/Search';
import ListPage from './container/ListPage/ListPage';
import Auth from './container/Auth/Auth';
import Footer from "./container/Footer/Footer";
import * as actions from './store/actions/index';

const App = props => {
  const { onTryAutoSignup } = props;

  useEffect(() => {
    onTryAutoSignup();
  }, [onTryAutoSignup]);

  let routes = (
    <Switch>
      <Route path='/signup' component={() => <Auth isSignup={true}/>} />
      <Route path='/login' component={() => <Auth isSignup={false}/>} />
      <Route path="/" exact component={Search} />
      <Redirect to="/" />
    </Switch>
  );

  if (props.isLogined) {
    routes = (
      <Switch>
        <Route path='/' component={Search} exact />
        <Route path='/queue' component={() => <ListPage listType={"queue"}/>} />
        <Route path='/watched' component={() => <ListPage listType={"watched"}/>} />
        <Redirect to="/" />
      </Switch>)
  }

  return (
    <React.Fragment>
      <Header />
      <main>
        {routes}
      </main>
      <Footer />
    </React.Fragment>
  );
}

const mapStateToProps = state => {
  return {
    isLogined: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);