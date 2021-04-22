import React, { Component } from 'react'
import { Form, Table } from 'react-bootstrap'
import { Dropdown } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { getRCPA } from '../../actions/DCR'
import { postToServer } from '../../lib/comm-utils'
import RCPAPopup from '../popups/RCPAPopup';
import CompititorDropdown from '../RCPA/CompititorDropdown'

class NewCompRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addButton: this.props.addButton,
            selecteddrop: '',
            //satate  value for  txt  imputs  
            rxtext: '',
            Quantitytext: '',
            valuetext: '',
            Weightage: '',
            EnterCompetitor: {},
            dropdownlist:[]
        }
        // binds  function for 
        this.fun_Rx = this.fun_Rx.bind(this)
        this.fun_Quantity = this.fun_Quantity.bind(this)
        this.fun_Value = this.fun_Value.bind(this)
        this.fun_Weightage = this.fun_Weightage.bind(this)
        this.fun_compititor = this.fun_compititor.bind(this)
       
    }
    componentDidMount() {
        console.log(this.props.code)
       if(this.props.code != "" && this.props.code != undefined ) {var list_compititor = []
        list_compititor.push({ id: '-1', key: '-1', text: 'Please Select  Compititor  ', value: '-1' })
        const data = { "index": "RCPA_Comptator", "Data": { "Brand": this.props.code } }
            postToServer("DCRAPI", data).then((result) => {
                if (result.data["Status"] == "success") {
                    if (Array.isArray(result.data.Data)) {
                        result.data.Data.map((a, index) => {
                            list_compititor.push({ id: index, key: a["C_MFAC_NAME"], text: a.C_PRODUCT_NAME + '(' + a.C_MFAC_NAME + ')', value: a.C_PRODUCT_NAME })
                        })
                        // console.log(this.props.C_COMPETITOR_PR_NAME,"console 2")
                        this.setState({
                            dropdownlist: list_compititor,
                            // bcode: this.props.C_COMPETITOR_PR_NAME
                        })
                    }
                }
            }).catch((Error) => {
                console.log(Error)
            })}
        const qty = this.props.newproduct.qty
        const rx = this.props.newproduct.rx
        const value = this.props.newproduct.value
        const weight = this.props.newproduct.weight
        this.setState({

            rxtext: rx,
            Quantitytext: qty,
            valuetext: value,
            Weightage: weight,

        })
    }

    componentDidUpdate(oldpr, olds) {
        if (oldpr.newproduct != this.props.newproduct) {
            //  console.log(this.props.newproduct,'updated values')
        }
    }
    fun_Rx(param) {
        const tempval = param.target.value
        const selecteddrop = this.state.selecteddrop
        if (selecteddrop == "")
            return
        const testkey = /^[0-9]*$/
        if (testkey.test(tempval)) {
            let temEnterCompetitor = this.state.EnterCompetitor
            temEnterCompetitor[selecteddrop] = { "rx": tempval, "Value": this.state.valuetext, "Quantity": this.state.Quantitytext, "Weightage": this.state.Weightage }
            this.setState({ rxtext: tempval, EnterCompetitor: temEnterCompetitor })
            this.props.func_compitior_data(temEnterCompetitor)
        }
    }
    fun_Quantity(param) {
        const tempval = param.target.value
        const selecteddrop = this.state.selecteddrop
        if (selecteddrop == "")
            return
        const testkey = /^[0-9]*$/
        if (testkey.test(tempval)) {
            let temEnterCompetitor = this.state.EnterCompetitor
            temEnterCompetitor[selecteddrop] = { "rx": this.state.rxtext, "Value": this.state.valuetext, "Quantity": tempval, "Weightage": this.state.Weightage }
            this.setState({ Quantitytext: tempval, EnterCompetitor: temEnterCompetitor })
            this.props.func_compitior_data(temEnterCompetitor)
        }
    }
    fun_Value(param) {
        const tempval = param.target.value
        const selecteddrop = this.state.selecteddrop
        if (selecteddrop == "")
            return
        const testkey = /^[0-9]*$/
        if (testkey.test(tempval)) {
            let temEnterCompetitor = this.state.EnterCompetitor
            temEnterCompetitor[selecteddrop] = { "rx": this.state.rxtext, "Value": tempval, "Quantity": this.state.Quantitytext, "Weightage": this.state.Weightage }
            this.setState({ valuetext: tempval, EnterCompetitor: temEnterCompetitor })
            this.props.func_compitior_data(temEnterCompetitor)
        }
    }
    fun_Weightage(param) {
        const tempval = param.target.value
        const selecteddrop = this.state.selecteddrop
        if (selecteddrop == "")
            return
        const testkey = /^[0-9]*$/
        if (testkey.test(tempval)) {
            let temEnterCompetitor = this.state.EnterCompetitor
            temEnterCompetitor[selecteddrop] = { "rx": this.state.rxtext, "Value": this.state.valuetext, "Quantity": this.state.Quantitytext, "Weightage": tempval }
            this.setState({ Weightage: tempval, EnterCompetitor: temEnterCompetitor })
            this.props.func_compitior_data(temEnterCompetitor)
        }
    }
    fun_compititor(data) {
        this.setState({
            selecteddrop: data,
            rxtext: '',
            Quantitytext: '',
            valuetext: '',
            Weightage: '',
            EnterCompetitor: {}
        })
    }
    render() {
        // console.log(this.state.dropdownlist, "jhsdkjhsdkfhskhfskdjhfkjsdhfkjsdhfkj")
        const loadRCP = this.props.loadRCP
        return (
            <tr>
                <td></td>
                <CompititorDropdown
                    C_COMPETITOR_PR_NAME={this.props.C_COMPETITOR_PR_NAME}
                    brand={this.props.brand}
                    code={this.props.code}
                    fun__props_compititor={this.fun_compititor}
                    competitordata={this.props.competitordata}
                    dropdownlist={this.state.dropdownlist}
                    cellData={{
                        "type": "name",
                        value: this.props.newproduct.name,
                        id: this.props.newproduct.id
                    }} />
                {loadRCP == undefined ? '' : loadRCP["N_RX_ACTIVE"] == "1" ?
                    <td>
                        <Form.Control value={this.state.rxtext} onChange={this.fun_Rx} type='text' className="valueinput" />
                    </td>
                    : ''}
                {loadRCP == undefined ? '' : loadRCP["N_QTYTYPE_ACTIVE"] == "1" ?
                    <td>
                        <Form.Control value={this.state.Quantitytext} type='text' onChange={this.fun_Quantity} className="valueinput" />
                    </td>
                    : ''}
                {loadRCP == undefined ? '' : loadRCP["N_VALUETYPE_ACTIVE"] == "1" ?
                    <td>
                        <Form.Control value={this.state.valuetext} type='text' onChange={this.fun_Value} className="valueinput" />
                    </td>
                    : ''}
                {/*  {loadRCP == undefined ? '' : loadRCP["N_WEIGHTAGE_ACTIVE"] == "1" ?
                    <td>
                        <Form.Control value={this.state.Weightage} type='text' onChange={this.fun_Weightage} className="valueinput" />
                    </td>
                    : ''}*/}
                {this.state.addButton ? <td> <button className="primary " onClick={this.props.newRowData} >Create Comp. Row</button></td> : null}
            </tr>
        )
    }
}
export default NewCompRow