import React, { Component } from 'react';
import {Row, Col, Table, Form} from 'react-bootstrap';
import { Dropdown } from 'semantic-ui-react'
import { options } from '../../../testdata/missedreport'
class Productmap extends Component{
  render(){
    return(
      <>
        <div className="doctorimagerow2 marginem">
          <Row>
            <Col xl={9} md={9} sm={6}>
              <span><img src="../public/assets/images/doctor-stethoscope-blue.svg" className="medicineimg"/> <span className="businessheading">DOCTOR VISIT DETAILS</span> </span>
            </Col>
          </Row>
          <Row>
            <table className="visittable">
              <thead id="example" className="stripe row-border order-column">
                <tr>
                  <th rowSpan="1" colSpan="1" className="visittablehead">Day</th>
                  <th rowSpan="1" colSpan="1"  className="visittablehead">Time (From & To)</th>
                  <th rowSpan="1"  colSpan="1" className="visittablehead">Appointment</th>
                  <th rowSpan="1"  colSpan="1" className="visittablehead">Criteria</th>
                </tr>
              </thead>
              <tbody>
                <th className="visittablecell">Monday</th>
                <th className="visittablecell">11.30 AM - 12.30 PM </th>
                <th className="visittablecell">Yes</th>
                <th className="visittablecell">Visit only once</th>
              </tbody>
              <tbody>
                <th className="visittablecell">Monday</th>
                <th className="visittablecell">11.30 AM - 12.30 PM </th>
                <th className="visittablecell">Yes</th>
                <th className="visittablecell">Visit only once</th>
              </tbody>
            </table>
          </Row>
        </div>
        <div className="doctorimagerow2 marginem">
          <span><img src="../public/assets/images/medicine-blue.svg" className="medicineimg"/> 
            <span className="businessheading">CORE PRODUCT MAPPING (Priority Wise)</span> 
          </span>
          <Row>
          <Col xs={6} md={3} xl={3} className="infobox nopad0">
            <div className="info">Product 1</div>
            <div className="value">Anacin</div>
          </Col>
          <Col xs={6} md={3} xl={3} className="infobox nopad0">
            <div className="info">Product 1</div>
            <div className="value">Anacin</div>
          </Col>
          <Col xs={6} md={3} xl={3} className="infobox nopad0">
            <div className="info">Product 1</div>
            <div className="value">Anacin</div>
          </Col>
          </Row>
          <Row>
          <Col xs={6} md={3} xl={3} className="infobox nopad0">
            <div className="info">Product 1</div>
            <div className="value">Anacin</div>
          </Col>
          <Col xs={6} md={3} xl={3} className="infobox nopad0">
            <div className="info">Product 1</div>
            <div className="value">Anacin</div>
          </Col>
          <Col xs={6} md={3} xl={3} className="infobox nopad0">
            <div className="info">Product 1</div>
            <div className="value">Anacin</div>
          </Col>
          </Row>
          <Row>
          <Col xs={6} md={3} xl={3} className="infobox nopad0">
            <div className="info">Product 1</div>
            <div className="value">Anacin</div>
          </Col>
          <Col xs={6} md={3} xl={3} className="infobox nopad0">
            <div className="info">Product 1</div>
            <div className="value">Anacin</div>
          </Col>
          <Col xs={6} md={3} xl={3} className="infobox nopad0">
            <div className="info">Product 1</div>
            <div className="value">Anacin</div>
          </Col>
          </Row>
        </div>
      </>
    )
  }
}
export default Productmap