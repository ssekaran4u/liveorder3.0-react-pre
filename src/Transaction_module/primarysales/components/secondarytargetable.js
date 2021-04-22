import React from 'react'
import { Component } from 'react';
import { Button, Col, Row, Form } from 'react-bootstrap'
import { Dropdown } from 'semantic-ui-react'
import { postToServer } from '../../../lib/comm-utils'
import Drop from './../../../BasicComponet/DropDown'
import Geocode from "react-geocode";
import Text from './../../../BasicComponet/Text'
import { withRouter } from 'react-router-dom'
import { URL_SALES } from '../../../lib/constants'
import '../../../../public/assets/css/sfcstyle.css'
import '../../../../public/assets/css/transactionmodule.css'
import Secondarytargetbody from './secondarytargetbody';
import SfaModal from "./../../../BasicComponet/sfaModal";



class Secondarytargetable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isFull: false,
            headershow: false,
            qty: [],
            loaditems: [],
            clicksave:"",
            fshqnamecode: [],
            fshqcode: [],
            targetypecode: [],
            typedatcode: [],
            yeardatcode: [],
            rowperPage: 10,
            showSuccess: false,
        }
        this.handleView = this.handleView.bind(this)
        this.onQtyChange = this.onQtyChange.bind(this)
        this.getLoaditem = this.getTotalqty.bind(this)
        this.getTotalvalue = this.getTotalvalue.bind(this)
        this.getGrandqty = this.getGrandqty.bind(this)
        this.getGrandvalue = this.getGrandvalue.bind(this)
        this.onClicksave = this.onClicksave.bind(this)
        this.showpage = this.showpage.bind(this)
        this.onSuccess = this.onSuccess.bind(this)
    }

    onSuccess() {
        this.setState({ showSuccess: false })
        this.props.hideTableCopy()

    }

    showpage(pgno) {
        this.setState({ rowperPage: pgno })
    }


    handleView() {
        this.setState({
            isFull: !this.state.isFull
        });
    }
    getTotalqty(list) {
        //   console.log(list)
        let totalqty = 0
        totalqty =
            (list.month1 == "" ? 0 : parseInt(list.month1))
            + (list.month2 == "" ? 0 : parseInt(list.month2))
            + (list.month3 == "" ? 0 : parseInt(list.month3))
            + (list.month4 == "" ? 0 : parseInt(list.month4))
            + (list.month5 == "" ? 0 : parseInt(list.month5))
            + (list.month6 == "" ? 0 : parseInt(list.month6))
            + (list.month7 == "" ? 0 : parseInt(list.month7))
            + (list.month8 == "" ? 0 : parseInt(list.month8))
            + (list.month9 == "" ? 0 : parseInt(list.month9))
            + (list.month10 == "" ? 0 : parseInt(list.month10))
            + (list.month11 == "" ? 0 : parseInt(list.month11))
            + (list.month12 == "" ? 0 : parseInt(list.month12))
        return totalqty
    }

    getTotalvalue(list) {
        // console.log(list.rate,"rate")
        let totalvalue = 0
        let totalqty = 0
        totalqty =
            (list.month1 == "" ? 0 : parseInt(list.month1))
            + (list.month2 == "" ? 0 : parseInt(list.month2))
            + (list.month3 == "" ? 0 : parseInt(list.month3))
            + (list.month4 == "" ? 0 : parseInt(list.month4))
            + (list.month5 == "" ? 0 : parseInt(list.month5))
            + (list.month6 == "" ? 0 : parseInt(list.month6))
            + (list.month7 == "" ? 0 : parseInt(list.month7))
            + (list.month8 == "" ? 0 : parseInt(list.month8))
            + (list.month9 == "" ? 0 : parseInt(list.month9))
            + (list.month10 == "" ? 0 : parseInt(list.month10))
            + (list.month11 == "" ? 0 : parseInt(list.month11))
            + (list.month12 == "" ? 0 : parseInt(list.month12))
        // totalqty=parseInt(list.month1)+parseInt(list.month2)+parseInt(list.month3)+parseInt(list.month4)+parseInt(list.month5)+parseInt(list.month6)+parseInt(list.month7)+parseInt(list.month8)+parseInt(list.month9)+parseInt(list.month10)+parseInt(list.month11)+parseInt(list.month12)
        totalvalue = totalqty * list.rate
        // console.log(totalvalue,"total")
        return totalvalue.toFixed(2)
    }

    getGrandqty() {
        let grandqty = 0
        let loadList = this.state.loaditems;
        // console.log(loadList,"data")
        loadList.map((list) => {
            grandqty = grandqty + (list.month1 == "" ? 0 : parseInt(list.month1))
                + (list.month2 == "" ? 0 : parseInt(list.month2))
                + (list.month3 == "" ? 0 : parseInt(list.month3))
                + (list.month4 == "" ? 0 : parseInt(list.month4))
                + (list.month5 == "" ? 0 : parseInt(list.month5))
                + (list.month6 == "" ? 0 : parseInt(list.month6))
                + (list.month7 == "" ? 0 : parseInt(list.month7))
                + (list.month8 == "" ? 0 : parseInt(list.month8))
                + (list.month9 == "" ? 0 : parseInt(list.month9))
                + (list.month10 == "" ? 0 : parseInt(list.month10))
                + (list.month11 == "" ? 0 : parseInt(list.month11))
                + (list.month12 == "" ? 0 : parseInt(list.month12))

        })
        return grandqty
    }

    getGrandvalue() {
        let grandvalue = 0
        let loadList = this.state.loaditems;
        loadList.map((list) => {
            grandvalue = grandvalue + (list.month1 == "" ? 0 : parseInt(list.month1) * list.rate)
                + (list.month2 == "" ? 0 : parseInt(list.month2) * list.rate)
                + (list.month3 == "" ? 0 : parseInt(list.month3) * list.rate)
                + (list.month4 == "" ? 0 : parseInt(list.month4) * list.rate)
                + (list.month5 == "" ? 0 : parseInt(list.month5) * list.rate)
                + (list.month6 == "" ? 0 : parseInt(list.month6) * list.rate)
                + (list.month7 == "" ? 0 : parseInt(list.month7) * list.rate)
                + (list.month8 == "" ? 0 : parseInt(list.month8) * list.rate)
                + (list.month9 == "" ? 0 : parseInt(list.month9) * list.rate)
                + (list.month10 == "" ? 0 : parseInt(list.month10) * list.rate)
                + (list.month11 == "" ? 0 : parseInt(list.month11) * list.rate)
                + (list.month12 == "" ? 0 : parseInt(list.month12) * list.rate)
        })
        return grandvalue.toFixed(2)
    }

    onClicksave() {

        let data = ""
        if (this.state.typedatcode == "0") {
            this.state.loaditems.map(res => {
                // console.log(this.state.fshqnamecode,"fshqnamecode")
                data += this.state.fshqnamecode + "^" + res.itemcode + "^" + res.rate + "^" + this.state.yeardatcode + "^" + this.state.targetypecode + "^" + this.state.typedatcode + "^" + this.state.fshqcode + "^" + (res.month1 == "" ? 0 : parseInt(res.month1)) + "|" + (res.month2 == "" ? 0 : parseInt(res.month2)) + "|" + (res.month3 == "" ? 0 : parseInt(res.month3)) + "|" + (res.month4 == "" ? 0 : parseInt(res.month4)) + "|" + (res.month5 == "" ? 0 : parseInt(res.month5)) + "|" + (res.month6 == "" ? 0 : parseInt(res.month6)) + "|" + (res.month7 == "" ? 0 : parseInt(res.month7)) + "|" + (res.month8 == "" ? 0 : parseInt(res.month8)) + "|" + (res.month9 == "" ? 0 : parseInt(res.month9)) + "|" + (res.month10 == "" ? 0 : parseInt(res.month10)) + "|" + (res.month11 == "" ? 0 : parseInt(res.month11)) + "|" + (res.month12 == "" ? 0 : parseInt(res.month12)) + "~"
            })
        } else {
            this.state.loaditems.map(res => {
                // console.log(this.state.fshqnamecode,"fshqnamecode")
                data += this.state.fshqnamecode + "^" + res.itemcode + "^" + res.rate + "^" + this.state.yeardatcode + "^" + this.state.targetypecode + "^" + this.state.typedatcode + "^" + this.state.fshqcode + "^" + (res.month4 == "" ? 0 : parseInt(res.month4)) + "|" + (res.month5 == "" ? 0 : parseInt(res.month5)) + "|" + (res.month6 == "" ? 0 : parseInt(res.month6)) + "|" + (res.month7 == "" ? 0 : parseInt(res.month7)) + "|" + (res.month8 == "" ? 0 : parseInt(res.month8)) + "|" + (res.month9 == "" ? 0 : parseInt(res.month9)) + "|" + (res.month10 == "" ? 0 : parseInt(res.month10)) + "|" + (res.month11 == "" ? 0 : parseInt(res.month11)) + "|" + (res.month12 == "" ? 0 : parseInt(res.month12)) + "|" + (res.month1 == "" ? 0 : parseInt(res.month1)) + "|" + (res.month2 == "" ? 0 : parseInt(res.month2)) + "|" + (res.month3 == "" ? 0 : parseInt(res.month3)) + "~"
            })
        }
        // console.log(data, "data")

        var clicksavedata = {
            "Index": "SecondarySalesTargetSaveUpdate",
            "Data": {
                "YearType": this.state.typedatcode,
                "items": data.substr(0, data.length - 1).trim()
            }
            // "items":"MR2^FR05J10^83.37^2020^T00001^0^0^1|20|3|4|5|6|7|8|9|10|11|12~MR2^FR05J06^100^2020^T00001^0^0^11|22|33|44|55|66|77|88|99|100|1001|1002~MR2^121^12^2020^T00001^0^0^0|0|0|0|0|0|0|0|0|0|0|0~MR2^FR02H28^23^2020^T00001^0^0^0|0|0|0|0|0|0|0|0|0|0|0~MR2^FR02H26^0^2020^T00001^0^0^0|0|0|0|0|0|0|0|0|0|0|0~MR2^FR03J21^65^2020^T00001^0^0^0|0|0|0|0|0|0|0|0|0|0|0~MR2^FR03H26^60.62^2020^T00001^0^0^0|0|0|0|0|0|0|0|0|0|0|0~MR2^FR05H26^5.75^2020^T00001^0^0^0|0|0|0|0|0|0|0|0|0|0|0~MR2^FR05J04^48.6^2020^T00001^0^0^0|0|0|0|0|0|0|0|0|0|0|0~MR2^FR03H49^200^2020^T00001^0^0^0|0|0|0|0|0|0|0|0|0|0|0~MR2^FR03H50^100^2020^T00001^0^0^0|0|0|0|0|0|0|0|0|0|0|0~MR2^IT0010101^15^2020^T00001^0^0^0|0|0|0|0|0|0|0|0|0|0|0"},
        }
        // console.log(clicksavedata, "clicksavedtaa")
        postToServer(URL_SALES, clicksavedata).then((response) => {
            // console.log(response, "clicksavedata")
            if (response.status == 200 ) {
                // alert("Saved successfully")
                this.setState({ clicksave: response.data.data[0].result })
                this.setState({ showSuccess: true })
                // this.props.hideTableCopy()

            }
        }).catch((Error) => {
            this.setState({ Error: true, Errormsg: "Error in Api At Primary Sale Target" })
        })
    }


    // UNSAFE_componentWillReceiveProps(nextProps){
    //     console.log(nextProps, "ites")
    // if(nextProps.loaditems){
    //     this.setState({loaditems: nextProps.loaditems})
    //   }
    // }

    static getDerivedStateFromProps(loadprops, state) {
        // console.log(loadprops, "loadprops")
        if (loadprops) {
            return {
                loaditems: loadprops.loaditems,
                fshqnamecode: loadprops.fshqnamecode,
                fshqcode: loadprops.fshqcode,
                targetypecode: loadprops.targetypecode,
                typedatcode: loadprops.typedatcode,
                yeardatcode: loadprops.yeardatcode,
            }
        }
    }

    // componentDidUpdate(prevProps, prevState){
    //     console.log(prevProps, "prevProps")
    // }

    onQtyChange(code, event, month) {
        let loadList = this.state.loaditems;
        //   let { name, value } = event.target;
        // if (value.length >= 4) {
        //     value = value.slice(0, 4);
        //    }

        //      if (name === "january") {
        //   console.log(value.length);

        //     var quanty = /^[[0-9]{4}]*$/;
        //      if (quanty.test(value)) {
        //        this.setState({qtyerror:""})
        //     }  else{
        //         alert("Enter only 4 digit num")
        //     }
        // }

        // console.log(loadList, "load")
        for (let i = 0; i < loadList.length; i++) {
            // console.log(code,loadList[i].itemcode, "code")
            if (loadList[i].itemcode == code) {
                let newValue = event.target.value;
                // console.log(newValue, "value")
                if(isNaN(newValue)){
                    newValue = 0;
               }
                if (month == "jan") {
                    loadList[i].month1 = newValue;
                }
                if (month == "feb") {
                    loadList[i].month2 = newValue;
                }
                if (month == "march") {
                    loadList[i].month3 = newValue;
                }
                if (month == "april") {
                    loadList[i].month4 = newValue;
                }
                if (month == "may") {
                    loadList[i].month5 = newValue;
                }
                if (month == "june") {
                    loadList[i].month6 = newValue;
                }
                if (month == "july") {
                    loadList[i].month7 = newValue;
                }
                if (month == "aug") {
                    loadList[i].month8 = newValue;
                }
                if (month == "spet") {
                    loadList[i].month9 = newValue;
                }
                if (month == "oct") {
                    loadList[i].month10 = newValue;
                }
                if (month == "nov") {
                    loadList[i].month11 = newValue;
                }
                if (month == "dec") {
                    loadList[i].month12 = newValue;
                }
                // console.log(loadList[i].month1, "month1")
                // console.log(loadList[i].month2, "month2")
                // console.log(loadList[i].month3, "month3")
                // console.log(loadList[i].month4, "month4")
                // console.log(loadList[i].month5, "month5")
                // console.log(loadList[i].month6, "month6")
                // console.log(loadList[i].month7, "month7")
                // console.log(loadList[i].month8, "month8")
                // console.log(loadList[i].month9, "month9")
                // console.log(loadList[i].month10, "month10")
                // console.log(loadList[i].month11, "month11")
                // console.log(loadList[i].month12, "month12")
                // loadList[i].totalqty = parseInt(loadList[i].month1) + parseInt(loadList[i].month2) +parseInt(loadList[i].month3) +parseInt(loadList[i].month4) +parseInt(loadList[i].month5) +parseInt(loadList[i].month6) +parseInt(loadList[i].month7) +parseInt(loadList[i].month8) +parseInt(loadList[i].month9) +parseInt(loadList[i].month10) +parseInt(loadList[i].month11) +parseInt(loadList[i].month12) 
                // loadList[i].totalvalue = loadList[i].totalqty * loadList[i].rate
                break;
            }
        }
        this.setState({ loaditems: loadList })
        // console.log(this.state.loaditems)
    }


    render() {

        // console.log(this.state.loaditems, "loaditems")
        // console.log(this.props.typedatcode, "typedatcode")
        // console.log(this.props.loaditems)
        // console.log(this.state.fshqnamecode, "fshqnamecode")
        // console.log(this.state.fshqcode, "fshqcode")
        // console.log(this.state.targetypecode, "targetypecode")
        // console.log(this.state.typedatcode, "typedatcode")
        // console.log(this.state.yeardatcode, "yeardatcode")

        // console.log(this.state.clicksave.data, "clicksave")
        // console.log(this.state.showSuccess, "showSuccess")

        var header
        if (this.props.typedatcode == "0") {
            header = [
                { prop: 'itemname', title: 'Item Name/Pack', filterable: true },
                { prop: 'code', title: 'Code', filterable: true },
                { prop: 'rate', title: 'Rate', filterable: true },
                { prop: 'jan', title: 'Jan', filterable: true },
                { prop: 'feb', title: 'Feb', filterable: true },
                { prop: 'march', title: 'Mar', filterable: true },
                { prop: 'april', title: 'Apr', filterable: true },
                { prop: 'may', title: 'May', filterable: true },
                { prop: 'june', title: 'Jun', filterable: true },
                { prop: 'july', title: 'Jul', filterable: true },
                { prop: 'august', title: 'Aug', filterable: true },
                { prop: 'spet', title: 'Sep', filterable: true },
                { prop: 'octo', title: 'Oct', filterable: true },
                { prop: 'nov', title: 'Nov', filterable: true },
                { prop: 'dec', title: 'Dec', filterable: true },
                { prop: 'totalqty', title: 'Total Qty', filterable: true },
                { prop: 'totalvalue', title: 'Total Value', filterable: true },
            ];
        }
        else if (this.props.typedatcode == "1") {
            header = [
                { prop: 'itemname', title: 'Item Name/Pack', filterable: true },
                { prop: 'code', title: 'Code', filterable: true },
                { prop: 'rate', title: 'Rate', filterable: true },
                { prop: 'april', title: 'Apr', filterable: true },
                { prop: 'may', title: 'May', filterable: true },
                { prop: 'june', title: 'Jun', filterable: true },
                { prop: 'july', title: 'Jul', filterable: true },
                { prop: 'august', title: 'Aug', filterable: true },
                { prop: 'spet', title: 'Sep', filterable: true },
                { prop: 'octo', title: 'Oct', filterable: true },
                { prop: 'nov', title: 'Nov', filterable: true },
                { prop: 'dec', title: 'Dec', filterable: true },
                { prop: 'jan', title: 'Jan', filterable: true },
                { prop: 'feb', title: 'Feb', filterable: true },
                { prop: 'march', title: 'Mar', filterable: true },
                { prop: 'totalqty', title: 'Total Qty', filterable: true },
                { prop: 'totalvalue', title: 'Total Value', filterable: true },
            ];
        }


        // const header = [
        //     { prop: 'itemname', title: 'Item Name/Pack', filterable: true },
        //     { prop: 'code', title: 'Code', filterable: true },
        //     { prop: 'rate', title: 'Rate', filterable: true },
        //     { prop: 'jan', title: 'Jan', filterable: true },
        //     { prop: 'feb', title: 'Feb', filterable: true },
        //     { prop: 'march', title: 'Mar', filterable: true },
        //     { prop: 'april', title: 'Apr', filterable: true },
        //     { prop: 'may', title: 'May', filterable: true },
        //     { prop: 'june', title: 'Jun', filterable: true },
        //     { prop: 'july', title: 'Jul', filterable: true },
        //     { prop: 'august', title: 'Aug', filterable: true },
        //     { prop: 'spet', title: 'Spet', filterable: true },
        //     { prop: 'octo', title: 'Oct', filterable: true },
        //     { prop: 'nov', title: 'Nov', filterable: true },
        //     { prop: 'dec', title: 'Dec', filterable: true },
        //     { prop: 'totalqty', title: 'Total Qty', filterable: true },
        //     { prop: 'totalvalue', title: 'Total Value', filterable: true },
        // ];



        const customLabels = {
            first: "<<",
            last: ">>",
            prev: "< Prev",
            next: "Next >",
            show: "Show",
            entries: "items/page",
            filterPlaceholder: "Search",
            noResults: "There is no data to be displayed"
        };

        //  const body = [
        //      {itemname:'dolo', code:'123', rate:'10.00', target:'1000', target1:'1',  totalqty: '100', totalvalue: '100'},
        //      {itemname:'amcard', code:'123', rate:'10.00', target:'1000',  target1:'1',totalqty: '100',totalvalue: '100'},
        //      {itemname:'doxoven', code:'123', rate:'10.00', target:'1000', target1:'1', totalqty: '100',totalvalue: '100'},
        //      {itemname:'calpol', code:'123', rate:'10.00', target:'1000',  target1:'1',totalqty: '100',totalvalue: '100'},
        //      {itemname:'codo', code:'123', rate:'10.00', target:'1000',  target1:'1',totalqty: '100',totalvalue: '100'},
        //      {itemname:'orss', code:'123', rate:'10.00', target:'1000',  target1:'1',totalqty: '100',totalvalue: '100'},
        //      {itemname:'vicco', code:'123', rate:'10.00', target:'1000',  target1:'1',totalqty: '100',totalvalue: '100'},
        //      {itemname:'vicks', code:'123', rate:'10.00', target:'1000',  target1:'1',totalqty: '100',totalvalue: '100'},
        //      {itemname:'zandu', code:'123', rate:'10.00', target:'1000',  target1:'1',totalqty: '100',totalvalue: '100'},
        //      {target1:'grand', total:"5000"}
        //     ];  

        var body = []
        {
            this.state.loaditems ? this.state.loaditems.map((list) => {
                body.push({
                    itemname: list.itemname,
                    code: list.itemcode,
                    rate: list.rate,
                    jan: <div><input
                        type="text"
                        className="inv-sug-ord-qty"
                        onChange={(event) => this.onQtyChange(list.itemcode, event, "jan")}
                        value={list.month1 == "" ? 0 : parseInt(list.month1)}
                        min="0"
                        pattern="\d*"
                        maxlength="4"
                        onWheel={event => event.currentTarget.blur()}

                    /></div>,
                    feb: <div><input
                        type="text"
                        className="inv-sug-ord-qty"
                        onChange={(event) => this.onQtyChange(list.itemcode, event, "feb")}
                        value={list.month2 == "" ? 0 : parseInt(list.month2)}
                        min="0"
                        pattern="\d*"
                        maxlength="4"
                        onWheel={event => event.currentTarget.blur()}

                    /></div>,
                    march: <div><input
                        type="text"
                        className="inv-sug-ord-qty"
                        onChange={(event) => this.onQtyChange(list.itemcode, event, "march")}
                        value={list.month3 == "" ? 0 : parseInt(list.month3)}
                        min="0"
                        pattern="\d*"
                        maxlength="4"
                        onWheel={event => event.currentTarget.blur()}

                    /></div>,
                    april: <div><input
                        type="text"
                        className="inv-sug-ord-qty"
                        onChange={(event) => this.onQtyChange(list.itemcode, event, "april")}
                        value={list.month4 == "" ? 0 : parseInt(list.month4)}
                        min="0"
                        pattern="\d*"
                        maxlength="4"
                        onWheel={event => event.currentTarget.blur()}

                    /></div>,
                    may: <div><input
                        type="text"
                        className="inv-sug-ord-qty"
                        onChange={(event) => this.onQtyChange(list.itemcode, event, "may")}
                        value={list.month5 == "" ? 0 : parseInt(list.month5)}
                        min="0"
                        pattern="\d*"
                        maxlength="4"
                        onWheel={event => event.currentTarget.blur()}

                    /></div>,
                    june: <div><input
                        type="text"
                        className="inv-sug-ord-qty"
                        onChange={(event) => this.onQtyChange(list.itemcode, event, "june")}
                        value={list.month6 == "" ? 0 : parseInt(list.month6)}
                        min="0"
                        pattern="\d*"
                        maxlength="4"
                        onWheel={event => event.currentTarget.blur()}

                    /></div>,
                    july: <div><input
                        type="text"
                        className="inv-sug-ord-qty"
                        onChange={(event) => this.onQtyChange(list.itemcode, event, "july")}
                        value={list.month7 == "" ? 0 : parseInt(list.month7)}
                        min="0"
                        pattern="\d*"
                        maxlength="4"
                        onWheel={event => event.currentTarget.blur()}

                    /></div>,
                    august: <div><input
                        type="text"
                        className="inv-sug-ord-qty"
                        onChange={(event) => this.onQtyChange(list.itemcode, event, "aug")}
                        value={list.month8 == "" ? 0 : parseInt(list.month8)}
                        min="0"
                        pattern="\d*"
                        maxlength="4"
                        onWheel={event => event.currentTarget.blur()}

                    /></div>,
                    spet: <div><input
                        type="text"
                        className="inv-sug-ord-qty"
                        onChange={(event) => this.onQtyChange(list.itemcode, event, "spet")}
                        value={list.month9 == "" ? 0 : parseInt(list.month9)}
                        min="0"
                        pattern="\d*"
                        maxlength="4"
                        onWheel={event => event.currentTarget.blur()}

                    /></div>,
                    octo: <div><input
                        type="text"
                        className="inv-sug-ord-qty"
                        onChange={(event) => this.onQtyChange(list.itemcode, event, "oct")}
                        value={list.month10 == "" ? 0 : parseInt(list.month10)}
                        min="0"
                        pattern="\d*"
                        maxlength="4"
                        onWheel={event => event.currentTarget.blur()}

                    /></div>,
                    nov: <div><input
                        type="text"
                        className="inv-sug-ord-qty"
                        onChange={(event) => this.onQtyChange(list.itemcode, event, "nov")}
                        value={list.month11 == "" ? 0 : parseInt(list.month11)}
                        min="0"
                        pattern="\d*"
                        maxlength="4"
                        onWheel={event => event.currentTarget.blur()}

                    /></div>,
                    dec: <div><input
                        type="text"
                        className="inv-sug-ord-qty"
                        onChange={(event) => this.onQtyChange(list.itemcode, event, "dec")}
                        value={list.month12 == "" ? 0 : parseInt(list.month12)}
                        min="0"
                        pattern="\d*"
                        maxlength="4"
                        onWheel={event => event.currentTarget.blur()}

                    /></div>,
                    totalqty: this.getTotalqty(list),
                    // totalqty:parseFloat(list.totalqty),
                    totalvalue: this.getTotalvalue(list),
                    // totalvalue=parseFloat(list.totalvalue)
                })
            }) : null
        }

        // console.log(body, "body")
        // if (this.state.loaditems.length > 0) {
        //     this.props.typedatcode == "0" ?
        //         body.push({
        //             "dec": "Grand Total",
        //             "totalqty": this.getGrandqty(),
        //             "totalvalue":this.getGrandvalue(),
        //         }) :
        //         body.push({
        //             "march": "Grand Total",
        //             "totalqty": this.getGrandqty(),
        //             "totalvalue": this.getGrandvalue(),
        //         })
        // }


        var successText = <div className="expense-success-msg">{this.state.clicksave} !</div>


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

                            <div className="sfc-head-edit targetdetail-head">
                                <div>
                                    <h5 className="sfc-list-sec-head targetdet">
                                        Target Details
                                   </h5>
                                </div>

                                <div className="sfc-head-edit-options">
                                    {/* {this.state.loaditems.length > 0 ?
                                        <button className="remarksubmit" onClick={() => this.onClicksave()} >Save</button> : null} */}
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

                            <Secondarytargetbody
                                tableHeader={header}
                                tableBody={body}
                                keyName="userTable"
                                tableClass="striped hover table-responsive"
                                // rowsPerPage={10}
                                // rowsPerPage={this.state.rowperPage}
                                showpage={this.showpage}
                                rowsPerPageOption={this.state.loaditems.length}
                                initialSort={{ prop: "username", isAscending: true, }}
                                labels={customLabels}
                                getGrandqty={this.getGrandqty()}
                                getGrandvalue={this.getGrandvalue()}
                                loaditems={this.state.loaditems}
                                onClicksave={this.onClicksave}
                            />
                        </div>
                    </div>

                </div>
            </React.Fragment>

        )
    }
}
export default Secondarytargetable;        