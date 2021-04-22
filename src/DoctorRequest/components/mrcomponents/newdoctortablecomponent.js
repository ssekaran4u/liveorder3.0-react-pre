import React, { Component } from "react";
import Doctortablecommon from './doctortablecommon';
import {postToServer} from '../../../lib/comm-utils';
import {withRouter} from 'react-router-dom'
import Loader from '../../../lib/Loader'
import DatePicker from "react-datepicker";
import {InputGroup} from 'react-bootstrap'
class Newdoctortablecomponent extends Component {
    constructor(props) {
        super(props);
        this.state={
            doctorlist : [],
						iserror : false,
						errormessage : '',
						showLoader : true,
						Date : new Date()
        }
    }
    componentDidMount(){
        var data = {       
					"Index": "doclist_toadd",
					"Token": "",
					"Type": "Request"
        }
        postToServer("UpdateDoctorAPI",data).then((response) => {
					if(response.data.Status == 'success'){
						this.setState({doctorlist:response.data.Data,showLoader:false})
					}
				}).catch((error) => {
					this.setState({errormessage: 'Error to load doctor to load list',iserror:true,
					showLoader:false})
				})
    }
    render() { 
       const header = [
            { prop: 'Action', title: 'Action', filterable: false, "sortable": false },
            { prop: 'C_Code', title: 'Doctor Code', filterable: true, "sortable": true},
            { prop: 'C_Name', title: 'Doctor Name', filterable: true, "sortable": true},
            { prop: 'Grade', title: 'Grade', filterable: true, "sortable": true },
            { prop: 'opendate', title: 'Opening Date', filterable: true, "sortable": true },
            { prop: 'Remarks', title: 'Remarks', filterable: true, "sortable": true },
            { prop: 'n_status', title: 'Status', filterable: true, "sortable": true },     
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
				this.state.doctorlist ? this.state.doctorlist.map((item) => {
                    // let v1 = item.opendate.toString()
                    // let v2 = v1.replace(/['"]+/g, '')
                    // let v3 = new Date(v2)
					item.opendate = <InputGroup className="datepickerAligment controls text-right doctorlistdatepicker">
					<DatePicker
						selected= {new Date(item.d_created)}
						// onChange={this.handlePrpDate}
						dateFormat="MM/dd/yyyy"
						placeholderText="MM-DD-YYYY"
                        //className="doctorlistdatepicker"
					/>
					<InputGroup.Append>
						<InputGroup.Text>
							<img src="../../public/assets/images/prpcalender.svg" alt="calendar" />
						</InputGroup.Text>
					</InputGroup.Append>
				</InputGroup>
				}) : null
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
										tableBody={this.state.doctorlist}
                />
								<Loader show={this.state.showLoader} />
                </div>
            );
     
    }
}


export default  withRouter(Newdoctortablecomponent);