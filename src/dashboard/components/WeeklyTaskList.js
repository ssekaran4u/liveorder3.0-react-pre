/*
* This code will display Weeklytasklist
* Request URL=url/TaskAdd
* Index=Completed Task
* Request string={"Index":"CompletedList","completed_date":"2019-08-26","Token":""}
}
* Resonse Error={}




*/


import React, { Component } from "react";
import { connect } from "react-redux";
import { subDays, format, isToday } from "date-fns";
import { Link } from "react-router-dom";
import { postToServer } from "../../lib/comm-utils";

/* 
    * This file containes public class WeeklyTaskList and the private class TaskList
    * WeeklyTaskList component filters the completed task based on the date range
    and filtered data render using TaskList component
*/

class WeeklyTaskList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let date = this.props.endDate;
        let completedTask = this.props.completedTask;

        let task = [];

        for (var i = 0; i < 7; i++) {
            let taskList = [];
            let VisitDetails = {};

            if (completedTask) {
                completedTask.map(list => {
                    if (
                        date.toLocaleDateString() ==
                        new Date(list.ReportedDate).toLocaleDateString()
                    ) {
                        taskList.push(list);
                    }
                });

                taskList.map(item => {
                    VisitDetails[item.DSCCode] = {
                        time: item.ReportedDate.split('T').pop().split('Z')[0],
                        isToday: isToday(new Date(item.ReportedDate)),
                        DSCName: item.DSCName,
                        DSCCode: item.DSCCode,
                        subArea: item.subareaName,
                        DCRNo: item.DCRNo,
                        dtime: item.dtime,
                        type:item.DSCType
                    };
                   
                });
            }

            let dateList = {
                date: date
            };

            task.push(
                <TaskList
                    key={i}
                    dateList={dateList}
                    VisitDetails={VisitDetails}
                />
            );
            date = subDays(date, 1);
        }
        if (!completedTask) return null;
        // else if (Object.keys(task).length === 0)
        //     return (
        //         <div>
        //             <p className="no-result-text">No data Found</p>
        //         </div>
        //     );
        return <div>{task}</div>;
    }
}

class TaskList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            planList: []
        };
    }
    componentDidMount() {
        const body = {
            Index: "CompletedList",
            completed_date: format(
                new Date(this.props.dateList.date),
                "YYYY-MM-DD"
            )
        };
        postToServer("TaskAdd", body).then(response => {
            this.setState({
                planList: response.data
            });
        });
    }
    render() {
        const { planList } = this.state;
        const { dateList, VisitDetails } = this.props;

        if (
            (!planList || planList.length == 0) &&
            (!VisitDetails || Object.keys(VisitDetails).length == 0)
        )
            return null;
        return (
            <div>
                <div className="mt-3 currDateSection">
                    {format(dateList.date, "Do")}
                    <span className="monthPad">
                        {format(dateList.date, "MMMM")}
                    </span>{" "}
                    {format(dateList.date, "YYYY")}
                </div>
                <div>
                    {planList.map((list, index) => (
                        <div className="todayDetails" key={index}>
                            <div className="weekInfoDiv">
                                <div className="weekInfoTime">{list.task_time}</div>
                                <div className="week-info-details">
                                    <p>{list.c_task_description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div id="thisWeek" className="thisWeekDet">
                    <div>
                        {Object.keys(VisitDetails).map((item, i) => (
                            <div className="weekInfoDiv" key={i}>
                                <div className="weekInfoTime">
                                    {VisitDetails[item]["dtime"]}
                                </div>
                                <div className="week-info-details">
                                    <p>
                                        Meeting with{" "}
                                        <Link
                                            to={VisitDetails[item]["type"] == "DOCTOR" ? "/profile/" + VisitDetails[item]["DSCCode"] : 
                                            VisitDetails[item]["type"] == "CHEMIST" ?  "/ChemistProfile/" + VisitDetails[item]["DSCCode"] :
                                            VisitDetails[item]["type"] == "STOCKIST" ?  "/StockiestProfile/" + VisitDetails[item]["DSCCode"] :''
                                            }
                                            className="doctorname"
                                        >
                                            {VisitDetails[item]["DSCName"]}
                                        </Link>{" "}
                                        in{" "}
                                        <span className="doctorname">
                                            {VisitDetails[item]["subArea"]}
                                        </span>
                                    </p>
                                    {VisitDetails[item]["isToday"] ? (
                                        <Link
                                            to={
                                                "/dcr-common/" +
                                                VisitDetails[item]["DCRNo"]
                                            }
                                            className="doctorname"
                                        >
                                            <div className="editCallBtn">
                                                Edit Call
                                            </div>
                                        </Link>
                                    ) : null}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    completedTask: state.Calendar.completedTask
});

export default connect(mapStateToProps)(WeeklyTaskList);
