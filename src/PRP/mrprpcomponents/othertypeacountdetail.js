import React from 'react'
import { Component } from 'react';
import { Button, Col, Row, Form } from 'react-bootstrap'

import '../../../public/assets/css/sfcstyle.css'
import '../../../public/assets/css/transactionmodule.css'



class OtherPrpexpAcount extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
        this.getGrandEstimatevalue = this.getGrandEstimatevalue.bind(this)
        this.onActualAmt = this.onActualAmt.bind(this)
        this.getActualAmount = this.getActualAmount.bind(this)
    }



    onActualAmt(code, event) {
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
        this.props.onClickAccountheads(Accountlist,this.getGrandEstimatevalue(), this.getActualAmount())
    }

    getGrandEstimatevalue() {
        let grandvalue = 0
        let AccountheadsList = this.props.Accountheads;
        AccountheadsList.map((list) => {
            grandvalue = grandvalue + (list.EstimatedAmt == "" ? 0 : parseFloat(list.EstimatedAmt))
        })
        return grandvalue
    }

    getActualAmount() {
        let grandvalue = 0
        let AccountheadsList = this.props.Accountheads;
        AccountheadsList.map((list) => {
            grandvalue = grandvalue + (list.n_AdvanceAmount == "" ? 0 : parseFloat(list.n_AdvanceAmount))
        })
        return grandvalue
    }

    render() {
        // console.log(this.props.Accountheads,"Accountheads")
        // console.log(this.getGrandEstimatevalue(), this.getActualAmount(),"grand")

        return (
            <React.Fragment>

                <div className="pullleft KamClaimTablesfc">
                    <div className="ongoing-orders-sfc mrsfcTable sfcFilterOpt">


                        <div className=" prpacount">
                            <div>
                                <div className="acount-detailsprp">
                                    Account Details
                                </div>
                            </div>



                            <div className=" prpacount-table" >
                                <table id="example" class="stripe row-border order-column"  >

                                    <thead>
                                        <tr>
                                            <th rowspan="1" colspan="1" className="acountname">Account Name</th>
                                            <th rowspan="1" colspan="1" className="acountname">Estimate Amount(₹)</th>
                                            <th rowspan="1" colspan="1" className="acountname">Actual Amount(₹)</th>
                                        </tr>
                                    </thead>
                                    
                                    {this.props.Accountheads.length ? this.props.Accountheads.map(res =>
                                        <tbody key={res.ExpCode}>
                                        <tr>
                                            <th className="trainingamt">{res.ExpName}</th>
                                            <th className="trngexpenamt">{res.EstimatedAmt}</th>
                                            <th className="trainingamt"><div> <input type="number" className="training-amt-input" placeholder="" min="" onChange={(event) => this.onActualAmt(res.ExpCode, event)}  value={res.n_AdvanceAmount} onWheel={event => event.currentTarget.blur()} /></div>
                                                {/* <div className="daterror-msg"> 42 </div> */}
                                            </th>
                                        </tr>
                                    </tbody>) : null}
                                    <tfoot>
                                        <tr className="training-amt">
                                        <th className="trainingamt-total" >Total</th>
                                        <th className="trainingamt-total" >₹ {this.getGrandEstimatevalue()}</th>
                                            <th className="trainingamt-total" >₹ {this.getActualAmount()}</th>
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
export default OtherPrpexpAcount;        