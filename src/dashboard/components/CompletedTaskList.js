/*
*This file will display Completed task list inside calender
* Request URL=url/Calender
* Index=DCRDetails
* Request string={"index":"DCRDetails","Result":"0","TableName":"","ColumnName":"","Data":[{"year":"","month":"","Result":"1"}],"Token":""}
* Response string={
  DCRNo:166128
  DSCCode:D026312
  DSCName:AMIT HANDA 
  DSCType:Doctor
  Fscode:PSR010

  InclinicDiscussion

  ItemExplained:Product30
  ReportedDate:2019-08-01T00:00:00Z
  subareaName:NANDIGRAM
}
* Response Error={}
*/
import React, { Component } from "react";
import { Tabs, Tab } from "react-bootstrap";
import WeeklyTaskList from "./WeeklyTaskList";
import SelectedTaskList from "./SelectedTaskList";
import DatePicker from "react-datepicker";
import { startOfWeek, subWeeks, addDays, format } from "date-fns";
import { connect } from "react-redux";
import { getCompletedTask, getCompletedPlanList } from "../../actions/calendar";
import { postToServer } from "../../lib/comm-utils";

import SelectedPlanList from "./SelectedPlanList";

class CompletedTaskList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            key: "",
            showTodayDetails: true,
            completedTask: "",
            date: new Date(),
            planList: []
        };
        this.dateChanged = this.dateChanged.bind(this);
        this.showActiveKey = this.showActiveKey.bind(this);
        this.getCompletedList = this.getCompletedList.bind(this);
    }

    componentDidMount() {
        this.getCompletedList();

        const body = {
            Index: "CompletedList",
            completed_date: format(new Date(this.state.date), "YYYY-MM-DD")
        };
        this.props.getCompletedPlanList(body);
    }

    // static getDerivedStateFromProps(nextProps, prevState) {
    //     if (prevState.data !== nextProps.data) {
    //         // console.log(nextProps.data);
    //         return { ...prevState, data: nextProps.data };
    //     }
    //     if (prevState.toggleHeader !== nextProps.toggleHeader)
    //         return { ...prevState, toggleHeader: nextProps.toggleHeader };
    //     return null;
    // }

    dateChanged(d) { 
        this.setState({
            date: d,
            key: "",
            showTodayDetails: true
        });

        const body = {
            Index: "CompletedList",
            completed_date: format(new Date(d), "YYYY-MM-DD")
        };
       
        this.props.getCompletedPlanList(body);

        var data = {
            index: "DCRDetails",
            Result: "0",
            TableName: "",
            ColumnName: ""
           
        };
        this.props.getCompletedTask(data);
    }

    showActiveKey(key) {
        // var weekStartDate = startOfWeek(new Date(2019, 4, 9)); //For the particular date data is there
        var weekStartDate = startOfWeek(new Date());
        var weekEndDate = addDays(weekStartDate, 6);
        var prevWeekEndDate = subWeeks(weekEndDate, 1);

        this.setState({
            key,
            showTodayDetails: false,
            weekEndDate,
            prevWeekEndDate
        });
    }

    getCompletedList() {
        var data = {
            index: "DCRDetails",
            Result: "0",
            TableName: "",
            ColumnName: ""
           
        };
        this.props.getCompletedTask(data);
    }

    render() {
        // console.log(this.props.completedPlans, "chcf");
        return (
            <div className="weeklyTask">
                <div className="currDateSection">
                    {format(this.state.date, "Do")}
                    <span className="monthPad">
                        {format(this.state.date, "MMMM")}
                    </span>
                    {format(this.state.date, "YYYY")}
                    <img
                        src="../public/assets/images/play-button.svg"
                        className="playBtn"
                    />
                    <div className="datepickerAligment completed-task-celendar">
                        <DatePicker
                            selected={this.state.date}
                            onChange={this.dateChanged}
                        />
                    </div>
                </div>

                <Tabs
                    id="controlled-tab-example"
                    activeKey={this.state.key}
                    onSelect={key => this.showActiveKey(key)}
                >
                    <Tab eventKey="thisWeek" title="This Week">
                        {this.state.key == "thisWeek" ? (
                            <div className="weeklyTask-line">
                                <WeeklyTaskList
                                    endDate={this.state.weekEndDate}
                                />
                            </div>
                        ) : null}
                    </Tab>
                    <Tab eventKey="prevWeek" title="Previous Week">
                        {this.state.key == "prevWeek" ? (
                            <div className="weeklyTask-line">
                                <WeeklyTaskList
                                    endDate={this.state.prevWeekEndDate}
                                />
                            </div>
                        ) : null}
                    </Tab>
                </Tabs>

                {this.state.showTodayDetails ? (
                    <div className="weeklyTask-line">
                        <SelectedPlanList
                            planList={this.props.completedPlans}
                        />
                        <SelectedTaskList
                            selectedDate={this.state.date}
                            planList={this.props.completedTask}
                        />
                    </div>
                ) : null}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    completedTask: state.Calendar.completedTask,
    completedPlans: state.Calendar.completedPlans
});

const mapDispatchToProps = dispatch => ({
    getCompletedTask: data => dispatch(getCompletedTask(data)),
    getCompletedPlanList: data => dispatch(getCompletedPlanList(data))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CompletedTaskList);
