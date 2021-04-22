import React, { Component } from "react";
import DatePicker from "react-datepicker";
import { Form, InputGroup } from "react-bootstrap";
import Moment from "moment";

class SRDateControl extends Component {
    constructor(props) {
        super(props);

        this.state = {
            date: Date.now()
        };
        
        this.dateChanged = this.dateChanged.bind(this);
        this.state.datafull = this.props.datafull;
    }

    componentDidMount() {
        this.props.handle_child(
            Moment(Date.now()).format("DD/MM/YYYY"),
            "",
            this.state.datafull.c_label_display,
            "",
            "",
            Moment(Date.now()).format("DD-MM-YYYY")
        );
    }

    dateChanged(d) {
        this.setState({ date: d });
        var dte = Moment(d).format("DD/MM/YYYY");
        var crnt = Moment(d).format("DD-MM-YYYY");
        this.props.handle_child(
            dte,
            "",
            this.state.datafull.c_label_display,
            "",
            "",
            crnt
        );
    }

    render() {
        return (
            <div>
                <Form.Label className="customized-label">
                    {this.props.name}
                </Form.Label>
                <InputGroup className="datepickerAligment controls">
                    <DatePicker
                        selected={this.state.date}
                        onChange={this.dateChanged}
                        dateFormat="dd-MM-yyyy"
                    />
                    <InputGroup.Append>
                        <InputGroup.Text>
                            <img
                                src="../public/assets/images/calendar.svg"
                                alt="calendar"
                            />
                        </InputGroup.Text>
                    </InputGroup.Append>
                </InputGroup>
            </div>
        );
    }
}
export default SRDateControl;
