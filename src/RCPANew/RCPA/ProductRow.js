import React from 'react'
import { Button, Form } from 'react-bootstrap'
import { postToServer } from '../../lib/comm-utils'
import AddNewComp from '../RCPA/AddNewComp'
import EditableDropdown from '../RCPA/EditableDropdown'
import RCPAPopup from '../popups/RCPAPopup';
import StatusPopup from '../../lib/StatusPopup'
import { get } from 'react-scroll/modules/mixins/scroller'

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
            unitPrice: '0',
            errorMessage: '',
            errorState: '',
            newlyadded : '',
            isdiable : '',
            compitordetails: {},
			competitordata: [],
            list_compititor: [],
            bcode: "-1"
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
        this.handleShow = this.handleShow.bind(this)
        this.selectedProduct = this.selectedProduct.bind(this)
        this.showCompModal = this.showCompModal.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.RcpaNewEntry = this.RcpaNewEntry.bind(this)
        this.errorClose = this.errorClose.bind(this)
        this.state.newproducts = [
            {
                id: 1,
                name: '',
                rx: '',
                qty: '',
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

    componentDidUpdate(old,olds){
        var date = new Date(),
        dateDay = '' + date.getDate(),
            dateMonth = '' + (date.getMonth() + 1),
            dateYear = date.getFullYear();

            if (dateMonth.length < 2) 
                dateMonth = '0' + dateMonth;
            if (dateDay.length < 2) 
                dateDay = '0' + dateDay;
        let todayDate = [dateDay, dateMonth, dateYear].join('/');
        if(JSON.stringify(this.props.Editmodedata) != JSON.stringify(old.Editmodedata)) {
            if(this.props.Editmodedata["Result"]){
                var newproducts=[]
                var brandcode=''
                this.props.Editmodedata["Result"].map( (a)=>{
                  //this.props.onRowAdd()
                  var id = (+ new Date() + Math.floor(Math.random() * 999999)).toString(36);
                  var product = {
                      id: id,
                      name: "",
                      rx: "",
                      qty: "",
                      value: "",
                      weight: ""
                  }
                  newproducts.push(product)
                } )
                this.setState({newproducts: newproducts})
            }
        }
        if(olds.brandcode != this.state.brandcode){
        var list_compititor = []
            list_compititor.push({ id: '-1', key: '-1', text: 'Please Select  Competitor  ', value: '-1' })

            let requestData = { "Index": "ItemList", "DateReport": todayDate, "Data": { "brcode": this.state.brandcode } }

            postToServer("RCPA_API", requestData).then((result) => {
                if (result.data["Status"] == "Success") {
                    if (Array.isArray(result.data.Result)) {
                        let index = 0;
                        result.data.Result.map((competitorProduct) => {
                            list_compititor.push({ id: index, key: competitorProduct.CltProduct, text: competitorProduct.CltProduct, value: competitorProduct.CltProduct, unitPrice: competitorProduct.CltVal })
                            index++
												})
												if(this.state.newproducts[0].C_COMPETITOR_PR_NAME != ''){
													let array2 = this.state.newproducts
													let list_compititor2 = list_compititor
															array2.map((element) =>{
																list_compititor2.map((item) => {
																			if(item.key == element.C_COMPETITOR_PR_NAME){
																					item['disabled'] = true
																			}
																	})
															})
															this.setState({competitordata:list_compititor2})
												}
                        else{
													this.setState({
                            competitordata: list_compititor
                        })
												}
                    }
                }
            }).catch((Error) => {
                // console.log(Error)
						})
                }
				if(olds.newlyadded != this.state.newlyadded && this.state.newlyadded != undefined){
					var list_compititor = []
					list_compititor.push({ id: '-1', key: '-1', text: 'Please Select  Compititor  ', value: '-1' })
					let data = { "Index": "ItemList", "DateReport": todayDate, "Data": { "brcode": this.state.brandcode } }
					postToServer("RCPA_API", data).then((result) => {
							if (result.data["Status"] == "Success") {
									if (Array.isArray(result.data.Result)) {
											let index = 0;
											result.data.Result.map((competitorProduct) => {
													list_compititor.push({ id: index, key: competitorProduct.CltProduct, text: competitorProduct.CltProduct, value: competitorProduct.CltProduct, unitPrice: competitorProduct.CltVal })
													index++
											})
											if(this.props.selectedvales != ''){
												let array2 = this.props.selectedvales
													let list_compititor2 = list_compititor
															array2.map((element) =>{
																list_compititor2.map((item) => {
																			if(item.key == element){
																					item['disabled'] = true
																			}
																	})
															})
															this.setState({competitordata:list_compititor2})
											}
											else{
												this.setState({
													competitordata: list_compititor
											})
											}
									}
							}
					}).catch((Error) => {
							// console.log(Error)
					})
            }
			if(old.isdelete != this.props.isdelete && this.props.isdelete == true && this.state.brandcode !=''){
				let getvalue = []
				getvalue = document.getElementsByClassName("selectablecheckbox")
				let deletearray = this.props.checkedvalues
				deletearray.map((el) =>{
				for(let i=0 ; i < getvalue.length; i++){
					if(getvalue[i].checked == true && getvalue[i].value == el){
						// console.log(getvalue[i].parentElement)
						getvalue[i].parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.removeChild(getvalue[i].parentElement.parentElement.parentElement.parentElement.parentElement)
						this.props.setdelete(false)
						this.props.uncheckdisabled(this.props.checkedvalues)
					}
					else{

					}
				}
			})
    }
	}
    componentDidMount() {
        let count = 0
        if (this.props.Editmodedata) {

            if (this.props.Editmodedata["Result"]) {
                var newproducts = []

                this.props.Editmodedata["Result"].map((a) => {
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
                                let temEnterCompetitor = this.state.Enterproduct;
                                temEnterCompetitor[a.C_BRAND_CODE] = { "rx": rx, "Value": value, "Quantity": qty, "Weightage": weight }
                                this.props.funEnterproduct("", temEnterCompetitor)
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
                                    weight: a.N_WEIGHTAGE, 
                                    brandcode: a.C_BRAND_CODE, 
                                    C_COMPETITOR_PR_NAME: a.C_COMPETITOR_PR_NAME
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

    RcpaNewEntry(com, brand, unitPrice) {
        // const data = { "index": "RCPA_ADD", Header: { com_barnd: this.state.brandcode, other_com: com, other_brand: brand } }
        // postToServer("DCRAPI", data).then((result) => {
        //     // console.log(result)
        //     if (result.data["Status"] == "success") {
        //         this.handleClose()
        //     }
        // }).catch((Error) => {
        //     // Error need to handle 
        //     //  console.log('Error')
        // })

        const data = { "Index": "RCPA_ADD", Data: { barnd_code: this.state.brandcode, product_name: com, manufac: brand, unit_price: unitPrice } }
        postToServer("RCPA_API", data).then((result) => {
            if (result.data["Status"] == "success") {
                this.handleClose()
            }
        }).catch((Error) => {
            //  console.log('Error')
        })

        // var list_compititor = []
        // this.state.brandcode
        // list_compititor = this.props.competitordata[this.state.brandcode]
        // list_compititor.push({ id: com, key: com, text: com + '(' + brand + ')', value: com })
        // this.props.competitordata[this.state.brandcode] = list_compititor
        //[ Object.keys(this.props.competitordata).length+1 ]=list_compititor

        // this.setState(this.props.competitordata)

        // this.forceUpdate();
        this.setState({newlyadded:com})
    }

    handleShow() {
        this.setState({
            showCompetitor: !this.state.showCompetitor,
            // showPlus: !this.state.showPlus,
        })
    }

    /* adding new competitor row on click*/
    handleAdd(evt) {
        const brselected = this.state.brandcode
        // const data = Object.keys(this.props.competitordata[brselected])
        const addedlen = this.state.newproducts
        //  it will add upto compititor length   
        // if (data.length > addedlen.length) {
        var id = (+ new Date() + Math.floor(Math.random() * 999999)).toString(36);
        var product = {
            id: id,
            name: "",
            rx: "",
            qty: "",
            value: "",
            weight: "",
            brandcode: "",
            // productdrop: []
        }
        this.state.newproducts.push(product);
        this.setState(this.state.newproducts);
        this.setState({
            hideButton: false
        })
        //}
        if(this.props.isdisable != ''){
        let array1 = this.state.competitordata
            array1.map((item)=>{
            if(item['key'] == this.props.isdisable){
            item['disabled'] = true
            }
            })
            this.setState({array1:this.state.competitordata})           
        }
        if(this.state.newproducts[0].C_COMPETITOR_PR_NAME != '' && this.state.newproducts[0].C_COMPETITOR_PR_NAME != undefined){
				let array2 = this.state.newproducts
				let list_compititor = this.state.competitordata
            array2.map((element) =>{
							list_compititor.map((item) => {
                    if(item.key == element.C_COMPETITOR_PR_NAME){
                        item['disabled'] = true
                    }
                })
						})
						this.setState({competitordata:list_compititor})
        }
        if(this.props.previousval !=''){
            let array1 = this.state.competitordata
            array1.map((item)=>{
            if(item['text'] == this.props.previousval){
            item['disabled'] = false
            }
            })
            this.setState({array1:this.state.competitordata}) 
        }
    }

    selectedProduct(productId, productUnitPrice) {
        this.setState({ brandcode: productId, unitPrice: productUnitPrice })
        if (productId != "") {
            let temEnterCompetitor = {}
            temEnterCompetitor[productId] = { "rx": this.state.rx, "Value": this.state.valuetext, "Quantity": this.state.Quantitytext, "Weightage": this.state.Weightage }
            this.setState({ Enterproduct: temEnterCompetitor })
            this.props.funEnterproduct(productId, temEnterCompetitor)
        }
    }

    setZeroRx(param) {
        let tempval = param.target.value
        if (tempval == "") {
            tempval = "0"
        }
        const selecteddrop = this.state.brandcode
        if (selecteddrop == "")
            return

        let temEnterCompetitor = this.state.Enterproduct
        temEnterCompetitor[selecteddrop] = { "rx": tempval, "Value": this.state.valuetext, "Quantity": this.state.Quantitytext, "Weightage": this.state.Weightage }
        this.setState({ rx: tempval, Enterproduct: temEnterCompetitor })
        this.props.funEnterproduct("", temEnterCompetitor)
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
        const testkey = /^\d*\.?\d+$/
        const testkeyalt = /^\d*\.$/
        if (tempval == "" || testkey.test(tempval) || testkeyalt.test(tempval)) {
            let temEnterCompetitor = _this.state.Enterproduct
            temEnterCompetitor[selecteddrop] = { "rx": tempval, "Value": _this.state.valuetext, "Quantity": this.state.Quantitytext, "Weightage": this.state.Weightage }
            _this.setState({ rx: tempval, Enterproduct: temEnterCompetitor })
            _this.props.funEnterproduct("", temEnterCompetitor)
        } else {
            const tem = _this.state.rx
            _this.setState({ rx: tem })
        }
    }

    setZeroQty(param) {
        let tempval = param.target.value
        if (tempval == "") {
            tempval = "0"
        }
        const selecteddrop = this.state.brandcode
        if (selecteddrop == "")
            return
        
        let temEnterCompetitor = this.state.Enterproduct
        temEnterCompetitor[selecteddrop] = { "rx": this.state.rx, "Value": this.state.valuetext, "Quantity": tempval, "Weightage": this.state.Weightage }
        this.setState({ Quantitytext: tempval, Enterproduct: temEnterCompetitor })
        this.props.funEnterproduct("", temEnterCompetitor)
    }

    fun_Quantity(param) {
        const tempval = param.target.value
        const selecteddrop = this.state.brandcode
        // if dropdown not selected not allow  to edit text
        if (selecteddrop == "") {
            this.setState({ Quantitytext: '' })
            return
        }
        const testkey = /^\d*\.?\d+$/
        const testkeyalt = /^\d*\.$/
        if (tempval == "" || testkey.test(tempval) || testkeyalt.test(tempval)) {
            let temEnterCompetitor = this.state.Enterproduct
            temEnterCompetitor[selecteddrop] = { "rx": this.state.rx, "Value": this.state.valuetext, "Quantity": tempval, "Weightage": this.state.Weightage }
            this.setState({ Quantitytext: tempval, Enterproduct: temEnterCompetitor })
            this.props.funEnterproduct("", temEnterCompetitor)
        }
        else {
            const tem = this.state.Quantitytext
            this.setState({ Quantitytext: tem })
        }
    }

    funAutoQuantity(param) {
        const tempval = param.target.value
        const selecteddrop = this.state.brandcode
        // if dropdown not selected not allow  to edit text
        if (selecteddrop == "") {
            this.setState({ Quantitytext: '' })
            return
        }
        const testkey = /^\d*\.?\d+$/
        const testkeyalt = /^\d*\.$/
        if (tempval == "" || testkey.test(tempval) || testkeyalt.test(tempval)) {
            let calculatedValue = 0;
            calculatedValue = Number(tempval) * Number(this.state.unitPrice)
            if (calculatedValue == undefined || calculatedValue == NaN) {
                calculatedValue = ""
            }
            let temEnterCompetitor = this.state.Enterproduct
            temEnterCompetitor[selecteddrop] = { "rx": this.state.rx, "Value": calculatedValue, "Quantity": tempval, "Weightage": this.state.Weightage }
            this.setState({ Quantitytext: tempval, valuetext: calculatedValue, Enterproduct: temEnterCompetitor })
            this.props.funEnterproduct("", temEnterCompetitor);
        } else {
            const tem = this.state.Quantitytext
            this.setState({ Quantitytext: tem })
        }
    }

    setZeroVal(param) {
        let tempval = param.target.value
        if (tempval == "") {
            tempval = "0"
        }
        const selecteddrop = this.state.brandcode
        if (selecteddrop == "")
            return
        
        let temEnterCompetitor = this.state.Enterproduct
        temEnterCompetitor[selecteddrop] = { "rx": this.state.rx, "Value": tempval, "Quantity": this.state.Quantitytext, "Weightage": this.state.Weightage }
        this.setState({ valuetext: tempval, Enterproduct: temEnterCompetitor })
        this.props.funEnterproduct("", temEnterCompetitor)
    }

    fun_Value(param) {
        const tempval = param.target.value
        const selecteddrop = this.state.brandcode
        // if dropdown not selected not allow  to edit text
        if (selecteddrop == "") {
            this.setState({ valuetext: '' })
            return
        }
        const testkey = /^\d*\.?\d+$/
        const testkeyalt = /^\d*\.$/
        if (tempval == "" || testkey.test(tempval) || testkeyalt.test(tempval)) {
            let temEnterCompetitor = this.state.Enterproduct
            temEnterCompetitor[selecteddrop] = { "rx": this.state.rx, "Value": tempval, "Quantity": this.state.Quantitytext, "Weightage": this.state.Weightage }
            this.setState({ valuetext: tempval, Enterproduct: temEnterCompetitor })
            this.props.funEnterproduct("", temEnterCompetitor)
        } else {
            const tem = this.state.valuetext
            this.setState({ valuetext: tem })
        }
    }

    setZeroWeight(param) {
        let tempval = param.target.value
        if (tempval == "") {
            tempval = "0"
        }
        const selecteddrop = this.state.brandcode
        if (selecteddrop == "")
            return
        
        let temEnterCompetitor = this.state.Enterproduct
        temEnterCompetitor[selecteddrop] = { "rx": this.state.rx, "Value": this.state.valuetext, "Quantity": this.state.Quantitytext, "Weightage": tempval }
        this.setState({ Weightage: tempval, Enterproduct: temEnterCompetitor })
        this.props.funEnterproduct("", temEnterCompetitor)
    }

    fun_Weightage(param) {
        const tempval = param.target.value
        const selecteddrop = this.state.brandcode
        // if dropdown not selected not allow  to edit text
        if (selecteddrop == "") {
            this.setState({ Weightage: '' })
            return
        }
        // const testkey = /^[0-9]*$/
        const testkey = /^\d*\.?\d+$/
        const testkeyalt = /^\d*\.$/
        if (tempval == "" || testkey.test(tempval) || testkeyalt.test(tempval)) {
            if (Number(tempval) < 101) {
                let temEnterCompetitor = this.state.Enterproduct
                temEnterCompetitor[selecteddrop] = { "rx": this.state.rx, "Value": this.state.valuetext, "Quantity": this.state.Quantitytext, "Weightage": tempval }
                this.setState({ Weightage: tempval, Enterproduct: temEnterCompetitor })
                this.props.funEnterproduct("", temEnterCompetitor)
            } else {
                this.setState({ Weightage: "0" })    
            }
        } else {
            const tem = this.state.Weightage
            this.setState({ Weightage: tem })
        }

    }

    showCompModal() {
        if (this.state.brandcode != "") {
            this.setState({
                showModal: !this.state.showModal
            })
        } else {
            this.setState({
                loader: false,
                errorState: true,
                errorMessage: ' Please select brand to continue.'
            })
        }
    }

    errorClose() {
        this.setState({ errorState: false })
    }

    handleClose() {
        this.setState({ showModal: false });
    }

    render() {
        const loadRCP = this.props.loadRCP
        // if (this.state.rx == "") {
        //     this.setState({rx: "0"})
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
            <tbody>
                <tr className="eachRow">
                    {/* <td onClick={() => this.handleShow()} >
                        {this.state.showPlus ?
                            <img src="../public/assets/images/plus.svg" className="paddingTop" /> :
                            <img src="../public/assets/images/minus.svg" className="paddingTop" />}
                    </td> */}
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
                        getcheckedvalue={this.props.getcheckedvalue}
                    />
                    {loadRCP == undefined ? '' : loadRCP["N_RX_ACTIVE"] == "1" ?
                        <td>
                            <Form.Control id={this.selectedProduct + "rx"} value={this.state.rx} onChange={this.fun_Rx} onBlur={this.setZeroRx} type='text' className="valueinput" />
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
                    <td>
                        {/* <Button variant="primary" onClick={this.handleShow} >Add Comp Product Row</Button>{" "} */}
                        <Button variant="secondary" onClick={this.showCompModal} >New Comp Product</Button>
                    </td>
                </tr>

                <RCPAPopup RcpaNewEntry={this.RcpaNewEntry} showTaskModal={this.state.showModal} configurationData={this.props.configurationData} closeModal={this.handleClose} />
                {/* {this.state.showCompetitor ?
                     : null} */}

                <StatusPopup
                    message={this.state.errorMessage}
                    show={this.state.errorState}
                    onClose={this.errorClose}
                    success={false} />
                <React.Fragment>
                    <tr class="comp-row">
                        <td className="comptHead">Competitor Details</td>
                    </tr>
                    <AddNewComp 
                        loadRCP={loadRCP} 
                        func_compitior_data={this.props.func_compitior_data} 
                        // competitordata={this.props.competitordata} 
                        code={this.props.selectedProduct} 
                        brandcode={this.state.brandcode} 
                        newRows={this.handleAdd.bind(this)} 
                        addBtn={this.state.hideButton} 
                        newproducts={this.state.newproducts}
                        removeCompetitor={this.handleShow}
                        configurationData={this.props.configurationData}
                        funRCPARemove={this.props.funRCPARemove} 
                        RcpaNewEntry={this.RcpaNewEntry}
                        newlyadded={this.state.newlyadded}
                        isdisable={this.props.isdisable}
                        competitordata={this.state.competitordata}/>
                </React.Fragment>
            </tbody>
        );
    }
}

export default ProductRow