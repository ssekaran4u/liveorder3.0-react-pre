import React, { Component } from 'react';
import LeaveTable from './LeaveTable';
import { connect } from 'react-redux';
import { getHolidayLeave } from '../../../actions/Leave';

class HolidayList extends Component {
    constructor(props){
        super(props);
        this.state = {
            
        }
    }

    componentDidMount(){
        var data = {"Token":"","Index":"ListofHollidays" }
        this.props.getHolidayLeave(data)
    }

     
    render() { 

        const header = [
           
            { title: 'Date', prop: 'H_Date',filterable: true},
            { title: 'Day', prop: 'H_Day',filterable: true },
            { title: 'Event', prop: 'HOLIDAY' ,filterable: true }
            
          ];
           

        const customLabels = {
            first: "<<",
            last: ">>",
            prev: "< Prev",
            next: "Next >", 
            show: "Show",
            entries: "items/page",
            filterPlaceholder: "Search",
            noResults: "There is no data to be displayed"
        };

        if(!this.props.holidayLeaveStatus){
            return null
        }
        
        return (
            <React.Fragment>
                <div className="pullleft KamClaimTable">
                    <div className="distributorClaimList">
                        <div className="flex-row">
                            <div className="dwrSubHeading mainhead_content_one bartitle"><span id="blueText">List of Hollidays {(new Date().getFullYear())}</span></div>
                                <div className="flexDisplay">
                                    <div className="unlockmenu">  
                                    </div>
                                </div>

                        </div>
                        <LeaveTable 
                                    tableHeader={header}
                                    tableBody={this.props.holidayLeaveStatus}
                                    keyName="userTable"
                                    tableClass="striped hover table-responsive"
                                    rowsPerPage={10}
                                    rowsPerPageOption={[10, 20, 50, 100, 200]}
                                    initialSort={{ prop: "username", isAscending: true, }}
                                    labels={customLabels}
                                />                
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

  const mapStateToProps =state =>({
    holidayLeaveStatus:state.Leave.holidayLeaveStatus
  })

  const mapDispatchToProps = dispatch =>({
    getHolidayLeave:data => dispatch(getHolidayLeave(data))
  })

export default connect(mapStateToProps,mapDispatchToProps)(HolidayList);