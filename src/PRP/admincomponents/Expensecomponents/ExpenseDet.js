
import React from 'react'
import { Component } from 'react';
import { Button, Col, Row, Form } from 'react-bootstrap'

// import '../../../public/assets/css/sfcstyle.css'
// import '../../../public/assets/css/transactionmodule.css'
class ExpenseDet extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
		}
		updateTotal(n_ConfirmedAmount,n_estimatedamount,c_code){
			this.props.ConfirmedAmtChanged(n_ConfirmedAmount,n_estimatedamount,c_code)
		}
		updateTotal2(n_AdvanceAmount,n_ConfirmedAmount,c_code){
			this.props.AdvanceAmtChanged(n_AdvanceAmount,n_ConfirmedAmount,c_code)
		}
		renderTable(){
			return this.props.Accountheads.map((item, index) => {
        const {c_code, c_name, n_estimatedamount, n_ApprovedAmount,n_ConfirmedAmount,n_AdvanceAmount} = item
         return (
           <tr key={index}>
             <th className="trainingamt">{c_name}</th>
             <th className="trainingamt">{n_estimatedamount}</th>
             <th className="trainingamt">{n_ApprovedAmount}</th>
             {this.props.n_status == 1 ?  
             <>
             <th><input type="number" defaultValue={parseInt(n_ConfirmedAmount)} ref={this.input}
             className="training-amt-input" onChange={() => 
              this.updateTotal(item.n_ConfirmedAmount, item.n_estimatedamount, item.c_code)}/>
							</th>
							<th><input type="number" defaultValue={parseInt(n_AdvanceAmount)} ref={this.input}
             className="training-amt-input" onChange={() => 
              this.updateTotal2(item.n_AdvanceAmount, item.n_ConfirmedAmount, item.c_code)}/>
							</th>
             </>
             : 
              <>
              <th className="trainingamt">{n_ConfirmedAmount}</th>
              <th className="trainingamt">{n_AdvanceAmount}</th>
              </>}						 
           </tr>
         )
      })
		}
    render() {
			const {
				Accountheads,
				ErrorMessageState,
        TotCostEstForPrp,
        AdvEmptyError,
        ConfEmptyError,
        n_status
			}= this.props;
				let estimatedTotal = this.props.Accountheads.reduce( (item, currentValue) =>
        item + parseFloat(currentValue.n_estimatedamount) , 0)
        
				let ApprovedTotal = this.props.Accountheads.filter( item => item.n_ApprovedAmount != "").reduce( (item, currentValue) =>
        item + parseFloat(currentValue.n_ApprovedAmount) , 0)
        
        let ConfirmedTotal = this.props.Accountheads.filter( item => item.n_ConfirmedAmount != "").reduce( (item, currentValue) =>
        item + parseFloat(currentValue.n_ConfirmedAmount) , 0)

        let AdvanceTotal = this.props.Accountheads.filter( item => item.n_AdvanceAmount != "").reduce( (item, currentValue) =>
        item + parseFloat(currentValue.n_AdvanceAmount) , 0)
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
                					<div className="distributorClaimListsfc">
                  					<p className="paralocation-prp">Total Cost Estimated For PRP(₹)<span className="colorRed">*</span> </p>
               						</div>
                					<div className="selectlocation">
														<div>{this.props.TotCostEstForPrp}</div>
               						</div>
              					</div>
                        <div>
                        {this.props.ConfEmptyError ? <div  className="expense-note-det"><span className="prpexpnote">Confirmed Amt. By Desk Cannot Be Empty</span> </div>: null}
                        {this.props.AdvEmptyError ? <div className="expense-note-det"><span className="prpexpnote">Final Advance Cannot Be Empty</span></div> : null}
												{this.props.ErrorMessageState ? 	<div className="expense-note-det"><span className="prpexpnote">Note:</span>&nbsp; Confirmed Amount Should Be 0 or Equal To Estimated Amount.</div> : null }
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
                              <th rowSpan="1"  colSpan="1" className="acountname">Final Advance</th>
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
															<th className="trainingamt-total">₹ {AdvanceTotal}</th>
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
export default ExpenseDet;        