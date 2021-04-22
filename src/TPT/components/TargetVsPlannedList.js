import React, { Component } from 'react';
import TargetVsPlannedTable from './TargetVsPlannedTable'
// import "../../../public/assets/css/tptStyle.css";


class TargetVsPlannedList extends Component {
    constructor(props){
        super(props)
        this.state={}
    }
   
    render() { 
        // const header = [
        //     { prop: 'grade', title: 'Grade',filterable: true },
        //     { prop: 'fivevisit', title: '5 Visit',filterable: true },
        //     { prop: 'bgrade', title: 'B Grade',filterable: true },
        //     { prop: 'cgrade', title: 'C Grade',filterable: true },
        //     { prop: 'core', title: 'Core',filterable: true },
        //     { prop: 'standard', title: 'Standard',filterable: true }
            
              
        // ];
      
            // const body = [
            //   { grade: 'Visit',fivevisit: 200, bgrade: 100, cgrade: 50, core: 50, standard: 50 },
            //   { grade: 'Planned',fivevisit: 0, bgrade: 0, cgrade: 0, core: 0, standard: 0 }
              
            // ];
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
        

        return(
            <div className="">
                
                <TargetVsPlannedTable
                    tableHeader={this.props.header}
                    tableBody={this.props.data}
                    keyName="userTable"
                    tableClass="striped hover table-responsive"
                    rowsPerPage={10}
                    rowsPerPageOption={[10, 20, 50, 100, 200]}
                    initialSort={{ prop: "username", isAscending: true, }}
                    labels={customLabels}
                />
            </div>
        )
    }
}

export default TargetVsPlannedList;