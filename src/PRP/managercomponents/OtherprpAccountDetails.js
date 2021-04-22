import React from 'react'
import { Component } from 'react';
import { Button, Col, Row, Form } from 'react-bootstrap'
import {postToServer} from '../../lib/comm-utils';
import '../../../public/assets/css/sfcstyle.css'
import '../../../public/assets/css/transactionmodule.css'

class OtherPrpAccountDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
          Error : '',
				}
    }
    getChangedValue(n_ApprovedAmount,n_EstimatedAmount,C_Code,n_AdvanceAmount){
      this.props.ApprovedAmtEdit(n_ApprovedAmount,n_EstimatedAmount,C_Code,n_AdvanceAmount)
    }
    renderTableData () {
      return this.props.Accountheads.map((item, index) => {
        const {C_Code, C_Name, n_ApprovedAmount, n_EstimatedAmount} = item
         return (
           <tr key={index}>
             <th className="trainingamt">{C_Name}</th>
             <th className="trainingamt">{parseInt(n_EstimatedAmount)}</th>
             {this.props.isapproved.length  || this.props.n_status != '0' ? 
             <th className="trainingamt">{parseInt(n_ApprovedAmount)}</th> : 
             <th><input type="number" defaultValue={parseInt(n_ApprovedAmount)} ref={this.input}
             className="training-amt-input" onChange={() => 
              this.getChangedValue(item.n_ApprovedAmount, item.n_EstimatedAmount, item.C_Code)}/></th>}
           </tr>
         )
      })
    }
    render() {
      const {
        Accountheads,
        n_status,
        ErrorMessageState,
        AdvEmptyError
      } = this.props
      let estimatedTotal = this.props.Accountheads.reduce( (item, currentValue) =>
        item + parseInt(currentValue.n_EstimatedAmount) , 0)

        let ApprovalTotal = this.props.Accountheads.filter(item => item.n_ApprovedAmount != "").reduce((item, currentValue) => 
        item + parseFloat(currentValue.n_ApprovedAmount), 0)
        return (
          <React.Fragment>
            <div className="pullleft KamClaimTablesfc">
              <div className="ongoing-orders-sfc mrsfcTable sfcFilterOpt">
                <div className=" prpacount">
                  <div>
                    <div className="acount-detailsprp">
                      PRP Expense Details
                    </div>
                  </div>
                  <div className="locationsfa">
                  <div className="user-heirarchy-field-containers">
										{/* <div className="distributorClaimListsfc">
											<p className="paralocation-prp">Total Cost Estimated For PRP(₹)<span className="colorRed">*</span> </p>
										</div>
										<div className="selectlocation">
                      <div>{this.props.TotCostEstForPrp}</div>
										</div> */}
									</div>
                  <div>
                  {this.props.AdvEmptyError ?
                    <div className="expense-note-det">
                      <span className="prpexpnote" >Advance Amt. Approval Cannot Be Empty</span>
                    </div> : null }
                    <div className="expense-note-det">
                      <span className="prpexpnote" >Note:</span>&nbsp; 
                        PRP Advance Amount Should Be 0 or Equal To Estimated PRP Amount.
                    </div>
										{this.props.ErrorMessageState ? 
                    <div className="expense-note-det">
                    <span className="prpexpnote" >
                      Approval Amount Cannot Be Greater Than Estimated Amount
                    </span>
                   </div> : null }
                  </div>
            			</div>
                  <div className=" prpacount-table" >
                    <table className="stripe row-border order-column"  >
                      <thead>
                        <tr>
                          <th rowSpan="1" colSpan="1" className="acountname">Expense Name</th>
                          <th rowSpan="1" colSpan="1"  className="acountname">Estimated</th>
                          <th rowSpan="1" colSpan="1"  className="acountname">Approval amount</th>
                        </tr>                
                      </thead>
                      <tbody>
                        {this.renderTableData()}
                      </tbody>
                      <tfoot>
                      <tr className="training-amt">  
                        <th></th>
                        <th className="trainingamt-total"> ₹ {estimatedTotal}</th>
                        <th className="trainingamt-total">₹ {ApprovalTotal}</th>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            </React.Fragment>
        )
    }
}
export default OtherPrpAccountDetails;        