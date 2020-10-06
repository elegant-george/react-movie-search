import React from 'react';

import classes from './Footer.module.scss';

const Footer = (props) => (
    <footer className={classes.Footer}>
        <p>icons by <a href="https://icons8.com/">ICONS8</a></p>
        <p>movie data by <a href="http://www.omdbapi.com/">OMDb API</a></p>
    </footer>
);

export default Footer;