import React,{Component} from 'react'
import Drop from '../../BasicComponet/DropDown'
import {Form,Button} from 'react-bootstrap'
import Table from "react-bootstrap/Table";


class SourceAccordianDetails extends Component{
    constructor(props){
        super(props)
        this.state={
            
        }
    }

    render(){
        return(
            <div>
                <div className="rcpaHeading">
                    RCPA Product List
                </div>
                <div className="flex-row proPad">
                    <div>
                        <Form.Label className="customized-label">Add Brand</Form.Label>
                        <div className="selectlocation  ">
                            <Drop name={"fromarea"} Type={1}  placeholder="Day" />
                        </div>
                    </div>
                   
                    <div>
                        <div className="flexDisplay">
                            <div  className="brandBtnPad">
                                <Button className="brandBtn">Remove Brand</Button>
                            </div>
                            <div className="brandBtnPad">
                                <Button className="brandBtn">Remove all Brand</Button>
                            </div>
                        </div>
                    </div>
                   
                </div>
                <div className="flexDisplay ">
                    <div className="datatable swetatable outer" >
                            <div className="table-responsive inner">
                            <Table>
                                    <thead className="thead-default">
                                        <tr className="thead-tr-default">
                                        <th className="thead-th-default fix">Product Details</th>
                                            <th className="thead-th-default fix">Rx</th>
                                            <th className="thead-th-default fix">Quantity</th>
                                            <th className="thead-th-default">Value(INR)</th>
                                            <th className="thead-th-default pr15">Weightage(%)</th>
                                            <th style={{"padding":"0px 24px","backgroundColor":"transparent"}}></th>
                                            <th className="thead-th-default fix">Competitor Details</th>
                                            <th className="thead-th-default fix">Rx</th>
                                            <th className="thead-th-default fix">Quantity</th>
                                            <th className="thead-th-default">Value(INR)</th>
                                            <th className="thead-th-default">Weightage(%)</th>
                                        </tr>
                                    </thead>
                                    <tbody className="tbody-default">
                                        <tr className="thead-tr-default">
                                        <td className="thead-th-default fix">
                                        <div className="flexDisplay">
                                                    <div>
                                                        <Form.Check 
                                                            custom
                                                            inline
                                                            type="checkbox"
                                                            id="custom-checkbox1"
                                                            label=""
                                                        />
                                                    </div>
                                                    <div>Dolo</div>
                                                </div>
                                        </td>
                                        <td className="thead-th-default fix">
                                                <div className="rate-qty-sec">
                                                    <Form.Control 
                                                        type="text" 
                                                        className="customized-input" 
                                                        onChange=""
                                                        value="10"
                                                    />
                                                </div>
                                                
                                            </td>
                                            <td className="thead-th-default fix">
                                                <div className="rate-qty-sec">
                                                    <Form.Control 
                                                        type="text" 
                                                        className="customized-input" 
                                                        onChange=""
                                                        value="10"
                                                    />
                                                </div>
                                               
                                            </td>
                                            <td className="thead-th-default fix">
                                                <div className="value-text">
                                                    <Form.Control 
                                                        type="text" 
                                                        className="customized-input" 
                                                        onChange=""
                                                        value="50,000"
                                                    />
                                                </div>
                                                
                                            </td>
                                            <td className="thead-th-default fix">
                                            <div className="rate-qty-sec">
                                                    <Form.Control 
                                                        type="text" 
                                                        className="customized-input" 
                                                        onChange=""
                                                        value="45"
                                                    />
                                                </div>
                                            </td>
                                            <td></td>
                                            <td>
                                            <div className="flexDisplay">
                                                    <div>
                                                        <Form.Check 
                                                            custom
                                                            inline
                                                            type="checkbox"
                                                            id="custom-checkbox1"
                                                            label=""
                                                        />
                                                    </div>
                                                    <div className="">
                                                        <Form.Control 
                                                            type="text" 
                                                            className="customized-input" 
                                                            onChange=""
                                                            value="Product Name"
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                <div className="selectlocation pt20 ">
                                                    <Drop name={"fromarea"} Type={1}  placeholder="Day" />
                                                </div>
                                                </div>
                                            </td>
                                            <td className="thead-th-default fix" >
                                                <div className="rate-qty-sec">
                                                    <Form.Control 
                                                        type="text" 
                                                        className="customized-input" 
                                                        onChange=""
                                                        value="10"
                                                    />
                                                </div>
                                               <div className="pt20">
                                                   <Button style={{"width":"66px"}}>Add </Button>
                                               </div>
                                            </td>
                                            <td className="thead-th-default fix " >
                                                <div className="rate-qty-sec">
                                                    <Form.Control 
                                                        type="text" 
                                                        className="customized-input" 
                                                        onChange=""
                                                        value="10"
                                                    />
                                                </div>
                                               
                                            </td>
                                            <td className="thead-th-default fix " >
                                                <div className="value-text">
                                                    <Form.Control 
                                                        type="text" 
                                                        className="customized-input" 
                                                        onChange=""
                                                        value="50,000"
                                                    />
                                                </div>
                                                <div className="pt20">
                                                   <Button>Remove</Button>
                                               </div>
                                            </td>
                                            <td className="thead-th-default fix">
                                            <div className="rate-qty-sec">
                                                    <Form.Control 
                                                        type="text" 
                                                        className="customized-input" 
                                                        onChange=""
                                                        value="45"
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                                    
                            </div>
                               
                    </div>
                </div>
            </div>
        )
    }
}

export default SourceAccordianDetails