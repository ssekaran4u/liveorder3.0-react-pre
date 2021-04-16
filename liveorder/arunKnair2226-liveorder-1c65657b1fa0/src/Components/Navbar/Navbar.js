import React, { Component } from 'react';
import './Navbar.css';

import { MenuItems } from './MenuItems'
import logo from '../../Images/Logo@3x.png';

class Navbar extends Component {
  render() {
    return (
      <div>
        <nav className="NavbarItems MainContainer">
          <a href="liveOrder"><img src={logo} alt="Live Order" className="logo" /></a>
          <ul className="mb-0 d-none d-md-flex">
            {MenuItems.map((item,index) => {
              return(
                <li key={index}>
                  <a href={item.url} className={item.cName}>{item.title}</a>
                </li>
              )
            })}
          </ul>
          <button type="button" className="btn btn-primary schedule-btn"><span className="d-none d-lg-inline-block">Schedule A</span>Demo</button>
          <button type="button" className="btn btn-outline-secondary login-btn">Login</button>
         
        </nav>
        <nav className="NavbarItems MainContainer mobile-nav d-block d-md-none">
          <ul className="mb-0 pl-0">
            {MenuItems.map((item,index) => {
              return(
                <li key={index}>
                  <a href={item.url} className={item.cName}>{item.title}</a>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    );
  }
}

export default Navbar;