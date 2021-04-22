import React, { Component } from "react";
import Doctortablecommon from '../mrcomponents/doctortablecommon';
import {postToServer} from '../../../lib/comm-utils';
import {withRouter} from 'react-router-dom'
import Loader from '../../../lib/Loader'
class Requestlist extends Component {
    constructor(props) {
        super(props);
        this.state={
            
        }
    }
    render() { 
       const header = [
            { prop: 'Action', title: 'Action', filterable: false, "sortable": false },
            { prop: 'Request Date', title: 'Request Date', filterable: true, "sortable": true},
            { prop: 'Doctor Name', title: 'Doctor Name', filterable: true, "sortable": true},
            { prop: 'Grade', title: 'Grade', filterable: true, "sortable": true },
            { prop: 'Area', title: 'Area', filterable: true, "sortable": true },
            { prop: 'Note', title: 'Note', filterable: true, "sortable": true },
            { prop: 'Status', title: 'Status', filterable: true, "sortable": true },
                  
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
				const tableBody = [

				]
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
										tableBody={tableBody}
                />
								<Loader show={this.state.showLoader} />
                </div>
            );
     
    }
}


export default  withRouter(Requestlist);