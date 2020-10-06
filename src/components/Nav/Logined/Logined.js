import React from 'react';
import { NavLink } from 'react-router-dom';
import {activeColor} from '../../../shared/constWord'

const Logined = props => {
  return (
    <nav>
        <ul>
          <li>
            <NavLink to="/queue"
              activeStyle={{color: activeColor}}>queue</NavLink>
          </li>
          <li>
            <NavLink to="/watched"
              activeStyle={{color: activeColor}}>watched</NavLink>
          </li>
          <li>
            <NavLink to="/" >
              <button onClick={props.logout}>logout</button>
            </NavLink>
          </li>
        </ul>
    </nav>
  );
};

export default Logined;