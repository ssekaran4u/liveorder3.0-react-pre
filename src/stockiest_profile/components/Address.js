import React from "react";
import { Row, Col } from "react-bootstrap";

function Addresses(props) {
    return (
        <div className="secondrow-firstchem">
            <div className="cbartitle nomar0">ADDRESSES</div>

            <div className="infochemist infobox2">Personal Address</div>
            <div className="valuechem">
                
                <span>{props.data.Address1 ? props.data.Address1.toLowerCase(): <span className="dash"></span>}</span>{props.data.Address1 ? ',&nbsp;' : ''}
                <span>{props.data.Address2 ? props.data.Address2.toLowerCase() : <span className="dash"></span>}</span>{props.data.Address1 ? ',&nbsp;' : ''}
                <span>{props.data.Address3 ? props.data.Address3.toLowerCase():<span className="dash"></span>}</span>{props.data.Address1 ? ',&nbsp;' : ''}
                <span>{props.data.AreaName ? props.data.AreaName.toLowerCase():<span className="dash"></span>}</span>{props.data.Address1 ? ',&nbsp;' : ''}
                <span>
                    {props.data.Address4 ? props.data.Address4.toLowerCase():<span className="dash"></span>} &nbsp;{" "}
                    {props.data.Pincode ? props.data.Pincode : <span className="dash"></span>}
                </span>
            </div>
            <Row>
                <Col xs={3}>
                    <div className="infochemist infobox2">Longitude</div>
                    <div className="valuechem">
                        {props.data.Logitute ? (
                            <p>{props.data.Logitute}</p>
                        ) : (
                            <div>
                                <p className="dash" />
                                <p className="dash" />
                            </div>
                        )}
                    </div>
                </Col>
                <Col xs={6}>
                    <div className="infochemist infobox2">Latitude</div>
                    <div className="valuechem">
                        {props.data.Latitude ? (
                            <p>{props.data.Latitude}</p>
                        ) : (
                            <div>
                                <p className="dash" />
                                <p className="dash" />
                            </div>
                        )}
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default Addresses;
