import React, { Component } from 'react'
import { Form, Table } from 'react-bootstrap'
import { Dropdown } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { getRCPA } from '../../actions/DCR'
import { postToServer } from '../../lib/comm-utils'
import RCPAPopup from '../popups/RCPAPopup';

class CompititorDropdown extends Component {
    constructor(props) {
        super(props)
        this.state = {
            competitordata: [],
            list_compititor: [],
            bcode: "-1"
        }
        this.funCompititordropchange = this.funCompititordropchange.bind(this)
    }

    componentDidMount() {
        var list_compititor = []
        list_compititor.push({ id: '-1', key: '-1', text: 'Please Select  Competitor  ', value: '-1' })

        var date = new Date(),
        dateDay = '' + date.getDate(),
        dateMonth = '' + (date.getMonth() + 1),
        dateYear = date.getFullYear();

        if (dateMonth.length < 2) 
            dateMonth = '0' + dateMonth;
        if (dateDay.length < 2) 
            dateDay = '0' + dateDay;

        let todayDate = [dateDay, dateMonth, dateYear].join('/');

        let brandCode = ""
        if (this.props.brand != undefined && this.props.brand != '') {
            brandCode = this.props.brand
        }
        if (this.props.code != undefined && this.props.code != '') {
            brandCode = this.props.code
        }
        if (brandCode != "") {
            let requestData = { "Index": "ItemList", "DateReport": todayDate, "Data": { "brcode": brandCode } }

            // postToServer("RCPA_API", requestData).then((result) => {
                // if (result.data["Status"] == "Success") {
                    // if (Array.isArray(result.data.Result)) {
                        // let index = 0;
                        // result.data.Result.map((competitorProduct) => {
                        //     list_compititor.push({ id: index, key: competitorProduct.CltProduct, text: competitorProduct.CltProduct, value: competitorProduct.CltProduct, unitPrice: competitorProduct.CltVal })
                        //     index++
                        // })
                        if (this.props.C_COMPETITOR_PR_NAME == "") {
                            this.setState({
                                competitordata: list_compititor,
                                bcode: "-1"
                            })
                        } else {
                            this.setState({
                                competitordata: list_compititor,
                                bcode: this.props.C_COMPETITOR_PR_NAME
                            })
                        }

                        if (this.props.C_COMPETITOR_PR_NAME) {
                            let productName = this.props.C_COMPETITOR_PR_NAME
                
                            let unitPrice = "";
                            for (var i=0; i<this.props.competitordata.length; i++) {
                                if (this.props.competitordata[i].value == productName) {
                                    unitPrice = this.props.competitordata[i].unitPrice;
                                    break;
                                }
                            }
                
                            if (this.props.C_COMPETITOR_PR_NAME == "") {
                                this.setState({
                                    bcode: "-1"
                                })
                            } else {
                                this.setState({
                                    bcode: this.props.C_COMPETITOR_PR_NAME
                                })
                            }
                            this.props.fun__props_compititor(this.props.C_COMPETITOR_PR_NAME, unitPrice)
                        }
                    //}
               // }
            // }).catch((Error) => {
            //     // console.log(Error)
            // })
        // } else {
        //     if (this.props.C_COMPETITOR_PR_NAME) {
        //         let productName = this.props.C_COMPETITOR_PR_NAME
    
        //         let unitPrice = "";
        //         for (var i=0; i<this.state.competitordata.length; i++) {
        //             if (this.state.competitordata[i].value == productName) {
        //                 unitPrice = this.state.competitordata[i].unitPrice;
        //                 break;
        //             }
        //         }
    
        //         if (this.props.C_COMPETITOR_PR_NAME == "") {
        //             this.setState({
        //                 bcode: "-1"
        //             })
        //         } else {
        //             this.setState({
        //                 bcode: this.props.C_COMPETITOR_PR_NAME
        //             })
        //         }
        //         this.props.fun__props_compititor(this.props.C_COMPETITOR_PR_NAME, unitPrice)
        //     }
        // }

        // if (this.props.brand != undefined && this.props.brand != '') {
        //     const data = { "index": "RCPA_Comptator", "Data": { "Brand": this.props.brand } }
        //     postToServer("DCRAPI", data).then((result) => {
        //         if (result.data["Status"] == "success") {
        //             if (Array.isArray(result.data.Data)) {
        //                 result.data.Data.map((a, index) => {
        //                     list_compititor.push({ id: index, key: a["C_MFAC_NAME"], text: a.C_PRODUCT_NAME + '(' + a.C_MFAC_NAME + ')', value: a.C_PRODUCT_NAME })
        //                 })
        //                 this.setState({
        //                     competitordata: list_compititor,
        //                     bcode: this.props.C_COMPETITOR_PR_NAME
        //                 })
        //             }
        //         }
        //     }).catch((Error) => {
        //         console.log(Error)
        //     })
        // }
        // if (this.props.code != undefined && this.props.code != '') {
        //     const data = { "index": "RCPA_Comptator", "Data": { "Brand": this.props.code } }
        //     postToServer("DCRAPI", data).then((result) => {
        //         if (result.data["Status"] == "success") {
        //             if (Array.isArray(result.data.Data)) {
        //                 result.data.Data.map((a, index) => {
        //                     list_compititor.push({ id: index, key: a["C_MFAC_NAME"], text: a.C_PRODUCT_NAME + '(' + a.C_MFAC_NAME + ')', value: a.C_PRODUCT_NAME })
        //                 })
        //                 this.setState({
        //                     competitordata: list_compititor,
        //                     bcode: this.props.C_COMPETITOR_PR_NAME
        //                 })
        //             }
        //         }
        //     }).catch((Error) => {
        //         console.log(Error)
        //     })
        // }
    }
}
    componentDidUpdate(oldprop, oldstate) {
        if (oldprop.C_COMPETITOR_PR_NAME != this.props.C_COMPETITOR_PR_NAME) {
            const l = this.props.C_COMPETITOR_PR_NAME
            this.setState({
                bcode: l
            })
        }

        var date = new Date(),
        dateDay = '' + date.getDate(),
        dateMonth = '' + (date.getMonth() + 1),
        dateYear = date.getFullYear();

        if (dateMonth.length < 2) 
            dateMonth = '0' + dateMonth;
        if (dateDay.length < 2) 
            dateDay = '0' + dateDay;

        let todayDate = [dateDay, dateMonth, dateYear].join('/');

        let brandCode = ""
        if (this.props.brand != undefined && this.props.brand != '') {
            brandCode = this.props.brand
        }
        if (this.props.code != undefined && this.props.code != '') {
            brandCode = this.props.code
        }

        if (oldprop.brand != this.props.brand) {
            var list_compititor = []
            list_compititor.push({ id: '-1', key: '-1', text: 'Please Select  Competitor  ', value: '-1' })

            let requestData = { "Index": "ItemList", "DateReport": todayDate, "Data": { "brcode": brandCode } }

            postToServer("RCPA_API", requestData).then((result) => {
                if (result.data["Status"] == "Success") {
                    if (Array.isArray(result.data.Result)) {
                        let index = 0;
                        result.data.Result.map((competitorProduct) => {
                            list_compititor.push({ id: index, key: competitorProduct.CltProduct, text: competitorProduct.CltProduct, value: competitorProduct.CltProduct, unitPrice: competitorProduct.CltVal })
                            index++
                        })
                        this.setState({
                            competitordata: list_compititor
                        })
                    }
                }
            }).catch((Error) => {
                // console.log(Error)
            })

            if (oldprop.code != this.props.code) {
                var list_compititor = []
                list_compititor.push({ id: '-1', key: '-1', text: 'Please Select  Compititor  ', value: '-1' })
                let data = { "Index": "ItemList", "DateReport": todayDate, "Data": { "brcode": brandCode } }
                postToServer("RCPA_API", data).then((result) => {
                    if (result.data["Status"] == "Success") {
                        if (Array.isArray(result.data.Result)) {
                            let index = 0;
                            result.data.Result.map((competitorProduct) => {
                                list_compititor.push({ id: index, key: competitorProduct.CltProduct, text: competitorProduct.CltProduct, value: competitorProduct.CltProduct, unitPrice: competitorProduct.CltVal })
                                index++
                            })
                            this.setState({
                                competitordata: list_compititor
                            })
                        }
                    }
                }).catch((Error) => {
                    // console.log(Error)
                })
            }
        }

        // if (oldprop.brand != this.props.brand) {
        //     var list_compititor = []
        //     list_compititor.push({ id: '-1', key: '-1', text: 'Please Select  Compititor  ', value: '-1' })
        //     const data = { "index": "RCPA_Comptator", "Data": { "Brand": this.props.brand } }
        //     postToServer("DCRAPI", data).then((result) => {
        //         if (result.data["Status"] == "success") {
        //             if (Array.isArray(result.data.Data)) {
        //                 result.data.Data.map((a, index) => {
        //                     list_compititor.push({ id: index, key: a["C_MFAC_NAME"], text: a.C_PRODUCT_NAME + '(' + a.C_MFAC_NAME + ')', value: a.C_PRODUCT_NAME })
        //                 })
        //                 this.setState({ competitordata: list_compititor })
        //             }
        //         }
        //     }).catch((Error) => {
        //         console.log(Error)
        //     })
        //     if (oldprop.code != this.props.code) {
        //         var list_compititor = []
        //         list_compititor.push({ id: '-1', key: '-1', text: 'Please Select  Compititor  ', value: '-1' })
        //         const data = { "index": "RCPA_Comptator", "Data": { "Brand": this.props.code } }
        //         postToServer("DCRAPI", data).then((result) => {
        //             if (result.data["Status"] == "success") {
        //                 if (Array.isArray(result.data.Data)) {
        //                     result.data.Data.map((a, index) => {
        //                         list_compititor.push({ id: index, key: a["C_MFAC_NAME"], text: a.C_PRODUCT_NAME + '(' + a.C_MFAC_NAME + ')', value: a.C_PRODUCT_NAME })
        //                     })
        //                     this.setState({ competitordata: list_compititor })
        //                 }
        //             }
        //         }).catch((Error) => {
        //             console.log(Error)
        //         })
        //     }
        // }
    }

    funCompititordropchange(event, value) {
				let previousval = ''
        if (event.key == undefined) {
            let productName = value.value

            let unitPrice = "";
            for (var i=0; i<this.props.competitordata.length; i++) {
                if (this.props.competitordata[i].value == productName) {
                    unitPrice = this.props.competitordata[i].unitPrice;
                    break;
                }
            }
            if(this.state.bcode != -1){
              if(this.state.bcode != value.value){
								previousval = this.state.bcode
							}
            }
            this.setState({ bcode: value.value })
            this.props.fun__props_compititor(value.value, unitPrice,previousval)
        }
    }

    render() {
        return (
            <td>
                <Dropdown 
                    onChange={this.funCompititordropchange}
                    fluid selection options={this.props.competitordata}
                    style={this.state.bcode == -1 ? { "color": "#495057" } : { "color": "black" }}
                    value={this.state.bcode}
                />
            </td>
        );
    }
}

export default CompititorDropdown