import React, { Component } from 'react'
import { Form, Table } from 'react-bootstrap'
import { Dropdown } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { getRCPA } from '../../actions/DCR'
import { postToServer } from '../../lib/comm-utils'
import RCPAPopup from '../popups/RCPAPopup';
import ProductRow from '../RCPA/ProductRow';

class ProductTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        
    }
    componentDidMount() {
       
            //  if(this.props.Editmodedata)
            //  {
 
            //      if(this.props.Editmodedata["Rcpa"]){
            //          this.props.Editmodedata["Rcpa"].map( (a)=>{
            //            // this.props.onRowAdd()
            //          } )
            //      }
            //  }
 
     }
    render() {
        var competitor = this.props.showComp
        const Productdrop = this.props.Productdrop
        const competitordata = this.props.competitordata
        const func_compitior_data = this.props.func_compitior_data
        const loadRCP = this.props.loadRCP
        const funEnterproduct=this.props.funEnterproduct 
        const   Editmodedata=this.props.Editmodedata
        const doccode=this.props.doccode
        var product = this.props.products.map(function (product) {
        return (<ProductRow  
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
            key={product.id} />)
        });
        return (
            <div>
                <div className="flex-row ">
                    <div className="rcpaproList paddLeft24">RCPA Product List</div>
                    <div className="padRight24"><button className="addDetailBtn" onClick={this.props.onRowAdd}>Add Details of Other Product</button></div>
                </div>
                <div className="rccpatable" >
                    <Table className="table" >
                        <thead>
                            <tr>
                               <th></th>
                                {/* {loadRCP == undefined ? '' : loadRCP["N_RX_ACTIVE"] == "1" ? <th>  {loadRCP["N_RX_ACTIVE"]}  </th> : ''} */} 
                                <th>Product Name</th>
                                {/* <th>Rx</th> */}
                                {loadRCP == undefined ? '' : loadRCP["N_RX_ACTIVE"] == "1" ? <th>Rx</th> : ''}
                                {/* <th>Quantity</th> */}
                                {loadRCP == undefined ? '' : loadRCP["N_QTYTYPE_ACTIVE"] == "1" ? <th>Quantity</th> : ''}
                                {/* <th>Value(IN INR)</th> */}
                                {loadRCP == undefined ? '' : loadRCP["N_VALUETYPE_ACTIVE"] == "1" ? <th>Value(IN INR)</th> : ''}
                                {/* <th>Weightage(%)</th> */}
                              {/*  {loadRCP == undefined ? '' : loadRCP["N_VALUETYPE_ACTIVE"] == "1" ? <th>Weightage(%)</th> : ''}*/}
                                <th>Action</th>
                            </tr>
                        </thead>
                        {product}
                    </Table>
                </div>
            </div>
        );
    }
}

export default ProductTable