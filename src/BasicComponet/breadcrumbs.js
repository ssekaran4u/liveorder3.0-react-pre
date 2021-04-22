import React, { Component } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "../../public/assets/css/BasicComponents/breadcrumbs.css"

class Breadcrumbs extends Component {
    // constructor(props){
    //     super(props)
    // }
    render() {
        var content = this.props.content;
        var subContent = this.props.subContent;
        return (
            <div className="sfa-breadcrumbs">
                <Row>
                    <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                        <div className="breadcrumb-container">
                            <div className="breadcrumb-content">{content}</div>
                            <div className="breadcrumb-content-col2">{subContent}</div>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Breadcrumbs; 