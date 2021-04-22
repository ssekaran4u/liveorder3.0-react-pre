import React, {Component} from 'react'

import {Row, Col} from 'react-bootstrap'

import LoginNavbar from '../components/LoginNavbar'
import Informational from '../components/Informational'
import LoginForm from '../components/LoginForm'

import '../../../public/assets/css/bootstrap.min.css'
import '../../../public/assets/css/style.css'
import '../../../public/assets/css/responsive.css'

class Login extends Component{
    render(){
        return(
            <div className="bg">
                <div className="body-spacing">
                    <LoginNavbar />
                    <Row className="center-align">
                        <Col lg={6} xl={6} className="login-slider">
                            <Informational />
                        </Col>
                        <Col lg={5} xl={5} className="ml-auto">
                            <LoginForm />
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}

export default Login