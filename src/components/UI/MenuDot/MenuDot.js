import React from 'react';

import classes from './MenuDot.module.scss';

const MenuDot = (props) => (
    <div className={classes.MenuDot} onClick={props.clicked}>
        <div></div>
        <div></div>
        <div></div>
    </div>
);

export default MenuDot;