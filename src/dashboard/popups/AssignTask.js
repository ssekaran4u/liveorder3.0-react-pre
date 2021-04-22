import React, { Component } from "react";
import { Form, Modal, Button } from "react-bootstrap";

import DatePicker from "react-datepicker";
import { Dropdown } from "semantic-ui-react";
import { options } from "../../testdata/missedreport";
import { format } from "date-fns";
import { AddnewTask, AddnewPlannedTask } from "../../actions/calendar";
import { connect } from "react-redux";
import { postToServer } from "../../lib/comm-utils";

class AssignTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showTaskModal: true,
            desc: "",
            taskTypeList: [],
            selectedType: ""
        };
        this.dateChanged = this.dateChanged.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTaskChange = this.handleTaskChange.bind(this);
    }

    // componentDidMount() {
    //     const body = {
    //         Index: "TaskType"
    //     };
    //     postToServer("TaskAdd", body).then(response => {
    //         let taskTypeList = [];
    //         response.data.map(list => {
    //             let taskList = {
    //                 key: list.c_task_id,
    //                 text: list.c_taskName,
    //                 value: list.c_task_id
    //             };
    //             taskTypeList.push(taskList);
    //         });
    //         // console.log(response.data, taskType, "TaskType1");
    //         this.setState({
    //             taskTypeList: taskTypeList
    //         });
    //     });
    // }

    handleTaskChange({ value }) {
        this.setState({
            selectedType: value
        });
    }

    dateChanged(d) {
        this.setState({ date: d });
    }

    handleChange(e) {
        this.setState({
            desc: e.target.value
        });
    }

    handleSubmit() {
        var date = this.state.date ? format(this.state.date, "YYYY-MM-DD") : "";
        // var data = {
        //     Token: this.state.selectedType,
        //     task_type_code: "",
        //     task_description: this.state.desc,
        //     task_date: date,
        //     task_time: time,
        //     index: "1"
        // };
        // if (!date) {
        //     this.props.AddnewTask(data);
        // } else {
        //     this.props.AddnewPlannedTask(data);
        // }
        this.props.closeModal();
    }

    render() {
        const { taskTypeList } = this.state;
        return (
            <div>
                <Modal size="lg" show={this.props.showAssignTaskModal} centered>
                    <Modal.Header className="plan-this-task">
                        <Modal.Title className="modalTitle">
                            ASSIGN A TASK
                            <span
                                className="modalCancelBtn"
                                onClick={this.props.closeModal}
                            >
                                <img src="../public/assets/images/cancel.png" />
                            </span>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="plan-this-task">
                        <Form>
                            <div className="singledropdown mb-2 paddTop24 padd48">
                                <Form.Label className="customized-label">
                                    To whom you want to assign task
                                    <span className="colorRed">*</span>
                                </Form.Label>
                                {taskTypeList ? (
                                    <Dropdown
                                        placeholder="Select your work type"
                                        className="customized-input"
                                        fluid
                                        selection
                                        options={options}
                                        onChange={this.handleTaskChange}
                                    />
                                ) : null}
                            </div>
                            <Form.Group className="m-0 mb-2 padd48">
                                <Form.Label className="customized-label">
                                    Completion Date
                                </Form.Label>
                                <div className="datepickerAligment">
                                    <DatePicker
                                        selected={this.state.date}
                                        onChange={this.dateChanged}
                                        dateFormat="d/MM/yyyy"
                                        placeholderText="Select Date"
                                    />
                                </div>
                            </Form.Group>
                            <div className="padd48 padBottom28">
                                <Form.Label className="customized-label">
                                    Task Description
                                </Form.Label>
                                <Form.Control
                                    required
                                    as="textarea"
                                    rows="3"
                                    placeholder="Write a task details here"
                                    className="popup-textbox"
                                    value={this.state.desc}
                                    onChange={this.handleChange}
                                />
                            </div>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer className="plan-this-task">
                        <Button
                            variant="secondary"
                            onClick={this.handleClose}
                            className="cancelBtn"
                            onClick={this.props.closeModal}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="primary"
                            className="planBtn"
                            onClick={this.handleSubmit}
                        >
                            Save
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

// const MapDispatchToProps = dispatch => ({
//     AddnewTask: data => dispatch(AddnewTask(data)),
//     AddnewPlannedTask: data => dispatch(AddnewPlannedTask(data))
// });

// export default connect(
//     null,
//     MapDispatchToProps
// )(AssignTask);

export default AssignTask;
