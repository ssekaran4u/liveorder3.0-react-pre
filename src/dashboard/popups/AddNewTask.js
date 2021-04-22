/*
*This code will display AddNewTask
* Request URL=url/TaskAdd
* Index=TaskType
* Request string={"Index":"TaskType","Token":""}
* Response string={
  c_taskName:Install the history server
  c_task_id:10
}
* Response Error={}





*Request URL=url/TaskAdd
*Index=1
*Request string:{"task_type_code":"","task_description":"","task_date":"","task_time":"","index":"1","Token":""}
*Response string=null
*Response Error={}


*/



import React, { Component } from "react";
import { Form, Modal, Button } from "react-bootstrap";

import DatePicker from "react-datepicker";
import { Dropdown } from "semantic-ui-react";
import { options } from "../../testdata/missedreport";
import { format } from "date-fns";
import { AddnewTask, AddnewPlannedTask } from "../../actions/calendar";
import { connect } from "react-redux";
import { postToServer } from "../../lib/comm-utils";

class AddNewTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            showTaskModal: true,
            desc: "",
            taskTypeList: [],
            selectedType: "",
            showButton:false,
            msg:'',
            time:''
        };
        this.hideTaskModal = this.hideTaskModal.bind(this);
        this.dateChanged = this.dateChanged.bind(this);
        this.timeChanged = this.timeChanged.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTaskChange = this.handleTaskChange.bind(this);
    }

    componentDidMount() {
        const body = {
            Index: "TaskType"
        };
        postToServer("TaskAdd", body).then(response => {
            let taskTypeList = [];
            response.data.map(list => {
                let taskList = {
                    key: list.c_task_id,
                    text: list.c_taskName,
                    value: list.c_task_id
                };
                taskTypeList.push(taskList);
            });
            // console.log(response.data, taskType, "TaskType1");
            this.setState({
                taskTypeList: taskTypeList
            });
        });
    }

    hideTaskModal() {
        this.setState({
            showTaskModal: false,
            
        });
    }

    handleTaskChange(e,data) { 
         console.log(data.value, "value");
       this.setState({
            selectedType: data.value,
                
        });
        
       
    }

    dateChanged(d) {
        this.setState({ date: d });
    }

    timeChanged(d) { 
        this.setState({ time: d });
    }

    handleChange(e) {
        const val = e.target.value
     
            this.setState({
                showButton:true,
                desc: val,
              
            })
        
    }

    handleSubmit() { 
        var time
        var date = this.state.date ? format(this.state.date, "YYYY-MM-DD") : "";

        var d = new Date()
        var currDate =d.getFullYear()+"-"+d.getMonth()+"-"+d.getDate()
        var now = new Date();
        var idate = date.split("-");
        idate = new Date(idate[0], idate[1] - 1, idate[2]).getTime();
        var diff  = parseInt(now.setHours(0,0,0,0)) - parseInt(idate)
       //console.log("time",now.setHours(0,0,0,0),idate,diff)
        if(this.state.time != "" ){
             time = this.state.date ? this.state.time.toLocaleTimeString() : "";
        }
        // if(this.state.desc){
        //     let  a = this.state.desc.split(" ");console.log("a",a)
        //     if(a.length >=5){
                
        //     }
        // }
        //console.log("time",this.state.time,this.state.date)
       
        if(this.state.selectedType == ""){
            this.setState({
                msg:"Please Enter Type"
            })
           
        }if(time != undefined && date == ""){ 
            this.setState({
                msg:"Please Enter Date"
            })
            return null
        }else if(date && !time ){ 
                this.setState({
                    msg:"Please Enter Time"
                })
                
        }else if(this.state.desc == ""){
                this.setState({
                    msg:"Please Enter Description"
             })
        }else{
            let  a = this.state.desc.split(" ");
            if(diff > 0 ){
                this.setState({
                    msg:"please Select Future or Current date"
                }) 
            }else if(a.length < 5){
                this.setState({
                    msg:"please Enter Min 5 Words"
                 })
           // }
            // if(a.length <=5){
            //      this.setState({
            //        msg:"please Enter Min 5 Words"
            //     })    
            // }if(diff > 0 ){
            //     this.setState({
            //         msg:"please Select Future or Current date"
            //     }) 
            }else{
                // if(this.state.desc !="" && this.state.selectedType != "" ){
                    var data = {
                        Token: "",
                        task_type_code: this.state.selectedType,
                        task_description: this.state.desc,
                        task_date: date,
                        task_time: time,
                        index: "1"
                    };
                    if (!date && !time) {
                        this.props.AddnewTask(data);
                    } else {
                        this.props.AddnewPlannedTask(data);
                    }
                        this.props.closeModal();
                    // }
            }
        }
        
    }

    render() {
        const { taskTypeList } = this.state;
        return (
            <div>
                <Modal size="lg" show={this.props.showNewTaskModal} centered>
                    <Modal.Header className="plan-this-task">
                        <Modal.Title className="modalTitle">
                            ADD A NEW TASK
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
                                    What you want to do
                                    <span className="colorRed">*</span>
                                </Form.Label>
                                {taskTypeList ? (
                                    <Dropdown
                                        placeholder="Select your work type"
                                        className="customized-input"
                                        fluid
                                        selection
                                        options={taskTypeList}
                                        value={this.state.selectedType} 
                                        onChange={this.handleTaskChange}
                                    />
                                ) : null}
                            </div>
                            <Form.Group className="m-0 mb-2 padd48">
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
                            </Form.Group>
                            <div className="padd48 padBottom28">
                                <Form.Label className="customized-label">
                                    Description
                                    <span className="colorRed">*</span>
                                </Form.Label>
                                <Form.Control
                                    required
                                    as="textarea"
                                    rows="3"
                                    placeholder="Add message here"
                                    className="popup-textbox"
                                    value={this.state.desc}
                                    onChange={this.handleChange}
                                />
                            </div>
                                <div className="errorMsg">{this.state.msg ? this.state.msg : ''}</div>
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

const MapDispatchToProps = dispatch => ({
    AddnewTask: data => dispatch(AddnewTask(data)),
    AddnewPlannedTask: data => dispatch(AddnewPlannedTask(data))
});

export default connect(
    null,
    MapDispatchToProps
)(AddNewTask);
