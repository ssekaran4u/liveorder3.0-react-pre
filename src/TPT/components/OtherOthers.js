import React, { Component } from 'react';
import { Row, Col, Form, InputGroup } from 'react-bootstrap'
import { Dropdown } from 'semantic-ui-react'
import DatePicker from 'react-datepicker'

class OtherMeeting extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            date: new Date
        }
        this.dateChanged = this.dateChanged.bind(this);  
    }

    dateChanged(d){ 
        this.setState({date: d});
    }   
    render() {
        const options =  [
            {
              key: 'Casual Leaves',
              text: 'Casual Leaves',
              value: 'Casual Leaves'
            },
            {
              key: 'Sick Leaves',
              text: 'Sick Leaves',
              value: 'Sick Leaves'
            },
            {
              key: 'Optional Leaves',
              text: 'Optional Leaves',
              value: 'Optional Leaves'
            },
            {
                key: 'Privilege Leaves',
                text: 'Privilege Leaves',
                value: 'Privilege Leaves'
              }
            ]
        return (
            <React.Fragment>
                
                <div className="otherMeeting">
                    <div className="otherMeetingHeading">
                        <span>Others</span>
                    </div>
                   <div className="otherMeetingForm">
                   <Form> 
                        <Row> 
                            <Col lg={12} xl={6} className="mb-3">
                                <Form.Label className="customized-label">Date</Form.Label>
                                <InputGroup className="datepickerAligment controls">
                                    <DatePicker
                                        selected={this.state.date}
                                        onChange={this.dateChanged}
                                    />
                                    <InputGroup.Append>
                                        <InputGroup.Text>
                                            <img src="../public/assets/images/calendar.svg" alt="calendar" />
                                        </InputGroup.Text>
                                    </InputGroup.Append>
                                </InputGroup>
                            </Col>
                        
                            <Col lg={12} xl={6} className="mb-3">
                                <Form.Label className="customized-label">Place of Work</Form.Label>
                                <Dropdown placeholder='Select' fluid selection options={options} />
                            </Col> 

                            <Col lg={12} xl={6} className="mb-3">
                                <Form.Label className="customized-label">Stay At</Form.Label>
                                <Dropdown placeholder='Select' fluid selection options={options} />
                            </Col> 

                            <Col lg={12} xl={6} className="mb-3">
                                <Form.Label className="customized-label">Joint Working</Form.Label>
                                <Dropdown placeholder='Select' fluid selection options={options} />
                            </Col> 

                            <Col md={12} xl={6} className="mb-3">
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label className="customized-label">Note</Form.Label>
                                    <Form.Control as="textarea" rows="9" className="customized-input" placeholder="Write here.." />
                                </Form.Group>
                            </Col>
                      
                        
                            
                            
                        </Row>
                        <Row>
                            <Col sm={12} md={3} xl={4} className="mb-3">
                                <button className="success mr-2 mb-2">SUBMIT</button>
                                <button className="danger danger-outline mr-2 mb-2">Danger</button>
                            </Col>   
                            
                        </Row>
                    </Form>
                   </div>
                </div>
               
            </React.Fragment>
        );
    }
}

export default OtherMeeting;