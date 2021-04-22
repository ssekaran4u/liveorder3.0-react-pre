import React, { Component } from 'react'
import { Form, Table } from 'react-bootstrap'
import { Dropdown } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { getRCPA } from '../../actions/DCR'
import { postToServer } from '../../lib/comm-utils'
import AddNewComp from '../RCPA/AddNewComp'
import EditableDropdown from '../RCPA/EditableDropdown'
import RCPAPopup from '../popups/RCPAPopup';
class ProductRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showCompetitor: this.props.showComponent,
            showPlus: true,
            hideButton: true,
            brandcode: '',
            Enterproduct: {},
            showModal: false,
            rx: '',
            value: '',
            weight: '',
            valuetext: '',
            Weightage: '',
            Quantitytext: '',
        }
        this.fun_Rx = this.fun_Rx.bind(this)
        this.fun_Quantity = this.fun_Quantity.bind(this)
        this.fun_Value = this.fun_Value.bind(this)
        this.fun_Weightage = this.fun_Weightage.bind(this)
        this.handleShow = this.handleShow.bind(this)
        this.selectedProduct = this.selectedProduct.bind(this)
        this.showCompModal = this.showCompModal.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.RcpaNewEntry = this.RcpaNewEntry.bind(this)
        this.state.newproducts = [
            {
                id: 1,
                name: '',
                rx: '',
                qty: 0,
                value: '',
                weight: '',
                valuetext: '',
                Weightage: '',
                Quantitytext: '',
                C_COMPETITOR_PR_NAME: '',
                brandcode: ''
            }
        ];
    }


    // componentDidUpdate(old,olds){
    //     if(this.props.Editmodedata !=old.Editmodedata)
    //     {

    //         if(this.props.Editmodedata["Rcpa"]){
    //             var newproducts=[]
    //             var brandcode=''
    //             this.props.Editmodedata["Rcpa"].map( (a)=>{
    //               //this.props.onRowAdd()
    //               var id = (+ new Date() + Math.floor(Math.random() * 999999)).toString(36);
    //               var product = {
    //                   id: id,
    //                   name: "",
    //                   rx: "",
    //                   qty: 0,
    //                   value: '',
    //                   weight: ""
    //               }


    //               newproducts.push(product)
    //             } )
    //             this.setState({newproducts:newproducts})

    //           //  console.log(newproducts,'dddd')
    //         }
    //     }
    // }


    componentDidMount() {
        let count = 0
        if (this.props.Editmodedata) {

            if (this.props.Editmodedata["Rcpa"]) {
                var newproducts = []

                this.props.Editmodedata["Rcpa"].map((a) => {

                    if (this.props.doccode == a.C_DOCTOR_CODE) {
                        if (a.C_COMPETITOR_PR_NAME == '') {
                            if (this.props.selectedProduct == a.C_BRAND_CODE) {
                                count = count + 1
                                const qty = a.N_QTY
                                const rx = a.N_RX
                                const value = a.N_VALUE
                                const weight = a.N_WEIGHTAGE
                                this.setState({

                                    rx: rx,
                                    Quantitytext: qty,
                                    valuetext: value,
                                    Weightage: weight,

                                })
                            }
                        }
                        if (a.C_COMPETITOR_PR_NAME != '') {
                            if (this.props.selectedProduct == a.C_BRAND_CODE) {
                                count = count + 1
                                var id = (+ new Date() + Math.floor(Math.random() * 999999)).toString(36);
                                var product = {
                                    id: id,
                                    name: "",
                                    rx: a.N_RX,
                                    qty: a.N_QTY,
                                    value: a.N_VALUE,
                                    weight: a.N_WEIGHTAGE, brandcode: a.C_BRAND_CODE, C_COMPETITOR_PR_NAME: a.C_COMPETITOR_PR_NAME
                                }
                                newproducts.push(product)
                            }
                        }
                    }
                })
                if (count != 0) {
                    this.setState({ newproducts: newproducts })
                }


            }
        }

    }

    RcpaNewEntry(com, brand) {

        const data = { "index": "RCPA_ADD", Header: { com_barnd: this.state.brandcode, other_com: com, other_brand: brand } }
        postToServer("DCRAPI", data).then((result) => {
            // console.log(result)
            if (result.data["Status"] == "success") {
                this.handleClose()

            }
        }).catch((Error) => {
            // Error need to handle 
            //  console.log('Error')
        })

        var list_compititor = []
        this.state.brandcode
        list_compititor = this.props.competitordata[this.state.brandcode]
        list_compititor.push({ id: com, key: com, text: com + '(' + brand + ')', value: com })
        this.props.competitordata[this.state.brandcode] = list_compititor
        //[ Object.keys(this.props.competitordata).length+1 ]=list_compititor

        this.setState(this.props.competitordata)
    }

    handleShow() {
        this.setState({
            showCompetitor: !this.state.showCompetitor,
            showPlus: !this.state.showPlus,
            // brandcode:code
        })
    }
    /* adding new competitor row on click*/
    handleAdd(evt) {
        const brselected = this.state.brandcode
        // const data = Object.keys(this.props.competitordata[brselected])
        const addedlen = this.state.newproducts
        // console.log( data.length ,addedlen,addedlen.length)
        //  it will add upto compititor length   
        // if (data.length > addedlen.length) {
        var id = (+ new Date() + Math.floor(Math.random() * 999999)).toString(36);
        var product = {
            id: id,
            name: "",
            rx: "",
            qty: 0,
            value: '',
            weight: "",
            brandcode: '',
            // productdrop: []
        }
        this.state.newproducts.push(product);
        this.setState(this.state.newproducts);
        this.setState({
            hideButton: false
        })
        //}
    }
    selectedProduct(itrm) {
        // this.setState({productdrop: this.props.product})    
        this.setState({ brandcode: itrm })
    }
    fun_Rx(param) {



        const _this = this

        const tempval = param.target.value
        const selecteddrop = _this.state.brandcode
        // if dropdown not selected not allow  to edit text
        if (selecteddrop == "") {
            _this.setState({ rx: '' })
            return
        }
        const testkey = /^[0-9]*$/
        if (testkey.test(tempval)) {
            let temEnterCompetitor = _this.state.Enterproduct
            temEnterCompetitor[selecteddrop] = { "rx": tempval, "Value": _this.state.valuetext, "Quantity": this.state.Quantitytext, "Weightage": this.state.Weightage }
            _this.setState({ rx: tempval, Enterproduct: temEnterCompetitor })
            _this.props.funEnterproduct(temEnterCompetitor)
        } else {
            const tem = _this.state.rx
            _this.setState({ rx: tem })
        }
    }
    fun_Quantity(param) {
        const tempval = param.target.value
        const selecteddrop = this.state.brandcode
        // if dropdown not selected not allow  to edit text
        if (selecteddrop == "") {
            this.setState({ Quantitytext: '' })
            return
        }
        const testkey = /^[0-9]*$/
        if (testkey.test(tempval)) {
            let temEnterCompetitor = this.state.Enterproduct
            temEnterCompetitor[selecteddrop] = { "rx": this.state.rx, "Value": this.state.valuetext, "Quantity": tempval, "Weightage": this.state.Weightage }
            this.setState({ Quantitytext: tempval, Enterproduct: temEnterCompetitor })
            this.props.funEnterproduct(temEnterCompetitor)
        }
        else {
            const tem = this.state.Quantitytext
            this.setState({ Quantitytext: tem })
        }
    }
    fun_Value(param) {
        const tempval = param.target.value
        const selecteddrop = this.state.brandcode
        // if dropdown not selected not allow  to edit text
        if (selecteddrop == "") {
            this.setState({ valuetext: '' })
            return
        }
        const testkey = /^[0-9]*$/
        if (testkey.test(tempval)) {
            let temEnterCompetitor = this.state.Enterproduct
            temEnterCompetitor[selecteddrop] = { "rx": this.state.rx, "Value": tempval, "Quantity": this.state.Quantitytext, "Weightage": this.state.Weightage }
            this.setState({ valuetext: tempval, Enterproduct: temEnterCompetitor })
            this.props.funEnterproduct(temEnterCompetitor)
        } else {
            const tem = this.state.valuetext
            this.setState({ valuetext: tem })
        }
    }
    fun_Weightage(param) {
        const tempval = param.target.value
        const selecteddrop = this.state.brandcode
        // if dropdown not selected not allow  to edit text
        if (selecteddrop == "") {
            this.setState({ Weightage: '' })
            return
        }
        const testkey = /^[0-9]*$/
        if (testkey.test(tempval)) {
            let temEnterCompetitor = this.state.Enterproduct
            temEnterCompetitor[selecteddrop] = { "rx": this.state.rx, "Value": this.state.valuetext, "Quantity": this.state.Quantitytext, "Weightage": tempval }
            this.setState({ Weightage: tempval, Enterproduct: temEnterCompetitor })
            this.props.funEnterproduct(temEnterCompetitor)
        } else {
            const tem = this.state.Weightage
            this.setState({ Weightage: tem })
        }

    }
    showCompModal() {
        this.setState({
            showModal: !this.state.showModal
        })
    }
    handleClose() {
        this.setState({ showModal: false });
    }
    render() {
        // console.log(this.props.selectedProduct,"Kumar Madhu T M")
        const loadRCP = this.props.loadRCP
        return (
            <tbody>
                <tr className="eachRow">
                    <td onClick={() => this.handleShow()} >
                        {this.state.showPlus ?
                            <img src="../public/assets/images/plus.svg" className="paddingTop" /> :
                            <img src="../public/assets/images/minus.svg" className="paddingTop" />}
                    </td>
                    <EditableDropdown
                        Editmodedata={this.props.Editmodedata}
                        selectedProduct={this.selectedProduct}
                        Productdrop={this.props.Productdrop}
                        cellData={{
                            "type": "name",
                            value: this.props.product.name,
                            id: this.props.product.id
                        }}
                        selectedProductcode={this.props.selectedProduct}
                    />
                    {loadRCP == undefined ? '' : loadRCP["N_RX_ACTIVE"] == "1" ?
                        <td>
                            <Form.Control id={this.selectedProduct + "rx"} value={this.state.rx} onChange={this.fun_Rx} type='text' className="valueinput" />
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
                    <td>
                        <button className="addnewComp2" onClick={this.showCompModal} >Add New Comp. Product</button>
                    </td>
                </tr>

                <RCPAPopup RcpaNewEntry={this.RcpaNewEntry} showTaskModal={this.state.showModal} closeModal={this.handleClose} />
                {this.state.showCompetitor ?
                    <React.Fragment>
                        <tr>
                            <td></td>
                            <td className="comptHead">Competitor Details</td>
                        </tr>
                        <AddNewComp 
                        loadRCP={loadRCP} 
                        func_compitior_data={this.props.func_compitior_data} 
                        competitordata={this.props.competitordata} 
                        code={this.props.selectedProduct} 
                        brandcode={this.state.brandcode} 
                        newRows={this.handleAdd.bind(this)} 
                        addBtn={this.state.hideButton} 
                        newproducts={this.state.newproducts} />
                    </React.Fragment> : ''}
            </tbody>
        );
    }
}

export default ProductRow