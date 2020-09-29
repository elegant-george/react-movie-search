import React from 'react';
import { NavLink } from 'react-router-dom';

const Logined = props => {
  return (
    <nav>
        <ul>
          <li>
            <NavLink to="/queue"
              activeStyle={{color: '#560061'}}>queue</NavLink>
          </li>
          <li>
            <NavLink to="/watched"
              activeStyle={{color: '#560061'}}>watched</NavLink>
          </li>
        </ul>
    </nav>
  );
};

export default Logined;