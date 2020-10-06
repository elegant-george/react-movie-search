import React from 'react';

import classes from './Description.module.scss';

const Description = (props) => (
    <div className={classes.Description}>
        <ul>
            {props.title ? <li>Title: {props.title}</li> : null}
            {props.year ? <li>Year: {props.year}</li> : null}
            {props.type? <li>Type: {props.type}</li> : null}
            {props.imdbID? <li>imdbID: {props.imdbID}</li> : null}
        </ul>
    </div>
);

export default Description;