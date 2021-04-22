import React,{Component} from 'react'
//import Form from 'react-bootstrap/FormGroup'
import { Row, Col, Breadcrumb, Dropdown, Tab,InputGroup , Form,Tabs} from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import Drop from '../../BasicComponet/DropDown'
import "../../../public/assets/css/user-setting.css";

    // const [currDate,setCurrentDate] = useState(new Date())
    // const [key, setKey] = useState("Product")
    // const [key2, setKey2] = useState("Rx/Quantity")
    // const [key3, setKey3] = useState("PTR")
    
    class RPSSetup extends Component {
        constructor(props) {
            super(props);
            this.state = {
                currDate: new Date(),
                key :"Product",
                key2 : "Rx/Quantity",
                key3:"PTR",
            }
    
    }
    render(){

        return(
        <div>
             {/* <div className="compProHead">
                RPS Setup
            </div> */}
            {/* <div className="flexDisplay ">
                <div className="user-ml20 userpt20">
                  
                    <div className="selectlocation  ">
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label className="customized-label">Serial Number</Form.Label>
                            <Form.Control type="text" className="customized-input" placeholder="Enter Serial Number" />
                        </Form.Group>
                    </div>
                </div>
                <div className="user-ml20 pt20">
                  
                  <div className="selectlocation  ">
                      <Form.Group controlId="formBasicEmail">
                          <Form.Label className="customized-label">Name</Form.Label>
                          <Form.Control type="text" className="customized-input" placeholder="Enter Name" />
                      </Form.Group>
                  </div>
                </div>
                <div className="user-ml20 userpt20">
                  
                  <div className="selectlocation  ">
                   
                      <Form.Label className="customized-label">Single RPS</Form.Label>
                        <div className="flexDisplay">
                        <div>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Control type="text" className="customized-input" placeholder="Enter Remarks" />
                            </Form.Group>
                        </div>
                      
                      </div>
                  </div>
                </div>
                <div className="user-ml20 userpt20">
                  
                  <div className="selectlocation  ">
                  <div>
                        <Form.Label className="customized-label">Valid Date (From)</Form.Label>
                        <div>
                            <InputGroup className="datepickerAligment controls text-right">
                                <DatePicker
                                selected={currDate}
                               
                                dateFormat="dd/MM/yyyy"
                                placeholderText="Enter or Select the Number"
                                />

                                <InputGroup.Append>
                                <InputGroup.Text>
                                    <img src="../../../public/assets/images/prpcalender.svg" alt="calendar" />
                                </InputGroup.Text>
                                </InputGroup.Append>
                            </InputGroup>
                        </div>
                    </div>
                  </div>
                </div>
                <div className="user-ml20 userpt20">
                  
                  <div className="selectlocation  ">
                  <div>
                        <Form.Label className="customized-label">Valid Date (To)</Form.Label>
                        <div>
                            <InputGroup className="datepickerAligment controls text-right">
                                <DatePicker
                                selected={currDate}
                               
                                dateFormat="dd/MM/yyyy"
                                placeholderText="Enter or Select the Number"
                                />

                                <InputGroup.Append>
                                <InputGroup.Text>
                                    <img src="../../../public/assets/images/prpcalender.svg" alt="calendar" />
                                </InputGroup.Text>
                                </InputGroup.Append>
                            </InputGroup>
                        </div>
                    </div>
                  </div>
                </div>
                <div className="user-ml20 userpt20">
                    <Form.Label className="customized-label">ROI Details</Form.Label>
                    <div className="inputBorder">
                        <Button href="#">Rx/Quantity</Button> 
                        <Button href="#">Rx/Quantity</Button>
                        <Button href="#">Rx/Quantity</Button>
                    </div>
                </div>
                <div className="user-ml20 userpt20">
                    <Form.Label className="customized-label">ROI Details</Form.Label>
                    <div className="inputBorder">
                        <Button href="#">Rx/Quantity</Button> 
                        <Button href="#">Rx/Quantity</Button>
                        <Button href="#">Rx/Quantity</Button>
                    </div>
                </div>
                <div className="user-ml20 userpt20">
                    <Form.Label className="customized-label">Doctor Profile</Form.Label>
                <div className="selectlocation  ">
                    <Drop name={"fromarea"} Type={1}   />
                </div>
                </div>
                <div className="user-ml20 userpt20">
                    <Form.Label className="customized-label">RCPA Value display</Form.Label>
                            <div>
                                <label className="switchY">
                                    <input type="checkbox"  />
                                        <div className="sliderY round">
                                            <span className="onY">Yes</span>
                                            <span className="offY">No</span>
                                        </div>
                                </label>
                            </div>
                        </div>
                <div>
                    <Button onClick="" className="userGoBtn">Load</Button>
                </div>
            </div> */}
            <Row>
                <Col lg={4} md={4} sm={4}>
                    <div className="user-ml20 userpt20">
                        <div>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label className="customized-label">Serial Number</Form.Label>
                                <Form.Control type="text" className="customized-input" placeholder="Enter Serial Number" />
                            </Form.Group>
                        </div>
                    </div>
                </Col>
                <Col  lg={4} md={4} sm={4}>
                    <div className="user-ml20 pt20">
                        <div>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label className="customized-label">Name</Form.Label>
                                <Form.Control type="text" className="customized-input" placeholder="Enter Name" />
                            </Form.Group>
                        </div>
                    </div>
                </Col>
                <Col  lg={4} md={4} sm={4}>
                    <div className="user-ml20 userpt20">
                        <div>
                            <Form.Label className="customized-label">Single RPS</Form.Label>
                            <div className="flexDisplay">
                                <div>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Control type="text" className="customized-input" placeholder="Enter Remarks" />
                                    </Form.Group>
                                </div>
                                {/* <div>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Control type="text" className="customized-input" placeholder="Enter Remarks" />
                                    </Form.Group>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col  lg={4} md={4} sm={4}>
                    <div className="user-ml20 ">
                        <Form.Label className="customized-label">Valid Date (From)</Form.Label>
                            <InputGroup className="datepickerAligment controls text-right">
                                <DatePicker
                                selected={this.state.currDate}
                                dateFormat="dd/MM/yyyy"
                                placeholderText="Enter or Select the Number"
                                />

                                <InputGroup.Append>
                                <InputGroup.Text>
                                    <img src="../../../public/assets/images/prpcalender.svg" alt="calendar" />
                                </InputGroup.Text>
                                </InputGroup.Append>
                            </InputGroup>
                    </div>
                </Col>
                <Col  lg={4} md={4} sm={4}>
                    <div className="user-ml20 ">
                        <Form.Label className="customized-label">Valid Date (From)</Form.Label>
                            <InputGroup className="datepickerAligment controls text-right">
                                <DatePicker
                                selected={this.state.currDate}
                                dateFormat="dd/MM/yyyy"
                                placeholderText="Enter or Select the Number"
                                />

                                <InputGroup.Append>
                                <InputGroup.Text>
                                    <img src="../../../public/assets/images/prpcalender.svg" alt="calendar" />
                                </InputGroup.Text>
                                </InputGroup.Append>
                            </InputGroup>
                    </div>
                </Col>
                <Col  lg={4} md={4} sm={4}>
                        <div className="user-ml20 ">
                        <Form.Label className="customized-label">ROI on</Form.Label>
                        <InputGroup className="datepickerAligment controls text-right">
                         <div className="rps-tabsborder">
                            <Tabs
                                id="controlled-tab-example"
                                className="dcrtab-req  rpsetuptab"
                                activeKey={this.state.key}
                            onSelect={key => this.setState({ key })}
                            >
                                <Tab eventKey="Product"  title = "Product"  >
                                    {/* <div className="maineContent">
                                   Product
                                     </div> */}
                                </Tab>
                                <Tab eventKey="Brand" title="Brand">
                                    {/* <div className="maineContent">
                                    Brand
                                     </div> */}
                                </Tab>

                                <Tab eventKey="Group" title="Group">
                                    {/* <div className="maineContent">
                                    Group
                                     </div> */}
                                </Tab>
                            </Tabs>
                            </div>

                            </InputGroup>

                        </div>
                </Col>
            </Row>
            <Row>
                <Col  lg={4} md={4} sm={4}>
                <div className="user-ml20 ">
                        <Form.Label className="customized-label">ROI Detail</Form.Label>
                        <InputGroup className="datepickerAligment controls text-right">
                         <div className="rps-tabsborder">
                            <Tabs
                                id="controlled-tab-example"
                                className="dcrtab-req  rpsetuptab"
                                activeKey={this.state.key2}
                            onSelect={key2 => this.setState({ key2 })}
                            >
                                <Tab eventKey="Rx/Quantity"  title = "Rx/Quantity"  >
                                    {/* <div className="maineContent">
                                   Rx/Quantity
                                     </div> */}
                                </Tab>
                                <Tab eventKey="Value" title="Value">
                                    {/* <div className="maineContent">
                                    Value
                                     </div> */}
                                </Tab>

                                <Tab eventKey="Both" title="Both">
                                    {/* <div className="maineContent">
                                    Both
                                     </div> */}
                                </Tab>
                            </Tabs>
                            </div>

                            </InputGroup>

                        </div>
                </Col>
                <Col  lg={4} md={4} sm={4}>
                <div className="user-ml20 ">
                        <Form.Label className="customized-label">Item Rate Type</Form.Label>
                        <InputGroup className="datepickerAligment controls text-right">
                         <div className="rps-tabsborder">
                            <Tabs
                                id="controlled-tab-example"
                                className="dcrtab-req  rpsetuptab"
                                activeKey={this.state.key3}
                            onSelect={key3 => this.setState({ key3 })}
                            >
                                <Tab eventKey="PTR"  title = "PTR"  >
                                    {/* <div className="maineContent">
                                   PTR
                                     </div> */}
                                </Tab>
                                <Tab eventKey="PTS" title="PTS">
                                    {/* <div className="maineContent">
                                    PTS
                                     </div> */}
                                </Tab>

                                <Tab eventKey="STP" title="STP">
                                    {/* <div className="maineContent">
                                    STP
                                     </div> */}
                                </Tab>

                                <Tab eventKey="MRP" title="MRP">
                                    {/* <div className="maineContent">
                                    MRP
                                     </div> */}
                                </Tab>
                            </Tabs>
                            </div>

                            </InputGroup>

                        </div>
                </Col>
                <Col  lg={4} md={4} sm={4}>
                    <div className="user-ml20 ">
                    <Form.Label className="customized-label">Doctor Profile</Form.Label>
                    <div className="selectlocation  ">
                        <Drop name={"fromarea"} Type={1}   />
                    </div>
                    </div>
                </Col>
                
            </Row>
            <Row>
                <Col  lg={4} md={4} sm={4}>
                    <div className="user-ml20 ">
                    <Form.Label className="customized-label">RCPA Value display</Form.Label>
                    <div>
                        <span className="onY">Yes</span>
                        <label className="switchY">
                            <input type="checkbox"  />
                                <div className="sliderY round">
                                    {/* <span className="onY">Yes</span>
                                    <span className="offY">No</span> */}
                                </div>
                        </label>
                        <span className="offY">No</span>
                    </div>
                    </div>
                </Col>
                
                <Col  lg={4} md={4} sm={4}>
                    <div className="user-ml20 ">
                    <Form.Label className="customized-label">View Budget Details </Form.Label>
                    <div>
                        <label className="switchY">
                            <input type="checkbox"  />
                                <div className="sliderY round">
                                    <span className="onY">Yes</span>
                                    <span className="offY">No</span>
                                </div>
                        </label>
                    </div>
                    </div>
                </Col>
                <Col  lg={4} md={4} sm={4}>
                    <div className="user-ml20 ">
                    <Form.Label className="customized-label">Validate Budget value on Entry </Form.Label>
                    <div>
                        <label className="switchY">
                            <input type="checkbox"  />
                                <div className="sliderY round">
                                    <span className="onY">Yes</span>
                                    <span className="offY">No</span>
                                </div>
                        </label>
                    </div>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col  lg={4} md={4} sm={4}>
                    <div className="user-ml20 ">
                        <Form.Label className="customized-label">Doctor Phone Number Editable  </Form.Label>
                        <div>
                            <label className="switchY">
                                <input type="checkbox"  />
                                    <div className="sliderY round">
                                        <span className="onY">Yes</span>
                                        <span className="offY">No</span>
                                    </div>
                            </label>
                        </div>
                    </div>
                </Col>
                <Col  lg={4} md={4} sm={4}>
                    <div className="user-ml20 ">
                        <Form.Label className="customized-label">Doctor Email ID </Form.Label>
                        <div>
                            <label className="switchY">
                                <input type="checkbox"  />
                                    <div className="sliderY round">
                                        <span className="onY">Yes</span>
                                        <span className="offY">No</span>
                                    </div>
                            </label>
                        </div>
                    </div>
                </Col>
                <Col  lg={4} md={4} sm={4}>
                    <div className="user-ml20 ">
                        <Form.Label className="customized-label">Update Above 3 To Doctor Master </Form.Label>
                        <div>
                            <label className="switchY">
                                <input type="checkbox"  />
                                    <div className="sliderY round">
                                        <span className="onY">Yes</span>
                                        <span className="offY">No</span>
                                    </div>
                            </label>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col  lg={4} md={4} sm={4}>
                    <div className="user-ml20 ">
                        <Form.Label className="customized-label">Requirment From Doctor</Form.Label>
                        <div>
                            <label className="switchY">
                                <input type="checkbox"  />
                                    <div className="sliderY round">
                                        <span className="onY">Yes</span>
                                        <span className="offY">No</span>
                                    </div>
                            </label>
                        </div>
                    </div>
                </Col>
                <Col  lg={4} md={4} sm={4}>
                    <div className="user-ml20 ">
                        <Form.Label className="customized-label">Remarks </Form.Label>
                        <div>
                            <label className="switchY">
                                <input type="checkbox"  className='custom-control-input' disabled />
                                    <div className="sliderY round">
                                        <span className="onY">Yes</span>
                                        <span className="offY">No</span>
                                    </div>
                            </label>
                        </div>
                    </div>
                </Col>
                <Col  lg={4} md={4} sm={4}>
                    <div className="user-ml20 ">
                        <Form.Label className="customized-label">Sales Data Display(Request Entry) </Form.Label>
                        <div>
                            <label className="switchY">
                                <input type="checkbox"  />
                                    <div className="sliderY round">
                                        <span className="onY">Yes</span>
                                        <span className="offY">No</span>
                                    </div>
                            </label>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col  lg={4} md={4} sm={4}>
                    <div className="user-ml20 ">
                        <Form.Label className="customized-label">Visit Details (1-6 Month)</Form.Label>
                        <div>
                            <label className="switchY">
                                <input type="checkbox"  />
                                    <div className="sliderY round">
                                        <span className="onY">Yes</span>
                                        <span className="offY">No</span>
                                    </div>
                            </label>
                        </div>
                    </div>
                </Col>
                <Col  lg={4} md={4} sm={4}>
                    <div className="user-ml20 ">
                        <Form.Label className="customized-label">MR RPS History </Form.Label>
                        <div>
                            <label className="switchY">
                                <input type="checkbox"  />
                                    <div className="sliderY round">
                                        <span className="onY">Yes</span>
                                        <span className="offY">No</span>
                                    </div>
                            </label>
                        </div>
                    </div>
                </Col>
                <Col  lg={4} md={4} sm={4}>
                    <div className="user-ml20 ">
                        <Form.Label className="customized-label">Doctor RPS History </Form.Label>
                        <div>
                            <label className="switchY">
                                <input type="checkbox"  />
                                    <div className="sliderY round">
                                        <span className="onY">Yes</span>
                                        <span className="offY">No</span>
                                    </div>
                            </label>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col  lg={4} md={4} sm={4}>
                    <div className="user-ml20 ">
                        <Form.Label className="customized-label">Upload File</Form.Label>
                        <div>
                            <label className="switchY">
                                <input type="checkbox"  />
                                    <div className="sliderY round">
                                        <span className="onY">Yes</span>
                                        <span className="offY">No</span>
                                    </div>
                            </label>
                        </div>
                    </div>
                </Col>
                <Col  lg={4} md={4} sm={4}>
                    <div className="user-ml20 ">
                        <Form.Label className="customized-label">Request Editable </Form.Label>
                        <div>
                            <label className="switchY">
                                <input type="checkbox"  />
                                    <div className="sliderY round">
                                        <span className="onY">Yes</span>
                                        <span className="offY">No</span>
                                    </div>
                            </label>
                        </div>
                    </div>
                </Col>
                <Col  lg={4} md={4} sm={4}>
                    <div className="user-ml20 ">
                        <Form.Label className="customized-label">Print </Form.Label>
                        <div>
                            <label className="switchY">
                                <input type="checkbox"  />
                                    <div className="sliderY round">
                                        <span className="onY">Yes</span>
                                        <span className="offY">No</span>
                                    </div>
                            </label>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col  lg={4} md={4} sm={4}>
                        <div className="user-ml20 ">
                            <Form.Label className="customized-label">Status </Form.Label>
                            <div>
                                <label className="switchY">
                                    <input type="checkbox"  />
                                        <div className="sliderY round">
                                            <span className="onY">Yes</span>
                                            <span className="offY">No</span>
                                        </div>
                                </label>
                            </div>
                        </div>
                    </Col>
            </Row>
            
        </div>
    )
 }
}

export default RPSSetup