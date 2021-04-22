import React, {Component} from 'react'

import {Row, Col} from 'react-bootstrap'

class Buttons extends Component{
    render(){
        return(
            <div> 
                <Row>   
                    <Col md={12} xl={6} className="mb-3">
                        <p>Normal Buttons</p>
                        <button className="primary mr-2 mb-2">Primary</button>
                        <button className="secondary mr-2 mb-2">Secondary</button>
                        <button className="success mr-2 mb-2">Success</button>
                        <button className="danger mr-2 mb-2">Danger</button>
                    </Col>
                    <Col md={12} xl={6} className="mb-3">
                        <p>Outline Buttons</p>
                        <button className="primary primary-outline mr-2 mb-2">Primary</button>
                        <button className="secondary secondary-outline mr-2 mb-2">Secondary</button>
                        <button className="success success-outline mr-2 mb-2">Success</button>
                        <button className="danger danger-outline mr-2 mb-2">Danger</button>
                    </Col>
                    <Col md={12} xl={6} className="mb-3">
                        <p>Rounded filled Buttons</p>
                        <button className="primary rounded-btn mr-2 mb-2">Primary</button>
                        <button className="secondary rounded-btn mr-2 mb-2">Secondary</button>
                        <button className="success rounded-btn mr-2 mb-2">Success</button>
                        <button className="danger rounded-btn mr-2 mb-2">Danger</button>
                    </Col>
                    <Col md={12} xl={6} className="mb-3">
                        <p>Rounded Outline Buttons</p>
                        <button className="primary primary-outline rounded-btn mr-2 mb-2">Primary</button>
                        <button className="secondary secondary-outline rounded-btn mr-2 mb-2">Secondary</button>
                        <button className="success success-outline rounded-btn mr-2 mb-2">Success</button>
                        <button className="danger danger-outline rounded-btn mr-2 mb-2">Danger</button>
                    </Col>
                    <Col md={12} xl={6} className="mb-3">
                        <p>Fab Buttons</p>
                        <div className="fab-btn-primary mr-2 mb-2">
                            <img src="../public/assets/images/add-icon.svg" alt="plus" />
                        </div>
                        <div className="fab-btn-primary outline mr-2 mb-2">
                            <img src="../public/assets/images/add-icon-blue.svg" alt="plus" />
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Buttons;