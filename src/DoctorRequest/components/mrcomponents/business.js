import React, {  Component } from 'react'
import { Row, Col, Form, InputGroup } from "react-bootstrap";

class Business extends Component{
  constructor(props){
    super(props)
    this.state={
      Date: new Date(),
    }
  }
  render(){
    return (
      <Row className="custom-row">
              <Col xl={5} md={5} sm={12} xs={12} className="custom-column">
                <div className="secondrow-first">
                  <Row>
                  <Col xs={12}>
                    <div className="iconbar">
                      <img src="../public/assets/images/portfolio.svg" className="barimage"></img> 
                      <div className="bartitle nomar0">BUSINESS INFO</div>
                    </div>
                  </Col>
                  <Col xs={6} className="infobox nopad0">
                    <div className="info">No. of patient per day</div>
                    <div className="value">2</div>
                  </Col>
                  <Col xs={6} className="infobox nopad0">
                    <div className="info">Current Business</div>
                    <div className="value"><span className="spanvalue">6000</span>
                    </div>
                  </Col>
                  <Col xs={6} className="infobox nopad0">
                    <div className="info">Business Potential</div>
                    <div className="value">20000</div>
                  </Col>
                  <Col xs={6} className="infobox nopad0">
                    <div className="info">Doctor Prescribing</div>
                    <div className="value">Yes</div>
                  </Col>
                  <Col xs={6} className="infobox nopad0">
                    <div className="info">Doctor Purchasing</div>
                    <div className="value">No</div>
                  </Col>
                  </Row>
                </div>
                <div className="secondrow-first">
                  <Row>
                  <Col xs={12} className="iconbar">
                    <img src="../public/assets/images/hospital12.svg" className="barimage"></img> <div className="bartitle nomar0">RESIDENTIAL ADDRESS</div>
                  </Col>
                  <Col xs={6} className="infobox nopad0">
                    <div className="info">House/BuildingName</div>
                  
                    <div className="value"><span className="uppwelower">#220/Neil Tower</span></div>
                  </Col>
                  <Col xs={6} className="infobox nopad0">
                    <div className="info">Clinic Area</div>
                    <div className="value"><span className="uppwelower">Bangalore</span></div>
                  </Col>
                  <Col xs={12} className="infobox nopad0">
                    <div className="info">Address</div>
                    <div className="value">1533, 9th Main Rd, Jayanagar East,</div>
                  </Col>
                  <Col xs={6} className="infobox nopad0">
                    <div className="info">PinCode</div>
                    <div className="value">560070</div>
                  </Col>
                  </Row>
                </div>
                
              </Col>
              <Col xl={7} md={7} sm={12} xs={12} className="custom-column">
                <div className="secondrow-first">
                  <Row>
                    <Col xs={12} className="iconbar">
                    <img src="../public/assets/images/hospital.svg" className="barimage"></img> <div className="bartitle nomar0">CLINIC ADDRESS</div>
                    </Col>
                    <Col xl={4} xs={6} className="infobox nopad0">
                    <div className="info">Clinic/Hospital Name</div>
                    <div className="value"><span className="uppwelower">Cloud Nine</span></div>
                    </Col>
                    <Col xl={4} xs={6} className="infobox nopad0">
                    <div className="info">Clinic Area</div>
                    <div className="value"><span className="uppwelower">Bangalore</span></div>
                    </Col>
                    <Col xl={4} xs={6} className="infobox nopad0">
                    <div className="info">Address</div>
                    <div className="value"><span className="uppwelower">Address</span></div>
                    </Col>
                    <Col xl={12} xs={12} className="infobox nopad0">
                    <div className="info">1533, 9th Main Rd, Jayanagar East,</div>
                    </Col>
                    <Col xl={4} xs={6} className="infobox nopad0">
                    <div className="info">Pincode</div>
                    <div className="value">560070</div>
                    </Col>
                    </Row>
                </div>
                <div className="secondrow-first">
                  <Row>
                  <Col xs={12} className="iconbar">
                    <img src="../public/assets/images/family.svg" className="barimage"></img> <div className="bartitle nomar0">PERSONAL INFORMATION</div>
                  </Col>
                  <Col xl={4} xs={6} className="infobox nopad0">
                    <div className="info">Spouse Name</div>
                  
                    <div className="value"><span className="uppwelower">#220/Neil </span></div>
                  </Col>
                  <Col xl={3} xs={6} className="infobox nopad0">
                    <div className="info">Spouse DOB</div>
                    <div className="value"><span className="uppwelower">Bangalore</span></div>
                  </Col>
                  <Col xl={4} xs={6} className="infobox nopad0">
                    <div className="info">Wedding Anniversary Date</div>
                    <div className="value">02-October-2015</div>
                  </Col>
                  <Col xl={4} xs={6} className="infobox nopad0">
                    <div className="info">First Child Name</div>
                    <div className="value">560070</div>
                  </Col>
                  <Col xl={4} xs={6} className="infobox nopad0">
                    <div className="info">First Child DOB</div>
                    <div className="value"><span className="uppwelower">02-October-2017</span></div>
                  </Col>
                  <Col xl={4} xs={6} className="infobox nopad0">
                    <div className="info">Second Child Name</div>
                    <div className="value">560070</div>
                  </Col>
                  <Col xl={4} xs={6} className="infobox nopad0">
                    <div className="info">Second Child DOB</div>
                    <div className="value"><span className="uppwelower">02-October-2017</span></div>
                  </Col>
                  </Row>
                </div>
              </Col>
        </Row>
    )
  }
}
export default Business