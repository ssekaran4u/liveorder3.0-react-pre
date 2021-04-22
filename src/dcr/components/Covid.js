import React,{Component} from 'react'
import ProductList from '../components/ProductList'
import {Row,Col,Form,Card,Button} from 'react-bootstrap'
import SearchDropdown from '../components/SearchDropdown'

class Covid extends Component{
    constructor(props){
        super(props)
    }

    getData(){

    }
    render(){
        return(
            <React.Fragment >
            <div className="marginTop16 dcr-list-sec">
                <div className="dcrboxhead">
                    Search below for An activity
                    </div>
                    
                <div className="dcrsearch">
                    <Row>
                        <Col lg={3} md={3} sm={3}>
                            <Form.Label className="customized-label">Product</Form.Label>
                            <ProductList />
                        </Col>
                        <Col lg={9} md={9} sm={9}>
                            <Form.Label className="customized-label">Search Doctor</Form.Label>
                            <Form.Control 
                                type="text"
                            />
                        {/* <SearchDropdown
                            // data={array}
                            // key={4}
                            // id={"SearchDropdown12"}
                            // getData={this.getData.bind(this)}
                            // selection={null ? 'checked' : null}
                            // id={12}
                            // item={array}
                            // type={"1"}
                        />  */}
                        </Col>
                    </Row>
                </div>
                </div>
                <div className='dcr-list-sec meetingDiv marginTop21'>
                    {/* <Card > */}
                        <div className="marginBottom parentAccordian">
                           <Row>
                               <Col lg={6} md={6} sm={6}>
                                  <Row>
                                      <Col  lg={4} md={4} sm={4}>
                                      <div>
                                        <img src="../public/assets/images/invoice.png" className="covidImg covidpad" /> 
                                    </div>
                                      </Col>
                                      <Col  lg={4} md={4} sm={4}>
                                      <div>
                                        <img src="../public/assets/images/invoice.png" className="covidImg covidpad"/> 
                                    </div>
                                      </Col>
                                      <Col  lg={4} md={4} sm={4}>
                                      <div>
                                        <img src="../public/assets/images/invoice.png" className="covidImg covidpad"/> 
                                    </div>
                                      </Col>
                                  </Row>
                                  <Row>
                                      <Col  lg={4} md={4} sm={4}>
                                      <div>
                                        <img src="../public/assets/images/invoice.png" className="covidImg covidpad" /> 
                                    </div>
                                      </Col>
                                      <Col  lg={4} md={4} sm={4}>
                                      <div>
                                        <img src="../public/assets/images/invoice.png" className="covidImg covidpad"/> 
                                    </div>
                                      </Col>
                                   
                                  </Row>
                                  
                                  
                               </Col>
                               <Col lg={6} md={6} sm={6}>
                                <div className="pad10">
                                <Form.Label className="customized-label">Choose Mode : -</Form.Label>
                                    <div className="pad6">
                                        <Form.Check
                                            custom
                                            inline
                                            type="radio"
                                            id="custom-radio1"
                                            label="Email"
                                        />
                                    </div>
                                    <div  className="pad6">
                                        <Form.Check
                                            custom
                                            inline
                                            type="radio"
                                            id="custom-radio1"
                                            label="SMS"
                                        />
                                    </div>
                                    <div  className="pad6">
                                        <Form.Check
                                            custom
                                            inline
                                            type="radio"
                                            id="custom-radio1"
                                            label="Whatsup"
                                        />
                                    </div>
                                    <div className="CovidSend">
                                        <Button>Send</Button>
                                    </div>
                                </div>
                                </Col>
                           </Row>
                        </div>
                    {/* </Card> */}
                </div>
            </React.Fragment>
        )
    }
}

export default Covid