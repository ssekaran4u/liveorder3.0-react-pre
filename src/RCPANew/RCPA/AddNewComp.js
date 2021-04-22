
import React, { Component } from 'react'
import { Form, Table } from 'react-bootstrap'
import { Dropdown } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { getRCPA } from '../../actions/DCR'
import { postToServer } from '../../lib/comm-utils'
import RCPAPopup from '../popups/RCPAPopup';
import NewCompRow from '../RCPA/NewCompRow'

class AddNewComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            compitordetails: {},
            competitordata: [],
            list_compititor: [],
            bcode: "-1"
        }
        this.func_compitior_data = this.func_compitior_data.bind(this)
        // this.removeCompetitor = this.removeCompetitor.bind(this)
    }

    func_compitior_data(oldData, data,previousval) {
        const brand = this.props.brandcode
        let selectedProductcomptitor = this.state.compitordetails
        // if (selectedProductcomptitor[brand]) {
        //     let temdata = selectedProductcomptitor[brand]
        //     const datakey = Object.keys(data)
        //     selectedProductcomptitor[brand][datakey] = data[datakey]
        //     this.setState({ compitordetails: selectedProductcomptitor })
        // } else {
            const datakey = Object.keys(data)
            selectedProductcomptitor[brand] = {}
            selectedProductcomptitor[brand][datakey] = data[datakey]
            this.setState({ compitordetails: selectedProductcomptitor })
        this.props.func_compitior_data(oldData, data, brand, previousval)
    }
    // componentDidUpdate(prevProps, prevState){
		// 	debugger
		// 		var date = new Date(),
    //     dateDay = '' + date.getDate(),
    //         dateMonth = '' + (date.getMonth() + 1),
    //         dateYear = date.getFullYear();

    //         if (dateMonth.length < 2) 
    //             dateMonth = '0' + dateMonth;
    //         if (dateDay.length < 2) 
    //             dateDay = '0' + dateDay;
    //     let todayDate = [dateDay, dateMonth, dateYear].join('/');
    //     if(prevProps.brandcode != this.props.brandcode){
    //     var list_compititor = []
    //         list_compititor.push({ id: '-1', key: '-1', text: 'Please Select  Competitor  ', value: '-1' })

    //         let requestData = { "Index": "ItemList", "DateReport": todayDate, "Data": { "brcode": this.props.brandcode } }

    //         postToServer("RCPA_API", requestData).then((result) => {
    //             if (result.data["Status"] == "Success") {
    //                 if (Array.isArray(result.data.Result)) {
    //                     let index = 0;
    //                     result.data.Result.map((competitorProduct) => {
    //                         list_compititor.push({ id: index, key: competitorProduct.CltProduct, text: competitorProduct.CltProduct, value: competitorProduct.CltProduct, unitPrice: competitorProduct.CltVal })
    //                         index++
    //                     })
    //                     this.setState({
    //                         competitordata: list_compititor
    //                     })
    //                 }
    //             }
    //         }).catch((Error) => {
    //             // console.log(Error)
    //         })
		// 		}
		// 		if(prevProps.newlyadded != this.props.newlyadded){
		// 			var list_compititor = []
		// 			list_compititor.push({ id: '-1', key: '-1', text: 'Please Select  Compititor  ', value: '-1' })
		// 			let data = { "Index": "ItemList", "DateReport": todayDate, "Data": { "brcode": this.props.brandcode } }
		// 			postToServer("RCPA_API", data).then((result) => {
		// 					if (result.data["Status"] == "Success") {
		// 							if (Array.isArray(result.data.Result)) {
		// 									let index = 0;
		// 									result.data.Result.map((competitorProduct) => {
		// 											list_compititor.push({ id: index, key: competitorProduct.CltProduct, text: competitorProduct.CltProduct, value: competitorProduct.CltProduct, unitPrice: competitorProduct.CltVal })
		// 											index++
		// 									})
		// 									this.setState({
		// 											competitordata: list_compititor
		// 									})
		// 							}
		// 					}
		// 			}).catch((Error) => {
		// 					// console.log(Error)
		// 			})
		// 	}
    // }
    render() {
        var rowdata = this.props.newRows;
        var Btn = this.props.addBtn
        const brand = this.props.brandcode
        const code = this.props.code
        const comdata = []
        const func_compitior_data = this.func_compitior_data
        const loadRCP = this.props.loadRCP
        const _this = this
        let removeButtonState = false
        if (this.props.newproducts.length > 1) {
            removeButtonState = true
        }
        var newproduct = this.props.newproducts.map(function (newproduct, index) {
            if (index == 0) {
                return (<NewCompRow
                    C_COMPETITOR_PR_NAME={newproduct.C_COMPETITOR_PR_NAME}
                    brand={brand}
                    loadRCP={loadRCP}
                    func_compitior_data={func_compitior_data}
                    competitordata={comdata}
                    newproduct={newproduct}
                    newRowData={rowdata}
                    addButton={Btn}
                    key={newproduct.id}
                    removeButton={removeButtonState}
                    configurationData={_this.props.configurationData}
                    funRCPARemove={_this.props.funRCPARemove}
					newlyadded={_this.props.newlyadded}
                    competitordata={_this.props.competitordata}
                />)
            } else {
                return (<NewCompRow
                    C_COMPETITOR_PR_NAME={newproduct.C_COMPETITOR_PR_NAME}
                    brand={brand}
                    loadRCP={loadRCP}
                    func_compitior_data={func_compitior_data}
                    competitordata={comdata}
                    newproduct={newproduct}
                    newRowData={rowdata}
                    key={newproduct.id}
                    configurationData={_this.props.configurationData}
                    funRCPARemove={_this.props.funRCPARemove}
					newlyadded={_this.props.newlyadded}
                    competitordata={_this.props.competitordata}
                />)
            }
        });
        return (
            <React.Fragment>
                {newproduct}
            </React.Fragment>
        );
    }
}

export default AddNewComp