import React from 'react'
import { Component } from 'react';

class OtherPrpExpense extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    renderTable () {
      return this.props.Accountheads.map((item, index) => {
        const {ExpCode, ExpName, EstimatedAmt, n_AdvanceAmount, AdvanceReceived,n_Conf_AdvanceAmount} = item
         return (
           <tr key={index}>
             <th className="trainingamt">{ExpName}</th>
             <th className="trainingamt">{EstimatedAmt}</th>
             <th className="trainingamt">{n_AdvanceAmount}</th>
            <th className="trainingamt">{parseFloat(EstimatedAmt) - parseFloat(n_AdvanceAmount)}</th>
           </tr>
         )
      })
    }
    render() {
      let EstimatedTotal = this.props.Accountheads.reduce((item, currentvalue) => 
      item + parseFloat(currentvalue.EstimatedAmt),0)

      let AdvanceReceivedTotal = this.props.Accountheads.reduce((item, currentvalue) => 
      item + parseFloat(currentvalue.n_AdvanceAmount),0)

      let n_Conf_AdvanceAmountTotal = this.props.Accountheads.reduce((item, currentvalue) => 
      item + ((parseFloat(currentvalue.EstimatedAmt) - parseFloat(currentvalue.n_AdvanceAmount))),0)
        return (
            <React.Fragment>
              <div className="pullleft KamClaimTablesfc">
                <div className="ongoing-orders-sfc mrsfcTable sfcFilterOpt">
                  <div className="prpacount">
                    <div className="prpexpense-det">PRP Expense Details</div>
                      <div className="locationsfa">
                        <div className="user-heirarchy-field-containers">
                          {/* <div className="distributorClaimListsfc">
                            <p className="paralocation-prp">Total Cost Estimated For PRP(₹)<span className="colorRed">*</span> </p>
                          </div>
                          <div className="selectlocation">
                            {this.props.Details ? this.props.Details.map((item,index) => (
                              <div key={index}>{item.n_EsitmatedTotAmt}</div>
                            )) : null}
                          </div> */}
                        </div>
                        <div className="expense-note-det"><span className="prpexpnote">Note:</span>&nbsp; PRP Advance Amount Should Be 0 or Equal To Estimated PRP Amount.</div>
                      </div>          
                      <div className=" prpacount-table" >                          
                        <table id="example" className="stripe row-border order-column"  >
                          <thead>
                            <tr>
                              <th rowSpan="1" colSpan="1" className="acountname">Expense Name</th>
                              <th rowSpan="1" colSpan="1"  className="acountname">Estimated</th>
                              <th rowSpan="1"  colSpan="1" className="acountname">Advance Received</th>
                              <th rowSpan="1"  colSpan="1" className="acountname">Balance</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.renderTable()}
                          </tbody>
                          <tfoot>
                            <tr className="training-amt">  
                              <th></th>
                              <th className="trainingamt-total">₹ {EstimatedTotal}</th>
                              <th className="trainingamt-total">₹ {AdvanceReceivedTotal}</th>
                              <th className="trainingamt-total">₹ {n_Conf_AdvanceAmountTotal}</th>
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
export default OtherPrpExpense;        