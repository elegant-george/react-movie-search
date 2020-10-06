import React from 'react';

import classes from './Menu.module.scss';
import Backdrop from '../UI/Backdrop/Backdrop';
import Spinner from '../UI/Spinner/Spinner';

const Menu = ( props ) => {
    let attachedClasses = [classes.Menu, classes.Close];
    if (props.open) {
        attachedClasses = [classes.Menu, classes.Open];
    }
    return (
        <div>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')} >
                {props.loading ? <Spinner className={classes.Spinner} size={"Small"}/> :
                    <ul>
                        {props.menuType === 'search' || props.menuType === 'watched' ?
                            <li><button
                                    onClick={props.queueHandler}
                                    disabled={props.queueDisabled}>add to queue</button></li> : null}
                        {props.menuType === 'search' || props.menuType === 'queue' ?
                            <li><button
                                    onClick={props.watchedHandler}
                                    disabled={props.watchedDisabled}>add to watched</button></li>: null}
                        {props.menuType === 'queue' || props.menuType === 'watched' ?
                            <li><button
                                    onClick={props.deleteHandler}
                                    >delete</button></li> : null}
                    </ul>
                }
            </div>
        </ div>
    );
};

export default Menu;