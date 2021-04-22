import React from 'react'
import { Component } from 'react';
import "../../../public/assets/css/prpstyle.css";

class HistoryDet extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
		}
		renderTableData () {
      return this.props.PreviousRemarks.map((item, index) => {
        const {dat, remarks, desig, stat, name} = item
         return (
						 <tr key={index}>
               <th className="trainingamt">{name}</th>
               <th className="trainingamt">{desig}</th>
               <th className="approvedtext">{stat}</th>
               <th className="trainingamt prpremarkwrap">{remarks ? remarks : "--"}</th>
               <th className="trainingamt">{dat}</th>
             </tr>
         )
      })
    }
    render() {
        return (
            <React.Fragment>
              {this.props.PreviousRemarks[0] ? 
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
export default HistoryDet;