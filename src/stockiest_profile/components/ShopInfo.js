import React, { Component } from 'react'
import {Row,Col} from 'react-bootstrap'

function ShopInfo(props){
 
    return (
        <Row className="secondrows">
            <Col xl={12} xs={12} md={12} sm={12} lg={12} className="paddr10" >
                <div  className="secondrow-firstchem">
                    <Row>
                        <Col xs={12} className="Padng">
                            <div className="cbartitle nomar0">SHOP INFO</div>
                        </Col>
                        <Col xs={6} xl={6} lg={3} className="infobox nopad0">
                            <div className="infochemist  infobox2">Total Sft OF Shop</div>
                            <div className="valuechem">{props.data.Fridge  ? <p>{props.data.Fridge}</p> : <p className="dash"></p>}</div>
                        </Col>
                        <Col xs={6} xl={6} lg={5} className="infobox nopad0">
                            <div className="infochemist  infobox2">No. Of Display Shelf</div>
                            <div className="valuechem">{props.data.Store_Manager  ? <p>{props.data.Store_Manager}</p> : <p className="dash"></p>}</div>
                        </Col>
                        <Col xs={6} xl={6} lg={3} className="infobox nopad0">
                            <div className="infochemist  infobox2">Description Of Display Shelf</div>
                            <div className="valuechem">{props.data.storetype  ? <p>{props.data.storetype}</p> : <p className="dash"></p>}</div>
                        </Col>
                    </Row>
                </div>
            </Col>
              
        </Row>
    )
  
}
export default ShopInfo;