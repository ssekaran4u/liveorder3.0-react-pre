import React, { Component } from "react";
import RPSDeskStaffCustomTable from "./RPSDeskStaffCustomTable";
import "../../../../public/assets/css/campaignRequest.css";
import AddBeneficiary from "../popup/AddBeneficiary"
import Form from "react-bootstrap/Form";
import SearchDropdown from "../../../BasicComponet/searchDropdown";



class RPSDeskStaffListTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggleHeader: this.props.toggleHeader,
            assignedTo:""
        };
            this.getAssignTo = this.getAssignTo.bind(this)

    }
    getAssignTo(){
      console.log("gfgfgfggf")
    }
       static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.data !== nextProps.data) {
            // console.log(nextProps.data);
            return { ...prevState, data: nextProps.data };
        }
        if (prevState.toggleHeader !== nextProps.toggleHeader)
            return { ...prevState, toggleHeader: nextProps.toggleHeader };
        return null;
    }
    render() { 
 let assignto =[
            {
              key: '1',
              text: 'MR1',
              value: 'MR1',
            },
            {
              key: '2',
              text: 'MR2',
              value: 'MR2',
            },
            {
              key: '3',
              text: 'MR3',
              value: 'MR3',
            },
          ]
       const header = [
            { prop: 'ReqNo', title: 'Req.No.', filterable: true,sortable:true },
            { prop: 'RPSName', title: 'RPS Name', filterable: true },
            { prop: 'RPSAmt', title: 'RPS Amt(₹)', filterable: true,sortable:true },
            { prop: 'Status', title: 'Status', filterable: true,sortable:true },
            { prop: 'RPSDate', title: 'RPS Date', filterable: true },
            { prop: 'SubmittedBy', title: 'Submitted By', filterable: true,sortable:true },
            { prop: 'AssignedTo', title: 'Assign To', filterable: true },
            { prop: 'Note', title: 'Note', filterable: true },
                       
        ];
        const img = <div>
                <img
                className ="img action-img"
                src="../public/assets/images/edit_icon.svg"
                alt="edit"
              />
           <span>35654</span>
          </div>


        var confirmedText= <span className="action-completed">Action Completed</span>
        var rpsName = <span className ="confirmed-status">Movie</span>
          
          const note = 
          <div>
                <Form.Control type="text" className="customized-input" placeholder="Enter" />
        </div>
         const assignTo =
                  <div className ="user-heirarchy-field-containers1">
                     <SearchDropdown
                                placeholder="Select"
                                Selected={this.state.assignedTo}
                                dropdownList={assignto}
                               getValue={this.getAssignTo}
                              />

         </div>
         const body = [
            {ReqNo: img,  RPSName: rpsName,RPSAmt:'2000.00', Status:confirmedText, RPSDate:'31-July-2019', SubmittedBy:'Vivam(Mumbai)', AssignedTo:assignTo,Note:note},
            {ReqNo: img,  RPSName: rpsName,RPSAmt:'2000.00', Status:confirmedText, RPSDate:'31-July-2019', SubmittedBy:'Vivam(Mumbai)', AssignedTo:assignTo,Note:note},
            {ReqNo: img,  RPSName: rpsName,RPSAmt:'2000.00', Status:confirmedText, RPSDate:'31-July-2019', SubmittedBy:'Vivam(Mumbai)', AssignedTo:assignTo,Note:note},
            {ReqNo: img,  RPSName: rpsName,RPSAmt:'2000.00', Status:confirmedText, RPSDate:'31-July-2019', SubmittedBy:'Vivam(Mumbai)', AssignedTo:assignTo,Note:note},
          
            ];  
      
        const customLabels = {
            first: "<<",
            last: ">>",
            prev: "< Prev",
            next: "Next >",
            show: "Show",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
            entries: "entries",
            filterPlaceholder: "Search Anything",
            noResults: "There is no data to be displayed"
        };
            return (
                <div>

                <RPSDeskStaffCustomTable
                    tableHeader={header}
                    tableBody={body}
                    keyName="userTable"
                    tableClass="striped hover table-responsive"
                    rowsPerPage={10}
                    rowsPerPageOption={[10, 20, 50, 100, 200]}
                    initialSort={{ prop: "username", isAscending: true, }}
                    labels={customLabels}
                    
                />
                </div>
            );
     
    }
}


export default  RPSDeskStaffListTable;



