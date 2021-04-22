import React from 'react'
import { Component } from 'react';
import { Button, Col, Row, Form } from 'react-bootstrap'

import '../../../public/assets/css/sfcstyle.css'
import '../../../public/assets/css/transactionmodule.css'
import SearchDropdown from "./../../BasicComponet/searchDropdown";



class PrpExpeseDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Accountheads: [],
            advancedvalue: "-1",
            advancedropdownlist: [],
            advancedErr: "",
            advancedropdownlistcode: "",
            advancamt: "",
            TCEAChange:"",

        }
        this.getGrandvalue = this.getGrandvalue.bind(this)
        this.onQtyChange = this.onQtyChange.bind(this)
        this.onQtyadvChange = this.onQtyadvChange.bind(this)
        this.getGrandadvvalue = this.getGrandadvvalue.bind(this)
        this.onTCEAChange = this.onTCEAChange.bind(this)
        // this.getAdvancedValue = this.getAdvancedValue.bind(this)
    }

    // UNSAFE_componentWillReceiveProps(nextProps) {
    //     // console.log(nextProps,"nextProps")
    //     if (nextProps.golist.Accountheads.length > 0) {
    //         this.setState({ Accountheads: nextProps.golist.Accountheads })
    //     }
    // }

    

    onTCEAChange(event){
        let newValue = event.target.value;
        if(newValue.length < 9){
            this.props.OnEstimate(newValue)
          this.setState({TCEAChange:newValue})
        //   this.setState({minattenderr:""})
       }else{
          alert("Please Enter Upto 8 Digit")
       }
    }

    static getDerivedStateFromProps(nextProps, state) {
        // debugger
        // console.log(nextProps, "nextProps")
        if(nextProps.AccountheadsList.length > 0){
            return {
                Accountheads : nextProps.AccountheadsList
            }
        }
        else if (nextProps.golist.Accountheads) {
            return {
                Accountheads: nextProps.golist.Accountheads,
            }
        }
        else if (nextProps.TCEAChange) {
            return{
                TCEAChange: nextProps.TCEAChange
            }
        }
    }

    onQtyChange(code, event) {
        let AccountheadsList = this.state.Accountheads;
        // let advancedropdown = []
        // let advancedropdown1 = []
        // let dp = []
        // let a = {}
        let newValue = ""
        for (let i = 0; i < AccountheadsList.length; i++) {
            // console.log(code,AccountheadsList[i].c_code, "code")
            if (AccountheadsList[i].c_code == code) {
                if(this.state.TCEAChange != "" && this.state.TCEAChange >= this.getGrandvalue() ){
                     newValue = event.target.value;
                }else{
                    newValue = 0;
                    alert("The Total Amount Should Not Exceed More Than Total Cost Estimate !")
                }
                // console.log(newValue, "newvalue")
                AccountheadsList[i].n_estimatedamount = newValue;
                // if(this.state.TCEAChange != this.getGrandvalue()){
                //     alert("Estimate Grand total should not be Greater than  Total Cost Estimate Amount")
                // }

                // advancedropdown.push({

                //     "key": AccountheadsList[i].c_code,
                //     "text": '0',
                //     "value": '0',
                // },

                //     {
                //         "key": AccountheadsList[i].c_code,
                //         "text": AccountheadsList[i].n_estimatedamount,
                //         "value": AccountheadsList[i].n_estimatedamount

                //     })


                // a[AccountheadsList[i].c_code] = {

                //   data :   AccountheadsList[i]["n_estimatedamount"]
                // }
                // console.log(advancedropdown, "AccountheadsList")
                break;

            }
        }

        // this.state.Accountheads.map((item) => {
        //     if (item.c_code == code) {
        //         advancedropdown.push({

        //             "key": item.c_code,
        //             "text": '0',
        //             "value": '0',
        //         },

        //         {
        //             "key": item.c_code,
        //             "text": item.n_estimatedamount,
        //             "value": item.n_estimatedamount
        //        })
        //   }
        // })
        // advancedropdown1.push(a)
        // console.log(advancedropdown,advancedropdown1, "AccountheadsList")

        //  Object.values(advancedropdown1).map(ele=>{
        //       console.log("ele",ele)
        //       dp.push({
        //         "key": Object.keys(ele),
        //         "text": Object.values(ele)[0].data,
        //         "value": Object.values(ele)[0].data
        //       })
        //         //  dp.push(Object.values(ele)[0].data)
        //          console.log( Object.values(ele)[0].data,"elele")


        //     })
        this.setState({ Accountheads: AccountheadsList })
        this.props.onPrpExpense(AccountheadsList, this.getGrandvalue())
        
        // this.setState({ advancedropdownlist: dp })
        // console.log(dp,"dp")

    }

    // getAdvancedValue(advancedropdownlist) {
    //     console.log(this.state.advancedropdownlist,"advancedropdownlist")
    //             // this.setState({ advancedvalue: advancedropdownlist })
    //             if (advancedropdownlist != "") {
    //                 this.setState({ advancedErr: "" })
    //             }

    //             this.state.advancedropdownlist.map((item) => {
    //                 if (item.value == advancedropdownlist) {
    //                   this.setState({ advancedropdownlistcode: item.key })
    //                   this.setState({ advancedvalue: advancedropdownlist })
    //                 }
    //                 else{
    //                     this.setState({ advancedErr: "sdfgfthgfv" })
    //                 }
    //               })

    // }


    getGrandvalue() {
        let grandvalue = 0
        let AccountheadsList = this.state.Accountheads;
        AccountheadsList.map((list) => {
            grandvalue = grandvalue + (list.n_estimatedamount == "" || list.n_estimatedamount == 0  ? 0 : parseFloat(list.n_estimatedamount))
        })
        // if(grandvalue >= this.state.TCEAChange){
        //     alert("dadta")
        // }

        // if (this.props.hideshowbtn == false ){
            
        // }else{
        //     this.setState({TCEAChange:grandvalue})
        // }
        return grandvalue
    }

    onQtyadvChange(code, event) {

        // debugger
        // let AccountheadsList = this.state.Accountheads;
        // console.log(this.state.TCEAChange,"here")
        // var Estimate = [...this.state.Accountheads]
        // this.props.onPrpExpense(Estimate, this.getGrandvalue(),this.state.TCEAChange)  

        let elementsIndex1
         elementsIndex1 = this.state.Accountheads.findIndex(element => element.c_code == code )
         let newArray = [...this.state.Accountheads]
         newArray[elementsIndex1] = {...newArray[elementsIndex1], n_AdvanceAmount: event.target.value}
         this.props.onPrpExpense(newArray, this.getGrandvalue())  
         this.setState({Accountheads: newArray})


        // let AccountheadsList = this.state.Accountheads;
        // for (let i = 0; i < AccountheadsList.length; i++) {
        //     // console.log(code,AccountheadsList[i].code, "code")
        //     if (AccountheadsList[i].c_code == code) {
        //         let newValue = event.target.value
                 

        //         // console.log(newValue, "newvalue")
        //         if (event.target.value == "0") {
        //             AccountheadsList[i].n_AdvanceAmount = newValue;
        //         } else {
        //             AccountheadsList[i].n_AdvanceAmount = AccountheadsList[i].n_estimatedamount
        //         }
        //         // console.log(AccountheadsList[i].n_AdvanceAmount, "abcd")
        //         break;
        //     }
        // }
        // this.setState({ Accountheads: AccountheadsList })
        // this.props.onPrpExpense(AccountheadsList, this.getGrandvalue())
    }

    getGrandadvvalue() {
        let grandvalue = 0
        let advancedropdownlist = this.state.Accountheads;
        advancedropdownlist.map((list) => {
            grandvalue = grandvalue + (list.n_estimatedamount == "" ? 0 : list.n_AdvanceAmount == 0 ? 0 :parseFloat(list.n_estimatedamount))
        })
        return grandvalue
    }

     validate (c_code, event) {
        // debugger
        let elementsIndex1
        elementsIndex1 = this.state.Accountheads.findIndex(element => element.c_code == c_code )
        let newArray = [...this.state.Accountheads]
        //newArray[elementsIndex1] = {...newArray[elementsIndex1], n_AdvanceAmount: event.target.value}
        if(newArray[elementsIndex1].n_estimatedamount != newArray[elementsIndex1].n_AdvanceAmount && newArray[elementsIndex1].n_AdvanceAmount != "0"){
            newArray[elementsIndex1] = {...newArray[elementsIndex1], n_AdvanceAmount: '0'}
            this.setState({Accountheads: newArray})
            this.props.onPrpExpense(newArray, this.getGrandvalue())
        }else{
            this.setState({Accountheads: newArray})
        }       
    }


    render() {


        // console.log(this.props.onPrpExpense,"onPrpExpense")
        //   let advancedropdown = []

        //           this.state.Accountheads.map((item) => {
        //             advancedropdown.push({
        //               "key": item.c_code,
        //               "text": item.n_estimatedamount,
        //               "value": item.n_estimatedamount
        //             })
        //           })
        // console.log(this.props.golist,"goolist")
        // console.log(this.state.Accountheads,this.state.advancedropdownlistcode,"Accountheads")

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
                                        <div><input
                                            type="text"
                                            className="customized-input"
                                            onChange={(event) => this.onTCEAChange(event)}
                                            value={this.state.TCEAChange}
                                            // placeholder="Enter"
                                            min="0"
                                            onWheel={event => event.currentTarget.blur()}

                                        /></div>
                                    </div>
                                </div>
                                <div className="expense-note-det"><span className="prpexpnote">Note:</span>&nbsp; PRP Advance Amount Should Be 0 or Equal To Estimated PRP Amount.</div>
                            </div>


                            <div className=" prpacount-table" >

                                <table id="example" class="stripe row-border order-column"  >
                                    <thead>
                                        <tr>
                                            <th rowspan="1" colspan="1" className="acountname">Expense Name</th>
                                            <th rowspan="1" colspan="1" className="acountname">Estimates</th>
                                            <th rowspan="1" colspan="1" className="acountname">Advance</th>
                                        </tr>
                                    </thead>
                                    {this.state.Accountheads.length ? this.state.Accountheads.map(res =>
                                        <tbody key={res.c_code}>
                                            <tr>
                                                <th className="trainingamt">{res.c_name}</th>
                                                <th className="trainingamt">
                                                    <div>
                                                        <input
                                                            type="number"
                                                            className="training-amt-input"
                                                            min=" "
                                                            placeholder=" "
                                                            onChange={(event) => this.onQtyChange(res.c_code, event)}
                                                            value={res.n_estimatedamount == '0'  ? 0 : res.n_estimatedamount}
                                                            onWheel={event => event.currentTarget.blur()} />
                                                    </div>
                                                </th>
                                                <th className="trainingamt">
                                                    <div>
                                                        <input
                                                            type="number"
                                                            className="training-amt-input"
                                                            min=" "
                                                            placeholder=" "
                                                            onChange={(event) => this.onQtyadvChange(res.c_code, event)}
                                                            value={ res.n_AdvanceAmount}
                                                              onBlur={(event) => this.validate(res.c_code, event)}
                                                            // value={res.n_AdvanceAmount != '0' ? res.n_estimatedamount : '0'}
                                                            // onWheel={event => event.currentTarget.blur()}
                                                             />
                                                    </div>
                                                </th>
                                                {/* <th><div >

                                                    <div  >
                                                        <SearchDropdown
                                                            // labelName="Select Type"
                                                            errorMessage={this.state.advancedErr}
                                                            // disabled={true}
                                                            // important={true}
                                                            placeholder="Please Select"
                                                            Selected={res.n_estimatedamount}
                                                            dropdownList={this.state.advancedropdownlist}
                                                            getValue={this.getAdvancedValue}
                                                        />
                                                    </div>
                                                </div> */}
                                                {/* </th> */}
                                            </tr>

                                        </tbody>) : null}

                                    <tfoot>
                                        <tr className="training-amt">
                                            <th></th>
                                            <th className="trainingamt-total">₹ {this.getGrandvalue()}</th>
                                            <th className="trainingamt-total">₹ {this.getGrandadvvalue()}</th>
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
export default PrpExpeseDetail;        