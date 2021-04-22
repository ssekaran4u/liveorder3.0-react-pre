import React, { Component } from "react";
import RPSDetailsCustomTable from "./RPSDetailsCustomTable";
import "../../../../public/assets/css/campaignRequest.css";

class RPSDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
      
    render() { 

       const header = [
            { prop: 'RPSName', title: 'RPS Name 1' },
            { prop: 'InitiatedRPSAmount', title: 'Initiated RPS Amount', filterable: true },
            { prop: 'ApprovedRPSAmount', title: 'Approved RPS Amount', filterable: true },
            { prop: 'ConfirmedRPSAmount', title: 'Confirmed RPS Amount', filterable: true },
            
        ];
       

         const body = [
                    {RPSName: 'AirFare',  InitiatedRPSAmount:'1800.00',ApprovedRPSAmount:'1800.00', ConfirmedRPSAmount:'1800.00'},
                   
            ];  



            return (
                <div>

                <RPSDetailsCustomTable
                    tableHeader={header}
                    tableBody={body}
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


export default  RPSDetails;



