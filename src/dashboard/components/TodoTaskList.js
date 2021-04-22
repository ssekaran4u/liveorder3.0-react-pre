/*
* This code will display PlannedTask,PrePlannedTask,UnPlannedTask
* Request URL=url/Calender
* Index=Mtpinfo
* Request string={"index":"Mtpinfo","Result":"0","TableName":"","ColumnName":"","Data":[{"year":"2018","month":"7","Result":"1"}],"Token":""}
* Response string={
    DSC Code:"D060885"
    DSC Name:"ARUP ROY"
    DSCType:"Doctor"
    Latitude:""	
    Logitute:""	
    MTPNo:"4446"
    PlannedDate:"2019-08-21 00:00:00.000"
    SubareaName:"BRAJALALCHAK"
}
* Response Error={}



*Request URL=url/TaskAdd
*Index=3
*Request string={"task_type_code":"","task_description":"","task_date":"","task_time":"","index":"3","Token":""}
*Response string=null
*Response Error={}

}



*/
import React, { Component } from "react";
import { Tabs, Tab } from "react-bootstrap";
import UnPlannedTaskList from "./UnPlannedTaskList";
import PrePlannedTask from "./PrePlannedTask";
import PlannedTaskList from "./PlannedTaskList";
import AddNewTask from "../popups/AddNewTask";
import AssignTask from "../popups/AssignTask";
import AddButtonDropdown from "./AddButtonDropdown";
import { connect } from "react-redux";
import {
    getPlannedTask,
    getPrePlannedTask,
    getUnPlannedTask
} from "../../actions/calendar";
import AssignedTaskList from "./AssignedTaskList";

import "react-datepicker/dist/react-datepicker.css";
import "../../../public/assets/css/bootstrap.min.css";
import "../../../public/assets/css/style.css";
import "../../../public/assets/css/responsive.css";

class TodoTaskList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            key: "Planned",
            isChecked: true,
            showTaskModal: false,
            showAssignTaskModal: false,
            plannedTask: "",
            unPlannedTask: "",
            prePlannedTask: "",
            PlannedCount: ""
        };
        this.handleNewTask = this.handleNewTask.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.getUnPlanTask = this.getUnPlanTask.bind(this);
        this.getPlanTask = this.getPlanTask.bind(this);
        this.getPrePlanTask = this.getPrePlanTask.bind(this);
        this.planList = this.planList.bind(this);
        this.handleAssignTask = this.handleAssignTask.bind(this);
    }

    componentDidMount() {

      
        this.getUnPlanTask();
        this.getPlanTask();
        this.getPrePlanTask();
    }

    componentDidUpdate(nextProps, prevState) {
        if (nextProps.selectedDate != this.props.selectedDate) {
            this.getUnPlanTask();
            this.getPlanTask();
            this.getPrePlanTask();
        }
    }
    

    getUnPlanTask() {
        var data = {
            task_type_code: "",
            task_description: "",
            task_date: "",
            task_time: "",
            index: "3"
        };
        this.props.getUnPlannedTask(data);
    }

    getPrePlanTask() {
        var data = {
            task_type_code: "",
            task_description: "",
            // task_date: "2019-05-25", //This date have planned task data
            task_date: this.props.selectedDate,
            task_time: "",
            index: "3"
        };
        this.props.getPrePlannedTask(data);
    }

    getPlanTask() {
        var d = new Date();
        const year = d.getFullYear()
        const month = d.getMonth()+1
        var data = {
            index: "Mtpinfo",
            Result: "0",
            TableName: "",
            ColumnName: "",
            Data: [
                {
                    year: year,
                    month: month,
                    Result: "1"
                }
            ]
        };
        this.props.getPlannedTask(data);
      
    }

    handleNewTask() {
        this.setState({
            showTaskModal: true
        });
    }

    handleAssignTask() {
        this.setState({
            showAssignTaskModal: true
        });
    }

    handleClose() {
        this.setState({ showTaskModal: false, showAssignTaskModal: false });
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.unPlannedTask != prevState.unPlannedTask) {
            return { ...prevState, unPlannedTask: nextProps.unPlannedTask };
        }
        if (nextProps.prePlannedTask != prevState.prePlannedTask) {
            return { ...prevState, prePlannedTask: nextProps.prePlannedTask };
        }
        if (nextProps.plannedTask != prevState.plannedTask) {
            return { ...prevState, plannedTask: nextProps.plannedTask };
        }
        return prevState;
    }

    planList() {

        //console.log(this.state.plannedTask,'ddddd')
        const task = [];

        if (this.state.plannedTask && this.state.plannedTask["Status"] != "Fail") {
            this.state.plannedTask.map((list, index) => {
                let pdate = list.PlannedDate
                
         
                var curent=new Date(this.props.selectedDate).toLocaleDateString()
               
                if(curent=="Invalid Date"){
                    var curent1 = new Date();
                    curent=  new Date().toLocaleDateString()
                }
                if ( new Date(list.PlannedDate).toLocaleDateString() == curent )  {      
                const newList = {
                        id: index,
                        time: pdate.substr(11, 8),
                        ...list
                    };

                 //   console.log(newList,list,'dddd')
                    task.push(
                        <PlannedTaskList taskList={newList} key={index} />
                    );
                }
            });
        }
        

        return (
            <Tab
                eventKey="Planned"
                title={
                    <div className="dis-flex">
                        Planned{" "}
                        <span className="badgeTab">
                            {task.length +
                                (this.state.prePlannedTask
                                    ? this.state.prePlannedTask.length
                                    : 0)}
                        </span>
                    </div>
                }
            >
                {this.state.prePlannedTask && (
                    <PrePlannedTask
                        prePlannedTask={this.state.prePlannedTask}
                    />
                )}
                {task}
            </Tab>
        );
    }

    render() {
        // console.log("selectedDate", this.props.selectedDate);
        return (
            <div>
                <AddButtonDropdown
                    showModal={this.handleNewTask}
                    showAssignTask={this.handleAssignTask}
                />
                { this.state.showTaskModal && <AddNewTask
                    showNewTaskModal={this.state.showTaskModal}
                    closeModal={this.handleClose}
                /> }
                <AssignTask
                    showAssignTaskModal={this.state.showAssignTaskModal}
                    closeModal={this.handleClose}
                />
                <div className="upcomingTask cal-scrollbar">
                    <Tabs
                        id="controlled-tab-example"
                        className="todo-tasklist"
                        activeKey={this.state.key}
                        onSelect={key => this.setState({ key })}
                    >
                       
                        {this.planList()}





                        <Tab
                            eventKey="Unplanned"
                            title={
                                <div className="dis-flex">
                                    Unplanned{" "}
                                    <span className="badgeTab">
                                        {this.state.unPlannedTask
                                            ? this.state.unPlannedTask.length
                                            : 0}
                                    </span>
                                </div>
                            }
                        >
                            {this.state.unPlannedTask ? (
                                <UnPlannedTaskList
                                    unPlannedTask={this.state.unPlannedTask}
                                />
                            ) : null}
                        </Tab>
                        {/* <Tab
                            eventKey="AssignTask"
                            title={
                                <div className="dis-flex">
                                    AssignedTask{" "}
                                    <span className="badgeTab">3</span>
                                </div>
                            }
                        >
                            <AssignedTaskList />
                        </Tab> */}
                    </Tabs>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    plannedTask: state.Calendar.plannedTask,
    unPlannedTask: state.Calendar.unPlannedTask,
    prePlannedTask: state.Calendar.prePlannedTask
});

const mapDispatchToProps = dispatch => ({
    getUnPlannedTask: data => dispatch(getUnPlannedTask(data)),
    getPrePlannedTask: data => dispatch(getPrePlannedTask(data)),
    getPlannedTask: data => dispatch(getPlannedTask(data))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoTaskList);
