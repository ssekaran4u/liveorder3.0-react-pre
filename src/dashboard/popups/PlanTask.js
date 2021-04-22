/*
* This code includes PlannedTask details
* Request URL=url/TaskAdd
* Index=2
* Request string:{"task_type_code":"","task_description":"","task_date":"","task_time":"","index":"2","Token":""}
* Response string=null
* Response Error={}



*/






import React, { Component } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import { format } from "date-fns";
import DatePicker from "react-datepicker";

import { moveToPlannedTask } from "../../actions/calendar";
import { connect } from "react-redux";

class PlanTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            msg:'',
            date:'',
            time:''
        };
        this.dateChanged = this.dateChanged.bind(this);
        this.timeChanged = this.timeChanged.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        var taskId = this.props.taskId;
        var desc = this.props.desc;
        //var date = format(this.state.date, "YYYY-MM-DD");
        var date = this.state.date ? format(this.state.date, "YYYY-MM-DD") : "";
        var time = this.state.time ? this.state.time.toLocaleTimeString():'';
        var now = new Date();
        var idate = date.split("-");
        idate = new Date(idate[0], idate[1] - 1, idate[2]).getTime();
        var diff  = parseInt(now.setHours(0,0,0,0)) - parseInt(idate)
        if(diff  > 0){
            this.setState({
                msg:"please Select Future or Current date"
            }) 
        }else if(!date){
            this.setState({
                msg:"Please Enter Date"
            })
        }else if(date && !time){
            this.setState({
                msg:"Please Enter Time"
            })
        }else{

        var data = {
            Token: "",
            task_type_code: "",
            task_description: desc,
            task_date: date,
            task_time: time,
            task_id: taskId,
            index: "2"
        };
    

        this.props.moveToPlannedTask(data);
        this.props.closeModal();
        this.setState({
            date:'',
            time:'',
            msg:''
        })
    }
    }

    dateChanged(d) {
        this.setState({ date: d });
    }

    timeChanged(d) {
        this.setState({ time: d });
    }

    render() {
        return (
            <div>
                <Modal
                    size="lg"
                    show={this.props.showPlanModal}
                    onHide={this.handleClose}
                    centered
                >
                    <Modal.Header className="plan-this-task">
                        <Modal.Title className="modalTitle">
                            PLAN THE TASK
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
                        <Form.Group className="m-0 mb-2 paddTsk48">
                                <Form.Label className="customized-label">
                                    Date & Time
                                </Form.Label>
                                <div className="datepickerAligment">
                                    <DatePicker
                                        selected={this.state.date}
                                        onChange={this.dateChanged}
                                        dateFormat="d/MM/yyyy"
                                        placeholderText="Select Date"
                                    />
                                    <DatePicker
                                        selected={this.state.time}
                                        onChange={this.timeChanged}
                                        showTimeSelect
                                        showTimeSelectOnly
                                        timeIntervals={15}
                                        dateFormat="h:mm aa"
                                        timeCaption="Time"
                                        placeholderText="Select Time"
                                    />
                                </div>
                                <div className="planerrorMsg">{this.state.msg ? this.state.msg : ''}</div>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer className="plan-this-task">
                        <Button
                            variant="secondary"
                            onClick={this.props.closeModal}
                            className="cancelBtn"
                            
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="primary"
                            onClick={this.handleSubmit}
                            className="planBtn"
                        >
                            Move To Planned List
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

const MapDispatchToProps = dispatch => ({
    moveToPlannedTask: data => dispatch(moveToPlannedTask(data))
});

export default connect(
    null,
    MapDispatchToProps
)(PlanTask);
