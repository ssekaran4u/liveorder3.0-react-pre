import React from 'react'
import { Component } from 'react';
import { Button, Col, Row, Form, Table, Dropdown } from 'react-bootstrap'
import { postToServer } from '../../../../lib/comm-utils'
import { withRouter, Redirect } from 'react-router-dom'
import StatusPopup from '../../../../lib/StatusPopup'
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { URL_BASE } from '../../../../lib/constants'
import axios from 'axios'
import DownloadDocumentList from '../../popup/DownloadDocumentList'
import DownloadDocumentPopup from '../../popup/DownloadDocumentPopup';
import { SelectPanel } from 'react-multi-select-component';

class SSalesApprovalLoadTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showdownloadModal: false,
            fileDownloadLink: '',
            documentList: [],
            ItemRefreshData: [],
            itemRateRefreshButton: "",
            ColumnHide: {
                open: true, Receipt: true, Returns: true, sale: true, close: true, tran: true,
                "CloseValue": true,
                "ClosingCanShow": true,
                "OpenValue": true,
                "ReceiptCanShow": true,
                "ReturnToCFARSSCanshow": true,
                "ReturnToCFARssQty": true,
                "ReturnToCFARssSchQty": true,
                "ReturnToCFARssValue": true,
                "ReturnsCanShow": true,
                "SalesCanshow": true,
                "TrnQty": true,
                "closingschqty": true,
                "n_closing_qty": true,
                "n_closing_value": true,
                "n_other_qty": true,
                "n_other_scheme": true,
                "n_other_value": true,
                "n_receipt_qty": true,
                "n_receipt_scheme": true,
                "n_receipt_value": true,
                "n_sales_qty": true,
                "n_sales_value": true,
                "n_scheme_qty": true,
                "openingCanShow": true,
                "openingqty": true,
                "openingschqty": true,
                "TrnQty": true,
                "openingvisibleue": true,
            },
            readonly: {},
            month: ['Select Month', "January", "February", "March", "April", "May",
                "June", "July", "August", "September", "October", "November", "December"],
            Listdata: [],
            datakey: {
                c_name: { val: "", "mainHeader": "", "Header": "Name", readonly: "", "visible": "1" },
                c_pack: { val: "", "mainHeader": "", "Header": "Pack", readonly: "", "visible": "1" },
                rate: { val: "", "mainHeader": "", "Header": "Price", readonly: "", "visible": "1" },
                openingqty: { val: "", "mainHeader": "Opening", "Header": "Qty", readonly: "", "visible": "1" },
                openingschqty: { val: "", "mainHeader": "Opening", "Header": "Sch Qty", readonly: "", "visible": "1" },
                OpenValue: { val: "", "mainHeader": "Opening", "Header": "Value", readonly: "", "visible": "1" },
                n_receipt_qty: { val: "", "mainHeader": "Receipt", "Header": "Qty", readonly: "", "visible": "1" },
                n_receipt_scheme: { val: "", "mainHeader": "Receipt", "Header": "Sch Qty	", readonly: "", "visible": "1" },
                n_receipt_value: { val: "", "mainHeader": "Receipt", "Header": "Value", readonly: "", "visible": "1" },
                n_sales_qty: { val: "", "mainHeader": "Sales", "Header": "Qty", readonly: "", "visible": "1" },
                n_scheme_qty: { val: "", "mainHeader": "Sales", "Header": "Sch Qty", readonly: "", "visible": "1" },
                n_sales_value: { val: "", "mainHeader": "Sales", "Header": "Value", readonly: "", "visible": "1" },
                n_other_qty: { val: "", "mainHeader": "other", "Header": "Qty", readonly: "", "visible": "1" },
                n_other_scheme: { val: "", "mainHeader": "other", "Header": "Sch Qty", readonly: "", "visible": "1" },
                n_other_value: { val: "", "mainHeader": "other", "Header": "Value", readonly: "", "visible": "1" },
                n_closing_qty: { val: "", "mainHeader": "Closing", "Header": "Qty", readonly: "", "visible": "1" },
                closingschqty: { val: "", "mainHeader": "Closing", "Header": "Sch Qty", readonly: "", "visible": "1" },
                n_closing_value: { val: "", "mainHeader": "Closing", "Header": "Value", readonly: "", "visible": "1" },
                ReturnToCFARssQty: { val: "", "mainHeader": "Closing", "Header": "Qty", readonly: "", "visible": "1" },
                ReturnToCFARssSchQty: { val: "", "mainHeader": "Closing", "Header": "Sch Qty", readonly: "", "visible": "1" },
                ReturnToCFARssValue: { val: "", "mainHeader": "Closing", "Header": "Value", readonly: "", "visible": "1" },
                itemcode: '',
                n_transit_qty: { val: "", "mainHeader": "Closing", "Header": "Value", readonly: "", "visible": "1" },
            },
        }
        this.approve = this.approve.bind(this)
        this.Remark = this.Remark.bind(this)
        this.hideStatusModal = this.hideStatusModal.bind(this)
        this.itemRateRefreshButton = this.itemRateRefreshButton.bind(this)
        this.refreshItemRate = this.refreshItemRate.bind(this)
        this.updateprice = this.updateprice.bind(this)
        this.filedownload = this.filedownload.bind(this)
        this.downloadfilepopupclose = this.downloadfilepopupclose.bind(this)
        this.getUploadedDocumentList = this.getUploadedDocumentList.bind(this)
        this.downloadFile = this.downloadFile.bind(this)
        this.getDownloadLink = this.getDownloadLink.bind(this)
        this.totalCalculation = this.totalCalculation.bind(this)
        this.loopfunction = this.loopfunction.bind(this)

    }

    // async function processArray(array) {
    //     array.forEach(item => {
    //       // define synchronous anonymous function
    //       // IT WILL THROW ERROR!
    //       await func(item);
    //     // })
    //   }

    loopfunction(Listdata, val, callback) {
        for (let i = 0; i < Listdata.length; i++) {
            if (Listdata[i].itemcode == name) {
                // if ((type == "n_sales_qty" || (this.state.readonly["n_sales_qty"] )&& this.props.selecSecSalesTypr == "1")) {
                //     Listdata[i].n_sales_value.val = Listdata[i]["rate"]["val"] * val
                //     this.totalCalculation(Listdata)

                // }
                // if (type == "n_sales_value") {
                //     if (this.props.salesValueEdit == "1") {
                //         Listdata[i].n_sales_value.val = val
                //     } else {
                //         Listdata[i].n_sales_value.val = Listdata[i]["rate"]["val"] * val
                //     }
                // }
                if (type == "openingqty") {
                    Listdata[i].openingqty.val = val
                } else if (type == "openingschqty") {
                    Listdata[i].openingschqty.val = val
                } else if (type == "n_receipt_qty") {
                    Listdata[i].n_receipt_qty.val = val
                } else if (type == "n_receipt_scheme") {
                    Listdata[i].n_receipt_scheme.val = val
                } else if (type == "n_sales_qty") {
                    Listdata[i].n_sales_qty.val = val
                } else if (type == "n_scheme_qty") {
                    Listdata[i].n_scheme_qty.val = val
                } else if (type == "n_other_qty") {
                    Listdata[i].n_other_qty.val = val
                } else if (type == "n_other_scheme") {
                    Listdata[i].n_other_scheme.val = val
                } else if (type == "ReturnToCFARssQty") {
                    Listdata[i].ReturnToCFARssQty.val = val
                } else if (type == "ReturnToCFARssSchQty") {
                    Listdata[i].ReturnToCFARssSchQty.val = val
                } else if (type == "n_closing_qty") {
                    Listdata[i].n_closing_qty.val = val
                } else if (type == "closingschqty") {
                    Listdata[i].closingschqty.val = val
                } else if (type == "n_transit_qty") {
                    Listdata[i].n_transit_qty.val = val
                }

            }
        }

        return callback(Listdata)

    }
    totalCalculation(data) {
        let openTotal = 0, salesTotal = 0, receiptTotal = 0, returnsTotal = 0, closingTotal = 0
        var promise = new Promise(function (resolve, reject) {
            data.map((res) => {
                openTotal = openTotal + (res["openingqty"]["val"] * res["rate"]["val"])
                receiptTotal = receiptTotal + (res["n_receipt_qty"]["val"] * res["rate"]["val"])
                returnsTotal = returnsTotal + (res["n_other_qty"]["val"] * res["rate"]["val"])
                closingTotal = closingTotal + (res["n_closing_qty"]["val"] * res["rate"]["val"])
                salesTotal = salesTotal + (res["n_sales_qty"]["val"] * res["rate"]["val"])

            })
            resolve(true)
        })
        promise.then(bool => {
        })
        this.setState({
            openTotal: openTotal.toFixed(2),
            receiptTotal: receiptTotal.toFixed(2),
            salesTotal: salesTotal.toFixed(2),
            returnsTotal: returnsTotal.toFixed(2),
            closingTotal: closingTotal.toFixed(2)

        })


    }
    filedownload() {
        this.setState({ showdownloadModal: true })
    }
    downloadfilepopupclose() {
        this.setState({ showdownloadModal: false })

    }
    downloadFile(srno, filename) {
        let path = URL_BASE + 'SecondarySalesDownload'
        var data = {
            "index": "SecondarySalesDownload", "Data": { "srno": srno, "filename": srno + "_" + filename },
            "Token": ""
        }
        return axios.post(path, data, { responseType: 'arraybuffer' }).then((response) => {
            let image = btoa(
                new Uint8Array(response.data)
                    .reduce((data, byte) => data + String.fromCharCode(byte), '')
            );

            let a = document.createElement('a');
            a.href = `data:${response.headers['content-type'].toLowerCase()};base64,${image}`;
            a.download = filename.substring(5);
            a.click();
        })
    }
    updateprice(event, name, type, rate) {
        var val = event.target.value
        let Listdata = this.state.Listdata
        if (val.length == 0) {
            val = 0
        }
        if (val == "+" || val == '-') {
            val = val + 1
        }
        var digitValidation = /(\d+(?:\.\d+)?)/
        var digitValidation1 = /^[+-]?(\d+(?:\.\d+)?)/

        if (val == "-" || val == "+") {
            val = val + '1'
        }

        //for closing validation
        if (type == "n_closing_qty" && digitValidation1.test(val)) {
            val = val
        }

        if ((type == "n_receipt_qty" || type == "n_receipt_scheme" ||
            type == "n_scheme_qty" || type == "n_sales_qty" ||
            type == "n_other_qty" || type == "n_other_scheme" ||
            type == "ReturnToCFARssQty" || type == "ReturnToCFARssSchQty" || type == "n_transit_qty"
        ) &&
            !digitValidation.test(val)) {
            alert("please enter only digits 0-9")
            val = 0
        }
        else if (this.props.FlagForLoadItems.AllowNegativeValuesforClosing == "0" && type == "n_closing_qty" && !digitValidation.test(val)) {
            alert("please enter only digits 0-9")
            val = 0
        }
        else if (this.props.FlagForLoadItems.AllowNegativeValuesforClosing == "0" && type == "closingschqty" && !digitValidation.test(val)) {
            alert("please enter only digits 0-9")
            val = 0
        }
        else {
            if (this.props.FlagForLoadItems.AllowNegativeValuesforClosing == "1" && type == "n_closing_qty") {
                val = val
            }
            if (this.props.FlagForLoadItems.AllowNegativeValuesforClosing == "1" && type == "closingschqty") {
                val = val

            }



            // this.totalCalculation(\,
            let readOnlySalesQty = this.state.readonly["n_sales_qty"]
            let SecEnter = this.props.selecSecSalesTypr
            let readOnlyCloseQty = this.state.readonly["n_closing_qty"]
            var promise = new Promise(function (resolve, reject) {

                let i = 0
                for (i = 0; i < Listdata.length; i++) {
                    if (Listdata[i].itemcode == name) {
                        // if ((type == "n_sales_qty" || (this.state.readonly["n_sales_qty"] )&& this.props.selecSecSalesTypr == "1")) {
                        //     Listdata[i].n_sales_value.val = Listdata[i]["rate"]["val"] * val
                        //     this.totalCalculation(Listdata)

                        // }
                        // if (type == "n_sales_value") {
                        //     if (this.props.salesValueEdit == "1") {
                        //         Listdata[i].n_sales_value.val = val
                        //     } else {
                        //         Listdata[i].n_sales_value.val = Listdata[i]["rate"]["val"] * val
                        //     }
                        // }
                        let sale = readOnlySalesQty == true && SecEnter == "1" ? Listdata[i]["n_sales_qty"]["val"] = parseInt(Listdata[i]["openingqty"]["val"]) + parseInt(Listdata[i]["n_receipt_qty"]["val"]) + parseInt(Listdata[i]["n_other_qty"]["val"]) - Listdata[i]["n_closing_qty"]["val"] : val
                        let close = readOnlyCloseQty == true && SecEnter == "2" ? Listdata[i]["n_closing_qty"]["val"] = parseInt(Listdata[i]["openingqty"]["val"]) + parseInt(Listdata[i]["n_receipt_qty"]["val"]) + parseInt(Listdata[i]["n_other_qty"]["val"]) - Listdata[i]["n_sales_qty"]["val"] : val

                        if (type == "openingqty") {
                            Listdata[i].openingqty.val = val
                        } else if (type == "openingschqty") {
                            Listdata[i].openingschqty.val = val
                        } else if (type == "n_receipt_qty") {
                            Listdata[i].n_receipt_qty.val = val
                        } else if (type == "n_receipt_scheme") {
                            Listdata[i].n_receipt_scheme.val = val
                        } else if (type == "n_sales_qty") {
                            Listdata[i].n_sales_qty.val = sale
                        } else if (type == "n_scheme_qty") {
                            Listdata[i].n_scheme_qty.val = val
                        } else if (type == "n_other_qty") {
                            Listdata[i].n_other_qty.val = val
                        } else if (type == "n_other_scheme") {
                            Listdata[i].n_other_scheme.val = val
                        } else if (type == "ReturnToCFARssQty") {
                            Listdata[i].ReturnToCFARssQty.val = val
                        } else if (type == "ReturnToCFARssSchQty") {
                            Listdata[i].ReturnToCFARssSchQty.val = val
                        } else if (type == "n_closing_qty") {
                            Listdata[i].n_closing_qty.val = val
                        } else if (type == "closingschqty") {
                            Listdata[i].closingschqty.val = close
                        } else if (type == "n_transit_qty") {
                            Listdata[i].n_transit_qty.val = val
                        }

                    }

                }
                resolve(true);
            })
            // forLoop.apply()
            // if(Listdata.length==i){


            //  }



            //  }).then((out)=>{ 
            // alert('kunal')
            const _this = this
            promise.then(bool => {
                if (bool) {
                    this.totalCalculation(Listdata)

                }
            })
            _this.setState({ Listdata: Listdata })
            // })



            //         let  Listdata1=this.state.Listdata

            //         Listdata1.map((a)=>{

            //           if(a.itemcode== name){
            //           if (type == "n_closing_qty") {

            //                //a.openingqty.val

            //                // old value
            //             //   val is neListdata[i] value yes
            //             //OpenValue.val this one 

            //            // Listdata.OpenValue.val 
            //             //like that
            //              // a.n_closing_qty.val = event.target.value


            //         let sale= this.state.readonly["n_sales_qty"] && this.props.selecSecSalesTypr == "1" ? a["n_sales_qty"]["val"] = parseInt(a["openingqty"]["val"]) + parseInt(a["n_receipt_qty"]["val"]) + parseInt(a["n_other_qty"]["val"]) - a["n_closing_qty"]["val"] : a["n_sales_qty"]["val"]


            //               let mm= this.state.closingTotal
            //               let mm1= this.state.salesTotal
            //             alert(sale)
            //               mm=mm-a.n_closing_value.val+(event.target.value*a.rate.val)
            //               mm1=mm1-a.n_sales_value.val+(sale*a.rate.val)
            //               alert(mm1)

            //               this.setState({closingTotal:mm,salesTotal:mm1})


            //   }
            //   if(type == "n_sales_qty"){
            //     let mm1= this.state.salesTotal
            //     alert(a.n_sales_value.val)
            //       mm1=mm1-a.n_sales_value.val+(event.target.value*a.rate.val)
            //       this.setState({salesTotal:mm1})
            //   }
            // }


            //         })



            // promise.then(bool => {
            //     if(bool){


            //         
            //         _this3.totalCalculation(Listdata)
            //         _this3.setState({ Listdata: Listdata }, )

            //     }
            // })
        }


        // let total = this.state.total
        // let dic_openvalue = {}
        // dic_openvalue[name + type] = {}
        // let openTotal = parseFloat(this.state.openTotal), receiptTotal = parseFloat(this.state.receiptTotal), salesTotal = parseFloat(this.state.salesTotal), returnsTotal = parseFloat(this.state.returnsTotal), closingTotal = parseFloat(this.state.closingTotal), returnstocfarssTotal = parseFloat(this.state.returnstocfarssTotal)
        // dic_openvalue[name + type]["name"] = name + type
        // dic_openvalue[name + type]["type"] = type,
        //     dic_openvalue[name + type]["total"] = parseFloat(rate) * parseInt(val)

        // if (this.state.readonly["n_sales_qty"] && this.props.selecSecSalesTypr == "1" && this.state.Clearvar == false &&
        //     (type == "n_receipt_qty" || type == "n_other_qty" || type == "ReturnToCFARssQty" || type == "n_closing_qty")) {
        //     Object.values(dic_openvalue).map(res => {
        //         salesTotal = salesTotal + res.total
        //     })
        //     this.setState({ salesTotal: salesTotal.toFixed(2) })
        // }
        // if (this.state.readonly["n_closing_qty"] && this.props.selecSecSalesTypr == "2" && this.state.Clearvar == false &&
        //     (type == "n_receipt_qty" || type == "n_other_qty" || type == "ReturnToCFARssQty" || type == "n_sales_qty")) {
        //     Object.values(dic_openvalue).map(res => {
        //         closingTotal = closingTotal + res.total
        //     })
        //     this.setState({ closingTotal: closingTotal })
        // }
        // Object.values(dic_openvalue).map(res => {
        //     if (res.type == "openingqty") {
        //         openTotal = openTotal + res.total
        //     }
        //     else if (res.type == "n_receipt_qty") {
        //         receiptTotal = receiptTotal + res.total
        //     } else if (res.type == "n_other_qty") {
        //         returnsTotal = returnsTotal + res.total
        //     } else if (res.type == "n_sales_qty") {
        //         salesTotal = salesTotal + res.total
        //     } else if (res.type == "ReturnToCFARssQty") {
        //         returnstocfarssTotal = returnstocfarssTotal + res.total
        //     } else if (res.type == "n_closing_qty") {
        //         closingTotal = closingTotal + res.total
        //     }
        // })
        // this.setState({
        //     receiptTotal: receiptTotal.toFixed(2),
        //     returnsTotal: returnsTotal.toFixed(2),
        //     openTotal: openTotal.toFixed(2),
        //     salesTotal: salesTotal.toFixed(2),
        //     returnstocfarssTotal: returnstocfarssTotal.toFixed(2),
        //     closingTotal: closingTotal.toFixed(2)
        // })

    }
    refreshItemRate() {
        var rir = confirm("When you Refresh,New Item Rate will be considered.Do You want to Proceed..?");
        if (rir == true) {
            // if (this.props.salesValueEdit == "1" && this.props.selecSecSalesTypr == "2") {
            // if (this.props.selecSecSalesTypr == "2") {

            //     var sr = confirm("If you click OK,The Sales values what you have manually entered, will change to New Value according to the Item Rate.Do you want to Change Sales Values..?")
            //     if (sr == true) {
            //         var data = {
            //             "index": "SecSalesRefreshRateItems",
            //             "Data": {
            //                 "MONTH": this.props.month.toString(),
            //                 "YEAR": this.props.year.toString(),
            //                 "CHILDCODE": this.props.fs,
            //                 "STOCKIST": this.props.stockist,
            //                 "TYPE": this.props.selecSecSalesTypr,
            //                 "SAL_VAL_CHANGE": "1"
            //             },
            //             "Token": ""
            //         }
            //         postToServer("Sales", data).then((Result) => {
            //             if (Result.data.Status == 'Success') {
            //                 this.props.ItemRate(Result.data.data[0], Result.data.data[1])
            //                 // this.setState({ItemRefreshData:Result.data.data})
            //             }
            //         }).catch(e => {
            //         })
            //     } else {

            //     }
            // } else {
            var data = {
                "index": "SecSalesRefreshRateItems",
                "Data": {
                    "MONTH": this.props.month.toString(),
                    "YEAR": this.props.year.toString(),
                    "CHILDCODE": this.props.fs,
                    "STOCKIST": this.props.stockist,
                    "TYPE": this.props.selecSecSalesTypr,
                    "SAL_VAL_CHANGE": "1"
                },
                "Token": ""
            }
            postToServer("Sales", data).then((Result) => {
                if (Result.data.Status == 'Success') {
                    this.props.ItemRate(Result.data.data[0], Result.data.data[1])
                }
            }).catch(e => {
            })
        }

        // } 
        else {

        }
    }


    itemRateRefreshButton(month, year, type, stockist, fs) {
        var data = {
            "index": "SecSalesRefreshButtonFlag",
            "Data": {
                "MONTH": month,
                "YEAR": year,
                "CHILDCODE": fs,
                "STOCKIST": stockist,
                "TYPE": type
            },
            "Token": ""
        }
        postToServer("Sales", data).then((Result) => {
            if (Result.data.Status == 'Success') {
                this.setState({ itemRateRefreshButton: Result.data.data[0].Result })
            }
        }).catch(e => {
        })
    }
    hideStatusModal() {
        this.setState({ showStatusModal: false })
        return <Link to={{
            pathname: "/SSalesApproval"
        }}></Link>
    }
    Remark(event) {
        const d = event.target.value
        this.setState({
            remarks: d
        })
    }
    approve() {
        let str1 = ""
        this.state.Listdata.map(a => {
            str1 = str1 + a.itemcode + "|" + a.rate.val.toString() + "|"
            //opening
            if (this.state.ColumnHide["openingCanShow"] == true) {
                if (this.state.ColumnHide["openingqty"] == true) {
                    str1 = str1 + a["openingqty"].val.toString() + '|'
                }
                if (this.state.ColumnHide["openingschqty"] == true) {
                    str1 = str1 + a["openingschqty"].val.toString() + '|'
                }
                if (this.state.ColumnHide["OpenValue"] == true) {
                    str1 = str1 + a["rate"]["val"] * a["openingqty"]["val"].toString() + '|'
                }
            }
            //receipt
            if (this.state.ColumnHide["ReceiptCanShow"] == true) {
                if (this.state.ColumnHide["n_receipt_qty"] == true) {
                    str1 = str1 + a["n_receipt_qty"].val.toString() + '|'
                }
                if (this.state.ColumnHide["n_receipt_scheme"] == true) {
                    str1 = str1 + a["n_receipt_scheme"].val.toString() + '|'
                }
                if (this.state.ColumnHide["n_receipt_value"] == true) {
                    str1 = str1 + a["rate"]["val"] * a["n_receipt_qty"]["val"].toString() + '|'
                }
            }
            //sales
            if (this.state.ColumnHide["SalesCanshow"] == true) {
                if (this.state.ColumnHide["n_sales_qty"] == true) {
                    str1 = str1 + a["n_sales_qty"].val.toString() + '|'
                }
                if (this.state.ColumnHide["n_scheme_qty"] == true) {
                    str1 = str1 + a["n_scheme_qty"].val.toString() + '|'
                }
                if (this.state.ColumnHide["n_sales_value"] == true) {
                    str1 = str1 + a["n_sales_value"]["val"].toString() + '|'
                }
            }

            //returns
            if (this.state.ColumnHide["ReturnsCanShow"] == true) {
                if (this.state.ColumnHide["n_other_qty"] == true) {
                    str1 = str1 + a["n_other_qty"].val.toString() + '|'
                }
                if (this.state.ColumnHide["n_other_scheme"] == true) {
                    str1 = str1 + a["n_other_scheme"].val.toString() + '|'
                }
                if (this.state.ColumnHide["n_other_value"] == true) {
                    str1 = str1 + a["rate"]["val"] * a["n_other_qty"]["val"].toString() + '|'
                }
            }
            //return to cfa/rss
            if (this.state.ColumnHide["ReturnToCFARSSCanshow"] == true) {
                if (this.state.ColumnHide["ReturnToCFARssQty"] == true) {
                    str1 = str1 + "0" + '|'
                }
                if (this.state.ColumnHide["ReturnToCFARssSchQty"] == true) {
                    str1 = str1 + "0" + '|'
                }
                if (this.state.ColumnHide["ReturnToCFARssValue"] == true) {
                    str1 = str1 + "0" + '|'
                }
            }
            //closing
            if (this.state.ColumnHide["ClosingCanShow"] == true) {
                if (this.state.ColumnHide["n_closing_qty"] == true) {
                    str1 = str1 + a["n_closing_qty"].val.toString() + '|'
                }
                if (this.state.ColumnHide["closingschqty"] == true) {
                    str1 = str1 + a["closingschqty"].val.toString() + '|'
                }
                if (this.state.ColumnHide["n_closing_value"] == true) {
                    str1 = str1 + a["rate"]["val"] * a["n_closing_qty"]["val"].toString() + '|'
                }
            }
            //trnsit
            if (this.state.ColumnHide["TrnQty"] == true) {
                if (this.state.ColumnHide["TrnQty"] == true) {
                    str1 = str1 + a["n_transit_qty"].val.toString()
                }

            }
            str1 = str1 + '^'
        })
        str1 = str1.slice(0, -1)

        var data = {
            "index": "SecsaleApproveRequest",
            "Data": {
                "selectedFs": this.props.fs,
                "Nmonth": this.props.month,
                "nyear": this.props.year,
                "stockist": this.props.stockist,
                "SaleType": this.props.selecSecSalesTypr,
                "SaleNote": this.state.remarks,
                "itemparam": str1,
                "nonoperatingStk": this.props.nonoptStockist == "2" ? "1" : "0"
            },
            "Token": ""
        }
        postToServer("Sales", data).then((Result) => {
            if (Result.data.Status == "Success") {
                this.setState({ showStatusModal: true, success: true, message: Result.data.data[0].message })
                setTimeout(
                    function () {
                        this.setState({ showStatusModal: false });
                        this.props.history.push('/SSalesApproval')
                    }
                        .bind(this),
                    1500
                );

            }
        })
            .catch(err => {
                this.setState({ errorMsg: "Exception in application" })
            })

    }
    getUploadedDocumentList(month, year, stockist) {
        var data = {
            "index": "GetshowuploaddocList",
            "Data": {
                "month": month,
                "year": year,
                "stockiestcode": stockist
            },
            "Token": ""
        }
        postToServer("Sales", data).then((Result) => {
            if (Result.data.Status == 'Success') {
                this.setState({ documentList: Result.data.data })
            }
        }).catch(e => {
        })
    }
    getDownloadLink(month, year, stockist) {
        var data = {
            "index": "Getshowdownloadlink",
            "Data": {
                "month": month,
                "year": year,
                "stockiestcode": stockist
            }, "Token": ""
        }
        postToServer("Sales", data).then((Result) => {
            if (Result.data.Status == 'Success') {
                this.setState({ fileDownloadLink: Result.data.data[0].Fileupload })
            }
        }).catch(e => {
        })
    }
    componentDidMount() {

        this.itemRateRefreshButton(this.props.month.toString(), this.props.year.toString(), this.props.selecSecSalesTypr, this.props.stockist, this.props.fs)
        this.getUploadedDocumentList(this.props.month.toString(), this.props.year.toString(), this.props.stockist)
        this.getDownloadLink(this.props.month.toString(), this.props.year.toString(), this.props.stockist)
        var Builddata = []
        let ColumnHide = {}
        let readonly = {}
        if (this.props.nonoptStockist == "2") {
            readonly["n_sales_qty"] = true
            readonly["n_scheme_qty"] = true
            readonly["n_sales_value"] = true
            readonly["n_closing_qty"] = true
            readonly["closingschqty"] = true
            readonly["n_closing_value"] = true
            this.setState({ readonly: readonly })
        }
        if (this.props.selecSecSalesTypr == "1") {
            readonly["n_sales_qty"] = true
            readonly["n_scheme_qty"] = true
            readonly["n_sales_value"] = true
            this.setState({ readonly: readonly })

        }
        if (this.props.selecSecSalesTypr == "2") {
            readonly["n_closing_qty"] = true
            readonly["closingschqty"] = true
            readonly["n_closing_value"] = true
            this.setState({ readonly: readonly })

        }
        let listprice = {}
        let remarks = ''
        //let openTotal = 0, receiptTotal = 0, salesTotal = 0, returnsTotal = 0, closingTotal = 0, returnstocfarssTotal = 0
        //  this.setState({ total: { open: 0, close: 0, sales: 0, tran: 0, Return: 0, receipt: 0, other: 0 } })
        //let total = { open: 0, close: 0, sales: 0, tran: 0, Return: 0, receipt: 0, other: 0 }
        this.props.dataTotal != undefined && this.props.dataTotal.length > 0 ? this.props.dataTotal.map(res => {

            //     receiptTotal = res.n_tot_receipt_value != undefined ? res.n_tot_receipt_value : res.N_TOT_RECEIPT_VALUE,
            //         salesTotal = res.n_tot_sales_value != undefined ? res.n_tot_sales_value : res.N_TOT_SALES_VALUE,
            //         returnsTotal = res.n_tot_other_value != undefined ? res.n_tot_other_value : res.N_TOT_OTHER_VALUE,
            //         closingTotal = res.n_tot_closing_value != undefined ? res.n_tot_closing_value : res.N_TOT_CLOSING_VALUE,
            //         returnstocfarssTotal = res.returnstocfarssTotal != undefined ? res.returnstocfarssTotal : res.returnstocfarssTotal,
            remarks = res.c_note != undefined ? res.c_note : res.C_NOTE
            //         openTotal = res.n_tot_opening_value

        }) : null
        this.setState({
            // openTotal: openTotal,
            // receiptTotal: receiptTotal,
            // salesTotal: salesTotal,
            // returnsTotal: returnsTotal,
            // closingTotal: closingTotal,
            // returnstocfarssTotal: returnstocfarssTotal,
            remarks: remarks

        })
        let propsData = this.props.data
        let datakey1 = this.state.datakey
        var promise = new Promise(function (resolve, reject) {

            propsData != undefined && propsData.length > 0 ? propsData.map((A, index) => {
                let datakey = JSON.parse(JSON.stringify(datakey1));  // Object.assign({}, this.state.datakey);
                if (index == 1) {
                    // this.setState({ SrNo: A["SrNo"] })
                }
                listprice[A["itemcode"]] = {}
                listprice[A["itemcode"]]["SrNo"] = A["SrNo"]
                listprice[A["itemcode"]]["rateflg"] = A["rateflg"]
                listprice[A["itemcode"]]["c_name"] = A["c_name"] != undefined ? A["c_name"] : '0'
                listprice[A["itemcode"]]["c_pack"] = A["c_pack"] != undefined ? A["c_pack"] : '0'
                listprice[A["itemcode"]]["rate"] = A["rate"] != undefined ? A["rate"] : '0'
                listprice[A["itemcode"]]["openingqty"] = A["openingqty"] != undefined ? A["openingqty"] : '0'
                listprice[A["itemcode"]]["openingschqty"] = A["openingschqty"] != undefined ? A["openingschqty"] : '0'
                listprice[A["itemcode"]]["OpenValue"] = A["openingvisibleue"] != undefined ? A["openingvisibleue"] : '0'
                listprice[A["itemcode"]]["n_receipt_qty"] = A["n_receipt_qty"] != undefined ? A["n_receipt_qty"] : '0'
                listprice[A["itemcode"]]["n_receipt_scheme"] = A["n_receipt_scheme"] != undefined ? A["n_receipt_scheme"] : '0'
                listprice[A["itemcode"]]["n_receipt_value"] = A["n_receipt_visibleue"] != undefined ? A["n_receipt_visibleue"] : '0'
                listprice[A["itemcode"]]["n_sales_qty"] = A["n_sales_qty"] != undefined ? A["n_sales_qty"] : '0'
                listprice[A["itemcode"]]["n_scheme_qty"] = A["n_scheme_qty"] != undefined ? A["n_scheme_qty"] : '0'
                listprice[A["itemcode"]]["n_sales_value"] = A["n_sales_value"] != undefined ? A["n_sales_value"] : A["n_sales_qty"] * A["rate"]
                listprice[A["itemcode"]]["n_other_qty"] = A["n_other_qty"] != undefined ? A["n_other_qty"] : '0'
                listprice[A["itemcode"]]["n_other_scheme"] = A["n_other_scheme"] != undefined ? A["n_other_scheme"] : '0'
                listprice[A["itemcode"]]["n_other_visibleue"] = A["n_other_visibleue"] != undefined ? A["n_other_visibleue"] : '0'
                listprice[A["itemcode"]]["n_closing_qty"] = A["n_closing_qty"] != undefined ? A["n_closing_qty"] : '0'
                listprice[A["itemcode"]]["closingschqty"] = A["closingschqty"] != undefined ? A["closingschqty"] : '0'
                listprice[A["itemcode"]]["n_closing_value"] = A["n_closing_value"] != undefined ? A["n_closing_value"] : '0'
                listprice[A["itemcode"]]["n_transit_qty"] = A["n_transit_qty"] != undefined ? A["n_transit_qty"] : '0'

                listprice[A["itemcode"]]["ReturnToCFARssQty"] = A["N_retCfa_Qty"] != undefined ? A["N_retCfa_Qty"] : '0'
                listprice[A["itemcode"]]["ReturnToCFARssSchQty"] = A["N_retCfa_Scheme"] != undefined ? A["N_retCfa_Scheme"] : '0'
                listprice[A["itemcode"]]["ReturnToCFARssValue"] = A["N_retCfa_value"] != undefined ? A["N_retCfa_value"] : '0'


                datakey["itemcode"] = A["itemcode"]
                datakey["c_name"]["val"] = A["c_name"]
                datakey["c_pack"]["val"] = A["c_pack"]
                datakey["rate"]["val"] = A["rate"]
                datakey["openingqty"]["val"] = A["openingqty"] == undefined ? 0 : A["openingqty"]
                datakey["ReturnToCFARssQty"]["val"] = A["N_retCfa_Qty"]
                datakey["ReturnToCFARssSchQty"]["val"] = A["N_retCfa_Scheme"]
                datakey["ReturnToCFARssValue"]["val"] = A["N_retCfa_value"]
                datakey["openingschqty"]["val"] = A["openingschqty"] == undefined ? 0 : A["openingschqty"]
                datakey["OpenValue"]["val"] = A["openingvisibleue"]
                datakey["n_receipt_qty"]["val"] = A["n_receipt_qty"] == undefined ? 0 : A["n_receipt_qty"]
                datakey["n_receipt_scheme"]["val"] = A["n_receipt_scheme"] == undefined ? 0 : A["n_receipt_scheme"]
                datakey["n_receipt_value"]["val"] = A["n_receipt_visibleue"]
                datakey["n_sales_qty"]["val"] = A["n_sales_qty"] == undefined ? 0 : A["n_sales_qty"]
                datakey["n_scheme_qty"]["val"] = A["n_scheme_qty"] == undefined ? 0 : A["n_scheme_qty"]
                datakey["n_sales_value"]["val"] = A["n_sales_value"] == undefined ? 0 : A["n_sales_value"]
                datakey["n_other_qty"]["val"] = A["n_other_qty"] == undefined ? 0 : A["n_other_qty"]
                datakey["n_other_scheme"]["val"] = A["n_other_scheme"] == undefined ? 0 : A["n_other_scheme"]
                datakey["n_other_value"]["val"] = A["n_other_visibleue"]
                datakey["n_closing_qty"]["val"] = A["n_closing_qty"] == undefined ? 0 : A["n_closing_qty"]
                datakey["closingschqty"]["val"] = A["closingschqty"] == undefined ? 0 : A["closingschqty"]
                datakey["n_closing_value"]["val"] = A["n_closing_value"] == undefined ? 0 : A["n_closing_value"]
                datakey["n_transit_qty"]["val"] = A["n_transit_qty"] == undefined ? 0 : A["n_transit_qty"]
                //item rate changed
                datakey["rateflg"] = A["rateflg"]
                Builddata.push(datakey)
                resolve(true)
            })

                : null
        })

        promise.then(bool => {
            if (bool) {
                this.totalCalculation(Builddata)
            }

        })
        this.setState({ Listdata: Builddata })

        var data = {
            "index": "TableFlagSecondSalesList", "Data": {
            }
        }
        postToServer("Sales", data).then((Result) => {
            if (Result.data.Status == 'Success') {
                let a = {}
                a = Result.data["data"]
                {/* to show heading */ }
                ColumnHide["openingCanShow"] = a["openingCanShow"] == "1" || a["openingCanShow"] == "2" ? true : false
                ColumnHide["ReceiptCanShow"] = a["ReceiptCanShow"] == "1" || a["ReceiptCanShow"] == "2" ? true : false
                ColumnHide["SalesCanshow"] = a["SalesCanshow"] == "1" || a["SalesCanshow"] == "2" ? true : false
                ColumnHide["ReturnsCanShow"] = a["ReturnsCanShow"] == "1" || a["ReturnsCanShow"] == "2" ? true : false
                ColumnHide["ReturnToCFARSSCanshow"] = a["ReturnToCFARSSCanshow"] == "1" || a["ReturnToCFARSSCanshow"] == "2" ? true : false
                ColumnHide["ClosingCanShow"] = a["ClosingCanShow"] == "1" || a["ClosingCanShow"] == "2" ? true : false
                ColumnHide["TrnQty"] = a["TrnQty"] == "1" || a["TrnQty"] == "2" ? true : false


                // to show opening
                ColumnHide["openingqty"] = a["openingqty"] == "1" || a["openingqty"] == "2" ? true : false
                ColumnHide["openingschqty"] = a["openingschqty"] == "1" || a["openingschqty"] == "2" ? true : false
                ColumnHide["OpenValue"] = a["OpenValue"] == "1" || a["OpenValue"] == "2" ? true : false
                // to show receipt
                ColumnHide["n_receipt_qty"] = a["n_receipt_qty"] == "1" || a["n_receipt_qty"] == "2" ? true : false
                ColumnHide["n_receipt_scheme"] = a["n_receipt_scheme"] == "1" || a["n_receipt_scheme"] == "2" ? true : false
                ColumnHide["n_receipt_value"] = a["n_receipt_value"] == "1" || a["n_receipt_value"] == "2" ? true : false

                // to show sales
                ColumnHide["n_sales_qty"] = a["n_sales_qty"] == "1" || a["n_sales_qty"] == "2" ? true : false
                ColumnHide["n_scheme_qty"] = a["n_scheme_qty"] == "1" || a["n_scheme_qty"] == "2" ? true : false
                ColumnHide["n_sales_value"] = a["n_sales_value"] == "1" || a["n_sales_value"] == "2" ? true : false

                // to show returns  
                ColumnHide["n_other_qty"] = a["n_other_qty"] == "1" || a["n_other_qty"] == "2" ? true : false
                ColumnHide["n_other_scheme"] = a["n_other_scheme"] == "1" || a["n_other_scheme"] == "2" ? true : false
                ColumnHide["n_other_value"] = a["n_other_value"] == "1" || a["n_other_value"] == "2" ? true : false

                // to show return to cfa/rss
                ColumnHide["ReturnToCFARssQty"] = a["ReturnToCFARssQty"] == "1" || a["ReturnToCFARssQty"] == "2" ? true : false
                ColumnHide["ReturnToCFARssSchQty"] = a["ReturnToCFARssSchQty"] == "1" || a["ReturnToCFARssSchQty"] == "2" ? true : false
                ColumnHide["ReturnToCFARssValue"] = a["ReturnToCFARssValue"] == "1" || a["ReturnToCFARssValue"] == "2" ? true : false

                // to show closing
                ColumnHide["n_closing_qty"] = a["n_closing_qty"] == "1" || a["n_closing_qty"] == "2" ? true : false
                ColumnHide["closingschqty"] = a["closingschqty"] == "1" || a["closingschqty"] == "2" ? true : false
                ColumnHide["n_closing_value"] = a["n_closing_value"] == "1" || a["n_closing_value"] == "2" ? true : false

                readonly["n_closing_qty"] = a["n_closing_qty"] == "1" ? true : false
                readonly["closingschqty"] = a["closingschqty"] == "1" ? true : false
                readonly["n_closing_value"] = a["n_closing_value"] == "1" ? true : false

                this.setState({ ColumnHide: ColumnHide, readonly: readonly })
            }
        }).catch((Error) => {
        })
    }
    render() {
        return (
            <React.Fragment>

                {/* {this.state.Listdata.length==0 ?  <DashLoader></DashLoader> :null} */}
                <div className="pullleft KamClaimTablesfc">
                    <div className={this.state.isFull ? "fullscreenView" : "dwrlocked-first "}>
                        <div className="ongoing-orders-sfc mrsfcTable sfcFilterOpt">
                            <div className="sfc-head-edit">
                                <div>
                                    <h5 className="sfc-list-sec-head">
                                        Secondary Sales Entry For The Month of {this.state.month[this.props.month]} - {this.props.year}
                                    </h5>
                                </div>

                                {this.props.nonoptStockist == "1" || this.props.nonoptStockist == "2" ?
                                    <div class="form-check mb-2 non-op-stockist">
                                        <input type="checkbox" disabled checked={this.props.nonoptStockist == "2" ? true : false} class="form-check-input filled-in" id="filledInCheckbox" />
                                        <label class="form-check-label " for="filledInCheckbox">Non Operating Stockist</label>
                                    </div> : null}
                                <div>
                                    <div className="other-ops mt-1">
                                        <Dropdown>
                                            <Dropdown.Toggle className="dcr-options" id="dropdown-basic">
                                                <img src="../public/assets/images/export.svg" alt="export_img" />
                                                <span>Export</span>
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu className="export-dropdown">
                                                <div className="dcrlistexport export-ops">
                                                    <div className="text-center" onClick={this.handleExcel}>
                                                        <img src="../public/assets/images/excel.svg" alt="excel" />
                                                        <p>Excel</p>
                                                    </div>
                                                    {/* <div>
											<img src="../public/assets/images/excel.svg" alt="excel" />
												<ReactHTMLTableToExcel
													id="test-table-xls-button"
													className="download-table-xls-button"
													table="table-to-xls"
													filename="tablexls"
													sheet="tablexls"
													buttonText="Excel"/>
											</div> */}
                                                </div>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
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
                                <div className="itemdetail-table" >
                                    {/* id="example" class="stripe row-border order-column" */}
                                    <table id="table-to-xls" responsive>
                                        <thead>
                                            <tr>
                                                <th rowspan="1" colspan="3">ItemDetails</th>
                                                {this.state.ColumnHide["openingCanShow"] == true ? <th rowspan="1"
                                                    colspan={this.state.ColumnHide["openingCanShow"] == true && this.state.ColumnHide["openingqty"] == true && this.state.ColumnHide["openingschqty"] == true ? "3" :
                                                        this.state.ColumnHide["openingCanShow"] == true && (this.state.ColumnHide["openingqty"] == false || this.state.ColumnHide["openingschqty"] == false) ? "2" : null}
                                                >  Opening</th> : null}
                                                {this.state.ColumnHide["ReceiptCanShow"] == true ? <th rowspan="1"
                                                    colspan={this.state.ColumnHide["ReceiptCanShow"] == true && this.state.ColumnHide["n_receipt_qty"] == true && this.state.ColumnHide["n_receipt_scheme"] == true ? "3" :
                                                        this.state.ColumnHide["ReceiptCanShow"] == true && (this.state.ColumnHide["n_receipt_qty"] == false || this.state.ColumnHide["n_receipt_scheme"] == false) ? "2" :
                                                            null} >   Receipt</th> : null}
                                                {this.state.ColumnHide["SalesCanshow"] == true ? <th rowspan="1"
                                                    colspan={this.state.ColumnHide["SalesCanshow"] == true && this.state.ColumnHide["n_sales_qty"] == true && this.state.ColumnHide["n_scheme_qty"] == true ? "3" :
                                                        this.state.ColumnHide["SalesCanshow"] == true && (this.state.ColumnHide["n_sales_qty"] == false || this.state.ColumnHide["n_scheme_qty"] == false) ? "2" :
                                                            null}  >  Sales</th> : null}
                                                {this.state.ColumnHide["ReturnsCanShow"] == true ? <th rowspan="1"
                                                    colspan={this.state.ColumnHide["ReturnsCanShow"] == true && this.state.ColumnHide["n_other_qty"] == true && this.state.ColumnHide["n_other_scheme"] == true ? "3" :
                                                        this.state.ColumnHide["ReturnsCanShow"] == true && (this.state.ColumnHide["n_other_qty"] == false || this.state.ColumnHide["n_other_scheme"] == false) ? "2" :
                                                            null}>   Returns</th> : null}
                                                {/* {this.state.ColumnHide["ReturnToCFARSSCanshow"] == true ? <th rowspan="1"
                                                    colspan={this.state.ColumnHide["ReturnToCFARSSCanshow"] == true && this.state.ColumnHide["ReturnToCFARssQty"] == true && this.state.ColumnHide["ReturnToCFARssSchQty"] == true ? "3" :
                                                        this.state.ColumnHide["ReturnToCFARSSCanshow"] == true && (this.state.ColumnHide["ReturnToCFARssQty"] == false || this.state.ColumnHide["ReturnToCFARssSchQty"] == false) ? "2" :
                                                            null}>Returns to CFA/RSS</th> : null} */}
                                                {this.state.ColumnHide["ClosingCanShow"] == true ? <th rowspan="1"
                                                    colspan={this.state.ColumnHide["ClosingCanShow"] == true && this.state.ColumnHide["n_closing_qty"] == true && this.state.ColumnHide["closingschqty"] == true ? "3" :
                                                        this.state.ColumnHide["ClosingCanShow"] == true && (this.state.ColumnHide["n_closing_qty"] == false || this.state.ColumnHide["closingschqty"] == false) ? "2" :
                                                            null}>Closing</th> : null}
                                                {this.state.ColumnHide["TrnQty"] == true ? <th rowspan="1" colspan="1">TrnQty</th> : null}
                                            </tr>
                                            <tr>
                                                <th>Name</th>
                                                <th>Pack</th>
                                                <th>price</th>

                                                {/* Opening */}
                                                {this.state.ColumnHide["openingqty"] == false ?

                                                    <>
                                                        {this.state.ColumnHide["openingCanShow"] == true ? this.state.ColumnHide["openingschqty"] == true ? <th>Sch Qty</th> : null : null}
                                                        {this.state.ColumnHide["openingCanShow"] == true ? this.state.ColumnHide["OpenValue"] == true ? <th>Value</th> : <th></th> : null}
                                                    </> : null}
                                                {this.state.ColumnHide["openingschqty"] == false ?

                                                    <>
                                                        {this.state.ColumnHide["openingCanShow"] == true ? this.state.ColumnHide["openingqty"] == true ? <th>Qty</th> : <th></th> : null}
                                                        {this.state.ColumnHide["openingCanShow"] == true ? this.state.ColumnHide["OpenValue"] == true ? <th>Value</th> : <th></th> : null}
                                                    </> : null}
                                                {this.state.ColumnHide["openingqty"] == true && this.state.ColumnHide["openingschqty"] == true ?

                                                    <>
                                                        {this.state.ColumnHide["openingCanShow"] == true ? this.state.ColumnHide["openingqty"] == true ? <th>Qty</th> : <th></th> : null}
                                                        {this.state.ColumnHide["openingCanShow"] == true ? this.state.ColumnHide["openingschqty"] == true ? <th>Sch Qty</th> : null : null}
                                                        {this.state.ColumnHide["openingCanShow"] == true ? this.state.ColumnHide["OpenValue"] == true ? <th>Value</th> : <th></th> : null}
                                                    </> : null
                                                }




                                                {/* receipt */}

                                                {this.state.ColumnHide["n_receipt_qty"] == false ?
                                                    <>
                                                        {this.state.ColumnHide["ReceiptCanShow"] == true ? this.state.ColumnHide["n_receipt_scheme"] == true ? <th>Sch Qty</th> : <th></th> : null}
                                                        {this.state.ColumnHide["ReceiptCanShow"] == true ? this.state.ColumnHide["n_receipt_value"] == true ? <th>Value</th> : <th></th> : null}

                                                    </> : null}
                                                {this.state.ColumnHide["n_receipt_scheme"] == false ?
                                                    <>
                                                        {this.state.ColumnHide["ReceiptCanShow"] == true ? this.state.ColumnHide["n_receipt_qty"] == true ? <th>Qty</th> : <th></th> : null}
                                                        {this.state.ColumnHide["ReceiptCanShow"] == true ? this.state.ColumnHide["n_receipt_value"] == true ? <th>Value</th> : <th></th> : null}

                                                    </> : null}
                                                {this.state.ColumnHide["n_receipt_qty"] == true && this.state.ColumnHide["n_receipt_scheme"] == true ?
                                                    <>
                                                        {this.state.ColumnHide["ReceiptCanShow"] == true ? this.state.ColumnHide["n_receipt_qty"] == true ? <th>Qty</th> : <th></th> : null}
                                                        {this.state.ColumnHide["ReceiptCanShow"] == true ? this.state.ColumnHide["n_receipt_scheme"] == true ? <th>Sch Qty</th> : <th></th> : null}
                                                        {this.state.ColumnHide["ReceiptCanShow"] == true ? this.state.ColumnHide["n_receipt_value"] == true ? <th>Value</th> : <th></th> : null}
                                                    </> : null}

                                                {/* sales */}

                                                {this.state.ColumnHide["n_sales_qty"] == false ?

                                                    <>
                                                        {this.state.ColumnHide["SalesCanshow"] == true ? this.state.ColumnHide["n_scheme_qty"] == true ? <th>Sch Qty</th> : <th></th> : null}
                                                        {this.state.ColumnHide["SalesCanshow"] == true ? this.state.ColumnHide["n_sales_value"] == true ? <th>Value</th> : <th></th> : null}
                                                    </> : null}
                                                {this.state.ColumnHide["n_scheme_qty"] == false ?
                                                    <>
                                                        {this.state.ColumnHide["SalesCanshow"] == true ? this.state.ColumnHide["n_sales_qty"] == true ? <th>Qty</th> : <th></th> : null}
                                                        {this.state.ColumnHide["SalesCanshow"] == true ? this.state.ColumnHide["n_sales_value"] == true ? <th>Value</th> : <th></th> : null}


                                                    </> : null}
                                                {
                                                    this.state.ColumnHide["n_sales_qty"] == true && this.state.ColumnHide["n_scheme_qty"] == true ?
                                                        <>
                                                            {this.state.ColumnHide["SalesCanshow"] == true ? this.state.ColumnHide["n_sales_qty"] == true ? <th>Qty</th> : <th></th> : null}
                                                            {this.state.ColumnHide["SalesCanshow"] == true ? this.state.ColumnHide["n_scheme_qty"] == true ? <th>Sch Qty</th> : <th></th> : null}
                                                            {this.state.ColumnHide["SalesCanshow"] == true ? this.state.ColumnHide["n_sales_value"] == true ? <th>Value</th> : <th></th> : null}
                                                        </> : null}

                                                {/* returns */}
                                                {this.state.ColumnHide["n_other_qty"] == false ?
                                                    <>
                                                        {this.state.ColumnHide["ReturnsCanShow"] == true ? this.state.ColumnHide["n_other_scheme"] == true ? <th>Sch Qty</th> : <th></th> : null}
                                                        {this.state.ColumnHide["ReturnsCanShow"] == true ? this.state.ColumnHide["n_other_value"] == true ? <th>Value</th> : <th></th> : null}

                                                    </> : null}
                                                {this.state.ColumnHide["n_other_scheme"] == false ?
                                                    <>
                                                        {this.state.ColumnHide["ReturnsCanShow"] == true ? this.state.ColumnHide["n_other_qty"] == true ? <th>Qty</th> : <th></th> : null}
                                                        {this.state.ColumnHide["ReturnsCanShow"] == true ? this.state.ColumnHide["n_other_value"] == true ? <th>Value</th> : <th></th> : null}
                                                    </> : null}
                                                {this.state.ColumnHide["n_other_qty"] == true && this.state.ColumnHide["n_other_scheme"] == true ?
                                                    <>
                                                        {this.state.ColumnHide["ReturnsCanShow"] == true ? this.state.ColumnHide["n_other_qty"] == true ? <th>Qty</th> : <th></th> : null}
                                                        {this.state.ColumnHide["ReturnsCanShow"] == true ? this.state.ColumnHide["n_other_scheme"] == true ? <th>Sch Qty</th> : <th></th> : null}
                                                        {this.state.ColumnHide["ReturnsCanShow"] == true ? this.state.ColumnHide["n_other_value"] == true ? <th>Value</th> : <th></th> : null}
                                                    </> : null}

                                                {/* return to cfa/rss */}
                                                {/* {this.state.ColumnHide["ReturnToCFARssQty"] == false ?
                                                    <>
                                                        {this.state.ColumnHide["ReturnToCFARSSCanshow"] == true ? this.state.ColumnHide["ReturnToCFARssSchQty"] == true ? <th>Sch Qty</th> : <th></th> : null}
                                                        {this.state.ColumnHide["ReturnToCFARSSCanshow"] == true ? this.state.ColumnHide["ReturnToCFARssValue"] == true ? <th>Value</th> : <th></th> : null}
                                                    </> : null}
                                                {this.state.ColumnHide["ReturnToCFARssSchQty"] == false ?
                                                    <>
                                                        {this.state.ColumnHide["ReturnToCFARSSCanshow"] == true ? this.state.ColumnHide["ReturnToCFARssQty"] == true ? <th>Qty</th> : <th></th> : null}
                                                        {this.state.ColumnHide["ReturnToCFARSSCanshow"] == true ? this.state.ColumnHide["ReturnToCFARssValue"] == true ? <th>Value</th> : <th></th> : null}
                                                    </> : null}
                                                {this.state.ColumnHide["ReturnToCFARssQty"] == true && this.state.ColumnHide["ReturnToCFARssSchQty"] == true ?

                                                    <>
                                                        {this.state.ColumnHide["ReturnToCFARSSCanshow"] == true ? this.state.ColumnHide["ReturnToCFARssQty"] == true ? <th>Qty</th> : <th></th> : null}
                                                        {this.state.ColumnHide["ReturnToCFARSSCanshow"] == true ? this.state.ColumnHide["ReturnToCFARssSchQty"] == true ? <th>Sch Qty</th> : <th></th> : null}
                                                        {this.state.ColumnHide["ReturnToCFARSSCanshow"] == true ? this.state.ColumnHide["ReturnToCFARssValue"] == true ? <th>Value</th> : <th></th> : null}
                                                    </> : null} */}
                                                {/* closing */}
                                                {this.state.ColumnHide["n_closing_qty"] == false ?
                                                    <>
                                                        {this.state.ColumnHide["ClosingCanShow"] == true ? this.state.ColumnHide["closingschqty"] == true ? <th>Sch Qty</th> : <th></th> : null}
                                                        {this.state.ColumnHide["ClosingCanShow"] == true ? this.state.ColumnHide["n_closing_value"] == true ? <th>Value</th> : <th></th> : null}
                                                    </> : null}
                                                {this.state.ColumnHide["closingschqty"] == false ?
                                                    <>
                                                        {this.state.ColumnHide["ClosingCanShow"] == true ? this.state.ColumnHide["n_closing_qty"] == true ? <th>Qty</th> : null : null}
                                                        {this.state.ColumnHide["ClosingCanShow"] == true ? this.state.ColumnHide["n_closing_value"] == true ? <th>Value</th> : null : null}
                                                    </> : null}
                                                {this.state.ColumnHide["n_closing_qty"] == true && this.state.ColumnHide["closingschqty"] == true ?

                                                    <>
                                                        {this.state.ColumnHide["ClosingCanShow"] == true ? this.state.ColumnHide["n_closing_qty"] == true ? <th>Qty</th> : <th></th> : null}
                                                        {this.state.ColumnHide["ClosingCanShow"] == true ? this.state.ColumnHide["closingschqty"] == true ? <th>Sch Qty</th> : <th></th> : null}
                                                        {this.state.ColumnHide["ClosingCanShow"] == true ? this.state.ColumnHide["n_closing_value"] == true ? <th>Value</th> : <th></th> : null}
                                                    </> : null}

                                                {/* trnqty */}
                                                {this.state.ColumnHide["TrnQty"] == true ? <th> TrnQty</th> : null}

                                            </tr>

                                        </thead>
                                        <tbody>
                                            {
                                                this.state.Listdata.map((w) => {

                                                    return (
                                                        <tr>
                                                            {
                                                                w["c_name"].Header == "Name" ? <td className={w.rateflg == "1" ? "bgforrow" : null}>{w["c_name"]["val"]}</td> : null
                                                            }
                                                            {
                                                                w["c_pack"].Header == "Pack" ? <td className={w.rateflg == "1" ? "bgforrow" : null}>{w["c_pack"]["val"]}</td> : null
                                                            }
                                                            {
                                                                w["rate"].Header == "Price" ? <td className={w.rateflg == "1" ? "bgforrow" : null}>{w["rate"]["val"]}</td> : null
                                                            }
                                                            {/* opening */}
                                                            {this.state.ColumnHide["openingqty"] == false ?
                                                                <>

                                                                    {
                                                                        this.state.ColumnHide["openingCanShow"] == true ?
                                                                            w["openingschqty"].Header == "Sch Qty" && this.state.ColumnHide["openingschqty"] == true ?
                                                                                <td >open<div> <input type="text" value={w["openingschqty"]["val"] == "" ? 0 : w["openingschqty"]["val"]} readOnly className="inv-sug-ord-qty" /></div></td>
                                                                                : <td></td> : null

                                                                    }
                                                                    {
                                                                        this.state.ColumnHide["openingCanShow"] == true ?
                                                                            w["OpenValue"].Header == "Value" && this.state.ColumnHide["OpenValue"] == true ?
                                                                                <td >open<div> <input readOnly type="text" value={parseFloat(w["rate"]["val"] * w["openingqty"]["val"]).toFixed(2)} className="inv-sug-ord-qty" /></div></td>
                                                                                : <td></td> : null

                                                                    }
                                                                </>
                                                                : null}
                                                            {this.state.ColumnHide["openingschqty"] == false ?
                                                                <>
                                                                    {
                                                                        this.state.ColumnHide["openingCanShow"] == true ?
                                                                            w["openingqty"].Header == "Qty" && this.state.ColumnHide["openingqty"] == true ?
                                                                                <td >open<div> <input type="text" value={w["openingqty"]["val"]} readOnly className="inv-sug-ord-qty" /></div></td>
                                                                                : <td></td> : null

                                                                    }

                                                                    {
                                                                        this.state.ColumnHide["openingCanShow"] == true ?
                                                                            w["OpenValue"].Header == "Value" && this.state.ColumnHide["OpenValue"] == true ?
                                                                                <td >open<div> <input readOnly type="text" value={parseFloat(w["rate"]["val"] * w["openingqty"]["val"]).toFixed(2)} className="inv-sug-ord-qty" /></div></td>
                                                                                : <td></td> : null

                                                                    }
                                                                </> : null}
                                                            {this.state.ColumnHide["openingqty"] == true && this.state.ColumnHide["openingschqty"] == true ?

                                                                <>
                                                                    {
                                                                        this.state.ColumnHide["openingCanShow"] == true ?
                                                                            w["openingqty"].Header == "Qty" && this.state.ColumnHide["openingqty"] == true ?
                                                                                <td >open<div> <input type="text" value={w["openingqty"]["val"]} readOnly className="inv-sug-ord-qty" /></div></td>
                                                                                : <td></td> : null

                                                                    }
                                                                    {this.state.ColumnHide["openingCanShow"] == true ?
                                                                        w["openingschqty"].Header == "Sch Qty" && this.state.ColumnHide["openingschqty"] == true ?
                                                                            <td >open<div> <input type="text" value={w["openingschqty"]["val"] == "" ? 0 : w["openingschqty"]["val"]} readOnly className="inv-sug-ord-qty" /></div></td>
                                                                            : <td></td> : null

                                                                    }
                                                                    {
                                                                        this.state.ColumnHide["openingCanShow"] == true ?
                                                                            w["OpenValue"].Header == "Value" && this.state.ColumnHide["OpenValue"] == true ?
                                                                                <td >open<div> <input readOnly type="text" value={parseFloat(w["rate"]["val"] * w["openingqty"]["val"]).toFixed(2)} className="inv-sug-ord-qty" /></div></td>
                                                                                : <td></td> : null

                                                                    }
                                                                </> : null}


                                                            {/* receipt */}
                                                            {this.state.ColumnHide["n_receipt_qty"] == false ?
                                                                <>

                                                                    {
                                                                        this.state.ColumnHide["ReceiptCanShow"] == true ?
                                                                            w["n_receipt_scheme"].Header == "Sch Qty	" && this.state.ColumnHide["n_receipt_scheme"] == true ?
                                                                                <td >Receipt<div> <input type="text" value={w["n_receipt_scheme"]["val"]} readOnly className="inv-sug-ord-qty" /></div></td>
                                                                                : <td></td> : null

                                                                    }
                                                                    {
                                                                        this.state.ColumnHide["ReceiptCanShow"] == true ?
                                                                            w["n_receipt_value"].Header == "Value" && this.state.ColumnHide["n_receipt_value"] == true ?
                                                                                <td >Receipt<div> <input type="text" readOnly value={parseFloat(w["rate"]["val"] * w["n_receipt_qty"]["val"]).toFixed(2)} className="inv-sug-ord-qty" /></div></td>
                                                                                : <td></td> : null

                                                                    }
                                                                </> : null}
                                                            {
                                                                this.state.ColumnHide["n_receipt_scheme"] == false ?
                                                                    <>
                                                                        {
                                                                            this.state.ColumnHide["ReceiptCanShow"] == true ?
                                                                                w["n_receipt_qty"].Header == "Qty" && this.state.ColumnHide["n_receipt_qty"] == true ?
                                                                                    <td >Receipt<div> <input type="text" value={w["n_receipt_qty"]["val"]} readOnly className="inv-sug-ord-qty" /></div></td>
                                                                                    : <td></td> : null

                                                                        }

                                                                        {
                                                                            this.state.ColumnHide["ReceiptCanShow"] == true ?
                                                                                w["n_receipt_value"].Header == "Value" && this.state.ColumnHide["n_receipt_value"] == true ?
                                                                                    <td >Receipt<div> <input type="text" readOnly value={parseFloat(w["rate"]["val"] * w["n_receipt_qty"]["val"]).toFixed(2)} className="inv-sug-ord-qty" /></div></td>
                                                                                    : <td></td> : null

                                                                        }
                                                                    </>
                                                                    : null
                                                            }
                                                            { this.state.ColumnHide["n_receipt_qty"] == true && this.state.ColumnHide["n_receipt_scheme"] == true ?
                                                                <>
                                                                    {
                                                                        this.state.ColumnHide["ReceiptCanShow"] == true ?
                                                                            w["n_receipt_qty"].Header == "Qty" && this.state.ColumnHide["n_receipt_qty"] == true ?
                                                                                <td >Receipt<div> <input type="text" value={w["n_receipt_qty"]["val"]} readOnly className="inv-sug-ord-qty" /></div></td>
                                                                                : <td></td> : null

                                                                    }
                                                                    {
                                                                        this.state.ColumnHide["ReceiptCanShow"] == true ?
                                                                            w["n_receipt_scheme"].Header == "Sch Qty	" && this.state.ColumnHide["n_receipt_scheme"] == true ?
                                                                                <td >Receipt<div> <input type="text" value={w["n_receipt_scheme"]["val"]} readOnly className="inv-sug-ord-qty" /></div></td>
                                                                                : <td></td> : null

                                                                    }
                                                                    {
                                                                        this.state.ColumnHide["ReceiptCanShow"] == true ?
                                                                            w["n_receipt_value"].Header == "Value" && this.state.ColumnHide["n_receipt_value"] == true ?
                                                                                <td >Receipt<div> <input type="text" readOnly value={parseFloat(w["rate"]["val"] * w["n_receipt_qty"]["val"]).toFixed(2)} className="inv-sug-ord-qty" /></div></td>
                                                                                : <td></td> : null

                                                                    }
                                                                </>
                                                                : null
                                                            }

                                                            {/* sales */}
                                                            {this.state.ColumnHide["n_sales_qty"] == false ?
                                                                <>

                                                                    {
                                                                        this.state.ColumnHide["SalesCanshow"] == true ?
                                                                            w["n_scheme_qty"].Header == "Sch Qty" && this.state.ColumnHide["n_scheme_qty"] == true ?
                                                                                <td >Sales<div> <input type="text" onChange={(event) => { this.updateprice(event, w["itemcode"], "n_scheme_qty", w["rate"]["val"]) }}
                                                                                    value={this.state.readonly["n_scheme_qty"] && this.props.selecSecSalesTypr == "1" ? w["n_scheme_qty"]["val"] = parseInt(w["openingschqty"]["val"]) + parseInt(w["n_receipt_scheme"]["val"]) + parseInt(w["n_other_scheme"]["val"]) - w["closingschqty"]["val"] : w["n_scheme_qty"]["val"]}
                                                                                    readOnly={this.state.readonly["n_scheme_qty"]} className="inv-sug-ord-qty" /></div></td>
                                                                                : <td></td> : null

                                                                    }
                                                                    {
                                                                        this.state.ColumnHide["SalesCanshow"] == true ?
                                                                            w["n_sales_value"].Header == "Value" && this.state.ColumnHide["n_sales_value"] == true ?
                                                                                <td >Sales<div> <input type="text" readOnly value={parseFloat(w["rate"]["val"] * w["n_sales_qty"]["val"]).toFixed(2)} className="inv-sug-ord-qty" /></div></td>
                                                                                : <td></td> : null

                                                                    }
                                                                </> : null}
                                                            { this.state.ColumnHide["n_scheme_qty"] == false ?
                                                                <>
                                                                    {
                                                                        this.state.ColumnHide["SalesCanshow"] == true ?
                                                                            w["n_sales_qty"].Header == "Qty" && this.state.ColumnHide["n_sales_qty"] == true ?
                                                                                <td >Sales<div> <input type="text" onChange={(event) => { this.updateprice(event, w["itemcode"], "n_sales_qty", w["rate"]["val"]) }}
                                                                                    value={this.state.readonly["n_sales_qty"] && this.props.selecSecSalesTypr == "1" ? w["n_sales_qty"]["val"] = parseInt(w["openingqty"]["val"]) + parseInt(w["n_receipt_qty"]["val"]) + parseInt(w["n_other_qty"]["val"]) - w["n_closing_qty"]["val"] : w["n_sales_qty"]["val"]}
                                                                                    readOnly={this.state.readonly["n_sales_qty"]} name="n_sales_qty" className="inv-sug-ord-qty" /></div></td>
                                                                                : <td></td> : null

                                                                    }

                                                                    {
                                                                        this.state.ColumnHide["SalesCanshow"] == true ?
                                                                            w["n_sales_value"].Header == "Value" && this.state.ColumnHide["n_sales_value"] == true ?
                                                                                <td >Sales<div> <input type="text" value={parseFloat(w["rate"]["val"] * w["n_sales_qty"]["val"]).toFixed(2)} readOnly className="inv-sug-ord-qty" /></div></td>
                                                                                : <td></td> : null

                                                                    }
                                                                </>
                                                                : null}
                                                            {  this.state.ColumnHide["n_sales_qty"] == true && this.state.ColumnHide["n_scheme_qty"] == true ? <>
                                                                {
                                                                    this.state.ColumnHide["SalesCanshow"] == true ?
                                                                        w["n_sales_qty"].Header == "Qty" && this.state.ColumnHide["n_sales_qty"] == true ?
                                                                            <td >Sales<div> <input type="text" onChange={(event) => { this.updateprice(event, w["itemcode"], "n_sales_qty", w["rate"]["val"]) }}
                                                                                value={this.state.readonly["n_sales_qty"] && this.props.selecSecSalesTypr == "1" ? w["n_sales_qty"]["val"] = parseInt(w["openingqty"]["val"]) + parseInt(w["n_receipt_qty"]["val"]) + parseInt(w["n_other_qty"]["val"]) - w["n_closing_qty"]["val"] : w["n_sales_qty"]["val"]}
                                                                                readOnly={this.state.readonly["n_sales_qty"]} name="n_sales_qty" className="inv-sug-ord-qty" /></div></td>
                                                                            : <td></td> : null

                                                                }
                                                                {
                                                                    this.state.ColumnHide["SalesCanshow"] == true ?
                                                                        w["n_scheme_qty"].Header == "Sch Qty" && this.state.ColumnHide["n_scheme_qty"] == true ?
                                                                            <td >Sales<div> <input type="text" onChange={(event) => { this.updateprice(event, w["itemcode"], "n_scheme_qty", w["rate"]["val"]) }}
                                                                                value={this.state.readonly["n_scheme_qty"] && this.props.selecSecSalesTypr == "1" ? w["n_scheme_qty"]["val"] = parseInt(w["openingschqty"]["val"]) + parseInt(w["n_receipt_scheme"]["val"]) + parseInt(w["n_other_scheme"]["val"]) - w["closingschqty"]["val"] : w["n_scheme_qty"]["val"]}
                                                                                readOnly={this.state.readonly["n_scheme_qty"]} className="inv-sug-ord-qty" /></div></td>
                                                                            : <td></td> : null

                                                                }
                                                                {
                                                                    this.state.ColumnHide["SalesCanshow"] == true ?
                                                                        w["n_sales_value"].Header == "Value" && this.state.ColumnHide["n_sales_value"] == true ?
                                                                            <td >Sales<div> <input type="text" value={parseFloat(w["rate"]["val"] * w["n_sales_qty"]["val"]).toFixed(2)} readOnly className="inv-sug-ord-qty" /></div></td>
                                                                            : <td></td> : null

                                                                }
                                                            </> : null}



                                                            {/* returns */}
                                                            {this.state.ColumnHide["n_other_qty"] == false ?
                                                                <>
                                                                    {
                                                                        this.state.ColumnHide["ReturnsCanShow"] == true ?
                                                                            w["n_other_scheme"].Header == "Sch Qty" && this.state.ColumnHide["n_other_scheme"] == true ?
                                                                                <td >Returns<div> <input type="text" value={w["n_other_scheme"]["val"]} readOnly className="inv-sug-ord-qty" /></div></td>
                                                                                : <td></td> : null

                                                                    }
                                                                    {
                                                                        this.state.ColumnHide["ReturnsCanShow"] == true ?
                                                                            w["n_other_value"].Header == "Value" && this.state.ColumnHide["n_other_value"] == true ?
                                                                                <td >Returns<div> <input type="text" readOnly value={parseFloat(w["rate"]["val"] * w["n_other_qty"]["val"]).toFixed(2)} className="inv-sug-ord-qty" /></div></td>
                                                                                : <td></td> : null

                                                                    }
                                                                </> : null}
                                                            {this.state.ColumnHide["n_other_scheme"] == false ?

                                                                <>
                                                                    {
                                                                        this.state.ColumnHide["ReturnsCanShow"] == true ?
                                                                            w["n_other_qty"].Header == "Qty" && this.state.ColumnHide["n_other_qty"] == true ?
                                                                                <td >Returns<div> <input type="text" value={w["n_other_qty"]["val"] == "" ? 0 : w["n_other_qty"]["val"]} readOnly className="inv-sug-ord-qty" /></div></td>
                                                                                : <td></td> : null

                                                                    }

                                                                    {
                                                                        this.state.ColumnHide["ReturnsCanShow"] == true ?
                                                                            w["n_other_value"].Header == "Value" && this.state.ColumnHide["n_other_value"] == true ?
                                                                                <td >Returns<div> <input type="text" readOnly value={parseFloat(w["rate"]["val"] * w["n_other_qty"]["val"]).toFixed(2)} className="inv-sug-ord-qty" /></div></td>
                                                                                : <td></td> : null

                                                                    }
                                                                </>

                                                                : null}
                                                            {this.state.ColumnHide["n_other_qty"] == true && this.state.ColumnHide["n_other_scheme"] == true ?
                                                                <>
                                                                    {
                                                                        this.state.ColumnHide["ReturnsCanShow"] == true ?
                                                                            w["n_other_qty"].Header == "Qty" && this.state.ColumnHide["n_other_qty"] == true ?
                                                                                <td >Returns<div> <input type="text" value={w["n_other_qty"]["val"] == "" ? 0 : w["n_other_qty"]["val"]} readOnly className="inv-sug-ord-qty" /></div></td>
                                                                                : <td></td> : null

                                                                    }
                                                                    {
                                                                        this.state.ColumnHide["ReturnsCanShow"] == true ?
                                                                            w["n_other_scheme"].Header == "Sch Qty" && this.state.ColumnHide["n_other_scheme"] == true ?
                                                                                <td >Returns<div> <input type="text" value={w["n_other_scheme"]["val"]} readOnly className="inv-sug-ord-qty" /></div></td>
                                                                                : <td></td> : null

                                                                    }
                                                                    {
                                                                        this.state.ColumnHide["ReturnsCanShow"] == true ?
                                                                            w["n_other_value"].Header == "Value" && this.state.ColumnHide["n_other_value"] == true ?
                                                                                <td >Returns<div> <input type="text" readOnly value={parseFloat(w["rate"]["val"] * w["n_other_qty"]["val"]).toFixed(2)} className="inv-sug-ord-qty" /></div></td>
                                                                                : <td></td> : null

                                                                    }
                                                                </>

                                                                : null}

                                                            {/* returns  to cfa/rss*/}
                                                            {/* {this.state.ColumnHide["ReturnToCFARssQty"] == false ?
                                                                <>

                                                                    {
                                                                        this.state.ColumnHide["ReturnToCFARSSCanshow"] == true ?
                                                                            w["ReturnToCFARssSchQty"].Header == "Sch Qty" && this.state.ColumnHide["ReturnToCFARssSchQty"] == true ?
                                                                                <td >Return To CFA/RSS <div> <input type="text" value={w["ReturnToCFARssSchQty"]["val"] == "" ? 0 : parseInt(w["ReturnToCFARssSchQty"]["val"])} readOnly className="inv-sug-ord-qty" /></div></td>
                                                                                : <td></td> : null

                                                                    }
                                                                    {
                                                                        this.state.ColumnHide["ReturnToCFARSSCanshow"] == true ?
                                                                            w["ReturnToCFARssValue"].Header == "Value" && this.state.ColumnHide["ReturnToCFARssValue"] == true ?
                                                                                <td >Return To CFA/RSS<div> <input type="text" readOnly value={w["rate"]["val"] * w["ReturnToCFARssQty"]["val"]} className="inv-sug-ord-qty" /></div></td>
                                                                                : <td></td> : null

                                                                    }
                                                                </> : null}
                                                            {this.state.ColumnHide["ReturnToCFARssSchQty"] == false ?
                                                                <>
                                                                    {
                                                                        this.state.ColumnHide["ReturnToCFARSSCanshow"] == true ?
                                                                            w["ReturnToCFARssQty"].Header == "Qty" && this.state.ColumnHide["ReturnToCFARssQty"] == true ?
                                                                                <td >Return To CFA/RSS<div> <input type="text" value={w["ReturnToCFARssQty"]["val"] == "" ? 0 : w["ReturnToCFARssQty"]["val"]} readOnly className="inv-sug-ord-qty" /></div></td>
                                                                                : <td></td> : null

                                                                    }

                                                                    {
                                                                        this.state.ColumnHide["ReturnToCFARSSCanshow"] == true ?
                                                                            w["ReturnToCFARssValue"].Header == "Value" && this.state.ColumnHide["ReturnToCFARssValue"] == true ?
                                                                                <td >Return To CFA/RSS<div> <input type="text" readOnly value={w["rate"]["val"] * w["ReturnToCFARssQty"]["val"]} className="inv-sug-ord-qty" /></div></td>
                                                                                : <td></td> : null

                                                                    }
                                                                </> : null}
                                                            {this.state.ColumnHide["ReturnToCFARssQty"] == true && this.state.ColumnHide["ReturnToCFARssSchQty"] == true ? <>
                                                                {
                                                                    this.state.ColumnHide["ReturnToCFARSSCanshow"] == true ?
                                                                        w["ReturnToCFARssQty"].Header == "Qty" && this.state.ColumnHide["ReturnToCFARssQty"] == true ?
                                                                            <td >Return To CFA/RSS<div> <input type="text" value={w["ReturnToCFARssQty"]["val"] == "" ? 0 : w["ReturnToCFARssQty"]["val"]} readOnly className="inv-sug-ord-qty" /></div></td>
                                                                            : <td></td> : null

                                                                }
                                                                {
                                                                    this.state.ColumnHide["ReturnToCFARSSCanshow"] == true ?
                                                                        w["ReturnToCFARssSchQty"].Header == "Sch Qty" && this.state.ColumnHide["ReturnToCFARssSchQty"] == true ?
                                                                            <td >Return To CFA/RSS <div> <input type="text" value={w["ReturnToCFARssSchQty"]["val"] == "" ? 0 : parseInt(w["ReturnToCFARssSchQty"]["val"])} readOnly className="inv-sug-ord-qty" /></div></td>
                                                                            : <td></td> : null

                                                                }
                                                                {
                                                                    this.state.ColumnHide["ReturnToCFARSSCanshow"] == true ?
                                                                        w["ReturnToCFARssValue"].Header == "Value" && this.state.ColumnHide["ReturnToCFARssValue"] == true ?
                                                                            <td >Return To CFA/RSS<div> <input type="text" readOnly value={w["rate"]["val"] * w["ReturnToCFARssQty"]["val"]} className="inv-sug-ord-qty" /></div></td>
                                                                            : <td></td> : null

                                                                }
                                                            </>
                                                                : null} */}
                                                            {/* closing */}
                                                            {this.state.ColumnHide["n_closing_qty"] == false ?
                                                                <>

                                                                    {
                                                                        this.state.ColumnHide["ClosingCanShow"] == true ?
                                                                            w["closingschqty"].Header == "Sch Qty" && this.state.ColumnHide["closingschqty"] == true ?
                                                                                <td >Closing<div> <input type="text" onChange={(event) => { this.updateprice(event, w["itemcode"], "closingschqty", w["rate"]["val"]) }}
                                                                                    value={this.state.readonly["closingschqty"] && this.props.selecSecSalesTypr == "2" ? w["closingschqty"]["val"] = parseInt(w["openingschqty"]["val"]) + parseInt(w["n_receipt_scheme"]["val"]) + parseInt(w["n_other_scheme"]["val"]) - parseInt(w["n_scheme_qty"]["val"]) : w["closingschqty"]["val"]}
                                                                                    readOnly={this.state.readonly["closingschqty"]} className="inv-sug-ord-qty" /></div></td>
                                                                                : <td></td> : null

                                                                    }
                                                                    {
                                                                        this.state.ColumnHide["ClosingCanShow"] == true ?
                                                                            w["n_closing_value"].Header == "Value" && this.state.ColumnHide["n_closing_value"] == true ?
                                                                                <td >Closing<div> <input type="text" readOnly value={parseFloat(w["rate"]["val"] * w["n_closing_qty"]["val"]).toFixed(2)} className="inv-sug-ord-qty" /></div></td>
                                                                                : <td></td> : null

                                                                    }
                                                                </> : null}
                                                            {this.state.ColumnHide["closingschqty"] == false ?
                                                                <>
                                                                    {
                                                                        this.state.ColumnHide["ClosingCanShow"] == true ?
                                                                            w["n_closing_qty"].Header == "Qty" && this.state.ColumnHide["n_closing_qty"] == true ?
                                                                                <td >Closing<div> <input type="text" onChange={(event) => { this.updateprice(event, w["itemcode"], "n_closing_qty", w["rate"]["val"]) }}
                                                                                    value={this.state.readonly["n_closing_qty"] && this.props.selecSecSalesTypr == "2" ? w["n_closing_qty"]["val"] = parseInt(w["openingqty"]["val"]) + parseInt(w["n_receipt_qty"]["val"]) + parseInt(w["n_other_qty"]["val"]) - w["n_sales_qty"]["val"] : w["n_closing_qty"]["val"]}
                                                                                    readOnly={this.state.readonly["n_closing_qty"]} className="inv-sug-ord-qty" /></div></td>
                                                                                : <td></td> : null

                                                                    }

                                                                    {
                                                                        this.state.ColumnHide["ClosingCanShow"] == true ?
                                                                            w["n_closing_value"].Header == "Value" && this.state.ColumnHide["n_closing_value"] == true ?
                                                                                <td >Closing<div> <input type="text" readOnly value={parseFloat(w["rate"]["val"] * w["n_closing_qty"]["val"]).toFixed(2)} className="inv-sug-ord-qty" /></div></td>
                                                                                : <td></td> : null

                                                                    }
                                                                </>
                                                                : null}
                                                            {this.state.ColumnHide["n_closing_qty"] == true && this.state.ColumnHide["closingschqty"] == true ?
                                                                <>
                                                                    {
                                                                        this.state.ColumnHide["ClosingCanShow"] == true ?
                                                                            w["n_closing_qty"].Header == "Qty" && this.state.ColumnHide["n_closing_qty"] == true ?
                                                                                <td >Closing<div> <input type="text" onChange={(event) => { this.updateprice(event, w["itemcode"], "n_closing_qty", w["rate"]["val"]) }}
                                                                                    value={this.state.readonly["n_closing_qty"] && this.props.selecSecSalesTypr == "2" ? w["n_closing_qty"]["val"] = parseInt(w["openingqty"]["val"]) + parseInt(w["n_receipt_qty"]["val"]) + parseInt(w["n_other_qty"]["val"]) - w["n_sales_qty"]["val"] : w["n_closing_qty"]["val"]}
                                                                                    readOnly={this.state.readonly["n_closing_qty"]} className="inv-sug-ord-qty" /></div></td>
                                                                                : <td></td> : null

                                                                    }
                                                                    {
                                                                        this.state.ColumnHide["ClosingCanShow"] == true ?
                                                                            w["closingschqty"].Header == "Sch Qty" && this.state.ColumnHide["closingschqty"] == true ?
                                                                                <td >Closing<div> <input type="text" onChange={(event) => { this.updateprice(event, w["itemcode"], "closingschqty", w["rate"]["val"]) }}
                                                                                    value={this.state.readonly["closingschqty"] && this.props.selecSecSalesTypr == "2" ? w["closingschqty"]["val"] = parseInt(w["openingschqty"]["val"]) + parseInt(w["n_receipt_scheme"]["val"]) + parseInt(w["n_other_scheme"]["val"]) - parseInt(w["n_scheme_qty"]["val"]) : w["closingschqty"]["val"]}
                                                                                    readOnly={this.state.readonly["closingschqty"]} className="inv-sug-ord-qty" /></div></td>
                                                                                : <td></td> : null

                                                                    }
                                                                    {
                                                                        this.state.ColumnHide["ClosingCanShow"] == true ?
                                                                            w["n_closing_value"].Header == "Value" && this.state.ColumnHide["n_closing_value"] == true ?
                                                                                <td >Closing<div> <input type="text" readOnly value={parseFloat(w["rate"]["val"] * w["n_closing_qty"]["val"]).toFixed(2)} className="inv-sug-ord-qty" /></div></td>
                                                                                : <td></td> : null

                                                                    }
                                                                </>
                                                                : null}
                                                            {/* transit */}
                                                            {
                                                                this.state.ColumnHide["TrnQty"] == true ?
                                                                    w["n_transit_qty"].Header == "Value" && this.state.ColumnHide["TrnQty"] == true ?
                                                                        <td >Trn Qty<div> <input type="text" value={w["n_transit_qty"]["val"] == "" ? 0 : w["n_transit_qty"]["val"]} readOnly className="inv-sug-ord-qty" /></div></td>
                                                                        : null : null

                                                            }
                                                        </tr>
                                                    )
                                                })
                                            }

                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <th>Total</th>
                                                <th></th>
                                                <th></th>

                                                {/* opening total */}



                                                {this.state.ColumnHide["openingCanShow"] == true && this.state.ColumnHide["openingqty"] == true && this.state.ColumnHide["openingschqty"] == true ?
                                                    <>
                                                        <th></th>
                                                        <th></th>
                                                        <th>{this.state.openTotal}</th>
                                                    </>
                                                    : null}
                                                {this.state.ColumnHide["openingCanShow"] == true && (this.state.ColumnHide["openingqty"] == false || this.state.ColumnHide["openingschqty"] == false) ?

                                                    <>
                                                        <th></th>
                                                        <th>{this.state.openTotal}</th>
                                                    </>
                                                    : null}

                                                {/* Receipt Total */}
                                                {this.state.ColumnHide["ReceiptCanShow"] == true && this.state.ColumnHide["n_receipt_qty"] == true && this.state.ColumnHide["n_receipt_scheme"] == true ?
                                                    <>
                                                        <th></th>
                                                        <th></th>
                                                        <th>{this.state.receiptTotal}</th>
                                                    </> : null}
                                                {this.state.ColumnHide["ReceiptCanShow"] == true && (this.state.ColumnHide["n_receipt_qty"] == false || this.state.ColumnHide["n_receipt_scheme"] == false) ?
                                                    <>
                                                        <th></th>
                                                        <th>{this.state.receiptTotal}</th>
                                                    </> : null}
                                                {/* Sales Total */}
                                                {this.state.ColumnHide["SalesCanshow"] == true && this.state.ColumnHide["n_sales_qty"] == true && this.state.ColumnHide["n_scheme_qty"] == true ?
                                                    <>
                                                        <th></th>
                                                        <th></th>
                                                        <th>{this.state.salesTotal}</th>
                                                    </> : null}
                                                {this.state.ColumnHide["SalesCanshow"] == true && (this.state.ColumnHide["n_sales_qty"] == false || this.state.ColumnHide["n_scheme_qty"] == false) ?
                                                    <>

                                                        <th></th>
                                                        <th>{this.state.salesTotal}</th>
                                                    </> : null}
                                                {/* Return Total */}
                                                {this.state.ColumnHide["ReturnsCanShow"] == true && this.state.ColumnHide["n_other_qty"] == true && this.state.ColumnHide["n_other_scheme"] == true ?
                                                    <>
                                                        <th></th>
                                                        <th></th>
                                                        <th>{this.state.returnsTotal}</th>
                                                    </> : null}
                                                {this.state.ColumnHide["ReturnsCanShow"] == true && (this.state.ColumnHide["n_other_qty"] == false || this.state.ColumnHide["n_other_scheme"] == false) ?
                                                    <>
                                                        <th></th>
                                                        <th></th>
                                                        <th>{this.state.returnsTotal}</th>
                                                    </> : null}
                                                {/* Returns To CFA/RSS Total */}
                                                {/* {this.state.ColumnHide["ReturnToCFARSSCanshow"] == true && this.state.ColumnHide["ReturnToCFARssQty"] == true && this.state.ColumnHide["ReturnToCFARssSchQty"] == true ?
                                                    <>
                                                        <th></th>
                                                        <th></th>
                                                        <th>{this.state.returnstocfarssTotal}</th>
                                                    </> : null}
                                                {this.state.ColumnHide["ReturnToCFARSSCanshow"] == true && (this.state.ColumnHide["ReturnToCFARssQty"] == false || this.state.ColumnHide["ReturnToCFARssSchQty"] == false) ?
                                                    <>

                                                        <th></th>
                                                        <th>{this.state.returnstocfarssTotal}</th>
                                                    </> : null} */}
                                                {/* Close Total  */}
                                                {this.state.ColumnHide["ClosingCanShow"] == true && this.state.ColumnHide["n_closing_qty"] == true && this.state.ColumnHide["closingschqty"] == true ?
                                                    <>
                                                        <th></th>
                                                        <th></th>
                                                        <th>{this.state.closingTotal}</th>
                                                    </> : null}
                                                {this.state.ColumnHide["ClosingCanShow"] == true && (this.state.ColumnHide["n_closing_qty"] == false || this.state.ColumnHide["closingschqty"] == false) ?
                                                    <>

                                                        <th></th>
                                                        <th>{this.state.closingTotal}</th>
                                                    </> : null}
                                                <th></th>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                                <div className="remark-button">

                                    <Col xl={6} md={6} lg={6} sm={6}>
                                        <Form.Label className="customized-label">Note</Form.Label>
                                        <Form.Control as="textarea" disabled={this.props.nonoptStockist == "2" ? true : false} rows="4" cols="50" placeholder='write here' maxLength="200" onChange={this.Remark} value={this.state.remarks} />
                                    </Col>
                                </div>
                                <div className="remarkdiv">
                                    {this.state.itemRateRefreshButton == "1" ?
                                        <button onClick={this.refreshItemRate} className="sfcAddBtn-loaditem">Refresh Item Rate</button> : null}

                                    <button onClick={this.approve} className="sfcAddBtn-loaditem" >Approve</button>
                                    {this.state.fileDownloadLink == "1" ?
                                        <button onClick={this.filedownload} className="sfcAddBtn-loaditem" >File Download</button> : null}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <StatusPopup
                    message={this.state.message}
                    show={this.state.showStatusModal}
                    onClose={this.hideStatusModal}
                    success={this.state.success}
                />

                { this.state.showdownloadModal ?
                    <DownloadDocumentPopup showdownloadModal={this.state.showdownloadModal} documentList={this.state.documentList} onHide={this.downloadfilepopupclose} /> : null
                }
            </React.Fragment>
        )
    }
}
export default withRouter(SSalesApprovalLoadTable);






