import React, { Component } from "react";
import { Dropdown } from 'semantic-ui-react'

class MonthPicker extends Component {
    constructor(props) {
        super(props)
        this.state = {
            months: [],
            years: [],
            selectedMonth: (new Date().getMonth()+1).toString(),
            selectedYear: (new Date().getFullYear()),
        }
    }

    componentDidMount() {
        let list = []
        this.setState({
            months: [{ key: "1", value: "1", text: "January" },
            { key: "2", value: "2", text: "February" },
            { key: "3", value: "3", text: "March" },
            { key: "4", value: "4", text: "April" },
            { key: "5", value: "5", text: "May" },
            { key: "6", value: "6", text: "June" },
            { key: "7", value: "7", text: "July" },
            { key: "8", value: "8", text: "August" },
            { key: "9", value: "9", text: "September" },
            { key: "10", value: "10", text: "October" },
            { key: "11", value: "11", text: "November" },
            { key: "12", value: "12", text: "December" },
            ]
        });
        for(var i=5; i>=0; i--){
            list.push({
                key: i,
                value: this.state.selectedYear-i,
                text: this.state.selectedYear-i
            })
        }
        list.push({
            key: 6,
            value: this.state.selectedYear+1,
            text: this.state.selectedYear+1
        })
        this.setState({years: list})
        this.props.onMonthChange(this.state.selectedMonth,this.state.selectedYear)
    }

    //To change the Month
    onMonthChange(e,data) {
        this.setState({selectedMonth: data.value})
        this.props.onMonthChange(data.value,this.state.selectedYear)
    }

    //To change the year
    onYearChange(e,data){
        this.setState({selectedYear: data.value})
        this.props.onMonthChange(this.state.selectedMonth,data.value)
    }

    render() {
        return (
            <div className="sfa-month-picker">
                <div className="date-heading">
                    {this.props.labelName}&nbsp;
                    {this.props.important == true ? <span>*</span> : null}
                </div>
                <div className="month-picker-container">
                    <Dropdown
                        value={this.state.selectedMonth}
                        onChange={this.onMonthChange.bind(this)}
                        fluid
                        search={false}
                        selection
                        icon={<img src="public/assets/images/Path 2590.svg" alt="" />}
                        options={this.state.months}
                        className="month-selection"
                    />
                    <Dropdown
                        value={this.state.selectedYear}
                        onChange={this.onYearChange.bind(this)}
                        fluid
                        search={false}
                        selection
                        icon={<img src="public/assets/images/Path 2590.svg" alt="" />}
                        options={this.state.years}
                    />
                </div>
                <div className="err-message">{this.props.errorMessage}</div>
            </div>
        )
    }
}

export default MonthPicker;