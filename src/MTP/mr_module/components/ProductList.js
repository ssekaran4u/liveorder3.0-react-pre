import React,{Component} from 'react'
import { Dropdown , Form,Button} from 'react-bootstrap'

class ProductList extends Component{

    render(){
        return(
            <div>
                 <Dropdown className="multiple-dropdown marginBot10">
                    <Dropdown.Toggle id="dropdown-basic" className=""   >
                        {/* <SearchInput  compVal="expense" data={this.props.data} update={this.update} /> */}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <div className="pl20 paddingTop jointData cal-scrollbar">
                        <div className="otherExHeading">PRODUCT</div>
                            <Form className="">
                              {/* <OtherExcheck/> */}
                              <Form.Check 
                                custom
                                type="checkbox"
                            
                                id={121}
                                label="product" 
                                className="mb-2 jointCheck"
                                name="product"
                                onChange={this.handleChange}
                   
                />
                              {/* <OtherexAmount/> */}
                             
                            </Form>
                            {/* <div>TOTAL AMOUNT:{'\u20B9'}1,500</div> */}
                        </div>
                        {/* <div className="sfcTotalEx">Total Amount :{this.state.totalSum ? this.state.totalSum:this.props.totalAmount}</div> */}
                        <Dropdown.Item eventKey="1">
                            <button  className="doneBtn" >Save</button>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        )
    }
}

export default ProductList