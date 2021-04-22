// import { de } from 'date-fns/locale';
import React from 'react'
import { Component } from 'react';
import { Button, Col, Row, Form } from 'react-bootstrap'

import '../../../public/assets/css/sfcstyle.css'
import '../../../public/assets/css/transactionmodule.css'



class BusinessDetailBrand extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Business: [],
            ss:"",
            MandatoryVisiblesetup : [],
            CurBussinessvisiblity : "",
            ExpBussinessvisiblity : ""
        }
        this.getGrandcurrentvalue = this.getGrandcurrentvalue.bind(this)
        this.onQtycurrentChange = this.onQtycurrentChange.bind(this)
        this.onQtyexpectedChange = this.onQtyexpectedChange.bind(this)
        this.getGrandexpectedvalue = this.getGrandexpectedvalue.bind(this)
    }

    // UNSAFE_componentWillReceiveProps(nextProps){
    //     // console.log(nextProps,"nextProps")
    //     if(nextProps.golist.Business.length > 0){
    //       this.setState({ Business: nextProps.golist.Business})
    //   }
    // }

    static getDerivedStateFromProps(nextProps, state) {
        // console.log(nextProps, "nextProps")
        if (nextProps.golist.Business) {
            return {
                Business: nextProps.golist.Business,
                CurBussinessvisiblity: nextProps.golist.MandatoryVisiblesetup[0].CurBussinessvisiblity,
                ExpBussinessvisiblity : nextProps.golist.MandatoryVisiblesetup[0].ExpBussinessvisiblity
            }
        }
        // if (nextProps.golist.MandatoryVisiblesetup) {
        //     debugger
        //     return {
        //         MandatoryVisiblesetup: nextProps.golist.MandatoryVisiblesetup,
            
        // }
    }

    onQtycurrentChange(code, event) {
        let BusinessList = this.state.Business;
        let newValue = ""
        for (let i = 0; i < BusinessList.length; i++) {
            // console.log(code,BusinessList[i].code, "code")
            if (BusinessList[i].code == code) {
                // if(event.target.value.length < 11){
                //     newValue = event.target.value;
                //    }else{
                //        alert("Please Enter Upto 10 digit")
                //    }
                let newValue = event.target.value;

         if(newValue.length < 11){
            BusinessList[i].CurrbussnessAmt = newValue;
         }else{
            alert("Please Enter Upto 10 Digit")
         }
                // BusinessList[i].CurrbussnessAmt = newValue;
                break;
            }
        }
        this.setState({ Business: BusinessList })
    }

    getGrandcurrentvalue() {
        let grandcurrentvalue = 0
        let BusinessList = this.state.Business;
        BusinessList.map((list) => {
            grandcurrentvalue = grandcurrentvalue + (list.CurrbussnessAmt == "" ? 0 : parseFloat(list.CurrbussnessAmt))
        })
        return grandcurrentvalue
    }

    onQtyexpectedChange(code, event) {
        let BusinessList = this.state.Business;
        let newValue = ""
        for (let i = 0; i < BusinessList.length; i++) {
            // console.log(code,BusinessList[i].code, "code")
            if (BusinessList[i].code == code) {
                // if(event.target.value.length < 11){
                //  newValue = event.target.value;
                // }else{
                //     alert("Please Enter Upto 10 digit")
                // }
                let newValue = event.target.value;
            //    this.setState({ss:newValue.length})

            if(newValue.length < 11){
                BusinessList[i].Expbussinessamt = newValue;
             }else{
                alert("Please Enter Upto 10 Digit")
             }
                // BusinessList[i].Expbussinessamt = newValue;
                break;
            }
        }
        this.setState({ Business: BusinessList })
        this.props.onBusiness(BusinessList)
    }

    getGrandexpectedvalue() {
        let grandexpectedvalue = 0
        let BusinessList = this.state.Business;
        BusinessList.map((list) => {
            grandexpectedvalue = grandexpectedvalue + (list.Expbussinessamt == "" ? 0 : parseFloat(list.Expbussinessamt))
        })
        return grandexpectedvalue
    }

    render() {
        // console.log(this.props.onBusiness,"onBusiness")
        // console.log(this.props.golist,"goolist")
        // console.log(this.state.Business,"Business")

        return (
            <React.Fragment>
                <div>
                    {this.state.CurBussinessvisiblity == 1 || this.state.ExpBussinessvisiblity == 1 ?
                    <div className="pullleft KamClaimTablesfc">
                    <div className="ongoing-orders-sfc mrsfcTable sfcFilterOpt">
                        <div className=" prpacount">
                            <div>
                                <div className="acount-detailsprp">
                                    Business Details Of Brandss 
                                </div>
                            </div>
                            <div className=" prpacount-table" >
                                <table id="example" class="stripe row-border order-column"  >
                                    <thead>
                                        <tr>
                                            <th rowspan="1" colspan="1" className="acountname">Brand Name</th>
																						{this.state.CurBussinessvisiblity == 1 ? <th rowspan="1" colspan="1" className="acountname">Current Business(₹)</th> :null}
                                            {this.state.ExpBussinessvisiblity == 1 ? <th rowspan="1" colspan="1" className="acountname">Expected Business(₹)</th> : null}
                                        </tr>
                                    </thead>
                                    {this.state.Business.length ? this.state.Business.map(res =>
                                        <tbody key={res.code}>
                                            <tr>
                                                <th className="trainingamt">{res.NAME.toLowerCase()}</th>
																								{this.state.CurBussinessvisiblity == 1 ? 
																								 <th className="trainingamt">
																								 <div> 
																										 <input type="number" 
																										 className="training-amt-input" 
																											 placeholder=""
																											 onChange={(event) => this.onQtycurrentChange(res.code, event)}
																											 value={res.CurrbussnessAmt == "" ? "": res.CurrbussnessAmt} 
																										 //   min="0"
																										 //   pattern="[1-9][0-9]{3}"
																										 //   maxlength="4"
																										 max={9999}
																											 onWheel={event => event.currentTarget.blur()} 
																											 required/>
																											 </div>
																											 </th> : null}
																					{this.state.ExpBussinessvisiblity == 1 ? 
																					<th className="trainingamt">
																					<div> 
																							<input type="number" 
																							className="training-amt-input"
																							 placeholder="" 
																							 onChange={(event) => this.onQtyexpectedChange(res.code, event)} 
																							 value={res.Expbussinessamt == "" ? "": res.Expbussinessamt} 
																							 min="0"
																							 pattern="\d*"
																							 maxlength="10"
																							 onWheel={event => event.currentTarget.blur()} />
																							 </div>
																							 {/* <div>{this.state.ss >= "10" ? "errror" : ""}</div> */}
																							 </th> : null}

                                            </tr>
                                        </tbody>) : null}

                                    <tfoot>
                                        <tr className="training-amt">
                                            <th></th>
                                            {this.state.CurBussinessvisiblity == 1 ? <th className="trainingamt-total">₹ {this.getGrandcurrentvalue()}</th> : null}
                                            {this.state.ExpBussinessvisiblity == 1 ? <th className="trainingamt-total">₹ {this.getGrandexpectedvalue()}</th> : null}
                                        </tr>
                                    </tfoot>

                                </table>

                            </div>

                        </div>

                    </div>

                </div> : null}
                </div>
                
            </React.Fragment>




        )
    }
}
export default BusinessDetailBrand;        