import React from 'react'
import { Component } from 'react';
import { Button, Col, Row, Form } from 'react-bootstrap'
import {postToServer} from '../../lib/comm-utils';

import '../../../public/assets/css/sfcstyle.css'
import '../../../public/assets/css/transactionmodule.css'



class ReqExpenseDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
					Error : 'false',
				}
		}
		updateTotal(n_ApprovedAmount,n_estimatedamount,c_code,n_AdvanceAmount){
			this.props.AmtChange(n_ApprovedAmount,n_estimatedamount,c_code,n_AdvanceAmount)
    }
    AdvanceEdit(n_AdvanceAmount,n_estimatedamount,c_code){
      this.props.AdvanceAmtChange(n_AdvanceAmount, n_estimatedamount, c_code)
    }
		renderTableData () {
      return this.props.Accountheads.map((item, index) => {
        const {c_code, c_name, n_AdvanceAmount, n_ApprovedAmount, n_ConfirmedAmount, n_estimatedamount} = item
         return (
           <tr key={index}>
             <th className="trainingamt">{c_name}</th>
             <th className="trainingamt">{n_estimatedamount}</th>
             {/* <th className="trainingamt">{n_AdvanceAmount}</th> */}
             {this.props.isapproved.length  || this.props.n_status != '0' ? <th className="trainingamt">{n_ApprovedAmount}</th>
              : 
             <th><input type="number" defaultValue={parseInt(n_ApprovedAmount)} ref={this.input}
             className="training-amt-input" onChange={() => 
              this.updateTotal(item.n_ApprovedAmount, item.n_estimatedamount, item.c_code)}/></th>}

            {this.props.isapproved.length  || this.props.n_status != '0'  ? <th className="trainingamt">{n_AdvanceAmount}</th>
            :
            <th><input type="number" defaultValue={parseInt(n_AdvanceAmount)} ref={this.input}
            className="training-amt-input" onChange={() => 
             this.AdvanceEdit(item.n_AdvanceAmount, item.n_estimatedamount, item.c_code)}/></th>}
           </tr>
         )
      })
    }
    render() {
			const {
				Accountheads,
        n_status,
        ErrorMessageState,
        TotCostEstForPrp,
        AdvEmptyError,
        EstEmptyError
			} = this.props
				let estimatedTotal = this.props.Accountheads.reduce( (item, currentValue) =>
				item + parseFloat(currentValue.n_estimatedamount) , 0)

				let AdvanceReqTotal = this.props.Accountheads.filter(item => item.n_AdvanceAmount != "").reduce((item, currentValue) => 
        item + parseFloat(currentValue.n_AdvanceAmount), 0)
        
        let ApprovedTotal = this.props.Accountheads.filter(item => item.n_ApprovedAmount != "").reduce((item, currentValue) => 
        item + parseFloat(currentValue.n_ApprovedAmount), 0)

        return (
            <React.Fragment>
                <div className="pullleft KamClaimTablesfc">
                    <div className="ongoing-orders-sfc mrsfcTable sfcFilterOpt">
                        <div className="prpacount">
                            <div>
                                <div className="prpexpense-det">
                                PRP Expense Details
                                </div>
                            </div>
                            <div className="locationsfa">
														<div className="user-heirarchy-field-containers">
															<div className="distributorClaimListsfc">
																<p className="paralocation-prp">Total Cost Estimated For PRP(₹)<span className="colorRed">*</span> </p>
															</div>
															<div className="selectlocation">
                                <div>{this.props.TotCostEstForPrp}</div>
															</div>
														</div>
														<div>
                            {this.props.AdvEmptyError ?
                             <div className="expense-note-det">
                               <span className="prpexpnote" >Advance Amt. Approval Cannot Be empty</span>
                             </div> : null }
                             {this.props.EstEmptyError ?
                             <div className="expense-note-det">
                               <span className="prpexpnote" >Estimate Amt. Approval Cannot Be Empty</span>
                             </div> : null }
                             <div className="expense-note-det">
                             <span className="prpexpnote" >Note:</span>&nbsp; 
                              PRP Advance Amount Should Be 0 or Equal To Estimated PRP Amount.
                            </div>
                            {this.props.ErrorMessageState ? <div className="expense-note-det">
                             <span className="prpexpnote" >
                              Approval Cannot Be Greater Than Estimated Amount
                             </span>
                            </div> : null }
                            </div>
            							 </div> 
                            <div className=" prpacount-table" >               
                                <table id="example" className="stripe row-border order-column"  >
                                    <thead>
                                        <tr>
                                          <th rowSpan="1" colSpan="1" className="acountname">Expense Name</th>
                                          <th rowSpan="1" colSpan="1"  className="acountname">Estimated</th>
                                          {/* <th rowSpan="1" colSpan="1"  className="acountname">Advance Req </th> */}
                                          <th rowSpan="1"  colSpan="1" className="acountname">Estimate Amt. Approval</th>
                                          <th rowSpan="1"  colSpan="1" className="acountname">Advance Amt. Approval</th>
                                        </tr>
                                    	</thead>
																			<tbody>
																				{this.renderTableData()}
																			</tbody>
                                    <tfoot>
                                      <tr className="training-amt">  
                                        <th></th>
																				<th className="trainingamt-total">₹ {estimatedTotal}</th>
																				{/* <th className="trainingamt-total">₹ {AdvanceReqTotal}</th> */}
																				<th className="trainingamt-total">₹ {ApprovedTotal}</th>
                                        <th className="trainingamt-total">₹ {AdvanceReqTotal}</th>
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
export default ReqExpenseDetails;