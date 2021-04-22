import React, { Component } from "react";

import PlanTask from "../popups/PlanTask";

class UnPlannedTaskList extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            key: "Unplanned",
            showModal: false,
            showTaskModal: false,
            taskId: ""
        };

        this.handleShowModal = this.handleShowModal.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleShowModal(e) {
        var id = e.target.id;
        var desc = e.target.name;

        this.setState({
            showModal: true,
            taskId: id,
            desc: desc
        });
    }

    handleClose() {
        this.setState({
            showModal: false
        });
    }

    render() {
         //console.log(this.props.unPlannedTask, "unPlannedTask");
        const { unPlannedTask } = this.props;

        if (
            !unPlannedTask ||
            unPlannedTask == undefined ||
            unPlannedTask.Status == "Fail"
        ) {
            return null;
        }
        return (
            <div>
                {unPlannedTask.map((item, i) => (
                    <div key={i}>
                        <div className="plan-list">
                            <p>{item.c_task_description}</p>
                            <div className="btn-panel">
                                {/* <button className="direction-btn">
                                    <img src="../public/assets/images/direction.svg" />
                                </button> */}
                                <button
                                    className="plan-btn"
                                    id={item.n_task_id}
                                    name={item.c_task_description}
                                    onClick={this.handleShowModal}
                                >
                                    Plan This Task
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
                <PlanTask
                    taskId={this.state.taskId}
                    desc={this.state.desc}
                    showPlanModal={this.state.showModal}
                    closeModal={this.handleClose}
                />
            </div>
        );
    }
}
export default UnPlannedTaskList;
