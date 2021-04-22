import React from 'react'
import { Button, Col, Container, Row, Table } from 'react-bootstrap'
import ProductRow from '../RCPA/ProductRow';
import AutoselectDropdown from '../components/AutoselectDropdown';
import StatusPopup from '../../lib/StatusPopup'

class ProductTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            valuetype: "",
            rxtype: "",
            qtytype: "",
            wtgtype: "",
            errorMessage: '',
            errorState: ''
        }

        this.errorClose = this.errorClose.bind(this)
    }

    componentDidMount() {
        // if (this.props.Editmodedata) {
        //     if (this.props.Editmodedata["Rcpa"]) {
        //         this.props.Editmodedata["Rcpa"].map( (a) => {
        //             // this.props.onRowAdd()
        //         })
        //     }
        // }
    }

    removeRow() {
        var elements = document.getElementsByClassName("eachRow");
        if (elements.length > 1) {
            var element = elements[elements.length - 1];
            
            let competitorToRemove = ""
            try {
                competitorToRemove = element.getElementsByClassName("dropdown")[0].getElementsByTagName("div")[0].innerHTML.split('(')[1];
                competitorToRemove = competitorToRemove.split(')')[0];
            } catch (e) {
                competitorToRemove = ""
            }

            this.props.productRCPARemove(competitorToRemove, false)
            // element.parentNode.parentNode.removeChild(element.parentNode);
        } else {
            this.setState({
                loader: false,
                errorState: true,
                errorMessage: 'You need atleast one Product to continue.'
            })
        }
    }

    removeAllRows() {
        var elements = document.getElementsByClassName("eachRow");
        for (var i=elements.length; i>0; i--) {
            var element = elements[i - 1];

            let competitorToRemove = ""
            try {
                competitorToRemove = element.getElementsByClassName("dropdown")[0].getElementsByTagName("div")[0].innerHTML.split('(')[1];
                competitorToRemove = competitorToRemove.split(')')[0];
            } catch (e) {
                competitorToRemove = ""
            }
            
            this.props.productRCPARemove(competitorToRemove, true)
            element.parentNode.parentNode.removeChild(element.parentNode);
        }

        this.props.onRowAdd()
    }

    errorClose() {
        this.setState({ errorState: false })
    }

    render() {
        var competitor = this.props.showComp
        const Productdrop = this.props.Productdrop
        const competitordata = this.props.competitordata
        const func_compitior_data = this.props.func_compitior_data
        const loadRCP = this.props.loadRCP // TODO: PLEASE REMOVE THIS OLD SERVER CONFIG FUNCTION
        const isdisable = this.props.isdisable
        const funEnterproduct=this.props.funEnterproduct 
        const Editmodedata=this.props.Editmodedata
        const doccode=this.props.doccode
        const selectedvales = this.props.selectedvales
        const getcheckedvalue = this.props.getcheckedvalue
        const configData = this.props.configurationData
        const funRCPARemove = this.props.funRCPARemove
        const checkedvalues = this.props.checkedvalues
        const isdelete = this.props.isdelete
        const productdropdata = this.props.productdropdata
        const previousval = this.props.previousval
        const FinalproductwiseRCPA = this.props.FinalproductwiseRCPA
        const setdelete = this.props.setdelete
        const uncheckdisabled = this.props.uncheckdisabled
        let savedConfigRX = ""
        let savedConfigQTY = ""
        let savedConfigVAL = ""
        let savedConfigWGHT = ""

        try {
            if (Editmodedata["Result"][0]) {
                savedConfigRX = Editmodedata["Result"][0]["N_RXTYPE"]
                savedConfigQTY = Editmodedata["Result"][0]["N_QTYTYPE"]
                savedConfigVAL = Editmodedata["Result"][0]["N_VALUETYPE"]
                savedConfigWGHT = Editmodedata["Result"][0]["N_WEIGHTAGETYPE"]
            }
        } catch (e) {
            // NOTHING NEEDS TO BE DONE
        }

        var product = this.props.products.map(function (product) {
            return (
                <ProductRow  
                    doccode={doccode} 
                    selectedProduct={product.selectedProduct}   
                    Editmodedata={Editmodedata}  
                    funEnterproduct={funEnterproduct}  
                    loadRCP={loadRCP} 
                    func_compitior_data={func_compitior_data} 
                    competitordata={competitordata} 
                    Productdrop={Productdrop} 
                    product={product} 
                    showComponent={competitor} 
                    key={product.id}
                    configurationData={configData}
                    funRCPARemove={funRCPARemove} 
                    isdisable={isdisable}
                    selectedvales={selectedvales}
                    getcheckedvalue={getcheckedvalue}
                    checkedvalues={checkedvalues} 
                    isdelete={isdelete}
                    productdropdata={productdropdata}
                    previousval={previousval}
                    FinalproductwiseRCPA={FinalproductwiseRCPA}
                    setdelete={setdelete}
                    uncheckdisabled={uncheckdisabled}/>
            )
        });

        let defaultRxValue = "7"
        if (this.props.configurationData.N_RXTYPE) {
            defaultRxValue = this.props.configurationData.N_RXTYPE
        }
        let isRxTypeChangeable = false
        if (this.props.configurationData.N_RXTYPE_CHANGE == "0") {
            isRxTypeChangeable = true
        }
        let isRxTypeActive = false
        if (this.props.configurationData.N_RX_ACTIVE == "1") {
            isRxTypeActive = true
        }
        let defaultQtyValue = "7"
        if (this.props.configurationData.N_QTYTYPE) {
            defaultQtyValue = this.props.configurationData.N_QTYTYPE
        }
        let isQtyTypeChangeable = false
        if (this.props.configurationData.N_QTYTYPE_CHANGE == "0") {
            isQtyTypeChangeable = true
        }
        let isQtyTypeActive = false
        if (this.props.configurationData.N_QTYTYPE_ACTIVE == "1") {
            isQtyTypeActive = true
        }
        let defaultValValue = "7"
        if (this.props.configurationData.N_VALUETYPE) {
            defaultValValue = this.props.configurationData.N_VALUETYPE
        }
        let isValTypeChangeable = false
        if (this.props.configurationData.N_VALUETYPE_CHANGE == "0") {
            isValTypeChangeable = true
        }
        let isValTypeActive = false
        if (this.props.configurationData.N_VALUETYPE_ACTIVE == "1") {
            isValTypeActive = true
        }
        let defaultWeightValue = "7"
        if (this.props.configurationData.N_WEIGHTAGETYPE) {
            defaultWeightValue = this.props.configurationData.N_WEIGHTAGETYPE
        }
        let isWeightTypeChangeable = false
        if (this.props.configurationData.N_WEIGHTAGETYPE_CHANGE == "0") {
            isWeightTypeChangeable = true
        }
        let isWeightTypeActive = false
        if (this.props.configurationData.N_WEIGHTAGE_ACTIVE == "1") {
            isWeightTypeActive = true
        }
        
        return (
            <div id="product-table">
                <StatusPopup
                    message={this.state.errorMessage}
                    show={this.state.errorState}
                    onClose={this.errorClose}
                    success={false} />
                <Container>
                    <Row>
                        { isRxTypeActive ? 
                            <Col>
                                <AutoselectDropdown on_auto_change={this.props.on_auto_change} name="RX Type" jsonkey="rxtype" savedValue={savedConfigRX} defaultValue={defaultRxValue} isChangeable={isRxTypeChangeable} isActive={isRxTypeActive} />
                            </Col>
                        : null }
                        { isQtyTypeActive ?
                            <Col>
                                <AutoselectDropdown on_auto_change={this.props.on_auto_change} name="Qty Type" jsonkey="qtytype" savedValue={savedConfigQTY} defaultValue={defaultQtyValue} isChangeable={isQtyTypeChangeable} isActive={isQtyTypeActive} />
                            </Col>
                        : null }
                        { isValTypeActive ? 
                            <Col>
                                <AutoselectDropdown on_auto_change={this.props.on_auto_change} name="Value Type" jsonkey="valuetype" savedValue={savedConfigVAL} defaultValue={defaultValValue} isChangeable={isValTypeChangeable} isActive={isValTypeActive} />
                            </Col>
                        : null }
                        { isWeightTypeActive ?
                            <Col>
                                <AutoselectDropdown on_auto_change={this.props.on_auto_change} name="Weightage Type" jsonkey="wtgtype" savedValue={savedConfigWGHT} defaultValue={defaultWeightValue} isChangeable={isWeightTypeChangeable} isActive={isWeightTypeActive} />
                            </Col>
                        : null }
                    </Row>
                </Container>
                <br />
                <div className="flex-row ">
                    <div className="rcpaproList paddLeft24">RCPA Product List</div>
                    <div className="padRight24">
                        <Button variant="danger" onClick={() => { this.removeAllRows() }}>Remove All Brands</Button>{" "}
                        <Button variant="warning" onClick={() => { this.removeRow() }}>Remove Brand</Button>{" "}
                        <Button variant="primary" onClick={this.props.onRowAdd}>Add Brand</Button>
                    </div>
                </div>
                <div className="rccpatable" >
                    <Table className="table">
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                { loadRCP == undefined ? '' : loadRCP["N_RX_ACTIVE"] == "1" ? <th>Rx</th> : '' }
                                { loadRCP == undefined ? '' : loadRCP["N_QTYTYPE_ACTIVE"] == "1" ? <th>Quantity</th> : '' }
                                { loadRCP == undefined ? '' : loadRCP["N_VALUETYPE_ACTIVE"] == "1" ? <th>Value(IN INR)</th> : '' }
                                { loadRCP == undefined ? '' : loadRCP["N_WEIGHTAGE_ACTIVE"] == "1" ? <th>Weightage(%)</th> : '' }
                                <th>Action</th>
                            </tr>
                        </thead>
                        { product }
                    </Table>
                </div>
            </div>
        );
    }
}

export default ProductTable