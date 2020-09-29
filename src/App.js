import React from 'react';
import {Route} from 'react-router-dom';
import './App.css';
import Header from "./components/Header/Header";
import SearchPage from './container/SearchPage/SearchPage';
import QueuePage from './container/QueuePage/QueuePage';
import WatchedPage from './container/WatchedPage/WatchedPage';
import SignupPage from './container/SignupPage/SignupPage';
import LoginPage from './container/LoginPage/LoginPage';

const App = props => {
  return (
    <React.Fragment>
      <Header />
      <main>
        <Route path='/' component={SearchPage} exact />
        <Route path='/queue' component={QueuePage} />
        <Route path='/watched' component={WatchedPage} />
        <Route path='/signup' component={SignupPage} />
        <Route path='/login' component={LoginPage} />
      </main>
    </React.Fragment>
  );
}

export default App;