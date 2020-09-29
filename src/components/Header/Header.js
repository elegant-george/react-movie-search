import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Header.module.scss';
import movieIcon from '../../icons/icons8-movie-projector-96.png'
import Navigation from '../Nav/Navigation';

const header = (props) => {
    return (
        <header className={classes.Toolbar}>
            <nav>
                <NavLink to='/'>
                    <img src={movieIcon} alt="MovieIcon" />
                </NavLink>
            </nav>
            <Navigation logined={false} />
        </header>
    )
}

export default header;