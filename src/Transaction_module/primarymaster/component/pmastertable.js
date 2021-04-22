import React, { Component } from 'react';
import Pmasterbody from './pmasterbody';
// import Button from 'react-bootstrap/Button';
import { Button, Col, Row, Form } from 'react-bootstrap'
import { postToServer } from '../../../lib/comm-utils'
import { URL_SALES } from '../../../lib/constants'
import SfaModal from "./../../../BasicComponet/sfaModal";
import StatusPopup from "../../../lib/StatusPopup"
import { withRouter, Redirect } from 'react-router-dom'



class Pmastertable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFull: false,
            loaditems: [],
            check: [],
            DivisionCode: [],
            accntDate: [],
            depotcode: [],
            docnum: [],
            fscode: [],
            invoiceDate: [],
            invoicenum: [],
            lrDate: [],
            lrnum: [],
            paymentDate: [],
            prefix: [],
            stockiestcode: [],
            taxamnt: [],
            year: [],
            batchnum: "",
            save: false,
            showSuccess: false,
        }
        this.handleView = this.handleView.bind(this)
        this.onQtyChange = this.onQtyChange.bind(this)
        // this.getTotalQty = this.getTotalQty.bind(this)
        this.onSave = this.onSave.bind(this)
        this.delete = this.delete.bind(this)
        //  this.getGrandvalue = this.getGrandvalue.bind(this)
        this.onSuccess = this.onSuccess.bind(this)
        this.hide = this.hide.bind(this)
        // this.onCancel = this.onCancel.bind(this)
    }
    hide() {
        this.setState({ show: false })
    }
    delete() {
        var del = confirm("Are you sure you want to delete?");
        if (del == true) {
            var deleteData = {
                "Index": "PrimarySalesEntryDelete",
                "Data": {
                    "depcode": this.state.depotcode,
                    "year": this.state.year,
                    "pfx": this.state.prefix,
                    "srno": this.state.docnum
                },
                "Token": ""
            }
            postToServer(URL_SALES, deleteData).then((response) => {
                if (response.status == 200) {
                    this.setState({ message: "Deleted Successfully", show: true, success: false,  searchdata: false })

                    setTimeout(function () {
                        this.props.hideTableCopy()
                        this.props.history.push('/primarysale')
                    }.bind(this), 1000);
                }
            }).catch((Error) => {
                this.setState({ Error: true, Errormsg: "Error in Api At Primary Sale Target" })
            })
        } else {

        }


    }
    onSuccess() {
        this.setState({ showSuccess: false })
        // this.props.hideTableCopy()
        // this.setState({save:false})
    }

    handleView() {
        this.setState({
            isFull: !this.state.isFull
        });
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.loaditems) {
            this.setState({ loaditems: nextProps.loaditems })
        }
        if (nextProps.DivisionCode) {
            this.setState({ DivisionCode: nextProps.DivisionCode })
        }
        if (nextProps.accntDate) {
            this.setState({ accntDate: nextProps.accntDate })
        }
        if (nextProps.depotcode) {
            this.setState({ depotcode: nextProps.depotcode })
        }
        if (nextProps.docnum) {
            this.setState({ docnum: nextProps.docnum })
        }
        if (nextProps.fscode) {
            this.setState({ fscode: nextProps.fscode })
        }
        if (nextProps.invoiceDate) {
            this.setState({ invoiceDate: nextProps.invoiceDate })
        }
        if (nextProps.invoicenum) {
            this.setState({ invoicenum: nextProps.invoicenum })
        }
        if (nextProps.lrDate) {
            this.setState({ lrDate: nextProps.lrDate })
        }
        if (nextProps.lrnum) {
            this.setState({ lrnum: nextProps.lrnum })
        }
        if (nextProps.paymentDate) {
            this.setState({ paymentDate: nextProps.paymentDate })
        }
        if (nextProps.prefix) {
            this.setState({ prefix: nextProps.prefix })
        }
        if (nextProps.stockiestcode) {
            this.setState({ stockiestcode: nextProps.stockiestcode })
        }
        if (nextProps.taxamnt) {
            this.setState({ taxamnt: nextProps.taxamnt })
        }
        if (nextProps.year) {
            this.setState({ year: nextProps.year })
        }
    }

    onQtyChange(code, event, nqty) {
        let loadList = this.props.loaditems;
        let newValue = event.target.value;
        // if (newValue.length == 0) {
        //     newValue = ""
        // }
        // if (newValue == "+" || newValue == '-') {
        //     newValue = newValue + 1
        // }

        for (let i = 0; i < loadList.length; i++) {
            if (loadList[i].C_Code == code) {
                //qty 
                if (nqty == "qty") {
                    let qtyValidation = ""
                    qtyValidation = /^-?\d*\.{0,1}\d+$/
                    if (newValue.length == 0) {
                        qtyValidation = ""
                        loadList[i].n_qty = ""
                        loadList[i].n_value = 0
                        loadList[i].n_recpt_qty = loadList[i].n_Sch_qty == "" ? 0 : parseInt(loadList[i].n_Sch_qty)
                    }
                    else if (newValue.length > 10) {
                        qtyValidation = ""
                        loadList[i].n_qty = ""
                        loadList[i].n_value = 0
                        loadList[i].n_recpt_qty = loadList[i].n_Sch_qty == "" ? 0 : parseInt(loadList[i].n_Sch_qty)
                        alert("Please Enter Maximum 10 Digits Only!!")
                    }
                    else if (!qtyValidation.test(newValue)) {
                        qtyValidation = ""
                        loadList[i].n_qty = ""
                        loadList[i].n_value = 0
                        loadList[i].n_recpt_qty = 0
                        alert("Please Enter Digits Only!!")
                    } else {
                        loadList[i].n_qty = newValue;
                        loadList[i].n_value = parseInt(newValue) * parseFloat(loadList[i].modi_Rate);
                        loadList[i].n_recpt_qty = parseInt(newValue) + parseInt(loadList[i].n_Sch_qty)
                        loadList[i].n_recpt_qty = parseInt(newValue) + (loadList[i].n_Sch_qty == "" ? 0 : parseInt(loadList[i].n_Sch_qty))

                    }
                }

                //sch qty
                else if (nqty == "schemaqty") {
                    let SchemeqtyValidation = ""
                    SchemeqtyValidation = /^-?\d*\.{0,1}\d+$/

                    if (newValue.length == 0) {
                        SchemeqtyValidation = ""
                        loadList[i].n_Sch_qty = ""
                        loadList[i].n_value = 0
                        loadList[i].n_recpt_qty = loadList[i].n_qty == "" ? 0 : parseInt(loadList[i].n_qty)
                    }
                    else if (newValue.length > 10) {
                        SchemeqtyValidation = ""
                        loadList[i].n_Sch_qty = ""
                        loadList[i].n_value = 0
                        loadList[i].n_recpt_qty = loadList[i].n_qty == "" ? 0 : parseInt(loadList[i].n_qty)
                        alert("Please Enter Maximum 10 Digits Only!!")
                    }
                    else if (!SchemeqtyValidation.test(newValue)) {
                        SchemeqtyValidation = ""
                        loadList[i].n_Sch_qty = ""
                        loadList[i].n_value = 0
                        loadList[i].n_recpt_qty = loadList[i].n_qty == "" ? 0 : parseInt(loadList[i].n_qty)
                        alert("Please Enter Digits Only!!")
                    } else {
                        loadList[i].n_Sch_qty = newValue;
                        loadList[i].n_recpt_qty = parseInt(newValue) + parseInt(loadList[i].n_qty)
                        loadList[i].n_recpt_qty = parseInt(newValue) + (loadList[i].n_qty == "" ? 0 : parseInt(loadList[i].n_qty))


                    }
                }



                //for batch
                else if (nqty == "batch") {
                    let batchnumber = ""
                    batchnumber = /^[0-9a-zA-Z]+$/;
                    if (newValue.length == 0) {
                        batchnumber = ""
                        loadList[i].C_BATCH_NO = ""
                    }
                    else if (newValue.length > 20) {
                        alert("Please Enter 20 Characters Only!!")
                        batchnumber = ""
                        loadList[i].C_BATCH_NO = ""
                    }
                    else if (!batchnumber.test(newValue)) {
                        alert("Batch Number Should Be Alphanumeric Ex:A1234CB")
                        batchnumber = ""
                        loadList[i].C_BATCH_NO = ""
                    }
                    else {
                        loadList[i].C_BATCH_NO = newValue;

                    }
                }
                else if (nqty == "rate") {
                    let rateValidation = ""
                    rateValidation = /(\d+(?:\.\d+)?)/
                    if (newValue.length == 0) {
                        rateValidation = ""
                        loadList[i].modi_Rate = ""
                    }
                    else if (newValue.length > 10) {
                        alert("Please Enter 10 Characters Only!!")
                        rateValidation = ""
                        loadList[i].modi_Rate = ""
                    }
                    else if (!rateValidation.test(newValue)) {
                        alert("Rate Should Be Digits Only")
                        rateValidation = ""
                        loadList[i].modi_Rate = ""
                    }
                    else {
                        loadList[i].modi_Rate = newValue;
                        loadList[i].n_value = parseInt(newValue) * (loadList[i].n_qty == "" ? 0 : parseFloat(loadList[i].n_qty));

                    }
                }

                else if (nqty == "totalqty") {
                    let totalqtyValidation = ""
                    totalqtyValidation = /^-?\d*\.{0,1}\d+$/
                    if (newValue.length == 0) {
                        totalqtyValidation = ""
                        loadList[i].n_recpt_qty = ""
                    }
                    else if (newValue.length > 10) {
                        alert("Please Enter 10 Characters Only!!")
                        totalqtyValidation = ""
                        loadList[i].n_recpt_qty = ""
                    }
                    else if (!totalqtyValidation.test(newValue)) {
                        alert("Total Quantity Should Be Digits Only")
                        totalqtyValidation = ""
                        loadList[i].n_recpt_qty = ""
                    }
                    else {
                        loadList[i].n_recpt_qty = newValue

                    }

                }
                else if (nqty = "totalvalue") {
                   console.log("totaaaaaaaaaaaaaaa",nqty,newValue)
                    let totalValidation = ""
                    totalValidation = /(\d+(?:\.\d+)?)/
                    if (newValue.length == 0) {
                        totalValidation = ""
                        loadList[i].n_value = ""
                    }
                    else if (newValue.length > 10) {
                        alert("Please Enter 10 Characters Only!!")
                        totalValidation = ""
                        loadList[i].n_value = ""
                    }
                    else if (!totalValidation.test(newValue)) {
                        alert("Value Should Be Digits Only")
                        totalValidation = ""
                        loadList[i].n_value = ""
                    }
                    else {
                        loadList[i].n_value = newValue;

                    }
                }
                // else 

                // let total = loadList[i].n_qty == "" ? 0 : (parseInt(loadList[i].n_qty) + parseInt(loadList[i].n_Sch_qty))
                // loadList[i].n_recpt_qty = total
                break;
            }
        }
        this.setState({ loaditems: loadList })
    }

    //  getTotalQty(qty, schmqty) {
    //     let totalqty = 0
    //     if (qty != "" && schmqty != "") {
    //         totalqty = (totalqty + parseInt(qty) + parseInt(schmqty))
    //     }
    //     else {
    //         if (qty == "" && schmqty == "") {
    //             totalqty = 0;
    //         }
    //         else if (qty == "") {
    //             totalqty = parseInt(schmqty)
    //         }
    //         else if (schmqty == "") {
    //             totalqty = parseInt(qty)
    //         }
    //     }

    //      return parseInt(0)
    // }



    onSave() {
        if ((this.state.loaditems.some(res => res.isChecked == true)) == true) {
            let totalAmt = 0
            let qtyEmpty = [], qtyValid = [], RateValid = []
            let dateFormat = require('dateformat');
            let account = `${dateFormat(this.state.accntDate, "dd/mm/yyyy")}`
            let lrdate = this.state.lrDate == "" ? "" : `${dateFormat(this.state.lrDate, "dd/mm/yyyy")}`
            let invoicedate = `${dateFormat(this.state.invoiceDate, "dd/mm/yyyy")}`
            let paymentdate = this.state.paymentDate == "" ? "" : `${dateFormat(this.state.paymentDate, "dd/mm/yyyy")}`
            let tax = this.state.taxamnt == "" ? 0 : this.state.taxamnt
            let Lrnum = this.state.lrnum == "" ? 0 : this.state.lrnum
            let SalesDet = ""
            //invoice num exists
            if (this.props.searchdata == true) {
                if (this.props.checkallData == true) {
                    qtyEmpty = this.state.loaditems.filter(res => res.n_qty == "" ? true : false)
                    qtyValid = this.state.loaditems.filter(res => (res.n_qty == 0 || res.n_qty == 0.00) ? true : false)
                    RateValid = this.state.loaditems.filter(res => (res.modi_Rate == "0" || res.modi_Rate == "0.00") ? true : false)
                }
                if (this.props.depotnameValue == "-1") {
                    alert("Please Select Depot Name")
                }
                else if (this.props.stockiestcode == "") {
                    alert("Please Select Stockist")
                }
                else if (this.props.accntDate == null) {
                    alert("Please Select Account Date")

                }
                else if (this.props.invoiceDate == null) {
                    alert("Please Select Invoice Date")

                }
                else if (this.props.invoicenum == "") {
                    alert("Please Enter Invoice Number")

                } else if (qtyEmpty.length > 0) {
                    alert("Please Enter Qty!!")
                } else if (qtyValid.length > 0) {
                    alert("Please Enter Valid Qty!!")
                } else if (RateValid.length > 0) {
                    alert("Please Enter Valid Rate!!")
                }
                else {
                    this.state.loaditems.map(res => {
                        if (res.isChecked == true) {
                            let qty = res.n_qty == "" ? 0 : res.n_qty;
                            let sch_qty = res.n_Sch_qty == "" ? 0 : res.n_Sch_qty
                            let batchnumb = res.C_BATCH_NO == "" ? 0 : res.C_BATCH_NO
                            totalAmt = totalAmt + parseFloat(res.n_value).toFixed(2)
                            SalesDet += this.state.depotcode + "~" + this.state.year + "~" + this.state.prefix + "~" + this.state.docnum + "~" + res.Rowid + "~" + res.C_Code + "~" + batchnumb + "~" + qty + "~" + sch_qty + "~" + res.n_recpt_qty + "~" + res.modi_Rate + "~" + res.n_value + "|"
                        }
                    })
                    let totalInvoiceAmt = parseFloat(totalAmt).toFixed(2) + parseFloat(tax).toFixed(2)
                    let salesMst = this.state.depotcode + "|" + this.state.year + "|" + this.state.prefix + "|" + this.state.docnum + "|" + account + "|" + this.state.stockiestcode + "|" + totalAmt + "|" + tax + "|" + totalInvoiceAmt + "|" + Lrnum + "|" + lrdate + "|" + this.state.fscode + "|" + this.state.invoicenum + "|" + paymentdate + "|" + (this.state.DivisionCode == "-1" ? "All" : this.state.DivisionCode) + "|" + invoicedate
                    var savedata = {
                        "Index": "SalesSave", "Data": {
                            "salesMst": salesMst,
                            "SalesDet": SalesDet.substr(0, SalesDet.length - 1).trim()
                        }
                    }
                    postToServer(URL_SALES, savedata).then((response) => {
                        if (response.status == 200) {
                            this.setState({ onsave: response.data.data })
                            this.state.loaditems.map(res => {
                                if (res.isChecked == true) {
                                    if (res.n_qty != "" || res.n_qty != 0) {
                                        this.setState({ showSuccess: true })
                                        setTimeout(function () {
                                            this.setState({ showSuccess: false, save: true });
                                            this.props.hideTableCopy()
                                        }.bind(this), 3000);
                                    }
                                    else {

                                        if (res.n_qty == "") {
                                            alert("Please Enter Qty !")
                                        } else if (res.n_qty == 0) {
                                            alert("Please Enter Valid Qty !")
                                        }

                                    }
                                }
                            })
                            this.props.salesvalue(totalAmt)
                            this.setState({ showSuccess: true })

                            setTimeout(function () {
                                this.setState({ showSuccess: false, save: true });
                                this.props.hideTableCopy()
                            }.bind(this), 3000);
                        }
                    }).catch((Error) => {
                        this.setState({ Error: true, Errormsg: "Error in Api At Primary Sale Target" })
                    })
                }

            } else {
                var invoicenum = {
                    "Index": "Salesinvoiceexist",
                    "Data":
                    {
                        "stockiestcode": this.state.stockiestcode,
                        "accountdate": account,
                        "invoiceno": this.state.invoicenum
                    },
                    "Token": ""
                }

                postToServer(URL_SALES, invoicenum).then((response) => {
                    if (response.status == 200) {
                        if (response.data.data[0].Result == "0") {
                            this.state.loaditems.map(res => {
                                if (res.isChecked == true) {
                                    let qty = res.n_qty == "" ? 0 : res.n_qty;
                                    let sch_qty = res.n_Sch_qty == "" ? 0 : res.n_Sch_qty
                                    let batchnumb = res.C_BATCH_NO == "" ? 0 : res.C_BATCH_NO
                                    totalAmt = totalAmt + res.n_value
                                    SalesDet += this.state.depotcode + "~" + this.state.year + "~" + this.state.prefix + "~" + this.state.docnum + "~" + res.Rowid + "~" + res.C_Code + "~" + batchnumb + "~" + qty + "~" + sch_qty + "~" + res.n_recpt_qty + "~" + res.modi_Rate + "~" + res.n_value + "|"
                                }
                            })
                            let totalInvoiceAmt = parseFloat(totalAmt) + parseFloat(tax)
                            let salesMst = this.state.depotcode + "|" + this.state.year + "|" + this.state.prefix + "|" + this.state.docnum + "|" + account + "|" + this.state.stockiestcode + "|" + totalAmt + "|" + tax + "|" + totalInvoiceAmt + "|" + Lrnum + "|" + lrdate + "|" + this.state.fscode + "|" + this.state.invoicenum + "|" + paymentdate + "|" + (this.state.DivisionCode == "-1" ? "All" : this.state.DivisionCode) + "|" + invoicedate
                            var savedata = {
                                "Index": "SalesSave", "Data": {
                                    "salesMst": salesMst,
                                    "SalesDet": SalesDet.substr(0, SalesDet.length - 1).trim()
                                }
                            }
                            postToServer(URL_SALES, savedata).then((response) => {
                                if (response.status == 200) {
                                    this.setState({ onsave: response.data.data })
                                    this.state.loaditems.map(res => {
                                        if (res.isChecked == true) {
                                            if (res.n_qty != "") {
                                                this.setState({ showSuccess: true })
                                                setTimeout(function () {
                                                    this.setState({ showSuccess: false, save: true });
                                                    this.props.hideTableCopy()
                                                }.bind(this), 3000);
                                            }
                                            else {

                                                if (res.n_qty == "") {
                                                    alert("Please Select Qty !")
                                                }

                                            }
                                        }
                                    })
                                    this.props.salesvalue(totalAmt)
                                    this.setState({ showSuccess: true })

                                    setTimeout(function () {
                                        this.setState({ showSuccess: false, save: true });
                                        this.props.hideTableCopy()
                                    }.bind(this), 3000);
                                }
                            }).catch((Error) => {
                                this.setState({ Error: true, Errormsg: "Error in Api At Primary Sale Target" })
                            })
                        } else {
                            alert("Invoice Number Already exists!!!")

                        }
                    }
                }).catch((Error) => {
                    this.setState({ Error: true, Errormsg: "Error in Api At Primary Sale Target" })
                })
            }

        }
        else {
            alert("Please Select Item")
        }

    }

    // onCancel(){
    //     this.setState({save:true})
    //     this.props.hideTableCopy()
    // }


    // getGrandvalue() {
    //     let grandvalue = 0
    //     let loadList = this.state.loaditems;
    //     loadList.map((list) => {
    //         grandvalue = grandvalue + (list.n_qty == "" ? 0 : parseInt(list.n_qty) * list.modi_Rate)
    //     })
    //     return grandvalue.toFixed(2)
    //     // this.props.salesvalue(grandvalue)
    // }




    render() {
        const header = [
            {
                prop: 'checkbox',
                title: <label className="header-checkbox-label">
                    <input
                        readOnly
                        type="checkbox"
                        className="header-customized-checkbox"
                        value="checkall"
                        checked={this.props.checkallData}
                        onClick={this.props.onCheckAll}
                    />
                    <span className="header-checkbox-custom"></span>
                </label>,
                filterable: true
            },
            { prop: 'itemname', title: 'Item Name', filterable: true },
            { prop: 'code', title: 'Pack', filterable: true },
            { prop: 'rate', title: 'Rate', filterable: true },
            { prop: 'batchno', title: 'Batch No', filterable: true },
            { prop: 'qty', title: 'Qty', filterable: true },
            { prop: 'schemeqty', title: 'Scheme Qty', filterable: true },
            { prop: 'totalqty', title: 'Total Qty', filterable: true },
            { prop: 'rate1', title: 'Rate', filterable: true },
            { prop: 'value1', title: 'Value', filterable: true },

        ];

        var body = []
        {
            this.props.loaditems ? this.props.loaditems.map((list) => {
                body.push({
                    checkbox: <label className="">
                        <input
                            readOnly
                            type="checkbox"
                            className="table-customized-checkbox"
                            checked={list["isChecked"]}
                            value={list["C_Code"]}
                            onClick={this.props.onCheck}
                        />
                        <span className="table-checkbox-custom"></span>
                    </label>,
                    itemname: list.C_Name,
                    code: list.C_Pack,
                    rate: list.rate,
                    batchno:
                        <div className="pmasterinput"
                        ><input
                                type="text"
                                className="inv-sug-ord-qty"
                                onChange={(event) => this.onQtyChange(list.C_Code, event, "batch")}
                                value={list.C_BATCH_NO.trim()}
                                min="0"
                                onWheel={event => event.currentTarget.blur()}
                            /></div>,
                    qty: <div className="pmasterinput"><input
                        type="text"
                        className="inv-sug-ord-qty"
                        onChange={(event) => this.onQtyChange(list.C_Code, event, "qty")}
                        value={list.n_qty}
                        min="0"
                        onWheel={event => event.currentTarget.blur()}
                    /></div>,
                    schemeqty: <div className="pmasterinput"><input
                        type="text"
                        className="inv-sug-ord-qty"
                        onChange={(event) => this.onQtyChange(list.C_Code, event, "schemaqty")}
                        value={list.n_Sch_qty}
                        min="0"
                        onWheel={event => event.currentTarget.blur()}
                    /></div>,
                    totalqty: <div className="pmasterinput"><input
                        type="text"
                        className="inv-sug-ord-qty"
                        onChange={(event) => this.onQtyChange(list.C_Code, event, "totalqty")}
                        value={list.n_recpt_qty}
                        min="0"
                        onWheel={event => event.currentTarget.blur()}
                    /></div>,
                    rate1: <div className="pmasterinput"><input
                        type="number"
                        className="inv-sug-ord-qty"
                        onChange={(event) => this.onQtyChange(list.C_Code, event, "rate")}
                        value={list.modi_Rate}
                        min="0"
                        onWheel={event => event.currentTarget.blur()}
                    /></div>,
                    value1: <div className="pmasterinput"><input
                        type="number"
                        className="inv-sug-ord-qty"
                        value={list.n_value}
                        onChange={(event) => this.onQtyChange(list.C_Code, event, "totalvalue")}
                        min="0"
                        onWheel={event => event.currentTarget.blur()}
                    /></div>,
                })
            }) : null
        }


        // const body = [
        //     {
        //         checkbox: <label className="table-checkbox-label">
        //             <input
        //                 readOnly
        //                 type="checkbox"
        //                 className="table-customized-checkbox"
        //                 // onChange={this.onShowUncheckAlert}
        //                 onClick={this.props.onCheck}
        //             //   checked={list["isChecked"]}
        //             //   value={list["value"]}
        //             />
        //             <span className="table-checkbox-custom"></span>
        //         </label>,
        //         itemname: 'dolo', code: '123', rate: '10.00', batchno: 'form', rate: '10.00', value1: 'form'
        //     },
        //     {
        //         checkbox: <label className="table-checkbox-label">
        //             <input
        //                 readOnly
        //                 type="checkbox"
        //                 className="table-customized-checkbox"

        //             />
        //             <span className="table-checkbox-custom"></span>
        //         </label>, itemname: 'amcard', code: '123', rate: '10.00', batchno: 'form', rate: '10.00', value1: 'form'
        //     },

        // ];





        const customLabels = {
            first: "<<",
            last: ">>",
            prev: "< Prev",
            next: "Next >",
            filterPlaceholder: "Search",
            noResults: "There is no data to be displayed"
        };

        var successText = <div className="expense-success-msg">Saved successfully !</div>

        if (this.state.save == false) {
            return (
                <React.Fragment>

                    <div className="pullleft KamClaimTablesfc">
                        <SfaModal
                            show={this.state.showSuccess}
                            imagePath={"../../../public/assets/images/submitplan.svg"}
                            onHide={this.onSuccess}
                            subDiv={successText}
                            size="sm"
                        />
                        <div className={this.state.isFull ? "fullscreenView" : "dwrlocked-first "}>
                            <div className="ongoing-orders-sfc mrsfcTable sfcFilterOpt">


                                <div className="sfc-head-edit">
                                    <div>
                                        <h5 className="sfc-list-sec-head">
                                            Item Details
                       </h5>
                                    </div>
                                    <div className="sfc-head-edit-options">
                                        {this.state.isFull ? (
                                            <img
                                                src="../public/assets/images/collapse-grey.svg"
                                                className="fullscreen_img1"
                                                alt="fullscreen_img"
                                                onClick={this.handleView}
                                            />) : (

                                                <img
                                                    src="../public/assets/images/fullscreen.svg"
                                                    className="fullscreen_img1"
                                                    alt="fullscreen_img"
                                                    onClick={this.handleView}
                                                />
                                            )}

                                    </div>
                                </div>

                                <Pmasterbody
                                    tableHeader={header}
                                    tableBody={body}
                                    keyName="userTable"
                                    tableClass="striped hover table-responsive"
                                    rowsPerPageOption={this.props.loaditems.length}
                                    initialSort={{ prop: "username", isAscending: true, }}
                                    labels={customLabels}
                                    save={this.onSave}
                                    delete={this.delete}
                                    searchdata={this.props.searchdata}
                                // cancel={this.onCancel}
                                // pagination={true}
                                />
                            </div>
                        </div>

                    </div>
                    <StatusPopup
                        message={this.state.message}
                        show={this.state.show}
                        onClose={this.hide}
                        success={this.state.success}
                    />
                </React.Fragment>

            )
        } else return null

    }
}

export default withRouter(Pmastertable);