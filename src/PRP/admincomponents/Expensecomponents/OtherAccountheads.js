import React from 'react'
import { Component } from 'react';

class OtherAccountheads extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    renderTable () {
      return this.props.Accountheads.map((item, index) => {
        const {ExpCode, ExpName, EstimatedAmt, ConfActualAmt} = item
         return (
           <tr key={index}>
             <th className="trainingamt">{ExpName}</th>
             <th className="trainingamt">{EstimatedAmt}</th>
             <th className="trainingamt">{item.n_AdvanceAmount}</th>
             {/* {this.props.n_status <=2  ? 
              <th><input type="number" className="training-amt-input" 
              onChange={(event) => this.props.GetConfActualAmt(event,item.ExpCode,item.ConfActualAmt)}
              defaultValue={parseInt(ConfActualAmt)} ref={this.input}/></th> :
              <th className="trainingamt">{item.n_AdvanceAmount}</th> } */}
           </tr>
         )
      })
    }
    render() {
      let EstimatedAmtTotal = this.props.Accountheads.reduce((item, currentvalue) => 
      item + parseFloat(currentvalue.EstimatedAmt),0)

      let AdvanceConfirmedTotal = this.props.Accountheads.reduce((item, currentvalue) => 
      item + parseFloat(currentvalue.n_AdvanceAmount),0)

        return (
            <React.Fragment>
              <div className="pullleft KamClaimTablesfc">
                <div className="ongoing-orders-sfc mrsfcTable sfcFilterOpt">
                  <div className="prpacount">
                    <div className="prpexpense-det">PRP Expense Details</div>
                      <div className="locationsfa">
                        <div className="user-heirarchy-field-containers">
                          {/* <div className="distributorClaimListsfc">
                            <p className="paralocation-prp">Total Cost EstimatedAmt For PRP(₹)<span className="colorRed">*</span> </p>
                          </div>
                          <div className="selectlocation">
                            {this.props.Details ? this.props.Details.map((item,index) => (
                              <div key={index}>{item.TotCostEstForPrp}</div>
                            )) : null}
                          </div> */}
                        </div>
                        <div>
                        {this.props.EmptyError ?
                             <div className="expense-note-det">
                               <span className="prpexpnote" >Advance Confirmed Cannot Be Empty</span>
                             </div> : null }
                            {/* <div className="expense-note-det">
                             <span className="prpexpnote" >Note:</span>&nbsp; 
                              PRP Advance Amount Should Be 0 or Equal To EstimatedAmt PRP Amount.
                            </div> */}
                            {this.props.ErrorMessageState ? <div className="expense-note-det">
                             <span className="prpexpnote" >Advance Confirmed Cannot Be Greater Than Estimated Amount</span>                             
                            </div> : null }
                        </div>
                      </div>          
                      <div className=" prpacount-table" >                          
                        <table id="example" className="stripe row-border order-column"  >
                          <thead>
                            <tr>
                              <th rowSpan="1" colSpan="1" className="acountname">Expense Name</th>
                              <th rowSpan="1" colSpan="1"  className="acountname">Estimated</th>
                              <th rowSpan="1"  colSpan="1" className="acountname">Advance Confirmed</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.renderTable()}
                          </tbody>
                          <tfoot>
                            <tr className="training-amt">  
                              <th></th>
                              <th className="trainingamt-total">₹ {EstimatedAmtTotal}</th>
                              <th className="trainingamt-total">₹ {AdvanceConfirmedTotal}</th>
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
export default OtherAccountheads;        