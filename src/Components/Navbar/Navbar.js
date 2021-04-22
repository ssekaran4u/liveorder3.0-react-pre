import React, { Component } from 'react';
import './Navbar.css';

import { MenuItems } from './MenuItems'
import logo from '../../Images/Logo@3x.png';

class Navbar extends Component {
  render() {
    return (
      <div className="NavbarContainer">
        <nav className="NavbarItems MainContainer">
          <a href="liveOrder"><img src={logo} alt="Live Order" className="logo" /></a>
          <div className="linksContainer d-flex mr-3">
            <ul className="mb-0 d-none d-lg-flex">
              {MenuItems.map((item,index) => {
                return(
                  <li key={index}>
                    <a href={item.url} className={item.cName}>{item.title}</a>
                  </li>
                )
              })}
            </ul>
            <div className="NavBtnContainer d-flex">
              <button type="button" className="btn btn-outline-primary schedule-btn mr-3"><span className="d-none d-lg-inline-block">Schedule A&nbsp;</span>Demo</button>
              <button type="button" className="btn btn-outline-secondary login-btn">Login</button>
            </div>
          </div>
        </nav>
        <nav className="NavbarItems MainContainer mobile-nav d-block d-lg-none">
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