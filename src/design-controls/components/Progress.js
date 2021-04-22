import React, {Component} from 'react'

import {Row, Col, ProgressBar} from 'react-bootstrap'

class Progress extends Component{
    render(){
        return(
            <div> 
                <Row>   
                    <Col md={12} xl={6} className="mb-3">
                        <p>Progress Bar</p>
                        <ProgressBar now={0} className="custom-progress-bar mb-3" />
                        <ProgressBar now={40} className="custom-progress-bar mb-3" />
                        <ProgressBar now={60} className="custom-progress-bar custom-height mb-3" label={'60%'} />
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Progress;