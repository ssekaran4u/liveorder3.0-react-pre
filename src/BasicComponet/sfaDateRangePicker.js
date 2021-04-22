import React, { Component } from "react";
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import "../../public/assets/css/BasicComponents/sfaDateRangePicker.css";

class SfaDateRangePicker extends Component {

    //To change the value of date range
    onDateChange(date) {
        this.props.onChange(date)
    }

    render() {
        return (
            <div className="sfa-date-range-picker">
                <div className="date-heading">
                    {this.props.labelName}&nbsp;
                    {this.props.important == true ? <span>*</span> : null}
                </div>
                <div className="date-range-picker-container">
                    <DateRangePicker
                        onChange={this.onDateChange.bind(this)}
                        value={this.props.dateRange}
                        dayPlaceholder="dd"
                        format="dd/MM/y"
                        prevLabel={<i className="arrow fa fa-angle-left mon-btns" />}
                        nextLabel={<i className="arrow fa fa-angle-right mon-btns" />}
                        calendarIcon={<img className="cal-img" src="../public/assets/images/Group 1539.svg" alt="calender" />}
                        prev2Label={null}
                        next2Label={null}
                        clearIcon={null}
                        yearPlaceholder="yyyy"
                        monthPlaceholder="mm"
                        rangeDivider="to"
                        maxDate={this.props.maxDate==false? null : new Date()}
                    />
                </div>
                <div className="error-msg">{this.props.errorMessage}</div>
            </div>
        )
    }
}

export default SfaDateRangePicker;