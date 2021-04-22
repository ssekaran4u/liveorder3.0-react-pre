import React from 'react'
import ReactDOM from 'react-dom'
import { Button, Form } from 'react-bootstrap'
import { postToServer } from '../../lib/comm-utils'
import CompititorDropdown from '../RCPA/CompititorDropdown'

class NewCompRow extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            addButton: this.props.addButton,
            selecteddrop: '',
            rxtext: '',
            Quantitytext: '',
            valuetext: '',
            Weightage: '',
            UnitPrice: '0',
            EnterCompetitor: {},
            dropdownlist:[],
            removeButton: false
        }
        
        this.setZeroRx = this.setZeroRx.bind(this)
        this.fun_Rx = this.fun_Rx.bind(this)
        this.setZeroQty = this.setZeroQty.bind(this)
        this.fun_Quantity = this.fun_Quantity.bind(this)
        this.funAutoQuantity = this.funAutoQuantity.bind(this)
        this.setZeroVal = this.setZeroVal.bind(this)
        this.fun_Value = this.fun_Value.bind(this)
        this.setZeroWeight = this.setZeroWeight.bind(this)
        this.fun_Weightage = this.fun_Weightage.bind(this)
        this.fun_compititor = this.fun_compititor.bind(this)
    }

    componentDidMount() {
        this.setState({removeButton: this.props.removeButton})

        const _this = this
        if (this.props.code != "" && this.props.code != undefined) {
            var list_compititor = []
            list_compititor.push({
                id: '-1',
                key: '-1',
                text: 'Please Select Competitor',
                value: '-1'
            })
            
            var date = new Date(),
            dateDay = '' + date.getDate(),
            dateMonth = '' + (date.getMonth() + 1),
            dateYear = date.getFullYear();

            if (dateMonth.length < 2) 
                dateMonth = '0' + dateMonth;
            if (dateDay.length < 2) 
                dateDay = '0' + dateDay;

            let todayDate = [dateDay, dateMonth, dateYear].join('/');

            const data = {
                "Index": "ItemList",
                "DateReport": todayDate,
                "Data": {
                    "brcode": this.props.code
                }
            }

            postToServer("RCPA_API", data).then((result) => {
                // if (result.data["Status"] == "success") {
                //     if (Array.isArray(result.data.Data)) {
                //         result.data.Data.map((a, index) => {
                //             list_compititor.push({
                //                 id: index,
                //                 key: a["C_MFAC_NAME"],
                //                 text: a.C_PRODUCT_NAME + '(' + a.C_MFAC_NAME + ')',
                //                 value: a.C_PRODUCT_NAME
                //             })
                //         })
                //         this.setState({
                //             dropdownlist: list_compititor,
                //             // bcode: this.props.C_COMPETITOR_PR_NAME
                //         })
                //     }
                // }
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

        setTimeout(() => {
            const qty = _this.props.newproduct.qty
            const rx = _this.props.newproduct.rx
            const value = _this.props.newproduct.value
            const weight = _this.props.newproduct.weight

            this.setState({
                rxtext: rx,
                Quantitytext: qty,
                valuetext: value,
                Weightage: weight,
            })

            const selecteddrop = _this.state.selecteddrop
            if (selecteddrop == "" || selecteddrop == "-1") {
                return
            }
            let temEnterCompetitor = _this.state.EnterCompetitor
            temEnterCompetitor[selecteddrop] = { "rx": _this.state.rxtext, "Value": _this.state.valuetext, "Quantity": _this.state.Quantitytext, "Weightage": _this.state.Weightage }
            _this.setState({ EnterCompetitor: temEnterCompetitor })
            _this.props.func_compitior_data("", temEnterCompetitor)
        }, 1000);
    }

    componentDidUpdate(oldpr, olds) {
        if (oldpr.newproduct != this.props.newproduct) {
            //  console.log(this.props.newproduct,'updated values')
        }
    }

    setZeroRx(param) {
        let tempval = param.target.value
        if (tempval == "") {
            tempval = "0"
        }
        const selecteddrop = this.state.selecteddrop
        if (selecteddrop == "" || selecteddrop == "-1")
            return
        let temEnterCompetitor = this.state.EnterCompetitor
        temEnterCompetitor[selecteddrop] = { "rx": tempval, "Value": this.state.valuetext, "Quantity": this.state.Quantitytext, "Weightage": this.state.Weightage }
        this.setState({ rxtext: tempval, EnterCompetitor: temEnterCompetitor })
        this.props.func_compitior_data("", temEnterCompetitor)
    }

    fun_Rx(param) {
        const tempval = param.target.value
        const selecteddrop = this.state.selecteddrop
        if (selecteddrop == "" || selecteddrop == "-1") {
            this.setState({ rxtext: '' })
            return
        }
        const testkey = /^[0-9]*$/
        if (tempval == "" || testkey.test(tempval)) {
            let temEnterCompetitor = this.state.EnterCompetitor
            temEnterCompetitor[selecteddrop] = { "rx": tempval, "Value": this.state.valuetext, "Quantity": this.state.Quantitytext, "Weightage": this.state.Weightage }
            this.setState({ rxtext: tempval, EnterCompetitor: temEnterCompetitor })
            this.props.func_compitior_data("", temEnterCompetitor)
        }
    }

    setZeroQty(param) {
        let tempval = param.target.value
        if (tempval == "") {
            tempval = "0"
        }
        const selecteddrop = this.state.selecteddrop
        if (selecteddrop == "" || selecteddrop == "-1")
            return
        
        let temEnterCompetitor = this.state.EnterCompetitor
        temEnterCompetitor[selecteddrop] = { "rx": this.state.rxtext, "Value": this.state.valuetext, "Quantity": tempval, "Weightage": this.state.Weightage }
        this.setState({ Quantitytext: tempval, EnterCompetitor: temEnterCompetitor })
        this.props.func_compitior_data("", temEnterCompetitor)
    }

    fun_Quantity(param) {
        const tempval = param.target.value
        const selecteddrop = this.state.selecteddrop
        if (selecteddrop == "" || selecteddrop == "-1") {
            this.setState({ Quantitytext: '' })
            return
        }
        const testkey = /^[0-9]*$/
        if (tempval == "" || testkey.test(tempval)) {
            let temEnterCompetitor = this.state.EnterCompetitor
            temEnterCompetitor[selecteddrop] = { "rx": this.state.rxtext, "Value": this.state.valuetext, "Quantity": tempval, "Weightage": this.state.Weightage }
            this.setState({ Quantitytext: tempval, EnterCompetitor: temEnterCompetitor })
            this.props.func_compitior_data("", temEnterCompetitor)
        }
    }

    funAutoQuantity(param) {
        const tempval = param.target.value
        const selecteddrop = this.state.selecteddrop
        if (selecteddrop == "" || selecteddrop == "-1") {
            this.setState({ Quantitytext: '' })
            return
        }
        const testkey = /^\d*\.?\d+$/
        const testkeyalt = /^\d*\.$/
        if (tempval == "" || testkey.test(tempval) || testkeyalt.test(tempval)) {
            let calculatedValue = 0;
            calculatedValue = "" + (Number(tempval) * Number(this.state.UnitPrice))
            if (calculatedValue == "undefined" || calculatedValue == "NaN") {
                calculatedValue = "0"
            }
            let temEnterCompetitor = this.state.EnterCompetitor
            temEnterCompetitor[selecteddrop] = { "rx": this.state.rxtext, "Value": calculatedValue, "Quantity": tempval, "Weightage": this.state.Weightage }
            this.setState({ Quantitytext: tempval, valuetext: calculatedValue, EnterCompetitor: temEnterCompetitor })
            this.props.func_compitior_data("", temEnterCompetitor)
        }
    }

    setZeroVal(param) {
        let tempval = param.target.value
        if (tempval == "") {
            tempval = "0"
        }
        const selecteddrop = this.state.selecteddrop
        if (selecteddrop == "" || selecteddrop == "-1")
            return
        
        let temEnterCompetitor = this.state.EnterCompetitor
        temEnterCompetitor[selecteddrop] = { "rx": this.state.rxtext, "Value": tempval, "Quantity": this.state.Quantitytext, "Weightage": this.state.Weightage }
        this.setState({ valuetext: tempval, EnterCompetitor: temEnterCompetitor })
        this.props.func_compitior_data("", temEnterCompetitor)
    }

    fun_Value(param) {
        const tempval = param.target.value
        const selecteddrop = this.state.selecteddrop
        if (selecteddrop == "" || selecteddrop == "-1") {
            this.setState({ valuetext: '' })
            return
        }
        const testkey = /^\d*\.?\d+$/
        const testkeyalt = /^\d*\.$/
        if (tempval == "" || testkey.test(tempval) || testkeyalt.test(tempval)) {
            let temEnterCompetitor = this.state.EnterCompetitor
            temEnterCompetitor[selecteddrop] = { "rx": this.state.rxtext, "Value": tempval, "Quantity": this.state.Quantitytext, "Weightage": this.state.Weightage }
            this.setState({ valuetext: tempval, EnterCompetitor: temEnterCompetitor })
            this.props.func_compitior_data("", temEnterCompetitor)
        }
    }

    setZeroWeight(param) {
        let tempval = param.target.value
        if (tempval == "") {
            tempval = "0"
        }
        const selecteddrop = this.state.selecteddrop
        if (selecteddrop == "" || selecteddrop == "-1")
            return
        
        let temEnterCompetitor = this.state.EnterCompetitor
        temEnterCompetitor[selecteddrop] = { "rx": this.state.rxtext, "Value": this.state.valuetext, "Quantity": this.state.Quantitytext, "Weightage": tempval }
        this.setState({ Weightage: tempval, EnterCompetitor: temEnterCompetitor })
        this.props.func_compitior_data("", temEnterCompetitor)
    }

    fun_Weightage(param) {
        const tempval = param.target.value
        const selecteddrop = this.state.selecteddrop
        if (selecteddrop == "" || selecteddrop == "-1") {
            this.setState({ Weightage: '' })
            return
        }
        const testkey = /^\d*\.?\d+$/
        const testkeyalt = /^\d*\.$/
        if (tempval == "" || testkey.test(tempval) || testkeyalt.test(tempval)) {
            if (Number(tempval) < 101) {
                let temEnterCompetitor = this.state.EnterCompetitor
                temEnterCompetitor[selecteddrop] = { "rx": this.state.rxtext, "Value": this.state.valuetext, "Quantity": this.state.Quantitytext, "Weightage": tempval }
                this.setState({ Weightage: tempval, EnterCompetitor: temEnterCompetitor })
                this.props.func_compitior_data("", temEnterCompetitor)
            } else {
                this.setState({ Weightage: "0" })    
            }
        }
    }

    fun_compititor(data, unitPrice, previousval) {
        let oldData = this.state.selecteddrop

        this.setState({
            selecteddrop: data,
            UnitPrice: unitPrice,
        })

        if (data != "" && data != "-1") {
            let newData = {}
            // newData[data] = { "rx": this.state.rxtext, "Value": this.state.valuetext, "Quantity": this.state.Quantitytext, "Weightage": this.state.Weightage }
            // TODO: IF THIS GIVES ERROR PLEASE CHANGE BACK TO ABOVE LINE & COMMENT BELOW 2 LINES
            newData[data] = { "rx": "", "Value": "", "Quantity": "", "Weightage": "" }
            this.setState({ rxtext: "", valuetext: "", Quantitytext: "", Weightage: "", EnterCompetitor: newData })
            
            // this.props.func_compitior_data(oldData, newData)
            this.props.func_compitior_data(data, newData,previousval)
        }
    }

    addRow() {
        this.setState({
            removeButton: true
        })
        this.props.newRowData()
    }

    removeRow(e) {
        debugger;
        var elements = e.target.parentNode.parentNode.parentNode.getElementsByClassName("comp-row");
        
        if (elements.length == 3) {
            this.setState({
                removeButton: false
            })
        }

        if (elements.length > 2) {
            var element = elements[elements.length - 1];
            let competitorToRemove = element.getElementsByClassName("dropdown")[0].getElementsByTagName("div")[0].innerHTML
            this.props.funRCPARemove(this.props.brand, competitorToRemove)
            element.parentNode.removeChild(element);
        } else {
            var element = elements[elements.length - 1];
            let competitorToRemove = element.getElementsByClassName("dropdown")[0].getElementsByTagName("div")[0].innerHTML
            this.props.funRCPARemove(this.props.brand, competitorToRemove)
            element.parentNode.removeChild(element);

            var element2 = document.getElementsByClassName("comp-row")[0];
            element2.parentNode.removeChild(element2);
        }
    }

    render() {
        const loadRCP = this.props.loadRCP
        // if (this.state.rxtext == "") {
        //     this.setState({rxtext: "0"})
        // }
        // if (this.state.Quantitytext == "") {
        //     this.setState({Quantitytext: "0"})
        // }
        // if (this.state.valuetext == "") {
        //     this.setState({valuetext: "0"})
        // }
        // if (this.state.Weightage == "") {
        //     this.setState({Weightage: "0"})
        // }

        return (
            <tr class="comp-row">
                <CompititorDropdown
                    C_COMPETITOR_PR_NAME={this.props.C_COMPETITOR_PR_NAME}
                    brand={this.props.brand}
                    code={this.props.code}
                    fun__props_compititor={this.fun_compititor}
                    funRCPARemove = {this.props.funRCPARemove}
                    competitordata={this.props.competitordata}
                    dropdownlist={this.state.dropdownlist}
                    cellData={{
                        "type": "name",
                        value: this.props.newproduct.name,
                        id: this.props.newproduct.id
                    }} 
                    newlyadded={this.props.newlyadded}
                    />
                {loadRCP == undefined ? '' : loadRCP["N_RX_ACTIVE"] == "1" ?
                    <td>
                        <Form.Control value={this.state.rxtext} onChange={this.fun_Rx} onBlur={this.setZeroRx} type='text' className="valueinput" />
                    </td>
                    : ''}
                {loadRCP == undefined ? '' : loadRCP["N_QTYTYPE_ACTIVE"] == "1" ?
                    this.props.configurationData.n_value_auto == 1 ?
                    <td>
                        <Form.Control value={this.state.Quantitytext} type='text' onChange={this.fun_Quantity} onBlur={this.setZeroQty} className="valueinput" />
                    </td>
                :   <td>
                        <Form.Control value={this.state.Quantitytext} type='text' onChange={this.funAutoQuantity} onBlur={this.setZeroQty} className="valueinput" />
                    </td>
                : ''}
                {loadRCP == undefined ? '' : loadRCP["N_VALUETYPE_ACTIVE"] == "1" ?
                    this.props.configurationData.n_value_auto == 1 ?
                    <td>
                        <Form.Control value={this.state.valuetext} type='text' onChange={this.fun_Value} onBlur={this.setZeroVal} className="valueinput" />
                    </td>
                :   <td>
                        <Form.Control value={this.state.valuetext} type='text' onChange={this.fun_Value} onBlur={this.setZeroVal} className="valueinput" disabled />
                    </td>
                : ''}
                {loadRCP == undefined ? '' : loadRCP["N_WEIGHTAGE_ACTIVE"] == "1" ?
                    <td>
                        <Form.Control value={this.state.Weightage} type='text' onChange={this.fun_Weightage} onBlur={this.setZeroWeight} className="valueinput" />
                    </td>
                    : ''}
                {this.state.addButton ? 
                    <td>
                        <Button variant="primary" onClick={() => { this.addRow() } }>Add Row</Button>{" "}
                        {this.state.removeButton ? <Button variant="danger" onClick={(e) => { this.removeRow(e) }}>Remove Row</Button> : null}
                    </td>
                :   <td>
                        {/*  */}
                    </td>
                }
            </tr>
        )
    }
}
export default NewCompRow