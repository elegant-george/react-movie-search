import React from 'react';

import classes from './Poster.module.scss';

const Poster = (props) => (
    <img src={props.imgSrc} alt={props.imgAlt} className={classes.Poster}/>
);

export default Poster;