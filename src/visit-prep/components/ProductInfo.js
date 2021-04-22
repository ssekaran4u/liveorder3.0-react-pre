import React, { Component } from "react";
import { postToServer } from '../../lib/comm-utils'
import { Table, Form } from "react-bootstrap";

class ProductInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFull: false,
            itemArray:[]
        };
        this.handleView = this.handleView.bind(this);
        this.handleChange = this.handleChange.bind(this)
    }
    componentDidMount(){
     //   const doccode = this.match.param.id;console.log("d",doccode)
        this.getProducts()
    }
    handleView() {
        this.setState({
            isFull: !this.state.isFull
        });
    }
    getProducts() { 
        var  data = {
            "Data":{"doc": this.props.doccode},
            "index": "downloadDcrPdt"
           
        }
        postToServer("DCRAPI", data).then((result) => { 
            
            if (result.data["Status"] == "Success") {
                this.setState({ product: result.data.downloadDcrPdt })

              
            } 


        }).catch((error) => {
          
         //   console.log(error)
        
        })

    }
    handleChange(e){
        const value =  e.target.value
        const name=e.target.name
        const id = e.target.id
        this.state.itemArray.push({
            itemvalue:value,
            itemid:id,
            name: name,
            doc_code:this.props.doccode
        })
        this.props.sendProducts(this.state.itemArray)
    }
    render() { 
        if(!this.state.product){
            return null
        }
        return (
            <div className={this.state.isFull ? "fullscreenView" : ""}>
                <div className="visit-product-container">
                    <div className="product-spacing">
                        <h3 className="container-head">PRODUCT WISE TREND</h3>
                        <img
                            src="../../public/assets/images/fullscreen.svg"
                            alt="full-screen"
                            onClick={this.handleView}
                        />
                    </div>
                    {/* <Table responsive className="visit-product-table">
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Overall Gain(%)</th>
                                <th>Influencer</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <Form.Check
                                        custom
                                        type="checkbox"
                                        id="checkbox8"
                                        label="Atmoflux 500mg"
                                        className="sampleCheckbox m-0"
                                    />
                                </td>
                                <td>
                                    <span className="arrow-up">33.34</span>
                                </td>
                                <td>
                                    <ul className="product-influencer">
                                        <li>
                                            <span className="arrow-up">
                                                33.34
                                            </span>
                                            <span className="influencer-name">
                                                Amba Medical
                                            </span>
                                        </li>
                                        <li>
                                            <span className="arrow-down">
                                                33.34
                                            </span>
                                            <span className="influencer-name">
                                                Amba Medical
                                            </span>
                                        </li>
                                        <li>
                                            <span className="arrow-down">
                                                33.34
                                            </span>
                                            <span className="influencer-name">
                                                Amba Medical
                                            </span>
                                        </li>
                                    </ul>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Form.Check
                                        custom
                                        type="checkbox"
                                        id="checkbox9"
                                        label="Atmoflux 650mg"
                                        className="sampleCheckbox m-0"
                                    />
                                </td>
                                <td>
                                    <span className="arrow-up">33.34</span>
                                </td>
                                <td>
                                    <ul className="product-influencer">
                                        <li>
                                            <span className="arrow-up">
                                                33.34
                                            </span>
                                            <span className="influencer-name">
                                                Amba Medical
                                            </span>
                                        </li>
                                        <li>
                                            <span className="arrow-down">
                                                33.34
                                            </span>
                                            <span className="influencer-name">
                                                Amba Medical
                                            </span>
                                        </li>
                                        <li>
                                            <span className="arrow-down">
                                                33.34
                                            </span>
                                            <span className="influencer-name">
                                                Amba Medical
                                            </span>
                                        </li>
                                    </ul>
                                </td>
                            </tr>
                        </tbody>
                    </Table> */}
                    {/* <Table responsive className="visit-product-table">
                        <thead>
                            <tr>
                                <th>Product Name</th>
                               
                            </tr>
                        </thead>
                        <tbody>
                            
                            {this.state.product.map((item) => (
                                <tr>
                                    <div className="visitCheckboxpad">
                                    <Form.Check 
                                        custom
                                        type="checkbox"
                                        id={item.c_item_code + this.props.doccode}
                                        label={item.c_name}
                                        name={item.c_name}
                                        value={item.c_item_code}
                                        className="sampleCheckbox"
                                        onChange={this.handleChange}
                                    />
                                    </div>
                                </tr>
                            ))}
                               
                           
                        </tbody>
                    </Table> */}
                    <div className="container-head productHead">
                    Product Name 
                    </div>
                    <div className="productContainer">
                    {this.state.product.map((item) => (
                              
                                    <div className="visitCheckboxpad">
                                    <Form.Check 
                                        custom
                                        type="checkbox"
                                        id={item.c_item_code + this.props.doccode}
                                        label={item.c_name}
                                        name={item.c_name}
                                        value={item.c_item_code}
                                        className="sampleCheckbox"
                                        onChange={this.handleChange}
                                    />
                                    </div>
                                
                            ))}
                               
                    </div>
                </div>
            </div>
        );
    }
}

export default ProductInfo;