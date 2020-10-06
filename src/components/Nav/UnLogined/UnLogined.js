import React from 'react';
import { NavLink } from 'react-router-dom';
import {activeColor} from '../../../shared/constWord'

const UnLogined = props => {
  return (
    <nav>
        <ul>
          <li>
            <NavLink to="/login"
              activeStyle={{color: activeColor}}>login</NavLink>
          </li>
          <li>
            <NavLink to="/signup"
              activeStyle={{color: activeColor}}>signup</NavLink>
          </li>
        </ul>
    </nav>
  );
};

export default UnLogined;