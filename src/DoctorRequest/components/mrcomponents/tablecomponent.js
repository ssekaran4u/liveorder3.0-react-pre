import React, { Component } from "react";
import Doctortablecommon from './doctortablecommon';
import {postToServer} from '../../../lib/comm-utils';
import {withRouter} from 'react-router-dom'
import Loader from '../../../lib/Loader';
import { Form } from 'react-bootstrap';
class Tablecomponent extends Component {
    constructor(props) {
        super(props);
        this.state={
					Errormessage : '',
					Error : false,
					updatedoctorlist : [],
					showLoader:true,
				}
				this.isaction = this.isaction.bind(this)
		}
		isaction(event,doc_code){
			

		}
		componentDidMount(){
			var	data = {
				"Index": "doclist_toupdate",
				"Token": "",
				"Type": "Request"
			}
			postToServer("UpdateDoctorAPI", data).then((response) => {
				if(response.data.Status == "success"){
					this.setState({updatedoctorlist : response.data.Data, showLoader: false })
				}
			}).catch((Error) => {
				this.setState({Error: true, Errormsg: "Error in App PRP list API ", showLoader: false })
			})
		}
    render() { 
       const header = [
						{ prop: 'drclass', title: 'Action', filterable: false, "sortable": false },
            { prop: 'doc_code', title: 'Doctor Code', filterable: true, "sortable": true},
            { prop: 'doc_name', title: 'Doctor Name', filterable: true, "sortable": true},
            { prop: 'Reason for Update Or Close', title: 'Reason for Update Or Close', filterable: true, "sortable": true },
            { prop: 'Closing Date', title: 'Closing Date', filterable: true, "sortable": true },
            { prop: 'grade', title: 'Grade', filterable: true, "sortable": true },  
            // { prop: 'drclass', title: 'Doctor Class', filterable: true, "sortable": true },
            { prop: 'dr_reg_no.', title: 'Dr. Reg. No.', filterable: true, "sortable": true },
            { prop: 'speciality', title: 'Speciality', filterable: true, "sortable": true },
            { prop: 'mcl_no', title: 'MCL No.', filterable: true, "sortable": true },
            { prop: 'Area', title: 'Area', filterable: true, "sortable": true },
            { prop: 'subarea', title: 'Sub Area', filterable: true, "sortable": true },
            { prop: 'status', title: 'Status', filterable: true, "sortable": true },
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
				// this.state.updatedoctorlist ? this.state.updatedoctorlist.map((item) => {
				// 	item.drclass = <input type="text" value={item.doc_name} onChange={(event) =>this.isaction(event,item.doc_code)} ref={this.input}></input>
				// }) : null
            return (
                <div>
                <Doctortablecommon
                    tableHeader={header}
                    keyName="userTable"
                    tableClass="striped hover table-responsive"
                    rowsPerPage={10}
                    rowsPerPageOption={[10, 20, 50, 100, 200]}
                    initialSort={{ prop: "username", isAscending: true, }}
                    labels={customLabels}
										tableBody={this.state.updatedoctorlist}
                />
								<Loader show={this.state.showLoader} />
                </div>
            );
     
    }
}


export default  withRouter(Tablecomponent);