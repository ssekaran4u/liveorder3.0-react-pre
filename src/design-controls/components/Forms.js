import React, {Component} from 'react'

import { Row, Col, Form, InputGroup } from 'react-bootstrap'

import { Dropdown } from 'semantic-ui-react'
import DatePicker from 'react-datepicker'
import MultipleSelectBox from './MultipleSelectBox'

const options = [
    { key: 'angular', text: 'Angular', value: 'angular' },
    { key: 'css', text: 'CSS', value: 'css' },
    { key: 'design', text: 'Graphic Design', value: 'design' },
    { key: 'ember', text: 'Ember', value: 'ember' },
    { key: 'html', text: 'HTML', value: 'html' },
    { key: 'ia', text: 'Information Architecture', value: 'ia' },
    { key: 'javascript', text: 'Javascript', value: 'javascript' },
    { key: 'mech', text: 'Mechanical Engineering', value: 'mech' },
    { key: 'meteor', text: 'Meteor', value: 'meteor' },
    { key: 'node', text: 'NodeJS', value: 'node' },
    { key: 'plumbing', text: 'Plumbing', value: 'plumbing' },
    { key: 'python', text: 'Python', value: 'python' },
    { key: 'rails', text: 'Rails', value: 'rails' },
    { key: 'react', text: 'React', value: 'react' },
    { key: 'repair', text: 'Kitchen Repair', value: 'repair' },
    { key: 'ruby', text: 'Ruby', value: 'ruby' },
    { key: 'ui', text: 'UI Design', value: 'ui' },
    { key: 'ux', text: 'User Experience', value: 'ux' },
]

class Forms extends Component{
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

    render(){
        return(
            <div> 
                <Form style={{width: "100%"}}> 
                    <Row> 
                        <Col md={12} xl={6} className="mb-3">
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label className="customized-label">Label</Form.Label>
                                <Form.Control type="text" className="customized-input" placeholder="Enter email" />
                            </Form.Group>
                        </Col>
                        <Col lg={12} xl={6} className="mb-3">
                            <Form.Label className="customized-label">Date picker</Form.Label>
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
                            <Form.Label className="customized-label">Date & Time Picker</Form.Label>
                            <InputGroup className="datepickerAligment date-time-picker controls">
                                <DatePicker
                                    selected={this.state.date}
                                    onChange={this.dateChanged}
                                    showTimeSelect
                                    dateFormat="Pp"
                                />
                                <InputGroup.Append>
                                    <InputGroup.Text>
                                        <img src="../public/assets/images/calendar.svg" alt="calendar" />
                                    </InputGroup.Text>
                                </InputGroup.Append>
                            </InputGroup>
                        </Col>
                        <Col lg={12} xl={6} className="mb-3">
                            <Form.Label className="customized-label">Time Picker</Form.Label>
                            <InputGroup className="datepickerAligment controls">
                                <DatePicker
                                        selected={this.state.date}
                                        onChange={this.dateChanged}
                                        showTimeSelect
                                        showTimeSelectOnly
                                        timeIntervals={15}
                                        dateFormat="h:mm aa"
                                        timeCaption="Time"
                                    />
                                <InputGroup.Append>
                                    <InputGroup.Text>
                                        <img src="../public/assets/images/calendar.svg" alt="calendar" />
                                    </InputGroup.Text>
                                </InputGroup.Append>
                            </InputGroup>
                        </Col>
                        <Col lg={12} xl={6} className="mb-3">
                            <Form.Label className="customized-label">Search & Select</Form.Label>
                            <Dropdown placeholder='Search & Select' search fluid selection options={options} />
                        </Col>
                        <Col lg={12} xl={6} className="mb-3">
                            <Form.Label className="customized-label">Select</Form.Label>
                            <Dropdown placeholder='Select' fluid selection options={options} />
                        </Col>
                        <Col lg={12} xl={6} className="mb-3">
                            <Form.Label className="customized-label">Search & Multiple select</Form.Label>
                            <MultipleSelectBox />
                        </Col>
                        <Col md={12} xl={6} className="mb-3">
                            <div className="mb-3">
                                <Form.Check 
                                    custom
                                    inline
                                    type="checkbox"
                                    id="custom-checkbox1"
                                    label="custom-checkbox1"
                                />
                                <Form.Check 
                                    custom
                                    inline
                                    type="checkbox"
                                    id="custom-checkbox2"
                                    label="custom-checkbox2"
                                />

                                <Form.Check
                                    custom
                                    inline
                                    type="radio"
                                    id="custom-radio1"
                                    label="custom-radio1"
                                />
                                <Form.Check
                                    custom
                                    inline
                                    type="radio"
                                    id="custom-radio2"
                                    label="custom-radio2"
                                />
                                <div className="custom-control custom-switch">
                                    <input type="checkbox" className="custom-control-input" id="switch1" />
                                    <label className="custom-control-label" htmlFor="switch1">Toggle me</label>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </div>
        )
    }
}

export default Forms;


