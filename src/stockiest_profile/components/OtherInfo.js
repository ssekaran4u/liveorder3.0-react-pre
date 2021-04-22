import React, { Component } from 'react'
import {Row,Col} from 'react-bootstrap'

function Otherinfo(props){
   
    return (
        <Row className="AddressRow">
            <Col xl={12} md={12} sm={12} xs={12} className="paddr10">
                <div  className="secondrow-firstchem">
                    <Row>
                        <Col xs={12}  className="Padng">
                          <div className="cbartitle nomar0">OTHER INFO</div>
                        </Col>
                        <Col lg={3} md={3} sm={12} xs={12} className="infobox nopad0">
                          <div className="infochemist  infobox2  ">Fridge</div>
                          <div className="valuechem ">{props.data.TinNo  ? <p>{props.data.TinNo}</p> : <p className="dash"></p>}</div>
                        </Col>
                        <Col  lg={3} md={3} sm={12} xs={12}  className="infobox nopad0">
                          <div className="infochemist  infobox2">Account/Store Manager</div>
                          <div className="valuechem">{props.data.lic_no  ? <p>{props.data.lic_no}</p> : <p className="dash"></p>}</div>

                        </Col>
                        <Col  lg={3} md={3} sm={12} xs={12}  className="infobox nopad0">
                          <div className="infochemist  infobox2">Store Type</div>
                          <div className="valuechem ">{props.data.lic_food  ? <p>{props.data.lic_food}</p> : <p className="dash"></p>}</div>
                        </Col>
                        <Col  lg={3} md={3} sm={12} xs={12}  className="infobox nopad0">
                          <div className="infochemist  infobox2">Discount</div>
                          <div className="valuechem ">{props.data.Discount  ? <p>{props.data.Discount}</p> : <p className="dash"></p>}</div>
                        </Col>
                    </Row>
                </div>
            </Col>
        </Row>
    )
  
}

export default Otherinfo;



