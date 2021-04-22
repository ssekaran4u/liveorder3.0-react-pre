import React, { Component } from "react";
import { Tabs, Tab } from "react-bootstrap";

import TodoTaskList from "./TodoTaskList";
import TodayEvents from "./TodayEvents";
import CompletedTaskList from "./CompletedTaskList";
import Calendar from "./Calendar";
import { connect } from "react-redux";

class ActivityManger extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            key: "to-do-list",
            isFull: false,
            calendarView: false
        };
        this.handleView = this.handleView.bind(this);
        this.toggleCalendarView = this.toggleCalendarView.bind(this);
    }

    handleView() {
        this.setState({
            isFull: !this.state.isFull
        });
    }

    toggleCalendarView() {
        this.setState({
            calendarView: !this.state.calendarView
        });
    }

    render() {
        return (
            <div>
                <div
                    className="calendar-mobile"
                    onClick={this.toggleCalendarView}
                >
                    <img src="../public/assets/images/calendar.svg" />
                </div>
                <div
                    className={
                        this.state.calendarView
                            ? "calendar-control  active"
                            : "calendar-control "
                    }
                >
                    <div
                        className={
                            this.state.isFull
                                ? "fullscreenView"
                                : "right-sidebar"
                        }
                    >
                        <div className="relative">
                            <Tabs
                                className="sidebar-nav"
                                activeKey={this.state.key}
                                onSelect={key => this.setState({ key })}
                            >
                                <Tab eventKey="to-do-list" title="To do list">
                                    <div className="">
                                        <Calendar />
                                        <TodoTaskList
                                            selectedDate={
                                                this.props.selectedDate
                                            }
                                        />
                                        <TodayEvents />
                                    </div>
                                </Tab>
                                <Tab eventKey="completed" title="Completed">
                                    <div className="weekly-tasklist cal-scrollbar">
                                        <CompletedTaskList />
                                    </div>
                                </Tab>
                            </Tabs>
                            <div className="sidebar-fullscreen">
                                {this.state.isFull ? (
                                    <img
                                        src="../public/assets/images/collapse.svg"
                                        alt="fullscreen-img"
                                        onClick={this.handleView}
                                    />
                                ) : (
                                    <img
                                        src="../public/assets/images/fullscreen-white.svg"
                                        alt="fullscreen-img"
                                        onClick={this.handleView}
                                    />
                                )}
                            </div>
                            <div className="calendar-close">
                                <img
                                    src="../public/assets/images/cancel-white.svg"
                                    alt="fullscreen-img"
                                    onClick={this.toggleCalendarView}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    selectedDate: state.Calendar.selectedDate
});

export default connect(mapStateToProps)(ActivityManger);
