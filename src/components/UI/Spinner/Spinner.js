import React from 'react';

import classes from './Spinner.module.scss';

const Spinner = (props) => {
    let attachedClasses = [];
    if (props.size === 'Big') {
        attachedClasses = [classes.Loader, classes.Big]
    } else if (props.size === 'Small') {
        attachedClasses = [classes.Loader, classes.Small]
    }
    return (
        <div className={attachedClasses.join(' ')}></div>
    )
};

export default Spinner;