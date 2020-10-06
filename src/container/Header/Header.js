import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as actions from '../../store/actions/index';

import classes from './Header.module.scss';
import movieIcon from '../../icons/icons8-movie-projector-96.png'
import Navigation from '../../components/Nav/Navigation';

const Header = (props) => {
    return (
        <header className={classes.Toolbar}>
            <nav>
                <NavLink to='/'>
                    <img src={movieIcon} alt="MovieIcon" />
                </NavLink>
            </nav>
            <Navigation logined={props.isLogined} logout={props.onLogout}/>
        </header>
    )
}

const mapStateToProps = state => {
    return {
      isLogined: state.auth.token !== null,
    };
  };

  const mapDispatchToProps = dispatch => {
    return {
      onLogout: () => dispatch(actions.logout())
    };
  };

  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Header);