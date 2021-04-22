/*
* This code will display preplanned task inside calender
* Request URL=url/TaskAdd
* Index=CompletedList
* Request string={"Index":"CompletedList","completed_date":"2019-08-26","Token":""}
* Response string= null
* Response Error={}


*Request URL=url/TaskAdd
*Index=3
*Request string={"task_type_code":"","task_description":"","task_date":"2019-08-26","task_time":"","index":"3","Token":""}
*Response string=null
*Response Error={}

*/



import React, { Component } from "react";

import { Form } from "react-bootstrap";
import { connect } from "react-redux";
import { updateToCompleted } from "../../actions/calendar";

class PrePlannedTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            option: []
        };
        this.completeTask = this.completeTask.bind(this);
    }
    completeTask(event) {
        const { checked, id } = event.target;
        const { option } = this.state;
        if (checked) {
            option[id] = "yes";
            this.setState({ option: option });
        } else {
            option[id] = "no";
            this.setState({ option: option });
        }

        let data = {
            Index: "TaskCompleted",
            task_id: event.target.id
        };
        this.props.updateToCompleted(data);
    }

    render() {
        const { prePlannedTask } = this.props;
        // console.log(prePlannedTask);
        if (!prePlannedTask || prePlannedTask == undefined) return null;
        return (
            <div>
                {prePlannedTask.map((item, i) => (
                    <div className="plan-list" key={i}>
                        <div className="planning-sec">
                            <div className="fst-sec">
                                <p>{item.t_task_time}</p>
                            </div>
                            <div className="second-sec">
                                <p>{item.c_task_description}</p>
                            </div>
                        </div>
                        <div className="btn-panel">
                            {/* <button className="direction-btn">
                                <img src="../public/assets/images/direction.svg" />
                            </button> */}
                            <Form.Check
                                custom
                                type="checkbox"
                                id={item.n_task_id}
                                label=""
                                className="visitCheckbox"
                                checked={
                                    this.state.option[item.n_task_id] == "yes"
                                        ? "checked"
                                        : null
                                }
                                onChange={this.completeTask}
                            />
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    updateToCompleted: data => dispatch(updateToCompleted(data))
});

export default connect(
    null,
    mapDispatchToProps
)(PrePlannedTask);
