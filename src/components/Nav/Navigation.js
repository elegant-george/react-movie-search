import React from 'react';
import Logined from './Logined/Logined';
import UnLogined from './UnLogined/UnLogined';

import classes from './Navigation.module.scss';

const Navigation = props => {
  const rightCorner  = props.logined? <Logined /> : <UnLogined />
  return (
    <header className={classes.MainHeader}>
      {rightCorner}
    </header>
  );
};

export default Navigation;