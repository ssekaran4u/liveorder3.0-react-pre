import React, { Component } from "react";
import moment from "moment";
import { setPlannedTaskDate } from "../../actions/calendar";
import { connect } from "react-redux";
import "./calendar.css";
import Day from '../components/calanderDay'
import { getCompletedTask } from "../../actions/calendar";

/***
 * This file contains the public class Calendar and the private classes, DayNames, Week and Day which
 * are internally used by Calendar.
 *
 * Calendar is a generic component (without any SFA related business logic) and is provided here
 * as a replacement to other available third-party calendar components to provide the specific
 * custom behaviour that is expected and which is unavailable in the other third-party components.
 *
 * TODO:
 * Presently, hard coded dates are used to represent certain events in the calendar, like DCR missed,
 * DCR filled and holidays. This must be changed to accept these dates as props to the calendar.
 */
var weekday = new Array(7);
var con_current =new Date();
var cur=con_current.getDay()
class Calendar extends Component {
    constructor(props) {
        super(props);
       
        weekday[0] = "Sunday";
        weekday[1] = "Monday";
        weekday[2] = "Tuesday";
        weekday[3] = "Wednesday";
        weekday[4] = "Thursday";
        weekday[5] = "Friday";
        weekday[6] = "Saturday";
        this.state = {
            currentDate: moment(),
            date: moment()
                .startOf("week")
                .day("Sunday"),
            month: moment()
        };

        this.previous = this.previous.bind(this);
        this.next = this.next.bind(this);
        this.renderLabel = this.renderLabel.bind(this);
        this.getPlannedTaskDate = this.getPlannedTaskDate.bind(this);
    }
    componentDidMount() {
        this.getCompletedList();
        //this.getDcrFilled()
       // this.gePrevtDate()
    }
    previous() { 
        const { date } = this.state;
        this.setState({
            date: date.subtract(1, "w")
        });
    }

    next() {
        const { date } = this.state;

        this.setState({
            date: date.add(1, "w")
        });
    }
    getCompletedList() {
        var data = {
            index: "DCRDetails",
            Result: "0",
           
            ColumnName: ""
           
        };
        this.props.getCompletedTask(data);
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.completedTask !== nextProps.completedTask) {
            // console.log("props",nextProps.completedTask);
            return { ...prevState, completedTask: nextProps.completedTask };
        }
       
        return null;
    }

    renderLabel() {
        const { currentDate, date } = this.state;
    
         // console.log(currentDate, date,'kunal sinha' )
          if(currentDate.format("YYYY")!=date.format("YYYY")){
            return (
          
                <span className="month-label">
                    {/* {currentDate.format("MMMM")} */}
                    {currentDate.format("MMMM")}
                   
                    <span className="monthPad">{date.format("YYYY")}</span>
                </span>
            );
                
        }else{
            return (
          
                <span className="month-label">
                    {/* {currentDate.format("MMMM")} */}
                    {date.format("MMMM")}
                   
                    <span className="monthPad">{currentDate.format("YYYY")}</span>
                </span>
            );
        }
      
    }

    getPlannedTaskDate(date) {
        this.props.setPlannedTaskDate(date);
    }

    render() { 
        const { date, month } = this.state;
        return (
            <div className="calendar-sec">
                <div className="calendar">
                    <div className="cal-header">
                        <div className="month-display cal-row">
                            <i
                                className="arrow fa fa-angle-left"
                                onClick={this.previous}
                            />
                            {this.renderLabel()}
                            <i
                                className="arrow fa fa-angle-right"
                                onClick={this.next}
                            />
                        </div>
                        <DayNames />
                    </div>
                    <Week
                        date={date.clone()}
                        month={month}
                        completeTask={this.state.completedTask}
                        getPlannedTaskDate={this.getPlannedTaskDate}
                    />
                </div>
                <div className="indication">
                    <div className="indication-sec dcr-filled-indi">
                        DWR Filled
                    </div>
                    <div className="indication-sec dcr-missed-indi">
                        DWR Missed
                    </div>
                    <div className="indication-sec holiday-indi">Holiday</div>
                </div>
            </div>
        );
    }
}

function DayNames() {
    return (
        <div className="cal-row day-names">
           {/* {weekday.map( (a,index)=> cur-index<3 ? <span className="day">{  a.substring(0, 2)}</span>  :null )}
           {weekday.map( (a,index)=>cur==index ?  <span className="day">{  a.substring(0, 2) }</span>:null )}
           {weekday.map( (a,index)=>cur-index>3 ?<span className="day">{  a.substring(0, 2) }</span>:null)} */}
              <span className="day">Su</span>
             <span className="day">Mo</span>
            <span className="day">Tu</span>
             <span className="day">We</span>
            <span className="day">Th</span>
             <span className="day">Fr</span>
            <span className="day">Sa</span>
        </div>
    );
}

class Week extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDate: moment().format("DD")
        };
        this.getSelectedDate = this.getSelectedDate.bind(this);
    }

    getSelectedDate(date) {
        this.setState({
            selectedDate: date
        });
        const day = `${moment().format("YYYY")}-${moment().format(
            "MM"
        )}-${date}`;
        this.props.getPlannedTaskDate(day);
    }

    render() {
        let days = [];
        let { date, month } = this.props;

        for (var i = 0; i < 7; i++) {
            let day = {
                name: date.format("dd").substring(0, 2),
                number: date.date(),
                isCurrentMonth: date.month() === month.month(),
                isToday: date.isSame(new Date(), "day"),
                selectedDate: this.state.selectedDate,
                date: date
            };
            days.push(
                <Day day={day} key={i} completedTask={this.props.completeTask} getSelectedDate={this.getSelectedDate} />
            );
            date = date.clone();
            date.add(1, "day");
        }


        
        return <div className="cal-row week">{days}</div>;
    }
}

const mapStateToProps = state => ({
    completedTask: state.Calendar.completedTask,
    
});

const mapDispatchToProps = dispatch => ({
    setPlannedTaskDate: data => dispatch(setPlannedTaskDate(data)),
    getCompletedTask: data => dispatch(getCompletedTask(data))
});



export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Calendar);
