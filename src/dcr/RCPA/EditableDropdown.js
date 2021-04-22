import React, { Component } from 'react'
import { Form, Table } from 'react-bootstrap'
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
            Productdrop:[]
            
        }

        this.selectedProduct = this.selectedProduct.bind(this)
    }

    selectedProduct(event) {
        const product=event.currentTarget.id
        this.setState({ brandcode: product })
        this.props.selectedProduct(product)
    }
    componentDidUpdate(old,olds){



        // if(old.Productdrop!= this.props.Productdrop){
        //      const v=this.props.Productdrop
        //      this.setState({Productdrop:v, brandcode:this.props.selectedProductcode})


        //      console.log( this.props.selectedProductcode,  this.props.Productdrop  ? this.props.Productdrop[0] ?  this.props.Productdrop :null :null,"kumar coding")
             //this.setState({ })
          //  alert('d')
        // }
        if(old.selectedProductcode!=this.props.selectedProductcode){
            const j=this.props.selectedProductcode
            this.setState({ brandcode:j })
        }

    }
    componentDidMount(){ 
        if(this.props.selectedProductcode){
            this.setState({ brandcode:this.props.selectedProductcode })
        }
        
    }
    
    render() {
    // if(!this.props.Productdrop){
    //     return null
    // }
        // console.log(  this.props.Productdrop  ? this.props.Productdrop[0] ?  this.props.Productdrop :null :null,"kumar coding")
        return (
            <td>
                <Dropdown   onChange={this.selectedProduct} 
                search fluid selection 
                options={this.props.Productdrop} 
                style={this.state.brandcode == -1 ? {"color":"#495057"}: {"color":"black"}}
                value={this.state.brandcode}
                 />
            </td>
        );
    }
}

 export default EditableDropdown