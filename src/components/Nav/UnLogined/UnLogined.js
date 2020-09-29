import React from 'react';
import { NavLink } from 'react-router-dom';

const UnLogined = props => {
  return (
    <nav>
        <ul>
          <li>
            <NavLink to="/login"
              activeStyle={{color: '#560061'}}>login</NavLink>
          </li>
          <li>
            <NavLink to="/signup"
              activeStyle={{color: '#560061'}}>signup</NavLink>
          </li>
        </ul>
    </nav>
  );
};

export default UnLogined;