import React, { Component } from "react";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import VisitDetails from "./VisitDetails";

import { connect } from "react-redux";

class PlannedTaskList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            key2: "Last 3 Visit Details",
            visitShowDetails: false
        };
        this.handleVisit = this.handleVisit.bind(this);
        this.closeVisitbar = this.closeVisitbar.bind(this);
    }

    handleVisit() {
        this.setState({
            visitShowDetails: true
        });
    }

    closeVisitbar() {
        this.setState({
            visitShowDetails: false
        });
    }
    showLocation(areaname){
        window.open('https://www.google.com/maps/place/' + areaname, '_blank');
      }
    render() {
        const { taskList, completedTask } = this.props;
       //console.log("test",taskList)
       const d =  new Date()
       const todaydate = (d.getMonth()+1)+'/'+(d.getDate())+'/'+(d.getFullYear())
       
       var b = new Date(taskList['PlannedDate'])
       const plandate =   (b.getMonth()+1)+'/'+(b.getDate())+'/'+(b.getFullYear())
       
      // console.log(taskList,'cal')
   // var date = new Date(taskList['PlannedDate']);console.log("pdate",date.getMonth())
        if (!taskList) return null;
        return (
            <div>
                <div className="plan-list">
                    <div className="planning-sec">
                        <div className="fst-sec">
                            {taskList.C_doc_ftime_meet == ""  ? <p> 00:00 </p>: <p>{taskList.C_doc_ftime_meet}</p>}
                        </div>
                        <div className="second-sec">
                            <p>
                                Meeting with{" "}
                                {taskList["DSCType"] == "Doctor" ? (
                                    <Link
                                        to={"/profile/" + taskList["DSC Code"]}
                                        className="doctorname"
                                    >
                                        {taskList["DSC Name"]}
                                    </Link>
                                ) : taskList["DSCType"] == "Chemist" ? (
                                    <Link
                                        to={
                                            "/ChemistProfile/" +
                                            taskList["DSC Code"]
                                        }
                                        className="doctorname"
                                    >
                                        {taskList["DSC Name"]}
                                    </Link>
                                ) : taskList["DSCType"] == "Stockist" ? (
                                    <Link
                                        to={
                                            "/StockiestProfile/" +
                                            taskList["DSC Code"]
                                        }
                                        className="doctorname"
                                    >
                                        {taskList["DSC Name"]}
                                    </Link>
                                ) : (
                                    ""
                                )}{" "}
                                in{" "}
                                <span className="doctorname">
                                    {taskList["SubareaName"]}
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className="btn-panel">
                        <button className="direction-btn" onClick={()=>this.showLocation(taskList["SubareaName"])}>
                            <img src="../public/assets/images/direction.svg" />
                        </button>
                        <button className="plan-btn" onClick={this.handleVisit}>
                            Visit Details
                        </button>
                       {plandate ==  todaydate ?
                        <button className="plan-btn">
                            <Link
                                to={
                                    "/visit-preparation/" + taskList["DSC Code"]
                                }
                            >
                                Visit Prep.
                            </Link>
                        </button> : '' }
                         
                        
                        {/* <Form.Check 
                            custom
                            type="checkbox"
                            id={"checkbox" + taskList.id}
                            label=""
                            className="visitCheckbox"
                        /> */}
                    </div>
                </div>

                <div
                    className={
                        this.state.visitShowDetails == true
                            ? "visit-sidebar opened"
                            : "visit-sidebar"
                    }
                >
                    { this.state.visitShowDetails ? <VisitDetails
                        DSCName={taskList["DSC Name"]}
                        visitDetail={completedTask}
                        closeBar={this.closeVisitbar}
                        docCode={taskList["DSC Code"]}
                    /> : null }
                </div>
            </div>
        );
    }
}

const MapStateToProps = state => ({
    completedTask: state.Calendar.completedTask
});

export default connect(MapStateToProps)(PlannedTaskList);
