import React from "react";
import { Row, Col } from "react-bootstrap";

function ShopInfo(props) {
    return (
        <div className="secondrow-firstchem">
            <div className="cbartitle nomar0">SHOP INFO</div>
            <Row>
                <Col xl={6} lg={6} md={12} sm={12}>
                    <div className="infochemist  infobox2">
                        Total Sft Of Shop
                    </div>
                    <div className="valuechem">
                        {props.data.n_Sft_shop ? (
                            <p>{props.data.n_Sft_shop}</p>
                        ) : (
                            <div>
                                <p className="dash" />
                                <p className="dash" />
                            </div>
                        )}
                    </div>
                </Col>
                <Col xl={6} lg={6} md={12} sm={12}>
                    <div className="infochemist  infobox2">
                        No. Of Display Shelf
                    </div>
                    <div className="valuechem">
                        {props.data.n_No_of_display_Shelf ? (
                            <p>{props.data.n_No_of_display_Shelf}</p>
                        ) : (
                            <div>
                                <p className="dash" />
                                <p className="dash" />
                            </div>
                        )}
                    </div>
                </Col>
                <Col xs={12}>
                    <div className="infochemist  infobox2">
                        Description Of Display Shelf
                    </div>
                    <div className="valuechem">
                        {props.data.desc_display_shelf ? (
                            <p>{props.data.desc_display_shelf}</p>
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
export default ShopInfo;
