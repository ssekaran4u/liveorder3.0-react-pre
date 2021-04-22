import React from 'react'
import { Component } from 'react';
import { Button, Col, Row, Form } from 'react-bootstrap'

import '../../../public/assets/css/sfcstyle.css'
import '../../../public/assets/css/transactionmodule.css'
class OtherExpense extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
		}
		updateTotal(n_ConfirmedAmount,n_EstimatedAmount,C_Code,event){      
			this.props.ConfirmedOtherAmtChanged(n_ConfirmedAmount,n_EstimatedAmount,C_Code,event)
		}
		renderTable(){
			return this.props.Accountheads.map((item, index) => {
        const {C_Code, C_Name, n_EstimatedAmount, n_ApprovedAmount,n_ConfirmedAmount} = item
         return (
           <tr key={index}>
             <th className="trainingamt">{C_Name}</th>
             <th className="trainingamt">{n_EstimatedAmount}</th>
             <th className="trainingamt">{n_ApprovedAmount}</th>
             {this.props.n_status == 1 || this.props.n_status == 3 ?  
             <>
             <th><input type="number" defaultValue={parseInt(n_ConfirmedAmount)} ref={this.input}
             className="training-amt-input" onChange={(event) => 
              this.updateTotal(item.n_ConfirmedAmount, item.n_EstimatedAmount, item.C_Code,event)}/>
							</th>
             </>
             : 
              <>
              <th className="trainingamt">{n_ConfirmedAmount}</th>
              </>}
						 
           </tr>
         )
      })
		}
    render() {
			const {
				Accountheads,
				ErrorMessageState,
				AdvanceTotal,
        EstimatedAmount,
        emptyErrorState,
        n_status
			}= this.props;
				let estimatedTotal = this.props.Accountheads.reduce( (item, currentValue) =>
        item + parseFloat(currentValue.n_EstimatedAmount) , 0)
        
				let ApprovedTotal = this.props.Accountheads.reduce( (item, currentValue) =>
        item + parseFloat(currentValue.n_ApprovedAmount) , 0)
        
        let ConfirmedTotal = this.props.Accountheads.filter( item => item.n_ConfirmedAmount != "").reduce( (item, currentValue) =>
        item + parseFloat(currentValue.n_ConfirmedAmount) , 0)
        return (
            <React.Fragment>
                <div className="pullleft KamClaimTablesfc">
                  <div className="ongoing-orders-sfc mrsfcTable sfcFilterOpt">
                    <div className="prpacount">
                      <div className="prpexpense-det">
                        PRP Expense Details
                      </div>
                      <div className="locationsfa">
              					<div className="user-heirarchy-field-containers">
                					{/* <div className="distributorClaimListsfc">
                  					<p className="paralocation-prp">Total Cost Estimated For PRP(₹)<span className="colorRed">*</span> </p>
               						</div>
                					<div className="selectlocation">
														<div>{this.props.EstimatedAmount}</div>
               						</div> */}
              					</div>
                        <div>
                        {this.props.emptyErrorState ? <span className="prpexpnote">Confirmed Amt. By Desk cannot be empty</span> : null}
                        <div className="expense-note-det appdetails"><span className="prpexpnote">Note:</span>&nbsp; Confirmed Amount Should Be 0 or Equal To Estimated Amount.</div> 
												{this.props.ErrorMessageState ? 	<div className="expense-note-det appdetails"><span className="prpexpnote">Confirmed Amount cannot be greater than Estimated Amount</span></div> : null }
                        </div>            				
            					</div>         
            					<div className=" prpacount-table" >                           
              					<table id="example" className="stripe row-border order-column"  >
                					<thead>
                  					<tr>
                              <th rowSpan="1" colSpan="1" className="acountname">Expense Name</th>
                              <th rowSpan="1" colSpan="1"  className="acountname">Estimated</th>
                              <th rowSpan="1" colSpan="1"  className="acountname">Approved Amt. By Manager</th>
                              <th rowSpan="1"  colSpan="1" className="acountname">Confirmed Amt. By Desk</th>
                            </tr>
                          </thead>
													<tbody>
														{this.renderTable()}
													</tbody>
                          <tfoot>
                            <tr className="training-amt">  
                              <th></th>
															<th className="trainingamt-total">₹ {estimatedTotal}</th>
															<th className="trainingamt-total">₹ {ApprovedTotal}</th>
															<th className="trainingamt-total">₹ {ConfirmedTotal}</th>
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
export default OtherExpense;        