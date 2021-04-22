import React from 'react'
import { Component } from 'react';

class AdvanceDet extends Component {
    constructor(props) {
        super(props);
        this.state = {
          balancecal : this.props.Accountheads.reduce((item, currentvalue) => 
          item + ((parseFloat(currentvalue.Estimated) - parseFloat(currentvalue.AdvanceReceived))),0)
        }
        this.onAdvancReceivedQty = this.onAdvancReceivedQty.bind(this)
    }
    renderTable () {
      return this.props.Accountheads.map((item, index) => {
        const {ExpCode, ExpName, Estimated, AdvanceRequested,n_AdvanceAmount,n_Conf_AdvanceAmount} = item
         return (
           <tr key={index}>
             <th className="trainingamt">{ExpName}</th>
             <th className="trainingamt">{Estimated}</th>
             <th className="trainingamt">{AdvanceRequested}</th>
             <th className="trainingamt">{n_AdvanceAmount}</th>
             <th><input type="number" className="training-amt-input" 
              onChange={(event) => this.props.GetAdvanceConfirm(event,item.ExpCode,item.Estimated,item.n_Conf_AdvanceAmount)}
              defaultValue={n_Conf_AdvanceAmount} ref={this.input} disabled={this.props.RequestCancel}/></th>
            <th className="trainingamt">{parseFloat(Estimated) - parseFloat(n_AdvanceAmount)}</th>
           </tr>
         )
      })
    }
    onAdvancReceivedQty(code, event) {
      let Accountlist = this.props.Accountheads;
      for (let i = 0; i < Accountlist.length; i++) {
          // console.log(code,Accountlist[i].code, "code")
          if (Accountlist[i].ExpCode == code) {
              let newValue = event.target.value;
             // if(newValue <= Accountlist[i].Estimated){
                Accountlist[i].n_Conf_AdvanceAmount = newValue;
            //  }
              // else{
              //   console.log("in else block")
              // }
          }
      }
      this.setState({ Accountheads: Accountlist })
     this.props.onPrpExpense(Accountlist)
     
  }
  // onAdvancReceivedQty(event,ExpCode,Estimated,n_Conf_AdvanceAmount){
  //   debugger
  //   let elementsIndex
  //     elementsIndex = this.props.Accountheads.findIndex(element => element.ExpCode == ExpCode )
  //     let newArray = [...this.props.Accountheads]
  //     newArray[elementsIndex] = {...newArray[elementsIndex], n_Conf_AdvanceAmount: event.target.value}
  //     if(parseInt(newArray[elementsIndex].n_Conf_AdvanceAmount) > parseInt(newArray[elementsIndex].Estimated)){
  //       this.setState({DisableBtn : true})
  //       this.setState({ErrorMessageState : true})
  //     }else{
  //       this.setState({DisableBtn : false})
  //       this.setState({ErrorMessageState : false})
  //       this.setState({Accountheads : newArray})
  //       this.props.onPrpExpense(newArray)
  //     }	
  // }
    render() {
      let EstimatedTotal = this.props.Accountheads.reduce((item, currentvalue) => 
      item + parseFloat(currentvalue.Estimated),0)

      let AdvanceRequestedTotal = this.props.Accountheads.reduce((item, currentvalue) => 
      item + parseFloat(currentvalue.AdvanceRequested),0)

      let AdvanceReceivedTotal = this.props.Accountheads.reduce((item, currentvalue) => 
      item + parseFloat(currentvalue.n_AdvanceAmount),0)
    
      let ConfirmedTotal = this.props.Accountheads.filter( item => item.n_Conf_AdvanceAmount != "").reduce( (item, currentValue) =>
        item + parseFloat(currentValue.n_Conf_AdvanceAmount) , 0)
        
      // let BalanceTotal = this.props.Accountheads.reduce((item, currentvalue) => 
      // item + ((parseFloat(EstimatedTotal) - parseFloat(ConfirmedTotal))),0)

      let BalanceTotal = EstimatedTotal - ConfirmedTotal
        return (
            <React.Fragment>
              <div className="pullleft KamClaimTablesfc">
                <div className="ongoing-orders-sfc mrsfcTable sfcFilterOpt">
                  <div className="prpacount">
                    <div className="prpexpense-det">PRP Expense Details</div>
                      <div className="locationsfa">
                        <div className="user-heirarchy-field-containers">
                          <div className="distributorClaimListsfc">
                            <p className="paralocation-prp">Total Cost Estimated For PRP(₹)<span className="colorRed">*</span> </p>
                          </div>
                          <div className="selectlocation">
                            {this.props.Details ? this.props.Details.map((item,index) => (
                              <div key={index}>{item.TotCostEstForPrp}</div>
                            )) : null}
                          </div>
                        </div>
                        <div>
                        {this.props.EmptyError ?
                             <div className="expense-note-det">
                               <span className="prpexpnote" >Advance Confirmed Cannot Be Empty</span>
                             </div> : null }
                             <div className="expense-note-det">
                             <span className="prpexpnote" >Note:</span>&nbsp; 
                              PRP Advance Amount Should Be 0 or Equal To Estimated PRP Amount.
                            </div>
                        </div>
                      </div>          
                      <div className=" prpacount-table" >                          
                        <table id="example" className="stripe row-border order-column"  >
                          <thead>
                            <tr>
                              <th rowSpan="1" colSpan="1" className="acountname">Expense Name</th>
                              <th rowSpan="1" colSpan="1"  className="acountname">Estimated</th>
                              <th rowSpan="1" colSpan="1"  className="acountname">Advance Requested</th>
                              <th rowSpan="1"  colSpan="1" className="acountname">Advance Received</th>
                              <th rowSpan="1"  colSpan="1" className="acountname">Advance Confirmed</th>
                              <th rowSpan="1"  colSpan="1" className="acountname">Balance</th>
                            </tr>
                          </thead>
                          {/* <tbody>
                            {this.renderTable()}
                          </tbody> */}
                        {this.props.Accountheads.length ? this.props.Accountheads.map(res =>
                        <tbody key={res.ExpCode}>
                          <tr>
                              <th className="trainingamt">{res.ExpName}</th>
                              <th className="trngexpenamt">{res.Estimated}</th>
                              <th className="trngexpenamt">{res.AdvanceRequested}</th>
                              <th className="trngexpenamt">{res.n_AdvanceAmount}</th>
                              <th className="trainingamt">
                                <div>
                                  <input type="number"
                                    className="training-amt-input"
                                    min="0"
                                    placeholder=""
                                    onChange={(event) => this.onAdvancReceivedQty(res.ExpCode, event)}
                                    value={res.n_Conf_AdvanceAmount}
                                    onWheel={event => event.currentTarget.blur()}
                                    disabled={this.props.RequestCancel} onBlur={(event) => this.props.balchanged(event)}/></div></th>
                              {/* <th className="trngexpenamt">{ res.n_AdvanceAmount > res.AdvanceRequested ?  "" : res.AdvanceRequested - res.n_AdvanceAmount}</th> */}
                              <th className="trainingamt">{res.n_Conf_AdvanceAmount != "" ? res.AdvanceRequested - res.n_Conf_AdvanceAmount :  res.AdvanceRequested - res.n_AdvanceAmount }</th>
                          </tr>

                        </tbody>) : null}
                          <tfoot>
                            <tr className="training-amt">  
                              <th></th>
                              <th className="trainingamt-total">₹ {EstimatedTotal}</th>
                              <th className="trainingamt-total">₹ {AdvanceRequestedTotal}</th>
                              <th className="trainingamt-total">₹ {AdvanceReceivedTotal}</th>
                              <th className="trainingamt-total">₹  {ConfirmedTotal}</th>
                              <th className="trainingamt-total">₹ {this.props.checkfordata}</th>
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
export default AdvanceDet;        