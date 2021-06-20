import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

import { MenuItems } from "./MenuItems";
import logo from "../../Images/Logo.svg";
// import ScheduleADemo from "../ScheduleADemo/ScheduleADemo";

class Navbar extends Component {
  render() {
    return (
      <div className="NavbarContainer">
        <nav className="NavbarItems MainContainer">
          <Link to="/">
            <img src={logo} alt="Live Order" className="logo" />
          </Link>
          <div className="linksContainer d-flex mr-3">
            <ul className="mb-0 d-none d-lg-flex">
              {MenuItems.map((item, index) => {
                return (
                  <li key={index}>
                    <Link
                      to={item.url}
                      className={
                        window.location.pathname === `/${item.url}`
                          ? `navbar-highlight ${item.cName}`
                          : item.cName
                      }
                    >
                      {item.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="NavBtnContainer d-flex">
              <button
                type="button"
                className="btn btn-outline-primary schedule-btn"
                onClick={() => this.props.schedulerModalHandler(true)}
              >
                <span className="d-none d-lg-inline-block">
                  Schedule A&nbsp;
                </span>
                Demo
              </button>
              <button type="button" className="btn login-btn">
                Login
              </button>
            </div>
          </div>
        </nav>
        <nav className="NavbarItems MainContainer mobile-nav d-block d-lg-none">
          <ul className="mb-0 pl-0">
            {MenuItems.map((item, index) => {
              return (
                <li key={index}>
                  <Link
                    to={item.url}
                    className={
                      window.location.pathname === `/${item.url}`
                        ? `navbar-highlight ${item.cName}`
                        : item.cName
                    }
                  >
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* <ScheduleADemo
          scheduleDemoHandler={this.scheduleDemoHandler}
          scheduleDataHandler={this.scheduleDataHandler}
          isOpen={this.state.showSchedulerModal}
        /> */}
      </div>
    );
  }
}

export default Navbar;
