import React, { Component } from 'react';
import {Modal,Button,Row,Col,Form } from 'react-bootstrap';
import { Dropdown } from "semantic-ui-react";
import DatePicker from 'react-datepicker';

class AddAppointment extends Component {
    constructor(props){
        super(props);
        this.state = {
            show : true,
            date:new Date,
            data: []
        }
        this.onClose = this.onClose.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.dateChanged = this.dateChanged.bind(this);
        this.fromTimeChanged = this.fromTimeChanged.bind(this);
        this.toTimeChanged = this.toTimeChanged.bind(this);
    }

    fromTimeChanged(d) { 
        this.setState({ time: d });
    }

    toTimeChanged(d) { 
        this.setState({ time: d });
    }

    dateChanged(d){ 
  
        let seletdate = new Date(d);
        let dateforamt = seletdate.getFullYear()+"-"+(seletdate.getMonth()+1)+"-"+seletdate.getDate();
        
            this.setState({date: d});
            this.getDcrNo(dateforamt)
        }

    onClose(){
        this.setState({
            show:false
        }) 
     }
 
     closeModal(){
         this.props.hideDateModal(this.state.show)
     }
    render() {
        return (
            <React.Fragment>
                    <Modal size="lg" centered className="" show={this.state.show} onHide={this.onClose}>
                        <Modal.Header className="plan-this-task applyLeaveHeader ">
                            <Modal.Title className="modalTitle">
                                ADD DATE AND TIME
                                <span
                                    className="modalCancelBtn"
                                    onClick={this.closeModal}
                                >
                                    <img src="../public/assets/images/cancel.png" />
                                </span>
                            </Modal.Title>
                        </Modal.Header>

                        <Modal.Body className="plan-this-task">
                            <Form>
                                <Form.Group className="singledropdown mb-2 paddTop24 padd48 leavedatepick">
                                    <Form.Label className="customized-label">
                                        Date
                                    </Form.Label>
                                    <div className="datepickerAligment">
                                        <DatePicker
                                            selected={this.state.date}
                                            onChange={this.dateChanged}
                                            dateFormat="dd-MM-yyyy"
                                            placeholderText="dd-MM-yyyy"
                                        />
                                    </div>   
                                </Form.Group>

                                <Form.Group className="singledropdown mb-2 paddTop24 padd48 leavedatepick">
                                    <Form.Label className="customized-label">
                                        Time (From & To)
                                    </Form.Label>
                                    <div className="datepickerAligment">
                                    <DatePicker
                                        selected={this.state.time}
                                        onChange={this.fromTimeChanged}
                                        showTimeSelect
                                        showTimeSelectOnly
                                        timeIntervals={15}
                                        dateFormat="h:mm aa"
                                        timeCaption="Time"
                                        placeholderText="From Time"
                                    />
                                    <DatePicker
                                        selected={this.state.time}
                                        onChange={this.toTimeChanged}
                                        showTimeSelect
                                        showTimeSelectOnly
                                        timeIntervals={15}
                                        dateFormat="h:mm aa"
                                        timeCaption="Time"
                                        placeholderText="To Time"
                                    />
                                    </div>   
                                </Form.Group>

                                <div className="padd48 padBottom28">
                                    <Form.Label className="customized-label">
                                        Description
                                    </Form.Label>
                                    <Form.Control
                                        required
                                        as="textarea"
                                        name="desc"
                                        rows="3"
                                        placeholder="Add Message here.."
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
                                onClick={this.closeModal}
                                className="cancelBtn"
                                
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="primary"
                                className="planBtn"
                                onClick={this.closeModal}
                            >
                                Save
                            </Button>
                        </Modal.Footer>
                    </Modal>
            </React.Fragment>
        );
    }
}

export default AddAppointment;