import React from 'react';
import Logined from './Logined/Logined';
import UnLogined from './UnLogined/UnLogined';

import classes from './Navigation.module.scss';

const Navigation = props => {
  const rightCorner  = props.logined? <Logined logout={props.logout}/> : <UnLogined />
  return (
    <div className={classes.MainHeader}>
      {rightCorner}
    </div>
  );
};

export default Navigation;