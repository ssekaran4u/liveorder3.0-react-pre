import React, { Component } from "react"

import { Form, InputGroup } from 'react-bootstrap'

import DatePicker from 'react-datepicker'

class FilterByDateDropdown extends Component{
    constructor(props) {
        super(props);
        this.state = {
            fromDate: new Date,
            toDate: new Date
        }
        this.fromDateChanged = this.fromDateChanged.bind(this);  
        this.toDateChanged = this.toDateChanged.bind(this);  
    }

    fromDateChanged(d){ 
        this.setState({fromDate: d});
    }

    toDateChanged(d){ 
        this.setState({toDate: d});
    }

    render(){
        return(
            <div>
                <Form>
                    <h5 className="drop-head">
                        Retrive By Date Range
                        <span className="pull-right"><img src="../public/assets/images/refresh.svg" alt="refresh_img" /></span> 
                    </h5>
                    <div className="singledropdown mt-14">
                        <Form.Label className="customized-label">From Date</Form.Label>
                        <InputGroup className="datepickerAligment controls">
                            <DatePicker
                                selected={this.state.fromDate} 
                                onChange={this.fromDateChanged}
                            />
                            <InputGroup.Append>
                                <InputGroup.Text>
                                    <img src="../public/assets/images/calendar.svg" alt="calendar" />
                                </InputGroup.Text>
                            </InputGroup.Append>
                        </InputGroup>
                    </div>

                    <div className="singledropdown">
                        <Form.Label className="customized-label">From Date</Form.Label>
                        <InputGroup className="datepickerAligment controls">
                            <DatePicker
                                selected={this.state.toDate} 
                                onChange={this.toDateChanged}
                            />
                            <InputGroup.Append>
                                <InputGroup.Text>
                                    <img src="../public/assets/images/calendar.svg" alt="calendar" />
                                </InputGroup.Text>
                            </InputGroup.Append>
                        </InputGroup>
                    </div>
                </Form>
            </div>
        )
    }
}

export default FilterByDateDropdown