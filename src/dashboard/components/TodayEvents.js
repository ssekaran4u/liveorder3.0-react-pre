/*
* This code will display EventList inside calender
* Request URL=url/Calender
* Index=Event
* Request string={"index":"Event","Result":"0","TableName":"","ColumnName":"","Data":[{"year":"2018","month":"7","Result":"1"}],"Token":""}
* Response string=null
* Response Error={}
*/




import React, { Component } from "react";
import { connect } from "react-redux";
import { getTodayEvents } from "../../actions/calendar";
import { format } from "date-fns";

class TodayEvents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Events: ""
        };
        this.getEvent = this.getEvent.bind(this);
    }

    componentDidMount() {
        this.getEvent();
    }

    getEvent() {
        var data = {
            index: "Event",
            Result: "0",
            TableName: "",
            ColumnName: "",
            // Data: [
            //     {
            //         year: "2018",
            //         month: "7",
            //         Result: "1"
            //     }
            // ]
        };
        this.props.getTodayEvents(data);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.Events != prevState.Events) {
            return { ...prevState, Events: nextProps.Events };
        }
    }

    render() {  
        const EventsList = this.state.Events;
        // const date = format(new Date(2019, 4, 16), "DD-MM-YYYY"); //This date having the events data
        const date = format(new Date(), "DD-MM-YYYY");
        const birthdayEvent = [];
        const anniversaryEvent = [];
       
        if (EventsList) {
            EventsList.map(events => {
                if(events.C_type == 'Birthday'){
                    if (events.Event_Date == date) {
                        birthdayEvent.push(events);
                    }
                }
            });
            EventsList.map(events => {
                if(events.C_type == 'Wedding Anniversary'){
                    if (events.Event_Date == date) {
                        anniversaryEvent.push(events);
                    }
                }
            });
        }
       
        const { Events } = this.state;

        // if (!Events) return null;
        // if (Events["Status"] == "Fail") return null;
        return (
            <div className="events cal-scrollbar">
                <h4 className="event-head">Today's Events</h4>
                {birthdayEvent != undefined ? birthdayEvent.length === 0 && anniversaryEvent.length === 0 ? (
                    <div>
                        <p className="no-result-text">No events Found</p>
                    </div>
                ) : null :''}
                <ul className="events-list">
                    {/* <li className="yellow"><span>Dr. Kelly watson has birthday today.</span></li>
                    <li className="green"><span>Anunal day of Alkem</span></li>
                    <li className="violet"><span>Dr. Amy Luther has anniversary</span></li>  */}
                    {birthdayEvent != undefined ? birthdayEvent.map((eventList, i) => (
                        <li key={i} className={eventList.Event_Date ? "yellow" : ""}>
                            {eventList.Event_Date == date ?
                            <p>
                                {eventList.dr_name} has{" "}
                                {eventList.Event_Date ? "Birthday" : ""} today
                            </p>:
                            <p>
                            {eventList.dr_name} has{" "} Birthday on &nbsp;
                            {eventList.eventday } 
                        </p>}
                        </li>
                    )) : null}
                    {anniversaryEvent != undefined ? anniversaryEvent.map((eventList, i) => (
                        <li key={i} className={eventList.Event_Date ? "violet" : ""}>
                            {eventList.Event_Date == date ? 
                            <p>
                                {eventList.dr_name} has{" "} {eventList.Event_Date ? "Anniversary" : ""} today
                            </p> :
                             <p>
                              {eventList.dr_name} has{" "}{eventList.C_type} on &nbsp; {eventList.eventday } 
                         </p>}
                        </li>
                    )) : null}
                </ul>
            </div>
        );
    }
}

const MapStateToProps = state => ({
    Events: state.Calendar.Events
});

const MapDispatchToProps = dispatch => ({
    getTodayEvents: data => dispatch(getTodayEvents(data))
});

export default connect(
    MapStateToProps,
    MapDispatchToProps
)(TodayEvents);
