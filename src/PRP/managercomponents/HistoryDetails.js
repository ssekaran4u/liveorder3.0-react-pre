import React from 'react'
import { Component } from 'react';
import '../../../public/assets/css/sfcstyle.css'
import '../../../public/assets/css/transactionmodule.css'
import "../../../public/assets/css/prpstyle.css";

class HistoryDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
		}
		renderTableData () {
      return this.props.ApprovedDetails.map((item, index) => {
         return (
					 <>
            {item["Approved By"] ? 
            <tr key={index}>
            <th className="trainingamt">{item["Approved By"]}</th>
            <th className="trainingamt">{item["Designation"]}</th>
            <th className="approvedtext">Approved</th>
            <th className="trainingamt prpremarkwrap">{item["Approved Note"] ? item["Approved Note"] : " -- "}</th>
            <th className="trainingamt">{item["Approved Date"]}</th>
           </tr> : null}
						 {item["Confirmed By"] ? 
						 <tr key={index}>
							 <th className="trainingamt">{item["Confirmed By"]}</th>
							 <th className="trainingamt">{item["confirmDesignation"]}</th>
               {this.props.n_status == 3 ? <th className="approvedtext">Held</th> : <th className="approvedtext">Confirmed</th>}
							 
							 <th className="trainingamt prpremarkwrap">{item["Confirmed Note"] ? item["Confirmed Note"] : " -- "}</th>
							 <th className="trainingamt">{item["Confirmed Date"]}</th>
						 </tr>
							 : item["Rejected By"] ?<tr key={index}>
							 <th className="trainingamt">{item["Rejected By"]}</th>
							 <th className="trainingamt">{item["confirmDesignation"]}</th>
							 <th className="approvedtext">Rejected</th>
							 <th className="trainingamt prpremarkwrap">{item["Rejected Note"] ? item["Rejected Note"] : " -- "}</th>
							 <th className="trainingamt">{item["Rejected Date"]}</th>
							</tr>
              : null
							 }
					 </>
         )
      })
    }
    render() {
			const {
				ApprovedDetails,
			} = this.props
        return (
            <React.Fragment>
              {this.props.ApprovedDetails.length ? 
              <div className="pullleft KamClaimTablesfc">
              <div className="ongoing-orders-sfc mrsfcTable sfcFilterOpt">
                <div className=" prpacount">
                  <div className="acount-detailsprp">
                    Approved/Confirmed/Rejected History Details
                  </div>
                  <div className=" prpacount-table" >
                    <table id="example" className="stripe row-border order-column"  >
                      <thead>
                        <tr>
                          <th rowSpan="1" colSpan="1" className="acountname">Name</th>
                          <th rowSpan="1" colSpan="1"  className="acountname">Designation</th>
                          <th rowSpan="1" colSpan="1"  className="acountname">Status</th>
                          <th rowSpan="1" colSpan="1"  className="acountname">Remark</th>
                          <th rowSpan="1" colSpan="1"  className="acountname">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.renderTableData()}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
          </div> : null}
              
          </React.Fragment>
        )
    }
}
export default HistoryDetails;