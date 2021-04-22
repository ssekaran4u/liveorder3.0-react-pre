import React from 'react'
import { Form, Table,Row, Col } from 'react-bootstrap'
import { Dropdown } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { getRCPA } from '../../actions/DCR'
import { postToServer } from '../../lib/comm-utils'
import RCPAPopup from '../popups/RCPAPopup';
import { isThisSecond } from 'date-fns';

class EditableDropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            brandcode:"-1",
            Productdrop:[],
            trycheck : false
        }

        this.selectedProduct = this.selectedProduct.bind(this)
        this.handlechange = this.handlechange.bind(this)
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     return this.props.selectedProductcode !== nextProps.selectedProductcode || this.props.Productdrop.length !== nextProps.Productdrop.length || this.state.brandcode !== nextState.brandcode;
    // }
    

    selectedProduct(event) {
        const productId = event.currentTarget.id;

        let unitPrice = "";
        for (var i=0; i<this.props.Productdrop.length; i++) {
            if (this.props.Productdrop[i].id == productId) {
                unitPrice = this.props.Productdrop[i].unitPrice;
                break;
            }
        }
        
        this.setState({ brandcode: productId })
        this.props.selectedProduct(productId, unitPrice)
    }

    componentDidUpdate(old, olds){
        if (old.selectedProductcode != olds.brandcode) {
            const productId = old.selectedProductcode;

            if (productId != "") {
                let unitPrice = "";
                for (var i=0; i<this.props.Productdrop.length; i++) {
                    if (this.props.Productdrop[i].id == productId) {
                        unitPrice = this.props.Productdrop[i].unitPrice;
                        break;
                    }
                }
    
                this.setState({ brandcode: productId })
                this.props.selectedProduct(productId, unitPrice)
            }
        }

        if(old.selectedProductcode != this.props.selectedProductcode){
            const j=this.props.selectedProductcode
            this.setState({ brandcode:j })
        }
    }

    componentDidMount(){ 
        if(this.props.selectedProductcode){
            const productId = this.props.selectedProductcode;
            let unitPrice = "";
            for (var i=0; i<this.props.Productdrop.length; i++) {
                if (this.props.Productdrop[i].id == productId) {
                    unitPrice = this.props.Productdrop[i].unitPrice;
                    break;
                }
            }
            this.setState({ brandcode: productId })
            this.props.selectedProduct(productId, unitPrice)
        }
    }
    handlechange(e){
        this.setState({
            trycheck: !this.state.trycheck,
        });
        this.props.getcheckedvalue(this.state.brandcode)
    }
    render() {
        return (
            <td>
                <Row>
									  {this.state.brandcode != -1 ?
                <Col xl={1}><input 
                type="checkbox"
                checked={this.state.trycheck}
                onChange={(e) => this.handlechange(e)}
                className="selectablecheckbox"
                value={this.state.brandcode}
                ref={this.myRef}/></Col> : null}
                    
								<Col xl={9}><Dropdown 
                onChange={this.selectedProduct} 
                edit search fluid selection 
                options={this.props.Productdrop} 
                style={this.state.brandcode == -1 ? {"color":"#495057"}: {"color":"black"}}
                value={this.state.brandcode}
                className="dropdownvalues"
                 /></Col>
                 </Row>
            </td>
        );
    }
}

 export default EditableDropdown