import React, { Component } from "react";
import "./Navbar.css";

import { MenuItems } from "./MenuItems";
import logo from "../../Images/Logo@3x.png";
import ScheduleADemo from "../ScheduleADemo/ScheduleADemo";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSchedulerModal: false,
      schedulerData: {
        firmName: "",
        ownerName: "",
        phone: "",
        pinCode: "",
        description: "",
        isSeller: false,
      },
    };
    this.scheduleDemoHandler = this.scheduleDemoHandler.bind(this);
    this.scheduleDataHandler = this.scheduleDataHandler.bind(this);
  }

  scheduleDemoHandler() {
    this.setState((prev) => ({
      showSchedulerModal: !prev.showSchedulerModal,
      schedulerData: {
        firmName: "",
        ownerName: "",
        phone: "",
        pinCode: "",
        description: "",
        isSeller: false,
      },
    }));
  }

  scheduleDataHandler(data) {
    this.setState(
      {
        schedulerData: data,
      },
      () => console.log(this.state.schedulerData)
    );
  }

  render() {
    return (
      <div className="NavbarContainer">
        <nav className="NavbarItems MainContainer">
          <a href="/">
            <img src={logo} alt="Live Order" className="logo" />
          </a>
          <div className="linksContainer d-flex mr-3">
            <ul className="mb-0 d-none d-lg-flex">
              {MenuItems.map((item, index) => {
                return (
                  <li key={index}>
                    <a href={item.url} className={item.cName}>
                      {item.title}
                    </a>
                  </li>
                );
              })}
            </ul>
            <div className="NavBtnContainer d-flex">
              <button
                type="button"
                className="btn btn-outline-primary schedule-btn"
                onClick={this.scheduleDemoHandler}
              >
                <span className="d-none d-lg-inline-block">
                  Schedule A&nbsp;
                </span>
                Demo
              </button>
              <button
                type="button"
                className="btn btn-outline-primary login-btn"
              >
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
                  <a href={item.url} className={item.cName}>
                    {item.title}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
        {this.state.showSchedulerModal && (
          <ScheduleADemo
            scheduleDemoHandler={this.scheduleDemoHandler}
            scheduleDataHandler={this.scheduleDataHandler}
          />
        )}
      </div>
    );
  }
}

export default Navbar;
