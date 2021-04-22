import React, { Component } from "react";
import DatePicker from 'react-datepicker';
import "../../public/assets/css/BasicComponents/sfaDatePicker.css";

class SfaDatePicker extends Component {

    //To change the value of date.
    onDateChange(date) {
        this.props.onChange(date)
    }

    render() {
        return (
            <div className="sfa_date_picker">
                <div className="date-heading">
                    {this.props.labelName}&nbsp;
                    {this.props.important == true ? <span>*</span> : null}
                </div>
                <div className="date_picker">
                    <DatePicker
                        selected={this.props.date}
                        dateFormat="dd-MM-yyyy"
                        onChange={this.onDateChange.bind(this)}
                        value={this.props.dateRange}
                        placeholderText={this.props.placeholder}
                        maxDate={this.props.maxDate==false? null : new Date()}
                        disabled={this.props.disabled}
                    />
                </div>
                <div className="err-message">{this.props.errorMessage}</div>
            </div>
        )
    }
}

export default SfaDatePicker;














