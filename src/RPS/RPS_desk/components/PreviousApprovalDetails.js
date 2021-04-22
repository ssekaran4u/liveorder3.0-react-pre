import React, { Component } from "react";
import RPSDetailsCustomTable from "./RPSDetailsCustomTable";
import "../../../../public/assets/css/campaignRequest.css";

class PreviousApprovalDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
      
    render() { 

       const header = [
            { prop: 'Fsname', title: 'Name' },
            { prop: 'Desig', title: 'Designation', filterable: true },
            { prop: 'STATUS', title: 'Status', filterable: true },
            { prop: 'Note', title: 'Note', filterable: true },
            { prop: 'DATE', title: 'Date' },
 
        ];
        return (
            <div className="bottomBor">
                <RPSDetailsCustomTable
                    tableHeader={header}
                    tableBody={this.props.rps_det}
                    keyName="userTable"
                    tableClass="striped hover table-responsive"
                    rowsPerPage={10}
                    rowsPerPageOption={[10, 20, 50, 100, 200]}
                    initialSort={{ prop: "username", isAscending: true, }}
                    
                />
                </div>
            );
        }
}


export default  PreviousApprovalDetails;



