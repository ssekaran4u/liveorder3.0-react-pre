import React, {Component} from 'react'
import DatePicker from 'react-datepicker'
import {Form, InputGroup} from 'react-bootstrap'
class Date_Control extends Component{
    constructor(props) {
        super(props);
        this.state = ({
            
            //date: new Date
            date:''
        });
        this.dateChanged = this.dateChanged.bind(this);
    };
    dateChanged(d){ 
        this.setState({date: d});
    };
    render(){
        return(
            <div>
                <Form.Label className="customized-label">{this.props.displayname}</Form.Label>
                    <InputGroup className="datepickerAligment controls">
                        <DatePicker
                            selected={this.state.date}
                            onChange={this.dateChanged}
                            dateFormat="dd/MM/yyyy"
                        />
                        <InputGroup.Append>
                            <InputGroup.Text>
                                <img src="../public/assets/images/calendar.svg" alt="calendar" />
                            </InputGroup.Text>
                        </InputGroup.Append>
                    </InputGroup>
            </div>
        )
    }

}
export default Date_Control;