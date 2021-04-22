import React, { Component } from "react";
import { connect } from "react-redux";
import { isToday } from "date-fns";
import { Link } from "react-router-dom";

/* 
    * This file containes public class SelectedTaskList and the private class TaskList
    
    * SelectedTaskList component filters the completed task based on the selected date
    and filtered data render using TaskList component
*/

class SelectedTaskList extends Component {
    render() { 
        let date = this.props.selectedDate;
        let completedTask = this.props.completedTask;

        let taskList = [];
        let VisitDetails = {};

        if (completedTask) {
            completedTask.map(list => {
             let testdate=   new Date(list.ReportedDate)
                if (
                    date.toLocaleDateString() ==
                    testdate.toLocaleDateString()
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

        if (!completedTask) return null;
        else if (
            Object.keys(VisitDetails).length === 0 &&
            this.props.planList == undefined
        )
            return (
                <div>
                    <p className="no-result-text">
                        No Data Found For particular date
                    </p>
                </div>
            );
        return <TaskList VisitDetails={VisitDetails} />;
    }
}

class TaskList extends Component { 
    render() { 
        const { VisitDetails } = this.props;
        if (Object.keys(VisitDetails).length === 0) return null;
        return (
            <div>
                {Object.keys(VisitDetails).map((item, i) => ( 
                    <div className="todayDetails" key={i}>
                        <div className="weekInfoDiv">
                            <div className="weekInfoTime">
                                {VisitDetails[item]["dtime"]}
                            </div>
                            <div className="week-info-details">
                                <p>
                                    Meeting with{" "}
                                    <Link
                                        to={VisitDetails[item]["type"] == "DOCTOR" ? "/profile/"+VisitDetails[item]["DSCCode"] : 
                                            VisitDetails[item]["type"] == "CHEMIST" ? "/ChemistProfile/"  + VisitDetails[item]["DSCCode"] : 
                                            VisitDetails[item]["type"] == "STOCKIST" ? "/StockiestProfile/"+VisitDetails[item]["DSCCode"] :''
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
                    </div>
                ))}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    completedTask: state.Calendar.completedTask
});

export default connect(mapStateToProps)(SelectedTaskList);
