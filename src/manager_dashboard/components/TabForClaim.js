import React, { Component } from 'react'

class TabForClaim extends Component {
    render() {
        return (
            <div>
            <Row className="rowone">
                <Col xl={12} md={12} sm={12} xs={12} className="nopad0">
                    <div 
                        className={this.state.isFull ? "fullscreenView" : "ucdoctorsecondrow-first"}
                    >
                        <div className="manager_component_head">
                            <div className="manager_mainhead">
                                <div className="mainhead_content_one bartitle">
                                    Secondary Sales & Target Report <span className="smallheading">(in lakh)</span>
                                </div>
                                <div className="mainhead_content_two">
                                    <div className="indication2">
                                        <div className="yellowcircle" />Sec.
                                        Sales
                                    </div>
                                    <div className="indication3">
                                        <div className="bluecircledash" />
                                        Primary Sales
                                    </div>
                                </div>
                            </div>
                            <div className="manager_component_head_icon">
                                <div>
                                    {this.state.isFull ? (
                                        <img
                                            src="../public/assets/images/collapse-grey.svg"
                                            onClick={this.handleView}
                                        />
                                    ) : (
                                        <img
                                            src="../public/assets/images/fullscreen.svg"
                                            onClick={this.handleView}
                                        />
                                    )}
                                    <img
                                        className="dashfullscreen"
                                        src="../public/assets/images/overflow.svg"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
            </div>
        )
    }
}
export default TabForClaim