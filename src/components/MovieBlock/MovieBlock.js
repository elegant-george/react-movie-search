import React, {useState} from 'react';

import Poster from '../Poster/Poster';
import Description from '../Description/Description';
import MenuDot from '../UI/MenuDot/MenuDot';
import Menu from '../Menu/Menu'
import classes from './MovieBlock.module.scss';


const MovieBlock = props=> {
    const [openMenu, setOpenMenu] = useState(false);

    const clickHandler = () => {
        setOpenMenu(preState => !preState);
    };

    const closeHandler = () =>{
        setOpenMenu(false);
    };
    return (
        <div className={classes.MovieBlock}>
            <MenuDot clicked={clickHandler}/>
            <Menu open={openMenu} closed={closeHandler}
            loading={props.loading}
            menuType={props.menuType}
            queueHandler={props.queueHandler}
            queueDisabled={props.queueDisabled}
            watchedHandler={props.watchedHandler}
            watchedDisabled={props.watchedDisabled}
            deleteHandler={props.deleteHandler}/>
            <Poster imgSrc={props.poster} imgAlt={props.title}/>
            <Description
                title={props.title}
                year={props.year}
                type={props.type}
                imdbID={props.imdbID} />
        </div>
    );
}

export default MovieBlock;