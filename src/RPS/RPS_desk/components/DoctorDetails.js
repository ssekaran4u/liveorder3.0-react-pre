import React, { Component } from "react";
import RPSDetailsCustomTable from "./RPSDetailsCustomTable";
import "../../../../public/assets/css/campaignRequest.css";

class DoctorDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
      
    render() { 
        const header = [
            { prop: 'doctor', title: 'Dr.Name' },
            { prop: 'Grade', title: 'Dr.Grade' },
            { prop: 'category', title: 'Dr.Category'},
            { prop: 'c_mobile_no', title: 'Mobile Number'},
            { prop: 'c_dr_email_id', title: 'E-mail Address'},
            { prop: 'c_Remarks', title: 'Remarks'},
        ];
        return (
            <div>
                <RPSDetailsCustomTable
                    tableHeader={header}
                    tableBody={this.props.docDetails}
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


export default  DoctorDetails;



