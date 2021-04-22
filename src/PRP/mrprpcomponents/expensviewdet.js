import React from 'react'
import { Component } from 'react';
import { Button, Col, Row, Form } from 'react-bootstrap'

import '../../../public/assets/css/sfcstyle.css'
import '../../../public/assets/css/transactionmodule.css'



class Expesedetview extends Component {

    constructor(props) {
        super(props);
        this.state = {
             
        }
        this.onAdvancReceivedQty = this.onAdvancReceivedQty.bind(this)
        this.getGrandEstimatevalue = this.getGrandEstimatevalue.bind(this)
        this.getAdvanceRequested = this.getAdvanceRequested.bind(this)
        this.getAdvanceAmount = this.getAdvanceAmount.bind(this)
        this.getbalanceValue = this.getbalanceValue.bind(this)
    }

    onAdvancReceivedQty(code, event) {
        let Accountlist = this.props.Accountheads;
        for (let i = 0; i < Accountlist.length; i++) {
            // console.log(code,Accountlist[i].code, "code")
            if (Accountlist[i].ExpCode == code) {
                let newValue = event.target.value;

                Accountlist[i].n_AdvanceAmount = newValue;
                break;
            }
        }
        this.setState({ Accountheads: Accountlist })
        this.props.onPrpExpense(Accountlist)
       
    }

     

    getGrandEstimatevalue() {
        
        let grandvalue = 0
        let AccountheadsList = this.props.Accountheads;
        AccountheadsList.map((list) => {
            grandvalue = grandvalue + (list.Estimated == "" ? 0 : parseFloat(list.Estimated))
        })
       
        return grandvalue
    }

    getAdvanceRequested() {
        let grandvalue = 0
        let AccountheadsList = this.props.Accountheads;
        AccountheadsList.map((list) => {
            grandvalue = grandvalue + (list.AdvanceRequested == "" ? 0 : parseFloat(list.AdvanceRequested))
        })
        return grandvalue
    }

    getAdvanceAmount() {
        let grandvalue = 0
        let AccountheadsList = this.props.Accountheads;
        AccountheadsList.map((list) => {
            grandvalue = grandvalue + (list.n_AdvanceAmount == "" ? 0 : parseFloat(list.n_AdvanceAmount))
        })
        return grandvalue
    }

    getbalanceValue() {
        let balance = 0
        let AccountheadsList = this.props.Accountheads;
        AccountheadsList.map((list) => {
            balance = balance + (list.AdvanceRequested - list.n_AdvanceAmount)
        })
        return balance
    }

    render() {
        // console.log(this.state.RequestCancel, "RequestCancel111")
        // console.log(this.props.Accountheads,"Accountheads")


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
                                        <div className="prp-det-expense-head">{this.getGrandEstimatevalue()}</div>
                                    </div>
                                </div>
                                <div className="expense-note-det"><span className="prpexpnote">Note:</span>&nbsp; PRP Advance Amount Should Be 0 or Equal To Estimated PRP Amount.</div>
                            </div>


                            <div className=" prpacount-table" >

                                <table id="example" class="stripe row-border order-column"  >
                                    <thead>
                                        <tr>
                                            <th rowspan="1" colspan="1" className="acountname">Expense Name</th>
                                            <th rowspan="1" colspan="1" className="acountname">Estimated</th>
                                            <th rowspan="1" colspan="1" className="acountname">Advance Requested</th>
                                            <th rowspan="1" colspan="1" className="acountname">Advance Received</th>
                                            <th rowspan="1" colspan="1" className="acountname">Balance</th>

                                        </tr>
                                    </thead>
                                    {this.props.Accountheads.length ? this.props.Accountheads.map(res =>
                                        <tbody key={res.ExpCode}>
                                            <tr>
                                                <th className="trainingamt">{res.ExpName}</th>
                                                <th className="trngexpenamt">{res.Estimated}</th>
                                                <th className="trngexpenamt">{res.AdvanceRequested}</th>
                                                <th className="trainingamt">
                                                    <div>
                                                        <input type="number"
                                                            className="training-amt-input"
                                                            min="0"
                                                            placeholder=""
                                                            onChange={(event) => this.onAdvancReceivedQty(res.ExpCode, event)}
                                                            value={res.n_AdvanceAmount}
                                                            onWheel={event => event.currentTarget.blur()}
                                                            disabled={this.props.RequestCancel} /></div></th>
                                                {/* <th className="trngexpenamt">{ res.n_AdvanceAmount > res.AdvanceRequested ?  "" : res.AdvanceRequested - res.n_AdvanceAmount}</th> */}
                                                <th className="trngexpenamt">{res.AdvanceRequested - res.n_AdvanceAmount}</th>

                                            </tr>

                                        </tbody>) : null}

                                    <tfoot>
                                        <tr className="training-amt">
                                            <th></th>
                                            <th className="trainingamt-total">₹ {this.getGrandEstimatevalue()}</th>
                                            <th className="trainingamt-total">₹ {this.getAdvanceRequested()}</th>
                                            <th className="trainingamt-total">₹ {this.getAdvanceAmount()}</th>
                                            <th className="trainingamt-total">₹ {this.getbalanceValue()}</th>
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
export default Expesedetview;        