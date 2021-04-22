import React from 'react'
import { Component } from 'react';
import { Button, Col, Row, Form, Table, Dropdown } from 'react-bootstrap'
import { postToServer } from '../../../lib/comm-utils'
import Drop from './../../../BasicComponet/DropDown'
import Geocode from "react-geocode";
import Text from './../../../BasicComponet/Text'
import { withRouter } from 'react-router-dom'
import TEXT from './../../../BasicComponet/Text'
import '../../../../public/assets/css/sfcstyle.css'
import '../../../../public/assets/css/transactionmodule.css'
import StatusPopup from '../../../lib/StatusPopup'
import DashLoader from "../../../lib/DashboardLoader";
import UploadFileSecondarySale from '../popup/UploadFileSecondarySale'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { parse } from 'date-fns';



class SmasterTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFull: false,
            Listdata: [],
            columnStatus: '',
            valuedata: {},
            remarks: '',
            Clearvar: false,
            message: '',
            SrNo: '0',
            nonoptstockistremark: " Non operating stockist",
            b: [],
            message: '',
            readonly: {},
            dic_openvalue: {},
            totalamount: 0,
            success: false,
            total: { open: 0, close: 0, sales: 0, tran: 0, Return: 0, receipt: 0, other: 0 },
            showStatusModal: false,
            showUploadFileModal: false,
            openTotal: 0,
            receiptTotal: 0,
            salesTotal: 0,
            returnstocfarssTotal: 0,
            closingTotal: 0,
            returnsTotal: 0,
            disabled: false,
            ItemRefreshData: [],
            itemRateRefreshButton: "",
            month: ['Select Month', "January", "February", "March", "April", "May",
                "June", "July", "August", "September", "October", "November", "December"],
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







                // "openingschqty":true
            },
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
            hidecol: { "OpeningCanshow": "0", "OpenQty": "0", "OpenSchQty": "0", "OpenValue": "0", "ReceiptCanShow": "0", "ReceiptQty": "0", "ReceiptSchQty": "0", "ReceiptValue": "0", "SalesCanshow": "0", "SchSalesQty": "0", "SalesValue": "0", "ReturnsCanShow": "0", "ReturnQty": "0", "ReturnSchQty": "0", "ReturnSchValue": "0", "ReturnToCFARSSCanshow": "0", "ReturnToCFARssQty": "0", "ReturnToCFARssSchQty": "0", "ReturnToCFARssValue": "0", "ClosingCanShow": "0", "CloseQty": "0", "CloseSchQty": "0", "CloseValue": "0", "TrnQty": "0" }
        }
        this.handleView = this.handleView.bind(this)
        this.updateprice = this.updateprice.bind(this)
        this.Remark = this.Remark.bind(this)
        this.clear = this.clear.bind(this)
        this.secondSalesSaveDet = this.secondSalesSaveDet.bind(this)
        this.hideStatusModal = this.hideStatusModal.bind(this)
        this.showUploadModal = this.showUploadModal.bind(this)
        this.itemRateRefreshButton = this.itemRateRefreshButton.bind(this)
        this.refreshItemRate = this.refreshItemRate.bind(this)
        this.handleExcel = this.handleExcel.bind(this)
        this.totalCalculation = this.totalCalculation.bind(this)


    }

    handleExcel() {
        let k = []
        let items = []
        if (this.state.Listdata.length > 0) {
            var array = [];
            var table = document.querySelector("table tbody");
            //ha ha 

            var rows = table.children;
            for (var i = 0; i < rows.length; i++) {
                var fields = rows[i].children;
                var rowArray = [];
                for (var j = 0; j < fields.length; j++) {

                    if (fields[j].innerHTML.includes("<div>")) {
                        rowArray.push("0");
                    } else {
                        rowArray.push(fields[j].innerHTML);
                    }

                }
                array.push(rowArray);
            }

            //      items = this.state.Listdata.reduce((prev, item, index) => {
            //   //const id = item.C_Code + "$" + item.C_Name;
            //   //const selection = selectedData[id] ? selectedData[id] : false
            //   prev.push(
            //       <table>
            //        <span>{item["itemcode"]}</span>

            //       </table>


            //   )
            //   return prev
            // }, [])

            //             //k.push(items)
            //        // })




            const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
            const fileExtension = '.xlsx';
            const ws = XLSX.utils.json_to_sheet(array);
            const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
            const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
            const data = new Blob([excelBuffer], { type: fileType });
            FileSaver.saveAs(data, "Secondary Sales" + fileExtension);
        } else {
            alert("No Data ....")
        }

    }
    refreshItemRate() {
        var rir = confirm("When you Refresh,New Item Rate will be considered.Do You want to Proceed..?");
        if (rir == true) {
            if (this.props.salesValueEdit == "1" && this.props.selecSecSalesTypr == "2") {
                var sr = confirm("If you click OK,The Sales values what you have manually entered, will change to New Value according to the Item Rate.Do you want to Change Sales Values..?")
                if (sr == true) {
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
                            // this.setState({ItemRefreshData:Result.data.data})
                        }
                    }).catch(e => {
                    })
                } else {

                }
            } else {
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

        } else {

        }
    }


    hideStatusModal() {
        this.setState({ showStatusModal: false })
        this.showUploadModal()
        this.props.loadItemTable()

    }
    showUploadModal() {
        this.setState({ showUploadFileModal: true })
    }

    clear(e) {
        this.setState({ Clearvar: e.target.checked })
        let Listdata = this.state.Listdata
        let readonly = {}
        let str1 = ""
        let sa = e.target.checked
        Listdata.map(a => {
            str1 = str1 + a.itemcode + "|" + a.rate.val.toString() + "|"
            //opening
            if (this.state.ColumnHide["openingCanShow"] == true) {
                if (this.state.ColumnHide["openingqty"] == true) {
                    a["openingqty"].val = a["openingqty"].val
                    readonly["openingqty"] = true
                }
                if (this.state.ColumnHide["openingschqty"] == true) {
                    a["openingschqty"].val = a["openingschqty"].val
                    readonly["openingschqty"] = true
                }
                if (this.state.ColumnHide["OpenValue"] == true) {
                    a["OpenValue"].val = a["OpenValue"].val
                    readonly["OpenValue"] = true

                }
            }
            //receipt
            if (this.state.ColumnHide["ReceiptCanShow"] == true) {
                if (this.state.ColumnHide["n_receipt_qty"] == true) {
                    a["n_receipt_qty"].val = 0
                    readonly["n_receipt_qty"] = sa == true ? true : false
                }
                if (this.state.ColumnHide["n_receipt_scheme"] == true) {
                    a["n_receipt_scheme"].val = 0
                    readonly["n_receipt_scheme"] = sa == true ? true : false
                }
                if (this.state.ColumnHide["n_receipt_value"] == true) {
                    a["n_receipt_value"].val = 0
                    readonly["n_receipt_value"] = sa == true ? true : false
                }
            }
            //sales
            if (this.state.ColumnHide["SalesCanshow"] == true) {
                if (this.state.ColumnHide["n_sales_qty"] == true) {
                    a["n_sales_qty"].val = 0
                    readonly["n_sales_qty"] = sa == true ? true : false
                }
                if (this.state.ColumnHide["n_scheme_qty"] == true) {
                    a["n_scheme_qty"].val = 0
                    readonly["n_scheme_qty"] = sa == true ? true : false
                }
                if (this.state.ColumnHide["n_sales_value"] == true) {
                    a["n_sales_value"].val = 0
                    readonly["n_sales_value"] = sa == true ? true : false
                }
            }

            //returns
            if (this.state.ColumnHide["ReturnsCanShow"] == true) {
                if (this.state.ColumnHide["n_other_qty"] == true) {
                    a["n_other_qty"].val = 0
                    readonly["n_other_qty"] = sa == true ? true : false
                }
                if (this.state.ColumnHide["n_other_scheme"] == true) {
                    a["n_other_scheme"].val = 0
                    readonly["n_other_scheme"] = sa == true ? true : false
                }
                if (this.state.ColumnHide["n_other_value"] == true) {
                    a["n_other_value"].val = 0
                    readonly["n_other_value"] = sa == true ? true : false
                }
            }
            //return to cfa/rss
            if (this.state.ColumnHide["ReturnToCFARSSCanshow"] == true) {
                if (this.state.ColumnHide["ReturnToCFARssQty"] == true) {
                    a["ReturnToCFARssQty"].val = 0
                    // readonly["ReturnToCFARssQty"] = sa == true ? true : false
                }
                if (this.state.ColumnHide["ReturnToCFARssSchQty"] == true) {
                    a["ReturnToCFARssSchQty"].val = 0
                    // readonly["ReturnToCFARssSchQty"] = sa == true ? true : false
                }
                if (this.state.ColumnHide["ReturnToCFARssValue"] == true) {
                    a["ReturnToCFARssValue"].val = 0
                    // readonly["ReturnToCFARssValue"] = sa == true ? true : false
                }
            }
            //closing
            if (this.state.ColumnHide["ClosingCanShow"] == true) {
                if (this.state.ColumnHide["n_closing_qty"] == true) {
                    a["n_closing_qty"].val = 0
                    readonly["n_closing_qty"] = sa == true ? true : false
                }
                if (this.state.ColumnHide["closingschqty"] == true) {
                    a["closingschqty"].val = 0
                    readonly["closingschqty"] = sa == true ? true : false
                }
                if (this.state.ColumnHide["n_closing_value"] == true) {
                    a["n_closing_value"].val = 0
                    readonly["n_closing_value"] = sa == true ? true : false
                }
            }
            //trnsit
            if (this.state.ColumnHide["TrnQty"] == true) {
                if (this.state.ColumnHide["TrnQty"] == true) {
                    a["n_transit_qty"].val = 0
                    readonly["TrnQty"] = sa == true ? true : false
                }

            }
            str1 = str1 + '^'
        })
        // if (sa == true) {
        //     this.setState({ disabled: true })
        // } else {
        //     this.setState({ disabled: false })
        // }
        // Object.keys(this.state.valuedata).map((a) => {
        //     //itemcode|price|openqty|openValue|ReceiptQtyy|ReceiptSchQty|ReceiptValue|SalesQty|SalesSchQty|SalesValue|ReturnsQty|ReturnsschQty|ReturnsValue|ClosingQty|ClosingValue|Trn.Qty
        //     let str = str + a + '|' + this.state.valuedata[a]["rate"]
        //     let open = ''
        //     //  Opening
        //     //Receip
        //     //Sales
        //     //Returns
        //     //Closing
        //     //TrnQty
        //     //start open 

        //     if (this.state.ColumnHide["openingCanShow"] == true) {
        //         if (this.state.ColumnHide["openingqty"] == true) {
        //             this.state.valuedata[a]["openingqty"] = 0
        //         }
        //         if (this.state.ColumnHide["openingschqty"] == true) {
        //             this.state.valuedata[a]["openingschqty"] = 0
        //         }
        //         if (this.state.ColumnHide["openingvisibleue"] == true) {
        //             this.state.valuedata[a]["openingvisibleue"] = 0
        //         }
        //     }
        //     // end Opening
        //     //Receip
        //     if (this.state.ColumnHide["ReceiptCanShow"] == true) {
        //         if (this.state.ColumnHide["n_receipt_qty"] == true) {
        //             this.state.valuedata[a]["n_receipt_qty"] = 0
        //         }
        //         if (this.state.ColumnHide["n_receipt_scheme"] == true) {
        //             this.state.valuedata[a]["n_receipt_scheme"] = 0
        //         }
        //         if (this.state.ColumnHide["n_receipt_value"] == true) {
        //             this.state.valuedata[a]["n_receipt_value"] = 0
        //         }
        //     }
        //     //end Receip
        //     //Sales
        //     if (this.state.ColumnHide["n_sales_qty"] == true) {
        //         this.state.valuedata[a]["n_sales_qty"] = 0
        //     }
        //     if (this.state.ColumnHide["n_scheme_qty"] == true) {
        //         this.state.valuedata[a]["n_scheme_qty"] = 0
        //     }
        //     if (this.state.ColumnHide["n_sales_visibleue"] == true) {
        //         this.state.valuedata[a]["n_sales_visibleue"] = 0
        //     }
        //     //end Sales
        //     //Returns
        //     if (this.state.ColumnHide["ReturnsCanShow"] == true) {
        //         if (this.state.ColumnHide["n_other_qty"] == true) {
        //             this.state.valuedata[a]["n_other_qty"] = 0
        //         }
        //         if (this.state.ColumnHide["n_other_scheme"] == true) {
        //             this.state.valuedata[a]["n_other_scheme"] = 0
        //         }
        //         if (this.state.ColumnHide["n_other_visibleue"] == true) {
        //             this.state.valuedata[a]["n_other_visibleue"] = 0
        //         }
        //     }
        //     //end Returns
        //     //Closing
        //     if (this.state.ColumnHide["n_closing_qty"] == true) {
        //         this.state.valuedata[a]["n_closing_qty"] = 0
        //     }
        //     if (this.state.ColumnHide["closingschqty"] == true) {
        //         this.state.valuedata[a]["closingschqty"] = 0
        //     }
        //     if (this.state.ColumnHide["n_closing_value"] == true) {
        //         this.state.valuedata[a]["n_closing_value"] = 0
        //     }
        //     // end Closing
        //     if (this.state.ColumnHide["TrnQty"] == true) {
        //         this.state.valuedata[a]["n_transit_qty"] = 0
        //     }
        // })
        this.setState({
            valuedata: this.state.valuedata,
            b: [],
            dic_openvalue: {},
            openTotal: 0,
            salesTotal: 0,
            receiptTotal: 0,
            returnsTotal: 0,
            returnstocfarssTotal: 0,
            closingTotal: 0,
            Listdata: Listdata,
            readonly: readonly
        })
    }
    totalCalculation(data) {
        let openTotal = 0, salesTotal = 0, receiptTotal = 0, returnsTotal = 0, closingTotal = 0, salesValue = 0;
        data.map((res) => {
            // res["n_sales_value"]["val"] = res["n_sales_qty"]["val"] * res["rate"]["val"]
            closingTotal = closingTotal + (res.n_closing_qty.val * res["rate"]["val"])
            openTotal = openTotal + (res["openingqty"]["val"] * res["rate"]["val"])
            receiptTotal = receiptTotal + (res["n_receipt_qty"]["val"] * res["rate"]["val"])
            salesTotal = salesTotal + (res["n_sales_qty"]["val"] * res["rate"]["val"])
            returnsTotal = returnsTotal + (res["n_other_qty"]["val"] * res["rate"]["val"])
        })
        this.setState({
            openTotal: openTotal.toFixed(2),
            receiptTotal: receiptTotal.toFixed(2),
            salesTotal: salesTotal.toFixed(2),
            returnsTotal: returnsTotal.toFixed(2),
            closingTotal: closingTotal.toFixed(2)

        })



    }
    Remark(event) {
        const d = event.target.value
        this.setState({
            remarks: d
        })
    }
    secondSalesSaveDet() {
        let str1 = ""
        let salesQtyEmpty = "", closingQtyEmpty = ""
        if (this.props.selecSecSalesTypr == "1") {


            this.state.Listdata.map(res => {
                if (res.n_closing_qty.val == "") {
                    closingQtyEmpty = "closingAlert"
                } else {
                    closingQtyEmpty = ""
                }
            })
        } else if (this.props.selecSecSalesTypr == "2") {
            this.state.Listdata.map(res => {
                if (res.n_sales_qty.val == "") {
                    salesQtyEmpty = "alert"

                } else {
                    salesQtyEmpty = ""
                }
            })
        }

        if (salesQtyEmpty == "alert") {
            alert("Please enter Sales Qty")
        }
        else if (closingQtyEmpty == "closingAlert") {
            alert("Please enter Closing Qty")
        }

        else {
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
            // let str = ''
            // Object.keys(this.state.valuedata).map((a) => {
            //     //itemcode|price|openqty|openValue|ReceiptQtyy|ReceiptSchQty|ReceiptValue|SalesQty|SalesSchQty|SalesValue|ReturnsQty|ReturnsschQty|ReturnsValue|ClosingQty|ClosingValue|Trn.Qty
            //     str = str + a + '|' + this.state.valuedata[a]["rate"].toString() + '|'
            //     let open = ''
            //     //  Opening
            //     //Receip
            //     //Sales
            //     //Returns
            //     //Closing
            //     //TrnQty
            //     //start open 
            //     if (this.state.ColumnHide["openingCanShow"] == true) {
            //         if (this.state.ColumnHide["openingqty"] == true) {
            //             str = str + this.state.valuedata[a]["openingqty"].toString() + '|'
            //         }
            //         if (this.state.ColumnHide["openingschqty"] == true) {
            //             str = str + this.state.valuedata[a]["openingschqty"].toString() + '|'
            //         }
            //         if (this.state.ColumnHide["OpenValue"] == true) {
            //             str = str + this.state.valuedata[a]["OpenValue"].toString() + '|'
            //         }
            //     }
            //     // end Opening
            //     //Receip
            //     if (this.state.ColumnHide["ReceiptCanShow"] == true) {
            //         if (this.state.ColumnHide["n_receipt_qty"] == true) {
            //             str = str + this.state.valuedata[a]["n_receipt_qty"].toString() + '|'
            //         }
            //         if (this.state.ColumnHide["n_receipt_scheme"] == true) {
            //             str = str + this.state.valuedata[a]["n_receipt_scheme"].toString() + '|'
            //         }
            //         if (this.state.ColumnHide["n_receipt_value"] == true) {
            //             str = str + this.state.valuedata[a]["n_receipt_value"].toString() + '|'
            //         }
            //     }
            //     //end Receip
            //     //Sales
            //     if (this.state.ColumnHide["n_sales_qty"] == true) {
            //         str = str + this.state.valuedata[a]["n_sales_qty"].toString() + '|'
            //     }
            //     if (this.state.ColumnHide["n_scheme_qty"] == true) {
            //         str = str + this.state.valuedata[a]["n_scheme_qty"].toString() + '|'
            //     }
            //     if (this.state.ColumnHide["n_sales_value"] == true) {
            //         str = str + this.state.valuedata[a]["n_sales_value"].toString() + '|'
            //     }
            //     //end Sales
            //     //Returns
            //     if (this.state.ColumnHide["ReturnsCanShow"] == true) {
            //         if (this.state.ColumnHide["ReturnToCFARssQty"] == true) {
            //             str = str + this.state.valuedata[a]["ReturnToCFARssQty"].toString() + '|'
            //         }
            //         if (this.state.ColumnHide["ReturnToCFARssSchQty"] == true) {
            //             str = str + this.state.valuedata[a]["ReturnToCFARssSchQty"].toString() + '|'
            //         }
            //         if (this.state.ColumnHide["ReturnToCFARssValue"] == true) {
            //             str = str + this.state.valuedata[a]["ReturnToCFARssValue"].toString() + '|'
            //         }
            //     }
            //     //end Returns
            //     //Closing
            //     if (this.state.ColumnHide["n_closing_qty"] == true) {
            //         str = str + this.state.valuedata[a]["n_closing_qty"].toString() + '|'
            //     }
            //     if (this.state.ColumnHide["closingschqty"] == true) {
            //         str = str + this.state.valuedata[a]["closingschqty"].toString() + '|'
            //     }
            //     if (this.state.ColumnHide["n_closing_value"] == true) {
            //         str = str + this.state.valuedata[a]["n_closing_value"].toString() + '|'
            //     }
            //     // end Closing
            //     if (this.state.ColumnHide["TrnQty"] == true) {
            //         str = str + this.state.valuedata[a]["n_transit_qty"].toString()
            //     }
            //     str = str + '^'
            // })

            str1 = str1.slice(0, -1)
            var data = {
                "index": "secondSalesSaveDet", "Data": {
                    "selectedFs": this.props.selecteddata["selectedFs"],
                    "Nmonth": this.props.selecteddata["month"],
                    "nyear": this.props.selecteddata["year"] ,
                     "stockist": this.props.selecteddata["stockist"],
                    "SaleType": this.props.selecteddata["SalesType"],
                    "SaleNote": this.state.Clearvar == true ? this.state.nonoptstockistremark : this.state.remarks,
                    "FSCode": this.props.selecteddata["selectedFs"],
                    "itemparam": str1,
                    "nonoperatingStk": this.state.Clearvar == true ? "1" : "0"
                }
            }
           // this.setState({ showStatusModal: true, success: true, message: "saveddddd" })

            postToServer("Sales", data).then((Result) => {
                if (Result.data.Status == "Success") {
                    this.setState({ showStatusModal: true, success: true, message: Result.data.data[0].message })
                    this.props.getSrNoForUpload(this.props.selecteddata["month"],this.props.selecteddata["year"],this.props.selecteddata["stockist"])
                }
            })
                .catch(err => {
                    this.setState({ errorMsg: "Exception in application" })
                })
        }

        // const _this = this


        // if (Result.data.Status == 'Success') {
        //     const message = Result.data.data[0]["message"]
        //     const result = Result.data.data[0]["result"]


        //     if (result == "0") {
        //         alert(result)
        //         _this.setState({ showStatusModal: true, message: message, success: true })
        //     } else {
        //         alert(result)
        //         _this.setState({ showStatusModal: true, message: message, success: true })
        //     }
        // } else {
        //     this.setState({ showStatusModal: true, message: 'Not Saved', success: true })
        // }

        //TableFlagSecondSalesList
    }
    updateprice(event, name, type, rate) {
        //var promise=null
        let Listdata = this.state.Listdata
        var val = event.target.value
        if (val == "+" || val == '-') {
            val = val + 1
        }
        if (val.length == 0) {
            val = 0
        }
        // var name = event.target.name

        let z = "0"


        var digitValidation1 = /^[0-9\b]*$/;
        //  var digitValidation =/^\d?+(\.\d+)?$/
        var digitValidation = /(\d+(?:\.\d+)?)/

        //  var n = val.includes(".");

        // if(n==false){
        //     val=val+'.00'
        // }

        //alert(n)
        // //var digitValidation = /^[0-9]+\.[0-9]+$/ || /^[0-9\b]*$/ ;
        // if (!digitValidation.test(val)) {
        //     alert("please enter only numveric")
        //     val = 0
        // } 
        // var fi = /^[0-9\b]*$/;
        if ((type == "n_receipt_qty" || type == "n_receipt_scheme" ||
            type == "n_scheme_qty" || type == "n_sales_qty" ||
            type == "n_other_qty" || type == "n_other_scheme" ||
            type == "ReturnToCFARssQty" || type == "ReturnToCFARssSchQty" || type == "n_transit_qty"
        ) &&
            !digitValidation.test(val)) {
            alert("Please Enter only digits 0-9")
            val = 0
        }
        else if (this.props.FlagForLoadItems.AllowNegativeValuesforClosing == "0" && type == "n_closing_qty" && !digitValidation1.test(val)) {
            alert("Please Enter a Numeric value and Proceed..")
            val = 0
        }
        else if (this.props.FlagForLoadItems.AllowNegativeValuesforClosing == "0" && type == "closingschqty" && !digitValidation1.test(val)) {
            alert("Please Enter a Numeric value and Proceed..")
            val = 0
        }

        // this.setState({ val: val })



        else {
            if (this.props.FlagForLoadItems.AllowNegativeValuesforClosing == "1" && type == "n_closing_qty") {
                val = val
            }
            if (this.props.FlagForLoadItems.AllowNegativeValuesforClosing == "1" && type == "closingschqty") {
                val = val

            }
            let readOnlySalesQty = this.state.readonly["n_sales_qty"]
            let secSalesType = this.props.selecSecSalesTypr
            let readOnlyCloseQty = this.state.readonly["n_closing_qty"]
            let salesValue = this.props.salesValueEdit
            let clrValue = this.state.Clearvar
            let poolflag = this.props.poolFlag

            var promise = new Promise(function (resolve, reject) {
                // call resolve if the method succeeds  
                for (let i = 0; i < Listdata.length; i++) {

                    //  let qtyValidation = /\[0-9]*$/
                    //  let closingqtyValidation = /^[-+]?[0-9]*$/     
                    //  if(qtyValidation.test(val) && type != "n_closing_qty"){
                    //      val = val
                    //  }else if(closingqtyValidation.test(val.toString()) && type == "n_closing_qty"){
                    //     val = val
                    //  }
                    if (Listdata[i].itemcode == name) {
                        let sale = readOnlySalesQty == true && secSalesType == "1" ? Listdata[i]["n_sales_qty"]["val"] = parseInt(Listdata[i]["openingqty"]["val"]) + parseInt(Listdata[i]["n_receipt_qty"]["val"]) + parseInt(Listdata[i]["n_other_qty"]["val"]) - Listdata[i]["n_closing_qty"]["val"] : val
                        let close = readOnlyCloseQty == true && secSalesType == "2" ? Listdata[i]["n_closing_qty"]["val"] = parseInt(Listdata[i]["openingqty"]["val"]) + parseInt(Listdata[i]["n_receipt_qty"]["val"]) + parseInt(Listdata[i]["n_other_qty"]["val"]) - Listdata[i]["n_sales_qty"]["val"] : val

                        if (type == "n_sales_qty" || (readOnlySalesQty == true && secSalesType == "1")) {
                            Listdata[i].n_sales_value.val =( Listdata[i]["rate"]["val"] * val).toFixed(2)

                        }
                        if (type == "n_sales_value") {
                            if (salesValue == "1") {
                                Listdata[i].n_sales_value.val = val
                            } 
                        }
                        if (type == "openingqty") {
                            Listdata[i].openingqty.val = val
                            Listdata[i].n_sales_value.val = (parseFloat(Listdata[i]["rate"]["val"]) *parseFloat(Listdata[i]["n_sales_qty"]["val"])).toFixed(2)
                        } else if (type == "openingschqty") {
                            Listdata[i].openingschqty.val = val
                        } else if (type == "n_receipt_qty") {
                            Listdata[i].n_receipt_qty.val = val
                            Listdata[i]["n_sales_qty"]["val"] =  readOnlySalesQty && secSalesType == "1" && clrValue == false && poolflag!= "0" ?  parseInt(Listdata[i]["openingqty"]["val"]) + parseInt(val) + parseInt(Listdata[i]["n_other_qty"]["val"]) - Listdata[i]["n_closing_qty"]["val"] : Listdata[i]["n_sales_qty"]["val"]
                            Listdata[i].n_sales_value.val = (parseFloat(Listdata[i]["rate"]["val"]) *parseFloat(Listdata[i]["n_sales_qty"]["val"])).toFixed(2)
                        } else if (type == "n_receipt_scheme") {
                            Listdata[i].n_receipt_scheme.val = val
                        } else if (type == "n_sales_qty") {
                            Listdata[i].n_sales_qty.val = sale
                            Listdata[i].n_sales_value.val = (parseFloat(Listdata[i]["rate"]["val"]) * parseFloat(Listdata[i]["n_sales_qty"]["val"])).toFixed(2)
                        } else if (type == "n_scheme_qty") {
                            Listdata[i].n_scheme_qty.val = val
                        } else if (type == "n_other_qty") {
                            Listdata[i].n_other_qty.val = val
                            Listdata[i]["n_sales_qty"]["val"] =  readOnlySalesQty && secSalesType == "1" && clrValue == false && poolflag!= "0" ?  parseInt(Listdata[i]["openingqty"]["val"]) + parseInt(val) + parseInt(Listdata[i]["n_receipt_qty"]["val"]) - Listdata[i]["n_closing_qty"]["val"] : Listdata[i]["n_sales_qty"]["val"]
                            Listdata[i].n_sales_value.val = (parseFloat(Listdata[i]["rate"]["val"]) *parseFloat(Listdata[i]["n_sales_qty"]["val"])).toFixed(2)
                            } else if (type == "n_other_scheme") {
                            Listdata[i].n_other_scheme.val = val
                        } else if (type == "ReturnToCFARssQty") {
                            Listdata[i].ReturnToCFARssQty.val = val
                            Listdata[i]["n_sales_qty"]["val"] =  readOnlySalesQty && secSalesType == "1" && clrValue == false && poolflag!= "0" ?  parseInt(Listdata[i]["openingqty"]["val"]) + parseInt(val) + parseInt(Listdata[i]["n_receipt_qty"]["val"]) - Listdata[i]["n_closing_qty"]["val"] : Listdata[i]["n_sales_qty"]["val"]
                        } else if (type == "ReturnToCFARssSchQty") {
                            Listdata[i].ReturnToCFARssSchQty.val = val
                        } else if (type == "n_closing_qty") {
                            Listdata[i].n_closing_qty.val = close
                            Listdata[i]["n_sales_qty"]["val"] =  readOnlySalesQty && secSalesType == "1" && clrValue == false && poolflag!= "0" ?  parseInt(Listdata[i]["openingqty"]["val"]) + parseInt(Listdata[i]["n_other_qty"]["val"]) + parseInt(Listdata[i]["n_receipt_qty"]["val"]) - Listdata[i]["n_closing_qty"]["val"] : Listdata[i]["n_sales_qty"]["val"]
                            Listdata[i].n_sales_value.val = (parseFloat(Listdata[i]["rate"]["val"]) *parseFloat(Listdata[i]["n_sales_qty"]["val"])).toFixed(2)
                        } else if (type == "closingschqty") {
                            Listdata[i].closingschqty.val = val
                        } else if (type == "n_transit_qty") {
                            Listdata[i].n_transit_qty.val = val
                        } 
                       
                    }
                }
                resolve(true);
            })
            promise.then(bool => {
                if (bool) {
                    this.totalCalculation(Listdata)

                }
            })
        }


        // this.totalCalculation(Listdata)

        // let total = this.state.total
        //for calculating open value and its total
        // dic_openvalue = this.state.dic_openvalue

        // let dic_openvalue = {}
        // dic_openvalue[name + type] = {}
        // if(type =="openingqty"){
        // let totalamount = 
        // let openTotal = 0, receiptTotal2 = 0, salesTotal = 0, returnsTotal = 0, closingTotal = 0, returnstocfarssTotal = 0
        //let receiptTotal1 = parseFloat(this.state.receiptTotal)
        // let a = {
        //     type: type,
        //     totalAmount: totalamount,
        //     name: name
        // }

        // dic_openvalue[name][type] = totalamounts
        // dic_openvalue[name + type]["name"] = name + type
        // dic_openvalue[name + type]["type"] = type,
        //     dic_openvalue[name + type]["total"] = parseFloat(rate) * parseInt(val)
        // // let b = this.state.b

        // this.setState({ dic_openvalue })
        // if (this.state.readonly["n_sales_qty"] && this.props.selecSecSalesTypr == "1" && this.state.Clearvar == false &&
        //     (type == "n_receipt_qty" || type == "n_other_qty" || type == "ReturnToCFARssQty" || type == "n_closing_qty")) {
        //     Object.values(dic_openvalue).map(res => {
        //         salesTotal = salesTotal + res.total

        //     })

        //     // this.setState({ salesTotal: salesTotal.toFixed(2) })
        // }
        // if (this.state.readonly["n_closing_qty"] && this.props.selecSecSalesTypr == "2" && this.state.Clearvar == false &&
        //     (type == "n_receipt_qty" || type == "n_other_qty" || type == "ReturnToCFARssQty" || type == "n_sales_qty")) {
        //     Object.values(dic_openvalue).map(res => {
        //         closingTotal = closingTotal + res.total
        //     })

        //     this.setState({ closingTotal: closingTotal })
        // }
        //  b.push(a)
        // Object.values(dic_openvalue).map(res => {
        //     if (res.type == "openingqty") {
        //         openTotal = openTotal + res.total

        //     }
        //     else if (res.type == "n_receipt_qty") {
        //         receiptTotal2 = receiptTotal2 + res.total
        //         alert(receiptTotal2)
        //     } else if (res.type == "n_other_qty") {
        //         returnsTotal = returnsTotal + res.total
        //     } else if (res.type == "n_sales_qty") {
        //         //   salesTotal =salesTotal + res.total
        //     }
        //     // else if(res.type == "ReturnToCFARssQty"){
        //     //     returnstocfarssTotal =returnstocfarssTotal + res.total
        //     // }
        //     else if (res.type == "n_closing_qty") {
        //         closingTotal = closingTotal + res.total
        //     }
        // })

        // const rt = (parseFloat(openTotal) + parseFloat(receiptTotal2) + parseFloat(returnsTotal) + parseFloat(salesTotal) + parseFloat(closingTotal)).toFixed(2)
        // alert(rt)


        // this.setState({
        //     receiptTotal: rt,
        //     returnsTotal: returnsTotal.toFixed(2),
        //     openTotal: openTotal.toFixed(2),
        //     //   salesTotal: salesTotal.toFixed(2),
        //     returnstocfarssTotal: returnstocfarssTotal.toFixed(2),
        //     closingTotal: closingTotal.toFixed(2)
        // })
        // if(Object.values(dic_openvalue).type == "n_receipt_qty"){

        // }
        // if(Object.values(dic_openvalue[name]["type"]) == "n_receipt_qty"){
        //    // this.setState({ receiptTotal: receiptTotal.toFixed(2) })
        // }
        //  this.setState({ totalamount: a, b: b })
        // if (this.state.readonly["n_sales_qty"] && this.props.selecSecSalesTypr == "2" && this.state.Clearvar == false &&
        //     (type == "n_receipt_qty" || type == "n_other_qty" || type == "ReturnToCFARssQty" || type == "n_closing_qty")) {
        //     b.map(res => {
        //         salesTotal = salesTotal + res.totalAmount
        //     })

        //     this.setState({ salesTotal: salesTotal.toFixed(2) })
        // }
        // if (this.state.readonly["n_closing_qty"] && this.props.selecSecSalesTypr == "1" && this.state.Clearvar == false &&
        //     (type == "n_receipt_qty" || type == "n_other_qty" || type == "ReturnToCFARssQty" || type == "n_sales_qty")) {
        //     b.map(res => {
        //         closingTotal = closingTotal + res.totalAmount
        //     })

        //     this.setState({ closingTotal: closingTotal.toFixed(2) })
        // }
        // if (type == "openingqty") {
        //     b.map(res => {
        //         openTotal = openTotal + res.totalAmount
        //     })
        //     this.setState({ openTotal: openTotal.toFixed(2) })
        // } 
        // else if (type == "n_receipt_qty") {
        //     b.map(res => {
        //         receiptTotal = receiptTotal + res.totalAmount
        //     })
        //     this.setState({ receiptTotal: receiptTotal.toFixed(2) })
        // } 
        // else if (type == "n_sales_qty") {
        //     b.map(res => {
        //         salesTotal = salesTotal + res.totalAmount
        //     })
        //     this.setState({ salesTotal: salesTotal.toFixed(2) })
        // } 
        // else if (type == "n_other_qty") {
        //     b.map(res => {
        //         returnsTotal = returnsTotal + res.totalAmount
        //     })
        //     this.setState({ returnsTotal: returnsTotal.toFixed(2) })
        // }
        //  else if (type == "ReturnToCFARssQty") {
        //     b.map(res => {
        //         returnstocfarssTotal = returnstocfarssTotal + res.totalAmount
        //     })
        //     this.setState({ returnstocfarssTotal: returnstocfarssTotal.toFixed(2) })
        // } else if (type == "n_closing_qty") {
        //     b.map(res => {
        //         closingTotal = closingTotal + res.totalAmount
        //     })
        //     this.setState({ closingTotal: closingTotal.toFixed(2) })
        // }
        // if(type == ""){
        //     b.map(res=>{
        //         openTotal = openTotal +  res.totalAmount
        //     })
        //     this.setState({openTotal:openTotal})
        // }

        // }
        // let ll = this.state.valuedata

        // const lla = /^[+-]?\d+(\.\d+)?$/
        // //  alert(lla.test(event.target.value))

        // //alert(   event.target.value.slice(-1))
        // if (event.target.value.slice(-1) == '.') {
        //     val = val + '0'
        // }
        // if (lla.test(val) == true) {

        //     if(type=='OpenValue'){

        //         let kk= ll[name][type]

        //          if (kk==NaN){
        //              kk=0
        //          }


        //          if(Number.isNaN(kk)){
        //             kk=0
        //          }

        //          let llpp=total["open"]
        //          if(llpp==NaN){
        //             llpp=0 
        //          }


        //          if(Number.isNaN(llpp)){
        //             llpp=0
        //          }
        //         total["open"]= parseInt(llpp)- parseInt(kk) + parseInt( val)

        //      }




        //      if(type=='n_receipt_value'){

        //         let kk= ll[name][type]

        //          if (kk==NaN){
        //              kk=0
        //          }


        //          if(Number.isNaN(kk)){
        //             kk=0
        //          }

        //          let llpp=total["receipt"]
        //          if(llpp==NaN){
        //             llpp=0 
        //          }


        //          if(Number.isNaN(llpp)){
        //             llpp=0
        //          }
        //         total["receipt"]= parseInt(llpp)- parseInt(kk) + parseInt( val)

        //      }






        //      if(type=='n_sales_value'){

        //         let kk= ll[name][type]

        //          if (kk==NaN){
        //              kk=0
        //          }


        //          if(Number.isNaN(kk)){
        //             kk=0
        //          }

        //          let llpp=total["sales"]
        //          if(llpp==NaN){
        //             llpp=0 
        //          }


        //          if(Number.isNaN(llpp)){
        //             llpp=0
        //          }
        //         total["sales"]= parseInt(llpp)- parseInt(kk) + parseInt( val)

        //      }








        //      if(type=='n_closing_value'){

        //         let kk= ll[name][type]

        //          if (kk==NaN){
        //              kk=0
        //          }


        //          if(Number.isNaN(kk)){
        //             kk=0
        //          }

        //          let llpp=total["close"]
        //          if(llpp==NaN){
        //             llpp=0 
        //          }


        //          if(Number.isNaN(llpp)){
        //             llpp=0
        //          }
        //         total["close"]= parseInt(llpp)- parseInt(kk) + parseInt( val)

        //      }


        //      if(type=='n_transit_qty'){

        //         let kk= ll[name][type]

        //          if (kk==NaN){
        //              kk=0
        //          }


        //          if(Number.isNaN(kk)){
        //             kk=0
        //          }

        //          let llpp=total["tran"]
        //          if(llpp==NaN){
        //             llpp=0 
        //          }


        //          if(Number.isNaN(llpp)){
        //             llpp=0
        //          }
        //         total["tran"]= parseInt(llpp)- parseInt(kk) + parseInt( val)

        //      }


        //     ll[name][type] = val
        //     this.setState({
        //         valuedata: ll,total:total
        //     })
        // }
        this.setState({ Listdata: Listdata })
    }
    handleView(){
        this.setState({
            isFull: !this.state.isFull
        });
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
    componentDidMount() {
        let SecSalesTypr = ''
        console.log(this.props,"check")
        this.itemRateRefreshButton(this.props.month.toString(), this.props.year.toString(), this.props.selecSecSalesTypr, this.props.stockist, this.props.fs)
        // var data = { "index": "secondSalesMasterTableColumnStatus", "Data": {} }
        // let selected = ''
        // let datakey = this.state.datakey
        let ColumnHide = {}
        // ColumnHide = this.state.ColumnHide
        // // ColumnHide["open"]=false
        // // ColumnHide["Receipt"]=false
        // // ColumnHide["Returns"]=false
        // postToServer("Sales", data).then((Result) => {
        //     if (Result.data.Status == 'Success') {
        //         Result.data["data"].map((a) => {

        //             if (a.OpeningCanshow == "0") {
        //                 ColumnHide["open"] = false
        //                 datakey["openingqty"]["visible"] = "1"
        //                 datakey["openingschqty"]["visible"] = "1"
        //                 datakey["OpenValue"]["visible"] = "1"
        //             }
        //             if (a.ReceiptCanShow == "0") {
        //                 ColumnHide["Receipt"] = false
        //                 datakey["n_receipt_qty"]["visible"] = "1"
        //                 datakey["n_receipt_scheme"]["visible"] = "1"
        //                 datakey["n_receipt_value"]["visible"] = "1"
        //             }
        //             if (a.ReturnsCanShow == "0") {
        //                 ColumnHide["Returns"] = false
        //                 datakey["n_other_qty"]["visible"] = "1"
        //                 datakey["n_other_scheme"]["visible"] = "1"
        //                 datakey["n_other_    value"]["visible"] = "1"
        //             }
        //         })
        //         this.setState({ datakey: datakey, ColumnHide: ColumnHide })
        //     }
        // }).catch((Error) => {
        //     this.setState({ Error: true, Errormsg: " Contact to admin" })
        // })
        let readonly = {}

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

                //to edit or not 

                // if (this.props.poolFlag != "0") {
                readonly["openingqty"] = a["openingqty"] == "1" ? true : false
                readonly["openingschqty"] = a["openingschqty"] == "1" ? true : false
                readonly["OpenValue"] = a["OpenValue"] == "1" ? true : false

                readonly["n_receipt_qty"] = a["n_receipt_qty"] == "1" ? true : false
                readonly["n_receipt_scheme"] = a["n_receipt_scheme"] == "1" ? true : false
                readonly["n_receipt_value"] = a["n_receipt_value"] == "1" ? true : false

                readonly["n_sales_qty"] = a["n_sales_qty"] == "1" ? true : false
                readonly["n_scheme_qty"] = a["n_scheme_qty"] == "1" ? true : false
                readonly["n_sales_value"] = (a["n_sales_value"] == "1" && (this.props.salesValueEdit == "0" || this.props.selecSecSalesTypr =="1") ) ? true : false

                readonly["n_other_qty"] = a["n_other_qty"] == "1" ? true : false
                readonly["n_other_scheme"] = a["n_other_scheme"] == "1" ? true : false
                readonly["n_other_value"] = a["n_other_value"] == "1" ? true : false

                readonly["ReturnToCFARssQty"] = a["ReturnToCFARssQty"] == "1" ? true : false
                readonly["ReturnToCFARssSchQty"] = a["ReturnToCFARssSchQty"] == "1" ? true : false
                readonly["ReturnToCFARssValue"] = a["ReturnToCFARssValue"] == "1" ? true : false

                readonly["n_closing_qty"] = a["n_closing_qty"] == "1" ? true : false
                readonly["closingschqty"] = a["closingschqty"] == "1" ? true : false
                readonly["n_closing_value"] = a["n_closing_value"] == "1" ? true : false

                readonly["n_transit_qty"] = a["TrnQty"] == "1" ? true : false
                // }
                // else
                if (this.props.poolFlag == "0") {
                    readonly["openingqty"] = true
                    readonly["openingschqty"] = true
                    readonly["OpenValue"] = true

                    readonly["n_receipt_qty"] = true
                    readonly["n_receipt_scheme"] = true
                    readonly["n_receipt_value"] = true

                    readonly["n_sales_qty"] = true
                    readonly["n_scheme_qty"] = true
                    readonly["n_sales_value"] = true

                    readonly["n_other_qty"] = true
                    readonly["n_other_scheme"] = true
                    readonly["n_other_value"] = true

                    readonly["ReturnToCFARssQty"] = true
                    readonly["ReturnToCFARssSchQty"] = true
                    readonly["ReturnToCFARssValue"] = true

                    readonly["n_closing_qty"] = true
                    readonly["closingschqty"] = true
                    readonly["n_closing_value"] = true

                    readonly["n_transit_qty"] = true
                }



                if (this.props.prevmonthEdit != "") {
                    readonly["openingqty"] = true
                    readonly["openingschqty"] = true
                    readonly["OpenValue"] = true

                    readonly["n_receipt_qty"] = true
                    readonly["n_receipt_scheme"] = true
                    readonly["n_receipt_value"] = true

                    readonly["n_sales_qty"] = true
                    readonly["n_scheme_qty"] = true
                    readonly["n_sales_value"] = true

                    readonly["n_other_qty"] = true
                    readonly["n_other_scheme"] = true
                    readonly["n_other_value"] = true

                    readonly["ReturnToCFARssQty"] = true
                    readonly["ReturnToCFARssSchQty"] = true
                    readonly["ReturnToCFARssValue"] = true

                    readonly["n_closing_qty"] = true
                    readonly["closingschqty"] = true
                    readonly["n_closing_value"] = true

                    readonly["n_transit_qty"] = true
                }
                let remarks = '',
                    columnStatus = ''
                this.props.dataTotal != undefined && this.props.dataTotal.length > 0 ? this.props.dataTotal.map(res => {

                    // receiptTotal = res.n_tot_receipt_value != undefined ? res.n_tot_receipt_value : res.N_TOT_RECEIPT_VALUE,
                    //  salesTotal = res.n_tot_sales_value != undefined ? res.n_tot_sales_value : res.N_TOT_SALES_VALUE,
                    // returnsTotal = res.n_tot_other_value != undefined ? res.n_tot_other_value : res.N_TOT_OTHER_VALUE,
                    // closingTotal = res.n_tot_closing_value != undefined ? res.n_tot_closing_value : res.N_TOT_CLOSING_VALUE,
                    // returnstocfarssTotal = res.returnstocfarssTotal != undefined ? res.n_tot_retCfarss_value : res.n_tot_retCfarss_value,
                    remarks = res.c_note != undefined ? res.c_note : res.C_NOTE,
                        columnStatus = res.status != undefined ? res.status : res.status
                    // openTotal = res.n_tot_opening_value

                }) : null
                if (columnStatus == '2') {

                    readonly["openingqty"] = true
                    readonly["openingschqty"] = true
                    readonly["OpenValue"] = true

                    readonly["n_receipt_qty"] = true
                    readonly["n_receipt_scheme"] = true
                    readonly["n_receipt_value"] = true

                    readonly["n_sales_qty"] = true
                    readonly["n_scheme_qty"] = true
                    readonly["n_sales_value"] = true

                    readonly["n_other_qty"] = true
                    readonly["n_other_scheme"] = true
                    readonly["n_other_value"] = true

                    readonly["ReturnToCFARssQty"] = true
                    readonly["ReturnToCFARssSchQty"] = true
                    readonly["ReturnToCFARssValue"] = true

                    readonly["n_closing_qty"] = true
                    readonly["closingschqty"] = true
                    readonly["n_closing_value"] = true

                    readonly["n_transit_qty"] = true
                    this.props.importpopupButton(columnStatus)


                }
                //readonly["openingCanShow"] = a["openingCanShow"] =="2"?
                //                 readonly["CloseValue"] =  a["CloseValue"] == "1" ? true : false
                // readonly["ClosingCanShow"] 			=  a["ClosingCanShow"] == "1" ? true : false
                // readonly["OpenValue"] 				=a["OpenValue"] == "1" ? true : false
                // readonly["ReceiptCanShow"] 			= a["ReceiptCanShow"] == "1" ? true : false
                // readonly["ReturnToCFARSSCanshow"] 	=  a["ReturnToCFARSSCanshow"] == "1" ? true : false
                // readonly["ReturnToCFARssQty"] 		=a["ReturnToCFARssQty"] == "1" ? true : false
                // readonly["ReturnToCFARssSchQty"]	=  a["ReturnToCFARssSchQty"] == "1" ? true : false
                // readonly["ReturnToCFARssValue"]		=  a["ReturnToCFARssValue"] == "1" ? true : false
                // readonly["ReturnsCanShow"] 	   		=  a["ReturnsCanShow"] == "1" ? true : false
                // readonly["SalesCanshow"] 	   		= a["SalesCanshow"] == "1" ? true : false
                // readonly["TrnQty"] 			   		= a["TrnQty"] == "1" ? true : false
                // readonly["closingschqty"] 	   		= a["closingschqty"] == "1" ? true : false
                // readonly["n_closing_qty"] 	   		= a["n_closing_qty"] == "1" ? true : false
                // readonly["n_closing_value"]    		= a["n_closing_value"] == "1" ? true : false
                // readonly["n_other_qty"] 	   		= a["n_other_qty"] == "1" ? true : false
                // readonly["n_other_scheme"] 	   		= a["n_other_scheme"] == "1" ? true : false
                // readonly["n_other_value"] 	   		= a["n_other_value"] == "1" ? true : false
                // readonly["n_receipt_qty"] 	   		= a["n_receipt_qty"] == "1" ? true : false
                // readonly["n_receipt_scheme"]   		= a["n_receipt_scheme"] == "1" ? true : false
                // readonly["n_receipt_value"]    		= a["n_receipt_value"] == "1" ? true : false
                // readonly["n_sales_qty"] 	   		=  a["n_sales_qty"] == "1" ? true : false
                // readonly["n_sales_value"] 	   		= a["n_sales_value"] == "1" ? true : false
                // readonly["n_scheme_qty"] 	   		=  a["n_scheme_qty"] == "1" ? true : false
                // readonly["openingCanShow"] 	   		= a["openingCanShow"] == "1" ? true : false
                // readonly["openingqty"]         		=  a["openingqty"] == "1" ? true : false
                // readonly["openingschqty"]      		=a["openingschqty"] == "1" ? true : false

                //                 ColumnHide["CloseValue"] = a["CloseValue"] == "1" || a["CloseValue"] == "2" ? true : false
                //                 ColumnHide["ClosingCanShow"] = a["ClosingCanShow"] == "1" || a["ClosingCanShow"] == "2" ? true : false
                //                 ColumnHide["OpenValue"] = a["OpenValue"] == "1" || a["OpenValue"] == "2" ? true : false
                //                 ColumnHide["ReceiptCanShow"] = a["ReceiptCanShow"] == "1" || a["ReceiptCanShow"] == "2" ? true : false
                //                 ColumnHide["ReturnToCFARSSCanshow"] = a["ReturnToCFARSSCanshow"] == "1" || a["ReturnToCFARSSCanshow"] == "2" ? true : false
                //                 ColumnHide["ReturnToCFARssQty"] = a["ReturnToCFARssQty"] == "1" || a["ReturnToCFARssQty"] == "2" ? true : false
                //                 ColumnHide["ReturnToCFARssSchQty"] = a["ReturnToCFARssSchQty"] == "1" || a["ReturnToCFARssSchQty"] == "2" ? true : false
                //                 ColumnHide["ReturnToCFARssValue"] = a["ReturnToCFARssValue"] == "1" || a["ReturnToCFARssValue"] == "2" ? true : false
                //                 ColumnHide["ReturnsCanShow"] = a["ReturnsCanShow"] == "1" || a["ReturnsCanShow"] == "2" ? true : false
                //                 ColumnHide["SalesCanshow"] = a["SalesCanshow"] == "1" || a["SalesCanshow"] == "2" ? true : false
                //                 ColumnHide["TrnQty"] = a["TrnQty"] == "1" || a["TrnQty"] == "2" ? true : false
                //                 ColumnHide["closingschqty"] = a["closingschqty"] == "1" || a["closingschqty"] == "2" ? true : false
                //                 ColumnHide["n_closing_qty"] = a["n_closing_qty"] == "1" || a["n_closing_qty"] == "2" ? true : false
                //                 ColumnHide["n_closing_value"] = a["n_closing_value"] == "1" || a["n_closing_value"] == "2" ? true : false
                //                 ColumnHide["n_other_qty"] = a["n_other_qty"] == "1" || a["n_other_qty"] == "2" ? true : false
                //                 ColumnHide["n_other_scheme"] = a["n_other_scheme"] == "1" || a["n_other_scheme"] == "2" ? true : false
                //                 ColumnHide["n_other_value"] = a["n_other_value"] == "1" || a["n_other_value"] == "2" ? true : false
                //                 ColumnHide["n_receipt_qty"] = a["n_receipt_qty"] == "1" || a["n_receipt_qty"] == "2" ? true : false
                //                 ColumnHide["n_receipt_scheme"] = a["n_receipt_scheme"] == "1" || a["n_receipt_scheme"] == "2" ? true : false
                //                 ColumnHide["n_receipt_value"] = a["n_receipt_value"] == "1" || a["n_receipt_value"] == "2" ? true : false
                //                 ColumnHide["n_sales_qty"] = a["n_sales_qty"] == "1" || a["n_sales_qty"] == "2" ? true : false
                //                 ColumnHide["n_sales_value"] = a["n_sales_value"] == "1" || a["n_sales_value"] == "2" ? true : false
                //                 ColumnHide["n_scheme_qty"] = a["n_scheme_qty"] == "1" || a["n_scheme_qty"] == "2" ? true : false
                //                 ColumnHide["openingCanShow"] = a["openingCanShow"] == "1" || a["openingCanShow"] == "2" ? true : false
                //                 ColumnHide["openingqty"] = a["openingqty"] == "1" || a["openingqty"] == "2" ? true : false
                //                 ColumnHide["openingschqty"] = a["openingschqty"] == "1" || a["openingschqty"] == "2" ? true : false





                this.setState({ ColumnHide: ColumnHide, readonly: readonly, remarks: remarks, columnStatus: columnStatus })

            }
        }).catch((Error) => {
        })
    }
    componentDidUpdate(propsolds, olsstate) {
        var Builddata = []
        let listprice = {}
        if (propsolds.data != this.props.data) {



            // this.setState({
            //     // openTotal: openTotal,
            //     // receiptTotal: receiptTotal,
            //     // salesTotal: salesTotal,
            //     // returnsTotal: returnsTotal,
            //     // closingTotal: closingTotal,
            //     // returnstocfarssTotal: returnstocfarssTotal,
            //     remarks: remarks,


            // })
            let data = this.props.data
            let srno = ''
            let datakey1 = this.state.datakey
            var promise = new Promise(function (resolve, reject) {

                data != undefined && data.length > 0 ? data.map((A, index) => {
                    //  var datakey=   {...this.state.datakey}
                    let datakey = JSON.parse(JSON.stringify(datakey1));  // Object.assign({}, this.state.datakey);
                    if (index == 1) {
                        //  srno = A["SrNo"]
                    }

                    // total["open"] = parseInt(total["open"] == '' ? 0 : total["open"]) + parseInt(A["openingvisibleue"] == '' ? 0 : A["openingvisibleue"])
                    // total["receipt"] = parseInt(total["receipt"] == '' ? 0 : total["receipt"]) + parseInt(A["n_receipt_value"] == '' ? 0 : A["n_receipt_value"])
                    // total["sales"] = parseInt(total["sales"] == '' ? 0 : total["sales"]) + parseInt(A["n_sales_value"] == '' ? 0 : A["n_sales_value"])
                    // total["close"] = parseInt(total["close"] == '' ? 0 : total["close"]) + parseInt(A["n_closing_value"] == '' ? 0 : A["n_closing_value"])
                    // total["tran"] = parseInt(total["tran"] == '' ? 0 : total["tran"]) + parseInt(A["n_transit_qty"] == '' ? 0 : A["n_transit_qty"])
                    // total["Return"] = parseInt(total["Return"] == '' ? 0 : total["Return"]) + parseInt(A["n_other_value"] == '' ? 0 : A["n_other_value"])
                    //  total["other"]=   total["open"] + A["openingvisibleue"]

                    //to check
                    //listprice[A["itemcode"]]["openingqty"] =
                    // if(A["openingqty"] != undefined ){
                    //     listprice[A["itemcode"]]["openingqty"] = A["openingqty"]
                    // }else{
                    //     listprice[A["itemcode"]]["openingqty"] = 0


                    // }

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
                    listprice[A["itemcode"]]["n_sales_value"] = A["n_sales_value"] != undefined ? A["n_sales_value"] :  parseFloat(A["rate"] * A["n_sales_qty"]).toFixed(2)
                    listprice[A["itemcode"]]["n_other_qty"] = A["n_other_qty"] != undefined ? A["n_other_qty"] : '0'
                    listprice[A["itemcode"]]["n_other_scheme"] = A["n_other_scheme"] != undefined ? A["n_other_scheme"] : '0'
                    listprice[A["itemcode"]]["n_other_visibleue"] = A["n_other_visibleue"] != undefined ? A["n_other_visibleue"] : '0'
                    listprice[A["itemcode"]]["n_closing_qty"] = A["n_closing_qty"] != undefined ? A["n_closing_qty"] : '0'
                    listprice[A["itemcode"]]["closingschqty"] = A["closingschqty"] != undefined ? A["closingschqty"] : '0'
                    listprice[A["itemcode"]]["n_closing_value"] = A["n_closing_value"] != undefined ? A["n_closing_value"] : '0'
                    listprice[A["itemcode"]]["n_transit_qty"] = A["n_transit_qty"] != undefined ? A["n_transit_qty"] : '0'

                    // EDIT RETURN NEED TO CHECK 
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
                    datakey["n_sales_value"]["val"] = A["n_sales_value"] == undefined ? 0 :  parseFloat(A["rate"] * A["n_sales_qty"]).toFixed(2)
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

        }
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
                                        {/* Secondary Sales Entry For The Month of {this.state.month[this.props.selecteddata["month"]]} - {this.props.selecteddata["year"] } */}
                                    </h5>
                                </div>

                                {this.props.FlagForLoadItems.NonoperatingStockiestisplay == "1" ?
                                    <div class="form-check mb-2 non-op-stockist">
                                        <input type="checkbox" onClick={(e) => { this.clear(e) }} class="form-check-input filled-in" id="filledInCheckbox" />
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
                                                    // if (isNaN(w["ReturnToCFARssSchQty"]["val"]) || w["ReturnToCFARssSchQty"]["val"] == "") {
                                                    //     w["ReturnToCFARssSchQty"]["val"] = 0
                                                    // }
                                                    if (isNaN(w["openingschqty"]["val"]) || w["openingschqty"]["val"] == "") {
                                                        w["openingschqty"]["val"] = 0
                                                    }
                                                    // if (isNaN(w["n_closing_qty"]["val"])) {
                                                    //     w["n_closing_qty"]["val"] = 0
                                                    // }
                                                    // if (isNaN(w["n_sales_qty"]["val"])) {
                                                    //     w["n_sales_qty"]["val"] = 0
                                                    // }
                                                    //  parseInt(w["openingschqty"]["val"]), parseInt(w["n_other_scheme"]["val"]), parseInt(w["n_receipt_scheme"]["val"]),parseInt(w["ReturnToCFARssSchQty"]["val"]) , parseInt(w["closingschqty"]["val"]),
                                                    //  "hhhhhhhhhhhhhhhhhhhhhh")
                                                    // w["n_sales_qty"]["val"] = this.props.FlagForLoadItems.DefaultZeroInQty == "1" && (w["n_sales_qty"]["val"] == "" || w["n_sales_qty"]["val"] == "0") ? 0 : w["n_sales_qty"]["val"]
                                                    // w["n_closing_qty"]["val"] = this.props.FlagForLoadItems.DefaultZeroInQty == "1" && (w["n_closing_qty"]["val"] == "" || w["n_closing_qty"]["val"] == "0" || w["n_closing_qty"]["val"] == 0) ? 0 : w["n_closing_qty"]["val"]
                                                    //    w["n_closing_qty"]["val"] =   w["n_closing_qty"]["val"] ==NaN ? 0 :  w["n_closing_qty"]["val"]
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
                                                                                <td >open<div> <input type="number" onChange={(event) => { this.updateprice(event, w["itemcode"], "openingschqty", w["rate"]["val"]) }} value={w["openingschqty"]["val"] == "" ? 0 : w["openingschqty"]["val"]} readOnly className="inv-sug-ord-qty" /></div></td>
                                                                                : <td></td> : null

                                                                    }
                                                                    {
                                                                        this.state.ColumnHide["openingCanShow"] == true ?
                                                                            w["OpenValue"].Header == "Value" && this.state.ColumnHide["OpenValue"] == true ?
                                                                                <td >open<div> <input readOnly type="text" value={parseFloat( w["rate"]["val"] * w["openingqty"]["val"]).toFixed(2)} className="inv-sug-ord-qty" /></div></td>
                                                                                : <td></td> : null

                                                                    }
                                                                </>
                                                                : null}
                                                            {this.state.ColumnHide["openingschqty"] == false ?
                                                                <>
                                                                    {
                                                                        this.state.ColumnHide["openingCanShow"] == true ?
                                                                            w["openingqty"].Header == "Qty" && this.state.ColumnHide["openingqty"] == true ?
                                                                                <td >open<div> <input type="text" onChange={(event) => { this.updateprice(event, w["itemcode"], "openingqty", w["rate"]["val"]) }} value={w["openingqty"]["val"]} readOnly className="inv-sug-ord-qty" /></div></td>
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
                                                                                <td >open<div> <input type="number" onChange={(event) => { this.updateprice(event, w["itemcode"], "openingqty", w["rate"]["val"]) }} value={w["openingqty"]["val"]} readOnly className="inv-sug-ord-qty" /></div></td>
                                                                                : <td></td> : null

                                                                    }
                                                                    {
                                                                        this.state.ColumnHide["openingCanShow"] == true ?
                                                                            w["openingschqty"].Header == "Sch Qty" && this.state.ColumnHide["openingschqty"] == true ?
                                                                                <td >open<div> <input type="number" onChange={(event) => { this.updateprice(event, w["itemcode"], "openingschqty", w["rate"]["val"]) }} value={w["openingschqty"]["val"] == "" ? 0 : w["openingschqty"]["val"]} readOnly className="inv-sug-ord-qty" /></div></td>
                                                                                : <td></td> : null

                                                                    }
                                                                    {
                                                                        this.state.ColumnHide["openingCanShow"] == true ?
                                                                            w["OpenValue"].Header == "Value" && this.state.ColumnHide["OpenValue"] == true ?
                                                                                <td >open<div> <input readOnly type="number" value={parseFloat(w["rate"]["val"] * w["openingqty"]["val"]).toFixed(2)} className="inv-sug-ord-qty" /></div></td>
                                                                                : <td></td> : null

                                                                    }
                                                                </> : null}


                                                            {/* receipt */}
                                                            {this.state.ColumnHide["n_receipt_qty"] == false ?
                                                                <>

                                                                    {
                                                                        this.state.ColumnHide["ReceiptCanShow"] == true ?
                                                                            w["n_receipt_scheme"].Header == "Sch Qty	" && this.state.ColumnHide["n_receipt_scheme"] == true ?
                                                                                <td >Receipt<div> <input type="number" onChange={(event) => { this.updateprice(event, w["itemcode"], "n_receipt_scheme", w["rate"]["val"]) }} value={w["n_receipt_scheme"]["val"]} readOnly={this.state.readonly["n_receipt_scheme"]} className="inv-sug-ord-qty" /></div></td>
                                                                                : <td></td> : null

                                                                    }
                                                                    {
                                                                        this.state.ColumnHide["ReceiptCanShow"] == true ?
                                                                            w["n_receipt_value"].Header == "Value" && this.state.ColumnHide["n_receipt_value"] == true ?
                                                                                <td >Receipt<div> <input type="number" readOnly value={parseFloat(w["rate"]["val"] * w["n_receipt_qty"]["val"]).toFixed(2)} className="inv-sug-ord-qty" /></div></td>
                                                                                : <td></td> : null

                                                                    }
                                                                </> : null}
                                                            {
                                                                this.state.ColumnHide["n_receipt_scheme"] == false ?
                                                                    <>
                                                                        {
                                                                            this.state.ColumnHide["ReceiptCanShow"] == true ?
                                                                                w["n_receipt_qty"].Header == "Qty" && this.state.ColumnHide["n_receipt_qty"] == true ?
                                                                                    <td >Receipt<div> <input type="number" onChange={(event) => { this.updateprice(event, w["itemcode"], "n_receipt_qty", w["rate"]["val"]) }} value={w["n_receipt_qty"]["val"]} readOnly={this.state.readonly["n_receipt_qty"]} className="inv-sug-ord-qty" /></div></td>
                                                                                    : <td></td> : null

                                                                        }

                                                                        {
                                                                            this.state.ColumnHide["ReceiptCanShow"] == true ?
                                                                                w["n_receipt_value"].Header == "Value" && this.state.ColumnHide["n_receipt_value"] == true ?
                                                                                    <td >Receipt<div> <input type="number" readOnly value={parseFloat(w["rate"]["val"] * w["n_receipt_qty"]["val"]).toFixed(2)} className="inv-sug-ord-qty" /></div></td>
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
                                                                                <td >Receipt<div> <input type="number" onChange={(event) => { this.updateprice(event, w["itemcode"], "n_receipt_qty", w["rate"]["val"]) }} value={w["n_receipt_qty"]["val"]} readOnly={this.state.readonly["n_receipt_qty"]} className="inv-sug-ord-qty" /></div></td>
                                                                                : <td></td> : null

                                                                    }
                                                                    {
                                                                        this.state.ColumnHide["ReceiptCanShow"] == true ?
                                                                            w["n_receipt_scheme"].Header == "Sch Qty	" && this.state.ColumnHide["n_receipt_scheme"] == true ?
                                                                                <td >Receipt<div> <input type="number" onChange={(event) => { this.updateprice(event, w["itemcode"], "n_receipt_scheme", w["rate"]["val"]) }} value={w["n_receipt_scheme"]["val"]} readOnly={this.state.readonly["n_receipt_scheme"]} className="inv-sug-ord-qty" /></div></td>
                                                                                : <td></td> : null

                                                                    }
                                                                    {
                                                                        this.state.ColumnHide["ReceiptCanShow"] == true ?
                                                                            w["n_receipt_value"].Header == "Value" && this.state.ColumnHide["n_receipt_value"] == true ?
                                                                                <td >Receipt<div> <input type="number" readOnly value={parseFloat(w["rate"]["val"] * w["n_receipt_qty"]["val"]).toFixed(2)} className="inv-sug-ord-qty" /></div></td>
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
                                                                                <td >Sales<div> <input type="number" onChange={(event) => { this.updateprice(event, w["itemcode"], "n_scheme_qty", w["rate"]["val"]) }}
                                                                                    value={this.state.readonly["n_scheme_qty"] && this.props.selecSecSalesTypr == "1" && this.state.Clearvar == false && this.props.poolFlag != "0" ? w["n_scheme_qty"]["val"] = parseInt(w["openingschqty"]["val"]) + parseInt(w["n_receipt_scheme"]["val"]) + parseInt(w["n_other_scheme"]["val"]) - w["closingschqty"]["val"] : w["n_scheme_qty"]["val"]}
                                                                                    readOnly={this.state.readonly["n_scheme_qty"]} className="inv-sug-ord-qty" /></div></td>
                                                                                : <td></td> : null

                                                                    }
                                                                    {
                                                                        this.state.ColumnHide["SalesCanshow"] == true ?
                                                                            w["n_sales_value"].Header == "Value" && this.state.ColumnHide["n_sales_value"] == true ?
                                                                                <td >Sales<div> <input type="number"
                                                                                    // value={w["n_sales_value"]["val"]}
                                                                                    value={this.state.readonly["n_sales_qty"] && this.props.selecSecSalesTypr == "1" && this.state.Clearvar == false && this.props.poolFlag != "0" && this.props.salesValueEdit == "0" ? w["n_sales_value"]["val"] = w["n_sales_qty"]["val"] * w["rate"]["val"] : w["n_sales_value"]["val"]}
                                                                                    readOnly={this.state.readonly["n_sales_value"]}

                                                                                    //   value = {this.props.secSalesType == "2" &&  this.props.salesValueEdit == "1" ? w["n_sales_value"]["val"] :  w["n_sales_value"]["val"] =   w["n_sales_qty"]["val"]*w["rate"]["val"]  }
                                                                                    //  value={this.state.readonly["n_sales_qty"] && this.props.selecSecSalesTypr == "1" && this.state.Clearvar == false && this.props.poolFlag != "0" && this.props.salesValueEdit != "1"? w["n_sales_value"]["val"] = w["n_sales_qty"]["val"] * w["rate"]["val"] :  w["n_sales_qty"]["val"] * w["rate"]["val"] } 
                                                                                    onChange={(event) => { this.props.salesValueEdit == "1" ? this.updateprice(event, w["itemcode"], "n_sales_value", w["rate"]["val"]) : null }} className="inv-sug-ord-qty" /></div></td>
                                                                                : <td></td> : null

                                                                    }
                                                                </> : null}
                                                            { this.state.ColumnHide["n_scheme_qty"] == false ?
                                                                <>
                                                                    {
                                                                        this.state.ColumnHide["SalesCanshow"] == true ?
                                                                            w["n_sales_qty"].Header == "Qty" && this.state.ColumnHide["n_sales_qty"] == true ?
                                                                                <td >Sales<div> <input type="number" onChange={(event) => { this.updateprice(event, w["itemcode"], "n_sales_qty", w["rate"]["val"]) }}
                                                                                    value={this.state.readonly["n_sales_qty"] && this.props.selecSecSalesTypr == "1" && this.state.Clearvar == false && this.props.poolFlag != "0" ? w["n_sales_qty"]["val"] = parseInt(w["openingqty"]["val"]) + parseInt(w["n_receipt_qty"]["val"]) + parseInt(w["n_other_qty"]["val"]) - w["n_closing_qty"]["val"] : w["n_sales_qty"]["val"]}
                                                                                    readOnly={this.state.readonly["n_sales_qty"]} name="n_sales_qty" className="inv-sug-ord-qty" /></div></td>
                                                                                : <td></td> : null

                                                                    }

                                                                    {
                                                                        this.state.ColumnHide["SalesCanshow"] == true ?
                                                                            w["n_sales_value"].Header == "Value" && this.state.ColumnHide["n_sales_value"] == true ?
                                                                                <td >Sales<div> <input type="number"
                                                                                    //  value={w["n_sales_value"]["val"]}
                                                                                    //  value = {this.props.secSalesType == "2" &&  this.props.salesValueEdit == "1" ? w["n_sales_value"]["val"] :  w["n_sales_value"]["val"] =   w["n_sales_qty"]["val"]*w["rate"]["val"]  }
                                                                                    value={this.state.readonly["n_sales_qty"] && this.props.selecSecSalesTypr == "1" && this.state.Clearvar == false && this.props.poolFlag != "0" && this.props.salesValueEdit == "0" ? w["n_sales_value"]["val"] = w["n_sales_qty"]["val"] * w["rate"]["val"] : w["n_sales_value"]["val"]}
                                                                                    readOnly={this.state.readonly["n_sales_value"]}

                                                                                    //  value={ w["n_sales_qty"]["val"] * w["rate"]["val"]}
                                                                                    className="inv-sug-ord-qty" onChange={(event) => { this.props.salesValueEdit == "1" ? this.updateprice(event, w["itemcode"], "n_sales_value", w["rate"]["val"]) : null }} /></div></td>
                                                                                : <td></td> : null

                                                                    }
                                                                </>
                                                                : null}
                                                            {  this.state.ColumnHide["n_sales_qty"] == true && this.state.ColumnHide["n_scheme_qty"] == true ? <>
                                                                {
                                                                    this.state.ColumnHide["SalesCanshow"] == true ?
                                                                        w["n_sales_qty"].Header == "Qty" && this.state.ColumnHide["n_sales_qty"] == true ?
                                                                            <td >Sales<div> <input type="number" onChange={(event) => { this.updateprice(event, w["itemcode"], "n_sales_qty", w["rate"]["val"]) }}
                                                                                value={this.state.readonly["n_sales_qty"] && this.props.selecSecSalesTypr == "1" && this.state.Clearvar == false && this.props.poolFlag != "0" ? w["n_sales_qty"]["val"] = parseInt(w["openingqty"]["val"]) + parseInt(w["n_receipt_qty"]["val"]) + parseInt(w["n_other_qty"]["val"]) - w["n_closing_qty"]["val"] : w["n_sales_qty"]["val"]}
                                                                                readOnly={this.state.readonly["n_sales_qty"]} name="n_sales_qty" className="inv-sug-ord-qty" /></div></td>
                                                                            : <td></td> : null

                                                                }
                                                                {
                                                                    this.state.ColumnHide["SalesCanshow"] == true ?
                                                                        w["n_scheme_qty"].Header == "Sch Qty" && this.state.ColumnHide["n_scheme_qty"] == true ?
                                                                            <td >Sales<div> <input type="number" onChange={(event) => { this.updateprice(event, w["itemcode"], "n_scheme_qty", w["rate"]["val"]) }}
                                                                                value={this.state.readonly["n_scheme_qty"] && this.props.selecSecSalesTypr == "1" && this.state.Clearvar == false && this.props.poolFlag != "0" ? w["n_scheme_qty"]["val"] = parseInt(w["openingschqty"]["val"]) + parseInt(w["n_receipt_scheme"]["val"]) + parseInt(w["n_other_scheme"]["val"]) - parseInt(w["closingschqty"]["val"]) : w["n_scheme_qty"]["val"]}
                                                                                readOnly={this.state.readonly["n_scheme_qty"]} className="inv-sug-ord-qty" /></div></td>
                                                                            : <td></td> : null

                                                                }
                                                                {
                                                                    this.state.ColumnHide["SalesCanshow"] == true ?
                                                                        w["n_sales_value"].Header == "Value" && this.state.ColumnHide["n_sales_value"] == true ?
                                                                            <td >Sales<div> <input type="number"
                                                                                // value = {this.props.secSalesType == "2" &&  this.props.salesValueEdit == "1" ? w["n_sales_value"]["val"] :  w["n_sales_value"]["val"] =   w["n_sales_qty"]["val"]*w["rate"]["val"]  }

                                                                                //value={w["n_sales_value"]["val"]}
                                                                                readOnly={this.state.readonly["n_sales_value"]}
                                                                                value={this.state.readonly["n_sales_qty"] && this.props.selecSecSalesTypr == "1" && this.state.Clearvar == false && this.props.poolFlag != "0" && this.props.salesValueEdit == "0" ? w["n_sales_value"]["val"] = w["n_sales_qty"]["val"] * w["rate"]["val"] : w["n_sales_value"]["val"]}
                                                                                className="inv-sug-ord-qty" onChange={(event) => { this.props.salesValueEdit == "1" ? this.updateprice(event, w["itemcode"], "n_sales_value", w["rate"]["val"]) : null }} /></div></td>
                                                                            : <td></td> : null

                                                                }
                                                            </> : null}



                                                            {/* returns */}
                                                            {this.state.ColumnHide["n_other_qty"] == false ?
                                                                <>
                                                                    {
                                                                        this.state.ColumnHide["ReturnsCanShow"] == true ?
                                                                            w["n_other_scheme"].Header == "Sch Qty" && this.state.ColumnHide["n_other_scheme"] == true ?
                                                                                <td >Returns<div> <input type="number" onChange={(event) => { this.updateprice(event, w["itemcode"], "n_other_scheme", w["rate"]["val"]) }} value={w["n_other_scheme"]["val"]} readOnly={this.state.readonly["n_other_scheme"]} className="inv-sug-ord-qty" /></div></td>
                                                                                : <td></td> : null

                                                                    }
                                                                    {
                                                                        this.state.ColumnHide["ReturnsCanShow"] == true ?
                                                                            w["n_other_value"].Header == "Value" && this.state.ColumnHide["n_other_value"] == true ?
                                                                                <td >Returns<div> <input type="number" readOnly value={parseFloat(w["rate"]["val"] * w["n_other_qty"]["val"]).toFixed(2)} className="inv-sug-ord-qty" /></div></td>
                                                                                : <td></td> : null

                                                                    }
                                                                </> : null}
                                                            {this.state.ColumnHide["n_other_scheme"] == false ?

                                                                <>
                                                                    {
                                                                        this.state.ColumnHide["ReturnsCanShow"] == true ?
                                                                            w["n_other_qty"].Header == "Qty" && this.state.ColumnHide["n_other_qty"] == true ?
                                                                                <td >Returns<div> <input type="number" onChange={(event) => { this.updateprice(event, w["itemcode"], "n_other_qty", w["rate"]["val"]) }} value={w["n_other_qty"]["val"] == "" ? 0 : w["n_other_qty"]["val"]} readOnly={this.state.readonly["n_other_qty"]} className="inv-sug-ord-qty" /></div></td>
                                                                                : <td></td> : null

                                                                    }

                                                                    {
                                                                        this.state.ColumnHide["ReturnsCanShow"] == true ?
                                                                            w["n_other_value"].Header == "Value" && this.state.ColumnHide["n_other_value"] == true ?
                                                                                <td >Returns<div> <input type="number" readOnly value={parseFloat(w["rate"]["val"] * w["n_other_qty"]["val"]).toFixed(2)} className="inv-sug-ord-qty" /></div></td>
                                                                                : <td></td> : null

                                                                    }
                                                                </>

                                                                : null}
                                                            {this.state.ColumnHide["n_other_qty"] == true && this.state.ColumnHide["n_other_scheme"] == true ?
                                                                <>
                                                                    {
                                                                        this.state.ColumnHide["ReturnsCanShow"] == true ?
                                                                            w["n_other_qty"].Header == "Qty" && this.state.ColumnHide["n_other_qty"] == true ?
                                                                                <td >Returns<div> <input type="number" onChange={(event) => { this.updateprice(event, w["itemcode"], "n_other_qty", w["rate"]["val"]) }} value={w["n_other_qty"]["val"] == "" ? 0 : w["n_other_qty"]["val"]} readOnly={this.state.readonly["n_other_qty"]} className="inv-sug-ord-qty" /></div></td>
                                                                                : <td></td> : null

                                                                    }
                                                                    {
                                                                        this.state.ColumnHide["ReturnsCanShow"] == true ?
                                                                            w["n_other_scheme"].Header == "Sch Qty" && this.state.ColumnHide["n_other_scheme"] == true ?
                                                                                <td >Returns<div> <input type="number" onChange={(event) => { this.updateprice(event, w["itemcode"], "n_other_scheme", w["rate"]["val"]) }} value={w["n_other_scheme"]["val"]} readOnly={this.state.readonly["n_other_scheme"]} className="inv-sug-ord-qty" /></div></td>
                                                                                : <td></td> : null

                                                                    }
                                                                    {
                                                                        this.state.ColumnHide["ReturnsCanShow"] == true ?
                                                                            w["n_other_value"].Header == "Value" && this.state.ColumnHide["n_other_value"] == true ?
                                                                                <td >Returns<div> <input type="number" readOnly value={parseFloat(w["rate"]["val"] * w["n_other_qty"]["val"]).toFixed(2)} className="inv-sug-ord-qty" /></div></td>
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
                                                                                <td >Return To CFA/RSS <div> <input type="number" onChange={(event) => { this.updateprice(event, w["itemcode"], "ReturnToCFARssSchQty", w["rate"]["val"]) }} value={w["ReturnToCFARssSchQty"]["val"] == "" ? 0 : parseInt(w["ReturnToCFARssSchQty"]["val"])} readOnly={this.state.readonly["ReturnToCFARssSchQty"]} className="inv-sug-ord-qty" /></div></td>
                                                                                : <td></td> : null

                                                                    }
                                                                    {
                                                                        this.state.ColumnHide["ReturnToCFARSSCanshow"] == true ?
                                                                            w["ReturnToCFARssValue"].Header == "Value" && this.state.ColumnHide["ReturnToCFARssValue"] == true ?
                                                                                <td >Return To CFA/RSS<div> <input type="number" readOnly value={w["rate"]["val"] * w["ReturnToCFARssQty"]["val"]} className="inv-sug-ord-qty" /></div></td>
                                                                                : <td></td> : null

                                                                    }
                                                                </> : null}
                                                            {this.state.ColumnHide["ReturnToCFARssSchQty"] == false ?
                                                                <>
                                                                    {
                                                                        this.state.ColumnHide["ReturnToCFARSSCanshow"] == true ?
                                                                            w["ReturnToCFARssQty"].Header == "Qty" && this.state.ColumnHide["ReturnToCFARssQty"] == true ?
                                                                                <td >Return To CFA/RSS<div> <input type="number" onChange={(event) => { this.updateprice(event, w["itemcode"], "ReturnToCFARssQty", w["rate"]["val"]) }} value={w["ReturnToCFARssQty"]["val"] == "" ? 0 : w["ReturnToCFARssQty"]["val"]} readOnly={this.state.readonly["ReturnToCFARssQty"]} className="inv-sug-ord-qty" /></div></td>
                                                                                : <td></td> : null

                                                                    }

                                                                    {
                                                                        this.state.ColumnHide["ReturnToCFARSSCanshow"] == true ?
                                                                            w["ReturnToCFARssValue"].Header == "Value" && this.state.ColumnHide["ReturnToCFARssValue"] == true ?
                                                                                <td >Return To CFA/RSS<div> <input type="number" readOnly value={w["rate"]["val"] * w["ReturnToCFARssQty"]["val"]} className="inv-sug-ord-qty" /></div></td>
                                                                                : <td></td> : null

                                                                    }
                                                                </> : null}
                                                            {this.state.ColumnHide["ReturnToCFARssQty"] == true && this.state.ColumnHide["ReturnToCFARssSchQty"] == true ? <>
                                                                {
                                                                    this.state.ColumnHide["ReturnToCFARSSCanshow"] == true ?
                                                                        w["ReturnToCFARssQty"].Header == "Qty" && this.state.ColumnHide["ReturnToCFARssQty"] == true ?
                                                                            <td >Return To CFA/RSS<div> <input type="number" onChange={(event) => { this.updateprice(event, w["itemcode"], "ReturnToCFARssQty", w["rate"]["val"]) }} value={w["ReturnToCFARssQty"]["val"] == "" ? 0 : w["ReturnToCFARssQty"]["val"]} readOnly={this.state.readonly["ReturnToCFARssQty"]} className="inv-sug-ord-qty" /></div></td>
                                                                            : <td></td> : null

                                                                }
                                                                {
                                                                    this.state.ColumnHide["ReturnToCFARSSCanshow"] == true ?
                                                                        w["ReturnToCFARssSchQty"].Header == "Sch Qty" && this.state.ColumnHide["ReturnToCFARssSchQty"] == true ?
                                                                            <td >Return To CFA/RSS <div> <input type="number" onChange={(event) => { this.updateprice(event, w["itemcode"], "ReturnToCFARssSchQty", w["rate"]["val"]) }} value={w["ReturnToCFARssSchQty"]["val"] == "" ? 0 : parseInt(w["ReturnToCFARssSchQty"]["val"])} readOnly={this.state.readonly["ReturnToCFARssSchQty"]} className="inv-sug-ord-qty" /></div></td>
                                                                            : <td></td> : null

                                                                }
                                                                {
                                                                    this.state.ColumnHide["ReturnToCFARSSCanshow"] == true ?
                                                                        w["ReturnToCFARssValue"].Header == "Value" && this.state.ColumnHide["ReturnToCFARssValue"] == true ?
                                                                            <td >Return To CFA/RSS<div> <input type="number" readOnly value={w["rate"]["val"] * w["ReturnToCFARssQty"]["val"]} className="inv-sug-ord-qty" /></div></td>
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
                                                                                    value={this.state.readonly["closingschqty"] && this.props.selecSecSalesTypr == "2" && this.state.Clearvar == false ? w["closingschqty"]["val"] = parseInt(w["openingschqty"]["val"]) + parseInt(w["n_receipt_scheme"]["val"]) + parseInt(w["n_other_scheme"]["val"]) - w["n_scheme_qty"]["val"] : w["closingschqty"]["val"]}
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
                                                                                    value={this.state.readonly["n_closing_qty"] && this.props.selecSecSalesTypr == "2" && this.state.Clearvar == false ? w["n_closing_qty"]["val"] = parseInt(w["openingqty"]["val"]) + parseInt(w["n_receipt_qty"]["val"]) + parseInt(w["n_other_qty"]["val"]) - w["n_sales_qty"]["val"] : w["n_closing_qty"]["val"]} readOnly={this.state.readonly["n_closing_qty"]} className="inv-sug-ord-qty" /></div></td>
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
                                                                                    value={this.state.readonly["n_closing_qty"] && this.props.selecSecSalesTypr == "2" && this.state.Clearvar == false ? w["n_closing_qty"]["val"] = parseInt(w["openingqty"]["val"]) + parseInt(w["n_receipt_qty"]["val"]) + parseInt(w["n_other_qty"]["val"]) - w["n_sales_qty"]["val"] : w["n_closing_qty"]["val"]} readOnly={this.state.readonly["n_closing_qty"]} className="inv-sug-ord-qty" /></div></td>
                                                                                : <td></td> : null

                                                                    }
                                                                    {
                                                                        this.state.ColumnHide["ClosingCanShow"] == true ?
                                                                            w["closingschqty"].Header == "Sch Qty" && this.state.ColumnHide["closingschqty"] == true ?
                                                                                <td >Closing<div> <input type="text" onChange={(event) => { this.updateprice(event, w["itemcode"], "closingschqty", w["rate"]["val"]) }}
                                                                                    value={this.state.readonly["closingschqty"] && this.props.selecSecSalesTypr == "2" && this.state.Clearvar == false ? w["closingschqty"]["val"] = parseInt(w["openingschqty"]["val"]) + parseInt(w["n_receipt_scheme"]["val"]) + parseInt(w["n_other_scheme"]["val"]) - w["n_scheme_qty"]["val"] : w["closingschqty"]["val"]}
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

                                                                    <td >Trn Qty<div> <input type="text" onChange={(event) => { this.updateprice(event, w["itemcode"], "n_transit_qty", w["rate"]["val"]) }} value={w["n_transit_qty"]["val"] == "" ? 0 : w["n_transit_qty"]["val"]} readOnly={this.state.readonly["n_transit_qty"]} className="inv-sug-ord-qty" /></div></td>
                                                                    : null

                                                            }



                                                            {/* { 
                                                       Object.keys(w).map((a)=>
                                                       
                                                       <td ><div> <input type="text" className="inv-sug-ord-qty" min="0" placeholder={w["Header"]} /></div></td> 
                                                       )    } */}
                                                        </tr>
                                                    )
                                                })
                                            }
                                            {/* { this.props.data.map( (a)=>
                                          
                                          
                                        <tr>
                                                <td>{ a.c_name }</td>
                                                <td>100</td>
                                                <td>180.00</td>
                                                <td ><div> <input type="number" className="inv-sug-ord-qty" min="0" placeholder="0" /></div></td>
                                                <td ><div> <input type="number" className="inv-sug-ord-qty" min="0" placeholder="0" /></div></td>
                                                <td ><div> <input type="number" className="inv-sug-ord-qty" min="0" placeholder="0" /></div></td>
                                                <td ><div> <input type="number" className="inv-sug-ord-qty" min="0" placeholder="0" /></div></td>
                                                <td ><div> <input type="number" className="inv-sug-ord-qty" min="0" placeholder="0" /></div></td>
                                                <td ><div> <input type="number" className="inv-sug-ord-qty" min="0" placeholder="0" /></div></td>
                                                <td ><div> <input type="number" className="inv-sug-ord-qty" min="0" placeholder="0" /></div></td>
                                                <td ><div> <input type="number" className="inv-sug-ord-qty" min="0" placeholder="0" /></div></td>
                                                <td ><div> <input type="number" className="inv-sug-ord-qty" min="0" placeholder="0" /></div></td>
                                                <td ><div> <input type="number" className="inv-sug-ord-qty" min="0" placeholder="0" /></div></td>
                                                <td ><div> <input type="number" className="inv-sug-ord-qty" min="0" placeholder="0" /></div></td>
                                                <td ><div> <input type="number" className="inv-sug-ord-qty" min="0" placeholder="0" /></div></td>
                                                <td ><div> <input type="number" className="inv-sug-ord-qty" min="0" placeholder="0" /></div></td>
                                                <td ><div> <input type="number" className="inv-sug-ord-qty" min="0" placeholder="0" /></div></td>
                                                <td ><div> <input type="number" className="inv-sug-ord-qty" min="0" placeholder="0" /></div></td>
                                            </tr>
                                          
                                          
                                    )}
                                           */}
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
                                        <Form.Control as="textarea" rows="4" cols="50" disabled={(this.props.poolFlag == "0" || this.state.Clearvar == true || this.state.columnStatus == "2") ? true : false} placeholder='write here' maxLength="200" onChange={this.Remark} value={this.state.Clearvar == true ? this.state.nonoptstockistremark : this.state.remarks} />
                                    </Col>
                                </div>
                                {/* <div className="remarkdiv">
                                            <h4>Remarks</h4>
                                            <textarea onChange={this.Remark} values={this.state.remarks} id="w3mission" rows="4" cols="50" placeholder="Remark.."  >
                                            </textarea>
                                        </div> */}
                                <div className="remarkdiv">

                                    {this.state.itemRateRefreshButton == "1" ?
                                        <Button onClick={this.refreshItemRate} disabled={this.state.columnStatus == "2" ? true : false} className="sfcAddBtn-loaditem">Refresh Item Rate</Button> : null}

                                    <Button onClick={this.secondSalesSaveDet} disabled={(this.props.poolFlag == "0" || this.props.prevmonthEdit != "" || this.state.columnStatus == "2") ? true : false} className="sfcAddBtn-loaditem" >Submit</Button>

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

            </React.Fragment>
        )
    }
}
export default SmasterTable; 