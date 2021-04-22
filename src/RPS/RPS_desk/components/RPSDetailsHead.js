import React, { Component } from "react";
import RPSDetailsCustomTable from "./RPSDetailsCustomTable";
import "../../../../public/assets/css/campaignRequest.css";

class RPSDetailsHead extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
      
    render() { 
        const header = [
            { prop: 'RPSNAME', title: 'RPS Name 1' },
            { prop: 'n_amount', title: 'Estimated RPS Amt', filterable: true },
            { prop: 'n_AdvanceAmount', title: 'Advance Required', filterable: true },
            { prop: 'ApprovedEstimatedAmount', title: 'Approved Estimated Amt', filterable: true },
            { prop: 'ConfirmedEstimatedAmount', title: 'Confirmed Estimated Amt', filterable: true },
        ];
        return (
            <div>
                <RPSDetailsCustomTable
                    tableHeader={header}
                    tableBody={this.props.rpsDetails}
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


export default  RPSDetailsHead;



