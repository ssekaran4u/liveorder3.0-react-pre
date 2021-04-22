import React from 'react'
import { Component } from 'react';
import { Button, Col, Row, Form } from 'react-bootstrap'

import '../../../public/assets/css/sfcstyle.css'
import '../../../public/assets/css/transactionmodule.css'



class PrpAcountdetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Accountheads: [],
        }
        this.getGrandvalue = this.getGrandvalue.bind(this)
				this.onQtyChange = this.onQtyChange.bind(this)
				this.changeest = this.changeest.bind(this)
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        // console.log(nextProps,"nextProps")
        if (nextProps.golist.Accountheads) {
            this.setState({ Accountheads: nextProps.golist.Accountheads })

        }
        if (nextProps.Accountheaderr) {
            this.setState({ Accountheaderr: nextProps.Accountheaderr })
        }
    }

    onQtyChange(code, event) {
        let AccountheadsList = this.state.Accountheads;
        for (let i = 0; i < AccountheadsList.length; i++) {
            // console.log(code,AccountheadsList[i].itemcode, "code")
            if (AccountheadsList[i].c_code == code) {
                let newValue = event.target.value;


                if(newValue.length < 9){
                    AccountheadsList[i].n_estimatedamount = newValue;
                 }else{
                    alert("Please Enter Upto 8 Digit")
                 }
                break;
            }
        }
        this.setState({ Accountheads: AccountheadsList })
        this.props.onClickAccountheads(AccountheadsList)

    }
		changeest(code,event){
			if(event.target.value == ""){
				let AccountheadsList = this.state.Accountheads;
        for (let i = 0; i < AccountheadsList.length; i++) {
            // console.log(code,AccountheadsList[i].itemcode, "code")
            if (AccountheadsList[i].c_code == code) {
                let newValue = "0";


                if(newValue.length < 9){
                    AccountheadsList[i].n_estimatedamount = newValue;
                 }else{
                    alert("Please Enter Upto 8 Digit")
                 }
                break;
            }
        }
        this.setState({ Accountheads: AccountheadsList })
        this.props.onClickAccountheads(AccountheadsList)
			}
			else{
				// console.log("in else")
			}
		}
    getGrandvalue() {
        let grandvalue = 0
        let AccountheadsList = this.state.Accountheads;
        AccountheadsList.map((list) => {
            grandvalue = grandvalue + (list.n_estimatedamount == "" ? 0 : parseFloat(list.n_estimatedamount))
        })
        return grandvalue
    }

    render() {
        // console.log(this.props.golist,"gooolist")
        // console.log(this.state.Accountheads,"Accountheads")

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
                                            <th rowspan="1" colspan="1" className="acountname">Total(₹)</th>
                                        </tr>
                                        {/* <tr>
                                            <th className="trainingamt">{res.c_name}</th>
                                            <th className="trainingamt"><div> <input type="number" className="training-amt-input" min="0" placeholder="800.00" value={res.n_estimatedamount}/></div></th>
                                            <th className="trngexpenamt">{res.n_estimatedamount}</th>
                                        </tr> */}

                                    </thead>
                                    {this.state.Accountheads.length ? this.state.Accountheads.map(res =>
                                        <tbody>
                                            <tr>
                                            		<th className="trainingamt">{res.c_name}</th>
                                                {/* <th className="trainingamt"><div> <input type="number" className="training-amt-input" onChange={(event) => this.onQtyChange(res.c_code, event)} placeholder="" min="" value={res.n_estimatedamount == "" ? 0 : res.n_estimatedamount} onWheel={event => event.currentTarget.blur()} /></div> */}
                                                <th className="trainingamt"><div> 
																									<input type="number" className="training-amt-input" 
																									onChange={(event) => this.onQtyChange(res.c_code, event)} 
																									placeholder="" min="" value={res.n_estimatedamount} 
																									onWheel={event => event.currentTarget.blur()} onBlur={(event) => this.changeest(res.c_code, event)}/></div>
                                                    <div className="daterror-msg"> {this.state.Accountheaderr} </div></th>
                                                <th className="trngexpenamt">{res.n_estimatedamount == "" ? 0 :res.n_estimatedamount}</th>
                                            </tr>
                                        </tbody>) : null}
                                    <tfoot>
                                        <tr className="training-amt">
                                            <th></th>
                                            <th></th>
                                            <th className="trainingamt-total" >₹ {this.getGrandvalue()}</th>
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
export default PrpAcountdetail;        